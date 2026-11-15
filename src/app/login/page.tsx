"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (error) throw error;

        if (data.session) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setMessage("Account created. Please check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/dashboard");
        router.refresh();
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

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E6D8F5] shadow-lg p-7 sm:p-9">
        <Link href="/" className="flex justify-center items-center gap-2 mb-7">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#5B3A8C] to-[#7C4DFF] flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-[#1E1B4B]">StateEra</span>
        </Link>

        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-[#1E1B4B]">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-[#8782A3] mt-2">
            {isSignup
              ? "Join StateEra and explore fractional real estate."
              : "Sign in to continue to your StateEra account."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-[#E6D8F5] rounded-xl py-3 text-sm font-semibold text-[#1E1B4B] hover:bg-[#F8F4FD] transition-colors disabled:opacity-50"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-[#E6D8F5] flex-1" />
          <span className="text-xs text-[#8782A3]">OR CONTINUE WITH EMAIL</span>
          <div className="h-px bg-[#E6D8F5] flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E1B4B] mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#8782A3]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-[#E6D8F5] rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1E1B4B] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#8782A3]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full border border-[#E6D8F5] rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/10"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-green-700 bg-green-50 rounded-lg p-3">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full stateera-button-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-[#585375] mt-6">
          {isSignup ? "Already have an account?" : "New to StateEra?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setMessage("");
            }}
            className="font-bold text-[#7C4DFF] hover:underline"
          >
            {isSignup ? "Sign in" : "Create account"}
          </button>
        </p>

        <p className="text-center text-xs text-[#8782A3] mt-5">
          Academic demo platform. All wallet and investment activity is simulated.
        </p>
      </div>
    </main>
  );
}
