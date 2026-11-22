-- Synchronize legacy column constraints and dual compatibility for holdings and transactions
BEGIN;

-- 1. Holdings compatibility
ALTER TABLE public.holdings DROP CONSTRAINT IF EXISTS holdings_tokens_check;
ALTER TABLE public.holdings ALTER COLUMN tokens DROP NOT NULL;

CREATE OR REPLACE FUNCTION public.sync_holdings_shares()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.shares_owned IS NOT NULL THEN
    NEW.tokens := NEW.shares_owned;
  ELSIF NEW.tokens IS NOT NULL THEN
    NEW.shares_owned := NEW.tokens;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_holdings_shares ON public.holdings;
CREATE TRIGGER trg_sync_holdings_shares
BEFORE INSERT OR UPDATE ON public.holdings
FOR EACH ROW EXECUTE FUNCTION public.sync_holdings_shares();

-- 2. Transactions compatibility
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_transaction_type_check;
ALTER TABLE public.transactions ALTER COLUMN transaction_type DROP NOT NULL;
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_status_check;

CREATE OR REPLACE FUNCTION public.sync_transactions_type()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.type IS NOT NULL AND NEW.transaction_type IS NULL THEN
    NEW.transaction_type := lower(NEW.type);
  ELSIF NEW.transaction_type IS NOT NULL AND NEW.type IS NULL THEN
    NEW.type := upper(NEW.transaction_type);
  END IF;
  IF NEW.shares IS NOT NULL AND NEW.tokens IS NULL THEN
    NEW.tokens := NEW.shares;
  ELSIF NEW.tokens IS NOT NULL AND NEW.shares IS NULL THEN
    NEW.shares := NEW.tokens;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_transactions_type ON public.transactions;
CREATE TRIGGER trg_sync_transactions_type
BEFORE INSERT OR UPDATE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.sync_transactions_type();

COMMIT;
