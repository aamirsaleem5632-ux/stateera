import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Dual-layer brute-force throttle: Persistent Supabase database tracking with fast in-memory cache
// Max 10 failed attempts per IP per 5 minutes
const attemptTracker = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attemptTracker.get(ip);
  if (!entry) {
    attemptTracker.set(ip, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return false;
  }
  if (now > entry.resetTime) {
    attemptTracker.set(ip, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return false;
  }
  entry.count++;
  return entry.count > 10;
}

async function checkPersistentRateLimit(ip: string): Promise<{ limited: boolean; retryAfter?: number }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("check_and_record_invitation_attempt", {
      p_ip: ip,
      p_max_attempts: 10,
      p_window_minutes: 5,
    });
    if (!error && data && typeof data === "object") {
      const res = data as { is_rate_limited?: boolean; remaining_seconds?: number };
      if (res.is_rate_limited) {
        return { limited: true, retryAfter: res.remaining_seconds || 300 };
      }
    }
  } catch {
    // If Supabase RPC is offline/unreachable, gracefully defer to in-memory throttle
  }
  return { limited: isRateLimited(ip), retryAfter: 300 };
}

// Authorized Demonstration Codes (strictly scoped to isolated /demo/* sandboxes)
// These codes NEVER grant production database privileges or create authenticated live sessions.
const DEMO_INVITATIONS: Record<
  string,
  { role: "manager" | "tenant" | "admin"; email: string; sandboxUrl: string }
> = {
  "MGR-DEMO-2026": {
    role: "manager",
    email: "manager.demo@stateera.test",
    sandboxUrl: "/demo/manager",
  },
  "TEN-DEMO-2026": {
    role: "tenant",
    email: "tenant.demo@stateera.test",
    sandboxUrl: "/demo/tenant",
  },
  "ADMIN-DEMO-2026": {
    role: "admin",
    email: "admin.demo@stateera.test",
    sandboxUrl: "/demo/admin",
  },
};

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateCheck = await checkPersistentRateLimit(ip);
    if (rateCheck.limited) {
      return NextResponse.json(
        {
          success: false,
          error: "rate_limited",
          message: "Too many verification attempts. Please wait 5 minutes before retrying.",
        },
        { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter || 300) } }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "invalid_payload", message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, code, role } = body;
    const cleanRole = String(role || "").toLowerCase().trim();
    const cleanCode = String(code || "").toUpperCase().trim();
    const cleanEmail = String(email || "").toLowerCase().trim();

    // 1. Investor role does not require an invitation code
    if (cleanRole === "investor") {
      return NextResponse.json({
        success: true,
        role: "investor",
        isDemo: false,
        requiresInvitation: false,
        message: "Investor accounts are open for public registration.",
      });
    }

    // 2. Validate role specification
    if (!["manager", "tenant", "admin"].includes(cleanRole)) {
      return NextResponse.json(
        {
          success: false,
          error: "invalid_role",
          message: "Unrecognized platform role. Must be 'investor', 'manager', 'tenant', or 'admin'.",
        },
        { status: 400 }
      );
    }

    // 3. Reject missing or empty invitation/verification code
    if (!cleanCode) {
      return NextResponse.json(
        {
          success: false,
          error: "code_required",
          message: `Access Denied: The ${cleanRole} role requires an authorized invitation or verification token. Self-registration is restricted.`,
        },
        { status: 403 }
      );
    }

    // 4. Check Demo Verification Codes for Educational & Evaluation Purposes
    const demoConfig = DEMO_INVITATIONS[cleanCode];
    if (demoConfig) {
      if (demoConfig.role !== cleanRole) {
        return NextResponse.json(
          {
            success: false,
            error: "role_mismatch",
            message: `Access Denied: Token "${cleanCode}" is registered for the "${demoConfig.role}" role, not "${cleanRole}".`,
          },
          { status: 403 }
        );
      }

      // Valid Demonstration Token — returns isolated sandbox destination
      return NextResponse.json({
        success: true,
        role: demoConfig.role,
        isDemo: true,
        sandboxUrl: demoConfig.sandboxUrl,
        demoEmail: demoConfig.email,
        message: `Authorized Demo Clearance: Granted access to isolated ${cleanRole} demonstration sandbox. Fictional data only.`,
      });
    }

    // 5. Unknown, invalid, or expired invitation token
    return NextResponse.json(
      {
        success: false,
        error: "invalid_token",
        message: `Access Denied: The verification code "${cleanCode}" is invalid, expired, or unauthorized for ${cleanRole} access.`,
      },
      { status: 403 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: "server_error",
        message: "An internal verification error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
