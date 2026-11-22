-- =========================================================================
-- STATEERA COMPLETE FOUR-ROLE OPERATIONAL ARCHITECTURE & SECURITY MIGRATION
-- Migration Ref: 20261122160000_stateera_four_role_operational_architecture.sql
-- Target Project: mprxmjlqcdfawbqzajtb
--
-- Tables Defined:
--   1. public.wallets (authoritative simulated cash balance per user)
--   2. public.property_managers (junction: manager assignments to properties)
--   3. public.leases (real lease records connecting tenants to property units)
--   4. public.rent_payments (traceable rent payment records with receipts)
--   5. public.maintenance_requests (tenant repair requests)
--   6. public.work_orders (manager dispatched maintenance jobs)
--   7. public.accounting_ledger (immutable property income & expense records)
--   8. public.kyc_approvals (administrative compliance & identity approvals)
--   9. public.audit_logs (append-only security audit log)
--  10. public.invitation_rate_limits (persistent brute-force tracking)
-- =========================================================================

-- 1. WALLETS (Simulated Cash Balance)
CREATE TABLE IF NOT EXISTS public.wallets (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  balance NUMERIC NOT NULL DEFAULT 0 CHECK (balance >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- 2. PROPERTY MANAGERS RELATIONSHIP JUNCTION
CREATE TABLE IF NOT EXISTS public.property_managers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Terminated')),
  UNIQUE(property_id, manager_id)
);
ALTER TABLE public.property_managers ENABLE ROW LEVEL SECURITY;

-- 3. LEASES
CREATE TABLE IF NOT EXISTS public.leases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  unit_number TEXT NOT NULL,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  monthly_rent NUMERIC NOT NULL CHECK (monthly_rent > 0),
  security_deposit NUMERIC NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_due_day INT NOT NULL DEFAULT 1 CHECK (payment_due_day BETWEEN 1 AND 31),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Pending Renewal', 'Terminated', 'Defaulted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_lease_dates CHECK (end_date > start_date)
);
ALTER TABLE public.leases ENABLE ROW LEVEL SECURITY;

-- 4. RENT PAYMENTS
CREATE TABLE IF NOT EXISTS public.rent_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lease_id UUID REFERENCES public.leases(id) ON DELETE RESTRICT NOT NULL,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  month TEXT NOT NULL,
  paid_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Paid' CHECK (status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
  receipt_id TEXT UNIQUE NOT NULL,
  transaction_ref TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.rent_payments ENABLE ROW LEVEL SECURITY;

-- 5. MAINTENANCE REQUESTS
CREATE TABLE IF NOT EXISTS public.maintenance_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  unit_number TEXT NOT NULL,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Plumbing', 'HVAC', 'Electrical', 'Appliance', 'Structural', 'Other')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Emergency')),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled')),
  description TEXT NOT NULL,
  estimated_cost NUMERIC CHECK (estimated_cost >= 0),
  actual_cost NUMERIC CHECK (actual_cost >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;

-- 6. WORK ORDERS
CREATE TABLE IF NOT EXISTS public.work_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  maintenance_request_id UUID REFERENCES public.maintenance_requests(id) ON DELETE RESTRICT NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vendor_name TEXT NOT NULL,
  vendor_contact TEXT,
  estimated_cost NUMERIC NOT NULL CHECK (estimated_cost >= 0),
  actual_cost NUMERIC CHECK (actual_cost >= 0),
  status TEXT NOT NULL DEFAULT 'Dispatched' CHECK (status IN ('Dispatched', 'In Progress', 'Completed', 'Invoiced')),
  scheduled_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;

-- 7. OPERATIONAL ACCOUNTING LEDGER
CREATE TABLE IF NOT EXISTS public.accounting_ledger (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  vendor_or_tenant TEXT NOT NULL,
  reconciled BOOLEAN NOT NULL DEFAULT false,
  reference_no TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.accounting_ledger ENABLE ROW LEVEL SECURITY;

-- 8. KYC APPROVALS
CREATE TABLE IF NOT EXISTS public.kyc_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  document_type TEXT NOT NULL CHECK (document_type IN ('Passport', 'National ID', 'Drivers License', 'Proof of Address')),
  id_reference TEXT,
  status TEXT NOT NULL DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Verified', 'Rejected')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_notes TEXT
);
ALTER TABLE public.kyc_approvals ENABLE ROW LEVEL SECURITY;

-- 9. IMMUTABLE AUDIT LOGS (Append-Only)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 10. PERSISTENT INVITATION RATE LIMITING TABLE
CREATE TABLE IF NOT EXISTS public.invitation_rate_limits (
  ip_address TEXT PRIMARY KEY,
  attempt_count INT NOT NULL DEFAULT 1,
  first_attempt TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  last_attempt TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  blocked_until TIMESTAMPTZ
);
ALTER TABLE public.invitation_rate_limits ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- HELPER FUNCTIONS FOR STRICT ROLE & ASSIGNMENT EVALUATION
-- =========================================================================

-- Helper: Check if current authenticated user is an assigned active manager for a given property
CREATE OR REPLACE FUNCTION public.is_assigned_manager(p_property_id text)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.property_managers pm
    JOIN public.profiles p ON p.id = pm.manager_id
    WHERE pm.property_id = p_property_id
      AND pm.manager_id = auth.uid()
      AND pm.status = 'Active'
      AND p.role = 'manager'
      AND p.role_approval_status = 'Approved'
  );
