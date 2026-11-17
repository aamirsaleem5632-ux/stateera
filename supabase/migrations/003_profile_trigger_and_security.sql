-- STATEERA SEC-01 & SEC-02 SECURITY MIGRATION
-- Database Trigger for New User Profile Creation, Role Approval Status & Anti-Privilege Escalation
--
-- 1. Adds explicit 'role_approval_status' column to public.profiles.
-- 2. Defines secure SECURITY DEFINER helper functions with SET search_path = '' to eliminate RLS recursion.
-- 3. Explicitly sets postgres ownership on all SECURITY DEFINER functions.
-- 4. Restricts helper data retrieval: callers can only query their own role/approval unless an approved admin.
-- 5. Explicitly revokes EXECUTE permissions from PUBLIC and anon, granting minimal required execution privileges.
-- 6. Trigger handles user registration with fixed search_path = '' and standard SQL COALESCE syntax.
-- 7. Enforces strict role & approval status validation on INSERT (tenants/managers cannot self-approve).
-- 8. Strictly prevents self-assignment or self-promotion to the 'admin' role.
-- 9. Replaces conflicting policies cleanly (DROP POLICY IF EXISTS) requiring role = 'admin' AND role_approval_status = 'Approved'.
-- 10. Prevents both ordinary users and admins from altering their own role or approval status.

-- Step 1: Add role_approval_status column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role_approval_status TEXT NOT NULL DEFAULT 'Pending' 
CHECK (role_approval_status IN ('Pending', 'Approved', 'Rejected'));

-- Step 1a: Safe Backfill for Existing Profiles (Zero Automatic Admin Elevation)
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

-- Step 1b: Helper Functions (SECURITY DEFINER with fixed search_path = '' to eliminate RLS recursion)
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

-- Restrict execution permissions and enforce postgres ownership (disallow anon / PUBLIC execution)
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

-- Step 2: Function: Handle New User Registration Trigger
-- Secure search_path = '' with fully qualified objects prevents search-path hijacking (CWE-426)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  assigned_role text;
  user_full_name text;
  initial_approval text;
BEGIN
  -- Extract requested role from user metadata using standard SQL COALESCE syntax
  assigned_role := COALESCE(new.raw_user_meta_data->>'role', 'investor');
  
  -- CRITICAL SECURITY RULE: Users can NEVER self-assign or promote to 'admin'
  IF assigned_role = 'admin' OR assigned_role NOT IN ('investor', 'tenant', 'manager') THEN
    assigned_role := 'investor';
  END IF;

  user_full_name := COALESCE(new.raw_user_meta_data->>'full_name', '');

  -- Investors are auto-approved; Managers and Tenants require administrative due diligence
  IF assigned_role = 'investor' THEN
    initial_approval := 'Approved';
  ELSE
    initial_approval := 'Pending';
  END IF;

  -- Insert profile record
  INSERT INTO public.profiles (id, email, full_name, role, kyc_status, role_approval_status)
  VALUES (
    new.id,
    new.email,
    user_full_name,
    assigned_role,
    'Pending',
    initial_approval
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = CASE WHEN EXCLUDED.full_name <> '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END;

  RETURN NEW;
END;
$$;

-- Revoke public and standard execution of registration trigger function, enforce postgres ownership, and restrict to trigger runners
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
  END IF;
END $$;

-- Step 3: Trigger: Execute function after each user signup in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Policy: Allow authenticated users to insert their own profile with strict non-admin check & approval status restrictions
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

-- Step 5: Policy: Non-admins cannot update role or role_approval_status
DROP POLICY IF EXISTS "Users can update non-role fields of own profile" ON public.profiles;
CREATE POLICY "Users can update non-role fields of own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = public.get_user_role(auth.uid()) AND
  role_approval_status = public.get_user_approval_status(auth.uid())
);

-- Step 6: Policy: Admins can view all investor, tenant, and manager profiles
-- Replaces conflicting or permissive admin policies with strict approved-admin check
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.is_approved_admin()
);

-- Step 7: Policy: Admins can update profiles for KYC verification and role management
-- Replaces conflicting or permissive admin policies with strict approved-admin check and self-modification lockout
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
