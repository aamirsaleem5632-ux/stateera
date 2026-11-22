import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://mprxmjlqcdfawbqzajtb.supabase.co";

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

if (!SUPABASE_KEY) {
  console.warn(
    "[stateera-backend] Warning: Supabase key is missing. Set SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
  );
}

/**
 * Returns a Supabase client.
 * If userToken is passed, requests will execute in the authenticated context of that user,
 * enforcing Row-Level Security (RLS) and auth.uid() scoping in PostgreSQL.
 */
export function getSupabaseClient(userToken?: string): SupabaseClient {
  const options: any = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      autoStart: false,
    },
  };

  if (userToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
  }

  return createClient(SUPABASE_URL, SUPABASE_KEY, options);
}

export { SUPABASE_URL, SUPABASE_KEY };
