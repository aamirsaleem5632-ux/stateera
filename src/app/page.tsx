"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Wallet,
  Coins,
  ChevronDown,
  CheckCircle2,
  Users,
  Compass,
  PieChart,
  Bot,
  Percent,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PropertyCard } from "@/components/property/PropertyCard";
import { StateEraInAction } from "@/components/landing/StateEraInAction";

export default function HomePage() {
  const { t, dir } = useLanguage();
  const { properties } = useDemo();

  // Investment Calculator Interactive State on Landing Page
  const [calcAmount, setCalcAmount] = useState<number>(2500);
  const sampleYield = 9.4; // 9.4% net yield
  const estMonthlyRent = (calcAmount * (sampleYield / 100)) / 12;
  const estAnnualRent = calcAmount * (sampleYield / 100);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is fractional real estate investment?",
      a: "Fractional real estate investment enables multiple investors to pool capital to purchase legal shares of prime commercial or residential properties. Rather than needing hundreds of thousands of dollars to purchase an entire building, you can purchase fractional shares starting at just $50-$200 and receive proportional monthly rental dividends and capital appreciation.",
    },
    {
      q: "How are rental income payouts distributed?",
      a: "Net rental income is collected from contracted residential or commercial tenants and deposited into a dedicated escrow account. On the 1st of each calendar month, operating expenses, maintenance reserves, and management fees are deducted, and the net distributable rent is automatically credited directly to each investor's digital wallet balance according to their share count.",
    },
    {
      q: "How does StateEra AI evaluate properties?",
      a: "StateEra AI continuously monitors over 40 quantitative data points—including regional rent comps, neighborhood absorption rates, GDP growth, municipal building permits, and historical occupancy. It calculates deterministic property valuations, risk metrics, and confidence scores so investors can make informed decisions.",
    },
    {
      q: "Can I sell my fractional shares if I need liquidity?",
      a: "Yes. StateEra features an integrated secondary share trading marketplace where verified investors can place Market or Limit orders to buy or sell fractional shares directly with other community members without waiting for property liquidation.",
    },
    {
      q: "Is this platform a real investment platform or a demonstration prototype?",
      a: "StateEra is currently configured as a functional demonstration prototype. All properties, financial calculations, rental payouts, wallet balances, and secondary trades operate in simulation mode with realistic fictional data to let you test and evaluate the entire product workflow without financial risk.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4FD] overflow-x-hidden" dir={dir}>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-[#F3EAFC] via-[#F8F4FD] to-white">
        {/* Soft Decorative Ambient Circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 max-w-[70vw] bg-[#E6D8F5]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 max-w-[70vw] bg-[#FCE7F3]/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6D8F5] shadow-sm text-xs font-bold text-[#5B3A8C]">
                <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1B4B] tracking-tight leading-[1.12]">
                Invest in Real Estate.{" "}
                <span className="text-[#7C4DFF] block">Own a Fraction.</span>{" "}
                Earn Rental Income.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#585375] max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/explore"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl-flip transition-transform" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#F3EAFC] text-[#5B3A8C] border border-[#E6D8F5] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
                  <span>{t.hero.demoBtn}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E6D8F5]/80 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#1E1B4B]">48.5K+</div>
                  <div className="text-xs text-[#8782A3] mt-0.5">Active Investors</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#7C4DFF]">$182M+</div>
                  <div className="text-xs text-[#8782A3] mt-0.5">Assets Funded</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">9.4%</div>
                  <div className="text-xs text-[#8782A3] mt-0.5">Avg Net Yield</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#5B3A8C]">100%</div>
                  <div className="text-xs text-[#8782A3] mt-0.5">Escrow Audited</div>
                </div>
              </div>
            </div>

            {/* Right Architectural Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Architectural Image Card */}
                <div className="rounded-3xl overflow-hidden border-2 border-white shadow-2xl relative aspect-[4/5] bg-[#E6D8F5]">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80"
                    alt="Manhattan Luxury Glass Tower"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/80 via-transparent to-black/20" />

                  {/* Floating Metric Badge 1 (Top Left) */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8782A3]">Monthly Dividend</span>
                    <div className="text-lg font-black text-emerald-600 flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>$78,400 / mo</span>
                    </div>
                  </div>

                  {/* Floating Metric Badge 2 (Bottom Right) */}
                  <div className="absolute bottom-5 right-5 left-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E1B4B] mb-1">
                      <span>One Madison Penthouse Suites</span>
                      <span className="text-[#7C4DFF]">$125 / share</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#585375]">
                      <span>New York • 8.2% Net Yield</span>
                      <span className="text-emerald-700 bg-mint px-2 py-0.5 rounded-md font-semibold">100% Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Pill Underneath */}
                <div className="absolute -bottom-4 -left-4 bg-[#7C4DFF] text-white px-4 py-2 rounded-2xl shadow-lg text-xs font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-mint" />
                  <span>Freehold Title Deed Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEERA IN ACTION: Dedicated Short Video / Animated Walkthrough Section */}
      <StateEraInAction />

      {/* Section: Featured Investment Properties */}
      <section className="py-20 bg-white border-t border-[#E6D8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EAFC] text-[#5B3A8C] text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#7C4DFF]" />
                <span>Prime Real Estate Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
                Featured Global Properties
              </h2>
              <p className="text-sm sm:text-base text-[#585375] mt-1">
                Curated international assets with audited title deeds and proven rental yields.
              </p>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] font-bold text-xs transition-colors self-start md:self-auto"
            >
              <span>View All 120+ Properties</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
            </Link>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property, idx) => (
              <PropertyCard key={property.id} property={property} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Section: How Fractional Ownership Works */}
      <section className="py-20 bg-[#F8F4FD] border-t border-[#E6D8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF] bg-[#F3EAFC] px-3 py-1 rounded-full">
              Seamless 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight mt-3">
              How Fractional Ownership Works
            </h2>
            <p className="text-base text-[#585375] mt-2">
              Investing in prime real estate is as simple as purchasing equities, but backed by physical brick-and-mortar assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Browse & Inspect",
                desc: "Explore institutional properties worldwide with transparent AI valuations, tenancy history, and verified land registry records.",
                icon: Compass,
              },
              {
                step: "02",
                title: "Choose Shares",
                desc: "Select the exact number of fractional shares you want to acquire, starting from as little as $50 using your demo wallet balance.",
                icon: PieChart,
              },
              {
                step: "03",
                title: "Collect Rental Income",
                desc: "Receive automated monthly rental dividends credited directly into your wallet on the 1st of every calendar month.",
                icon: Coins,
              },
              {
                step: "04",
                title: "Secondary Liquidity",
                desc: "Hold for long-term capital appreciation or sell your fractional shares anytime on the secondary share exchange.",
                icon: TrendingUp,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white rounded-2xl p-6 border border-[#E6D8F5] shadow-subtle hover:shadow-card transition-all relative group"
                >
                  <div className="text-3xl font-black text-[#E6D8F5] group-hover:text-[#7C4DFF] transition-colors mb-4">
                    {s.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F3EAFC] text-[#7C4DFF] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#1E1B4B] mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-[#585375] leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Interactive Investment Returns Calculator */}
      <section className="py-20 bg-white border-t border-[#E6D8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F3EAFC] via-white to-[#FCE7F3] rounded-3xl border border-[#E6D8F5] p-8 sm:p-12 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C4DFF] bg-white px-3 py-1 rounded-full border border-[#E6D8F5]">
                  Live Calculation Engine
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
                  Calculate Your Illustrative Rental Yield
                </h2>
                <p className="text-sm sm:text-base text-[#585375] leading-relaxed">
                  Adjust the investment slider below to preview projected monthly cash distributions and annual returns based on our platform average <strong>9.4% net yield</strong>.
                </p>

                {/* Slider Input */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold text-[#8782A3]">Simulated Investment Amount</label>
                    <span className="text-2xl font-black text-[#7C4DFF]">${calcAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="50000"
                    step="100"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    aria-label="Simulated Investment Amount"
                    className="w-full h-2.5 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
                  />
                  <div className="flex justify-between text-[11px] text-[#8782A3]">
                    <span>$100 Min</span>
                    <span>$10,000</span>
                    <span>$25,000</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </div>

              {/* Calculator Output Cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#E6D8F5] shadow-sm text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8782A3]">Est. Monthly Payout</span>
                  <div className="text-3xl font-black text-emerald-600 mt-2">
                    ${estMonthlyRent.toFixed(2)}
                  </div>
                  <p className="text-xs text-[#585375] mt-1">Paid directly to your demo wallet</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E6D8F5] shadow-sm text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8782A3]">Est. Annual Income</span>
                  <div className="text-3xl font-black text-[#7C4DFF] mt-2">
                    ${estAnnualRent.toFixed(2)}
                  </div>
                  <p className="text-xs text-[#585375] mt-1">Net yield of 9.4% per annum</p>
                </div>

                <div className="sm:col-span-2 bg-[#1E1B4B] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-mint font-semibold">Ready to test with your $25,000 balance?</span>
                    <div className="text-sm font-bold text-white">Purchase shares of curated properties instantly</div>
                  </div>
                  <Link
                    href="/explore"
                    className="px-5 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs whitespace-nowrap shadow-md transition-all"
                  >
                    Invest Now in Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: AI-Powered Insights Preview */}
      <section className="py-20 bg-[#F8F4FD] border-t border-[#E6D8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C]">
                <Bot className="w-4 h-4 text-[#7C4DFF]" />
                <span>Autonomous Asset Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
                Meet {BRAND_CONFIG.aiAgentName}
              </h2>
              <p className="text-base text-[#585375] leading-relaxed">
                Persistent across every page, StateEra AI evaluates gross vs net rental yields, analyzes tenant covenants, inspects structural audit reports, and identifies vacancy risks in real time.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Deterministic rental return & share calculations",
                  "Bureau Veritas engineering & structural audit summaries",
                  "Land registry and freehold title deed verification checks",
                  "Multi-language support with native Urdu, Arabic RTL & Spanish",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#1E1B4B]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-[#E6D8F5] shadow-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7C4DFF] text-white flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1E1B4B]">{BRAND_CONFIG.aiAgentName}</h4>
                      <span className="text-[11px] text-emerald-600 font-semibold">Risk & Valuation Copilot</span>
                    </div>
                  </div>
                  <span className="text-xs bg-mint text-emerald-900 font-bold px-2.5 py-1 rounded-full">
                    Active on all pages
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#F8F4FD] rounded-xl text-[#585375] border border-[#E6D8F5]">
                    "StateEra AI, how does the 9.4% net yield for Marina Horizon compare to the Dubai Marina district average?"
                  </div>
                  <div className="p-3.5 bg-[#F3EAFC]/80 rounded-xl text-[#1E1B4B] border border-[#E6D8F5] leading-relaxed">
                    <strong>Analysis:</strong> Marina Horizon outperforms the 7.8% district average by +160 bps due to 100% corporate master-leased tenancies and low operating expense ratios (7.5%). Freehold title DLD deed verified.
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/explore"
                    className="w-full py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs text-center block transition-colors"
                  >
                    Open StateEra AI in Marketplace
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-white border-t border-[#E6D8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF] bg-[#F3EAFC] px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight mt-3">
              Everything You Need to Know
            </h2>
            <p className="text-sm sm:text-base text-[#585375] mt-1">
              Clear answers on fractional property ownership, rental payouts, and our demo prototype.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6D8F5] overflow-hidden bg-white transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-[#1E1B4B] font-bold text-sm sm:text-base hover:text-[#7C4DFF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7C4DFF] transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#585375] leading-relaxed border-t border-[#F3EAFC] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Final Call-To-Action Banner */}
      <section className="py-20 bg-gradient-to-r from-[#5B3A8C] via-[#7C4DFF] to-[#5B3A8C] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span>Ready to Begin?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Start Your Fractional Real Estate Portfolio Today
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Test the entire platform risk-free with $25,000 in demo funds. Explore prime properties, buy shares, collect rental payouts, and consult StateEra AI.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#5B3A8C] font-black text-sm hover:bg-[#F3EAFC] shadow-xl transition-all"
            >
              Explore Properties
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E1B4B] text-white font-black text-sm hover:bg-[#332D56] border border-white/20 shadow-xl transition-all"
            >
              Open Investor Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
