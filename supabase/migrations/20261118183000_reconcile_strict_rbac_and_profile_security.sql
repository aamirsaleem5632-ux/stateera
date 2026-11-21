-- =========================================================================
-- STATEERA RECONCILIATION MIGRATION: 20261118183000
-- Target Project Ref: mprxmjlqcdfawbqzajtb
-- Purpose:
--   1. Reconcile live Supabase PostgreSQL schema with StateEra Four-Role RBAC.
--   2. Add missing columns to public.profiles safely without dropping data.
--   3. Reconcile role check constraint to support investor, admin, manager, tenant.
--   4. Convert legacy 'user' records to 'investor' and auto-approve retail investors.
--   5. Securely bootstrap verified Administrator via email preflight validation.
--   6. Create secondary tables (appointments, proposals, micro-saver plans) with
--      hardened RLS and BEFORE UPDATE anti-tampering triggers.
--   7. Deploy SECURITY DEFINER helper functions with search_path = '' and anti-recursion.
--   8. Reconcile on_auth_user_created trigger on auth.users with investor-only default.
--   9. Execute inside an atomic transaction with strict preflight & postflight assertions.
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- STEP 1: PREFLIGHT CHECKS & VERIFIED ADMINISTRATOR VALIDATION
-- -------------------------------------------------------------------------

-- =========================================================================
-- CONFIGURATION INSTRUCTION FOR PROJECT OWNER:
-- You MUST set v_admin_email to the verified email address of the StateEra
-- project administrator registered in Supabase Authentication (Dashboard -> Authentication -> Users).
--
-- The migration will strictly ABORT if this value is left as the placeholder,
-- blank, invalid, or does not match an existing email-confirmed auth.users account.
-- =========================================================================

DO $$
DECLARE
  -- >>> INSERT VERIFIED ADMINISTRATOR EMAIL BELOW BEFORE EXECUTION <<<
  v_admin_email text := '__REPLACE_WITH_VERIFIED_ADMIN_EMAIL__';
  
  v_admin_id uuid;
  v_confirmed_at timestamptz;
  v_match_count int := 0;
BEGIN
  -- 1a. Core Table Existence Preflight
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: public.profiles table does not exist.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: auth.users table does not exist.';
  END IF;

  -- 1b. Validate Admin Email Configuration (Strict Fail-Closed Gate)
  IF v_admin_email IS NULL 
     OR TRIM(v_admin_email) = '' 
     OR v_admin_email = '__REPLACE_WITH_VERIFIED_ADMIN_EMAIL__'
     OR v_admin_email NOT LIKE '%_@__%.__%' THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: You must configure a valid, non-placeholder administrator email address in v_admin_email before executing this migration (current: "%").', COALESCE(v_admin_email, 'NULL');
  END IF;

  -- 1c. Verify Identity in auth.users
  SELECT COUNT(*), MIN(id), MIN(email_confirmed_at)
  INTO v_match_count, v_admin_id, v_confirmed_at
  FROM auth.users
  WHERE LOWER(email) = LOWER(TRIM(v_admin_email));

  IF v_match_count = 0 THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: Configured administrator email "%" was not found in auth.users. Please verify the account exists in Supabase Authentication.', v_admin_email;
  ELSIF v_match_count > 1 THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: Multiple auth.users accounts found for email "%". Aborting for security.', v_admin_email;
  END IF;

  IF v_confirmed_at IS NULL THEN
    RAISE EXCEPTION 'PREFLIGHT HALT: Administrator account "%" (UUID: %) has not confirmed their email (email_confirmed_at is NULL). Email confirmation is required.', v_admin_email, v_admin_id;
  END IF;

  RAISE NOTICE 'PREFLIGHT OK: Verified Administrator identified (Email: %, UUID: %).', v_admin_email, v_admin_id;
END $$;

-- -------------------------------------------------------------------------
-- STEP 2: RECONCILE public.profiles COLUMNS & CONSTRAINTS
-- -------------------------------------------------------------------------

-- 2a. Reconcile Role Check Constraint
-- The live database enforces: CHECK (role IN ('user', 'admin', 'manager', 'tenant')).
-- Temporarily expand constraint to permit 'investor' alongside 'user' for backfill:
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('investor', 'user', 'admin', 'manager', 'tenant'));

