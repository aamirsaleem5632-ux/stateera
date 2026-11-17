"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck,
  Building,
  CheckCircle2,
  Lock,
  Search,
  Scale,
  Award,
  AlertTriangle,
  ArrowRight,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

export default function TrustCentrePage() {
  const auditTiers = [
    {
      title: "Tier 1: Freehold Legal Title Verification",
      issuer: "National Land Authorities (DLD, HM Land Registry, SECP)",
      description: "Direct government title deed verification establishing 100% unencumbered asset ownership without undisclosed liens, mortgages, or legal disputes.",
      checks: ["Clean title deed validation", "Corporate entity SPV check", "Zoning and municipality permit review", "Anti-money laundering sanction screening"],
    },
    {
      title: "Tier 2: Independent Structural & MEP Audit",
      issuer: "Bureau Veritas & SGS Engineering",
      description: "Physical on-site inspection by licensed structural surveyors verifying architectural integrity, foundation soundness, HVAC/MEP performance, and seismic resilience.",
      checks: ["Structural integrity inspection", "Fire & life-safety systems test", "Electrical and mechanical audit", "10-year capital expenditure forecast"],
    },
    {
      title: "Tier 3: Cashflow & Bank Escrow Audit",
      issuer: "Deloitte & Touche / KPMG Global",
      description: "Forensic financial review of historical rental cash flows, security deposits held in segregated escrow accounts, and tenant lease agreement validity.",
      checks: ["Bank escrow deposit reconciliation", "Tenant payment track record audit", "Tax compliance & withholding check", "Annual property tax assessment audit"],
    },
    {
      title: "Tier 4: Insurance & Risk Coverage",
      issuer: "Allianz Global Corporate & Specialty",
      description: "Comprehensive replacement-cost insurance policy safeguarding the physical building against fire, natural catastrophes, structural defects, and tenant rent default.",
      checks: ["100% building replacement insurance", "Loss of rental income protection", "Public liability indemnity coverage", "Terrorism and catastrophe riders"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Institutional Verification Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Trust &amp; Verification Centre
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          StateEra operates on an uncompromising standard of transparency. We believe every investor has the right to inspect independent audits, physical inspection reports, and verified legal title documentation.
        </p>
      </div>

      {/* Property Protection & Transparency Score Breakdown */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7B7F]">
              Standardized Rating Metric
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A080C]">
              StateEra Property Protection Score
            </h2>
            <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
              Every eligible property on our platform receives a dynamic 0–100 Transparency Score computed by assessing legal title cleanliness, structural health, tenancy stability, and financial reserves.
            </p>
          </div>
          <div className="bg-white border-2 border-[#3B0F18] rounded-2xl p-6 text-center shrink-0 w-full md:w-56 shadow-sm">
            <span className="text-xs font-bold text-[#8C7B7F] uppercase block mb-1">Platform Average</span>
            <div className="text-4xl font-black text-[#3B0F18]">96.4<span className="text-lg text-[#8C7B7F]">/100</span></div>
            <span className="badge badge-success text-[10px] mt-2 font-bold inline-block">Grade-A Institutional</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-[#EADCDD] space-y-1">
            <strong className="text-[#1A080C] text-sm block">1. Legal Title (30%)</strong>
            <p className="text-[#5E4A4E]">Clean freehold certificate with zero liens, mortgages, or active municipal encumbrances.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#EADCDD] space-y-1">
            <strong className="text-[#1A080C] text-sm block">2. Engineering (25%)</strong>
            <p className="text-[#5E4A4E]">Bureau Veritas structural engineering score and MEP operational efficiency rating.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#EADCDD] space-y-1">
            <strong className="text-[#1A080C] text-sm block">3. Financial Escrow (25%)</strong>
            <p className="text-[#5E4A4E]">Third-party escrow audit of historical rent collection, operating reserves, and tax filings.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#EADCDD] space-y-1">
            <strong className="text-[#1A080C] text-sm block">4. Insurance Shield (20%)</strong>
            <p className="text-[#5E4A4E]">Active institutional replacement and business interruption policy backed by Allianz.</p>
          </div>
        </div>
      </div>

      {/* 4-Tier Audit Framework */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A080C]">
            Our 4-Tier Due Diligence Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4A4E]">
            Before any property is tokenized, it must pass all 4 independent auditing gates.
          </p>
        </div>

        <RevealGroup className="space-y-6" stagger={0.08} variant="fade-up">
          {auditTiers.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A080C]">{tier.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#8C7B7F] block">
                    Certified Issuer: {tier.issuer}
                  </span>
                  <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <div className="w-full lg:w-72 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl p-4 shrink-0 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#8C7B7F] block">
                    Mandatory Verifications
                  </span>
                  {tier.checks.map((chk, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#1A080C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>

      {/* Public Dispute & Resolution Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <Scale className="w-8 h-8 text-[#3B0F18]" />
          <h3 className="text-xl font-bold text-[#1A080C]">Independent Dispute Resolution</h3>
          <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
            In the rare event of a tenant or management disagreement, StateEra employs an independent ombudsman panel. All formal complaints are logged on a publicly accessible dispute ledger with binding arbitration timetables.
          </p>
        </div>

        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <Eye className="w-8 h-8 text-[#3B0F18]" />
          <h3 className="text-xl font-bold text-[#1A080C]">Open Audit Logs</h3>
          <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
            All user wallet balance changes, dividend credit timestamps, and maintenance job order approvals are immutably logged with cryptographic verification hashes.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-[#1A080C]">
          Inspect real verification documents on our properties
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore" className="btn btn-primary text-sm font-bold flex items-center gap-2">
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/fees-and-returns" className="btn btn-secondary text-sm font-semibold">
            View Fee &amp; Returns Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
