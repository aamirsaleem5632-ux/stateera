"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronDown,
  Compass,
  PieChart,
  Coins,
  Bot,
  CheckCircle2,
  Lock,
  Layers,
  KeyRound,
  Shield,
  UserCheck,
  Info,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PropertyCard } from "@/components/property/PropertyCard";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { StateEraInAction } from "@/components/landing/StateEraInAction";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASING = [0.22, 1, 0.36, 1] as const;

// Stat count-up component with honest prototype values
interface StatItemProps {
  value: number | string;
  isNumeric?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  isNumeric = true,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}) => {
  const { ref, formatted } = useCountUp({
    end: typeof value === "number" ? value : 0,
    prefix,
    suffix,
    decimals,
    duration: 1.8,
  });

  return (
    <div className="space-y-1">
      <div
        ref={isNumeric ? (ref as React.RefObject<HTMLDivElement>) : undefined}
        className="text-2xl sm:text-3xl font-extrabold text-[#1A080C] tracking-tight"
      >
        {isNumeric ? formatted : value}
      </div>
      <div className="text-xs text-[#5E4A4E]">{label}</div>
    </div>
  );
};

export default function HomePage() {
  const { t, dir } = useLanguage();
  const { properties } = useDemo();
  const reducedMotion = useReducedMotion();

  // Investment Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(2500);
  const sampleYield = 9.4;
  const estMonthlyRent = (calcAmount * (sampleYield / 100)) / 12;
  const estAnnualRent = calcAmount * (sampleYield / 100);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 500], reducedMotion ? [0, 0] : [0, 16]);

  const faqs = [
    {
      q: "What is fractional real estate investment?",
      a: "Instead of needing hundreds of thousands of dollars to buy an entire building, a property is divided into small shares starting from just $25–$100. You own that share and collect your proportional share of tenant rent every month.",
    },
    {
      q: "How are rental income payouts distributed?",
      a: "Tenants pay rent each month. Property running costs (maintenance, insurance, management fee) are deducted first. The remaining net profit is distributed directly into your wallet on the 1st of every month.",
    },
    {
      q: "How does StateEra AI evaluate properties?",
      a: "StateEra AI analyzes historical neighborhood lease rates, building inspection audits, and local occupancy demand to compute a clear valuation confidence score and risk profile.",
    },
    {
      q: "Can I sell my fractional shares if I want to cash out?",
      a: "Yes. You can place your shares on the secondary trading market anytime, choose your asking price, and receive funds when matched with another investor.",
    },
    {
      q: "Is this platform a real investment platform or a demonstration prototype?",
      a: "StateEra is a practice demonstration platform. All properties, rental payouts, wallet balances, and share orders use practice money with realistic numbers so you can safely learn modern fractional investing without financial risk.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white" dir={dir}>
      {/* Hero Section — clean, left-aligned, generous whitespace */}
      <section
        ref={heroRef}
        className="pt-12 pb-16 md:pt-20 md:pb-28 bg-white border-b border-[#EADCDD]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Content */}
            <motion.div
              className="lg:col-span-7 space-y-6 text-left"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING }}
            >
              {/* Main Headline — solid dark text, key phrase in maroon */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A080C] tracking-tight leading-[1.12]">
                Invest in real estate.{" "}
                <span className="text-[#3B0F18] block sm:inline">Own a fraction.</span>{" "}
                Collect monthly rent.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#5E4A4E] max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons — plain text, no sparkles, clean 10px radius */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/explore"
                  className="btn btn-primary text-sm inline-flex items-center justify-center gap-2"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 rtl-flip" />
                </Link>

                <Link
                  href="/dashboard"
                  className="btn btn-secondary text-sm inline-flex items-center justify-center"
                >
                  <span>{t.hero.demoBtn}</span>
                </Link>
              </div>

              {/* Honest Demo Stats Row */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#EADCDD]">
                <StatItem value={properties.length || 18} suffix=" Assets" label="Curated Demo Properties" />
                <StatItem value={5} suffix=" Cities" label="Major Markets" />
                <StatItem value={9.4} suffix="%" decimals={1} label="Avg Simulated Net Yield" />
                <StatItem value="Practice Mode" isNumeric={false} label="Simulated Funds Only" />
              </div>
            </motion.div>

            {/* Right Architectural Visual — clean photo with simple rounded corners, NO floating badges */}
            <motion.div
              className="lg:col-span-5"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASING }}
            >
              <motion.div
                style={{ y: heroImageY }}
                className="rounded-2xl overflow-hidden border border-[#EADCDD] shadow-sm relative aspect-[4/5] bg-[#FAF5F5]"
              >
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80"
                  alt="Manhattan Luxury Glass Tower"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  fallbackLabel="Manhattan Luxury Glass Tower"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATEERA IN ACTION: Interactive Walkthrough Section */}
      <StateEraInAction />

      {/* Section: Four Isolated Roles Ecosystem */}
      <section id="roles" className="py-20 bg-white border-t border-[#EADCDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-[#FAF5F5] border border-[#EADCDD] px-3 py-1 rounded-full inline-block">
              Role-Based Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight">
              Four Roles. Complete Separation.
            </h2>
            <p className="text-base text-[#5E4A4E] leading-relaxed">
              StateEra operates with four strictly isolated participant roles, enforcing server-side authorization and least-privilege security across every operation.
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Investor — Highlighted Default Selection */}
            <div className="rounded-2xl p-6 bg-white border-2 border-[#3B0F18] shadow-md relative flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#3B0F18] text-white flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="badge badge-success text-[10px] font-bold uppercase tracking-wider">
                    Highlighted Default
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A080C]">Investor</h3>
                  <p className="text-xs font-semibold text-[#3B0F18] mt-0.5">
                    Explore properties, buy shares and collect rent.
                  </p>
                </div>
                <p className="text-xs text-[#5E4A4E] leading-relaxed">
                  Open public registration. Build an institutional portfolio, purchase fractional shares, and collect traceable monthly rent distributions into an isolated wallet.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EADCDD]">
                <Link
                  href="/login?role=investor"
                  className="btn btn-primary w-full text-xs py-2 inline-flex items-center justify-center gap-1.5"
                >
                  <span>Enter as Investor</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>

            {/* 2. Property Manager */}
            <div className="rounded-2xl p-6 bg-[#FAF5F5] border border-[#EADCDD] shadow-sm relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EADCDD] text-[#3B0F18] flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#3B0F18]" />
                  </div>
                  <span className="badge badge-warning text-[10px] font-bold uppercase tracking-wider">
                    Restricted
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A080C]">Property Manager</h3>
                  <p className="text-xs font-semibold text-[#5E4A4E] mt-0.5">
                    Manage properties, rent and work orders.
                  </p>
                </div>
                <p className="text-xs text-[#5E4A4E] leading-relaxed">
                  Restricted operational portal. Oversee assigned building operations, record verified rent collections, and dispatch vendor maintenance work orders.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EADCDD]">
                <Link
                  href="/login?role=manager"
                  className="btn btn-secondary w-full text-xs py-2 inline-flex items-center justify-center gap-1.5"
                >
                  <span>Manager Access</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>

            {/* 3. Tenant */}
            <div className="rounded-2xl p-6 bg-[#FAF5F5] border border-[#EADCDD] shadow-sm relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EADCDD] text-[#3B0F18] flex items-center justify-center">
                    <KeyRound className="w-5 h-5 text-[#3B0F18]" />
                  </div>
                  <span className="badge badge-warning text-[10px] font-bold uppercase tracking-wider">
                    Restricted
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A080C]">Tenant</h3>
                  <p className="text-xs font-semibold text-[#5E4A4E] mt-0.5">
                    View lease, pay rent and submit maintenance requests.
                  </p>
                </div>
                <p className="text-xs text-[#5E4A4E] leading-relaxed">
                  Leaseholder-only resident portal. View active lease terms, complete monthly rental payments, and log unit repair requests with building management.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EADCDD]">
                <Link
                  href="/login?role=tenant"
                  className="btn btn-secondary w-full text-xs py-2 inline-flex items-center justify-center gap-1.5"
                >
                  <span>Tenant Access</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>

            {/* 4. Platform Admin */}
            <div className="rounded-2xl p-6 bg-[#FAF5F5] border border-[#EADCDD] shadow-sm relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EADCDD] text-[#3B0F18] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#3B0F18]" />
                  </div>
                  <span className="badge badge-demo text-[10px] font-bold uppercase tracking-wider">
                    Max Security
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A080C]">Platform Admin</h3>
                  <p className="text-xs font-semibold text-[#5E4A4E] mt-0.5">
                    Platform statistics, KYC and approvals.
                  </p>
                </div>
                <p className="text-xs text-[#5E4A4E] leading-relaxed">
                  Maximum security administrative governance. Review platform-wide statistics, audit KYC compliance, approve manager clearances, and configure assets.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EADCDD]">
                <Link
                  href="/login?role=admin"
                  className="btn btn-secondary w-full text-xs py-2 inline-flex items-center justify-center gap-1.5"
                >
                  <span>Admin Clearance</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mandatory Security Disclaimer Notice */}
          <div className="mt-8 p-4 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5E4A4E]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3B0F18] shrink-0" />
              <span>
                <strong className="text-[#1A080C]">Security Architecture Notice:</strong> The selected role is NOT proof of authorization. A user must never obtain a role simply by clicking its card. Non-investor access requires cryptographic invitation verification or server-side clearance.
              </span>
            </div>
            <Link
              href="/login"
              className="text-xs font-bold text-[#3B0F18] hover:underline whitespace-nowrap"
            >
              Learn about authorization →
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Featured Investment Properties */}
      <section className="py-20 bg-[#FAF5F5] border-t border-[#EADCDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <Reveal variant="fade-up">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-white border border-[#EADCDD] px-2.5 py-1 rounded-md inline-block mb-2">
                  Institutional Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight">
                  Featured Properties
                </h2>
                <p className="text-sm sm:text-base text-[#5E4A4E] mt-1">
                  Institutional assets with verified title deeds and audited cash flows.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.1}>
              <Link
                href="/explore"
                className="btn btn-secondary text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </Link>
            </Reveal>
          </div>

          {/* Property Cards Grid — staggered */}
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {properties.slice(0, 3).map((property, idx) => (
              <PropertyCard key={property.id} property={property} featured={idx === 0} priority={idx === 0} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Section: How Fractional Ownership Works */}
      <section id="how-it-works" className="py-20 bg-white border-t border-[#EADCDD] scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-[#FAF5F5] border border-[#EADCDD] px-3 py-1 rounded-full inline-block">
              4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight mt-3">
              How Buying Shares Works
            </h2>
            <p className="text-base text-[#5E4A4E] mt-2">
              Buy fractional shares of institutional real estate and receive rent payouts directly into your wallet.
            </p>
          </Reveal>

          {/* Steps — staggered with connecting line */}
          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              style={{ transformOrigin: dir === "rtl" ? "right" : "left" }}
              className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-[#EADCDD]"
            />

            <RevealGroup
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
              stagger={0.08}
              variant="fade-up"
            >
              {[
                {
                  step: "01",
                  title: "Browse & Inspect",
                  desc: "Explore buildings with independent title audits, tenant histories, and structural inspection reports.",
                  icon: Compass,
                },
                {
                  step: "02",
                  title: "Pick Your Shares",
                  desc: "Choose the number of fractional shares to purchase, starting from $25 to $100 per share.",
                  icon: PieChart,
                },
                {
                  step: "03",
                  title: "Collect Monthly Rent",
                  desc: "Tenant rental yields are credited automatically to your wallet on the 1st of every month.",
                  icon: Coins,
                },
                {
                  step: "04",
                  title: "Trade Anytime",
                  desc: "Hold shares for passive income or place them on the secondary trading market whenever you want.",
                  icon: TrendingUp,
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.step}
                    className="bg-white rounded-xl p-6 border border-[#EADCDD] shadow-sm relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#8C7B7F]">
                        STEP {s.step}
                      </span>
                      <Icon className="w-5 h-5 text-[#3B0F18]" />
                    </div>
                    <h3 className="font-bold text-base text-[#1A080C]">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Section: Interactive Investment Returns Calculator */}
      <section className="py-20 bg-[#FAF5F5] border-t border-[#EADCDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="scale-in">
            <div className="bg-white rounded-2xl border border-[#EADCDD] p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="badge badge-demo text-xs font-bold uppercase tracking-wider">
                    Interactive Calculator
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight">
                    Estimate Your Rental Yield
                  </h2>
                  <p className="text-sm sm:text-base text-[#5E4A4E] leading-relaxed">
                    Adjust the slider to simulate monthly rent distributions based on the platform average <strong>9.4% net annual yield</strong>.
                  </p>

                  {/* Slider Input */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-bold text-[#8C7B7F]">Simulated Investment</label>
                      <span className="text-2xl font-black text-[#3B0F18]">${calcAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="50000"
                      step="100"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      aria-label="How much you want to invest"
                      className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[#3B0F18]"
                    />
                    <div className="flex justify-between text-[11px] text-[#8C7B7F]">
                      <span>$100 Min</span>
                      <span>$10,000</span>
                      <span>$25,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                </div>

                {/* Calculator Output Cards */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF5F5] p-6 rounded-xl border border-[#EADCDD] text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C7B7F]">Estimated Monthly Rent</span>
                    <div className="text-3xl font-black text-[#15803D] mt-2">
                      ${estMonthlyRent.toFixed(2)}
                    </div>
                    <p className="text-xs text-[#5E4A4E] mt-1">Paid on the 1st of every month</p>
                  </div>

                  <div className="bg-[#FAF5F5] p-6 rounded-xl border border-[#EADCDD] text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C7B7F]">Estimated Annual Rent</span>
                    <div className="text-3xl font-black text-[#3B0F18] mt-2">
                      ${estAnnualRent.toFixed(2)}
                    </div>
                    <p className="text-xs text-[#5E4A4E] mt-1">Based on 9.4% net yield</p>
                  </div>

                  <div className="sm:col-span-2 bg-[#FAF5F5] border border-[#EADCDD] p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#3B0F18] font-bold block">Test with $25,000 practice funds</span>
                      <div className="text-xs text-[#5E4A4E]">Simulate purchasing shares and receiving demo distributions.</div>
                    </div>
                    <Link
                      href="/explore"
                      className="btn btn-primary text-xs whitespace-nowrap"
                    >
                      Explore Properties
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section: AI-Powered Insights Preview */}
      <section className="py-20 bg-white border-t border-[#EADCDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal variant="fade-right" delay={0} className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-[#FAF5F5] border border-[#EADCDD] px-2.5 py-1 rounded-md inline-block">
                Assistant
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight">
                Meet {BRAND_CONFIG.aiAgentName}
              </h2>
              <p className="text-base text-[#5E4A4E] leading-relaxed">
                Available across the platform, StateEra AI answers your real-estate questions, explains due diligence certificates, and evaluates potential property returns.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Calculates monthly net rent distributions and share prices",
                  "Summarizes title deeds, structural audits, and tenant leases",
                  "Identifies historical occupancy momentum and reserve allocations",
                  "Available in 6 languages including Urdu, Arabic, Spanish, and English",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#1A080C]">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.1} className="lg:col-span-6">
              <div className="bg-[#FAF5F5] rounded-2xl border border-[#EADCDD] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#3B0F18] text-white flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1A080C]">{BRAND_CONFIG.aiAgentName}</h4>
                      <span className="text-[11px] text-[#5E4A4E]">Property Assistant</span>
                    </div>
                  </div>
                  <span className="badge badge-success text-xs font-semibold">
                    Interactive
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white border border-[#EADCDD] rounded-lg text-[#5E4A4E]">
                    &ldquo;How does the 9.4% net yield for Marina Horizon compare to surrounding assets?&rdquo;
                  </div>
                  <div className="p-3.5 bg-white border border-[#EADCDD] rounded-lg text-[#1A080C] leading-relaxed">
                    <strong className="text-[#3B0F18] block mb-1">Analysis:</strong>
                    Marina Horizon yields approximately 1.6% above prime waterfront averages due to 98% corporate occupancy and low operating overhead (7.5%). All 4 due diligence audits are verified.
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/explore"
                    className="btn btn-secondary w-full text-xs text-center justify-center"
                  >
                    Ask StateEra AI in Explore
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section: Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-[#FAF5F5] border-t border-[#EADCDD] scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up" className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3B0F18] bg-white border border-[#EADCDD] px-3 py-1 rounded-full inline-block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#5E4A4E] mt-1">
              Clear answers on fractional real estate ownership and our simulation prototype.
            </p>
          </Reveal>

          <RevealGroup className="space-y-3" stagger={0.06} variant="fade-up">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#EADCDD] overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-[#1A080C] font-bold text-sm sm:text-base hover:text-[#3B0F18] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#3B0F18] transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5E4A4E] leading-relaxed border-t border-[#FAF5F5] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Section: Final Call-To-Action Banner */}
      <section className="py-20 bg-[#FAF5F5] border-t border-[#EADCDD]">
        <Reveal variant="scale-in" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A080C]">
            Ready to test fractional real estate investing?
          </h2>
          <p className="text-base sm:text-lg text-[#5E4A4E] max-w-xl mx-auto leading-relaxed">
            Practice risk-free with $25,000 in simulated demo funds. Explore prime buildings, acquire shares, and track monthly rent distributions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/explore"
              className="btn btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 rtl-flip" />
            </Link>
            <Link
              href="/dashboard"
              className="btn btn-secondary text-sm px-6 py-2.5"
            >
              Open Investor Dashboard
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
