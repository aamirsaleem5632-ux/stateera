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
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TransactionType } from "@/types/investor";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { walletService } from "@/lib/services/walletService";

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
    walletService.depositFunds(Number(depositAmount)).catch(() => {});
    setFeedback(res);
    setDepositModalOpen(false);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const res = withdrawFunds(Number(withdrawAmount));
    walletService.withdrawFunds(Number(withdrawAmount)).catch(() => {});
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
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            Practice Wallet & Rent Payments
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Check your practice cash, add demo funds, and see how rent is paid out every month.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="btn btn-secondary text-xs"
          >
            <Download className="w-4 h-4 text-accent-se" />
            <span>Download Spreadsheet (CSV)</span>
          </button>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs text-[#5E4A4E]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Click <strong>&quot;Simulate Rent Payment&quot;</strong> below to test receiving monthly rent, or click <strong>&quot;Deposit Demo Cash&quot;</strong> to top up.
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

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm toast-glass ${
            feedback.success ? "border-emerald-200 text-emerald-800 bg-emerald-50" : "border-red-200 text-red-800 bg-red-50"
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
      <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-10 text-[#1A080C] space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-accent-se">
                Practice Cash in Wallet
              </span>
              <InfoTooltip termId="escrow" size="sm" />
            </div>
            <div className="text-4xl sm:text-5xl font-black mt-1 text-[#1A080C]">
              ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-secondary-se mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-se" />
              <span>Practice Mode • Real-world math, no real money used</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setDepositModalOpen(true)}
              className="btn btn-primary text-xs"
            >
              Deposit Demo Cash
            </button>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="btn btn-secondary text-xs"
            >
              Withdraw Cash
            </button>
            <button
              onClick={handleSimulatePayout}
              className="btn btn-primary text-xs flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4" />
              <span>Simulate Rent Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payout Formula & Financial Transparency Explainer */}
      <div className="glass p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--se-glass-border-soft)]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#1A080C]">How Rent Money Is Split (Rent Waterfall)</h3>
              <InfoTooltip termId="waterfall" size="sm" />
            </div>
            <p className="text-xs text-secondary-se">How monthly rent money is calculated and shared with you:</p>
          </div>
          <span className="badge badge-success text-xs font-bold">
            Automated & Clear
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] text-xs font-medium text-[#1A080C] space-y-2">
          <div className="flex items-center justify-between">
            <span>1. Rent Collected from Tenants</span>
            <span className="text-accent-se font-bold">Total tenant rent</span>
          </div>
          <div className="flex items-center justify-between text-secondary-se">
            <span>- Running Costs (Taxes, insurance, water/power)</span>
            <span className="text-red-600 font-semibold">- Costs</span>
          </div>
          <div className="flex items-center justify-between text-secondary-se">
            <span>- Emergency Fund & Repair Savings</span>
            <span className="text-red-600 font-semibold">- Repairs</span>
          </div>
          <div className="flex items-center justify-between text-secondary-se">
            <span>- Property Manager Fee (Building upkeep)</span>
            <span className="text-red-600 font-semibold">- Fee</span>
          </div>
          <div className="pt-2 border-t border-[#EADCDD] flex items-center justify-between font-bold text-accent-se">
            <span>= Rent Money to Share with You</span>
            <span className="text-sm">Paid into your wallet on the 1st of every month</span>
          </div>
        </div>
      </div>

      {/* Rental Payout History */}
      <div className="glass p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-base text-[#1A080C]">Simulated Monthly Distribution Ledger</h3>

        <div className="overflow-x-auto">
          <table className="table-glass text-xs">
            <thead>
              <tr>
                <th>Date</th>
                <th>Property</th>
                <th>Eligible Shares</th>
                <th>Payout / Share</th>
                <th>Net Received</th>
                <th className="text-right">Reference</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((p) => (
                <tr key={p.id}>
                  <td className="text-secondary-se">{p.payoutDate}</td>
                  <td className="font-bold text-[#1A080C]">{p.propertyTitle}</td>
                  <td className="text-secondary-se">{p.sharesEligible} shares</td>
                  <td className="font-semibold text-[#1A080C]">${p.payoutPerShare}</td>
                  <td className="font-black text-accent-se">+${p.totalReceived.toFixed(2)}</td>
                  <td className="text-right text-[11px] font-mono text-muted-se">{p.referenceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Transactions Ledger */}
      <div className="glass p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--se-glass-border-soft)]">
          <h3 className="font-bold text-base text-[#1A080C]">Complete Transaction Ledger</h3>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {(["ALL", "BUY", "SELL", "RENT_PAYOUT", "DEPOSIT", "WITHDRAW"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  filterType === t
                    ? "btn-primary shadow-sm"
                    : "bg-[#FAF5F5] border border-[#EADCDD] text-secondary-se hover:bg-[#F2E8E9]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[var(--se-glass-border-soft)]">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    tx.type === "BUY"
                      ? "bg-[#FAF5F5] text-[#3B0F18] border border-[#EADCDD]"
                      : tx.type === "RENT_PAYOUT"
                      ? "badge-success"
                      : tx.type === "DEPOSIT"
                      ? "badge-info"
                      : "badge-warning"
                  }`}
                >
                  {tx.type === "BUY" ? "BUY" : tx.type === "RENT_PAYOUT" ? "DIV" : tx.type.slice(0, 3)}
                </div>
                <div>
                  <div className="font-bold text-[#1A080C]">{tx.propertyTitle || "Wallet Operation"}</div>
                  <div className="text-[11px] text-muted-se">
                    {tx.timestamp} • Code: {tx.referenceCode}
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
                  {tx.type === "BUY" || tx.type === "WITHDRAW" ? "-" : "+"}${tx.amount.toLocaleString()}
                </div>
                <span className="badge badge-success text-[10px]">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Deposit Funds */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="modal-glass p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-[#1A080C]">Deposit Demo Funds</h3>
            <p className="text-xs text-secondary-se">
              Simulate adding balance to your demo investor wallet.
            </p>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-1">
                <label className="se-label text-xs font-bold text-[#1A080C]">Amount ($)</label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="input text-base font-bold text-[#1A080C]"
                />
              </div>

              {/* Quick Chips */}
              <div className="flex gap-2">
                {[1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className="flex-1 py-1.5 rounded-lg bg-[#FAF5F5] border border-[#EADCDD] text-secondary-se hover:text-[#1A080C] text-xs font-semibold"
                  >
                    +${amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDepositModalOpen(false)}
                  className="btn btn-secondary flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="modal-glass p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-[#1A080C]">Withdraw Demo Cash</h3>
            <p className="text-xs text-secondary-se">
              Available balance: <strong className="text-[#1A080C]">${walletBalance.toLocaleString()}</strong>
            </p>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-1">
                <label className="se-label text-xs font-bold text-[#1A080C]">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  min="50"
                  max={walletBalance}
                  step="50"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="input text-base font-bold text-[#1A080C]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="btn btn-secondary flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger flex-1 text-xs font-bold"
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