-- 2b. Add Missing Profiles Columns (Idempotent)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kyc_status TEXT NOT NULL DEFAULT 'Pending';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role_approval_status TEXT NOT NULL DEFAULT 'Pending';

-- 2c. Backfill and Cross-Alias Names and Emails
-- Set full_name from display_name or auth metadata if missing
UPDATE public.profiles p
SET full_name = COALESCE(
  NULLIF(p.full_name, ''),
  NULLIF(p.display_name, ''),
  u.raw_user_meta_data->>'full_name',
  u.raw_user_meta_data->>'name',
  ''
)
FROM auth.users u
WHERE p.id = u.id AND (p.full_name IS NULL OR p.full_name = '');

-- Set display_name from full_name if display_name is missing
UPDATE public.profiles
SET display_name = full_name
WHERE (display_name IS NULL OR display_name = '') AND (full_name IS NOT NULL AND full_name <> '');

-- Backfill email from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- Safe unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx 
ON public.profiles(email) 
WHERE email IS NOT NULL;

-- 2d. Column Check Constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass AND conname = 'profiles_kyc_status_check'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_kyc_status_check 
      CHECK (kyc_status IN ('Pending', 'Under Review', 'Verified', 'Rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass AND conname = 'profiles_role_approval_status_check'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_approval_status_check 
      CHECK (role_approval_status IN ('Pending', 'Approved', 'Rejected'));
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- STEP 3: BASELINE BACKFILL & VERIFIED ADMINISTRATOR ELEVATION
-- -------------------------------------------------------------------------

-- 3a. Convert legacy 'user' accounts to retail 'investor' role
-- Per StateEra business policy, retail investors are auto-approved.
UPDATE public.profiles
SET 
  role = 'investor',
  role_approval_status = 'Approved'
WHERE role = 'user';

-- 3b. Auto-approve any pre-existing 'investor' profiles
UPDATE public.profiles
SET role_approval_status = 'Approved'
WHERE role = 'investor' AND role_approval_status = 'Pending';

-- 3c. Commercial Managers and Residential Tenants strictly remain 'Pending'
-- Identity (KYC) does not constitute management authority; requires administrative due diligence.

-- 3d. Verified Administrator Bootstrap & Preservation
-- Promote and approve strictly the verified owner account identified by v_admin_email.
-- Any pre-existing approved admin accounts are preserved and NEVER demoted.
DO $$
DECLARE
  v_admin_email text := '__REPLACE_WITH_VERIFIED_ADMIN_EMAIL__';
  v_admin_id uuid;
  v_admin_name text;
BEGIN
  SELECT id, COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'Administrator')
  INTO v_admin_id, v_admin_name
  FROM auth.users
  WHERE LOWER(email) = LOWER(TRIM(v_admin_email));

  -- Reconcile or insert profile row for the verified admin
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    display_name,
    role,
    kyc_status,
    role_approval_status
  )
  VALUES (
    v_admin_id,
    v_admin_email,
    v_admin_name,
    v_admin_name,
    'admin',
    'Verified',
    'Approved'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    role = 'admin',
    role_approval_status = 'Approved',
    kyc_status = 'Verified',
    email = EXCLUDED.email,
    full_name = CASE WHEN public.profiles.full_name IS NULL OR public.profiles.full_name = '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END,
    display_name = CASE WHEN public.profiles.display_name IS NULL OR public.profiles.display_name = '' THEN EXCLUDED.display_name ELSE public.profiles.display_name END;

  RAISE NOTICE 'BOOTSTRAP OK: Administrator clearance granted to % (UUID: %).', v_admin_email, v_admin_id;
END $$;

-- 3e. Tighten profiles_role_check constraint now that all legacy 'user' accounts are converted
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('investor', 'admin', 'manager', 'tenant'));

-- -------------------------------------------------------------------------
-- STEP 4: SECURITY DEFINER HELPER FUNCTIONS (ANTI-RECURSION, FIXED search_path)
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
-- STEP 5: CREATE SECONDARY TABLES & ANTI-TAMPER TRIGGERS (INVOKER PRIVILEGES)
-- -------------------------------------------------------------------------

-- 5a. Human Expert Appointments
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

-- 5b. Community Property Lab Proposals
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

-- 5c. Micro-Saver Ownership Plans
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

