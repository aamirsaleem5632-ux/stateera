"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Coins,
  ArrowRight,
  TrendingUp,
  FileCheck,
  PieChart,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";
import { BRAND_CONFIG } from "@/config/brand";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Vetted Asset Acquisition & Due Diligence",
      desc: "StateEra's investment committee and independent real estate surveyors inspect Grade-A commercial and luxury residential properties. Each property undergoes rigorous legal title verification, structural audits, and tenancy escrow confirmation before any tokenized fractional shares are offered.",
      icon: FileCheck,
      details: ["Freehold legal title verification", "Independent structural engineering audit", "Historical tenant rental cash flow audit", "Allianz replacement insurance certification"],
    },
    {
      num: "02",
      title: "Fractional Share Allocation from $25",
      desc: "Rather than requiring hundreds of thousands of dollars, the property's total valuation is divided into affordable fractional shares. Investors can acquire from 1 share upwards, building a globally diversified real estate portfolio with zero mortgage debt or bank underwriting.",
      icon: Coins,
      details: ["Equal legal ownership rights per share", "Instant ledger recording", "Accessible starting participation thresholds", "No lock-in or personal liability covenants"],
    },
    {
      num: "03",
      title: "Professional On-Ground Management",
      desc: "Licensed property managers (e.g. CBRE, Savills, Asteco) handle all day-to-day operations: tenant leasing, regular inspections, maintenance dispatch, and utility payments. Investors never have to deal with 2 AM plumbing emergencies or tenant lease agreements.",
      icon: Building2,
      details: ["Vetted corporate and executive tenants", "Annual scheduled maintenance reserves", "Routine photo-documented inspections", "Transparent operating expense tracking"],
    },
    {
      num: "04",
      title: "Automated Monthly Rental Payouts",
      desc: "Tenants pay rent each month into a secured escrow account. After deducting property expenses (taxes, insurance, management fees), 100% of the net rental yield is distributed directly into share-owners' wallets on the 1st of every month.",
      icon: TrendingUp,
      details: ["Net yields distributed automatically", "Direct wallet credit or re-investment", "Detailed downloadable monthly accounting statements", "Foreign exchange protection across global currencies"],
    },
    {
      num: "05",
      title: "Flexible Secondary Liquidity & Resale",
      desc: "Investors can list their fractional shares on StateEra's secondary marketplace to other verified community members whenever they wish to liquidate, subject to applicable regulatory settlement windows.",
      icon: PieChart,
      details: ["Peer-to-peer secondary trading", "Market and limit order matching", "Real-time AI property valuation benchmarks", "Transparent secondary market fee structure"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Transparent PropTech Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          How StateEra Works
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          From independent institutional due diligence to monthly rental income delivered directly into your wallet. Discover our step-by-step ownership pathway.
        </p>
      </div>

      {/* 5-Step Process Timeline */}
      <RevealGroup className="space-y-8" stagger={0.12} variant="fade-up">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                  {step.num}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C] flex items-center gap-2">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-sm text-[#5E4A4E] leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-80 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl p-4 shrink-0 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7B7F] block">
                  Key Verification Standards
                </span>
                <ul className="space-y-1.5 text-xs text-[#1A080C]">
                  {step.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </RevealGroup>

      {/* Comparison Grid: Traditional Real Estate vs StateEra */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A080C]">
            Traditional Real Estate vs StateEra
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4A4E]">
            How fractional ownership dismantles traditional barriers to entry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 space-y-4">
            <h4 className="text-base font-bold text-red-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              Traditional Property Investing
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5E4A4E]">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>Requires \$50,000–\$200,000 upfront cash down payments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>25-year personal bank mortgages with interest rate risk.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>Months of tedious legal paperwork, agent commissions, and title searches.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>Illiquid: takes 3–9 months to sell an entire building.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>Hands-on landlord stress: handling tenant repairs, vacancies, and late rents.</span>
              </li>
            </ul>
          </div>

          {/* StateEra */}
          <div className="bg-white border-2 border-[#3B0F18] rounded-2xl p-6 space-y-4 shadow-sm">
            <h4 className="text-base font-bold text-[#3B0F18] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B0F18]" />
              StateEra Fractional Platform
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#1A080C]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Start from as low as \$25–\$100 per share with zero debt.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Build a portfolio across 19+ countries in under 5 minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Digital Property Passport with pre-vetted legal due diligence.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Secondary marketplace liquidity whenever you decide to exit.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% passive: licensed tier-1 property managers oversee tenant operations.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-2xl font-bold text-[#1A080C]">
          Ready to inspect global property opportunities?
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore" className="btn btn-primary text-sm font-bold flex items-center gap-2">
            <span>Explore Properties Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/simulator" className="btn btn-secondary text-sm font-semibold">
            Test Scenario Rent Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
