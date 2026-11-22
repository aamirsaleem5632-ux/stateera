-- =========================================================================
-- STATEERA SECURITY & DIVIDEND IDEMPOTENCY HARDENING MIGRATION
-- Migration: 20261122162509_stateera_security_and_dividend_idempotency_hardening
-- Applied Remotely: 2026-11-22 16:25:09 UTC
-- =========================================================================

-- 1. Dedicated audit table for idempotent dividend distribution tracking
CREATE TABLE IF NOT EXISTS public.dividend_distribution_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  period_key TEXT NOT NULL,
  recipients_count INT NOT NULL DEFAULT 0,
  total_distributed NUMERIC NOT NULL DEFAULT 0,
  initiated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_dividend_distribution_runs_property_period UNIQUE (property_id, period_key)
);

-- Enable Row Level Security
ALTER TABLE public.dividend_distribution_runs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Viewable by approved admins or assigned property managers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'dividend_distribution_runs' 
      AND policyname = 'Admins and assigned managers can view dividend runs'
  ) THEN
    CREATE POLICY "Admins and assigned managers can view dividend runs"
    ON public.dividend_distribution_runs
    FOR SELECT
    TO authenticated
    USING (
      public.is_approved_admin() OR public.is_assigned_manager(property_id)
    );
  END IF;
END $$;

-- 2. Enhanced procedure: execute_dividend_payout with strict idempotency via dividend_distribution_runs
CREATE OR REPLACE FUNCTION public.execute_dividend_payout(
  p_property_id TEXT,
  p_period TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_caller_id UUID;
  v_monthly_per_share NUMERIC;
  v_holder RECORD;
  v_total_distributed NUMERIC := 0;
  v_recipients_count INT := 0;
  v_payout_amount NUMERIC;
  v_ref_code TEXT;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to distribute rent dividends.' USING errcode = '42501';
  END IF;

  -- Security: Only approved admin or assigned manager can trigger dividend payouts
  IF NOT (public.is_approved_admin() OR public.is_assigned_manager(p_property_id)) THEN
    RAISE EXCEPTION 'Access Denied: Only approved administrators or assigned managers can distribute rent dividends.' USING errcode = '42501';
  END IF;

  -- Idempotency Check: Verify dividend has not already been distributed for this period
  IF EXISTS (
    SELECT 1 FROM public.dividend_distribution_runs
    WHERE property_id = p_property_id AND period_key = p_period
  ) THEN
    RAISE EXCEPTION 'Duplicate Distribution: Dividend for property % for period % has already been distributed.', p_property_id, p_period
      USING errcode = '23505';
  END IF;

  SELECT monthly_per_share_rent INTO v_monthly_per_share
  FROM public.properties
  WHERE id = p_property_id;

  IF v_monthly_per_share IS NULL OR v_monthly_per_share <= 0 THEN
    RAISE EXCEPTION 'Property % has no valid monthly rental yield configured.', p_property_id USING errcode = '22003';
  END IF;

  -- Iterate through every active shareholder for this property with row lock
  FOR v_holder IN
    SELECT user_id, shares_owned
    FROM public.holdings
    WHERE property_id = p_property_id AND shares_owned > 0
    FOR UPDATE
  LOOP
    v_payout_amount := ROUND((v_holder.shares_owned * v_monthly_per_share), 2);

    IF v_payout_amount > 0 THEN
      -- Ensure wallet row exists using atomic ON CONFLICT DO NOTHING
      INSERT INTO public.wallets (user_id, balance)
      VALUES (v_holder.user_id, 0)
      ON CONFLICT (user_id) DO NOTHING;

      -- Credit wallet
      UPDATE public.wallets
      SET balance = balance + v_payout_amount,
          updated_at = timezone('utc'::text, now())
      WHERE user_id = v_holder.user_id;

      -- Generate traceable dividend transaction record
      v_ref_code := 'TX-DIV-' || upper(substring(gen_random_uuid()::text, 1, 8));
      INSERT INTO public.transactions (
        user_id, property_id, type, amount, shares, fee, status, reference_code
      ) VALUES (
        v_holder.user_id, p_property_id, 'DIVIDEND', v_payout_amount, v_holder.shares_owned, 0, 'Completed', v_ref_code
      );

      v_total_distributed := v_total_distributed + v_payout_amount;
      v_recipients_count := v_recipients_count + 1;
    END IF;
  END LOOP;

  -- Record run in dividend_distribution_runs
  INSERT INTO public.dividend_distribution_runs (
    property_id, period_key, recipients_count, total_distributed, initiated_by
  ) VALUES (
    p_property_id, p_period, v_recipients_count, v_total_distributed, v_caller_id
  );

  -- Record accounting ledger entry
  INSERT INTO public.accounting_ledger (
    property_id, manager_id, type, category, description, amount, vendor_or_tenant, reconciled, reference_no
  ) VALUES (
    p_property_id,
    v_caller_id,
    'EXPENSE',
    'Dividend Distribution',
    format('%s dividend payout distributed across %s shareholders.', p_period, v_recipients_count),
    v_total_distributed,
    'StateEra Investor Pool',
    true,
    'LED-DIV-' || upper(substring(gen_random_uuid()::text, 1, 8))
  );

  RETURN jsonb_build_object(
    'success', true,
    'property_id', p_property_id,
    'period', p_period,
    'recipients_count', v_recipients_count,
    'total_distributed', v_total_distributed,
    'message', format('Successfully distributed $%s in rent dividends across %s shareholders for %s.', v_total_distributed, v_recipients_count, p_period)
  );
END;
$$;

-- Explicit RPC access permissions
REVOKE ALL ON FUNCTION public.execute_dividend_payout(TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.execute_dividend_payout(TEXT, TEXT) TO authenticated;
