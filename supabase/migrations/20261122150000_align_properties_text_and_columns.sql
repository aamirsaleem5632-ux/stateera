-- =========================================================================
-- STATEERA SCHEMA HARMONIZATION & TEXT IDENTIFIERS MIGRATION
-- Migration Ref: 20261122150000_align_properties_text_and_columns.sql
-- Target Project: mprxmjlqcdfawbqzajtb
-- Converts properties.id and all 7 foreign keys from UUID to TEXT
-- Adds missing prospectus and operational columns safely
-- =========================================================================

BEGIN;

-- 1. Drop all policies depending on properties.id and leases.property_id
DROP POLICY IF EXISTS "Assigned managers view their properties" ON public.properties;
DROP POLICY IF EXISTS "Assigned managers view property leases" ON public.leases;
DROP POLICY IF EXISTS "Assigned managers view property maintenance" ON public.maintenance_requests;
DROP POLICY IF EXISTS "Assigned managers update property maintenance" ON public.maintenance_requests;
DROP POLICY IF EXISTS "Assigned managers view property rent payments" ON public.rent_payments;

-- 2. Drop all 7 existing foreign key constraints referencing properties(id)
ALTER TABLE IF EXISTS public.holdings DROP CONSTRAINT IF EXISTS holdings_property_id_fkey;
ALTER TABLE IF EXISTS public.transactions DROP CONSTRAINT IF EXISTS transactions_property_id_fkey;
ALTER TABLE IF EXISTS public.payouts DROP CONSTRAINT IF EXISTS payouts_property_id_fkey;
ALTER TABLE IF EXISTS public.leases DROP CONSTRAINT IF EXISTS leases_property_id_fkey;
ALTER TABLE IF EXISTS public.maintenance_requests DROP CONSTRAINT IF EXISTS maintenance_requests_property_id_fkey;
ALTER TABLE IF EXISTS public.watchlist DROP CONSTRAINT IF EXISTS watchlist_property_id_fkey;
ALTER TABLE IF EXISTS public.governance_proposals DROP CONSTRAINT IF EXISTS governance_proposals_property_id_fkey;

-- 3. Drop UUID default on properties.id if it exists
ALTER TABLE public.properties ALTER COLUMN id DROP DEFAULT;

-- 4. Convert properties.id to TEXT
ALTER TABLE public.properties ALTER COLUMN id TYPE TEXT USING id::text;

-- 5. Convert foreign key columns on all 7 dependent tables to TEXT
ALTER TABLE public.holdings ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.transactions ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.payouts ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.leases ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.maintenance_requests ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.watchlist ALTER COLUMN property_id TYPE TEXT USING property_id::text;
ALTER TABLE public.governance_proposals ALTER COLUMN property_id TYPE TEXT USING property_id::text;

-- 6. Update private.is_approved_manager_for_property to accept TEXT
CREATE OR REPLACE FUNCTION private.is_approved_manager_for_property(p_property_id text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles me
    JOIN public.properties prop ON prop.manager_id = me.id
    WHERE me.id = (SELECT auth.uid())
      AND me.role = 'manager'
      AND me.role_approval_status = 'Approved'
      AND prop.id = p_property_id
  );
$$;

-- 7. Re-establish all 7 foreign key constraints referencing properties(id)
ALTER TABLE public.holdings ADD CONSTRAINT holdings_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE RESTRICT;

ALTER TABLE public.transactions ADD CONSTRAINT transactions_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;

ALTER TABLE public.payouts ADD CONSTRAINT payouts_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;

ALTER TABLE public.leases ADD CONSTRAINT leases_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE RESTRICT;

ALTER TABLE public.maintenance_requests ADD CONSTRAINT maintenance_requests_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE RESTRICT;

ALTER TABLE public.watchlist ADD CONSTRAINT watchlist_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;

ALTER TABLE public.governance_proposals ADD CONSTRAINT governance_proposals_property_id_fkey 
  FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;

-- 8. Add missing columns to properties table
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE public.properties SET title = name WHERE title IS NULL AND name IS NOT NULL;

ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS headline TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS developer TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS year_built INT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS total_area_sqft INT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS total_valuation NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS share_price NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS total_shares INT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS available_shares INT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS funded_percentage NUMERIC DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS gross_yield NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS net_yield NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS estimated_monthly_rent NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS monthly_per_share_rent NUMERIC;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS next_payout_date DATE;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS due_diligence_score INT DEFAULT 95;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS transparency_score INT DEFAULT 96;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS property_passport_id TEXT;

-- 9. Add missing columns to leases
ALTER TABLE public.leases ADD COLUMN IF NOT EXISTS unit_number TEXT;
ALTER TABLE public.leases ADD COLUMN IF NOT EXISTS security_deposit NUMERIC DEFAULT 0;
ALTER TABLE public.leases ADD COLUMN IF NOT EXISTS payment_due_day INT DEFAULT 1;

-- 10. Add missing columns to rent_payments
ALTER TABLE public.rent_payments ADD COLUMN IF NOT EXISTS property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT;
ALTER TABLE public.rent_payments ADD COLUMN IF NOT EXISTS month TEXT;
ALTER TABLE public.rent_payments ADD COLUMN IF NOT EXISTS paid_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.rent_payments ADD COLUMN IF NOT EXISTS receipt_id TEXT;
ALTER TABLE public.rent_payments ADD COLUMN IF NOT EXISTS transaction_ref TEXT;

-- 11. Add missing columns to maintenance_requests
ALTER TABLE public.maintenance_requests ADD COLUMN IF NOT EXISTS unit_number TEXT;
ALTER TABLE public.maintenance_requests ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.maintenance_requests ADD COLUMN IF NOT EXISTS estimated_cost NUMERIC;
ALTER TABLE public.maintenance_requests ADD COLUMN IF NOT EXISTS actual_cost NUMERIC;

-- 12. Add missing columns to holdings
ALTER TABLE public.holdings ADD COLUMN IF NOT EXISTS shares_owned INT DEFAULT 0 CHECK (shares_owned >= 0);

-- 13. Add missing columns to transactions
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS type TEXT;
UPDATE public.transactions SET type = upper(transaction_type) WHERE type IS NULL AND transaction_type IS NOT NULL;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS shares INT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS fee NUMERIC DEFAULT 0;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reference_code TEXT;
UPDATE public.transactions SET reference_code = 'TX-HIST-' || upper(substring(id::text, 1, 8)) WHERE reference_code IS NULL;

COMMIT;