-- 5d. Anti-Tamper Trigger Function for Community Proposals
-- Security Invoker: executes with invoker permissions; does NOT escalate privileges.
CREATE OR REPLACE FUNCTION public.enforce_community_proposal_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  -- Bypass enforcement for:
  -- 1. Direct superuser / platform maintainers (e.g. migrations or psql as postgres / supabase_admin)
  -- 2. Supabase backend service_role (API calls utilizing secret service key)
  -- 3. Confirmed platform administrators with role_approval_status = 'Approved'
  IF current_user IN ('postgres', 'supabase_admin') 
     OR current_user = 'service_role'
     OR COALESCE(pg_catalog.current_setting('request.jwt.claim.role', true), '') = 'service_role'
     OR public.is_approved_admin() THEN
    RETURN NEW;
  END IF;

  -- Authors cannot alter status away from Under Review
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    RAISE EXCEPTION 'Proposal status can only be modified by platform administrators.';
  END IF;

  -- Authors cannot directly modify vote counts via REST UPDATE
  IF NEW.votes_count IS DISTINCT FROM OLD.votes_count THEN
    RAISE EXCEPTION 'Vote counts cannot be modified directly via update operations.';
  END IF;

  -- Proposal ownership and creation timestamp are immutable
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Proposal ownership is immutable.';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Proposal creation timestamp is immutable.';
  END IF;

  RETURN NEW;
END;
$$;

ALTER FUNCTION public.enforce_community_proposal_integrity() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.enforce_community_proposal_integrity() TO authenticated, service_role;

DROP TRIGGER IF EXISTS trg_community_proposals_integrity ON public.community_proposals;
CREATE TRIGGER trg_community_proposals_integrity
BEFORE UPDATE ON public.community_proposals
FOR EACH ROW EXECUTE FUNCTION public.enforce_community_proposal_integrity();

-- 5e. Anti-Tamper Trigger Function for Micro-Saver Plans
-- Security Invoker: executes with invoker permissions; does NOT escalate privileges.
CREATE OR REPLACE FUNCTION public.enforce_micro_saver_plan_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  -- Bypass enforcement for:
  -- 1. Direct superuser / platform maintainers (e.g. migrations or psql as postgres / supabase_admin)
  -- 2. Supabase backend service_role (API calls utilizing secret service key)
  -- 3. Confirmed platform administrators with role_approval_status = 'Approved'
  IF current_user IN ('postgres', 'supabase_admin') 
     OR current_user = 'service_role'
     OR COALESCE(pg_catalog.current_setting('request.jwt.claim.role', true), '') = 'service_role'
     OR public.is_approved_admin() THEN
    RETURN NEW;
  END IF;

  -- Ordinary users cannot inflate current_saved balance (ledger deposits only)
  IF NEW.current_saved IS DISTINCT FROM OLD.current_saved THEN
    RAISE EXCEPTION 'Current saved balance is managed strictly via ledger deposits.';
  END IF;

  -- Ownership and target property allocations are immutable
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Plan ownership cannot be transferred.';
  END IF;
  IF NEW.target_property_id IS DISTINCT FROM OLD.target_property_id THEN
    RAISE EXCEPTION 'Target property allocation cannot be altered once initialized.';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Plan creation timestamp is immutable.';
  END IF;

  RETURN NEW;
END;
$$;

ALTER FUNCTION public.enforce_micro_saver_plan_integrity() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.enforce_micro_saver_plan_integrity() TO authenticated, service_role;

DROP TRIGGER IF EXISTS trg_micro_saver_plans_integrity ON public.micro_saver_plans;
CREATE TRIGGER trg_micro_saver_plans_integrity
BEFORE UPDATE ON public.micro_saver_plans
FOR EACH ROW EXECUTE FUNCTION public.enforce_micro_saver_plan_integrity();

