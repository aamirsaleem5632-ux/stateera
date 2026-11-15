"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Wallet,
  Building,
  CheckCircle2,
  Bot,
  BarChart2,
  Coins,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface WalkthroughStep {
  id: number;
  title: string;
  subtitle: string;
  caption: string;
  visualTag: string;
  statBadge: string;
  highlightColor: string;
  screenType: "marketplace" | "details" | "calculator" | "order" | "portfolio" | "dividend" | "ai";
}

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    id: 1,
    title: "1. Discover Institutional Properties",
    subtitle: "Explore global prime assets in Dubai, New York, London & Zurich",
    caption: "Browse institutional-grade properties with verified freehold title deeds, historical cash flow records, and tenant covenants.",
    visualTag: "Global Real Estate Marketplace",
    statBadge: "120+ Curated Global Assets",
    highlightColor: "#7C4DFF",
    screenType: "marketplace",
  },
  {
    id: 2,
    title: "2. Inspect AI Valuation & Due Diligence",
    subtitle: "Real-time confidence scoring & Bureau Veritas structural audits",
    caption: "Review audited legal titles, 100% occupancy rate proof, and AI predicted 12-month capital appreciation curves.",
    visualTag: "Autonomous Asset Intelligence",
    statBadge: "96% AI Valuation Confidence",
    highlightColor: "#5B3A8C",
    screenType: "details",
  },
  {
    id: 3,
    title: "3. Run Rental Yield Simulator",
    subtitle: "Interactive returns calculator from just $50 to $50,000",
    caption: "Calculate estimated monthly rent distributions, gross vs net yields, and ownership percentage before committing demo funds.",
    visualTag: "Deterministic Yield Engine",
    statBadge: "9.4% Projected Net Yield",
    highlightColor: "#7C4DFF",
    screenType: "calculator",
  },
  {
    id: 4,
    title: "4. Buy Simulated Fractional Shares",
    subtitle: "Instant order execution with your demo cash balance",
    caption: "Select share quantity, review transaction cost, and acquire legal fractional shares with zero paperwork or delays.",
    visualTag: "Instant Order Settlement",
    statBadge: "50 Shares Acquired ($5,000)",
    highlightColor: "#059669",
    screenType: "order",
  },
  {
    id: 5,
    title: "5. Real-Time Portfolio Performance",
    subtitle: "Track live capital appreciation & blended rental returns",
    caption: "Monitor your multi-city asset allocation, property-wise performance, and weighted dividend yield on an interactive financial dashboard.",
    visualTag: "Live Wealth Analytics",
    statBadge: "+4.17% Unrealized Gain",
    highlightColor: "#7C4DFF",
    screenType: "portfolio",
  },
  {
    id: 6,
    title: "6. Automated Monthly Rental Payouts",
    subtitle: "Escrow distributions credited directly to your demo wallet",
    caption: "Collect net rental yields after management fees and maintenance reserves, with instant downloadable PDF/CSV accounting statements.",
    visualTag: "Automated Dividend Payout",
    statBadge: "$61.22 Credited This Month",
    highlightColor: "#059669",
    screenType: "dividend",
  },
  {
    id: 7,
    title: "7. 24/7 Guidance with StateEra AI",
    subtitle: "Autonomous risk analyst & navigation assistant on every page",
    caption: "Ask StateEra AI to review lease contracts, identify vacancy risks, or compare two property investments anywhere on the platform.",
    visualTag: "StateEra AI Copilot",
    statBadge: "Autonomous Real Estate Analyst",
    highlightColor: "#7C4DFF",
    screenType: "ai",
  },
];

