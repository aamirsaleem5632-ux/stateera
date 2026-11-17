"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldAlert } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      <Link href="/legal" className="text-xs font-bold text-[#3B0F18] hover:underline inline-flex items-center gap-1.5 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Legal Centre</span>
      </Link>

      <div className="space-y-2 border-b border-[#EADCDD] pb-6">
        <span className="badge badge-demo text-[10px]">Legal Agreement</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
          Terms &amp; Conditions of Service
        </h1>
        <p className="text-xs text-[#8C7B7F]">Effective Date: November 15, 2026 &bull; Version 2.4</p>
      </div>

      <div className="prose prose-sm max-w-none text-[#5E4A4E] space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">1. Introduction &amp; Acceptance of Terms</h2>
          <p>
            Welcome to StateEra (&quot;Platform&quot;), operated by StateEra Global PropTech Ltd. By registering an account, accessing property listings, using the scenario simulator, or participating in fractional real estate demonstrations, you agree to be legally bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">2. Nature of Platform &amp; Practice Demo Parameters</h2>
          <p>
            StateEra is presented as an advanced PropTech prototype demonstration. While market metrics, property engineering reports, and rental distribution algorithms mirror institutional realities, all wallet funding balances, fractional transactions, and cash withdrawals performed in demonstration mode are simulated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">3. Special Purpose Vehicle (SPV) Legal Framework</h2>
          <p>
            Each property listed on StateEra is held by an independent Special Purpose Vehicle (SPV) established under applicable jurisdiction laws (e.g., ADGM in the UAE, UK Companies House, or Delaware LLC in the US). Fractional share tokens represent beneficial economic interests in the designated SPV, granting proportional rights to net rental distributions and liquidation proceeds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">4. User Eligibility &amp; Anti-Money Laundering (AML) Compliance</h2>
          <p>
            Users must be at least 18 years of age. Prior to executing real-world fractional allocations or receiving live rental income distributions, users must successfully complete KYC identity verification and AML sanctions screening in accordance with international FATF guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">5. Secondary Marketplace Rules &amp; Settlement</h2>
          <p>
            Share-owners may list fractional units on the StateEra secondary trading board. A 0.50% settlement fee is deducted from the seller upon transaction matching. StateEra does not guarantee that a buyer will be immediately available at your chosen limit price.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, StateEra and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from property market value downturns, tenant lease defaults, or foreign exchange currency fluctuations.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-[#EADCDD] text-center">
        <Link href="/legal" className="btn btn-secondary text-xs font-bold py-2.5 px-6">
          Return to Legal Overview
        </Link>
      </div>
    </div>
  );
}