-- 5f. Anti-Tamper Trigger Function for Expert Appointments
-- Security Invoker: executes with invoker permissions; does NOT escalate privileges.
CREATE OR REPLACE FUNCTION public.enforce_expert_appointment_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  -- Bypass enforcement for:
  -- 1. Direct superuser / platform maintainers (e.g. migrations or psql as postgres / supabase_admin)
  -- 2. Supabase backend service_role (API calls utilizing secret service key)
  -- 3. Confirmed platform administrators with role_approval_status = 'Approved'
  IF current_user IN ('postgres', 'supabase_admin') 
     OR current_user = 'service_role'
     OR COALESCE(pg_catalog.current_setting('request.jwt.claim.role', true), '') = 'service_role'
     OR public.is_approved_admin() THEN
    RETURN NEW;
  END IF;

  -- Ownership is immutable
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Appointment ownership cannot be transferred.';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Appointment creation timestamp is immutable.';
  END IF;

  -- Ordinary users can only cancel their appointment; marking Completed requires administrative verification
  IF NEW.status = 'Completed' AND OLD.status <> 'Completed' THEN
    RAISE EXCEPTION 'Appointments can only be marked Completed by an administrator or service representative.';
  END IF;

  RETURN NEW;
END;
$$;

ALTER FUNCTION public.enforce_expert_appointment_integrity() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.enforce_expert_appointment_integrity() TO authenticated, service_role;

DROP TRIGGER IF EXISTS trg_expert_appointments_integrity ON public.expert_appointments;
CREATE TRIGGER trg_expert_appointments_integrity
BEFORE UPDATE ON public.expert_appointments
FOR EACH ROW EXECUTE FUNCTION public.enforce_expert_appointment_integrity();

-- -------------------------------------------------------------------------
-- STEP 6: CLEAN-SLATE REMOVAL OF KNOWN LEGACY POLICIES
-- -------------------------------------------------------------------------

-- Drop known legacy policies on public.profiles deterministically:
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update non-role fields of own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Drop any remaining unrecognized profiles policies cleanly:
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

-- 7a. Profiles Policies
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_approved_admin());

-- Strict Registration: Direct REST insert only allowed for investor with Approved status
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() = id AND 
  role = 'investor' AND
  role_approval_status = 'Approved'
);

-- Self-Update: Users can update non-role fields, but role and status must match database
CREATE POLICY "Users can update non-role fields of own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = public.get_user_role(auth.uid()) AND
  role_approval_status = public.get_user_approval_status(auth.uid())
);

-- Administrator Role Management: Approved Admins can update roles/KYC of other accounts,
-- but CANNOT alter their own role or approval status (prevents self-lockout or elevation).
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

-- 7b. Expert Appointments Policies
DROP POLICY IF EXISTS "Users can view own appointments" ON public.expert_appointments;
CREATE POLICY "Users can view own appointments" 
ON public.expert_appointments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id OR public.is_approved_admin());

DROP POLICY IF EXISTS "Users can insert own appointments" ON public.expert_appointments;
CREATE POLICY "Users can insert own appointments" 
ON public.expert_appointments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id AND status = 'Scheduled');

DROP POLICY IF EXISTS "Users can update own appointments" ON public.expert_appointments;
CREATE POLICY "Users can update own appointments" 
ON public.expert_appointments FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id OR public.is_approved_admin())
WITH CHECK (auth.uid() = user_id OR public.is_approved_admin());

-- 7c. Community Proposals Policies
DROP POLICY IF EXISTS "Anyone can view community proposals" ON public.community_proposals;
CREATE POLICY "Anyone can view community proposals" 
ON public.community_proposals FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can submit proposals" ON public.community_proposals;
CREATE POLICY "Authenticated users can submit proposals" 
ON public.community_proposals FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id AND status = 'Under Review' AND votes_count = 1);

DROP POLICY IF EXISTS "Users can update own proposals" ON public.community_proposals;
CREATE POLICY "Users can update own proposals" 
ON public.community_proposals FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id OR public.is_approved_admin())
WITH CHECK (auth.uid() = user_id OR public.is_approved_admin());

-- 7d. Micro-Saver Plans Policies
DROP POLICY IF EXISTS "Users can view own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can view own micro-saver plans" 
ON public.micro_saver_plans FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id OR public.is_approved_admin());

DROP POLICY IF EXISTS "Users can insert own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can insert own micro-saver plans" 
ON public.micro_saver_plans FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id AND current_saved = 0);

