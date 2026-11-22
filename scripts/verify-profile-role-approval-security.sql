-- =========================================================================
-- STATEERA PROFILE ROLE & APPROVAL SECURITY VERIFICATION SCRIPT
-- Purpose:
--   Verifies genuine PostgreSQL runtime behavior:
--   1. Trigger 'prevent_profile_role_escalation' exists on public.profiles
--      and fires BEFORE UPDATE on BOTH 'role' and 'role_approval_status'.
--   2. Direct EXECUTE permission on private.prevent_profile_role_escalation()
--      is revoked from anon and authenticated roles.
--   3. Authenticated user RLS is active and genuine session claims are bound.
--   4. Authenticated users cannot change their own role (trigger raises 42501).
--   5. Authenticated users cannot change their own approval status (trigger raises 42501).
--   6. Authenticated users CAN update legitimate profile fields (e.g. display_name).
--   7. Authenticated users CANNOT update other users' profiles (RLS blocks 0 rows updated).
--   8. Trusted backend processes genuinely tested:
--      - 8A: service_role can update role and role_approval_status without error.
--      - 8B: postgres superuser can update role and role_approval_status without error.
-- =========================================================================

BEGIN;

DO $$
DECLARE
  v_tgdef text;
  v_test_user_id uuid := '00000000-0000-0000-0000-000000000099'::uuid;
  v_victim_user_id uuid := '00000000-0000-0000-0000-000000000088'::uuid;
  v_err_code text;
  v_err_msg text;
  v_role_blocked boolean := false;
  v_status_blocked boolean := false;
  v_rows_affected integer;
