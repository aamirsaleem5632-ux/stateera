"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F5] border border-[#EADCDD] text-accent-se text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Simple Real Estate Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
          Every Property Term Explained in Plain English
        </h1>
        <p className="text-sm sm:text-base text-secondary-se leading-relaxed">
          No finance jargon, no confusing formulas. Here is exactly what every number and word means on StateEra, explained the way you would explain it to a friend.
        </p>
      </div>

      {/* Quick 3-Step Summary Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-black text-[#1A080C] flex items-center gap-2">
          <span>The 60-Second Property Investing Summary</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-accent-se">Concept 1</span>
            <h3 className="font-bold text-sm text-[#1A080C]">You Own a Piece</h3>
            <p className="text-secondary-se leading-relaxed">
              Instead of needing $1,000,000 to buy an entire building, the building is sliced into 10,000 small shares of $100. You buy only what you can afford.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-accent-se">Concept 2</span>
            <h3 className="font-bold text-sm text-[#1A080C]">You Collect Rent</h3>
            <p className="text-secondary-se leading-relaxed">
              Real tenants live or work in the building and pay monthly rent. After paying building bills, the net profit is split and sent straight to your wallet.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-accent-se">Concept 3</span>
            <h3 className="font-bold text-sm text-[#1A080C]">You Can Sell Anytime</h3>
            <p className="text-secondary-se leading-relaxed">
              If you ever want your money back, you can sell your shares to other investors on the secondary market without waiting years to sell the whole building.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="glass rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-se absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search any term (e.g. 'Net Yield', 'Shares', 'NOI', 'Safety checks')..."
            className="input pl-10"
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
                  ? "bg-[var(--se-primary)] text-white shadow-xs"
                  : "bg-[#FAF5F5] text-secondary-se border border-[#EADCDD] hover:bg-[#F2E8E9]"
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
            className="glass rounded-2xl p-6 sm:p-7 space-y-3 hover:border-[#3B0F18]/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#EADCDD] pb-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-accent-se bg-[#FAF5F5] border border-[#EADCDD] px-2.5 py-0.5 rounded-md inline-block mb-1">
                  Plain word: {item.simpleTerm}
                </span>
                <h3 className="text-xl font-black text-[#1A080C]">{item.term}</h3>
              </div>
              <span className="text-xs text-muted-se capitalize font-medium">Category: {item.category}</span>
            </div>

            <p className="text-sm font-semibold text-[#1A080C] leading-relaxed">
              {item.shortExplanation}
            </p>

            <p className="text-xs text-secondary-se leading-relaxed">
              {item.detailedExplanation}
            </p>

            {item.example && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                <strong className="text-emerald-800 block mb-0.5 font-bold">Real-life example:</strong>
                {item.example}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl p-6 space-y-2">
            <HelpCircle className="w-8 h-8 text-muted-se mx-auto" />
            <h4 className="font-bold text-[#1A080C]">No terms matched &ldquo;{search}&rdquo;</h4>
            <p className="text-xs text-secondary-se">Try searching for &ldquo;rent&rdquo;, &ldquo;yield&rdquo;, &ldquo;shares&rdquo;, or clear your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="btn btn-primary mt-2 text-xs"
            >
              Show all terms
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
        <h2 className="text-2xl font-black text-[#1A080C]">Ready to test it with free demo cash?</h2>
        <p className="text-xs sm:text-sm text-secondary-se max-w-xl mx-auto">
          StateEra includes a practice wallet with $25,000 in simulated demo money. Pick a building, buy a few shares, and watch your monthly rent calculation in real-time.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/explore" className="btn btn-primary text-xs">
            Explore Properties Now
          </Link>
          <Link href="/dashboard" className="btn btn-secondary text-xs">
            Open My Investments
          </Link>
        </div>
      </div>
    </div>
  );
}
