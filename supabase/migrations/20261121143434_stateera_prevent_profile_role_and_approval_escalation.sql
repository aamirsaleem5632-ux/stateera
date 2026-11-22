-- =========================================================================
-- STATEERA SECURITY MIGRATION: 20261121143434
-- Name: stateera_prevent_profile_role_and_approval_escalation
-- Target Project Ref: mprxmjlqcdfawbqzajtb
--
-- Security Audit Findings:
-- 1. The function private.prevent_profile_role_escalation() contains logic
--    blocking changes to both 'role' and 'role_approval_status' from user sessions
--    (current_user = 'authenticated').
-- 2. However, the existing trigger on public.profiles was created as:
--      BEFORE UPDATE OF role ON profiles
--    which only fired when 'role' was updated, leaving updates to 'role_approval_status'
--    unguarded by the trigger.
-- 3. In combination with the permissive profile UPDATE policy for authenticated users
--    (id = auth.uid()), this allowed normal authenticated users to self-approve.
-- 4. Direct EXECUTE permission on private.prevent_profile_role_escalation() was also
--    open to PUBLIC/authenticated rather than restricted to postgres/service_role.
--
-- Resolution:
-- 1. Ensure private.prevent_profile_role_escalation() is strictly defined, owned by
--    postgres, with search_path = '', preventing changes to either role or
--    role_approval_status in authenticated user sessions.
-- 2. Re-create the trigger to fire on updates to BOTH role and role_approval_status:
--      BEFORE UPDATE OF role, role_approval_status ON public.profiles
-- 3. Lock down EXECUTE permissions on private.prevent_profile_role_escalation()
--    to postgres and service_role, revoking from PUBLIC, anon, and authenticated.
-- 4. Preserve trusted backend workflows (e.g. service_role / postgres) so authorized
--    administrative approvals function as intended.
-- =========================================================================

-- Step 1: Ensure function definition is current, secure, and owned by postgres
CREATE OR REPLACE FUNCTION private.prevent_profile_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
begin
  if current_user = 'authenticated'
     and (
       new.role is distinct from old.role
       or new.role_approval_status is distinct from old.role_approval_status
     ) then
    raise exception 'Profile role and approval changes are not allowed from user sessions'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

ALTER FUNCTION private.prevent_profile_role_escalation() OWNER TO postgres;

-- Step 2: Restrict direct EXECUTE permissions on trigger-only function
REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM anon;
REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM authenticated;
GRANT EXECUTE ON FUNCTION private.prevent_profile_role_escalation() TO postgres;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE ON FUNCTION private.prevent_profile_role_escalation() TO service_role;
  END IF;
END $$;

-- Step 3: Re-create profile trigger to fire on updates to both role and role_approval_status
DROP TRIGGER IF EXISTS prevent_profile_role_escalation ON public.profiles;

CREATE TRIGGER prevent_profile_role_escalation
BEFORE UPDATE OF role, role_approval_status ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION private.prevent_profile_role_escalation();
