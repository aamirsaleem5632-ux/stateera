"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    async function checkRecoverySession() {
      try {
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const errParam = params.get("error");
          const errDesc = params.get("error_description");

          if (errParam || errDesc) {
            if (isMounted) {
              setError(errDesc || errParam || "Password recovery link is invalid or expired.");
              setHasValidSession(false);
              setCheckingSession(false);
            }
            return;
          }

          const code = params.get("code");
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (!exchangeError) {
              if (isMounted) {
                setHasValidSession(true);
                setCheckingSession(false);
              }
              return;
            }
          }

          const tokenHash = params.get("token_hash");
          const otpType = params.get("type");
          if (tokenHash && (otpType === "recovery" || otpType === "email")) {
            const { error: otpError } = await supabase.auth.verifyOtp({
              token_hash: tokenHash,
              type: otpType as any,
            });
            if (!otpError) {
              if (isMounted) {
                setHasValidSession(true);
                setCheckingSession(false);
              }
              return;
            }
          }
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (isMounted) {
          if (!sessionError && session?.user) {
            setHasValidSession(true);
            setCheckingSession(false);
          } else {
            // Also listen in case session arrives via auth event
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
              if (event === "PASSWORD_RECOVERY" || s?.user) {
                if (isMounted) {
                  setHasValidSession(true);
                  setCheckingSession(false);
                }
              }
            });
            authSubscription = subscription;
            setTimeout(() => {
              if (isMounted) setCheckingSession(false);
            }, 1000);
          }
        }
      } catch {
        if (isMounted) {
          setHasValidSession(false);
          setCheckingSession(false);
        }
      }
    }

    checkRecoverySession();

    return () => {
      isMounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [supabase]);

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update password. Please try again.");
      } else {
        setSuccess(true);
        // Clear recovery session on both client and server to enforce clean sign-in with new password
        await supabase.auth.signOut();
        try {
          await fetch("/auth/signout", { method: "POST" });
        } catch {
          // Offline fallback
        }
        setTimeout(() => {
          router.push("/login?message=password_updated");
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#EADCDD] rounded-3xl p-7 sm:p-10 shadow-sm space-y-6">
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
            Set New Password
          </h1>
          <p className="text-sm text-[#5E4A4E]">
            Enter your new secure password to restore access to your portfolio.
          </p>
        </div>

        {checkingSession ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-sm text-[#5E4A4E]">
            <Loader2 className="w-6 h-6 animate-spin text-[#3B0F18]" />
            <span>Validating recovery authorization...</span>
          </div>
        ) : !hasValidSession && !success ? (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Recovery Link Expired or Invalid</p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  This password recovery link has already been used or has expired. For security, recovery links are single-use and time-limited.
                </p>
              </div>
            </div>

            <Link
              href="/login"
              className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In / Request Link</span>
            </Link>
          </div>
        ) : success ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#1A080C]">Password Updated Successfully</h2>
              <p className="text-xs text-[#5E4A4E]">
                Your account password has been updated. Redirecting you to sign in with your new credentials...
              </p>
            </div>
            <Link
              href="/login"
              className="btn btn-primary w-full py-3 inline-flex items-center justify-center text-sm font-bold"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A080C] mb-1.5">
                New Password
              </label>
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

            <div>
              <label className="block text-sm font-semibold text-[#1A080C] mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B7F] pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="input w-full !pl-11 !pr-11"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7B7F] hover:text-[#1A080C] focus:outline-none transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-bold"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Update Password</span>
            </button>

            <div className="pt-2 text-center">
              <Link href="/login" className="text-xs font-semibold text-[#3B0F18] hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
