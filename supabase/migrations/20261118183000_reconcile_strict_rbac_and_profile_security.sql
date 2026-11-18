-- =========================================================================
-- STATEERA RECONCILIATION MIGRATION: 20261118183000
-- Target Project: mprxmjlqcdfawbqzajtb
-- Purpose: Safely align the live database catalog with intended RBAC & Profile Security
-- Resolves: Missing columns on profiles, missing secondary tables, missing helper
--           functions, legacy permissive RLS policies, and redirecting auth trigger
--           from private.handle_new_user() to hardened public.handle_new_user().
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- STEP 1: PREFLIGHT CHECKS & VALIDATION
-- -------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    RAISE EXCEPTION 'Preflight Check Failed: public.profiles table does not exist.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    RAISE EXCEPTION 'Preflight Check Failed: auth.users table does not exist.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- STEP 2: RECONCILE public.profiles COLUMNS & CONSTRAINTS (IDEMPOTENT)
-- -------------------------------------------------------------------------

-- 2a. Email column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Backfill email from auth.users for existing profiles where email is NULL
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- Enforce UNIQUE constraint safely via unique index
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx 
ON public.profiles(email) 
WHERE email IS NOT NULL;

-- 2b. Full Name column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Backfill full_name from auth.users metadata if missing
UPDATE public.profiles p
SET full_name = COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '')
FROM auth.users u
WHERE p.id = u.id AND (p.full_name IS NULL OR p.full_name = '');

-- 2c. KYC Status column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kyc_status TEXT NOT NULL DEFAULT 'Pending';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass AND conname = 'profiles_kyc_status_check'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_kyc_status_check 
      CHECK (kyc_status IN ('Pending', 'Under Review', 'Verified', 'Rejected'));
  END IF;
END $$;

-- 2d. Country column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;

-- 2e. Role Approval Status column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role_approval_status TEXT NOT NULL DEFAULT 'Pending';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass AND conname = 'profiles_role_approval_status_check'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_approval_status_check 
      CHECK (role_approval_status IN ('Pending', 'Approved', 'Rejected'));
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- STEP 3: BASELINE BACKFILL & ADMIN PRESERVATION (ZERO BLIND AUTO-APPROVAL)
-- -------------------------------------------------------------------------

-- 3a. Auto-approve retail investors per platform business rules
UPDATE public.profiles
SET role_approval_status = 'Approved'
WHERE role = 'investor' AND role_approval_status = 'Pending';

-- 3b. Commercial Managers and Residential Tenants strictly remain 'Pending'
-- Identity (KYC) does not constitute management authority; requires explicit review.

-- 3c. Existing Administrator Preservation
-- SECURITY INVARIANT: Do NOT blindly auto-approve every profile claiming role = 'admin'.
-- To prevent accidental lockout of verified administrators while avoiding unauthorized elevation,
-- the Project Owner MUST supply the verified UUID(s) of authorized Admins below.
--
-- Instructions for Administrator:
-- Replace the empty array ARRAY[]::uuid[] below with your actual verified Admin user UUID(s),
-- e.g. ARRAY['00000000-0000-0000-0000-000000000000'::uuid]
DO $$
DECLARE
  v_verified_admin_uuids uuid[] := ARRAY[]::uuid[]; -- INSERT VERIFIED ADMIN UUIDs HERE
  v_approved_count int := 0;
  v_pending_admin_count int := 0;
BEGIN
  -- If verified UUIDs are provided, approve them explicitly
  IF array_length(v_verified_admin_uuids, 1) > 0 THEN
    UPDATE public.profiles
    SET role_approval_status = 'Approved'
    WHERE id = ANY(v_verified_admin_uuids)
      AND role = 'admin';
    GET DIAGNOSTICS v_approved_count = ROW_COUNT;
    RAISE NOTICE 'Approved % verified administrator profile(s).', v_approved_count;
  END IF;

  -- Count any remaining unapproved admin accounts
  SELECT COUNT(*) INTO v_pending_admin_count
  FROM public.profiles
  WHERE role = 'admin' AND role_approval_status = 'Pending';

  IF v_pending_admin_count > 0 THEN
    RAISE WARNING 'There are % profile(s) with role = admin in Pending approval status. Administrator UUIDs must be explicitly approved to enable live admin portal access.', v_pending_admin_count;
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- STEP 4: CREATE MISSING SECONDARY TABLES (FROM MIGRATION 001)
-- -------------------------------------------------------------------------

-- 4a. Human Expert Appointments
CREATE TABLE IF NOT EXISTS public.expert_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  expert_id TEXT NOT NULL,
  expert_name TEXT NOT NULL,
  expert_role TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  meeting_type TEXT NOT NULL CHECK (meeting_type IN ('video', 'in-person', 'phone')),
  purpose TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'Rescheduled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.expert_appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own appointments" ON public.expert_appointments;
CREATE POLICY "Users can view own appointments" 
ON public.expert_appointments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own appointments" ON public.expert_appointments;
CREATE POLICY "Users can insert own appointments" 
ON public.expert_appointments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own appointments" ON public.expert_appointments;
CREATE POLICY "Users can update own appointments" 
ON public.expert_appointments FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- 4b. Community Property Lab Proposals
CREATE TABLE IF NOT EXISTS public.community_proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  estimated_cost NUMERIC,
  rationale TEXT NOT NULL,
  votes_count INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Feasibility Study', 'Approved', 'Archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.community_proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view community proposals" ON public.community_proposals;
