"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
  Wallet,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { GLOSSARY_ITEMS, GlossaryItem } from "@/data/glossary";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function GlossaryPage() {
  const { dir } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Terms" },
    { id: "basics", label: "The Basics" },
    { id: "income", label: "Rent & Earnings" },
    { id: "checks", label: "Safety & Legal Checks" },
    { id: "trading", label: "Buying & Selling" },
    { id: "management", label: "Building Upkeep" },
  ];

  const filtered = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleTerm.toLowerCase().includes(search.toLowerCase()) ||
      item.shortExplanation.toLowerCase().includes(search.toLowerCase()) ||
      item.detailedExplanation.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10" dir={dir}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EAFC] text-[#5B3A8C] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#7C4DFF]" />
          <span>Simple Real Estate Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Every Property Term Explained in Plain English
        </h1>
        <p className="text-sm sm:text-base text-[#585375] leading-relaxed">
          No finance jargon, no confusing formulas. Here is exactly what every number and word means on StateEra, explained the way you would explain it to a friend.
        </p>
      </div>

      {/* Quick 3-Step Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <h2 className="text-lg font-black text-[#1E1B4B] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#7C4DFF]" />
          <span>The 60-Second Property Investing Summary</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8F4FD] border border-[#E6D8F5] space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7C4DFF]">Concept 1</span>
            <h3 className="font-bold text-sm text-[#1E1B4B]">You Own a Piece</h3>
            <p className="text-[#585375] leading-relaxed">
              Instead of needing $1,000,000 to buy an entire building, the building is sliced into 10,000 small shares of $100. You buy only what you can afford.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#DCFCE7]/50 border border-emerald-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">Concept 2</span>
            <h3 className="font-bold text-sm text-emerald-950">You Collect Rent</h3>
            <p className="text-emerald-900 leading-relaxed">
              Real tenants live or work in the building and pay monthly rent. After paying building bills, the net profit is split and sent straight to your wallet.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#E0F2FE]/50 border border-sky-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-800">Concept 3</span>
            <h3 className="font-bold text-sm text-sky-950">You Can Sell Anytime</h3>
            <p className="text-sky-900 leading-relaxed">
              If you ever want your money back, you can sell your shares to other investors on the secondary market without waiting years to sell the whole building.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8782A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search any term (e.g. 'Net Yield', 'Shares', 'NOI', 'Safety checks')..."
            className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E1B4B] placeholder-[#8782A3] focus:outline-none focus:border-[#7C4DFF]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeCategory === c.id
                  ? "bg-[#7C4DFF] text-white shadow-xs"
                  : "bg-[#F8F4FD] text-[#585375] hover:bg-[#F3EAFC]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="stateera-card rounded-2xl p-6 sm:p-7 space-y-3 border border-[#E6D8F5] hover:border-[#7C4DFF]/40 transition-all bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#F3EAFC] pb-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF] bg-[#F3EAFC] px-2.5 py-0.5 rounded-md inline-block mb-1">
                  Plain word: {item.simpleTerm}
                </span>
                <h3 className="text-xl font-black text-[#1E1B4B]">{item.term}</h3>
              </div>
              <span className="text-xs text-[#8782A3] capitalize font-medium">Category: {item.category}</span>
            </div>

            <p className="text-sm font-semibold text-[#1E1B4B] leading-relaxed">
              {item.shortExplanation}
            </p>

            <p className="text-xs text-[#585375] leading-relaxed">
              {item.detailedExplanation}
            </p>

            {item.example && (
              <div className="p-3.5 bg-mint/40 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium">
                <strong className="text-emerald-900 block mb-0.5 font-bold">Real-life example:</strong>
                {item.example}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E6D8F5] p-6 space-y-2">
            <HelpCircle className="w-8 h-8 text-[#8782A3] mx-auto" />
            <h4 className="font-bold text-[#1E1B4B]">No terms matched "{search}"</h4>
            <p className="text-xs text-[#585375]">Try searching for "rent", "yield", "shares", or clear your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#7C4DFF] text-white text-xs font-bold"
            >
              Show all terms
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#5B3A8C] to-[#7C4DFF] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-lg">
        <h2 className="text-2xl font-black">Ready to test it with free demo cash?</h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
          StateEra includes a practice wallet with $25,000 in simulated demo money. Pick a building, buy a few shares, and watch your monthly rent calculation in real-time.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/explore"
            className="px-6 py-3 rounded-xl bg-white text-[#5B3A8C] font-bold text-xs shadow-md hover:bg-[#F3EAFC] transition-all"
          >
            Explore Properties Now
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-[#1E1B4B] text-white font-bold text-xs hover:bg-[#2D275A] border border-white/20 transition-all"
          >
            Open My Investments
          </Link>
        </div>
      </div>
    </div>
  );
}
