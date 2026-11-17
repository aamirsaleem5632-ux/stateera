"use client";

import React from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  FileText,
  Lock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function LegalCentrePage() {
  const legalDocs = [
    {
      title: "Terms & Conditions",
      href: "/legal/terms",
      desc: "Comprehensive platform user agreement governing membership, fractional share reservations, platform fees, secondary trading rules, and SPV beneficiary rights.",
      updated: "November 2026",
    },
    {
      title: "Privacy & Data Protection Policy",
      href: "/legal/privacy",
      desc: "Our commitment to GDPR and international data protection standards regarding KYC documentation, biometric data safeguards, and encrypted transaction storage.",
      updated: "November 2026",
    },
    {
      title: "Risk Disclosures & Regulatory Notices",
      href: "/legal/risks",
      desc: "Essential disclosures regarding the illiquidity of real estate, currency volatility, potential tenant rental vacancy, and prototype demonstration parameters.",
      updated: "November 2026",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Scale className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Governance &amp; Compliance Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Legal Centre
        </h1>
        <p className="text-base text-[#5E4A4E] leading-relaxed">
          Review our foundational legal contracts, investor protection policies, and regulatory risk disclosures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {legalDocs.map((doc) => (
          <div
            key={doc.title}
            className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A080C]">{doc.title}</h3>
              <p className="text-xs text-[#5E4A4E] leading-relaxed">{doc.desc}</p>
            </div>

            <div className="pt-3 border-t border-[#EADCDD] space-y-3">
              <span className="text-[10px] text-[#8C7B7F] block">Last Revised: {doc.updated}</span>
              <Link href={doc.href} className="btn btn-secondary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5">
                <span>Read Full Document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-[#FAF5F5] border border-[#EADCDD] text-xs text-[#5E4A4E] space-y-2">
        <strong className="text-[#1A080C] text-sm block">Demonstration Prototype Notice:</strong>
        <p className="leading-relaxed">
          StateEra Global PropTech Ltd. operates this web application for academic, architectural, and user-experience evaluation purposes. All property holdings, transactional ledger balances, and dividend calculations shown in demo mode are illustrative and simulated.
        </p>
      </div>
    </div>
  );
}
