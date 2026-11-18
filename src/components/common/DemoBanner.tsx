"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface DemoBannerProps {
  portalName: string;
  roleDescription: string;
  liveRoute: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  portalName,
  roleDescription,
  liveRoute,
}) => {
  return (
    <aside
      aria-label="Demo Mode Notice"
      className="bg-[#FAF5F5] border-2 border-[#EADCDD] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#3B0F18] text-white flex items-center justify-center font-black text-xs shrink-0 tracking-wider shadow-sm">
          DEMO
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-[#1A080C]">
              Demo Mode: {portalName}
            </h2>
            <span className="bg-[#15803D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Isolated Sandbox
            </span>
          </div>
          <p className="text-xs text-[#5E4A4E] leading-relaxed max-w-3xl">
            {roleDescription} All data shown is simulated in your browser. This sandbox does not modify or access production databases at <code className="text-[#3B0F18] font-bold">{liveRoute}</code>.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
        <Link
          href="/login"
          className="btn btn-secondary text-xs font-semibold py-2 px-3.5 w-full md:w-auto text-center flex items-center justify-center gap-1.5"
        >
          <span>Live Portal Login</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
