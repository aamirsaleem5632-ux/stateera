"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X, Building2, Coins, Wallet, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BeginnerGuideBannerProps {
  pageName?: "dashboard" | "explore" | "property";
}

export const BeginnerGuideBanner: React.FC<BeginnerGuideBannerProps> = ({ pageName = "dashboard" }) => {
  const { dir } = useLanguage();
  const [isDismissed, setIsDismissed] = useState<boolean>(true);

  const storageKey = `stateera_beginner_banner_${pageName}`;

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) {
        setIsDismissed(false);
      }
    } catch {
      setIsDismissed(false);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem(storageKey, "true");
    } catch {
      // Ignore
    }
  };

  if (isDismissed) return null;

  return (
    <div
      className="bg-gradient-to-r from-[#F3EAFC] via-[#FFFFFF] to-[#DCFCE7]/40 border border-[#E6D8F5] rounded-3xl p-5 sm:p-6 shadow-sm mb-6 relative overflow-hidden"
      dir={dir}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left explanation */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#7C4DFF] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-mint" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E1B4B]">
                New to property investing? Here is how it works in 3 easy steps:
              </h3>
              <p className="text-xs text-[#585375]">
                You don't need millions to invest in real estate. Own small parts of prime buildings and earn monthly rent.
              </p>
            </div>
          </div>

          {/* 3 Step Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white/80 border border-[#E6D8F5] rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-[#F3EAFC] text-[#7C4DFF] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-xs font-bold text-[#1E1B4B] block">Pick a property</strong>
                <span className="text-[11px] text-[#585375] leading-snug block mt-0.5">
                  Browse verified buildings with audited safety checks and active tenants.
                </span>
              </div>
            </div>

            <div className="bg-white/80 border border-[#E6D8F5] rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-[#F3EAFC] text-[#7C4DFF] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-xs font-bold text-[#1E1B4B] block">Buy small shares</strong>
                <span className="text-[11px] text-[#585375] leading-snug block mt-0.5">
                  Start from $50 with your demo cash. Own a legally separated piece of the asset.
                </span>
              </div>
            </div>

            <div className="bg-white/80 border border-[#E6D8F5] rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-mint text-emerald-900 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-xs font-bold text-emerald-900 block">Collect monthly rent</strong>
                <span className="text-[11px] text-[#585375] leading-snug block mt-0.5">
                  Net tenant rent is automatically deposited to your wallet on the 1st of each month.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA and Dismiss */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E6D8F5]">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EAFC] border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C] transition-colors shadow-xs whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#7C4DFF]" />
            <span>Read Simple Guide & Terms</span>
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-[11px] text-[#8782A3] hover:text-[#1E1B4B] flex items-center gap-1 transition-colors px-2 py-1"
          >
            <X className="w-3 h-3" />
            <span>Got it, don't show again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
