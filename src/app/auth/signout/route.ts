import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

function getSafeSiteOrigin(request: NextRequest, fallbackOrigin: string): string {
  if (process.env.NODE_ENV === "development") return fallbackOrigin;

  const rawForwardedHost = request.headers.get("x-forwarded-host");
  const forwardedHost = rawForwardedHost ? rawForwardedHost.split(",")[0].trim().toLowerCase() : null;
  if (!forwardedHost || !/^[a-z0-9.-]+(:\d+)?$/.test(forwardedHost)) {
    return fallbackOrigin;
  }

  const requestHost = new URL(fallbackOrigin).host.toLowerCase();
  const allowedHosts = new Set<string>([requestHost, "stateera.vercel.app"]);
  if (process.env.VERCEL_URL) allowedHosts.add(process.env.VERCEL_URL.toLowerCase());
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowedHosts.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase());
    } catch {
      // Ignore malformed env URL
    }
  }

  const isAllowedVercelPreview =
    forwardedHost.endsWith(".vercel.app") && forwardedHost.startsWith("stateera");
  if (allowedHosts.has(forwardedHost) || isAllowedVercelPreview) {
    return `https://${forwardedHost}`;
  }

  return fallbackOrigin;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const siteOrigin = getSafeSiteOrigin(request, new URL(request.url).origin);

  const response = NextResponse.redirect(new URL("/login", siteOrigin), { status: 302 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return response;
}
