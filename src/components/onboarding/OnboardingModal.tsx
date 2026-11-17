"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
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
      title: "Invest in Global Real Estate from $25",
      description: "StateEra simplifies property investing. Own legally segregated fractional shares in prime residential and commercial assets worldwide.",
      highlight: "No million-dollar down payments or mortgage debt required.",
    },
    {
      icon: Coins,
      badge: "Automated Income",
      title: "Earn Monthly Rental Yields",
      description: "Collect automated monthly rental income credited directly to your digital demo wallet. Real-time net yield calculations reflect actual tenant collections.",
      highlight: "Projected net yields range from 8% to 13% annual returns.",
    },
    {
      icon: ShieldCheck,
      badge: "Audited Due Diligence",
      title: "Independent Title Checks & Inspection Audits",
      description: "Every asset features verified land registry titles, structural engineering inspections, and continuous algorithmic valuations.",
      highlight: "Complete transparency with downloadable certificates.",
    },
    {
      icon: PieChart,
      badge: "Secondary Market Liquidity",
      title: "Trade Fractional Shares Seamlessly",
      description: "Enjoy flexible liquidity by trading shares on our simulated exchange with market and limit order execution.",
      highlight: "Test the platform risk-free with $25,000 in simulated demo cash.",
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8 relative overflow-hidden border border-[#EADCDD]"
        >
          {/* Skip / Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-[#8C7B7F] hover:text-[#1A080C] p-1.5 rounded-lg hover:bg-[#FAF5F5] transition-colors"
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
                  i === step ? "w-8 bg-[#3B0F18]" : i < step ? "w-3 bg-[#15803D]" : "w-3 bg-[#EADCDD]"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] text-[#3B0F18] flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#3B0F18]" />
            </div>

            <div>
              <span className="badge text-xs font-semibold">
                {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C] tracking-tight mt-2">
                {current.title}
              </h3>
              <p className="text-sm text-[#5E4A4E] leading-relaxed mt-2">
                {current.description}
              </p>
            </div>

            <div className="p-3 bg-[#FAF5F5] rounded-xl border border-[#EADCDD] text-xs font-semibold text-[#3B0F18]">
              {current.highlight}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-[#EADCDD] flex items-center justify-between">
            <button
              onClick={handleClose}
              className="text-xs font-semibold text-[#8C7B7F] hover:text-[#1A080C] transition-colors"
            >
              Skip Introduction
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="btn btn-primary text-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="btn btn-primary text-xs"
              >
                <Check className="w-4 h-4" />
                <span>Start Exploring StateEra</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
