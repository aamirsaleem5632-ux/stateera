import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next");

  let next = "/dashboard";
  if (
    requestedNext &&
    requestedNext.startsWith("/") &&
    !requestedNext.startsWith("//") &&
    !requestedNext.includes("\\")
  ) {
    try {
      const parsed = new URL(requestedNext, origin);
      if (parsed.origin === origin) {
        next = parsed.pathname + parsed.search + parsed.hash;
      }
    } catch {
      next = "/dashboard";
    }
  }

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(
    new URL("/?error=auth_callback_failed", origin)
  );
}
