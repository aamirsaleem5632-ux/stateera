"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
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
import { useIsMounted } from "@/hooks/useIsMounted";
import { UserRole } from "@/types/admin";

function subscribeUrlParams(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getUrlErrorSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("error");
}

function getUrlMessageSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  const msg = new URLSearchParams(window.location.search).get("message");
  if (msg === "password_updated") {
    return "Your password has been updated successfully. Please sign in with your new credentials.";
  }
  if (msg === "email_confirmed") {
    return "Your email address has been confirmed successfully. Please sign in with your credentials.";
  }
  return msg;
}

function getServerSnapshot(): string | null {
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useDemo();
  const isMounted = useIsMounted();

  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [dismissedUrlError, setDismissedUrlError] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [showResendOption, setShowResendOption] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);

  const [activeRoleTab, setActiveRoleTab] = useState<"investor" | "manager" | "tenant" | "admin">("investor");
  const [invitationCode, setInvitationCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const r = p.get("role");
      if (r === "manager" || r === "tenant" || r === "admin" || r === "investor") {
        setActiveRoleTab(r);
      }
      const emailParam = p.get("email");
      if (emailParam) {
        setEmail(emailParam);
      }
      const errParam = p.get("error");
      if (
        errParam === "email_link_expired" ||
        errParam === "otp_expired" ||
        errParam === "email_not_confirmed"
      ) {
        setShowResendOption(true);
      }
    }
  }, []);

  async function handleVerifyInvitation(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!invitationCode.trim()) {
      setError("Please enter a valid invitation code.");
      return;
    }
    setVerifyingCode(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/invitation/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeRoleTab,
          code: invitationCode.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid or unauthorized verification token.");
        setVerifyingCode(false);
        return;
      }

      if (data.isDemo) {
        setRole(data.role);
        setMessage(data.message || `Demo Clearance Verified! Redirecting to ${data.role} sandbox...`);
        setTimeout(() => {
          router.push(data.sandboxUrl);
        }, 800);
      } else {
        setMessage("Invitation code verified. You may now complete sign-in.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to connect to verification service.");
    } finally {
      setVerifyingCode(false);
    }
  }

  const urlErrorParam = useSyncExternalStore(
    subscribeUrlParams,
    getUrlErrorSnapshot,
    getServerSnapshot
  );

  const urlMessageParam = useSyncExternalStore(
    subscribeUrlParams,
    getUrlMessageSnapshot,
    getServerSnapshot
  );

  const urlErrorMessage = useMemo(() => {
    if (!isMounted || !urlErrorParam || dismissedUrlError) return "";
    switch (urlErrorParam) {
      case "schema_upgrade_pending":
        return "System Maintenance: Database schema upgrade is pending. Administrator migration is required to enable live portal access.";
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
      case "email_link_expired":
      case "otp_expired":
        return "Verification Link Expired or Invalid: The email confirmation link has expired or has already been used. Please enter your email and click 'Resend Verification Link' below.";
      case "email_not_confirmed":
        return "Email Verification Pending: Please verify your email via the link sent to your inbox before signing in, or click 'Resend Verification Link' below.";
      case "token_expired":
        return "Security Token Expired: Please request a fresh confirmation or password reset link below.";
      case "over_email_send_rate_limit":
        return "Email Dispatch Throttled: Email rate limit reached. Please wait a few moments before requesting another link.";
      default:
        return urlErrorParam;
    }
  }, [isMounted, urlErrorParam, dismissedUrlError]);

  const error = formError || urlErrorMessage;
  const message = formMessage || (isMounted ? urlMessageParam || "" : "");

  const setError = (err: string) => {
    setFormError(err);
    if (!err) {
      setDismissedUrlError(true);
    }
  };

  const setMessage = (msg: string) => {
    setFormMessage(msg);
  };

  async function handleResendVerification() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your registered email address first.");
      return;
    }
    setResendingVerification(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: cleanEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        const errMsg = (error.message || "").toLowerCase();
        if (
          errMsg.includes("rate limit") ||
          errMsg.includes("over_email_send_rate_limit")
        ) {
          setError(
            "Verification email rate limit reached. Supabase free tier throttles outbound emails. Please check your inbox (and Spam/Junk folder) for previous emails, or wait a few minutes before trying again."
          );
        } else {
          setError(error.message || "Failed to dispatch verification email.");
        }
      } else {
        setMessage(
          `Fresh verification link dispatched to ${cleanEmail}. Please check your inbox and click the confirmation link to activate your account.`
        );
      }
    } catch (err: any) {
      setError(err?.message || "Failed to dispatch verification email.");
    } finally {
      setResendingVerification(false);
    }
  }

  const supabase = createClient();

  // Helper to extract safe redirection target from searchParams
  const getSafeNextPath = () => {
    if (typeof window === "undefined") return null;
    const nextParam = new URLSearchParams(window.location.search).get("next");
    if (
      nextParam &&
      nextParam.startsWith("/") &&
      !nextParam.startsWith("//") &&
      !nextParam.includes("\\")
    ) {
      return nextParam;
    }
    return null;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const safeNext = getSafeNextPath();

    try {
      if (mode === "forgot") {
        if (!cleanEmail) {
          setError("Please enter your registered email address.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
        });

        if (error) {
          const errMsg = (error.message || "").toLowerCase();
          if (
            errMsg.includes("rate limit") ||
            errMsg.includes("smtp") ||
            errMsg.includes("email provider") ||
            errMsg.includes("not configured") ||
            errMsg.includes("error sending") ||
            errMsg.includes("over_email_send_rate_limit")
          ) {
            setError("Password recovery email delivery is not configured or rate-limited in this demo environment. In production, configure an SMTP provider in the Supabase Dashboard.");
          } else {
            setError(error.message || "Failed to dispatch password recovery email.");
          }
        } else {
          setMessage(`Password recovery email dispatched to ${cleanEmail}. Please check your inbox for the reset link.`);
        }
      } else if (mode === "signup") {
        if (cleanName.length < 2) {
          setError("Please enter your full name (at least 2 characters).");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: cleanName,
              name: cleanName,
              role: "investor",
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext || "/dashboard")}`,
          },
        });

        if (error) {
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes("already registered") || errMsg.includes("already in use")) {
            setError("An account with this email address already exists. Please sign in or reset your password.");
          } else if (errMsg.includes("rate limit") || errMsg.includes("over_email_send_rate_limit")) {
            setError("Too many registration requests. Please wait a few moments before trying again.");
          } else {
            setError(error.message || "Account creation failed. Please check your credentials.");
          }
        } else if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError("An account with this email address already exists. Please sign in, reset your password, or request a new verification link.");
          setShowResendOption(true);
        } else if (data.session) {
          // Auto-login active (email confirmation disabled in Supabase project)
          setRole("investor");
          router.push(safeNext || "/dashboard");
          router.refresh();
        } else {
          // Email confirmation is required by Supabase Auth
          setMessage(`Account created successfully! A verification email has been sent to ${cleanEmail}. Please check your inbox and verify your email before signing in.`);
          setShowResendOption(true);
        }
      } else {
        // Sign-in mode
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes("invalid login credentials") || errMsg.includes("invalid credentials")) {
            setError("Invalid email or password. If you recently registered, please ensure your email has been confirmed, or click 'Resend Verification Link' below.");
            setShowResendOption(true);
          } else if (errMsg.includes("email not confirmed")) {
            setError("Email verification pending. Please verify your email via the link sent to your inbox before signing in, or click 'Resend Verification Link' below.");
            setShowResendOption(true);
          } else if (errMsg.includes("rate limit") || errMsg.includes("over_email_send_rate_limit")) {
            setError("Too many authentication attempts or email rate limit reached. Please wait a few moments before trying again.");
          } else {
            setError(error.message || "Invalid credentials. Please verify your email and password.");
          }
        } else {
          if (authData?.user) {
            try {
              const { data: profile, error: profileErr } = await supabase
                .from("profiles")
                .select("role, role_approval_status")
                .eq("id", authData.user.id)
                .single();

              const isApproved = (profile?.role_approval_status || "").toLowerCase() === "approved";
              const isRejected = (profile?.role_approval_status || "").toLowerCase() === "rejected";

              if (!profileErr && profile && isApproved) {
                const approvedRole = profile.role as UserRole;
                setRole(approvedRole);

                if (approvedRole === "admin") {
                  router.push(safeNext || "/admin");
                  router.refresh();
                  return;
                } else if (approvedRole === "manager") {
                  router.push(safeNext && !safeNext.startsWith("/admin") ? safeNext : "/manager");
                  router.refresh();
                  return;
                } else if (approvedRole === "tenant") {
                  router.push(safeNext && !safeNext.startsWith("/admin") && !safeNext.startsWith("/manager") ? safeNext : "/tenant");
                  router.refresh();
                  return;
                } else {
                  router.push(safeNext || "/dashboard");
                  router.refresh();
                  return;
                }
              } else if (profile && !isApproved) {
                // Restricted/Unapproved role: restrict to investor dashboard
                setRole("investor");
                if (isRejected) {
                  setMessage(`Your ${profile.role} application was declined by compliance. Operating under standard Investor access.`);
                } else {
                  setMessage(`Your ${profile.role} clearance is currently pending compliance verification. Operating under standard Investor access.`);
                }
                router.push(safeNext && !safeNext.startsWith("/admin") && !safeNext.startsWith("/manager") && !safeNext.startsWith("/tenant") ? safeNext : "/dashboard");
                router.refresh();
                return;
              } else if (profileErr) {
                // Check if profileErr is due to schema migration in progress
                const errCode = profileErr.code || "";
                const errMsg = (profileErr.message || "").toLowerCase();
                const errDetails = (profileErr.details || "").toLowerCase();
                const isSchemaError =
                  errCode === "PGRST204" ||
                  errCode === "42703" ||
                  errMsg.includes("role_approval_status") ||
                  errDetails.includes("role_approval_status") ||
                  (errMsg.includes("column") && errMsg.includes("does not exist"));

                if (isSchemaError) {
                  const { data: baseProfile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", authData.user.id)
                    .single();

                  setRole("investor");
                  if (baseProfile && baseProfile.role && baseProfile.role !== "investor" && baseProfile.role !== "user") {
                    setMessage(`Sign-in successful. Your ${baseProfile.role} clearance verification is pending database migration.`);
                  } else {
                    setMessage("Sign-in successful. Welcome to StateEra.");
                  }
                  router.push(safeNext || "/dashboard");
                  router.refresh();
                  return;
                }
              }
            } catch {
              // Fail-closed on database or lookup error
              setRole("investor");
            }
          }

          setRole("investor");
          router.push(safeNext || "/dashboard");
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
      const safeNext = getSafeNextPath();
      const dynamicRedirect = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext || "/dashboard")}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` ? dynamicRedirect : `${window.location.origin}/auth/callback?next=/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        const msg = (error.message || "").toLowerCase();
        if (msg.includes("unsupported provider") || msg.includes("not enabled")) {
          setError(
            "Google Sign-In is not enabled in the Supabase Dashboard. To enable, configure the Google provider under Authentication -> Providers."
          );
        } else {
          setError(error.message || "Failed to initiate Google authentication. Please try again.");
        }
        setLoading(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google authentication connection failed. Please check network connectivity."
      );
      setLoading(false);
    }
  }

  const handleInstantDemoLogin = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-[#EADCDD] rounded-3xl p-7 sm:p-10 shadow-sm space-y-6">
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
            {mode === "signin" && "Welcome to StateEra"}
            {mode === "signup" && "Create your StateEra account"}
            {mode === "forgot" && "Recover your password"}
          </h1>
          <p className="text-sm text-[#5E4A4E]">
            {mode === "signin" && "Select your platform role and sign in with authorized credentials"}
            {mode === "signup" && "Join global investors, tenants, and property managers"}
            {mode === "forgot" && "Enter your email to receive recovery instructions"}
          </p>
        </div>

        {/* FOUR ROLE SELECTION OPTIONS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#1A080C]">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[#3B0F18]">
              Role Selection
            </span>
            <span className="text-[11px] text-[#8C7B7F]">4 Strict Roles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 1. Investor — Highlighted Default */}
            <button
              type="button"
              onClick={() => {
                setActiveRoleTab("investor");
                setError("");
                setMessage("");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeRoleTab === "investor"
                  ? "border-[#3B0F18] bg-[#FAF5F5] ring-2 ring-[#3B0F18]/20 shadow-sm"
                  : "border-[#EADCDD] bg-white hover:border-[#8C7B7F]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-[#1A080C] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#3B0F18]" />
                  Investor
                </span>
                <span className="badge badge-success text-[9px] uppercase font-bold">
                  Highlighted Default
                </span>
              </div>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                Explore properties, buy shares and collect rent.
              </p>
            </button>

            {/* 2. Property Manager */}
            <button
              type="button"
              onClick={() => {
                setActiveRoleTab("manager");
                setError("");
                setMessage("");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeRoleTab === "manager"
                  ? "border-[#3B0F18] bg-[#FAF5F5] ring-2 ring-[#3B0F18]/20 shadow-sm"
                  : "border-[#EADCDD] bg-white hover:border-[#8C7B7F]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-[#1A080C] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#3B0F18]" />
                  Property Manager
                </span>
                <span className="badge badge-warning text-[9px] uppercase font-bold">
                  Restricted
                </span>
              </div>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                Manage properties, rent and work orders.
              </p>
            </button>

            {/* 3. Tenant */}
            <button
              type="button"
              onClick={() => {
                setActiveRoleTab("tenant");
                setError("");
                setMessage("");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeRoleTab === "tenant"
                  ? "border-[#3B0F18] bg-[#FAF5F5] ring-2 ring-[#3B0F18]/20 shadow-sm"
                  : "border-[#EADCDD] bg-white hover:border-[#8C7B7F]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-[#1A080C] flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#3B0F18]" />
                  Tenant
                </span>
                <span className="badge badge-warning text-[9px] uppercase font-bold">
                  Restricted
                </span>
              </div>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                View lease, pay rent and submit maintenance requests.
              </p>
            </button>

            {/* 4. Platform Admin */}
            <button
              type="button"
              onClick={() => {
                setActiveRoleTab("admin");
                setError("");
                setMessage("");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeRoleTab === "admin"
                  ? "border-[#3B0F18] bg-[#FAF5F5] ring-2 ring-[#3B0F18]/20 shadow-sm"
                  : "border-[#EADCDD] bg-white hover:border-[#8C7B7F]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-[#1A080C] flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#3B0F18]" />
                  Platform Admin
                </span>
                <span className="badge badge-demo text-[9px] uppercase font-bold">
                  Max Security
                </span>
              </div>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                Platform statistics, KYC and approvals.
              </p>
            </button>
          </div>

          {/* Mandatory Security Banner */}
          <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl flex items-start gap-2.5 text-xs text-[#5E4A4E]">
            <Shield className="w-4 h-4 text-[#3B0F18] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#1A080C]">Security Notice:</strong> The selected role is NOT proof of authorization. A user must never obtain a role simply by clicking its card.
            </p>
          </div>
        </div>

        {/* Role-Specific Information & Invitation Code Input for Non-Investor Roles */}
        {activeRoleTab !== "investor" && (
          <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A080C] uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#3B0F18]" />
                {activeRoleTab === "manager"
                  ? "Property Manager Clearance"
                  : activeRoleTab === "tenant"
                  ? "Tenant Resident Clearance"
                  : "Administrator Clearance"}
              </span>
              <span className="badge badge-demo text-[10px]">Restricted Access</span>
            </div>

            <p className="text-[11px] text-[#5E4A4E] leading-relaxed">
              {activeRoleTab === "manager" &&
                "Public Property Manager registration is disabled. You may sign in with verified credentials below, or verify an authorized invitation code to enter the manager sandbox."}
              {activeRoleTab === "tenant" &&
                "Public Tenant registration is disabled. You may sign in with approved lease credentials below, or verify your lease token to enter the tenant sandbox."}
              {activeRoleTab === "admin" &&
                "Public Admin registration is disabled. Access requires an allowlisted administrative email or verified cryptographic token."}
            </p>

            {/* Invitation Code Verification Form */}
            <form onSubmit={handleVerifyInvitation} className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#1A080C]">
                Enter {activeRoleTab === "manager" ? "Manager" : activeRoleTab === "tenant" ? "Tenant" : "Admin"} Invitation / Demo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                  placeholder={
                    activeRoleTab === "manager"
                      ? "e.g. MGR-DEMO-2026"
                      : activeRoleTab === "tenant"
                      ? "e.g. TEN-DEMO-2026"
                      : "e.g. ADMIN-DEMO-2026"
                  }
                  className="input flex-1 font-mono text-xs uppercase"
                  disabled={verifyingCode}
                />
                <button
                  type="submit"
                  disabled={verifyingCode || !invitationCode.trim()}
                  className="btn btn-primary text-xs whitespace-nowrap px-4 flex items-center gap-1.5"
                >
                  {verifyingCode && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Verify Code</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TEACHER DEMONSTRATION & SECURE EVALUATION SYSTEM */}
        <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#1A080C]">
            <span className="flex items-center gap-1.5 text-[#3B0F18]">
              <Info className="w-3.5 h-3.5" />
              Teacher Demonstration &amp; Secure Evaluation System
            </span>
            <span className="badge badge-demo text-[10px]">Fictional Sandbox</span>
          </div>

          <p className="text-[11px] text-[#5E4A4E] leading-relaxed">
            Teachers and evaluators may inspect all four roles safely. Demo accounts operate in isolated sandboxes (<code className="text-[#3B0F18]">/demo/*</code>) with mock data and never access live database tables.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Investor Demo Identity */}
            <div className="p-2.5 bg-white border border-[#EADCDD] rounded-xl flex items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="font-bold break-all leading-snug text-[#1A080C]">investor.demo@stateera.test</div>
                <div className="text-[10px] text-[#8C7B7F]">$25,000 Simulated Funds</div>
              </div>
              <button
                type="button"
                onClick={() => handleInstantDemoLogin("investor", "/dashboard")}
                className="btn btn-secondary text-[11px] py-1 px-2.5 shrink-0 whitespace-nowrap self-center"
              >
                Launch Demo
              </button>
            </div>

            {/* Manager Demo Identity */}
            <div className="p-2.5 bg-white border border-[#EADCDD] rounded-xl flex items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="font-bold break-all leading-snug text-[#1A080C]">manager.demo@stateera.test</div>
                <div className="text-[10px] text-[#8C7B7F]">Code: <code className="font-mono text-[#3B0F18]">MGR-DEMO-2026</code></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveRoleTab("manager");
                  setInvitationCode("MGR-DEMO-2026");
                }}
                className="btn btn-secondary text-[11px] py-1 px-2.5 shrink-0 whitespace-nowrap self-center"
              >
                Fill Code
              </button>
            </div>

            {/* Tenant Demo Identity */}
            <div className="p-2.5 bg-white border border-[#EADCDD] rounded-xl flex items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="font-bold break-all leading-snug text-[#1A080C]">tenant.demo@stateera.test</div>
                <div className="text-[10px] text-[#8C7B7F]">Code: <code className="font-mono text-[#3B0F18]">TEN-DEMO-2026</code></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveRoleTab("tenant");
                  setInvitationCode("TEN-DEMO-2026");
                }}
                className="btn btn-secondary text-[11px] py-1 px-2.5 shrink-0 whitespace-nowrap self-center"
              >
                Fill Code
              </button>
            </div>

            {/* Admin Demo Identity */}
            <div className="p-2.5 bg-white border border-[#EADCDD] rounded-xl flex items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="font-bold break-all leading-snug text-[#1A080C]">admin.demo@stateera.test</div>
                <div className="text-[10px] text-[#8C7B7F]">Code: <code className="font-mono text-[#3B0F18]">ADMIN-DEMO-2026</code></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveRoleTab("admin");
                  setInvitationCode("ADMIN-DEMO-2026");
                }}
                className="btn btn-secondary text-[11px] py-1 px-2.5 shrink-0 whitespace-nowrap self-center"
              >
                Fill Code
              </button>
            </div>
          </div>

          {/* Test Unauthorized / Invalid Code Button */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[10px] text-[#8C7B7F]">
              Test system rejection of unauthorized codes:
            </span>
            <button
              type="button"
              onClick={async () => {
                setActiveRoleTab("manager");
                setInvitationCode("HACKER-CODE-403");
                setVerifyingCode(true);
                setError("");
                setMessage("");
                try {
                  const res = await fetch("/api/invitation/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      role: "manager",
                      code: "HACKER-CODE-403",
                    }),
                  });
                  const data = await res.json();
                  setError(data.message || "Access Denied: The verification code is invalid, expired, or unauthorized.");
                } catch {
                  setError("Access Denied: Verification failed.");
                } finally {
                  setVerifyingCode(false);
                }
              }}
              className="text-[11px] font-bold text-red-700 hover:underline"
            >
              Test Invalid Code Rejection →
            </button>
          </div>
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
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#1A080C] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B7F] pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input w-full !pl-11"
                disabled={loading}
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
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResendOption(!showResendOption);
                        setError("");
                        setMessage("");
                      }}
                      className="text-xs font-semibold text-[#8C7B7F] hover:text-[#3B0F18] hover:underline"
                    >
                      Resend verification?
                    </button>
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
                  </div>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B7F] pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input w-full !pl-11 !pr-11"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7B7F] hover:text-[#1A080C] focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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

          {showResendOption && (
            <div className="p-3.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#1A080C] block">
                  Email verification link
                </span>
                <span className="text-[11px] text-[#5E4A4E] block">
                  Didn't receive or link expired? Send a fresh link to your email.
                </span>
              </div>
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendingVerification || !email.trim()}
                className="btn btn-secondary text-xs py-2 px-3.5 shrink-0 whitespace-nowrap flex items-center gap-1.5 self-stretch sm:self-auto justify-center font-bold"
              >
                {resendingVerification ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <span>Resend Verification Link</span>
                )}
              </button>
            </div>
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
