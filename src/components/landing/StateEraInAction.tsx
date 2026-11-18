"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  TrendingUp,
  Wallet,
  Building,
  CheckCircle2,
  Bot,
  Coins,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { Reveal } from "@/components/scroll/Reveal";

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
    subtitle: "Explore prime assets across international & domestic hubs",
    caption: "Browse institutional-grade properties with verified freehold title deeds, historical cash flow records, and tenant covenants.",
    visualTag: "Real Estate Marketplace",
    statBadge: "18 Curated Demo Assets",
    highlightColor: "#3B0F18",
    screenType: "marketplace",
  },
  {
    id: 2,
    title: "2. Inspect AI Valuation & Due Diligence",
    subtitle: "Real-time confidence scoring & structural audits",
    caption: "Review audited legal titles, 100% occupancy rate proof, and predicted capital appreciation curves.",
    visualTag: "Asset Intelligence",
    statBadge: "96% Valuation Confidence",
    highlightColor: "#3B0F18",
    screenType: "details",
  },
  {
    id: 3,
    title: "3. Run Rental Yield Simulator",
    subtitle: "Interactive returns calculator from just $50 to $50,000",
    caption: "Calculate estimated monthly rent distributions, gross vs net yields, and ownership percentage before committing demo funds.",
    visualTag: "Yield Engine",
    statBadge: "9.4% Projected Net Yield",
    highlightColor: "#3B0F18",
    screenType: "calculator",
  },
  {
    id: 4,
    title: "4. Buy Simulated Fractional Shares",
    subtitle: "Instant order execution with your demo cash balance",
    caption: "Select share quantity, review transaction cost, and acquire legal fractional shares with zero paperwork or delays.",
    visualTag: "Order Settlement",
    statBadge: "50 Shares Acquired ($5,000)",
    highlightColor: "#15803D",
    screenType: "order",
  },
  {
    id: 5,
    title: "5. Real-Time Portfolio Performance",
    subtitle: "Track live capital appreciation & blended rental returns",
    caption: "Monitor your multi-city asset allocation, property-wise performance, and weighted dividend yield on an interactive financial dashboard.",
    visualTag: "Portfolio Analytics",
    statBadge: "+4.17% Simulated Gain",
    highlightColor: "#3B0F18",
    screenType: "portfolio",
  },
  {
    id: 6,
    title: "6. Automated Monthly Rental Payouts",
    subtitle: "Escrow distributions credited directly to your demo wallet",
    caption: "Collect net rental yields after management fees and maintenance reserves, with downloadable accounting statements.",
    visualTag: "Dividend Payout",
    statBadge: "$61.22 Credited This Month",
    highlightColor: "#15803D",
    screenType: "dividend",
  },
  {
    id: 7,
    title: "7. 24/7 Guidance with StateEra AI",
    subtitle: "Risk analyst & navigation assistant on every page",
    caption: "Ask StateEra AI to review lease contracts, identify vacancy risks, or compare two property investments anywhere on the platform.",
    visualTag: "StateEra AI Assistant",
    statBadge: "Property Analyst",
    highlightColor: "#3B0F18",
    screenType: "ai",
  },
];

