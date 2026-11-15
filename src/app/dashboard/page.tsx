"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Wallet,
  ArrowRight,
  Sparkles,
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

const PIE_COLORS = ["#7C4DFF", "#5B3A8C", "#10B981", "#3B82F6", "#F59E0B"];

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
  const [payoutResult, setPayoutResult] = useState<string | null>(null);
  // SSR-safe chart flag: only render Recharts after client hydration
  const [chartReady, setChartReady] = useState(false);
  useEffect(() => { setChartReady(true); }, []);

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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5B3A8C] to-[#7C4DFF] text-white flex items-center justify-center font-black text-2xl shadow-md">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1E1B4B]">Jonathan Sterling</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
                Verified Investor
              </span>
            </div>
            <p className="text-xs text-[#585375] mt-0.5">
              Investor ID: STE-892144 • Identity Check: Complete • Practice Wallet Active
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSimulatePayout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <Coins className="w-4 h-4 text-mint" />
            <span>Simulate Monthly Dividend Payout</span>
          </button>
          <Link
            href="/explore"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Buy Shares in New Buildings</span>
          </Link>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-[#F3EAFC] to-[#DCFCE7]/40 border border-[#E6D8F5] flex items-center justify-between gap-3 text-xs text-[#5B3A8C]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong>Next Step:</strong> Test your monthly rent by clicking <strong>"Simulate Monthly Dividend Payout"</strong> above, or browse new buildings to add to your holdings.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-[#7C4DFF] hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>See Simple Terms Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Payout Feedback Alert */}
      {payoutResult && (
        <div className="p-4 rounded-2xl bg-mint border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{payoutResult}</span>
        </div>
      )}

      {/* 4 Key Portfolio KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Portfolio Value */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8782A3]">
            <div className="flex items-center gap-1">
              <span>Total Value of My Shares</span>
              <InfoTooltip termId="portfolio" size="sm" />
            </div>
            <PieIcon className="w-4 h-4 text-[#7C4DFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
            ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-[#585375] flex items-center justify-between">
            <span>Invested: <strong>${totalInvested.toLocaleString()}</strong></span>
            <span className="text-[10px] text-[#8782A3]">Current price of all shares</span>
          </div>
        </div>

        {/* Total Gain / Loss */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8782A3]">
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
            <span className="text-xs font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded-full">
              +{totalGainLossPercent.toFixed(2)}% Overall Growth
            </span>
            <span className="text-[10px] text-[#8782A3]">Since first share</span>
          </div>
        </div>

        {/* Monthly Estimated Rental Income */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8782A3]">
            <div className="flex items-center gap-1">
              <span>Estimated Monthly Rent</span>
              <InfoTooltip termId="rent-payments" size="sm" />
            </div>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
            ${monthlyEstimatedIncome.toFixed(2)}
          </div>
          <div className="text-xs text-[#585375] flex items-center justify-between">
            <span>Yearly: <strong>${(monthlyEstimatedIncome * 12).toFixed(2)} / yr</strong></span>
            <span className="text-[10px] text-[#8782A3]">Deposited on the 1st</span>
          </div>
        </div>

        {/* Demo Cash Balance */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8782A3]">
            <div className="flex items-center gap-1">
              <span>Practice Cash in Wallet</span>
              <InfoTooltip termId="escrow" size="sm" />
            </div>
            <Wallet className="w-4 h-4 text-[#7C4DFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#7C4DFF]">
            ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-[#585375]">
            <Link href="/wallet" className="text-[#7C4DFF] font-semibold hover:underline">
              Add practice money or withdraw →
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Asset Allocation & Monthly Payout Run */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Asset Allocation Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#1E1B4B]">Where Your Money Is Invested</h3>
              <InfoTooltip termId="asset-allocation" size="sm" />
            </div>
            <span className="text-xs text-[#8782A3]">{holdings.length} Properties</span>
          </div>

          {holdings.length > 0 ? (
            chartReady ? (
              <div className="h-56 w-full">
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
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${val?.toLocaleString()}`, "Value"]}
                      contentStyle={{ backgroundColor: "#1E1B4B", borderRadius: "0.75rem", color: "#fff", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center space-y-3">
                <div className="w-28 h-28 rounded-full border-8 border-t-[#7C4DFF] border-r-[#5B3A8C] border-b-[#10B981] border-l-[#3B82F6] animate-pulse flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[#5B3A8C]">{holdings.length} Assets</span>
                </div>
                <div className="text-xs text-[#8782A3]">Loading portfolio distribution...</div>
              </div>
            )
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-[#8782A3]">
              No holdings yet. Purchase shares to view allocation.
            </div>
          )}

          <div className="space-y-1.5 pt-2 border-t border-[#F3EAFC]">
            {holdings.map((h, i) => (
              <div key={h.propertyId} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="truncate max-w-[200px] text-[#585375] font-medium">{h.propertyTitle}</span>
                </div>
                <strong className="text-[#1E1B4B]">${h.currentValue.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* My Fractional Holdings Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#1E1B4B]">Properties I Own Shares In</h3>
              <InfoTooltip termId="fractional-shares" size="sm" />
            </div>
            <Link href="/wallet" className="text-xs text-[#7C4DFF] font-semibold hover:underline">
              See All Rent Payments →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Shares</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3">Rent / Mo</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EAFC]">
                {holdings.map((h) => (
                  <tr key={h.propertyId} className="hover:bg-[#F8F4FD] transition-colors">
                    <td className="py-3 font-bold text-[#1E1B4B] truncate max-w-[180px]">
                      {h.propertyTitle}
                    </td>
                    <td className="py-3 text-[#585375]">
                      {h.sharesOwned} shares
                    </td>
                    <td className="py-3 font-semibold text-[#1E1B4B]">
                      ${h.currentValue.toLocaleString()}
                    </td>
                    <td className="py-3 font-bold text-emerald-600">
                      +${h.monthlyEstimatedRentalIncome.toFixed(2)}
                    </td>
                    <td className="py-3 text-right space-x-1">
                      <Link
                        href={`/trade/${h.propertyId}`}
                        className="px-2.5 py-1 rounded-lg bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-semibold text-[11px]"
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
            <h3 className="text-xl font-bold text-[#1E1B4B]">Watchlist & Saved Assets</h3>
            <p className="text-xs text-[#585375]">Track potential properties before acquiring shares.</p>
          </div>
          <Link href="/explore" className="text-xs text-[#7C4DFF] font-bold hover:underline">
            Explore All Assets →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.length > 0 ? (
            savedProperties.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div className="col-span-3 text-center py-10 bg-white rounded-2xl border border-[#E6D8F5] text-xs text-[#8782A3]">
              No properties saved yet. Click the bookmark icon on any property to save it to your watchlist.
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Transaction History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
          <h3 className="font-bold text-base text-[#1E1B4B]">Recent Account Activity</h3>
          <Link href="/wallet" className="text-xs text-[#7C4DFF] font-semibold hover:underline">
            Full Wallet Ledger
          </Link>
        </div>

        <div className="divide-y divide-[#F3EAFC]">
          {transactions.slice(0, 6).map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    tx.type === "BUY"
                      ? "bg-[#F3EAFC] text-[#7C4DFF]"
                      : tx.type === "RENT_PAYOUT"
                      ? "bg-mint text-emerald-800"
                      : "bg-[#E0F2FE] text-sky-800"
                  }`}
                >
                  {tx.type === "BUY" ? "BUY" : tx.type === "RENT_PAYOUT" ? "DIV" : tx.type}
                </div>
                <div>
                  <div className="font-bold text-[#1E1B4B]">{tx.propertyTitle || "Demo Cash Transaction"}</div>
                  <div className="text-[11px] text-[#8782A3]">
                    {tx.timestamp} • Ref: {tx.referenceCode}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-black text-sm ${
                    tx.type === "RENT_PAYOUT" || tx.type === "SELL" || tx.type === "DEPOSIT"
                      ? "text-emerald-600"
                      : "text-[#1E1B4B]"
                  }`}
                >
                  {tx.type === "BUY" ? "-" : "+"}${tx.amount.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-mint px-2 py-0.5 rounded">
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
