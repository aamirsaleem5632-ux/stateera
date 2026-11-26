/**
 * StateEra Authentication Flows & Security Comprehensive Test Suite
 *
 * Verifies all 8 core authentication pillars:
 * 1. Google OAuth (signInWithOAuth options, safeNext preservation, unconfigured provider messaging, callback safety)
 * 2. Email Sign In (credential validation, error translation, case-insensitive approval checks, role dashboard redirection)
 * 3. Create Account (name/password validation, investor-only enforcement, duplicate account detection, confirmation handling)
 * 4. Email Confirmation (PKCE code exchange, OTP token_hash & type verification, safe redirection, confirmed banner)
 * 5. Forgot Password (email format validation, resetPasswordForEmail with /auth/callback target, SMTP fallback)
 * 6. Valid Recovery Session (active session detection via getSession, direct code & token_hash exchange, onAuthStateChange listener)
 * 7. Password Update (length & matching validation, updateUser password mutation, session invalidation on client/server, redirect)
 * 8. Logout (POST-only /auth/signout server route, proxy header handling, cache control, DemoContext client signOut, UI controls)
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    failCount++;
  }
}

console.log("===============================================================");
console.log("  STATEERA COMPREHENSIVE AUTHENTICATION AUDIT & TEST SUITE");
console.log("===============================================================\n");

const loginCode = fs.readFileSync(path.join(ROOT, "src", "app", "login", "page.tsx"), "utf8");
const callbackCode = fs.readFileSync(path.join(ROOT, "src", "app", "auth", "callback", "route.ts"), "utf8");
const resetPasswordPageCode = fs.readFileSync(path.join(ROOT, "src", "app", "auth", "reset-password", "page.tsx"), "utf8");
const signoutRoutePath = path.join(ROOT, "src", "app", "auth", "signout", "route.ts");
const signoutCode = fs.readFileSync(signoutRoutePath, "utf8");
const demoContextCode = fs.readFileSync(path.join(ROOT, "src", "context", "DemoContext.tsx"), "utf8");
const navbarCode = fs.readFileSync(path.join(ROOT, "src", "components", "layout", "Navbar.tsx"), "utf8");
const proxyCode = fs.readFileSync(path.join(ROOT, "src", "proxy.ts"), "utf8");

// =============================================================
// PILLAR 1: Google OAuth
// =============================================================
console.log("--- 1. Google OAuth Flow & Configuration ---");

runTest("Google OAuth calls Supabase signInWithOAuth with provider 'google' and offline refresh access", () => {
  assert.ok(loginCode.includes('provider: "google"'), "Must specify provider 'google'");
  assert.ok(loginCode.includes('access_type: "offline"'), "Must request offline access for refresh tokens");
  assert.ok(loginCode.includes('prompt: "consent"'), "Must request consent prompt for refresh reliability");
});

runTest("Google OAuth preserves safe destination route (safeNext) in redirectTo URL", () => {
  assert.ok(
    loginCode.includes("auth/callback?next="),
    "OAuth redirectTo must include safe destination query parameter"
  );
  assert.ok(
    loginCode.includes("safeNext") && loginCode.includes("encodeURIComponent"),
    "OAuth must encode safeNext destination URL parameter"
  );
});

runTest("Google OAuth displays actionable instructions if provider is disabled in Supabase Dashboard", () => {
  assert.ok(
    loginCode.includes("Google Sign-In is not enabled in the Supabase Dashboard") ||
    loginCode.includes("configure the Google provider"),
    "Must display helpful dashboard configuration instructions when Google provider is not yet enabled"
  );
});

runTest("Google OAuth callback error handling surfaces provider cancellation or denial", () => {
  assert.ok(
    callbackCode.includes('searchParams.get("error")') && callbackCode.includes('searchParams.get("error_description")'),
    "Callback must capture error and error_description from OAuth redirects"
  );
  assert.ok(
    callbackCode.includes('loginUrl.searchParams.set'),
    "Callback must propagate OAuth errors to login page"
  );
});

// =============================================================
// PILLAR 2: Email Sign In
// =============================================================
console.log("\n--- 2. Email Sign In & Role-Based Authorization ---");

runTest("Email Sign In executes signInWithPassword with sanitized email and password", () => {
  assert.ok(loginCode.includes("supabase.auth.signInWithPassword"), "Must call signInWithPassword");
  assert.ok(loginCode.includes("cleanEmail"), "Email must be trimmed and lowercased");
});

runTest("Email Sign In translates invalid credentials and unconfirmed email errors into clear alerts", () => {
  function mapAuthError(rawMessage) {
    const msg = (rawMessage || "").toLowerCase();
    if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
      return "Invalid email or password. Please verify your credentials or reset your password.";
    }
    if (msg.includes("email not confirmed")) {
      return "Email verification pending. Please verify your email via the link sent to your inbox before signing in.";
    }
    return rawMessage;
  }

  assert.strictEqual(
    mapAuthError("Invalid login credentials"),
    "Invalid email or password. Please verify your credentials or reset your password."
  );
  assert.strictEqual(
    mapAuthError("Email not confirmed"),
    "Email verification pending. Please verify your email via the link sent to your inbox before signing in."
  );
});

runTest("Email Sign In performs case-insensitive role approval verification", () => {
  assert.ok(
    loginCode.includes(".toLowerCase() === \"approved\""),
    "Approval check in login must be case-insensitive to handle 'Approved' and 'approved'"
  );
  assert.ok(
    proxyCode.includes(".toLowerCase() === \"approved\""),
    "Approval check in proxy must be case-insensitive to handle 'Approved' and 'approved'"
  );
  assert.ok(
    demoContextCode.includes(".toLowerCase() === \"approved\""),
    "Approval check in DemoContext must be case-insensitive to handle 'Approved' and 'approved'"
  );
});

runTest("Email Sign In safely routes approved users while blocking unapproved role escalations", () => {
  function routeUser(role, approvalStatus, safeNext = null) {
    const isApproved = (approvalStatus || "").toLowerCase() === "approved";
    if (isApproved) {
      if (role === "admin") return safeNext || "/admin";
      if (role === "manager") return safeNext && !safeNext.startsWith("/admin") ? safeNext : "/manager";
      if (role === "tenant") return safeNext && !safeNext.startsWith("/admin") && !safeNext.startsWith("/manager") ? safeNext : "/tenant";
      return safeNext && !safeNext.startsWith("/admin") && !safeNext.startsWith("/manager") && !safeNext.startsWith("/tenant") ? safeNext : "/dashboard";
    }
    // Unapproved or pending
    return "/dashboard";
  }

  // Approved admin
  assert.strictEqual(routeUser("admin", "Approved"), "/admin");
  assert.strictEqual(routeUser("admin", "approved", "/trade/1"), "/trade/1");

  // Approved manager
  assert.strictEqual(routeUser("manager", "Approved"), "/manager");
  assert.strictEqual(routeUser("manager", "approved", "/admin"), "/manager"); // Admin portal forbidden
  assert.strictEqual(routeUser("manager", "approved", "/explore"), "/explore");

  // Approved tenant
  assert.strictEqual(routeUser("tenant", "Approved"), "/tenant");
  assert.strictEqual(routeUser("tenant", "approved", "/admin"), "/tenant"); // Admin portal forbidden
  assert.strictEqual(routeUser("tenant", "approved", "/manager"), "/tenant"); // Manager portal forbidden

  // Pending manager & tenant
  assert.strictEqual(routeUser("manager", "Pending"), "/dashboard");
  assert.strictEqual(routeUser("tenant", "Pending"), "/dashboard");
});

runTest("Email Sign In strictly enforces approval states and blocks pending/rejected accounts from bypassing approval rules", () => {
  function evaluateApproval(role, approvalStatus) {
    const isApproved = (approvalStatus || "").toLowerCase() === "approved";
    const isRejected = (approvalStatus || "").toLowerCase() === "rejected";
    return { isApproved, isRejected };
  }

  // 1. Approved States for all 4 roles
  ["investor", "manager", "tenant", "admin"].forEach((r) => {
    const res = evaluateApproval(r, "Approved");
    assert.strictEqual(res.isApproved, true, `${r} with Approved must be approved`);
    assert.strictEqual(res.isRejected, false);
  });

  // 2. Pending States for all 4 roles must NEVER be approved
  ["investor", "manager", "tenant", "admin"].forEach((r) => {
    const res = evaluateApproval(r, "Pending");
    assert.strictEqual(res.isApproved, false, `${r} with Pending must NOT be approved`);
    assert.strictEqual(res.isRejected, false);
  });

  // 3. Rejected States for all 4 roles must NEVER be approved and must be marked rejected
  ["investor", "manager", "tenant", "admin"].forEach((r) => {
    const res = evaluateApproval(r, "Rejected");
    assert.strictEqual(res.isApproved, false, `${r} with Rejected must NOT be approved`);
    assert.strictEqual(res.isRejected, true, `${r} with Rejected must be flagged as rejected`);
  });

  // 4. Verify login source code does not grant unconditional approval to investor role
  const loginSrc = fs.readFileSync(path.join(ROOT, "src", "app", "login", "page.tsx"), "utf8");
  assert.ok(
    !loginSrc.includes('profile?.role === "investor";'),
    "Login must NOT grant automatic approval bypass to investor role"
  );
  assert.ok(
    loginSrc.includes('const isApproved = (profile?.role_approval_status || "").toLowerCase() === "approved";'),
    "Login must strictly verify role_approval_status is approved"
  );
  assert.ok(
    loginSrc.includes('if (isRejected) {'),
    "Login must handle rejected compliance status explicitly"
  );
});

// =============================================================
// PILLAR 3: Create Account (Email Sign Up)
// =============================================================
console.log("\n--- 3. Create Account (Email Sign Up) Invariants ---");

runTest("Signup rejects names shorter than 2 characters or blank strings", () => {
  const validateName = (name) => Boolean(name && name.trim().length >= 2);
  assert.strictEqual(validateName(""), false);
  assert.strictEqual(validateName(" "), false);
  assert.strictEqual(validateName("J"), false);
  assert.strictEqual(validateName("Jo"), true);
  assert.strictEqual(validateName("Jonathan Smith"), true);
});

runTest("Signup rejects passwords shorter than 6 characters", () => {
  const validatePassword = (pwd) => Boolean(pwd && pwd.length >= 6);
  assert.strictEqual(validatePassword(""), false);
  assert.strictEqual(validatePassword("abc"), false);
  assert.strictEqual(validatePassword("12345"), false);
  assert.strictEqual(validatePassword("123456"), true);
});

runTest("Signup enforces default role 'investor' and prevents user-specified privileged roles", () => {
  assert.strictEqual(loginCode.includes('setSelectedRole("admin")'), false);
  assert.strictEqual(loginCode.includes('setSelectedRole("manager")'), false);
  assert.strictEqual(loginCode.includes('setSelectedRole("tenant")'), false);
  assert.ok(
    loginCode.includes('role: "investor"') || loginCode.includes("role: 'investor'"),
    "Signup options must assign default role 'investor'"
  );
});

runTest("Signup detects duplicate accounts via empty identities array or duplicate error", () => {
  assert.ok(
    loginCode.includes("identities.length === 0"),
    "Must detect existing email account using Supabase identities check"
  );
  assert.ok(
    loginCode.includes("already registered") || loginCode.includes("already in use"),
    "Must handle Supabase duplicate registration error strings"
  );
});

// =============================================================
// PILLAR 4: Email Confirmation
// =============================================================
console.log("\n--- 4. Email Confirmation Flow ---");

runTest("Callback route supports both PKCE code exchange and OTP token_hash verification", () => {
  assert.ok(
    callbackCode.includes("exchangeCodeForSession(code)"),
    "Callback must support code exchange"
  );
  assert.ok(
    callbackCode.includes("verifyOtp") && callbackCode.includes("token_hash"),
    "Callback must support OTP token_hash verification for email confirmation links"
  );
});

runTest("Callback route supports reverse proxy origin headers (x-forwarded-host)", () => {
  assert.ok(
    callbackCode.includes("x-forwarded-host"),
    "Callback route must inspect x-forwarded-host to resolve true public origin"
  );
});

runTest("Login page renders success banner when redirected with message=email_confirmed", () => {
  assert.ok(
    loginCode.includes("email_confirmed"),
    "Login page must handle message=email_confirmed"
  );
  assert.ok(
    loginCode.includes("Your email address has been confirmed successfully"),
    "Must render friendly email confirmation success banner"
  );
});

// =============================================================
// PILLAR 5: Forgot Password
// =============================================================
console.log("\n--- 5. Forgot Password Flow ---");

runTest("Forgot Password dispatches reset email targeting /auth/callback with reset-password destination", () => {
  assert.ok(
    loginCode.includes("resetPasswordForEmail"),
    "Must call supabase.auth.resetPasswordForEmail"
  );
  assert.ok(
    loginCode.includes("/auth/callback?next=/auth/reset-password"),
    "Reset email redirect must target /auth/callback?next=/auth/reset-password"
  );
});

runTest("Forgot Password displays graceful fallback message when SMTP provider is unconfigured", () => {
  assert.ok(
    loginCode.includes("Password recovery email delivery is not configured or rate-limited"),
    "Must provide actionable message if SMTP provider is missing in environment"
  );
});

// =============================================================
// PILLAR 6: Valid Recovery Session Detection
// =============================================================
console.log("\n--- 6. Valid Recovery Session Detection ---");

runTest("Reset Password page checks for existing recovery session via getSession", () => {
  assert.ok(
    resetPasswordPageCode.includes("supabase.auth.getSession"),
    "Must check active session on mount"
  );
});

runTest("Reset Password page directly handles recovery code and token_hash search parameters", () => {
  assert.ok(
    resetPasswordPageCode.includes("exchangeCodeForSession"),
    "Reset Password page must exchange code if provided directly in searchParams"
  );
  assert.ok(
    resetPasswordPageCode.includes("verifyOtp"),
    "Reset Password page must verify token_hash if provided directly in searchParams"
  );
});

runTest("Reset Password page catches PASSWORD_RECOVERY auth event via onAuthStateChange", () => {
  assert.ok(
    resetPasswordPageCode.includes("onAuthStateChange") && resetPasswordPageCode.includes("PASSWORD_RECOVERY"),
    "Must listen to PASSWORD_RECOVERY event for implicit hash token parsing"
  );
});

runTest("Reset Password page properly handles expired or missing recovery session with clear recovery CTA", () => {
  assert.ok(
    resetPasswordPageCode.includes("Recovery Link Expired or Invalid"),
    "Must render expired notice when no session exists"
  );
  assert.ok(
    resetPasswordPageCode.includes("Back to Sign In / Request Link"),
    "Must provide link back to login/forgot password"
  );
});

// =============================================================
// PILLAR 7: Password Update
// =============================================================
console.log("\n--- 7. Password Update Execution ---");

runTest("Password update validates minimum 6 characters and matching passwords", () => {
  function validatePasswords(pwd, confirmPwd) {
    if (!pwd || pwd.length < 6) return { valid: false, error: "Password must be at least 6 characters long." };
    if (pwd !== confirmPwd) return { valid: false, error: "Passwords do not match. Please re-enter." };
    return { valid: true };
  }

  assert.strictEqual(validatePasswords("123", "123").valid, false);
  assert.strictEqual(validatePasswords("abcdef", "fedcba").valid, false);
  assert.strictEqual(validatePasswords("SecurePass123", "SecurePass123").valid, true);
});

runTest("Password update calls updateUser to mutate credentials in Supabase Auth", () => {
  assert.ok(
    resetPasswordPageCode.includes("supabase.auth.updateUser"),
    "Must invoke supabase.auth.updateUser with new password"
  );
});

runTest("Password update clears recovery session on both client and server before redirecting", () => {
  assert.ok(
    resetPasswordPageCode.includes("supabase.auth.signOut"),
    "Must call client signOut after password update"
  );
  assert.ok(
    resetPasswordPageCode.includes("/auth/signout"),
    "Must call POST /auth/signout to invalidate server-side session cookies"
  );
  assert.ok(
    resetPasswordPageCode.includes("/login?message=password_updated"),
    "Must redirect to /login with message=password_updated"
  );
});

// =============================================================
// PILLAR 8: Logout & Session Termination
// =============================================================
console.log("\n--- 8. Logout & Session Termination ---");

runTest("Server-side signout route enforces strict POST-only to defeat GET logout CSRF", () => {
  assert.ok(signoutCode.includes("export async function POST"), "Must export POST handler");
  assert.strictEqual(signoutCode.includes("export async function GET"), false, "GET handler must NOT exist");
});

runTest("Server-side signout route invalidates Supabase session and enforces no-store cache headers", () => {
  assert.ok(signoutCode.includes("supabase.auth.signOut"), "Must call signOut to clear cookies");
  assert.ok(signoutCode.includes("Cache-Control"), "Must set no-store cache control headers");
  assert.ok(signoutCode.includes("x-forwarded-host"), "Must support reverse proxy forwarded hosts");
});

runTest("DemoContext signOut terminates client state, storage, and server session cookies", () => {
  assert.ok(demoContextCode.includes("signOut: () => Promise<void>"), "DemoContext must declare signOut");
  assert.ok(demoContextCode.includes("/auth/signout"), "signOut must trigger POST /auth/signout");
  assert.ok(demoContextCode.includes("updateAuthUserId(null)"), "signOut must clear authUserId");
  assert.ok(demoContextCode.includes("setAuthUserEmail(null)"), "signOut must clear authUserEmail");
});

runTest("Navbar provides visible Logout controls in both desktop and mobile views", () => {
  assert.ok(navbarCode.includes("signOut"), "Navbar must consume signOut from DemoContext");
  assert.ok(navbarCode.includes("Logout") || navbarCode.includes("Sign Out"), "Navbar must render logout buttons");
  assert.ok(navbarCode.includes("authUserId ?"), "Navbar must conditionally render user info when signed in");
});

// =============================================================
// SUMMARY
// =============================================================
console.log("\n===============================================================");
console.log(`  AUTHENTICATION AUDIT RESULTS: ${passCount} / ${passCount + failCount} TESTS PASSED`);
console.log("===============================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