export const StateEraInAction: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-[#FAF5F5] border border-[#EADCDD] px-3 py-1 rounded-full inline-block mb-3">
            Product Walkthrough
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A080C] tracking-tight">
            {BRAND_CONFIG.name} in Action
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5E4A4E]">
            See how fractional real estate investment works step-by-step.
          </p>
        </Reveal>

        {/* Video / Interactive Player Shell */}
        <Reveal variant="scale-in" delay={0.1}>
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EADCDD] shadow-sm">
            {/* Top Window Bar */}
            <div className="bg-[#FAF5F5] px-4 py-3 flex items-center justify-between text-[#1A080C] border-b border-[#EADCDD]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EADCDD] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EADCDD] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EADCDD] inline-block" />
                <span className="ml-2 text-xs font-mono text-[#8C7B7F] hidden sm:inline">
                  stateera.demo/walkthrough &bull; Step {activeStepIndex + 1} of {WALKTHROUGH_STEPS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn btn-secondary text-xs min-h-[32px] px-3 py-1 rounded-lg"
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
                  className="p-1.5 rounded-lg border border-[#EADCDD] text-[#5E4A4E] hover:text-[#1A080C] hover:bg-white transition-colors"
                  title="Restart Walkthrough"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Player Display Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Left: Interactive Simulated Screen Canvas */}
              <div className="lg:col-span-7 bg-[#FAF5F5] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#EADCDD]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    {/* Step Visual Preview Card */}
                    <div className="bg-white rounded-xl p-5 relative border border-[#EADCDD] shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-[#FAF5F5] mb-4">
                        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#FAF5F5] text-[#3B0F18] border border-[#EADCDD]">
                          {currentStep.visualTag}
                        </span>
                        <span className="badge badge-success text-xs font-bold">
                          {currentStep.statBadge}
                        </span>
                      </div>

                      {/* Step Specific Visual Graphic */}
                      {currentStep.screenType === "marketplace" && (
                        <div className="space-y-3">
                          <div className="h-44 rounded-lg overflow-hidden relative">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
                              alt="Marina Horizon Luxury Tower"
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover"
                              fallbackLabel="Marina Horizon Luxury Tower"
                            />
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-[#1A080C]">Marina Horizon Luxury Tower</span>
                            <span className="text-[#15803D] font-bold">9.4% Net Yield</span>
                          </div>
                        </div>
                      )}

                      {currentStep.screenType === "details" && (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] uppercase block">Independent Title Audit</span>
                              <strong className="text-[#15803D] font-bold mt-1 block">&check; 100% Freehold Verified</strong>
                            </div>
                            <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] uppercase block">Structural Inspection</span>
                              <strong className="text-[#15803D] font-bold mt-1 block">&check; Grade-A MEP Certified</strong>
                            </div>
                          </div>
                          <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg flex items-center justify-between">
                            <span className="text-[#5E4A4E]">Historical Escrow Payout Rate:</span>
                            <span className="font-bold text-[#1A080C]">100% On Time</span>
                          </div>
                        </div>
                      )}

                      {currentStep.screenType === "calculator" && (
                        <div className="space-y-3 text-xs">
                          <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[#5E4A4E]">Test Investment:</span>
                              <span className="font-bold text-base text-[#3B0F18]">$5,000 (50 shares)</span>
                            </div>
                            <div className="w-full bg-[#EADCDD] h-2 rounded-full overflow-hidden">
                              <div className="bg-[#3B0F18] h-full w-2/5 rounded-full" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="p-2.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] block">Monthly Rent Payout</span>
                              <strong className="text-sm font-bold text-[#15803D]">$39.17 / mo</strong>
                            </div>
                            <div className="p-2.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] block">Projected 1-Yr Profit</span>
                              <strong className="text-sm font-bold text-[#3B0F18]">$470.00</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep.screenType === "order" && (
                        <div className="space-y-3 text-xs">
                          <div className="p-3.5 bg-[#DCFCE7] border border-emerald-300 rounded-lg flex items-center gap-2.5 text-[#15803D]">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <div>
                              <div className="font-bold">Simulated Purchase Confirmed</div>
                              <div className="text-[11px] text-[#15803D]/80">50 Fractional Shares of Marina Horizon allocated</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">Order Ref: #ORD-9821</div>
                            <div className="p-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">Fee: $0.00 (Demo)</div>
                          </div>
                        </div>
                      )}

                      {currentStep.screenType === "portfolio" && (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] block">Total Portfolio Value</span>
                              <strong className="text-base font-bold text-[#1A080C]">$8,450.00</strong>
                            </div>
                            <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg">
                              <span className="text-[10px] text-[#8C7B7F] block">Monthly Rent Rate</span>
                              <strong className="text-base font-bold text-[#15803D]">$61.22 / mo</strong>
                            </div>
                          </div>
                          <div className="p-2.5 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg flex justify-between">
                            <span className="text-[#5E4A4E]">Active Holdings:</span>
                            <span className="font-bold text-[#1A080C]">3 Prime Buildings</span>
                          </div>
                        </div>
                      )}

                      {currentStep.screenType === "dividend" && (
                        <div className="space-y-3 text-xs">
                          <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Coins className="w-5 h-5 text-[#3B0F18]" />
                              <div>
                                <div className="font-bold text-[#1A080C]">October Rental Distribution</div>
                                <div className="text-[10px] text-[#8C7B7F]">Auto-credited to demo wallet</div>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-[#15803D]">+$61.22</span>
                          </div>
                          <div className="text-center text-[11px] text-[#8C7B7F]">Next estimated payout: November 1st, 2026</div>
                        </div>
                      )}

                      {currentStep.screenType === "ai" && (
                        <div className="space-y-2">
                          <div className="p-3 bg-[#3B0F18] text-white rounded-lg rounded-tr-none text-xs ml-auto max-w-[85%]">
                            &ldquo;Can you analyze the net yield and occupancy risk for Marina Horizon?&rdquo;
                          </div>
                          <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg rounded-tl-none text-xs text-[#1A080C] space-y-1">
                            <div className="flex items-center gap-1.5 text-[#3B0F18] font-bold">
                              <Bot className="w-3.5 h-3.5 text-[#3B0F18]" />
                              <span>StateEra AI:</span>
                            </div>
                            <p className="text-[11px] text-[#5E4A4E] leading-relaxed">
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
                  <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18]">
                    Guided Experience
                  </span>
                  <h3 className="text-2xl font-bold text-[#1A080C] leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#3B0F18]">
                    {currentStep.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed pt-1">
                    {currentStep.caption}
                  </p>
                </div>

                {/* Progress Stepper Pills */}
                <div className="pt-6 space-y-3">
                  <div className="w-full bg-[#FAF5F5] border border-[#EADCDD] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#3B0F18] h-full transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {WALKTHROUGH_STEPS.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => handleStepSelect(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeStepIndex
                            ? "bg-[#3B0F18]"
                            : idx < activeStepIndex
                            ? "bg-[#15803D]"
                            : "bg-[#EADCDD]"
                        }`}
                        title={s.title}
                      />
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      href="/explore"
                      className="btn btn-primary text-xs inline-flex items-center gap-1.5"
                    >
                      <span>Explore Properties</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleStepSelect((activeStepIndex + 1) % WALKTHROUGH_STEPS.length)}
                      className="text-xs font-semibold text-[#3B0F18] hover:underline flex items-center gap-1"
                    >
                      <span>Next Step</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
