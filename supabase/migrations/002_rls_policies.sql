-- STATEERA ROW LEVEL SECURITY (RLS) POLICIES
-- Enforce strict role-based access so users cannot elevate their own roles

-- Ensure role_approval_status column exists before policy references
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role_approval_status TEXT NOT NULL DEFAULT 'Pending' 
CHECK (role_approval_status IN ('Pending', 'Approved', 'Rejected'));

-- Step 0a: Safe Baseline Backfill for Existing Profiles (Atomic with column creation)
-- 1. Pre-existing retail investors are auto-approved per platform business rules
UPDATE public.profiles
SET role_approval_status = 'Approved'
WHERE role = 'investor' 
  AND role_approval_status = 'Pending';

-- 2. Pre-existing managers and tenants remain 'Pending' by default.
-- Note: Identity verification (KYC) does not constitute role authorization. Commercial asset managers
-- and residential leaseholders require explicit administrative review before granting access.

-- 3. Pre-existing administrators strictly remain 'Pending' by default.
-- ZERO AUTOMATIC ADMIN ELEVATION: KYC verification is identity proof, NOT administrative authorization.
-- Administrator privileges must only be activated for confirmed account UUIDs explicitly verified by the project owner.
-- Manual activation command for project owner to execute with confirmed admin UUIDs:
-- UPDATE public.profiles SET role_approval_status = 'Approved' WHERE id IN ('<CONFIRMED_ADMIN_UUID>');

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.micro_saver_plans ENABLE ROW LEVEL SECURITY;

-- 0. Security Definer Helper Functions (Anti-Recursion & Safe Policy Evaluation)
CREATE OR REPLACE FUNCTION public.is_approved_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    (SELECT (role = 'admin' AND role_approval_status = 'Approved')
     FROM public.profiles
     WHERE id = auth.uid()),
    false
  );
$$;

-- Restrict role access: Only current user or an approved admin can retrieve role data
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles 
  WHERE id = user_id 
    AND (user_id = auth.uid() OR public.is_approved_admin());
$$;

-- Restrict approval access: Only current user or an approved admin can retrieve approval status
CREATE OR REPLACE FUNCTION public.get_user_approval_status(user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role_approval_status FROM public.profiles 
  WHERE id = user_id 
    AND (user_id = auth.uid() OR public.is_approved_admin());
$$;

-- Explicitly revoke public and anon execution, enforce postgres ownership, and grant minimal required permissions
REVOKE ALL ON FUNCTION public.is_approved_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_approved_admin() FROM anon;
ALTER FUNCTION public.is_approved_admin() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.is_approved_admin() TO authenticated;

REVOKE ALL ON FUNCTION public.get_user_role(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_user_role(uuid) FROM anon;
ALTER FUNCTION public.get_user_role(uuid) OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO authenticated;

REVOKE ALL ON FUNCTION public.get_user_approval_status(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_user_approval_status(uuid) FROM anon;
ALTER FUNCTION public.get_user_approval_status(uuid) OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.get_user_approval_status(uuid) TO authenticated;

-- 1. Profiles Policies
-- Everyone authenticated can view their own profile.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Authenticated users can insert their own profile on signup (strict admin exclusion & approval restrictions)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() = id AND 
  role IN ('investor', 'tenant', 'manager') AND
  role <> 'admin' AND
  (
    (role = 'investor' AND role_approval_status IN ('Approved', 'Pending')) OR
    (role IN ('tenant', 'manager') AND role_approval_status = 'Pending')
  )
);

DROP POLICY IF EXISTS "Users can update non-role fields of own profile" ON public.profiles;
CREATE POLICY "Users can update non-role fields of own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = public.get_user_role(auth.uid()) AND
  role_approval_status = public.get_user_approval_status(auth.uid()) -- prevents self-role and self-approval elevation
);

-- Admins can view and update all profiles for KYC and management (strictly requires approved admin; zero recursion)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.is_approved_admin()
);

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (
  public.is_approved_admin()
)
WITH CHECK (
  public.is_approved_admin() AND
  (
    -- Updating another user's profile: permitted
    id <> auth.uid()
    OR
    -- Updating own profile: cannot alter own role or approval status
    (
      id = auth.uid() AND
      role = public.get_user_role(auth.uid()) AND
      role_approval_status = public.get_user_approval_status(auth.uid())
    )
  )
);

-- 2. Properties Policies
-- Anyone (even unauthenticated) can read properties
CREATE POLICY "Public properties read access" 
ON public.properties FOR SELECT 
TO public 
USING (true);

-- 3. Holdings Policies
-- Users can only view their own holdings
CREATE POLICY "Users can view own holdings" 
ON public.holdings FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 4. Transactions Policies
-- Users can only view their own transactions
CREATE POLICY "Users can view own transactions" 
ON public.transactions FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" 
ON public.transactions FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. Expert Appointments Policies
CREATE POLICY "Users view own appointments" 
ON public.expert_appointments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users insert own appointments" 
ON public.expert_appointments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 6. Community Proposals Policies
CREATE POLICY "Public can view proposals" 
ON public.community_proposals FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Users insert own proposals" 
ON public.community_proposals FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 7. Micro-Saver Plans Policies
CREATE POLICY "Users view own micro-saver plans" 
ON public.micro_saver_plans FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users manage own micro-saver plans" 
ON public.micro_saver_plans FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
