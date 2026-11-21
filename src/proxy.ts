import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Helper to preserve refreshed/cleared Supabase session cookies on redirect
  const redirectWithCookies = (url: URL) => {
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  };

  // 1. Authenticate identity strictly via Supabase server-side cryptographic session & refresh tokens
  let authenticatedUser = null;
  try {
    const { data, error: authError } = await supabase.auth.getUser();
    if (!authError && data?.user) {
      authenticatedUser = data.user;
    }
  } catch {
    // Graceful offline/network failure handling - fails closed for protected routes
    authenticatedUser = null;
  }

  const { pathname } = request.nextUrl;

  // Protected Dashboard Route Rules: Exact path-boundary matching
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isManagerRoute = pathname === "/manager" || pathname.startsWith("/manager/");
  const isTenantRoute = pathname === "/tenant" || pathname.startsWith("/tenant/");

  if (isAdminRoute || isManagerRoute || isTenantRoute) {
    if (!authenticatedUser) {
      // Unauthenticated caller: Never trust client cookies, localStorage, or headers
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", "session_required");
      redirectUrl.searchParams.set("next", pathname);
      return redirectWithCookies(redirectUrl);
    }

    // 2. Retrieve trusted profile record directly from Supabase PostgreSQL database
    let profile: { role: string; role_approval_status?: string | null } | null = null;
    let isSchemaError = false;

    try {
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("role, role_approval_status")
        .eq("id", authenticatedUser.id)
        .single();

      if (!profileError && data) {
        profile = data as { role: string; role_approval_status?: string | null };
      } else if (profileError) {
        const errCode = profileError.code || "";
        const errMsg = (profileError.message || "").toLowerCase();
        const errDetails = (profileError.details || "").toLowerCase();

        if (
          errCode === "PGRST204" ||
          errCode === "42703" ||
          errMsg.includes("role_approval_status") ||
          errDetails.includes("role_approval_status") ||
          (errMsg.includes("column") && errMsg.includes("does not exist"))
        ) {
          isSchemaError = true;
        } else if (errCode === "PGRST116") {
          // Zero rows returned: profile genuinely does not exist in table
          profile = null;
        } else {
          // Verify if profile row exists to distinguish schema error from missing profile
          const { data: baseProfile, error: baseError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", authenticatedUser.id)
            .single();

          if (!baseError && baseProfile) {
            isSchemaError = true;
          } else if (baseError && baseError.code === "PGRST116") {
            profile = null;
          } else {
            isSchemaError = true;
          }
        }
      }
    } catch {
      isSchemaError = true;
    }

    if (isSchemaError) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", "schema_upgrade_pending");
      redirectUrl.searchParams.set("next", pathname);
      return redirectWithCookies(redirectUrl);
    }

    if (!profile) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", "profile_not_found");
      redirectUrl.searchParams.set("next", pathname);
      return redirectWithCookies(redirectUrl);
    }

    const trustedRole = profile.role;
    const isApproved = profile.role_approval_status === "Approved";

    // 3. Enforce strict server-side authorization matrix
    if (isAdminRoute) {
      if (trustedRole !== "admin" || !isApproved) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("error", "admin_unauthorized");
        redirectUrl.searchParams.set("next", pathname);
        return redirectWithCookies(redirectUrl);
      }
    }

    if (isManagerRoute) {
      if (trustedRole === "admin" && isApproved) {
        // Super-admin cross-access permitted
      } else if (trustedRole === "manager") {
        if (!isApproved) {
          const redirectUrl = new URL("/login", request.url);
          redirectUrl.searchParams.set("error", "manager_unapproved");
          redirectUrl.searchParams.set("next", pathname);
          return redirectWithCookies(redirectUrl);
        }
      } else {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("error", "manager_unauthorized");
        redirectUrl.searchParams.set("next", pathname);
        return redirectWithCookies(redirectUrl);
      }
    }
    if (isTenantRoute) {
      if (trustedRole === "admin" && isApproved) {
        // Super-admin cross-access permitted
      } else if (trustedRole === "tenant") {
        if (!isApproved) {
          const redirectUrl = new URL("/login", request.url);
          redirectUrl.searchParams.set("error", "tenant_unapproved");
          redirectUrl.searchParams.set("next", pathname);
          return redirectWithCookies(redirectUrl);
        }
      } else {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("error", "tenant_unauthorized");
        redirectUrl.searchParams.set("next", pathname);
        return redirectWithCookies(redirectUrl);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
