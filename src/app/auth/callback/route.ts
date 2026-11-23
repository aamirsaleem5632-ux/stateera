import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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

  // 1. Determine safe target URL
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

  const isPasswordRecovery = type === "recovery" || next.includes("reset-password");

  // 2. Handle provider or auth error forwarded from GoTrue / OAuth
  if (errorParam) {
    if (isPasswordRecovery) {
      const resetUrl = new URL("/auth/reset-password", siteOrigin);
      resetUrl.searchParams.set(
        "error",
        errorDescription || errorParam || "Password recovery link is invalid or expired."
      );
      return NextResponse.redirect(resetUrl);
    }

    const loginUrl = new URL("/login", siteOrigin);
    const errLower = (errorDescription || errorParam || "").toLowerCase();

    // If verification token was already consumed or expired, user may already be verified
    if (
      errLower.includes("otp_expired") ||
      errLower.includes("token has expired") ||
      errLower.includes("already")
    ) {
      loginUrl.searchParams.set("message", "email_confirmed");
      return NextResponse.redirect(loginUrl);
    }

    loginUrl.searchParams.set(
      "error",
      errorDescription || errorParam || "auth_callback_failed"
    );
    return NextResponse.redirect(loginUrl);
  }

  // 3. Prepare response object to guarantee cookie persistence
  const redirectTarget = new URL(next, siteOrigin);
  const response = NextResponse.redirect(redirectTarget);

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
              response.cookies.set(name, value, options);
            });
          } catch {
            // Handled
          }
        },
      },
    }
  );

  // 4. Exchange PKCE authorization code
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }

    // Code exchange failed (e.g. PKCE verifier missing due to opening in a different browser/app)
    if (isPasswordRecovery) {
      // Forward code directly to client-side reset page to attempt recovery
      const resetUrl = new URL("/auth/reset-password", siteOrigin);
      resetUrl.searchParams.set("code", code);
      return NextResponse.redirect(resetUrl);
    }

    const errMsg = (error?.message || "").toLowerCase();
    const redirectUrl = new URL("/login", siteOrigin);

    // If code was already exchanged, email was confirmed, or PKCE verifier mismatch across devices:
    if (
      errMsg.includes("code verifier") ||
      errMsg.includes("pkce") ||
      errMsg.includes("invalid grant") ||
      errMsg.includes("expired") ||
      errMsg.includes("already")
    ) {
      redirectUrl.searchParams.set("message", "email_confirmed");
      return NextResponse.redirect(redirectUrl);
    }

    redirectUrl.searchParams.set("error", "auth_callback_failed");
    redirectUrl.searchParams.set("error_description", error.message);
    return NextResponse.redirect(redirectUrl);
  }

  // 5. Verify OTP via token_hash
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });

    if (!error) {
      return response;
    }

    if (type === "recovery") {
      const resetUrl = new URL("/auth/reset-password", siteOrigin);
      resetUrl.searchParams.set("token_hash", tokenHash);
      resetUrl.searchParams.set("type", type);
      return NextResponse.redirect(resetUrl);
    }

    const errMsg = (error?.message || "").toLowerCase();
    const redirectUrl = new URL("/login", siteOrigin);

    if (
      errMsg.includes("expired") ||
      errMsg.includes("already") ||
      errMsg.includes("invalid")
    ) {
      redirectUrl.searchParams.set("message", "email_confirmed");
      return NextResponse.redirect(redirectUrl);
    }

    redirectUrl.searchParams.set("error", "auth_callback_failed");
    redirectUrl.searchParams.set("error_description", error.message);
    return NextResponse.redirect(redirectUrl);
  }

  // Fallback redirect
  const redirectUrl = new URL("/login", siteOrigin);
  redirectUrl.searchParams.set("error", "auth_callback_failed");
  return NextResponse.redirect(redirectUrl);
}
