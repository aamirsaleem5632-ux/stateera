-- Migration: 20261123234500_repair_auth_profile_trigger.sql
-- Description: Harmonize auth profile triggers and ensure investor registrations default to 'Approved'
-- Matches actual public.profiles schema (id, display_name, avatar_url, role, role_approval_status)

-- 1. Update private.handle_new_user()
CREATE OR REPLACE FUNCTION private.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    display_name,
    avatar_url,
    role,
    role_approval_status
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    'investor',
    'Approved'
  )
  ON CONFLICT (id) DO UPDATE
  SET display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
      avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);
  RETURN NEW;
END;
$$;

-- 2. Update public.handle_new_user() with identical hardened schema
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    display_name,
    avatar_url,
    role,
    role_approval_status
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    'investor',
    'Approved'
  )
  ON CONFLICT (id) DO UPDATE
  SET display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
      avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);
  RETURN NEW;
END;
$$;

ALTER FUNCTION private.handle_new_user() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION private.handle_new_user() TO postgres, supabase_auth_admin, service_role;

ALTER FUNCTION public.handle_new_user() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, supabase_auth_admin, service_role;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 3. Fix any existing investor profiles stuck in Pending
UPDATE public.profiles
SET role_approval_status = 'Approved'
WHERE role = 'investor' AND (role_approval_status = 'Pending' OR role_approval_status IS NULL);
