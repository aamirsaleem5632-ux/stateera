"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Coins,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

export default function FeesAndReturnsPage() {
  const [calcPropertyPrice, setCalcPropertyPrice] = useState<number>(100000);
  const [calcGrossRate, setCalcGrossRate] = useState<number>(10.5);

  const annualGrossRent = (calcPropertyPrice * (calcGrossRate / 100));
  const propertyTax = annualGrossRent * 0.05;
  const insurance = annualGrossRent * 0.03;
  const maintenanceReserve = annualGrossRent * 0.04;
  const managementFee = annualGrossRent * 0.075;
  const totalDeductions = propertyTax + insurance + maintenanceReserve + managementFee;
  const netAnnualRent = annualGrossRent - totalDeductions;
  const netYieldPercent = ((netAnnualRent / calcPropertyPrice) * 100).toFixed(2);

  const feeSchedule = [
    {
      category: "Acquisition & Tokenization Fee",
      rate: "1.5% – 2.0%",
      frequency: "One-time at listing",
      payer: "Built into initial property valuation",
      description: "Covers independent engineering audits (Bureau Veritas), government deed registration, legal counsel SPV incorporation, and digital passport creation. Never billed to the investor directly.",
    },
    {
      category: "Ongoing Property Management Fee",
      rate: "7.5% – 8.5%",
      frequency: "Monthly, deducted from collected rent",
      payer: "Tenant rent proceeds (OpEx)",
      description: "Paid directly to on-ground licensed property managers (CBRE, Savills, Asteco) for tenant leasing, inspections, 24/7 emergency dispatch, and rent collection.",
    },
    {
      category: "Secondary Market Trading Fee",
      rate: "0.50%",
      frequency: "Per executed trade",
      payer: "Seller upon share liquidation",
      description: "Supports secondary marketplace matching engines, escrow settlement, and immediate digital ledger reconciliation. Free for share buyers.",
    },
    {
      category: "Wallet Deposit & Withdrawal",
      rate: "0.00% (FREE)",
      frequency: "Always free on StateEra",
      payer: "Covered by StateEra",
      description: "We charge zero platform deposit or withdrawal fees. Standard third-party bank wire network fees may apply depending on your financial institution.",
    },
    {
      category: "Account Custody & Inactivity",
      rate: "$0.00 (Zero)",
      frequency: "Never charged",
      payer: "N/A",
      description: "No monthly account maintenance, subscription, inactivity, or custody fees. You retain 100% of your fractional share holdings indefinitely.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Percent className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Radical Fee Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Fees &amp; Returns Methodology
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          No hidden fine print. We outline every single deduction that occurs between tenant rent payment and your monthly wallet payout.
        </p>
      </div>

      {/* Interactive Yield Math Breakdown Box */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-bold text-[#1A080C]">
            How Gross Yield Translates to Net Monthly Cashflow
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4A4E]">
            Inspect the exact mathematical model used to calculate monthly payouts for every property in the StateEra catalogue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1A080C] mb-1">
                <span>Sample Portfolio Investment:</span>
                <span className="text-[#3B0F18] font-bold text-sm">${calcPropertyPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="5000"
                value={calcPropertyPrice}
                onChange={(e) => setCalcPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-white border border-[#EADCDD] rounded-lg appearance-none accent-[#3B0F18] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1A080C] mb-1">
                <span>Tenant Contract Gross Rent Yield:</span>
                <span className="text-[#3B0F18] font-bold text-sm">{calcGrossRate}%</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="14.0"
                step="0.5"
                value={calcGrossRate}
                onChange={(e) => setCalcGrossRate(Number(e.target.value))}
                className="w-full h-2 bg-white border border-[#EADCDD] rounded-lg appearance-none accent-[#3B0F18] cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#EADCDD] rounded-2xl p-6 space-y-3 shadow-sm">
            <span className="text-xs font-bold text-[#8C7B7F] uppercase tracking-wider block">
              Annual Financial Breakdown
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#1A080C] font-semibold">
                <span>Gross Rental Income Collected:</span>
                <span className="font-bold text-sm">${annualGrossRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[#5E4A4E]">
                <span>- Property Tax &amp; Municipal Assessments (5%):</span>
                <span>-${propertyTax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-[#5E4A4E]">
                <span>- Insurance Policy Premium (3%):</span>
                <span>-${insurance.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-[#5E4A4E]">
                <span>- Sinking Fund / Maintenance Reserve (4%):</span>
                <span>-${maintenanceReserve.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-[#5E4A4E]">
                <span>- Licensed Facility Management (7.5%):</span>
                <span>-${managementFee.toFixed(0)}</span>
              </div>
              <div className="border-t border-[#EADCDD] pt-3 flex justify-between items-baseline">
                <div>
                  <strong className="text-base font-black text-[#1A080C] block">Net Annual Cashflow:</strong>
                  <span className="text-[10px] text-muted-se">Paid out on the 1st of every month</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-700">${netAnnualRent.toLocaleString()}</span>
                  <div className="text-xs font-bold text-emerald-800">~{netYieldPercent}% Net Yield</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Fee Schedule Table */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1A080C]">Complete Fee Schedule</h2>
          <p className="text-xs text-[#5E4A4E]">All platform and operational fees transparently codified.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[#EADCDD] shadow-sm bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF5F5] border-b border-[#EADCDD] text-[#1A080C] font-bold">
              <tr>
                <th className="p-4 sm:p-5">Fee Category</th>
                <th className="p-4 sm:p-5">Rate</th>
                <th className="p-4 sm:p-5">Frequency</th>
                <th className="p-4 sm:p-5">Paid By</th>
                <th className="p-4 sm:p-5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADCDD] text-[#5E4A4E]">
              {feeSchedule.map((f, i) => (
                <tr key={i} className="hover:bg-[#FAF5F5] transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#1A080C]">{f.category}</td>
                  <td className="p-4 sm:p-5 font-black text-[#3B0F18]">{f.rate}</td>
                  <td className="p-4 sm:p-5">{f.frequency}</td>
                  <td className="p-4 sm:p-5">{f.payer}</td>
                  <td className="p-4 sm:p-5 text-xs max-w-sm">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Investment Risk Disclosure */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block">Important Returns &amp; Yield Disclaimer:</strong>
          <p className="leading-relaxed">
            Rental yields and estimated property valuations are based on prevailing tenancy contracts, local occupancy patterns, and independent surveyor estimates. They are illustrative and do not represent a guarantee of future returns. Property values can fluctuate downwards as well as upwards.
          </p>
        </div>
      </div>
    </div>
  );
}
