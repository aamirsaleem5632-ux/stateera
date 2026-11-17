"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      <Link href="/legal" className="text-xs font-bold text-[#3B0F18] hover:underline inline-flex items-center gap-1.5 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Legal Centre</span>
      </Link>

      <div className="space-y-2 border-b border-[#EADCDD] pb-6">
        <span className="badge badge-demo text-[10px]">Data Protection</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
          Privacy Policy &amp; Security Standards
        </h1>
        <p className="text-xs text-[#8C7B7F]">Effective Date: November 15, 2026 &bull; GDPR &amp; International Standards</p>
      </div>

      <div className="prose prose-sm max-w-none text-[#5E4A4E] space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">1. Commitment to Member Privacy</h2>
          <p>
            StateEra Global PropTech Ltd. respects your fundamental right to privacy. This policy details how we collect, process, encrypt, and store personal identifiers, biometric KYC documents, and transaction records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account Data:</strong> Name, verified email address, phone number, and account role.</li>
            <li><strong>KYC / Verification Credentials:</strong> Government-issued passport or national ID cards, proof of residential address, and tax residency declarations.</li>
            <li><strong>Financial Ledger Data:</strong> Simulated wallet balance changes, share holdings, rental payout records, and transaction timestamps.</li>
            <li><strong>Technical Analytics:</strong> Device type, IP address, browser telemetry, and accessibility motion preferences.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">3. How We Use and Protect Your Data</h2>
          <p>
            All member information is encrypted in transit using TLS 1.3 and at rest using AES-256 standard encryption. We never sell, lease, or monetize user data to third-party advertising brokers. Data is processed solely for platform operations, regulatory compliance, and appointment scheduling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">4. Your Rights Under GDPR &amp; International Privacy Laws</h2>
          <p>
            You retain the right to request a complete copy of your stored personal information, request data correction, or submit an account deletion request. Please contact privacy@stateera.demo for data subject requests.
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
