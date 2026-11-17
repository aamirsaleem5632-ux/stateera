"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Coins,
  GraduationCap,
  Home,
  Users,
  Gift,
  HeartHandshake,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Calculator,
  Compass,
  PiggyBank,
  AlertCircle,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

export default function InvestmentSchemesPage() {
  const [savingsMonthly, setSavingsMonthly] = useState<number>(150);
  const [savingsMonths, setSavingsMonths] = useState<number>(12);
  const [activeTab, setActiveTab] = useState<string>("micro-saver");

  const totalSaved = savingsMonthly * savingsMonths;
  const estimatedShares = Math.floor(totalSaved / 65); // assuming average $65/share
  const estAnnualRentReturn = (totalSaved * 0.088).toFixed(0);

  const schemes = [
    {
      id: "micro-saver",
      icon: PiggyBank,
      title: "StateEra Micro-Saver",
      tagline: "Flexible recurring micro-contributions towards fractional equity",
      description: "Designed for individuals and early savers who cannot deploy lump sums. Set aside as little as $15–$50 per week into a dedicated savings reserve. When your target milestone is reached, funds can be allocated into pre-selected fractional shares with zero transaction fees.",
      features: [
        "Automated weekly or monthly micro-deposits",
        "Target property goal locking",
        "Zero account management or custody fees",
        "Full capital flexibility: pause or withdraw anytime without penalty",
      ],
      legalNote: "Saving contributions do not automatically create legal deed title until formal fractional allocation occurs.",
    },
    {
      id: "learn-to-own",
      icon: GraduationCap,
      title: "Learn-to-Own Academy",
      tagline: "Master real estate literacy before allocating your first dollar",
      description: "An inclusive educational pathway that rewards financial literacy. Complete interactive 5-minute modules on rental yield calculations, property maintenance audits, and market risk hedging to earn demo investment credits and fee discounts.",
      features: [
        "12 beginner-to-advanced visual learning modules",
        "Real-world stress-test simulations",
        "Earn up to $100 in practice credits and trading fee discounts",
        "Accredited completion certificate",
      ],
      legalNote: "Educational credits are valid for simulated prototype demonstrations and platform fee reductions.",
    },
    {
      id: "rent-to-equity",
      icon: Home,
      title: "Rent-to-Equity Program",
      tagline: "Transform monthly rental expenditures into tracked ownership equity",
      description: "Tenants residing in StateEra-managed properties can opt into the Rent-to-Equity track. Up to 10% of qualifying on-time monthly rent payments are credited as fractional ownership shares in their residential building or regional fund.",
      features: [
        "Rewards consistent on-time tenant rental payments",
        "Turns traditional dead rent into an asset-building ladder",
        "Annual equity statements and building voting representation",
        "Transferable equity credits upon lease completion",
      ],
      legalNote: "Subject to landlord agreement and regional tenant security deposit regulations.",
    },
    {
      id: "family-circle",
      icon: Users,
      title: "Family Property Circle",
      tagline: "Collaborative wealth generation across generations and borders",
      description: "Empowers families, siblings, and community collectives to pool fractional shares into a unified family governance portfolio. Track generational milestones, distribute rental dividends across family wallets, and nominate junior beneficiaries.",
      features: [
        "Shared family dashboard with multi-member visibility",
        "Automated dividend splitting to multiple family bank accounts",
        "Generational handover and inheritance planning tools",
        "Overseas family remitter co-funding features",
      ],
      legalNote: "Family circles operate under standard joint tenancy or tenant-in-common legal conventions.",
    },
    {
      id: "hardship-mode",
      icon: HeartHandshake,
      title: "Hardship & Grace Mode",
      tagline: "Support and fee freezes during unexpected financial distress",
      description: "If an investor or tenant experiences documented job loss, medical emergency, or economic hardship, StateEra provides flexible fee waivers, dividend liquidity assistance, and tenant grace periods without punitive enforcement.",
      features: [
        "Up to 90-day grace period on scheduled tenancy obligations",
        "Automated emergency dividend liquidation assistance",
        "Free consultation with our Human Expert guidance network",
        "Zero predatory late penalty fees",
      ],
      legalNote: "Assistance is subject to case review by StateEra's social impact and compliance committee.",
    },
    {
      id: "gift-ownership",
      icon: Gift,
      title: "Gift Ownership & Legacies",
      tagline: "Gift fractional property shares for weddings, graduations, and newborns",
      description: "Replace disposable presents with enduring income-generating real estate. Gift 1 or more shares in certified institutional properties with digital commemorative deed certificates delivered to the recipient.",
      features: [
        "Personalized digital commemorative deed certificate",
        "Custodial accounts for minor recipients under 18 years old",
        "Recipient automatically collects monthly rent payouts upon claiming",
        "Compliant gift deed documentation",
      ],
      legalNote: "Gift transactions are subject to local gift tax exemptions and recipient KYC verification.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Inclusive Ownership Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Affordable Ownership Schemes
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          StateEra was founded on the principle that property ownership should belong to everyone, not just institutional funds. Explore our inclusive ownership pathways.
        </p>
      </div>

      {/* Interactive Micro-Saver Calculator */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#3B0F18]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C]">
                Micro-Saver Growth Calculator
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5E4A4E]">
              See how small regular contributions can accumulate into meaningful real estate shares and passive monthly rent.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1A080C] mb-1.5">
                  <span>Monthly Contribution:</span>
                  <span className="text-[#3B0F18] font-bold text-sm">${savingsMonthly} / month</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="1000"
                  step="25"
                  value={savingsMonthly}
                  onChange={(e) => setSavingsMonthly(Number(e.target.value))}
                  className="w-full h-2 bg-white border border-[#EADCDD] rounded-lg appearance-none accent-[#3B0F18] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C7B7F] mt-1">
                  <span>$25/mo</span>
                  <span>$250/mo</span>
                  <span>$500/mo</span>
                  <span>$1,000/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1A080C] mb-1.5">
                  <span>Savings Timeline:</span>
                  <span className="text-[#3B0F18] font-bold text-sm">{savingsMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="6"
                  value={savingsMonths}
                  onChange={(e) => setSavingsMonths(Number(e.target.value))}
                  className="w-full h-2 bg-white border border-[#EADCDD] rounded-lg appearance-none accent-[#3B0F18] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C7B7F] mt-1">
                  <span>6 Mo</span>
                  <span>12 Mo (1 Year)</span>
                  <span>24 Mo (2 Years)</span>
                  <span>36 Mo (3 Years)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#EADCDD] rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
            <span className="text-xs font-bold text-[#8C7B7F] uppercase tracking-wider block">
              Simulated Ownership Milestone
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline border-b border-[#EADCDD] pb-2">
                <span className="text-xs text-[#5E4A4E]">Total Accumulated Savings:</span>
                <span className="text-2xl font-black text-[#1A080C]">${totalSaved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#EADCDD] pb-2">
                <span className="text-xs text-[#5E4A4E]">Purchasing Power:</span>
                <span className="text-base font-bold text-[#3B0F18]">~{estimatedShares} Fractional Shares</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#EADCDD] pb-2">
                <span className="text-xs text-[#5E4A4E]">Est. Annual Rent Return:</span>
                <span className="text-base font-bold text-emerald-700">+${estAnnualRentReturn} / year</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] text-[11px] text-[#5E4A4E] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#3B0F18] shrink-0 mt-0.5" />
              <span>
                Calculated at an illustrative 8.8% net average rental yield and $65 share price benchmark. Past performance does not guarantee future results.
              </span>
            </div>

            <Link href="/explore" className="btn btn-primary w-full text-xs font-bold flex items-center justify-center gap-2 py-2.5">
              <span>Find Properties for Micro-Saving</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08} variant="fade-up">
        {schemes.map((scheme) => {
          const Icon = scheme.icon;
          return (
            <div
              key={scheme.id}
              className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A080C]">{scheme.title}</h3>
                  <p className="text-xs font-semibold text-[#8C7B7F] mt-0.5">{scheme.tagline}</p>
                </div>
                <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
                  {scheme.description}
                </p>

                <div className="space-y-2 pt-1 border-t border-[#EADCDD]">
                  <span className="text-[11px] font-bold text-[#1A080C] uppercase tracking-wide block">
                    Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#5E4A4E]">
                    {scheme.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EADCDD] text-[10px] text-[#8C7B7F] flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#3B0F18] shrink-0 mt-0.5" />
                <span>{scheme.legalNote}</span>
              </div>
            </div>
          );
        })}
      </RevealGroup>

      {/* Strict Compliance Banner */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block">Important Regulatory & Legal Protection Notice:</strong>
          <p className="leading-relaxed">
            StateEra micro-saver deposits, savings goals, and family circle arrangements do not constitute guaranteed investment returns or immediate deed titling. Legal title is established proportionally upon the formal settlement of specific fractional shares. All transactions in practice mode are simulated.
          </p>
        </div>
      </div>
    </div>
  );
}
