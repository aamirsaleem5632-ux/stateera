"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, AlertTriangle } from "lucide-react";

export default function RiskDisclosuresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      <Link href="/legal" className="text-xs font-bold text-[#3B0F18] hover:underline inline-flex items-center gap-1.5 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Legal Centre</span>
      </Link>

      <div className="space-y-2 border-b border-[#EADCDD] pb-6">
        <span className="badge badge-demo text-[10px]">Investor Protection</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
          Risk Disclosures &amp; Regulatory Notices
        </h1>
        <p className="text-xs text-[#8C7B7F]">Mandatory Statutory Disclosures &bull; Version 2.4</p>
      </div>

      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">Summary Risk Warning:</strong>
          <p className="leading-relaxed">
            Real estate investments, including fractional share co-ownership, carry inherent financial risks. Property valuations can decline, tenant rental income is subject to vacancy and economic stress, and secondary market liquidity is not guaranteed. Do not invest capital you cannot afford to risk.
          </p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none text-[#5E4A4E] space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">1. No Guaranteed Returns or Capital Preservation</h2>
          <p>
            Past performance, historical rental yields, and AI scenario forecasts are not reliable indicators of future investment results. While StateEra engages tier-1 engineering and legal auditors, platform projections are mathematical simulations and cannot guarantee investment returns.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">2. Real Estate Illiquidity Risk</h2>
          <p>
            Real estate is inherently an illiquid asset class. Although StateEra provides a secondary marketplace where members can offer fractional shares for sale, transaction execution depends on available buyer demand at your specified asking price. StateEra does not act as a market maker and does not guarantee immediate buybacks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">3. Tenant Vacancy &amp; Default Risk</h2>
          <p>
            Rental yields depend on continuous tenant occupancy and timely rent collection. If a tenant defaults or vacates upon lease expiration, net monthly distributions may temporarily decrease or pause while our licensed property managers procure a new qualified occupant.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">4. Foreign Exchange &amp; Currency Volatility</h2>
          <p>
            Properties are situated across 19+ sovereign jurisdictions (USD, GBP, EUR, AED, PKR, SGD, JPY). Fluctuations in foreign exchange rates between your domestic bank currency and the asset&apos;s base currency can impact the net value of distributed rental income.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1A080C]">5. Regulatory &amp; Tax Policy Changes</h2>
          <p>
            Changes in national tax laws, withholding rates, or real estate foreign ownership regulations in any property&apos;s host jurisdiction may influence net distributions. Investors are advised to seek independent tax counsel before acquiring international assets.
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