CREATE POLICY "Anyone can view community proposals" 
ON public.community_proposals FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can submit proposals" ON public.community_proposals;
CREATE POLICY "Authenticated users can submit proposals" 
ON public.community_proposals FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own proposals" ON public.community_proposals;
CREATE POLICY "Users can update own proposals" 
ON public.community_proposals FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- 4c. Micro-Saver Ownership Plans
CREATE TABLE IF NOT EXISTS public.micro_saver_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  current_saved NUMERIC NOT NULL DEFAULT 0,
  frequency TEXT NOT NULL DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  auto_deposit_amount NUMERIC NOT NULL,
  target_property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.micro_saver_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can view own micro-saver plans" 
ON public.micro_saver_plans FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can insert own micro-saver plans" 
ON public.micro_saver_plans FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can update own micro-saver plans" 
ON public.micro_saver_plans FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- -------------------------------------------------------------------------
-- STEP 5: SECURITY DEFINER HELPER FUNCTIONS (ANTI-RECURSION, FIXED search_path)
-- -------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_approved_admin()
RETURNS boolean
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

-- Enforce postgres ownership and minimal execute grants
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

-- -------------------------------------------------------------------------
-- STEP 6: CLEAN-SLATE REMOVAL OF ALL LEGACY PROFILES POLICIES
-- -------------------------------------------------------------------------
-- In PostgreSQL RLS, permissive policies are combined via OR.
-- Dropping only hardcoded policy names leaves legacy policies active (shadowing).
-- We dynamically drop ALL existing policies on public.profiles before applying new ones.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_catalog.pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', pol.policyname);
  END LOOP;
END $$;

-- -------------------------------------------------------------------------
-- STEP 7: HARDENED RLS POLICIES (MIGRATION 004 STANDARD)
-- -------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 7a. Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- 7b. Verified Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_approved_admin());

-- 7c. Strict Registration: Users can ONLY insert an 'investor' profile with 'Approved' status
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() = id AND 
  role = 'investor' AND
  role_approval_status = 'Approved'
);

-- 7d. Self-Update: Users can update non-privileged profile attributes,
-- but role and approval status must strictly match existing database values.
CREATE POLICY "Users can update non-role fields of own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = public.get_user_role(auth.uid()) AND
  role_approval_status = public.get_user_approval_status(auth.uid())
);

-- 7e. Administrator Management: Approved Admins can update roles/KYC of other accounts,
-- but CANNOT alter their own role or approval status (prevents self-lockout / escalation).
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (
  public.is_approved_admin()
)
WITH CHECK (
  public.is_approved_admin() AND
  (
    id <> auth.uid()
    OR
    (
      id = auth.uid() AND
      role = public.get_user_role(auth.uid()) AND
      role_approval_status = public.get_user_approval_status(auth.uid())
    )
  )
);

-- -------------------------------------------------------------------------
-- STEP 8: RECONCILE AUTH REGISTRATION TRIGGER
-- -------------------------------------------------------------------------

-- 8a. Define hardened public.handle_new_user() function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_full_name text;
BEGIN
  -- Strict server-side invariant: All new registrations receive 'investor' role.
  -- Client metadata ('admin', 'manager', 'tenant') is completely ignored.
  user_full_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '');

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

-- Restrict execution and enforce ownership
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

-- 8b. Safely replace trigger on auth.users
-- Drop existing trigger regardless of name (e.g. legacy on_auth_user_created or private trigger)
DO $$
DECLARE
  trig record;
BEGIN
  FOR trig IN 
    SELECT tgname 
    FROM pg_catalog.pg_trigger t
    JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'users'
      AND (
        t.tgname = 'on_auth_user_created'
        OR pg_get_triggerdef(t.oid) ILIKE '%handle_new_user%'
      )
      AND NOT t.tgisinternal
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.users', trig.tgname);
  END LOOP;
END $$;

-- Attach hardened trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- NOTE ON LEGACY private.handle_new_user():
-- The legacy function in schema 'private' is NOT dropped to avoid breaking any unknown
-- internal dependencies. It is simply decoupled from auth.users.

-- -------------------------------------------------------------------------
-- STEP 9: POST-MIGRATION INTEGRITY ASSERTIONS
-- -------------------------------------------------------------------------
DO $$
BEGIN
  -- Assert role_approval_status column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role_approval_status'
  ) THEN
    RAISE EXCEPTION 'Postflight Check Failed: role_approval_status column was not created.';
  END IF;

  -- Assert helper functions exist
  IF NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname = 'public' AND p.proname = 'is_approved_admin') THEN
    RAISE EXCEPTION 'Postflight Check Failed: is_approved_admin function missing.';
  END IF;

  -- Assert trigger is active on auth.users
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t JOIN pg_class c ON c.oid = t.tgrelid JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'users' AND t.tgname = 'on_auth_user_created' AND t.tgenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'Postflight Check Failed: on_auth_user_created trigger is not enabled on auth.users.';
  END IF;

  RAISE NOTICE 'StateEra RBAC & Profile Security Reconciliation completed successfully.';
END $$;

COMMIT;
