import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const siteOrigin = !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : new URL(request.url).origin;

  const response = NextResponse.redirect(new URL("/login", siteOrigin), { status: 302 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return response;
}