export const StateEraInAction: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentStep = WALKTHROUGH_STEPS[activeStepIndex];

  // Auto-advance walkthrough when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStepIndex((idx) => (idx + 1) % WALKTHROUGH_STEPS.length);
          return 0;
        }
        return prev + 2.5; // ~4 seconds per step
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, activeStepIndex]);

  const handleStepSelect = (index: number) => {
    setActiveStepIndex(index);
    setProgress(0);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8F4FD] via-[#F3EAFC]/50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6D8F5] text-[#5B3A8C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C4DFF]" />
            <span>Interactive Product Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] tracking-tight">
            {BRAND_CONFIG.name} in Action
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#585375]">
            See how fractional real estate investment works in seconds.
          </p>
        </div>

        {/* Video / Interactive Player Shell */}
        <div className="bg-white rounded-3xl border border-[#E6D8F5] shadow-2xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#1E1B4B] px-4 py-3 flex items-center justify-between text-white border-b border-[#332D56]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 text-xs font-mono text-[#A5A0C8] hidden sm:inline">
                stateera.demo/walkthrough • Step {activeStepIndex + 1} of {WALKTHROUGH_STEPS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-[#332D56] hover:bg-[#7C4DFF] text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause Demo" : "Play Demo"}</span>
              </button>
              <button
                onClick={() => {
                  setActiveStepIndex(0);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className="p-1 rounded-lg bg-[#332D56] hover:bg-[#7C4DFF] text-[#A5A0C8] hover:text-white transition-colors"
                title="Restart Walkthrough"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Player Display Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left: Interactive Simulated Screen Canvas */}
            <div className="lg:col-span-7 bg-[#F8F4FD] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E6D8F5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  {/* Step Visual Preview Card */}
                  <div className="bg-white rounded-2xl border border-[#E6D8F5] shadow-lg p-5 relative">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC] mb-4">
                      <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#F3EAFC] text-[#5B3A8C]">
                        {currentStep.visualTag}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-mint text-emerald-800">
                        {currentStep.statBadge}
                      </span>
                    </div>

                    {/* Step Specific Visual Graphic */}
                    {currentStep.screenType === "marketplace" && (
                      <div className="space-y-3">
                        <div className="h-44 rounded-xl overflow-hidden relative">
                          <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
                            alt="Marina Horizon Luxury Tower"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                            <div>
                              <span className="text-white font-bold text-base">Marina Horizon Luxury Tower</span>
                              <p className="text-white/80 text-xs">Dubai Marina • 9.4% Projected Net Yield</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                          <div className="bg-[#F8F4FD] p-2 rounded-lg">
                            <div className="text-[#8782A3] text-[10px]">Share Price</div>
                            <div className="font-bold text-[#1E1B4B]">$100</div>
                          </div>
                          <div className="bg-[#F8F4FD] p-2 rounded-lg">
                            <div className="text-[#8782A3] text-[10px]">Funded</div>
                            <div className="font-bold text-[#7C4DFF]">83.1%</div>
                          </div>
                          <div className="bg-[#F8F4FD] p-2 rounded-lg">
                            <div className="text-[#8782A3] text-[10px]">Occupancy</div>
                            <div className="font-bold text-emerald-600">98%</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "details" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#F3EAFC]/70 rounded-xl border border-[#E6D8F5] flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#1E1B4B]">AI Estimated Valuation</span>
                            <div className="text-xl font-black text-[#7C4DFF]">$8,650,000</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-emerald-700 font-bold bg-mint px-2 py-0.5 rounded-full">
                              96% Confidence
                            </span>
                            <div className="text-xs text-[#585375] mt-1">+3.2% vs Baseline</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-white border border-[#E6D8F5] rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Freehold DLD Title Verified</span>
                          </div>
                          <div className="p-2.5 bg-white border border-[#E6D8F5] rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Bureau Veritas Structural Audit</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "calculator" && (
                      <div className="space-y-3">
                        <div className="bg-[#F8F4FD] p-3 rounded-xl border border-[#E6D8F5]">
                          <div className="flex justify-between text-xs text-[#585375] mb-1">
                            <span>Sample Investment:</span>
                            <strong className="text-[#1E1B4B]">$5,000 (50 Shares)</strong>
                          </div>
                          <div className="w-full bg-[#E6D8F5] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#7C4DFF] h-full w-2/3" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-mint/50 border border-mint rounded-xl text-center">
                            <span className="text-[10px] uppercase font-bold text-emerald-800">Est. Monthly Dividend</span>
                            <div className="text-lg font-black text-emerald-700">$46.65 / mo</div>
                          </div>
                          <div className="p-3 bg-[#F3EAFC] border border-[#E6D8F5] rounded-xl text-center">
                            <span className="text-[10px] uppercase font-bold text-[#5B3A8C]">Annual Rental Yield</span>
                            <div className="text-lg font-black text-[#7C4DFF]">$559.80 / yr</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "order" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-900">Order Executed Successfully</div>
                            <div className="text-[11px] text-emerald-700">Acquired 50 shares of Marina Horizon @ $100.00</div>
                          </div>
                        </div>
                        <div className="p-3 bg-[#F8F4FD] rounded-xl text-xs space-y-1 text-[#585375]">
                          <div className="flex justify-between"><span>Wallet Balance Deducted:</span><strong className="text-[#1E1B4B]">-$5,000.00</strong></div>
                          <div className="flex justify-between"><span>Remaining Demo Cash:</span><strong className="text-emerald-700">$20,000.00</strong></div>
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "portfolio" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#F3EAFC] rounded-xl border border-[#E6D8F5] flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-[#585375] uppercase font-bold">Total Portfolio Value</span>
                            <div className="text-xl font-black text-[#1E1B4B]">$8,125.00</div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded-full">
                              +4.17% Gain
                            </span>
                            <div className="text-[11px] text-[#585375] mt-1">$72.15 Est. Rent/Mo</div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-white border border-[#E6D8F5] rounded-xl text-xs flex justify-between items-center">
                          <span className="font-semibold text-[#1E1B4B]">Marina Horizon (50 Shares)</span>
                          <span className="text-emerald-600 font-bold">$5,000.00</span>
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "dividend" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-mint/60 border border-mint rounded-xl flex items-center gap-3">
                          <Coins className="w-8 h-8 text-emerald-700" />
                          <div>
                            <span className="text-xs font-bold text-emerald-900">Simulated Rental Payout Completed</span>
                            <div className="text-lg font-black text-emerald-800">+$61.22 Deposited</div>
                          </div>
                        </div>
                        <div className="text-[11px] text-[#585375] bg-[#F8F4FD] p-2.5 rounded-xl border border-[#E6D8F5]">
                          Gross Collected ($180,400) - Ops ($14,000) - Reserves ($5,500) = Net Distributable ($152,550).
                        </div>
                      </div>
                    )}

                    {currentStep.screenType === "ai" && (
                      <div className="space-y-2">
                        <div className="p-3 bg-[#7C4DFF] text-white rounded-xl rounded-tr-none text-xs ml-auto max-w-[85%]">
                          "Can you analyze the net yield and occupancy risk for Marina Horizon?"
                        </div>
                        <div className="p-3 bg-white border border-[#E6D8F5] rounded-xl rounded-tl-none text-xs text-[#1E1B4B] space-y-1">
                          <div className="flex items-center gap-1.5 text-[#7C4DFF] font-bold">
                            <Bot className="w-3.5 h-3.5" />
                            <span>StateEra AI:</span>
                          </div>
                          <p className="text-[11px] text-[#585375] leading-relaxed">
                            Marina Horizon boasts 98% occupancy with prime waterfront location momentum. Projected net yield is 9.4% after management fees.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Step List & Commentary */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF]">
                  Guided Experience
                </span>
                <h3 className="text-2xl font-bold text-[#1E1B4B] leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-sm font-medium text-[#5B3A8C]">
                  {currentStep.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#585375] leading-relaxed pt-1">
                  {currentStep.caption}
                </p>
              </div>

              {/* Progress Stepper Pills */}
              <div className="pt-6 space-y-2">
                <div className="w-full bg-[#E6D8F5] h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-[#7C4DFF] h-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {WALKTHROUGH_STEPS.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleStepSelect(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeStepIndex
                          ? "bg-[#7C4DFF] scale-110"
                          : idx < activeStepIndex
                          ? "bg-mint"
                          : "bg-[#E6D8F5]"
                      }`}
                      title={s.title}
                    />
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>Try Real Interactive Demo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleStepSelect((activeStepIndex + 1) % WALKTHROUGH_STEPS.length)}
                    className="text-xs font-semibold text-[#5B3A8C] hover:text-[#7C4DFF] flex items-center gap-1"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
