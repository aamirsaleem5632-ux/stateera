"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Sparkles,
  PieChart,
  ShieldCheck,
  Coins,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const OnboardingModal: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    try {
      const seen = localStorage.getItem("stateera_onboarding_completed");
      if (!seen) {
        setIsOpen(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("stateera_onboarding_completed", "true");
    } catch {
      // Ignore
    }
  };

  const steps = [
    {
      icon: Building2,
      badge: "Welcome to " + BRAND_CONFIG.name,
      title: "Invest in Global Real Estate from $50",
      description: "StateEra transforms institutional property investing. Own legally segregated fractional shares in prime residential and commercial assets worldwide.",
      highlight: "No million-dollar down payments or mortgages required.",
    },
    {
      icon: Coins,
      badge: "Automated Income",
      title: "Earn Monthly Rental Yields",
      description: "Collect automated monthly rental income credited directly to your digital demo wallet. Real-time net yield calculations reflect actual tenant collections.",
      highlight: "Estimated yields range from 7.5% to 11.8% annual net returns.",
    },
    {
      icon: ShieldCheck,
      badge: "Institutional Due Diligence",
      title: "Audited Legal Documents & AI Valuation",
      description: "Every asset features verified land registry titles, Bureau Veritas engineering inspections, and continuous AI algorithmic valuations.",
      highlight: "Complete transparency with downloadable legal registries.",
    },
    {
      icon: PieChart,
      badge: "Secondary Market Liquidity",
      title: "Trade Fractional Shares Seamlessly",
      description: "Enjoy flexible liquidity by trading shares on our simulated exchange with market and limit order execution.",
      highlight: "Start exploring the full interactive platform now with $25,000 demo cash.",
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B4B]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl border border-[#E6D8F5] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Skip / Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-[#8782A3] hover:text-[#1E1B4B] p-1 rounded-full hover:bg-[#F3EAFC] transition-colors"
            aria-label="Skip Onboarding"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-[#7C4DFF]" : i < step ? "w-3 bg-mint" : "w-3 bg-[#E6D8F5]"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F3EAFC] border border-[#E6D8F5] text-[#7C4DFF] flex items-center justify-center shadow-sm">
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C4DFF] bg-[#F3EAFC] px-2.5 py-1 rounded-full">
                {current.badge}
              </span>
              <h3 className="text-2xl font-black text-[#1E1B4B] tracking-tight mt-2.5">
                {current.title}
              </h3>
              <p className="text-sm text-[#585375] leading-relaxed mt-2">
                {current.description}
              </p>
            </div>

            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5] text-xs font-semibold text-[#5B3A8C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7C4DFF] flex-shrink-0" />
              <span>{current.highlight}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-[#E6D8F5] flex items-center justify-between">
            <button
              onClick={handleClose}
              className="text-xs font-bold text-[#8782A3] hover:text-[#5B3A8C] transition-colors"
            >
              Skip Introduction
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#5B3A8C] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Check className="w-4 h-4 text-mint" />
                <span>Start Exploring StateEra</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
