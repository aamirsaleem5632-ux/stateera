-- =========================================================================
-- STATEERA RPC ACCESS & SELL WALLET SAFETY MIGRATION
-- Migration: 20261122162554_stateera_rpc_access_and_sell_wallet_safety
-- Applied Remotely: 2026-11-22 16:25:54 UTC
-- =========================================================================

-- 1. Hardened procedure: execute_sell_shares with wallet row creation & row locking
CREATE OR REPLACE FUNCTION public.execute_sell_shares(
  p_property_id TEXT,
  p_shares INT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_existing_shares INT;
  v_share_price NUMERIC;
  v_gross_proceeds NUMERIC;
  v_balance NUMERIC;
  v_new_balance NUMERIC;
  v_ref_code TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to execute share sale.' USING errcode = '42501';
  END IF;

  IF p_shares IS NULL OR p_shares <= 0 THEN
    RAISE EXCEPTION 'Invalid share quantity. Must be a positive integer.' USING errcode = '22003';
  END IF;

  -- 1. Lock and verify user holdings
  SELECT shares_owned INTO v_existing_shares
  FROM public.holdings
  WHERE user_id = v_user_id AND property_id = p_property_id
  FOR UPDATE;

  IF v_existing_shares IS NULL OR v_existing_shares < p_shares THEN
    RAISE EXCEPTION 'Insufficient shares owned. Owned: %, Requested: %', COALESCE(v_existing_shares, 0), p_shares USING errcode = '22003';
  END IF;

  -- 2. Lock property inventory to update available shares and read current price
  SELECT share_price INTO v_share_price
  FROM public.properties
  WHERE id = p_property_id
  FOR UPDATE;

  v_gross_proceeds := p_shares * v_share_price;

  -- 3. Deduct shares from user holdings
  IF v_existing_shares = p_shares THEN
    DELETE FROM public.holdings
    WHERE user_id = v_user_id AND property_id = p_property_id;
  ELSE
    UPDATE public.holdings
    SET shares_owned = shares_owned - p_shares,
        updated_at = timezone('utc'::text, now())
    WHERE user_id = v_user_id AND property_id = p_property_id;
  END IF;

  -- 4. Return shares to property inventory
  UPDATE public.properties
  SET available_shares = available_shares + p_shares,
      funded_percentage = ROUND((((total_shares - (available_shares + p_shares))::numeric / total_shares::numeric) * 100), 1)
  WHERE id = p_property_id;

  -- 5. Wallet safety: ensure wallet row exists using atomic INSERT ... ON CONFLICT DO NOTHING, then lock and credit
  INSERT INTO public.wallets (user_id, balance)
  VALUES (v_user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  SELECT balance INTO v_balance
  FROM public.wallets
  WHERE user_id = v_user_id
  FOR UPDATE;

  UPDATE public.wallets
  SET balance = balance + v_gross_proceeds,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_user_id
  RETURNING balance INTO v_new_balance;

  -- 6. Record completed sell transaction
  v_ref_code := 'TX-SELL-' || upper(substring(gen_random_uuid()::text, 1, 8));
  INSERT INTO public.transactions (
    user_id, property_id, type, amount, shares, fee, status, reference_code
  ) VALUES (
    v_user_id, p_property_id, 'SELL', v_gross_proceeds, p_shares, 0, 'Completed', v_ref_code
  );

  -- 7. Record immutable audit log
  INSERT INTO public.audit_logs (actor_id, actor_role, action, entity, entity_id, payload)
  VALUES (
    v_user_id,
    'investor',
    'SELL_SHARES',
    'transactions',
    v_ref_code,
    jsonb_build_object(
      'property_id', p_property_id,
      'shares_sold', p_shares,
      'proceeds', v_gross_proceeds,
      'new_balance', v_new_balance
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'reference_code', v_ref_code,
    'shares_sold', p_shares,
    'proceeds', v_gross_proceeds,
    'new_balance', v_new_balance,
    'message', format('Successfully sold %s shares for $%s.', p_shares, v_gross_proceeds)
  );
END;
$$;

-- 2. Enforce explicit least-privilege permissions across all financial RPCs
REVOKE ALL ON FUNCTION public.execute_buy_shares(TEXT, INT, TEXT, NUMERIC) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.execute_buy_shares(TEXT, INT, TEXT, NUMERIC) TO authenticated;

REVOKE ALL ON FUNCTION public.execute_sell_shares(TEXT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.execute_sell_shares(TEXT, INT) TO authenticated;

REVOKE ALL ON FUNCTION public.execute_deposit_funds(NUMERIC) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.execute_deposit_funds(NUMERIC) TO authenticated;

REVOKE ALL ON FUNCTION public.execute_withdraw_funds(NUMERIC) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.execute_withdraw_funds(NUMERIC) TO authenticated;

REVOKE ALL ON FUNCTION public.check_and_record_invitation_attempt(TEXT, INT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_and_record_invitation_attempt(TEXT, INT, INT) TO anon, authenticated;
