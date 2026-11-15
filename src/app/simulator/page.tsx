"use client";

import React, { useState, useMemo } from "react";
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Building,
  Coins,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ScenarioSimulatorPage() {
  const { properties } = useDemo();
  const { t, dir } = useLanguage();

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || "");
  const property = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  // Simulator Sliders
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [occupancyRate, setOccupancyRate] = useState<number>(property.occupancyRate);
  const [rentVariationPercent, setRentVariationPercent] = useState<number>(0);
  const [maintenanceMultiplier, setMaintenanceMultiplier] = useState<number>(1.0);
  const [managementFeeRate, setManagementFeeRate] = useState<number>(7.5);
  const [valuationVariationPercent, setValuationVariationPercent] = useState<number>(0);

  // Computed Scenarios
  const scenarios = useMemo(() => {
    const sharesCount = Math.floor(investmentAmount / property.sharePrice);
    const baseShareRent = property.monthlyPerShareRent;

    // BASE CASE
    const baseMonthlyRent = sharesCount * baseShareRent;
    const baseAnnualRent = baseMonthlyRent * 12;
    const baseNetYield = (baseAnnualRent / (sharesCount * property.sharePrice)) * 100;

    // SIMULATED USER CASE
    const effectiveRentFactor = (1 + rentVariationPercent / 100) * (occupancyRate / 100);
    const expenseFactor = (1 - (managementFeeRate / 100) - (0.05 * maintenanceMultiplier));
    const simulatedMonthlyRent = Math.max(0, sharesCount * baseShareRent * effectiveRentFactor * expenseFactor);
    const simulatedAnnualRent = simulatedMonthlyRent * 12;
    const simulatedNetYield = sharesCount > 0 ? (simulatedAnnualRent / (sharesCount * property.sharePrice)) * 100 : 0;

    // WORST CASE (70% Occupancy, -15% Rent, +50% Maintenance)
    const worstMonthly = Math.max(0, sharesCount * baseShareRent * 0.7 * 0.85 * (1 - 0.10 - 0.08));
    const worstAnnual = worstMonthly * 12;
    const worstYield = sharesCount > 0 ? (worstAnnual / (sharesCount * property.sharePrice)) * 100 : 0;

    // BEST CASE (100% Occupancy, +15% Rent, -20% Maintenance)
    const bestMonthly = sharesCount * baseShareRent * 1.0 * 1.15 * (1 - 0.06 - 0.03);
    const bestAnnual = bestMonthly * 12;
    const bestYield = sharesCount > 0 ? (bestAnnual / (sharesCount * property.sharePrice)) * 100 : 0;

    return {
      sharesCount,
      base: { monthly: baseMonthlyRent, annual: baseAnnualRent, yield: baseNetYield },
      simulated: { monthly: simulatedMonthlyRent, annual: simulatedAnnualRent, yield: simulatedNetYield },
      worst: { monthly: worstMonthly, annual: worstAnnual, yield: worstYield },
      best: { monthly: bestMonthly, annual: bestAnnual, yield: bestYield },
    };
  }, [
    property,
    investmentAmount,
    occupancyRate,
    rentVariationPercent,
    maintenanceMultiplier,
    managementFeeRate,
    valuationVariationPercent,
  ]);

  const chartData = [
    {
      scenario: "Worst Case (Recession / Vacancy)",
      annualIncome: Number(scenarios.worst.annual.toFixed(2)),
      netYield: Number(scenarios.worst.yield.toFixed(2)),
    },
    {
      scenario: "Current Parameter Simulation",
      annualIncome: Number(scenarios.simulated.annual.toFixed(2)),
      netYield: Number(scenarios.simulated.yield.toFixed(2)),
    },
    {
      scenario: "Base Platform Standard",
      annualIncome: Number(scenarios.base.annual.toFixed(2)),
      netYield: Number(scenarios.base.yield.toFixed(2)),
    },
    {
      scenario: "Best Case (High Demand / Full Rent)",
      annualIncome: Number(scenarios.best.annual.toFixed(2)),
      netYield: Number(scenarios.best.yield.toFixed(2)),
    },
  ];

  const resetSliders = () => {
    setInvestmentAmount(5000);
    setOccupancyRate(property.occupancyRate);
    setRentVariationPercent(0);
    setMaintenanceMultiplier(1.0);
    setManagementFeeRate(7.5);
    setValuationVariationPercent(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3EAFC] text-[#5B3A8C]">
              Deterministic Stress-Test Engine
            </span>
            <span className="text-xs text-[#8782A3]">SIMULATION TOOL</span>
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Investment Risk & Scenario Simulator
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Model economic shocks, vacancy swings, rising maintenance, and dividend impacts.
          </p>
        </div>

        <button
          onClick={resetSliders}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C] hover:border-[#7C4DFF] shadow-sm transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Main Grid: Interactive Controls on Left (5 cols), Live Results on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-5">
          <div className="space-y-1 pb-3 border-b border-[#F3EAFC]">
            <label className="text-xs font-bold text-[#8782A3] uppercase">Target Property Asset</label>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full bg-[#F8F4FD] border border-[#E6D8F5] text-xs font-bold text-[#1E1B4B] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#7C4DFF]"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (${p.sharePrice}/share • {p.netYield}% Net)
                </option>
              ))}
            </select>
          </div>

          {/* Investment Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
              <span>Investment Amount</span>
              <span className="text-[#7C4DFF]">${investmentAmount.toLocaleString()} ({scenarios.sharesCount} shares)</span>
            </div>
            <input
              type="range"
              min="100"
              max="25000"
              step="100"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
            />
          </div>

          {/* Occupancy Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
              <span>Simulated Occupancy Rate</span>
              <span className={occupancyRate < 80 ? "text-red-500" : "text-emerald-600"}>
                {occupancyRate}%
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="5"
              value={occupancyRate}
              onChange={(e) => setOccupancyRate(Number(e.target.value))}
              className="w-full h-2 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
            />
          </div>

          {/* Rent Variation % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
              <span>Market Rent Variation</span>
              <span className={rentVariationPercent < 0 ? "text-red-500" : "text-emerald-600"}>
                {rentVariationPercent > 0 ? `+${rentVariationPercent}%` : `${rentVariationPercent}%`}
              </span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="5"
              value={rentVariationPercent}
              onChange={(e) => setRentVariationPercent(Number(e.target.value))}
              className="w-full h-2 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
            />
          </div>

          {/* Maintenance Multiplier */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
              <span>Maintenance & Repairs Index</span>
              <span className={maintenanceMultiplier > 1.2 ? "text-red-500" : "text-[#1E1B4B]"}>
                {(maintenanceMultiplier * 100).toFixed(0)}% of Baseline
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={maintenanceMultiplier}
              onChange={(e) => setMaintenanceMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
            />
          </div>

          {/* Management Fee Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
              <span>Asset Management Fee</span>
              <span className="text-[#5B3A8C]">{managementFeeRate}%</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="12.0"
              step="0.5"
              value={managementFeeRate}
              onChange={(e) => setManagementFeeRate(Number(e.target.value))}
              className="w-full h-2 bg-[#E6D8F5] rounded-lg appearance-none cursor-pointer accent-[#7C4DFF]"
            />
          </div>
        </div>

        {/* Right Column: Comparative Results & Graphs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Scenario Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Worst Case */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-700">
                Worst Case Shock
              </span>
              <div className="text-xl font-black text-red-900">
                ${scenarios.worst.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-red-700 font-semibold">
                {scenarios.worst.yield.toFixed(1)}% Net Yield
              </div>
            </div>

            {/* Simulated Case */}
            <div className="p-4 rounded-2xl bg-[#F3EAFC] border border-[#E6D8F5] text-center space-y-1 ring-2 ring-[#7C4DFF]/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B3A8C]">
                Your Simulation
              </span>
              <div className="text-xl font-black text-[#7C4DFF]">
                ${scenarios.simulated.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-[#5B3A8C] font-semibold">
                {scenarios.simulated.yield.toFixed(1)}% Net Yield
              </div>
            </div>

            {/* Best Case */}
            <div className="p-4 rounded-2xl bg-mint border border-emerald-300 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                Best Case Boom
              </span>
              <div className="text-xl font-black text-emerald-900">
                ${scenarios.best.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-emerald-800 font-semibold">
                {scenarios.best.yield.toFixed(1)}% Net Yield
              </div>
            </div>
          </div>

          {/* Scenario Comparison Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
            <h3 className="font-bold text-base text-[#1E1B4B]">Projected Annual Income Comparison ($)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" stroke="#8782A3" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="scenario" stroke="#8782A3" fontSize={11} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E1B4B", borderRadius: "0.75rem", color: "#fff", fontSize: "12px" }}
                  />
                  <Bar dataKey="annualIncome" fill="#7C4DFF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Explanatory Risk Callout */}
          <div className="p-4 rounded-2xl bg-[#F8F4FD] border border-[#E6D8F5] text-xs text-[#585375] leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E1B4B]">Risk Sensitivity Insights:</strong> In real estate fractional investments, occupancy drops have a greater dollar impact on net distributions than moderate increases in maintenance costs. StateEra properties carry 100% corporate master-tenancies and mandatory 3-month escrow reserve buffers to mitigate downside shocks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
