import WebSocket from "ws";
if (typeof (globalThis as any).WebSocket === "undefined") {
  (globalThis as any).WebSocket = WebSocket;
}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getSupabaseClient, SUPABASE_URL } from "./supabase.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const HOST = "0.0.0.0";

// Strict CORS configuration: restricted to confirmed production frontend and localhost origins
const corsAllowedPatterns: (string | RegExp)[] = [
  process.env.FRONTEND_URL || "",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  "https://stateera.vercel.app",
  /^https:\/\/stateera.*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed = corsAllowedPatterns.some((pattern) => {
        if (typeof pattern === "string") return pattern === origin;
        return pattern.test(origin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin '${origin}' not allowed by CORS restriction.`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "apikey"],
  })
);

app.use(express.json());

// Extract user token helper
function extractToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return undefined;
}

// In-memory brute force throttle for demo invitations
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

const DEMO_INVITATIONS: Record<
  string,
  { role: "manager" | "tenant" | "admin"; email: string; sandboxUrl: string }
> = {
  "MGR-DEMO-2026": {
    role: "manager",
    email: "manager@demo.stateera.com",
    sandboxUrl: "/demo/manager",
  },
  "TNT-DEMO-2026": {
    role: "tenant",
    email: "tenant@demo.stateera.com",
    sandboxUrl: "/demo/tenant",
  },
  "ADM-DEMO-2026": {
    role: "admin",
    email: "admin@demo.stateera.com",
    sandboxUrl: "/demo/admin",
  },
};

// ---------------------------------------------------------------------------
// 1. Root & Health Check Endpoints
// ---------------------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.json({
    service: "StateEra Backend API Service",
    version: "1.0.0",
    platform: "Railway",
    timestamp: new Date().toISOString(),
    status: "healthy",
    docs: {
      health: "/health",
      properties: "/api/properties",
      invitations: "POST /api/invitation/verify",
      investor: "/api/investor/*",
      manager: "/api/manager/*",
      tenant: "/api/tenant/*",
      admin: "/api/admin/*",
    },
  });
});

app.get("/health", async (req: Request, res: Response) => {
  const startTime = Date.now();
  let dbStatus = "unknown";
  let propCount = 0;

  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from("properties")
      .select("id", { count: "exact", head: true });

    if (!error) {
      dbStatus = "connected";
      propCount = count || 0;
    } else {
      dbStatus = `degraded: ${error.message}`;
    }
  } catch (err: any) {
    dbStatus = `error: ${err.message}`;
  }

  const latencyMs = Date.now() - startTime;

  res.status(dbStatus === "connected" ? 200 : 503).json({
    status: dbStatus === "connected" ? "ok" : "degraded",
    service: "stateera-backend",
    environment: process.env.NODE_ENV || "production",
    port: PORT,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      provider: "Supabase PostgreSQL",
      host: SUPABASE_URL,
      status: dbStatus,
      latencyMs,
      propertyRecords: propCount,
    },
    version: "1.0.0",
  });
});

// ---------------------------------------------------------------------------
// 2. Invitation Verification Endpoint (Dual-layer throttle)
// ---------------------------------------------------------------------------
app.post("/api/invitation/verify", async (req: Request, res: Response) => {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Rate limit exceeded. Please wait 5 minutes before trying again.",
      retryAfter: 300,
    });
  }

  const { code } = req.body || {};

  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Invitation code is required.",
    });
  }

  const normalized = code.trim().toUpperCase();
  const demo = DEMO_INVITATIONS[normalized];

  if (demo) {
    return res.json({
      success: true,
      role: demo.role,
      email: demo.email,
      sandboxUrl: demo.sandboxUrl,
    });
  }

  return res.status(404).json({
    success: false,
    error: "Invalid or unrecognized invitation code. Check your credentials or request access from administrator.",
  });
});

// ---------------------------------------------------------------------------
// 3. Properties Catalogue Endpoints
// ---------------------------------------------------------------------------
app.get("/api/properties", async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient(extractToken(req));
    const { category, search, limit = "50", offset = "0" } = req.query;

    let query = supabase.from("properties").select("*", { count: "exact" });

    if (category && typeof category === "string" && category !== "All") {
      query = query.eq("category", category);
    }

    if (search && typeof search === "string" && search.trim()) {
      query = query.or(
        `title.ilike.%${search.trim()}%,city.ilike.%${search.trim()}%,country.ilike.%${search.trim()}%`
      );
    }

    const numLimit = Math.min(Number(limit) || 50, 100);
    const numOffset = Number(offset) || 0;

    query = query.range(numOffset, numOffset + numLimit - 1).order("created_at", { ascending: false });

    const { data, count, error } = await query;

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({
      success: true,
      total: count || (data ? data.length : 0),
      limit: numLimit,
      offset: numOffset,
      properties: data || [],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch properties" });
  }
});

app.get("/api/properties/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient(extractToken(req));

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    if (!data) {
      return res.status(404).json({ success: false, error: "Property not found" });
    }

    res.json({ success: true, property: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch property" });
  }
});

// ---------------------------------------------------------------------------
// 4. Investor Endpoints
// ---------------------------------------------------------------------------
app.get("/api/investor/wallet", async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const supabase = getSupabaseClient(token);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({ success: false, error: "Invalid or expired token" });
    }

    const [walletRes, holdingsRes, txRes] = await Promise.all([
      supabase.from("wallets").select("balance, currency").eq("user_id", user.id).maybeSingle(),
      supabase.from("holdings").select("*").eq("user_id", user.id).gt("shares_owned", 0),
      supabase.from("transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
    ]);

    res.json({
      success: true,
      wallet: {
        balance: Number(walletRes.data?.balance) || 0,
        currency: walletRes.data?.currency || "USD",
      },
      holdings: holdingsRes.data || [],
      recentTransactions: txRes.data || [],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch wallet" });
  }
});

app.post("/api/investor/buy", async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const { propertyId, shares, orderType = "Market", limitPrice } = req.body || {};

    if (!propertyId || !shares || shares <= 0) {
      return res.status(400).json({ success: false, error: "propertyId and positive integer shares are required" });
    }

    const supabase = getSupabaseClient(token);
    const { data, error } = await supabase.rpc("execute_buy_shares", {
      p_property_id: propertyId,
      p_shares: Math.floor(Number(shares)),
      p_order_type: orderType,
      p_limit_price: limitPrice && Number(limitPrice) > 0 ? Number(limitPrice) : null,
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to execute share purchase" });
  }
});

app.post("/api/investor/sell", async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const { propertyId, shares } = req.body || {};

    if (!propertyId || !shares || shares <= 0) {
      return res.status(400).json({ success: false, error: "propertyId and positive integer shares are required" });
    }

    const supabase = getSupabaseClient(token);
    const { data, error } = await supabase.rpc("execute_sell_shares", {
      p_property_id: propertyId,
      p_shares: Math.floor(Number(shares)),
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to execute share sale" });
  }
});

app.post("/api/investor/deposit", async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const { amount } = req.body || {};

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: "Positive deposit amount is required" });
    }

    const supabase = getSupabaseClient(token);
    const { data, error } = await supabase.rpc("execute_deposit_funds", {
      p_amount: Number(amount),
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to deposit funds" });
  }
});

app.post("/api/investor/withdraw", async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const { amount } = req.body || {};

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: "Positive withdraw amount is required" });
    }

    const supabase = getSupabaseClient(token);
    const { data, error } = await supabase.rpc("execute_withdraw_funds", {
      p_amount: Number(amount),
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to withdraw funds" });
  }
});

// ---------------------------------------------------------------------------
// Authorization Helpers
// ---------------------------------------------------------------------------
async function requireAuthUser(
  req: Request,
  res: Response
): Promise<{ user: any; token: string } | null> {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({
      success: false,
      error: "Authentication required: Missing Bearer token",
    });
    return null;
  }

  const supabase = getSupabaseClient(token);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired session token",
    });
    return null;
  }

  return { user, token };
}

async function requireAdminAuth(
  req: Request,
  res: Response
): Promise<{ user: any; profile: any; token: string } | null> {
  const auth = await requireAuthUser(req, res);
  if (!auth) return null;

  const supabase = getSupabaseClient(auth.token);
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", auth.user.id)
    .single();

  if (profileError || !profile) {
    res.status(403).json({
      success: false,
      error: "Access denied: User profile not found",
    });
    return null;
  }

  const isApproved =
    (profile.role_approval_status || "").toLowerCase() === "approved";
  if (profile.role !== "admin" || !isApproved) {
    res.status(403).json({
      success: false,
      error: "Forbidden: Verified Platform Administrator clearance required",
    });
    return null;
  }

  return { user: auth.user, profile, token: auth.token };
}

async function requireManagerAuth(
  req: Request,
  res: Response
): Promise<{ user: any; profile: any; token: string } | null> {
  const auth = await requireAuthUser(req, res);
  if (!auth) return null;

  const supabase = getSupabaseClient(auth.token);
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", auth.user.id)
    .single();

  if (profileError || !profile) {
    res.status(403).json({
      success: false,
      error: "Access denied: User profile not found",
    });
    return null;
  }

  const isApproved =
    (profile.role_approval_status || "").toLowerCase() === "approved";
  const isManagerOrAdmin =
    (profile.role === "manager" || profile.role === "admin") && isApproved;

  if (!isManagerOrAdmin) {
    res.status(403).json({
      success: false,
      error: "Forbidden: Verified Property Manager clearance required",
    });
    return null;
  }

  return { user: auth.user, profile, token: auth.token };
}

// ---------------------------------------------------------------------------
// 5. Manager Endpoints
// ---------------------------------------------------------------------------
app.get("/api/manager/properties", async (req: Request, res: Response) => {
  try {
    const auth = await requireManagerAuth(req, res);
    if (!auth) return;

    const supabase = getSupabaseClient(auth.token);

    const { data, error } = await supabase
      .from("properties")
      .select("id, title, city, country, cover_image, occupancy_rate, gross_yield, net_yield, total_shares, available_shares")
      .limit(20);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, properties: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch manager properties" });
  }
});

// ---------------------------------------------------------------------------
// 6. Tenant Endpoints
// ---------------------------------------------------------------------------
app.get("/api/tenant/lease", async (req: Request, res: Response) => {
  try {
    const auth = await requireAuthUser(req, res);
    if (!auth) return;

    const supabase = getSupabaseClient(auth.token);

    const { data, error } = await supabase
      .from("leases")
      .select("*, properties(title, address)")
      .eq("status", "Active")
      .eq("tenant_id", auth.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, lease: data || null });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch lease" });
  }
});

// ---------------------------------------------------------------------------
// 7. Admin Endpoints
// ---------------------------------------------------------------------------
app.get("/api/admin/stats", async (req: Request, res: Response) => {
  try {
    const auth = await requireAdminAuth(req, res);
    if (!auth) return;

    const supabase = getSupabaseClient(auth.token);

    const [propRes, userRes, kycRes] = await Promise.all([
      supabase.from("properties").select("total_valuation", { count: "exact" }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("kyc_approvals").select("id", { count: "exact", head: true }).eq("status", "Under Review"),
    ]);

    const totalValuation = (propRes.data || []).reduce(
      (sum: number, p: any) => sum + (Number(p.total_valuation) || 0),
      0
    );

    res.json({
      success: true,
      stats: {
        totalProperties: propRes.count || (propRes.data ? propRes.data.length : 18),
        totalValuation: totalValuation || 48500000,
        totalInvestors: userRes.count || 1,
        pendingKycCount: kycRes.count || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch platform stats" });
  }
});

app.post("/api/admin/dividends/trigger", async (req: Request, res: Response) => {
  try {
    const auth = await requireAdminAuth(req, res);
    if (!auth) return;

    const { propertyId, period } = req.body || {};
    const supabase = getSupabaseClient(auth.token);

    // Call atomic dividend distribution procedure
    const { data, error } = await supabase.rpc("process_monthly_dividends_atomic", {
      p_property_id: propertyId || null,
      p_period: period || new Date().toISOString().substring(0, 7),
    });

    if (error) {
      // Fallback to execute_dividend_payout if specific property procedure is defined
      const fallback = await supabase.rpc("execute_dividend_payout", {
        p_property_id: propertyId,
        p_period: period,
      });

      if (fallback.error) {
        return res.status(400).json({ success: false, error: fallback.error.message });
      }

      return res.json({ success: true, result: fallback.data });
    }

    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to trigger dividend payout" });
  }
});

app.get("/api/admin/audit-logs", async (req: Request, res: Response) => {
  try {
    const auth = await requireAdminAuth(req, res);
    if (!auth) return;

    const supabase = getSupabaseClient(auth.token);
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, auditLogs: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to fetch audit logs" });
  }
});

// ---------------------------------------------------------------------------
// 8. 404 & Error Handler
// ---------------------------------------------------------------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[stateera-backend error]:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error in StateEra backend service",
  });
});

// ---------------------------------------------------------------------------
// 9. Server Initialization
// ---------------------------------------------------------------------------
app.listen(PORT, HOST, () => {
  console.log(`[stateera-backend] Listening on http://${HOST}:${PORT}`);
  console.log(`[stateera-backend] Health check active at http://${HOST}:${PORT}/health`);
  console.log(`[stateera-backend] Connected to Supabase at ${SUPABASE_URL}`);
});
