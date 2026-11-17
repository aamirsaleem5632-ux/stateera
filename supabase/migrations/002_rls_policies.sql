-- STATEERA ROW LEVEL SECURITY (RLS) POLICIES
-- Enforce strict role-based access so users cannot elevate their own roles

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.micro_saver_plans ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
-- Everyone authenticated can view their own profile; admins can view all.
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can update non-role fields of own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = (SELECT role FROM public.profiles WHERE id = auth.uid()) -- prevents self-role elevation
);

-- 2. Properties Policies
-- Anyone (even unauthenticated) can read properties
CREATE POLICY "Public properties read access" 
ON public.properties FOR SELECT 
TO public 
USING (true);

-- 3. Holdings Policies
-- Users can only view their own holdings
CREATE POLICY "Users can view own holdings" 
ON public.holdings FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 4. Transactions Policies
-- Users can only view their own transactions
CREATE POLICY "Users can view own transactions" 
ON public.transactions FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" 
ON public.transactions FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. Expert Appointments Policies
CREATE POLICY "Users view own appointments" 
ON public.expert_appointments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users insert own appointments" 
ON public.expert_appointments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 6. Community Proposals Policies
CREATE POLICY "Public can view proposals" 
ON public.community_proposals FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Users insert own proposals" 
ON public.community_proposals FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 7. Micro-Saver Plans Policies
CREATE POLICY "Users view own micro-saver plans" 
ON public.micro_saver_plans FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users manage own micro-saver plans" 
ON public.micro_saver_plans FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
