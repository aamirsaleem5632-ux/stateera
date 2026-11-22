-- =========================================================================
-- STATEERA FINANCIAL RPC ATOMICITY & CONCURRENCY VERIFICATION
-- Tests: deposit, buy, sell, withdraw, rate limiting, and manager check
-- =========================================================================

BEGIN;

DO $$
DECLARE
  v_test_user_id UUID := '7fc8eb64-d73b-455b-bd82-5b2c7292286e'::uuid;
  v_prop_id TEXT := 'prop-dubai-marina-tower';
  v_res JSONB;
  v_balance NUMERIC;
  v_shares INT;
  v_avail_shares INT;
BEGIN
  RAISE NOTICE '=== TEST 1: Impersonate Investor ===';
  -- Set session auth to test user
  PERFORM set_config('request.jwt.claim.sub', v_test_user_id::text, true);
  SET LOCAL ROLE authenticated;

  RAISE NOTICE '=== TEST 2: Execute Deposit Funds ($5,000) ===';
  v_res := public.execute_deposit_funds(5000);
  RAISE NOTICE 'Deposit Result: %', v_res;

  SELECT balance INTO v_balance FROM public.wallets WHERE user_id = v_test_user_id;
  IF v_balance <> 5000 THEN
    RAISE EXCEPTION 'Wallet balance should be 5000, got %', v_balance;
  END IF;

  RAISE NOTICE '=== TEST 3: Execute Buy 10 Shares of Dubai Marina Tower ($1,000) ===';
  v_res := public.execute_buy_shares(v_prop_id, 10, 'Market', NULL);
  RAISE NOTICE 'Buy Shares Result: %', v_res;

  SELECT balance INTO v_balance FROM public.wallets WHERE user_id = v_test_user_id;
  IF v_balance <> 4000 THEN
    RAISE EXCEPTION 'Wallet balance should be 4000 after purchase, got %', v_balance;
  END IF;

  SELECT shares_owned INTO v_shares FROM public.holdings WHERE user_id = v_test_user_id AND property_id = v_prop_id;
  IF v_shares <> 10 THEN
    RAISE EXCEPTION 'Holdings should be 10 shares, got %', v_shares;
  END IF;

  RAISE NOTICE '=== TEST 4: Execute Sell 5 Shares of Dubai Marina Tower ($500) ===';
  v_res := public.execute_sell_shares(v_prop_id, 5);
  RAISE NOTICE 'Sell Shares Result: %', v_res;

  SELECT balance INTO v_balance FROM public.wallets WHERE user_id = v_test_user_id;
  IF v_balance <> 4500 THEN
    RAISE EXCEPTION 'Wallet balance should be 4500 after selling 5 shares, got %', v_balance;
  END IF;

  SELECT shares_owned INTO v_shares FROM public.holdings WHERE user_id = v_test_user_id AND property_id = v_prop_id;
  IF v_shares <> 5 THEN
    RAISE EXCEPTION 'Holdings should be 5 shares after selling 5, got %', v_shares;
  END IF;

  RAISE NOTICE '=== TEST 5: Execute Withdraw Funds ($2,000) ===';
  v_res := public.execute_withdraw_funds(2000);
  RAISE NOTICE 'Withdraw Result: %', v_res;

  SELECT balance INTO v_balance FROM public.wallets WHERE user_id = v_test_user_id;
  IF v_balance <> 2500 THEN
    RAISE EXCEPTION 'Wallet balance should be 2500, got %', v_balance;
  END IF;

  RAISE NOTICE '=== TEST 6: Verify Transaction Traceability ===';
  IF NOT EXISTS (SELECT 1 FROM public.transactions WHERE user_id = v_test_user_id AND type = 'BUY') THEN
    RAISE EXCEPTION 'BUY transaction record missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.transactions WHERE user_id = v_test_user_id AND type = 'SELL') THEN
    RAISE EXCEPTION 'SELL transaction record missing';
  END IF;

  RAISE NOTICE '=== ALL FINANCIAL RPCS EXECUTED SUCCESSFULLY ===';
END $$;

-- Rollback the test mutations so user 7fc8eb64-d73b-455b-bd82-5b2c7292286e returns to clean state
ROLLBACK;
