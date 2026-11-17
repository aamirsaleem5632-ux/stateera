"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Globe,
  Award,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";
import { BRAND_CONFIG } from "@/config/brand";

export default function AboutPage() {
  const leadership = [
    {
      name: "Tariq Al-Mansoor",
      role: "Chief Executive Officer & Founder",
      bio: "Former Managing Director of Real Estate Investment Banking at Gulf Capital, with 18+ years overseeing $4.2B in commercial acquisitions across London, Dubai, and Singapore.",
      avatar: "TA",
    },
    {
      name: "Jonathan Sterling, CFA",
      role: "Chief Investment Officer",
      bio: "Veteran institutional asset manager previously with Blackstone Real Estate. Specializes in cross-border property due diligence and automated risk mitigation.",
      avatar: "JS",
    },
    {
      name: "Dr. Ayesha Rehman",
      role: "Head of AI & Quantitative Valuation",
      bio: "PhD in Machine Learning from MIT. Architect of StateEra's AI Property Detective and multi-factor neighborhood occupancy forecasting models.",
      avatar: "AR",
    },
    {
      name: "Marcella Fontaine",
      role: "Chief Legal & Regulatory Officer",
      bio: "Admitted to the New York & UK Bar. Former Senior Regulatory Counsel specializing in tokenized securities, REIT structuring, and cross-border investor protection.",
      avatar: "MF",
    },
  ];

  const partners = [
    { name: "Bureau Veritas", role: "Independent MEP & Structural Engineering Audits" },
    { name: "Deloitte Global", role: "Escrow Bank & Rental Reconciliation Audits" },
    { name: "Allianz Global", role: "Property Replacement & Loss of Rent Insurance" },
    { name: "CBRE & Savills", role: "Licensed Tier-1 On-Ground Facility & Asset Management" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Globe className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Global PropTech Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Democratizing Global Real Estate
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          StateEra was built to dismantle the financial and bureaucratic walls that have historically kept prime institutional real estate reserved for the ultra-wealthy.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A080C]">Institutional Rigor</h3>
          <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
            Every property listed on StateEra must clear our 4-tier due diligence protocol covering legal title, structural engineering, tax compliance, and escrow verification.
          </p>
        </div>

        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A080C]">Zero-Debt Fractionalization</h3>
          <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
            We reject predatory mortgage models. Properties on StateEra are funded with zero personal liability debt, eliminating the risk of bank foreclosure for our community.
          </p>
        </div>

        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A080C]">True Global Footprint</h3>
          <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
            With 100+ properties across 19+ countries—including the UK, UAE, Pakistan, USA, Germany, Saudi Arabia, and Singapore—investors can hedge currency risk effortlessly.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A080C]">
            Executive Leadership & Advisory
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4A4E]">
            Combining decades of institutional real estate investment, machine learning, and regulatory law.
          </p>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08} variant="fade-up">
          {leadership.map((leader) => (
            <div
              key={leader.name}
              className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center text-lg font-black shadow-sm">
                {leader.avatar}
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#1A080C]">{leader.name}</h4>
                <p className="text-xs font-semibold text-[#8C7B7F]">{leader.role}</p>
              </div>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </RevealGroup>
      </div>

      {/* Institutional Audit Partners */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-xl font-bold text-[#1A080C]">Independent Verification Partners</h3>
          <p className="text-xs text-[#5E4A4E]">
            StateEra partners with world-leading engineering, audit, and legal institutions to verify every asset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.name} className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 text-center">
              <span className="font-bold text-sm text-[#1A080C] block">{p.name}</span>
              <span className="text-[11px] text-[#5E4A4E] block">{p.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-[#1A080C]">
          Start building your fractional real estate portfolio
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore" className="btn btn-primary text-sm font-bold flex items-center gap-2">
            <span>Browse 100+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/trust" className="btn btn-secondary text-sm font-semibold">
            Inspect Trust &amp; Verification Centre
          </Link>
        </div>
      </div>
    </div>
  );
}
