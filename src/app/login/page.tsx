"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  Loader2,
  UserCheck,
  KeyRound,
  Layers,
  ArrowRight,
  CheckCircle2,
  Info,
  Shield,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useDemo } from "@/context/DemoContext";
import { UserRole } from "@/types/admin";

function subscribeUrlError(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getUrlErrorSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("error");
}

function getServerUrlErrorSnapshot(): string | null {
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useDemo();

  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [dismissedUrlError, setDismissedUrlError] = useState(false);
  const [message, setMessage] = useState("");

  const urlErrorParam = useSyncExternalStore(
    subscribeUrlError,
    getUrlErrorSnapshot,
    getServerUrlErrorSnapshot
  );

  const urlErrorMessage = useMemo(() => {
    if (!urlErrorParam || dismissedUrlError) return "";
    switch (urlErrorParam) {
      case "admin_unauthorized":
        return "Access Restricted: Verified Administrator clearance required to access /admin.";
      case "manager_unauthorized":
        return "Access Restricted: Property Manager role required to access /manager.";
      case "tenant_unauthorized":
        return "Access Restricted: Verified Tenant leaseholder role required to access /tenant.";
      case "manager_unapproved":
        return "Application Pending: Your Property Manager account is currently under compliance review.";
      case "tenant_unapproved":
        return "Verification Pending: Your Resident Tenant account requires administrative verification.";
      case "session_required":
        return "Authentication Required: Please sign in with authorized credentials to access this portal.";
      case "profile_not_found":
        return "Profile Not Found: Please sign up or contact platform administrators.";
      case "auth_callback_failed":
        return "Authentication Failed: Unable to complete sign-in or session exchange. Please try again.";
      default:
        return urlErrorParam;
    }
  }, [urlErrorParam, dismissedUrlError]);

  const error = formError || urlErrorMessage;
  const setError = (err: string) => {
    setFormError(err);
    if (!err) {
      setDismissedUrlError(true);
    }
  };

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/login`,
        });
        if (error) {
          setError(error.message || "Failed to dispatch password recovery email.");
        } else {
          setMessage(`Password reset email sent to ${email}. Please check your inbox.`);
        }
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "investor",
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (error) {
          setError(error.message || "Account creation failed. Please check your credentials.");
        } else if (data.session) {
          // Public registrations default strictly to least-privilege investor role
          setRole("investor");
          router.push("/dashboard");
          router.refresh();
        } else {
          setMessage("Account created successfully. Please check your email to verify your account.");
        }
      } else {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message || "Invalid credentials. Please verify your email and password.");
        } else {
          if (authData?.user) {
            try {
              const { data: profile, error: profileErr } = await supabase
                .from("profiles")
                .select("role, role_approval_status")
                .eq("id", authData.user.id)
                .single();

              if (!profileErr && profile && profile.role_approval_status === "Approved") {
                const approvedRole = profile.role as UserRole;
                setRole(approvedRole);
                if (approvedRole === "admin") {
                  router.push("/admin");
                  router.refresh();
                  return;
                } else if (approvedRole === "manager") {
                  router.push("/manager");
                  router.refresh();
                  return;
                } else if (approvedRole === "tenant") {
                  router.push("/tenant");
                  router.refresh();
                  return;
                }
              } else if (profile && profile.role_approval_status !== "Approved") {
                // Fail-closed: unapproved roles (Pending or Rejected) are restricted to investor role
                setRole("investor");
                setMessage(`Your ${profile.role} clearance is currently pending administrative verification.`);
                router.push("/dashboard");
                router.refresh();
                return;
              }
            } catch {
              // Fail-closed on database or lookup error
              setRole("investor");
            }
          }
          setRole("investor");
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch {
      setError("Google authentication service connection unavailable in offline mode.");
      setLoading(false);
    }
  }

  const handleInstantDemoLogin = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-[#EADCDD] rounded-3xl p-7 sm:p-10 shadow-sm space-y-6">
        {/* Brand */}
        <Link href="/" className="flex justify-center items-center gap-2.5">
          <div className="w-11 h-11 rounded-xl bg-[#3B0F18] flex items-center justify-center text-white">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-[#1A080C] tracking-tight">StateEra</span>
        </Link>

        {/* Heading */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A080C]">
            {mode === "signin" && "Welcome back"}
            {mode === "signup" && "Create your StateEra account"}
            {mode === "forgot" && "Recover your password"}
          </h1>
          <p className="text-sm text-[#5E4A4E]">
            {mode === "signin" && "Access your real estate portfolio and monthly payouts"}
            {mode === "signup" && "Join global investors, tenants, and property managers"}
            {mode === "forgot" && "Enter your email to receive recovery instructions"}
          </p>
        </div>

        {/* 1-Click Fast-Access Role Buttons for Evaluators */}
        <div className="p-3.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1A080C]">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#3B0F18]" />
              Evaluation Fast-Access (1-Click Switch)
            </span>
            <span className="badge badge-demo text-[10px]">Instant Demo</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleInstantDemoLogin("investor", "/dashboard")}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#EADCDD] font-bold text-[#1A080C] hover:bg-[#3B0F18] hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Investor</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstantDemoLogin("manager", "/demo/manager")}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#EADCDD] font-bold text-[#1A080C] hover:bg-[#3B0F18] hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Manager</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstantDemoLogin("tenant", "/demo/tenant")}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#EADCDD] font-bold text-[#1A080C] hover:bg-[#3B0F18] hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Tenant</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstantDemoLogin("admin", "/demo/admin")}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#EADCDD] font-bold text-[#1A080C] hover:bg-[#3B0F18] hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
          <p className="text-[10px] text-[#8C7B7F] text-center pt-0.5">
            * Instant Demo buttons launch isolated sandboxes (/demo/*). Live portals (/admin, /manager, /tenant) require authenticated credentials.
          </p>
        </div>

        {mode !== "forgot" && (
          <>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-secondary w-full flex items-center justify-center gap-3 py-3 text-sm font-semibold disabled:opacity-50"
            >
              <span className="font-bold text-lg">G</span>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px bg-[#EADCDD] flex-1" />
              <span className="text-[11px] font-bold tracking-wider text-[#8C7B7F] uppercase">
                Or Continue With Email
              </span>
              <div className="h-px bg-[#EADCDD] flex-1" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div className="p-3.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A080C] uppercase tracking-wider">
                    Account Clearance: Individual Investor
                  </span>
                  <span className="badge badge-success text-[10px] font-bold">Standard</span>
                </div>
                <p className="text-[11px] text-[#5E4A4E] leading-relaxed">
                  All public registrations receive Investor clearance. Property Manager and Resident Tenant live portal access requires administrator verification.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A080C] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jonathan Sterling"
                  className="input w-full"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#1A080C] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#8C7B7F]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input w-full pl-10"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-[#1A080C]">
                  Password
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setError("");
                      setMessage("");
                    }}
                    className="text-xs font-semibold text-[#3B0F18] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#8C7B7F]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input w-full pl-10"
                />
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-bold"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "signin" && "Sign in"}
            {mode === "signup" && "Create StateEra Account"}
            {mode === "forgot" && "Send Recovery Link"}
          </button>
        </form>

        <div className="pt-2 text-center text-sm text-[#5E4A4E] space-y-2">
          {mode === "signin" && (
            <p>
              New to StateEra?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setMessage("");
                }}
                className="font-bold text-[#3B0F18] hover:underline"
              >
                Create account
              </button>
            </p>
          )}

          {mode === "signup" && (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setMessage("");
                }}
                className="font-bold text-[#3B0F18] hover:underline"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === "forgot" && (
            <p>
              Remembered your credentials?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setMessage("");
                }}
                className="font-bold text-[#3B0F18] hover:underline"
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>

        <p className="text-center text-[11px] text-[#8C7B7F] border-t border-[#EADCDD] pt-4">
          StateEra Practice Prototype &bull; Simulated wallet &amp; fractional share verification.
        </p>
      </div>
    </main>
  );
}
