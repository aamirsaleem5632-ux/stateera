"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Calendar,
  Building,
  Filter,
  TrendingUp,
  Coins,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ReportsPage() {
  const { properties, holdings, payoutHistory, totalPortfolioValue, monthlyEstimatedIncome } = useDemo();
  const { t, dir } = useLanguage();

  const [reportType, setReportType] = useState<"monthly" | "annual" | "custom">("monthly");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("all");
  const [period, setPeriod] = useState<string>("Q3 2026");

  // Sample Aggregated Monthly Report Data
  const monthlyReportData = [
    { month: "Jun 2026", grossRent: 142000, operatingExpenses: 21500, noi: 120500, distributions: 108450 },
    { month: "Jul 2026", grossRent: 144500, operatingExpenses: 21800, noi: 122700, distributions: 110430 },
    { month: "Aug 2026", grossRent: 145000, operatingExpenses: 22000, noi: 123000, distributions: 110700 },
    { month: "Sep 2026", grossRent: 146200, operatingExpenses: 22100, noi: 124100, distributions: 111690 },
    { month: "Oct 2026", grossRent: 147000, operatingExpenses: 22000, noi: 125000, distributions: 112500 },
  ];

  // Property-Wise Performance Comparison
  const propertyWisePerformance = properties.map((p) => ({
    name: p.city,
    grossYield: p.grossYield,
    netYield: p.netYield,
    occupancy: p.occupancyRate,
    valuationMillions: Number((p.totalValuation / 1000000).toFixed(1)),
  }));

  const exportReportCSV = () => {
    const headers = "Month,Gross Rental Income,Operating Expenses,Net Operating Income (NOI),Distributions\n";
    const rows = monthlyReportData
      .map((r) => `"${r.month}","${r.grossRent}","${r.operatingExpenses}","${r.noi}","${r.distributions}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StateEra_Financial_Report_${reportType.toUpperCase()}_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 print:p-0" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
              Audited Financials
            </span>
            <span className="text-xs text-[#8782A3]">DEMO DATA</span>
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Reports & Financial Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Consolidated statements, Net Operating Income (NOI), and investor distribution audits.
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C] hover:border-[#7C4DFF] shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4 text-[#7C4DFF]" />
            <span>Print Report</span>
          </button>
          <button
            onClick={exportReportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold shadow-md transition-colors"
          >
            <Download className="w-4 h-4 text-mint" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6D8F5] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2">
          {(["monthly", "annual", "custom"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setReportType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                reportType === t
                  ? "bg-[#7C4DFF] text-white shadow-sm"
                  : "bg-[#F8F4FD] text-[#585375] hover:bg-[#F3EAFC]"
              }`}
            >
              {t} Report
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8782A3]">Property:</span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              aria-label="Filter by Property"
              className="bg-[#F8F4FD] border border-[#E6D8F5] text-xs font-bold text-[#1E1B4B] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7C4DFF]"
            >
              <option value="all">All Managed Properties</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8782A3]">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Filter by Period"
              className="bg-[#F8F4FD] border border-[#E6D8F5] text-xs font-bold text-[#1E1B4B] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7C4DFF]"
            >
              <option value="Q3 2026">Q3 2026 (July - Sept)</option>
              <option value="Q2 2026">Q2 2026 (April - June)</option>
              <option value="Annual 2026">Full Year 2026 (Projected)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Executive Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] font-semibold uppercase">Gross Rent Collected</span>
          <div className="text-2xl font-black text-[#1E1B4B]">$724,700</div>
          <div className="text-[11px] text-emerald-600 font-bold">98.4% On-time tenant collection</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] font-semibold uppercase">Operating Expenses</span>
          <div className="text-2xl font-black text-[#585375]">$109,400</div>
          <div className="text-[11px] text-[#8782A3]">15.1% Operating Expense Ratio</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] font-semibold uppercase">Net Operating Income (NOI)</span>
          <div className="text-2xl font-black text-[#7C4DFF]">$615,300</div>
          <div className="text-[11px] text-emerald-600 font-bold">+5.2% vs previous period</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] font-semibold uppercase">Distributions Credited</span>
          <div className="text-2xl font-black text-emerald-600">$553,770</div>
          <div className="text-[11px] text-[#585375]">90% Net distributable flow</div>
        </div>
      </div>

      {/* Visual Analytics: Monthly NOI & Expenses Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
          <div>
            <h3 className="font-bold text-base text-[#1E1B4B]">
              Income, Operating Expenses & NOI Trend
            </h3>
            <p className="text-xs text-[#585375]">
              Gross tenant rent collections minus operating expenses and capital reserves.
            </p>
          </div>
          <span className="text-xs font-bold text-[#7C4DFF] bg-[#F3EAFC] px-2.5 py-1 rounded-full">
            Reconciled
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyReportData}>
              <XAxis dataKey="month" stroke="#8782A3" fontSize={11} />
              <YAxis stroke="#8782A3" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1B4B", borderRadius: "0.75rem", color: "#fff", fontSize: "12px" }}
              />
              <Legend />
              <Bar dataKey="grossRent" name="Gross Rent" fill="#7C4DFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="operatingExpenses" name="Operating Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="noi" name="Net Operating Income (NOI)" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property-Wise Yield Comparison Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <h3 className="font-bold text-base text-[#1E1B4B]">Property-Wise Annualized Yield Comparison</h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={propertyWisePerformance}>
              <XAxis dataKey="name" stroke="#8782A3" fontSize={11} />
              <YAxis stroke="#8782A3" fontSize={11} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1B4B", borderRadius: "0.75rem", color: "#fff", fontSize: "12px" }}
              />
              <Legend />
              <Bar dataKey="grossYield" name="Gross Rental Yield %" fill="#5B3A8C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netYield" name="Net Distributable Yield %" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Financial Data Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
          <h3 className="font-bold text-base text-[#1E1B4B]">Consolidated Financial Statement Table</h3>
          <span className="text-xs text-[#8782A3]">Values in USD ($)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                <th className="pb-3">Reporting Period</th>
                <th className="pb-3">Gross Collections</th>
                <th className="pb-3">Operating Expenses</th>
                <th className="pb-3">Net Operating Income (NOI)</th>
                <th className="pb-3">Investor Distributions</th>
                <th className="pb-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EAFC]">
              {monthlyReportData.map((row, i) => (
                <tr key={i} className="hover:bg-[#F8F4FD] transition-colors">
                  <td className="py-3.5 font-bold text-[#1E1B4B]">{row.month}</td>
                  <td className="py-3.5 font-semibold text-[#1E1B4B]">${row.grossRent.toLocaleString()}</td>
                  <td className="py-3.5 text-red-600 font-semibold">-${row.operatingExpenses.toLocaleString()}</td>
                  <td className="py-3.5 font-bold text-[#7C4DFF]">${row.noi.toLocaleString()}</td>
                  <td className="py-3.5 font-black text-emerald-600">+${row.distributions.toLocaleString()}</td>
                  <td className="py-3.5 text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint text-emerald-900">
                      Reconciled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
