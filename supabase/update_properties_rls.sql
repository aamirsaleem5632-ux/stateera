DROP POLICY IF EXISTS "Published properties are viewable by everyone" ON public.properties;
DROP POLICY IF EXISTS "Public properties read access" ON public.properties;
CREATE POLICY "Public properties read access" ON public.properties FOR SELECT TO public USING (true);
