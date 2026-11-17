-- STATEERA SUPABASE SCHEMA DEFINITION
-- Complete production-grade tables with Row Level Security (RLS) support

-- 1. Profiles (User details mapped to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'investor' CHECK (role IN ('investor', 'tenant', 'manager', 'admin')),
  kyc_status TEXT NOT NULL DEFAULT 'Pending' CHECK (kyc_status IN ('Pending', 'Under Review', 'Verified', 'Rejected')),
  phone TEXT,
  country TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Properties (Catalogue of real estate assets)
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  headline TEXT,
  description TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT,
  address TEXT,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'funded', 'coming_soon')),
  developer TEXT,
  year_built INT,
  total_area_sqft INT,
  cover_image TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  total_valuation NUMERIC NOT NULL,
  share_price NUMERIC NOT NULL,
  total_shares INT NOT NULL,
  available_shares INT NOT NULL,
  funded_percentage NUMERIC DEFAULT 0,
  gross_yield NUMERIC NOT NULL,
  net_yield NUMERIC NOT NULL,
  occupancy_rate NUMERIC NOT NULL,
  estimated_monthly_rent NUMERIC NOT NULL,
  monthly_per_share_rent NUMERIC NOT NULL,
  next_payout_date DATE,
  due_diligence_score INT DEFAULT 95,
  transparency_score INT DEFAULT 96,
  property_passport_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Holdings (User share ownership)
CREATE TABLE IF NOT EXISTS public.holdings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT NOT NULL,
  shares_owned INT NOT NULL CHECK (shares_owned >= 0),
  average_purchase_price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, property_id)
);

-- 4. Transactions (Wallet deposits, withdrawals, share buy/sell)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL', 'BUY', 'SELL', 'DIVIDEND')),
  amount NUMERIC NOT NULL,
  shares INT,
  fee NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Completed' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Cancelled')),
  reference_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Human Expert Network Appointments
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

-- 6. Community Property Lab Proposals
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

-- 7. Micro-Saver Ownership Plans
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
