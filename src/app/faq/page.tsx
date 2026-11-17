"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "basics",
      q: "What is fractional real estate investment?",
      a: "Fractional real estate allows an entire commercial building or luxury residential asset to be divided into thousands of affordable shares starting from $25–$100. Each fractional share represents proportional economic and legal beneficial ownership in the property, entitling the owner to a proportional share of monthly tenant rental income and capital appreciation upon eventual property exit.",
    },
    {
      category: "payouts",
      q: "How are rental payouts distributed to my account?",
      a: "Tenants pay their contract rent each month into an independently audited escrow account. Property operational costs (local property tax, replacement insurance, licensed property management fees, and sinking fund reserves) are deducted first. The remaining net rental yield is distributed automatically to share-owners' wallets on the 1st of every calendar month.",
    },
    {
      category: "legal",
      q: "How is my legal ownership secured and verified?",
      a: "Every listed asset is ring-fenced within an independent, bankruptcy-remote Special Purpose Vehicle (SPV) company. Fractional investors hold legally documented share certificates in the SPV. Even if StateEra the platform were ever to cease operations, the underlying building remains intact, owned exclusively by its registered fractional shareholders under institutional trustee oversight.",
    },
    {
      category: "trading",
      q: "Can I sell my fractional shares before the building is sold?",
      a: "Yes. StateEra provides a secondary peer-to-peer trading marketplace. You can list your fractional shares for sale at prevailing market prices or place limit orders. Another verified community member can purchase them instantly, with proceeds credited directly into your wallet upon trade execution.",
    },
    {
      category: "payouts",
      q: "Are rental returns and property valuations guaranteed?",
      a: "No. In accordance with strict global regulatory compliance, StateEra never guarantees investment returns or rental yields. While we select Grade-A institutional assets backed by long-term corporate leases and independent Bureau Veritas engineering audits, real estate investments carry market risks including tenant vacancies, macroeconomic fluctuations, and property value adjustments.",
    },
    {
      category: "taxes",
      q: "How does international taxation work for overseas investors?",
      a: "Because StateEra assets span 19+ jurisdictions, rental distributions are accounted for net of mandatory local withholding taxes where applicable. Monthly statements provide standardized cross-border tax deduction summaries for reporting in your home country.",
    },
    {
      category: "basics",
      q: "What is the difference between StateEra and a traditional REIT?",
      a: "Traditional Real Estate Investment Trusts (REITs) pool thousands of blind assets together into a single stock ticker where you have zero control over specific buildings and face heavy fund management overhead. With StateEra, you choose the exact physical building, neighborhood, and tenant lease covenants you wish to co-own, with complete digital Property Passport transparency.",
    },
    {
      category: "legal",
      q: "What is the StateEra Property Protection Score?",
      a: "The Property Protection Score is an objective 0–100 rating computed by weighing independent freehold title verification (30%), physical MEP engineering inspection soundness (25%), bank escrow reconciliation (25%), and comprehensive replacement insurance (20%). Only properties scoring 90+ are cleared for community participation.",
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Knowledge &amp; Support Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#5E4A4E] leading-relaxed">
          Everything you need to know about fractional real estate, legal trust protections, monthly rental cashflows, and secondary market liquidity.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="glass p-5 rounded-3xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-se absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. rent, shares, taxes, legal, liquidity)..."
            className="input pl-10 pr-4 text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All Topics" },
            { id: "basics", label: "Fractional Basics" },
            { id: "payouts", label: "Rental Payouts" },
            { id: "legal", label: "Legal & Protection" },
            { id: "trading", label: "Secondary Trading" },
            { id: "taxes", label: "Taxes & Overseas" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap font-semibold transition-all ${
                selectedCategory === c.id
                  ? "btn-primary shadow-sm"
                  : "bg-[#FAF5F5] hover:bg-[#F2E8E9] text-secondary-se border border-[#EADCDD]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-[#EADCDD] rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1A080C] hover:bg-[#FAF5F5] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C7B7F] shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-[#3B0F18]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#5E4A4E] leading-relaxed border-t border-[#FAF5F5] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="p-8 rounded-3xl bg-[#FAF5F5] border border-[#EADCDD] text-center space-y-3">
        <h3 className="text-xl font-bold text-[#1A080C]">Still have questions?</h3>
        <p className="text-xs sm:text-sm text-[#5E4A4E] max-w-md mx-auto">
          Our human expert network and member support specialists are ready to provide tailored guidance.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/support" className="btn btn-secondary text-xs font-bold">
            Contact Support Desk
          </Link>
          <Link href="/experts" className="btn btn-primary text-xs font-bold">
            Book Expert Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
