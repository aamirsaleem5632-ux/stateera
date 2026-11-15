"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Coins,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TransactionType } from "@/types/investor";

export default function WalletPage() {
  const {
    walletBalance,
    holdings,
    transactions,
    payoutHistory,
    depositFunds,
    withdrawFunds,
    simulateMonthlyDividendPayout,
  } = useDemo();

  const { t, dir } = useLanguage();

  // Deposit & Withdraw Form States
  const [depositAmount, setDepositAmount] = useState<number>(5000);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Transaction Ledger Filter
  const [filterType, setFilterType] = useState<"ALL" | TransactionType>("ALL");

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === "ALL") return true;
    return tx.type === filterType;
  });

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = depositFunds(Number(depositAmount));
    setFeedback(res);
    setDepositModalOpen(false);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const res = withdrawFunds(Number(withdrawAmount));
    setFeedback(res);
    setWithdrawModalOpen(false);
  };

  const handleSimulatePayout = () => {
    const res = simulateMonthlyDividendPayout();
    setFeedback({ success: res.success, message: res.message });
  };

  const exportCSV = () => {
    const headers = "ID,Timestamp,Type,Property,Amount,Status,ReferenceCode\n";
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.timestamp}","${t.type}","${t.propertyTitle || "N/A"}","${t.amount}","${t.status}","${t.referenceCode}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StateEra_Wallet_Ledger_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Demo Wallet & Distributions
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Manage simulated cash balance, deposit liquidity, and audit monthly rental payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C] hover:border-[#7C4DFF] shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-[#7C4DFF]" />
            <span>Export CSV Ledger</span>
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm ${
            feedback.success ? "bg-mint border border-emerald-300 text-emerald-900" : "bg-red-50 border border-red-200 text-red-900"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#5B3A8C] via-[#7C4DFF] to-[#5B3A8C] rounded-3xl p-6 sm:p-10 text-white shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#E6D8F5]">
              Total Available Demo Liquidity
            </span>
            <div className="text-4xl sm:text-5xl font-black mt-1">
              ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-mint" />
              <span>Institutional Escrow Simulation • FDIC insured mock ledger</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setDepositModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-[#5B3A8C] font-bold text-xs hover:bg-[#F3EAFC] shadow-md transition-all"
            >
              Deposit Demo Cash
            </button>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-bold text-xs hover:bg-[#332D56] border border-white/20 transition-all"
            >
              Withdraw Cash
            </button>
            <button
              onClick={handleSimulatePayout}
              className="px-5 py-2.5 rounded-xl bg-mint text-emerald-900 font-bold text-xs hover:bg-emerald-200 shadow-md transition-all flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4 text-emerald-700" />
              <span>Simulate Rental Dividend</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payout Formula & Financial Transparency Explainer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
          <div>
            <h3 className="font-bold text-base text-[#1E1B4B]">Rental Payout Waterfall & Formula</h3>
            <p className="text-xs text-[#585375]">How monthly investor distributions are strictly computed:</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-mint text-emerald-900">
            Automated Escrow
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8F4FD] border border-[#E6D8F5] text-xs font-mono text-[#1E1B4B] space-y-1">
          <div>Gross Rental Revenue Collected</div>
          <div>- Operating Expenses (Property Taxes, Insurance, Utilities)</div>
          <div>- Maintenance Reserve Allocation (CapEx Reserve)</div>
          <div>- Property Management Oversight Fee (6-8%)</div>
          <div className="font-bold text-[#7C4DFF] pt-1 border-t border-[#E6D8F5]">
            = Net Distributable Rental Income ÷ Total Property Shares × Investor Shares Owned
          </div>
        </div>
      </div>

      {/* Rental Payout History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <h3 className="font-bold text-base text-[#1E1B4B]">Simulated Monthly Distribution Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                <th className="pb-3">Date</th>
                <th className="pb-3">Property</th>
                <th className="pb-3">Eligible Shares</th>
                <th className="pb-3">Payout / Share</th>
                <th className="pb-3">Net Received</th>
                <th className="pb-3 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EAFC]">
              {payoutHistory.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8F4FD] transition-colors">
                  <td className="py-3 text-[#585375]">{p.payoutDate}</td>
                  <td className="py-3 font-bold text-[#1E1B4B]">{p.propertyTitle}</td>
                  <td className="py-3 text-[#585375]">{p.sharesEligible} shares</td>
                  <td className="py-3 font-semibold text-[#1E1B4B]">${p.payoutPerShare}</td>
                  <td className="py-3 font-black text-emerald-600">+${p.totalReceived.toFixed(2)}</td>
                  <td className="py-3 text-right text-[11px] font-mono text-[#8782A3]">{p.referenceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Transactions Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3EAFC]">
          <h3 className="font-bold text-base text-[#1E1B4B]">Complete Transaction Ledger</h3>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {(["ALL", "BUY", "SELL", "RENT_PAYOUT", "DEPOSIT", "WITHDRAW"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  filterType === t
                    ? "bg-[#7C4DFF] text-white shadow-sm"
                    : "bg-[#F8F4FD] text-[#585375] hover:bg-[#F3EAFC]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#F3EAFC]">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    tx.type === "BUY"
                      ? "bg-[#F3EAFC] text-[#7C4DFF]"
                      : tx.type === "RENT_PAYOUT"
                      ? "bg-mint text-emerald-800"
                      : tx.type === "DEPOSIT"
                      ? "bg-sky-100 text-sky-800"
                      : "bg-[#FCE7F3] text-pink-800"
                  }`}
                >
                  {tx.type === "BUY" ? "BUY" : tx.type === "RENT_PAYOUT" ? "DIV" : tx.type.slice(0, 3)}
                </div>
                <div>
                  <div className="font-bold text-[#1E1B4B]">{tx.propertyTitle || "Wallet Operation"}</div>
                  <div className="text-[11px] text-[#8782A3]">
                    {tx.timestamp} • Code: {tx.referenceCode}
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
                  {tx.type === "BUY" || tx.type === "WITHDRAW" ? "-" : "+"}${tx.amount.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-mint px-2 py-0.5 rounded">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Deposit Funds */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B4B]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6D8F5] shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-[#1E1B4B]">Deposit Demo Funds</h3>
            <p className="text-xs text-[#585375]">
              Simulate adding balance to your demo investor wallet.
            </p>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1B4B]">Amount ($)</label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 text-base font-bold text-[#1E1B4B]"
                />
              </div>

              {/* Quick Chips */}
              <div className="flex gap-2">
                {[1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className="flex-1 py-1.5 rounded-lg bg-[#F3EAFC] text-[#5B3A8C] text-xs font-semibold hover:bg-[#E6D8F5]"
                  >
                    +${amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDepositModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E6D8F5] text-xs font-semibold text-[#585375]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#7C4DFF] text-white text-xs font-bold shadow-md hover:bg-[#6C3CE9]"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Withdraw Funds */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B4B]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6D8F5] shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-[#1E1B4B]">Withdraw Demo Cash</h3>
            <p className="text-xs text-[#585375]">
              Available balance: <strong>${walletBalance.toLocaleString()}</strong>
            </p>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1B4B]">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  min="50"
                  max={walletBalance}
                  step="50"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 text-base font-bold text-[#1E1B4B]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E6D8F5] text-xs font-semibold text-[#585375]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold shadow-md hover:bg-red-600"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