BEGIN
  RAISE NOTICE '=== TEST 1: Checking Trigger Definition on public.profiles ===';
  SELECT pg_get_triggerdef(oid, true)
  INTO v_tgdef
  FROM pg_trigger
  WHERE tgrelid = 'public.profiles'::regclass
    AND tgname = 'prevent_profile_role_escalation';

  IF v_tgdef IS NULL THEN
    RAISE EXCEPTION 'TEST 1 FAILED: Trigger prevent_profile_role_escalation does not exist on public.profiles';
  END IF;

  IF v_tgdef NOT ILIKE '%role%' OR v_tgdef NOT ILIKE '%role_approval_status%' THEN
    RAISE EXCEPTION 'TEST 1 FAILED: Trigger does not cover both role and role_approval_status. Definition: %', v_tgdef;
  END IF;

  RAISE NOTICE 'TEST 1 PASSED: Trigger covers both role and role_approval_status: %', v_tgdef;

  RAISE NOTICE '=== TEST 2: Checking Function Permissions ===';
  IF has_function_privilege('anon', 'private.prevent_profile_role_escalation()', 'execute') THEN
    RAISE EXCEPTION 'TEST 2 FAILED: anon still has direct EXECUTE privilege on private.prevent_profile_role_escalation()';
  END IF;
  IF has_function_privilege('authenticated', 'private.prevent_profile_role_escalation()', 'execute') THEN
    RAISE EXCEPTION 'TEST 2 FAILED: authenticated still has direct EXECUTE privilege on private.prevent_profile_role_escalation()';
  END IF;
  RAISE NOTICE 'TEST 2 PASSED: Direct EXECUTE privileges properly revoked from anon and authenticated.';

  RAISE NOTICE '=== TEST 3: Setting Up Isolated Test Accounts in auth.users and public.profiles ===';
  -- Create isolated auth.users accounts to satisfy foreign key constraints
  INSERT INTO auth.users (id, email)
  VALUES (v_test_user_id, 'test_security_audit_99@stateera.local')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO auth.users (id, email)
  VALUES (v_victim_user_id, 'test_security_audit_88@stateera.local')
  ON CONFLICT (id) DO NOTHING;

  -- Create profiles
  INSERT INTO public.profiles (id, display_name, role, role_approval_status)
  VALUES (v_test_user_id, 'Test Subject', 'investor', 'Pending')
  ON CONFLICT (id) DO UPDATE
  SET role = 'investor', role_approval_status = 'Pending', display_name = 'Test Subject';

  INSERT INTO public.profiles (id, display_name, role, role_approval_status)
  VALUES (v_victim_user_id, 'Victim User', 'investor', 'Pending')
  ON CONFLICT (id) DO UPDATE
  SET role = 'investor', role_approval_status = 'Pending', display_name = 'Victim User';

  -- Set session configuration to emulate authenticated user session
  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claim.sub', v_test_user_id::text, true);

  -- Assert current_user and auth.uid() are genuinely active
  IF current_user <> 'authenticated' THEN
    RAISE EXCEPTION 'TEST 3 SETUP FAILED: current_user is not authenticated (got: %)', current_user;
  END IF;
  IF auth.uid() <> v_test_user_id THEN
    RAISE EXCEPTION 'TEST 3 SETUP FAILED: auth.uid() does not match test user (got: %)', auth.uid();
  END IF;

  -- Test 3A: Attempt self-role elevation to 'admin' (Must be blocked by trigger)
  BEGIN
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = v_test_user_id;
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err_code = RETURNED_SQLSTATE, v_err_msg = MESSAGE_TEXT;
    IF v_err_code = '42501' THEN
      v_role_blocked := true;
      RAISE NOTICE 'TEST 3A PASSED: Blocked role modification as expected (Code: %, Msg: %)', v_err_code, v_err_msg;
    ELSE
      RAISE EXCEPTION 'TEST 3A FAILED: Unexpected error code: % (Msg: %)', v_err_code, v_err_msg;
    END IF;
  END;

  IF NOT v_role_blocked THEN
    RAISE EXCEPTION 'TEST 3A FAILED: Authenticated user was able to modify their role!';
  END IF;

  -- Test 3B: Attempt self-approval status elevation to 'Approved' (Must be blocked by trigger)
  BEGIN
    UPDATE public.profiles
    SET role_approval_status = 'Approved'
    WHERE id = v_test_user_id;
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err_code = RETURNED_SQLSTATE, v_err_msg = MESSAGE_TEXT;
    IF v_err_code = '42501' THEN
      v_status_blocked := true;
      RAISE NOTICE 'TEST 3B PASSED: Blocked approval status modification as expected (Code: %, Msg: %)', v_err_code, v_err_msg;
    ELSE
      RAISE EXCEPTION 'TEST 3B FAILED: Unexpected error code: % (Msg: %)', v_err_code, v_err_msg;
    END IF;
  END;

  IF NOT v_status_blocked THEN
    RAISE EXCEPTION 'TEST 3B FAILED: Authenticated user was able to self-approve!';
  END IF;

  -- Test 3C: Legitimate user update (display_name) - Must succeed via RLS and pass trigger
  UPDATE public.profiles
  SET display_name = 'Updated Name'
  WHERE id = v_test_user_id;
  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
  IF v_rows_affected <> 1 THEN
    RAISE EXCEPTION 'TEST 3C FAILED: Expected 1 row updated for own profile, got %', v_rows_affected;
  END IF;
  RAISE NOTICE 'TEST 3C PASSED: Normal profile update succeeded for authenticated user.';

  -- Test 3D: Attempt to update another user's profile (Must be blocked by RLS)
  UPDATE public.profiles
  SET display_name = 'Attacked Name'
  WHERE id = v_victim_user_id;
  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
  IF v_rows_affected <> 0 THEN
    RAISE EXCEPTION 'TEST 3D FAILED: RLS did not block updating another user profile! (Rows: %)', v_rows_affected;
  END IF;
  RAISE NOTICE 'TEST 3D PASSED: RLS successfully blocked modification of another user profile.';

  RAISE NOTICE '=== TEST 4: Genuine Testing of Trusted Backend Administrative Approval Workflows ===';
  -- Test 4A: Emulate trusted service_role execution (backend serverless/edge workers)
  SET LOCAL ROLE service_role;
  IF current_user <> 'service_role' THEN
    RAISE EXCEPTION 'TEST 4A SETUP FAILED: current_user is not service_role (got: %)', current_user;
  END IF;

  UPDATE public.profiles
  SET role = 'manager', role_approval_status = 'Approved'
  WHERE id = v_test_user_id;
  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
  IF v_rows_affected <> 1 THEN
    RAISE EXCEPTION 'TEST 4A FAILED: service_role failed to update profile (Rows: %)', v_rows_affected;
  END IF;
  RAISE NOTICE 'TEST 4A PASSED: Genuine service_role session successfully updated role and approval status.';

  -- Test 4B: Emulate postgres superuser administrative execution
  RESET ROLE;
  IF current_user <> 'postgres' THEN
    RAISE EXCEPTION 'TEST 4B SETUP FAILED: current_user is not postgres (got: %)', current_user;
  END IF;

  UPDATE public.profiles
  SET role = 'admin', role_approval_status = 'Approved'
  WHERE id = v_test_user_id;
  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
  IF v_rows_affected <> 1 THEN
    RAISE EXCEPTION 'TEST 4B FAILED: postgres superuser failed to update profile (Rows: %)', v_rows_affected;
  END IF;
  RAISE NOTICE 'TEST 4B PASSED: Genuine postgres superuser session successfully updated role and approval status.';

  RAISE NOTICE 'ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY.';
END $$;

-- Always rollback so no test records remain in auth.users or public.profiles
ROLLBACK;