$$;

-- Helper: Check if current authenticated user is an active tenant for a given lease
CREATE OR REPLACE FUNCTION public.is_lease_tenant(p_lease_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.leases l
    WHERE l.id = p_lease_id
      AND l.tenant_id = auth.uid()
      AND l.status = 'Active'
  );
$$;

-- Revoke public execution and grant minimal permissions
REVOKE ALL ON FUNCTION public.is_assigned_manager(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_assigned_manager(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_assigned_manager(text) TO authenticated;

REVOKE ALL ON FUNCTION public.is_lease_tenant(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_lease_tenant(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_lease_tenant(uuid) TO authenticated;

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- 1. WALLETS POLICIES
DROP POLICY IF EXISTS "Users can view own wallet" ON public.wallets;
CREATE POLICY "Users can view own wallet"
ON public.wallets FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.is_approved_admin());

-- Disallow direct client INSERT, UPDATE, DELETE on wallets; strictly mutate via atomic stored procedures
DROP POLICY IF EXISTS "Disallow client write on wallets" ON public.wallets;

-- 2. PROPERTY MANAGERS POLICIES
DROP POLICY IF EXISTS "Managers view own assignments" ON public.property_managers;
CREATE POLICY "Managers view own assignments"
ON public.property_managers FOR SELECT
TO authenticated
USING (manager_id = auth.uid() OR public.is_approved_admin());

DROP POLICY IF EXISTS "Admins manage property assignments" ON public.property_managers;
CREATE POLICY "Admins manage property assignments"
ON public.property_managers FOR ALL
TO authenticated
USING (public.is_approved_admin())
WITH CHECK (public.is_approved_admin());

-- 3. LEASES POLICIES
DROP POLICY IF EXISTS "Tenants view own leases" ON public.leases;
CREATE POLICY "Tenants view own leases"
ON public.leases FOR SELECT
TO authenticated
USING (
  tenant_id = auth.uid()
  OR public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Managers and admins manage leases" ON public.leases;
CREATE POLICY "Managers and admins manage leases"
ON public.leases FOR ALL
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
)
WITH CHECK (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

-- 4. RENT PAYMENTS POLICIES
DROP POLICY IF EXISTS "Tenants and managers view rent payments" ON public.rent_payments;
CREATE POLICY "Tenants and managers view rent payments"
ON public.rent_payments FOR SELECT
TO authenticated
USING (
  tenant_id = auth.uid()
  OR public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Tenants insert own rent payments" ON public.rent_payments;
CREATE POLICY "Tenants insert own rent payments"
ON public.rent_payments FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = auth.uid()
  AND public.is_lease_tenant(lease_id)
);

-- 5. MAINTENANCE REQUESTS POLICIES
DROP POLICY IF EXISTS "Tenants and managers view maintenance requests" ON public.maintenance_requests;
CREATE POLICY "Tenants and managers view maintenance requests"
ON public.maintenance_requests FOR SELECT
TO authenticated
USING (
  tenant_id = auth.uid()
  OR public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Tenants create maintenance requests for own unit" ON public.maintenance_requests;
CREATE POLICY "Tenants create maintenance requests for own unit"
ON public.maintenance_requests FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.leases l
    WHERE l.tenant_id = auth.uid()
      AND l.property_id = maintenance_requests.property_id
      AND l.unit_number = maintenance_requests.unit_number
      AND l.status = 'Active'
  )
);

DROP POLICY IF EXISTS "Managers and admins update maintenance requests" ON public.maintenance_requests;
CREATE POLICY "Managers and admins update maintenance requests"
ON public.maintenance_requests FOR UPDATE
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
)
WITH CHECK (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

-- 6. WORK ORDERS POLICIES
DROP POLICY IF EXISTS "Managers and admins view work orders" ON public.work_orders;
CREATE POLICY "Managers and admins view work orders"
ON public.work_orders FOR SELECT
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Managers and admins manage work orders" ON public.work_orders;
CREATE POLICY "Managers and admins manage work orders"
ON public.work_orders FOR ALL
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
)
WITH CHECK (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

-- 7. OPERATIONAL ACCOUNTING LEDGER POLICIES
DROP POLICY IF EXISTS "Managers and admins view accounting ledger" ON public.accounting_ledger;
CREATE POLICY "Managers and admins view accounting ledger"
ON public.accounting_ledger FOR SELECT
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Managers and admins insert ledger records" ON public.accounting_ledger;
CREATE POLICY "Managers and admins insert ledger records"
ON public.accounting_ledger FOR INSERT
TO authenticated
WITH CHECK (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Managers and admins update reconciliation status" ON public.accounting_ledger;
CREATE POLICY "Managers and admins update reconciliation status"
ON public.accounting_ledger FOR UPDATE
TO authenticated
USING (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
)
WITH CHECK (
  public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

-- 8. KYC APPROVALS POLICIES
DROP POLICY IF EXISTS "Users view own KYC approval" ON public.kyc_approvals;
CREATE POLICY "Users view own KYC approval"
ON public.kyc_approvals FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_approved_admin());

DROP POLICY IF EXISTS "Users insert own initial KYC submission" ON public.kyc_approvals;
CREATE POLICY "Users insert own initial KYC submission"
ON public.kyc_approvals FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins review and update KYC status" ON public.kyc_approvals;
CREATE POLICY "Admins review and update KYC status"
ON public.kyc_approvals FOR UPDATE
TO authenticated
USING (public.is_approved_admin())
WITH CHECK (public.is_approved_admin());

-- 9. IMMUTABLE AUDIT LOGS POLICIES
DROP POLICY IF EXISTS "Admins view audit logs" ON public.audit_logs;
CREATE POLICY "Admins view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.is_approved_admin());

DROP POLICY IF EXISTS "Authenticated users create audit records" ON public.audit_logs;
CREATE POLICY "Authenticated users create audit records"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (actor_id = auth.uid() OR actor_id IS NULL);

-- Strict immutability: Deny all UPDATE and DELETE on audit_logs
DROP POLICY IF EXISTS "Deny update on audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Deny delete on audit logs" ON public.audit_logs;

-- 10. INVITATION RATE LIMITS POLICIES (Strictly Service Role / RPC Gated)
DROP POLICY IF EXISTS "Admins view rate limits" ON public.invitation_rate_limits;
CREATE POLICY "Admins view rate limits"
ON public.invitation_rate_limits FOR SELECT
TO authenticated
USING (public.is_approved_admin());

-- =========================================================================
-- AUTOMATIC WALLET INITIALIZATION FOR NEW PROFILES
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Initialize $0 wallet for every newly registered profile
  INSERT INTO public.wallets (user_id, balance, currency)
  VALUES (NEW.id, 0, 'USD')
  ON CONFLICT (user_id) DO NOTHING;

  -- Create initial audit trail entry
  INSERT INTO public.audit_logs (actor_id, actor_role, action, entity, entity_id, payload)
  VALUES (
    NEW.id,
    NEW.role,
    'USER_REGISTERED',
    'profiles',
    NEW.id::text,
    jsonb_build_object('email', NEW.email, 'role', NEW.role, 'initial_balance', 0)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created_init_wallet ON public.profiles;
CREATE TRIGGER on_profile_created_init_wallet
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_wallet();

-- Backfill wallets for existing profiles who do not yet have a wallet
INSERT INTO public.wallets (user_id, balance, currency)
SELECT p.id, 0, 'USD'
FROM public.profiles p
LEFT JOIN public.wallets w ON w.user_id = p.id
WHERE w.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- =========================================================================
-- ATOMIC STORED PROCEDURES (SIMULATED FINANCIAL TRANSACTIONS WITH ROW LOCKS)
-- =========================================================================

-- Procedure: Buy Fractional Shares
CREATE OR REPLACE FUNCTION public.execute_buy_shares(
  p_property_id TEXT,
  p_shares INT,
  p_order_type TEXT DEFAULT 'Market',
  p_limit_price NUMERIC DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_wallet_balance NUMERIC;
  v_share_price NUMERIC;
  v_available_shares INT;
  v_effective_price NUMERIC;
  v_total_cost NUMERIC;
  v_existing_shares INT;
  v_existing_avg_price NUMERIC;
  v_new_avg_price NUMERIC;
  v_ref_code TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to execute share purchases.' USING errcode = '42501';
  END IF;

  IF p_shares IS NULL OR p_shares <= 0 THEN
    RAISE EXCEPTION 'Invalid share quantity. Must be a positive integer.' USING errcode = '22003';
  END IF;

  -- 1. Lock user wallet row to prevent concurrent double-spending
  SELECT balance INTO v_wallet_balance
  FROM public.wallets
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_wallet_balance IS NULL THEN
    -- Ensure wallet exists with zero balance
    INSERT INTO public.wallets (user_id, balance) VALUES (v_user_id, 0);
    v_wallet_balance := 0;
  END IF;

  -- 2. Lock property row to verify and update share inventory
  SELECT share_price, available_shares INTO v_share_price, v_available_shares
  FROM public.properties
  WHERE id = p_property_id
  FOR UPDATE;

  IF v_share_price IS NULL THEN
    RAISE EXCEPTION 'Target property % not found.', p_property_id USING errcode = 'P0002';
  END IF;

  IF v_available_shares < p_shares THEN
    RAISE EXCEPTION 'Insufficient property inventory. Available shares: %, Requested: %', v_available_shares, p_shares USING errcode = '22003';
  END IF;

  -- Effective price resolution
  IF p_order_type = 'Limit' AND p_limit_price IS NOT NULL AND p_limit_price > 0 THEN
    v_effective_price := p_limit_price;
  ELSE
    v_effective_price := v_share_price;
  END IF;

  v_total_cost := p_shares * v_effective_price;

  -- 3. Validate sufficient balance
  IF v_wallet_balance < v_total_cost THEN
    RAISE EXCEPTION 'Insufficient simulated wallet funds. Available: $%, Required: $%', v_wallet_balance, v_total_cost USING errcode = '22003';
  END IF;

  -- 4. Deduct balance from wallet
  UPDATE public.wallets
  SET balance = balance - v_total_cost,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_user_id;

  -- 5. Deduct available shares from property
  UPDATE public.properties
  SET available_shares = available_shares - p_shares,
      funded_percentage = ROUND((((total_shares - (available_shares - p_shares))::numeric / total_shares::numeric) * 100), 1)
  WHERE id = p_property_id;

  -- 6. Upsert user holdings and recalculate weighted average purchase price
  SELECT shares_owned, average_purchase_price INTO v_existing_shares, v_existing_avg_price
  FROM public.holdings
  WHERE user_id = v_user_id AND property_id = p_property_id;

  IF v_existing_shares IS NULL THEN
    INSERT INTO public.holdings (user_id, property_id, shares_owned, average_purchase_price)
    VALUES (v_user_id, p_property_id, p_shares, v_effective_price);
  ELSE
    v_new_avg_price := ROUND((((v_existing_shares * v_existing_avg_price) + (p_shares * v_effective_price)) / (v_existing_shares + p_shares)), 2);
    UPDATE public.holdings
    SET shares_owned = shares_owned + p_shares,
        average_purchase_price = v_new_avg_price,
        updated_at = timezone('utc'::text, now())
    WHERE user_id = v_user_id AND property_id = p_property_id;
  END IF;

  -- 7. Record immutable transaction
  v_ref_code := 'TX-BUY-' || upper(substring(gen_random_uuid()::text, 1, 8));
  INSERT INTO public.transactions (
    user_id, property_id, type, amount, shares, fee, status, reference_code
  ) VALUES (
    v_user_id, p_property_id, 'BUY', v_total_cost, p_shares, 0, 'Completed', v_ref_code
  );

  -- 8. Record audit log
  INSERT INTO public.audit_logs (actor_id, actor_role, action, entity, entity_id, payload)
  VALUES (
    v_user_id,
    'investor',
    'BUY_SHARES',
    'transactions',
    v_ref_code,
    jsonb_build_object(
      'property_id', p_property_id,
      'shares', p_shares,
      'share_price', v_effective_price,
      'total_cost', v_total_cost,
      'remaining_balance', v_wallet_balance - v_total_cost
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'reference_code', v_ref_code,
    'shares', p_shares,
    'total_cost', v_total_cost,
    'new_balance', v_wallet_balance - v_total_cost,
    'message', format('Successfully purchased %s shares of %s for $%s.', p_shares, p_property_id, v_total_cost)
  );
END;
$$;

-- Procedure: Sell Fractional Shares
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
  v_ref_code TEXT;
  v_new_balance NUMERIC;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to sell shares.' USING errcode = '42501';
  END IF;

  IF p_shares IS NULL OR p_shares <= 0 THEN
    RAISE EXCEPTION 'Invalid share quantity. Must be a positive integer.' USING errcode = '22003';
  END IF;

  -- 1. Lock user holding row
  SELECT shares_owned INTO v_existing_shares
  FROM public.holdings
  WHERE user_id = v_user_id AND property_id = p_property_id
  FOR UPDATE;

  IF v_existing_shares IS NULL OR v_existing_shares < p_shares THEN
    RAISE EXCEPTION 'Insufficient shares owned. Current holdings: %, Requested to sell: %', COALESCE(v_existing_shares, 0), p_shares USING errcode = '22003';
  END IF;

  -- 2. Fetch current property share price
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

  -- 5. Credit funds to wallet
  UPDATE public.wallets
  SET balance = balance + v_gross_proceeds,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_user_id
  RETURNING balance INTO v_new_balance;

  -- 6. Record transaction
  v_ref_code := 'TX-SELL-' || upper(substring(gen_random_uuid()::text, 1, 8));
  INSERT INTO public.transactions (
    user_id, property_id, type, amount, shares, fee, status, reference_code
  ) VALUES (
    v_user_id, p_property_id, 'SELL', v_gross_proceeds, p_shares, 0, 'Completed', v_ref_code
  );

  -- 7. Audit log
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

-- Procedure: Simulated Cash Deposit
CREATE OR REPLACE FUNCTION public.execute_deposit_funds(
  p_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_new_balance NUMERIC;
  v_ref_code TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to deposit funds.' USING errcode = '42501';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid deposit amount. Must be greater than 0.' USING errcode = '22003';
  END IF;

  INSERT INTO public.wallets (user_id, balance)
  VALUES (v_user_id, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET
    balance = public.wallets.balance + p_amount,
    updated_at = timezone('utc'::text, now())
  RETURNING balance INTO v_new_balance;

  v_ref_code := 'TX-DEP-' || upper(substring(gen_random_uuid()::text, 1, 8));
  INSERT INTO public.transactions (
    user_id, property_id, type, amount, status, reference_code
  ) VALUES (
    v_user_id, NULL, 'DEPOSIT', p_amount, 'Completed', v_ref_code
  );

  RETURN jsonb_build_object(
    'success', true,
    'reference_code', v_ref_code,
    'amount', p_amount,
    'new_balance', v_new_balance,
    'message', format('Successfully deposited $%s into your simulated wallet.', p_amount)
  );
END;
$$;

-- Procedure: Simulated Cash Withdrawal
CREATE OR REPLACE FUNCTION public.execute_withdraw_funds(
  p_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_balance NUMERIC;
  v_new_balance NUMERIC;
  v_ref_code TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to withdraw funds.' USING errcode = '42501';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid withdrawal amount. Must be greater than 0.' USING errcode = '22003';
  END IF;

  SELECT balance INTO v_balance
  FROM public.wallets
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_balance IS NULL OR v_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient funds. Available: $%, Requested: $%', COALESCE(v_balance, 0), p_amount USING errcode = '22003';
  END IF;

  UPDATE public.wallets
  SET balance = balance - p_amount,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_user_id
  RETURNING balance INTO v_new_balance;

  v_ref_code := 'TX-WDR-' || upper(substring(gen_random_uuid()::text, 1, 8));
  INSERT INTO public.transactions (
    user_id, property_id, type, amount, status, reference_code
  ) VALUES (
    v_user_id, NULL, 'WITHDRAWAL', p_amount, 'Completed', v_ref_code
  );

  RETURN jsonb_build_object(
    'success', true,
    'reference_code', v_ref_code,
    'amount', p_amount,
    'new_balance', v_new_balance,
    'message', format('Successfully withdrew $%s from your simulated wallet.', p_amount)
  );
END;
$$;

-- Procedure: Simulated Monthly Rental Dividend Distribution
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
  -- Only approved admin or assigned manager can trigger dividend payouts
  IF NOT (public.is_approved_admin() OR public.is_assigned_manager(p_property_id)) THEN
    RAISE EXCEPTION 'Access Denied: Only approved administrators or assigned managers can distribute rent dividends.' USING errcode = '42501';
  END IF;

  SELECT monthly_per_share_rent INTO v_monthly_per_share
  FROM public.properties
  WHERE id = p_property_id;

  IF v_monthly_per_share IS NULL OR v_monthly_per_share <= 0 THEN
    RAISE EXCEPTION 'Property % has no valid monthly rental yield configured.', p_property_id USING errcode = '22003';
  END IF;

  -- Iterate through every active shareholder for this property
  FOR v_holder IN
    SELECT user_id, shares_owned
    FROM public.holdings
    WHERE property_id = p_property_id AND shares_owned > 0
  LOOP
    v_payout_amount := ROUND((v_holder.shares_owned * v_monthly_per_share), 2);

    IF v_payout_amount > 0 THEN
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

-- =========================================================================
-- PERSISTENT RATE LIMITING STORED PROCEDURES
-- =========================================================================

CREATE OR REPLACE FUNCTION public.check_and_record_invitation_attempt(
  p_ip TEXT,
  p_max_attempts INT DEFAULT 10,
  p_window_minutes INT DEFAULT 5
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_record RECORD;
  v_now TIMESTAMPTZ := timezone('utc'::text, now());
  v_window_start TIMESTAMPTZ := v_now - (p_window_minutes || ' minutes')::interval;
BEGIN
  -- Cleanup expired rate limits older than 24 hours
  DELETE FROM public.invitation_rate_limits
  WHERE last_attempt < (v_now - interval '24 hours');

  SELECT attempt_count, first_attempt, blocked_until INTO v_record
  FROM public.invitation_rate_limits
  WHERE ip_address = p_ip
  FOR UPDATE;

  IF v_record IS NOT NULL THEN
    -- Check if IP is currently blocked
    IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > v_now THEN
      RETURN jsonb_build_object(
        'is_rate_limited', true,
        'blocked_until', v_record.blocked_until,
        'remaining_seconds', CEIL(EXTRACT(EPOCH FROM (v_record.blocked_until - v_now)))
      );
    END IF;

    -- If past window, reset counter
    IF v_record.first_attempt < v_window_start THEN
      UPDATE public.invitation_rate_limits
      SET attempt_count = 1,
          first_attempt = v_now,
          last_attempt = v_now,
          blocked_until = NULL
      WHERE ip_address = p_ip;

      RETURN jsonb_build_object('is_rate_limited', false, 'attempts', 1);
    ELSE
      -- Increment counter
      IF v_record.attempt_count + 1 > p_max_attempts THEN
        UPDATE public.invitation_rate_limits
        SET attempt_count = attempt_count + 1,
            last_attempt = v_now,
            blocked_until = v_now + (p_window_minutes || ' minutes')::interval
        WHERE ip_address = p_ip;

        RETURN jsonb_build_object(
          'is_rate_limited', true,
          'blocked_until', v_now + (p_window_minutes || ' minutes')::interval,
          'remaining_seconds', p_window_minutes * 60
        );
      ELSE
        UPDATE public.invitation_rate_limits
        SET attempt_count = attempt_count + 1,
            last_attempt = v_now
        WHERE ip_address = p_ip;

        RETURN jsonb_build_object('is_rate_limited', false, 'attempts', v_record.attempt_count + 1);
      END IF;
    END IF;
  ELSE
    -- Initial attempt for this IP
    INSERT INTO public.invitation_rate_limits (ip_address, attempt_count, first_attempt, last_attempt)
    VALUES (p_ip, 1, v_now, v_now);

    RETURN jsonb_build_object('is_rate_limited', false, 'attempts', 1);
  END IF;
END;
$$;

-- Grant execution to service_role and authenticated users
GRANT EXECUTE ON FUNCTION public.execute_buy_shares(TEXT, INT, TEXT, NUMERIC) TO authenticated;
GRANT EXECUTE ON FUNCTION public.execute_sell_shares(TEXT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.execute_deposit_funds(NUMERIC) TO authenticated;
GRANT EXECUTE ON FUNCTION public.execute_withdraw_funds(NUMERIC) TO authenticated;
GRANT EXECUTE ON FUNCTION public.execute_dividend_payout(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_and_record_invitation_attempt(TEXT, INT, INT) TO anon, authenticated;
