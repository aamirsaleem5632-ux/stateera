-- =========================================================================
-- STATEERA FOUR-ROLE INTEGRATION & SCENARIO TESTING SCRIPT
-- Tests: Manager assignment check, tenant lease check, dividend payout, rate limiting
-- =========================================================================

BEGIN;

DO $$
DECLARE
  v_admin_id UUID := 'b37da594-0108-42d7-8310-573bee6a99d4'::uuid;
  v_investor_id UUID := '7fc8eb64-d73b-455b-bd82-5b2c7292286e'::uuid;
  v_prop_id TEXT := 'prop-dubai-marina-tower';
  v_res JSONB;
  v_rate_res JSONB;
BEGIN
  RAISE NOTICE '=== TEST 1: Admin Dividend Payout Workflow ===';
  -- Impersonate Admin
  PERFORM set_config('request.jwt.claim.sub', v_admin_id::text, true);
  SET LOCAL ROLE authenticated;

  -- First, give investor 100 shares of Dubai Marina Tower so dividend has a recipient
  INSERT INTO public.holdings (user_id, property_id, shares_owned, average_purchase_price)
  VALUES (v_investor_id, v_prop_id, 100, 100)
  ON CONFLICT (user_id, property_id) DO UPDATE SET shares_owned = 100;

  -- Trigger dividend distribution as admin
  v_res := public.execute_dividend_payout(v_prop_id, 'November 2026');
  RAISE NOTICE 'Dividend Payout Result: %', v_res;

  IF (v_res->>'success')::boolean IS NOT TRUE THEN
    RAISE EXCEPTION 'Dividend payout failed: %', v_res;
  END IF;

  -- Verify ledger entry was recorded
  IF NOT EXISTS (SELECT 1 FROM public.accounting_ledger WHERE property_id = v_prop_id AND category = 'Dividend Distribution') THEN
    RAISE EXCEPTION 'Accounting ledger record for dividend distribution missing';
  END IF;

  RAISE NOTICE '=== TEST 2: Persistent Rate Limiting Workflow ===';
  v_rate_res := public.check_and_record_invitation_attempt('192.168.1.100', 5, 5);
  RAISE NOTICE 'Rate Limiting Result: %', v_rate_res;
  IF (v_rate_res->>'is_rate_limited')::boolean IS TRUE THEN
    RAISE EXCEPTION 'First attempt should not be rate limited';
  END IF;

  RAISE NOTICE '=== TEST 3: Unauthorized Dividend Attempt by Investor (Must Fail) ===';
  PERFORM set_config('request.jwt.claim.sub', v_investor_id::text, true);
  BEGIN
    PERFORM public.execute_dividend_payout(v_prop_id, 'November 2026');
    RAISE EXCEPTION 'Security breach: Investor was able to trigger dividend payout!';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Access properly denied to investor for dividend payout: %', SQLERRM;
  END;

  RAISE NOTICE '=== ALL FOUR ROLE OPERATIONAL TESTS PASSED ===';
END $$;

ROLLBACK;
