"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useStorageBoolean, setStorageItem } from "@/lib/storageStore";

interface BeginnerGuideBannerProps {
  pageName?: "dashboard" | "explore" | "property";
}

export const BeginnerGuideBanner: React.FC<BeginnerGuideBannerProps> = ({ pageName = "dashboard" }) => {
  const { dir } = useLanguage();
  const [locallyDismissed, setLocallyDismissed] = useState<boolean>(false);

  const storageKey = `stateera_beginner_banner_${pageName}`;
  // Default to false (visible) on SSR so first-time visitors don't get a
  // post-hydration layout shift when localStorage has no dismissal record.
  const isStoredDismissed = useStorageBoolean(storageKey, false);

  const isDismissed = isStoredDismissed || locallyDismissed;

  const handleDismiss = () => {
    setLocallyDismissed(true);
    setStorageItem(storageKey, "true");
  };

  if (isDismissed) return null;

  return (
    <div
      className="bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl p-5 sm:p-6 mb-6 relative"
      dir={dir}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left explanation */}
        <div className="space-y-3 flex-1">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#1A080C]">
              New to fractional property investing? Here is how it works:
            </h3>
            <p className="text-xs text-[#5E4A4E] mt-0.5">
              Own fractional shares of institutional properties and collect monthly rent distributions.
            </p>
          </div>

          {/* 3 Step Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white border border-[#EADCDD] rounded-xl p-3 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#3B0F18] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-xs font-bold text-[#1A080C] block">Pick a property</strong>
                <span className="text-[11px] text-[#5E4A4E] leading-snug block mt-0.5">
                  Browse audited assets with verified titles and active corporate tenants.
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#EADCDD] rounded-xl p-3 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#3B0F18] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-xs font-bold text-[#1A080C] block">Buy shares</strong>
                <span className="text-[11px] text-[#5E4A4E] leading-snug block mt-0.5">
                  Start from $25 with your practice funds. Acquire legally segregated shares.
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#EADCDD] rounded-xl p-3 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#15803D] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-xs font-bold text-[#15803D] block">Collect rent</strong>
                <span className="text-[11px] text-[#5E4A4E] leading-snug block mt-0.5">
                  Net tenant rent is credited to your demo wallet on the 1st of each month.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA and Dismiss */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#EADCDD]">
          <Link
            href="/glossary"
            className="btn btn-secondary text-xs font-semibold whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Investment Glossary</span>
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-[11px] text-[#8C7B7F] hover:text-[#1A080C] flex items-center gap-1 transition-colors px-1"
          >
            <X className="w-3 h-3" />
            <span>Dismiss</span>
          </button>
        </div>
      </div>
    </div>
  );
};
