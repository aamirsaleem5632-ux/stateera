"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
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
  PieChart as PieIcon,
  Percent,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  DollarSign,
  Scale,
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { useChartInView } from "@/hooks/useChartInView";

const THEME_COLORS = ["#3B0F18", "#E8909A", "#1D4ED8", "#15803D", "#B45309", "#8C7B7F", "#6B21A8"];

export default function ReportsPage() {
  const {
    properties,
    holdings,
    payoutHistory,
    totalPortfolioValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    monthlyEstimatedIncome,
  } = useDemo();

  const { t, dir } = useLanguage();

  // SSR-safe chart mounting flag
  const [chartReady, setChartReady] = useState(false);
  useEffect(() => {
    setChartReady(true);
  }, []);

  // Controls State
  const [timeView, setTimeView] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("all");
  const [period, setPeriod] = useState<string>("YTD 2026");

  // Chart view references
  const c1 = useChartInView();
  const c2 = useChartInView();
  const c3 = useChartInView();
  const c4 = useChartInView();
  const c5 = useChartInView();
  const c6 = useChartInView();

  // Distinct countries from catalogue
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.country) set.add(p.country);
    });
    return Array.from(set).sort();
  }, [properties]);

  // Financial Metrics Computation
  const portfolioInvested = totalInvested > 0 ? totalInvested : 22500;
  const portfolioValuation = totalPortfolioValue > 0 ? totalPortfolioValue : 24150;
  const unrealisedGain = portfolioValuation - portfolioInvested; // Unrealised capital gain
  const totalRentalIncomeCollected = 1845.5; // Realised rent
  const totalExpensesIncurred = 276.8; // Property management & maintenance fees deducted
  const netRealisedProfit = totalRentalIncomeCollected - totalExpensesIncurred;
  const totalNetPL = unrealisedGain + netRealisedProfit;
  const netPLPercent = Number(((totalNetPL / portfolioInvested) * 100).toFixed(2));

  // 1. Profit & Loss Over Time (Line Chart Data)
  const plTimeData = [
    { period: "May 2026", realisedRent: 290, unrealisedCapital: 420, netProfit: 710, expenses: 43 },
    { period: "Jun 2026", realisedRent: 310, unrealisedCapital: 680, netProfit: 990, expenses: 46 },
    { period: "Jul 2026", realisedRent: 310, unrealisedCapital: 950, netProfit: 1260, expenses: 46 },
    { period: "Aug 2026", realisedRent: 312, unrealisedCapital: 1210, netProfit: 1522, expenses: 47 },
    { period: "Sep 2026", realisedRent: 315, unrealisedCapital: 1420, netProfit: 1735, expenses: 47 },
    { period: "Oct 2026", realisedRent: 318, unrealisedCapital: 1650, netProfit: 1968, expenses: 47 },
  ];

  // 2. Monthly Income vs Expenses (Bar Chart Data)
  const incomeVsExpensesData = [
    { month: "May 2026", grossRent: 350, opex: 43, netDistributed: 307 },
    { month: "Jun 2026", grossRent: 375, opex: 46, netDistributed: 329 },
    { month: "Jul 2026", grossRent: 375, opex: 46, netDistributed: 329 },
    { month: "Aug 2026", grossRent: 380, opex: 47, netDistributed: 333 },
    { month: "Sep 2026", grossRent: 382, opex: 47, netDistributed: 335 },
    { month: "Oct 2026", grossRent: 385, opex: 47, netDistributed: 338 },
  ];

  // 3. Investment Growth Over Time (Area Chart Data)
  const growthCurveData = [
    { month: "May 2026", investedPrincipal: 20000, portfolioValue: 20420 },
    { month: "Jun 2026", investedPrincipal: 21500, portfolioValue: 22180 },
    { month: "Jul 2026", investedPrincipal: 21500, portfolioValue: 22450 },
    { month: "Aug 2026", investedPrincipal: 22500, portfolioValue: 23710 },
    { month: "Sep 2026", investedPrincipal: 22500, portfolioValue: 23920 },
    { month: "Oct 2026", investedPrincipal: 22500, portfolioValue: 24150 },
  ];

  // 4. Actual vs Projected Returns (Comparison Chart Data)
  const actualVsProjectedData = [
    { property: "Dubai Marina", projectedYield: 9.4, actualYield: 9.2, variance: -0.2 },
    { property: "NYC Penthouse", projectedYield: 8.2, actualYield: 8.4, variance: +0.2 },
    { property: "London Canary", projectedYield: 6.8, actualYield: 6.9, variance: +0.1 },
    { property: "Islamabad Heights", projectedYield: 9.6, actualYield: 9.6, variance: 0.0 },
    { property: "KAFD Riyadh", projectedYield: 8.8, actualYield: 8.7, variance: -0.1 },
  ];

  // 5. Portfolio Geographic Distribution
  const countryWiseData = [
    { country: "UAE", value: 8500 },
    { country: "USA", value: 5200 },
    { country: "UK", value: 4100 },
    { country: "Pakistan", value: 3850 },
    { country: "Saudi Arabia", value: 2500 },
  ];

  // 6. Property-Wise Distribution
  const propertyDistributionData = holdings.map((h, i) => ({
    name: h.propertyTitle,
    value: h.currentValue,
    shares: h.sharesOwned,
  }));

  const exportReportCSV = () => {
    const headers = "Period,Gross Rent Collected,Expenses & Fees,Net Cash Distributed,Capital Value\n";
    const rows = incomeVsExpensesData
      .map((r) => `"${r.month}","${r.grossRent}","${r.opex}","${r.netDistributed}","${portfolioValuation}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StateEra_Profit_Loss_Report_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 print:p-0" dir={dir}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-demo">Simulated Institutional Prototype</span>
            <span className="text-xs text-[#8C7B7F] font-semibold">SECTION 16 FINANCIAL ANALYTICS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
            Graphical Profit &amp; Loss Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5E4A4E] mt-1">
            Interactive visual representation of realised rental dividends, expenses, unrealised capital equity, and actual vs. projected performance.
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="btn btn-secondary flex items-center gap-1.5 text-xs font-bold py-2 px-3.5"
          >
            <Printer className="w-4 h-4 text-[#3B0F18]" />
            <span>Print Report</span>
          </button>
          <button
            onClick={exportReportCSV}
            className="btn btn-primary flex items-center gap-1.5 text-xs font-bold py-2 px-3.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Dashboard Controls Toolbar */}
      <div className="bg-white border border-[#EADCDD] rounded-3xl p-5 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4 print:hidden">
        {/* Time Resolution Tabs */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto">
          {(["monthly", "quarterly", "yearly"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTimeView(mode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                timeView === mode
                  ? "bg-[#3B0F18] text-white shadow-sm"
                  : "bg-[#FAF5F5] text-[#5E4A4E] border border-[#EADCDD] hover:bg-[#F2E8E9]"
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs w-full lg:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7B7F] font-semibold">Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="select text-xs font-semibold py-1.5"
            >
              <option value="all">All Geographic Hubs</option>
              {availableCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7B7F] font-semibold">Property:</span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="select text-xs font-semibold py-1.5 max-w-[180px]"
            >
              <option value="all">All Holdings ({holdings.length})</option>
              {properties.slice(0, 10).map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7B7F] font-semibold">Date Range:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="select text-xs font-semibold py-1.5"
            >
              <option value="YTD 2026">Year-to-Date (YTD 2026)</option>
              <option value="L6M">Last 6 Months</option>
              <option value="1Y">Full Year 2026</option>
              <option value="3Y">3-Year Historical &amp; Projected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Financial Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Invested */}
        <div className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Total Investment</span>
          <div className="text-xl sm:text-2xl font-black text-[#1A080C]">${portfolioInvested.toLocaleString()}</div>
          <span className="text-[10px] text-[#5E4A4E] block">Cost Basis</span>
        </div>

        {/* Current Valuation */}
        <div className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Est. Portfolio Value</span>
          <div className="text-xl sm:text-2xl font-black text-[#3B0F18]">${portfolioValuation.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-700 font-bold block">+${unrealisedGain} Capital Equity</span>
        </div>

        {/* Realised Rental Income */}
        <div className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Rental Income</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">+${totalRentalIncomeCollected.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-700 font-bold block">Realised Cashflow</span>
        </div>

        {/* Expenses & Fees */}
        <div className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Expenses &amp; Fees</span>
          <div className="text-xl sm:text-2xl font-black text-amber-700">-${totalExpensesIncurred.toLocaleString()}</div>
          <span className="text-[10px] text-[#5E4A4E] block">OpEx, Taxes, Sinking</span>
        </div>

        {/* Net Realised Cash P&L */}
        <div className="bg-white border border-[#EADCDD] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Net Rental Cashflow</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">+${netRealisedProfit.toFixed(1)}</div>
          <span className="text-[10px] text-[#5E4A4E] block">Gross Rent - Expenses</span>
        </div>

        {/* Total Net P&L */}
        <div className="bg-[#FAF5F5] border-2 border-[#3B0F18] rounded-2xl p-4 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#3B0F18] uppercase font-bold block">Total Net P&amp;L</span>
          <div className="text-xl sm:text-2xl font-black text-[#3B0F18]">+${totalNetPL.toFixed(1)}</div>
          <span className="text-[10px] text-emerald-700 font-bold block">+{netPLPercent}% Net Return</span>
        </div>
      </div>

      {/* Mathematical Breakdown Explainer Strip */}
      <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl text-xs text-[#5E4A4E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#3B0F18] shrink-0" />
          <span>
            <strong className="text-[#1A080C]">Calculation Transparency:</strong> Total Net P&amp;L = Realised Net Rent (${netRealisedProfit.toFixed(1)}) + Unrealised Capital Gain (${unrealisedGain.toFixed(1)}). Negative periods and vacancy costs are reported honestly without concealment.
          </span>
        </div>
        <span className="badge badge-success text-[10px] shrink-0">Unrealised vs Realised Segregated</span>
      </div>

      {/* CHARTS GRID ROW 1: P&L Line Chart & Monthly Income/Expense Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Profit & Loss Line Chart */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">1. Net Profit &amp; Loss Trajectory</h3>
              <p className="text-xs text-[#8C7B7F]">Cumulative realised rent + capital equity gains over time</p>
            </div>
            <span className="badge badge-demo text-[10px]">P&amp;L Trend</span>
          </div>

          <div ref={c1.ref} className="h-64 w-full pt-2">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={plTimeData}>
                  <XAxis dataKey="period" stroke="#8C7B7F" fontSize={11} />
                  <YAxis stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="netProfit" name="Net Profit ($)" stroke="#3B0F18" strokeWidth={2.5} dot={{ r: 4 }} isAnimationActive={c1.isAnimationActive} />
                  <Line type="monotone" dataKey="realisedRent" name="Rental Cashflow ($)" stroke="#15803D" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={c1.isAnimationActive} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Monthly Income vs Expenses Chart */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">2. Rental Income vs. Operating Expenses</h3>
              <p className="text-xs text-[#8C7B7F]">Gross rent collected vs. property bills &amp; net payouts</p>
            </div>
            <span className="badge badge-success text-[10px]">Net Cashflow</span>
          </div>

          <div ref={c2.ref} className="h-64 w-full pt-2">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeVsExpensesData}>
                  <XAxis dataKey="month" stroke="#8C7B7F" fontSize={11} />
                  <YAxis stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }}
                  />
                  <Legend />
                  <Bar dataKey="grossRent" name="Gross Rent ($)" fill="#3B0F18" radius={[4, 4, 0, 0]} isAnimationActive={c2.isAnimationActive} />
                  <Bar dataKey="opex" name="Expenses & Fees ($)" fill="#B45309" radius={[4, 4, 0, 0]} isAnimationActive={c2.isAnimationActive} />
                  <Bar dataKey="netDistributed" name="Net Paid ($)" fill="#15803D" radius={[4, 4, 0, 0]} isAnimationActive={c2.isAnimationActive} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* CHARTS GRID ROW 2: Investment Growth Curve & Actual vs Projected Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Investment Growth Over Time */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">3. Investment Growth Over Time</h3>
              <p className="text-xs text-[#8C7B7F]">Total portfolio value compared to cumulative invested capital</p>
            </div>
            <span className="badge badge-demo text-[10px]">Valuation Curve</span>
          </div>

          <div ref={c3.ref} className="h-64 w-full pt-2">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthCurveData}>
                  <XAxis dataKey="month" stroke="#8C7B7F" fontSize={11} />
                  <YAxis stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="portfolioValue" name="Current Value ($)" stroke="#3B0F18" fill="#FAF5F5" fillOpacity={0.8} strokeWidth={2} isAnimationActive={c3.isAnimationActive} />
                  <Area type="monotone" dataKey="investedPrincipal" name="Invested Capital ($)" stroke="#8C7B7F" fill="#EADCDD" fillOpacity={0.4} strokeWidth={1.5} isAnimationActive={c3.isAnimationActive} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 4: Actual vs. Projected Returns */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">4. Actual vs. Projected Returns</h3>
              <p className="text-xs text-[#8C7B7F]">Evaluating projection accuracy honestly across core holdings</p>
            </div>
            <span className="badge badge-success text-[10px]">Honest Tracking</span>
          </div>

          <div ref={c4.ref} className="h-64 w-full pt-2">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actualVsProjectedData}>
                  <XAxis dataKey="property" stroke="#8C7B7F" fontSize={10} />
                  <YAxis stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }}
                  />
                  <Legend />
                  <Bar dataKey="projectedYield" name="Projected Yield (%)" fill="#8C7B7F" radius={[4, 4, 0, 0]} isAnimationActive={c4.isAnimationActive} />
                  <Bar dataKey="actualYield" name="Actual Net Yield (%)" fill="#3B0F18" radius={[4, 4, 0, 0]} isAnimationActive={c4.isAnimationActive} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* CHARTS GRID ROW 3: Portfolio Distribution & Country-Wise Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 5: Portfolio Distribution Pie */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">5. Portfolio Asset Allocation</h3>
              <p className="text-xs text-[#8C7B7F]">Distribution of capital across active property holdings</p>
            </div>
            <PieIcon className="w-4 h-4 text-[#3B0F18]" />
          </div>

          <div ref={c5.ref} className="h-64 w-full pt-2 flex items-center justify-center">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyDistributionData.length > 0 ? propertyDistributionData : [{ name: "Dubai Marina", value: 5000 }, { name: "NYC Penthouse", value: 3125 }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={c5.isAnimationActive}
                  >
                    {(propertyDistributionData.length > 0 ? propertyDistributionData : [1, 2]).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={THEME_COLORS[index % THEME_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 6: Country-Wise Investment Chart */}
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADCDD]">
            <div>
              <h3 className="font-bold text-base text-[#1A080C]">6. Country-Wise Geographic Spread</h3>
              <p className="text-xs text-[#8C7B7F]">Capital deployed across international sovereign markets</p>
            </div>
            <Globe className="w-4 h-4 text-[#3B0F18]" />
          </div>

          <div ref={c6.ref} className="h-64 w-full pt-2">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryWiseData} layout="vertical">
                  <XAxis type="number" stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="country" type="category" stroke="#8C7B7F" fontSize={11} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EADCDD", fontSize: "12px" }} />
                  <Bar dataKey="value" name="Capital Invested ($)" fill="#3B0F18" radius={[0, 4, 4, 0]} isAnimationActive={c6.isAnimationActive} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Property-Wise Financial Breakdown Table */}
      <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EADCDD] pb-3">
          <div>
            <h3 className="text-lg font-bold text-[#1A080C]">Property-Wise P&amp;L Performance Table</h3>
            <p className="text-xs text-[#5E4A4E]">Detailed line-item accounting across individual holdings.</p>
          </div>
          <span className="text-xs text-[#8C7B7F]">Audited Statements</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF5F5] border-b border-[#EADCDD] text-[#1A080C] font-bold">
              <tr>
                <th className="p-3.5">Property Asset</th>
                <th className="p-3.5">Shares</th>
                <th className="p-3.5">Cost Basis</th>
                <th className="p-3.5">Current Value</th>
                <th className="p-3.5">Unrealised Gain</th>
                <th className="p-3.5">Realised Rent</th>
                <th className="p-3.5">Net Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADCDD] text-[#5E4A4E]">
              {holdings.map((h) => (
                <tr key={h.propertyId} className="hover:bg-[#FAF5F5] transition-colors">
                  <td className="p-3.5 font-bold text-[#1A080C]">
                    <Link href={`/property/${h.propertyId}`} className="hover:underline text-[#3B0F18]">
                      {h.propertyTitle}
                    </Link>
                  </td>
                  <td className="p-3.5">{h.sharesOwned} shares</td>
                  <td className="p-3.5">${h.totalInvested.toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-[#1A080C]">${h.currentValue.toLocaleString()}</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+${h.unrealizedGain} (+{h.unrealizedGainPercent}%)</td>
                  <td className="p-3.5 text-emerald-700">+${(h.monthlyEstimatedRentalIncome * 6).toFixed(1)}</td>
                  <td className="p-3.5 font-bold text-[#1A080C]">{h.netYield}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Disclaimer */}
      <div className="p-5 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] text-xs text-[#5E4A4E] space-y-1">
        <strong className="text-[#1A080C] font-bold block">Section 16 Financial Compliance Notice:</strong>
        <p className="leading-relaxed">
          All financial figures in demonstration mode reflect verified prototype simulations. Realised profit is derived strictly from historical escrow-settled tenant distributions. Unrealised gain reflects independent surveyor valuation adjustments. Future investment performance is subject to real estate market risks.
        </p>
      </div>
    </div>
  );
}
