import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const requestedNext = searchParams.get("next");
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const siteOrigin = !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  if (errorParam) {
    const loginUrl = new URL("/login", siteOrigin);
    loginUrl.searchParams.set(
      "error",
      errorDescription || errorParam || "auth_callback_failed"
    );
    return NextResponse.redirect(loginUrl);
  }

  let next = type === "recovery" ? "/auth/reset-password" : "/dashboard";

  if (
    requestedNext &&
    requestedNext.startsWith("/") &&
    !requestedNext.startsWith("//") &&
    !requestedNext.includes("\\")
  ) {
    try {
      const parsed = new URL(requestedNext, siteOrigin);

      if (parsed.origin === siteOrigin) {
        next = parsed.pathname + parsed.search + parsed.hash;
      }
    } catch {
      next = type === "recovery" ? "/auth/reset-password" : "/dashboard";
    }
  }

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, siteOrigin));
    }

    const redirectUrl = new URL("/login", siteOrigin);
    redirectUrl.searchParams.set("error", "auth_callback_failed");
    redirectUrl.searchParams.set("error_description", error.message);
    return NextResponse.redirect(redirectUrl);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });

    if (!error) {
      return NextResponse.redirect(new URL(next, siteOrigin));
    }

    const redirectUrl = new URL("/login", siteOrigin);
    redirectUrl.searchParams.set("error", "auth_callback_failed");
    redirectUrl.searchParams.set("error_description", error.message);
    return NextResponse.redirect(redirectUrl);
  }

  const redirectUrl = new URL("/login", siteOrigin);
  redirectUrl.searchParams.set("error", "auth_callback_failed");
  return NextResponse.redirect(redirectUrl);
}