DROP POLICY IF EXISTS "Users can update own micro-saver plans" ON public.micro_saver_plans;
CREATE POLICY "Users can update own micro-saver plans" 
ON public.micro_saver_plans FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id OR public.is_approved_admin())
WITH CHECK (auth.uid() = user_id OR public.is_approved_admin());

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
  -- Strict server-side invariant: All public registrations receive 'investor' role.
  -- Client metadata ('admin', 'manager', 'tenant') is completely ignored.
  user_full_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '');

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    display_name,
    role,
    kyc_status,
    role_approval_status
  )
  VALUES (
    new.id,
    new.email,
    user_full_name,
    user_full_name,
    'investor',
    'Pending',
    'Approved'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = CASE WHEN public.profiles.full_name IS NULL OR public.profiles.full_name = '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END,
      display_name = CASE WHEN public.profiles.display_name IS NULL OR public.profiles.display_name = '' THEN EXCLUDED.display_name ELSE public.profiles.display_name END;

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
-- Note on legacy private.handle_new_user():
-- The function in schema 'private' is preserved to avoid breaking internal dependencies.
-- Only the active trigger binding on auth.users is redirected to public.handle_new_user().
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

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- -------------------------------------------------------------------------
-- STEP 9: POST-MIGRATION INTEGRITY ASSERTIONS
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_admin_email text := '__REPLACE_WITH_VERIFIED_ADMIN_EMAIL__';
  v_admin_approved boolean := false;
  v_legacy_user_count int := 0;
  v_null_approval_count int := 0;
BEGIN
  -- 9a. Assert role_approval_status column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role_approval_status'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: role_approval_status column was not created.';
  END IF;

  -- 9b. Assert profiles_role_check exists and enforces correct roles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass AND conname = 'profiles_role_check'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: profiles_role_check constraint is missing.';
  END IF;

  -- 9c. Assert zero legacy 'user' rows remain
  SELECT COUNT(*) INTO v_legacy_user_count FROM public.profiles WHERE role = 'user';
  IF v_legacy_user_count > 0 THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: % legacy role=user profiles were not backfilled.', v_legacy_user_count;
  END IF;

  -- 9d. Assert zero profiles have NULL approval status
  SELECT COUNT(*) INTO v_null_approval_count FROM public.profiles WHERE role_approval_status IS NULL;
  IF v_null_approval_count > 0 THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: % profiles have NULL role_approval_status.', v_null_approval_count;
  END IF;

  -- 9e. Assert verified admin is Approved
  SELECT (role = 'admin' AND role_approval_status = 'Approved') INTO v_admin_approved
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE LOWER(u.email) = LOWER(TRIM(v_admin_email));

  IF NOT COALESCE(v_admin_approved, false) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: Verified administrator "%" was not approved in public.profiles.', v_admin_email;
  END IF;

  -- 9f. Assert helper functions exist and owned by postgres
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p 
    JOIN pg_namespace n ON n.oid = p.pronamespace 
    JOIN pg_roles r ON r.oid = p.proowner
    WHERE n.nspname = 'public' AND p.proname = 'is_approved_admin' AND r.rolname = 'postgres'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: is_approved_admin function missing or not owned by postgres.';
  END IF;

  -- 9g. Assert anti-tamper triggers are active on secondary tables
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t 
    JOIN pg_class c ON c.oid = t.tgrelid 
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'community_proposals' 
      AND t.tgname = 'trg_community_proposals_integrity' AND t.tgenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: trg_community_proposals_integrity trigger is missing or inactive.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t 
    JOIN pg_class c ON c.oid = t.tgrelid 
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'micro_saver_plans' 
      AND t.tgname = 'trg_micro_saver_plans_integrity' AND t.tgenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: trg_micro_saver_plans_integrity trigger is missing or inactive.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t 
    JOIN pg_class c ON c.oid = t.tgrelid 
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'expert_appointments' 
      AND t.tgname = 'trg_expert_appointments_integrity' AND t.tgenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: trg_expert_appointments_integrity trigger is missing or inactive.';
  END IF;

  -- 9h. Assert auth trigger is active on auth.users
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t 
    JOIN pg_class c ON c.oid = t.tgrelid 
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'users' 
      AND t.tgname = 'on_auth_user_created' AND t.tgenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'POSTFLIGHT HALT: on_auth_user_created trigger is missing or inactive on auth.users.';
  END IF;

  RAISE NOTICE '========================================================================';
  RAISE NOTICE '  STATEERA RBAC & PROFILE SECURITY RECONCILIATION: COMPLETED SUCCESSFULLY';
  RAISE NOTICE '========================================================================';
END $$;

COMMIT;
