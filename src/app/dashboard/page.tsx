"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  ArrowRight,
  PieChart as PieIcon,
  Coins,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Plus,
  ArrowDownLeft,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PropertyCard } from "@/components/property/PropertyCard";
import { BeginnerGuideBanner } from "@/components/common/BeginnerGuideBanner";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useChartInView } from "@/hooks/useChartInView";
import { useIsMounted } from "@/hooks/useIsMounted";

const EASING = [0.22, 1, 0.36, 1] as const;

const PIE_COLORS = ["#3B0F18", "#E8909A", "#1D4ED8", "#15803D", "#B45309"];

export default function InvestorDashboardPage() {
  const {
    walletBalance,
    holdings,
    transactions,
    payoutHistory,
    totalPortfolioValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    monthlyEstimatedIncome,
    averageAnnualYield,
    simulateMonthlyDividendPayout,
    properties,
    watchlist,
    isWatchlisted,
    toggleWatchlist,
  } = useDemo();

  const { t, dir } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [chartRef, isAnimationActive] = useChartInView();
  const [payoutResult, setPayoutResult] = useState<string | null>(null);
  // SSR-safe chart flag: only render Recharts after client hydration
  const chartReady = useIsMounted();

  const handleSimulatePayout = () => {
    const res = simulateMonthlyDividendPayout();
    setPayoutResult(res.message);
    setTimeout(() => setPayoutResult(null), 5000);
  };

  // Prepare Asset Allocation Data
  const allocationData = holdings.map((h) => ({
    name: h.propertyTitle,
    value: h.currentValue,
  }));

  // Watchlisted properties
  const savedProperties = properties.filter((p) => watchlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* 3-Step Beginner Explainer Strip */}
      <BeginnerGuideBanner pageName="dashboard" />

      {/* Header Profile Bar */}
      <div className="glass p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-black text-2xl shadow-sm">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1A080C]">Jonathan Sterling</h1>
              <span className="badge badge-success text-[10px] uppercase font-bold tracking-wider">
                Verified Investor
              </span>
            </div>
            <p className="text-xs text-secondary-se mt-0.5">
              Investor ID: STE-892144 • Identity Check: Complete • Practice Wallet Active
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSimulatePayout}
            className="btn btn-primary text-xs"
          >
            <Coins className="w-4 h-4" />
            <span>Simulate Monthly Dividend Payout</span>
          </button>
          <Link
            href="/explore"
            className="btn btn-secondary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Buy Shares in New Buildings</span>
          </Link>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs text-[#5E4A4E]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Test your monthly rent by clicking <strong>&quot;Simulate Monthly Dividend Payout&quot;</strong> above, or browse new buildings to add to your holdings.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>See Simple Terms Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Payout Feedback Alert */}
      {payoutResult && (
        <div className="p-4 rounded-2xl toast-glass text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in border border-emerald-200 text-emerald-800 bg-emerald-50">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{payoutResult}</span>
        </div>
      )}

      {/* 4 Key Portfolio KPI Cards - light fade-up on page open */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASING }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {/* Total Portfolio Value */}
        <div className="glass p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-se">
            <div className="flex items-center gap-1">
              <span>Total Value of My Shares</span>
              <InfoTooltip termId="portfolio" size="sm" />
            </div>
            <PieIcon className="w-4 h-4 text-accent-se" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1A080C]">
            ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-secondary-se flex items-center justify-between">
            <span>Invested: <strong className="text-[#1A080C]">${totalInvested.toLocaleString()}</strong></span>
            <span className="text-[10px] text-muted-se">Current price of all shares</span>
          </div>
        </div>

        {/* Total Gain / Loss */}
        <div className="glass p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-se">
            <div className="flex items-center gap-1">
              <span>Total Profit or Loss</span>
              <InfoTooltip termId="total-gain-loss" size="sm" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            +${totalGainLoss.toFixed(2)}
          </div>
          <div className="flex items-center justify-between">
            <span className="badge badge-success text-xs font-bold">
              +{totalGainLossPercent.toFixed(2)}% Overall Growth
            </span>
            <span className="text-[10px] text-muted-se">Since first share</span>
          </div>
        </div>

        {/* Monthly Estimated Rental Income */}
        <div className="glass p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-se">
            <div className="flex items-center gap-1">
              <span>Estimated Monthly Rent</span>
              <InfoTooltip termId="rent-payments" size="sm" />
            </div>
            <Coins className="w-4 h-4 text-accent-se" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1A080C]">
            ${monthlyEstimatedIncome.toFixed(2)}
          </div>
          <div className="text-xs text-secondary-se flex items-center justify-between">
            <span>Yearly: <strong className="text-[#1A080C]">${(monthlyEstimatedIncome * 12).toFixed(2)} / yr</strong></span>
            <span className="text-[10px] text-muted-se">Deposited on the 1st</span>
          </div>
        </div>

        {/* Demo Cash Balance */}
        <div className="glass p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-se">
            <div className="flex items-center gap-1">
              <span>Practice Cash in Wallet</span>
              <InfoTooltip termId="escrow" size="sm" />
            </div>
            <Wallet className="w-4 h-4 text-accent-se" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-accent-se">
            ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-secondary-se">
            <Link href="/wallet" className="text-accent-se font-semibold hover:underline">
              Add practice money or withdraw →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Visual Analytics Grid: Asset Allocation & Monthly Payout Run */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Asset Allocation Chart (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#1A080C]">Where Your Money Is Invested</h3>
              <InfoTooltip termId="asset-allocation" size="sm" />
            </div>
            <span className="text-xs text-muted-se">{holdings.length} Properties</span>
          </div>

          {holdings.length > 0 ? (
            chartReady ? (
              <div ref={chartRef} className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      isAnimationActive={isAnimationActive}
                      animationDuration={800}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${val?.toLocaleString()}`, "Value"]}
                      contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #EADCDD", borderRadius: "8px", color: "#1A080C", fontSize: "12px", boxShadow: "0 4px 12px rgba(26,8,12,0.08)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center space-y-3">
                <div className="w-28 h-28 rounded-full border-8 border-t-[#3B0F18] border-r-[#E8909A] border-b-[#15803D] border-l-[#1D4ED8] animate-pulse flex items-center justify-center">
                  <span className="text-[11px] font-bold text-accent-se">{holdings.length} Assets</span>
                </div>
                <div className="text-xs text-muted-se">Loading portfolio distribution...</div>
              </div>
            )
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-muted-se">
              No holdings yet. Purchase shares to view allocation.
            </div>
          )}

          <div className="space-y-1.5 pt-2 border-t border-[var(--se-glass-border-soft)]">
            {holdings.map((h, i) => (
              <div key={h.propertyId} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="truncate max-w-[200px] text-secondary-se font-medium">{h.propertyTitle}</span>
                </div>
                <strong className="text-[#1A080C]">${h.currentValue.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* My Fractional Holdings Table (7 cols) */}
        <div className="lg:col-span-7 glass p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#1A080C]">Properties I Own Shares In</h3>
              <InfoTooltip termId="fractional-shares" size="sm" />
            </div>
            <Link href="/wallet" className="text-xs text-accent-se font-semibold hover:underline">
              See All Rent Payments →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table-glass text-xs">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Shares</th>
                  <th>Value</th>
                  <th>Rent / Mo</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.propertyId}>
                    <td className="font-bold text-[#1A080C] truncate max-w-[180px]">
                      {h.propertyTitle}
                    </td>
                    <td className="text-secondary-se">
                      {h.sharesOwned} shares
                    </td>
                    <td className="font-semibold text-[#1A080C]">
                      ${h.currentValue.toLocaleString()}
                    </td>
                    <td className="font-bold text-accent-se">
                      +${h.monthlyEstimatedRentalIncome.toFixed(2)}
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/trade/${h.propertyId}`}
                        className="btn btn-secondary text-[11px] py-1 px-3 min-h-[32px]"
                      >
                        Buy / Sell
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1A080C]">Watchlist & Saved Assets</h3>
            <p className="text-xs text-secondary-se">Track potential properties before acquiring shares.</p>
          </div>
          <Link href="/explore" className="text-xs text-accent-se font-bold hover:underline">
            Explore All Assets →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.length > 0 ? (
            savedProperties.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div className="col-span-3 text-center py-10 glass text-xs text-muted-se">
              No properties saved yet. Click the bookmark icon on any property to save it to your watchlist.
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Transaction History */}
      <div className="glass p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--se-glass-border-soft)]">
          <h3 className="font-bold text-base text-[#1A080C]">Recent Account Activity</h3>
          <Link href="/wallet" className="text-xs text-accent-se font-semibold hover:underline">
            Full Wallet Ledger
          </Link>
        </div>

        <div className="divide-y divide-[var(--se-glass-border-soft)]">
          {transactions.slice(0, 6).map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    tx.type === "BUY"
                      ? "bg-[#FAF5F5] text-[#3B0F18] border border-[#EADCDD]"
                      : tx.type === "RENT_PAYOUT"
                      ? "badge-success"
                      : "badge-info"
                  }`}
                >
                  {tx.type === "BUY" ? "BUY" : tx.type === "RENT_PAYOUT" ? "DIV" : tx.type}
                </div>
                <div>
                  <div className="font-bold text-[#1A080C]">{tx.propertyTitle || "Demo Cash Transaction"}</div>
                  <div className="text-[11px] text-muted-se">
                    {tx.timestamp} • Ref: {tx.referenceCode}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-black text-sm ${
                    tx.type === "RENT_PAYOUT" || tx.type === "SELL" || tx.type === "DEPOSIT"
                      ? "text-accent-se"
                      : "text-[#1A080C]"
                  }`}
                >
                  {tx.type === "BUY" ? "-" : "+"}${tx.amount.toLocaleString()}
                </div>
                <span className="badge badge-success text-[10px]">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
