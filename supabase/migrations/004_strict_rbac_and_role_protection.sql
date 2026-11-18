-- =========================================================================
-- STATEERA MIGRATION 004: STRICT ROLE-BASED ACCESS CONTROL (RBAC) & PROFILE SECURITY
-- =========================================================================
-- Purpose:
-- 1. Eliminate any possibility of self-role assignment or privilege escalation during signup.
-- 2. Enforce server-side registration default: ALL public signups strictly receive the 'investor' role.
-- 3. Lock down public.profiles RLS policies so no user can alter their own role or approval status.
-- 4. Restrict manager, tenant, and admin elevation exclusively to authorized administrators.
-- 5. Non-destructive: preserves all existing profiles, roles, and approval records.
-- =========================================================================

-- Step 1: Update the User Registration Trigger Function
-- Replaces handle_new_user() to enforce 'investor' default regardless of client metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_full_name text;
BEGIN
  -- CRITICAL SECURITY RULE: Public signups ALWAYS receive the standard 'investor' role.
  -- Client-submitted roles ('admin', 'manager', 'tenant') in raw_user_meta_data are strictly ignored.
  -- Privileged role assignments require verified administrator onboarding.
  user_full_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '');

  -- Insert profile record with strict default role 'investor' and 'Approved' status
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    kyc_status,
    role_approval_status
  )
  VALUES (
    new.id,
    new.email,
    user_full_name,
    'investor',
    'Pending',
    'Approved'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = CASE WHEN EXCLUDED.full_name <> '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END;

  RETURN NEW;
END;
$$;

-- Enforce postgres ownership and restrict execution permissions
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

-- Step 2: Policy: Disallow inserting non-investor profiles directly
-- Even if an authenticated user attempts a direct REST INSERT into public.profiles,
-- they can only insert an 'investor' profile with 'Approved' status.
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() = id AND 
  role = 'investor' AND
  role_approval_status = 'Approved'
);

-- Step 3: Policy: Prohibit users from modifying own role or approval status
-- Authenticated users can update non-privileged profile fields (full_name, phone, country, avatar_url),
-- but WITH CHECK strictly validates that role and role_approval_status match existing database values.
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

-- Step 4: Policy: Only approved admins can update other profiles
-- Verified administrators can manage KYC and roles of other users (id <> auth.uid()),
-- but CANNOT alter their own role or approval status (prevents self-elevation or accidental lockout).
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
