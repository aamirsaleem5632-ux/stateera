"use client";

import React, { useState, useMemo } from "react";
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
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
import { InfoTooltip } from "@/components/common/InfoTooltip";
import Link from "next/link";
import { useChartInView } from "@/hooks/useChartInView";

export default function ScenarioSimulatorPage() {
  const { properties } = useDemo();
  const { t, dir } = useLanguage();
  const chartInView = useChartInView();

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
            <span className="badge badge-info">What-If Stress Test</span>
            <span className="text-xs text-muted-se">INTERACTIVE CALCULATOR</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            &lsquo;What If?&rsquo; Rent &amp; Risk Calculator
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Move the sliders to see what happens to your monthly rent if tenants move out or repairs cost more.
          </p>
        </div>

        <button
          onClick={resetSliders}
          className="btn btn-ghost flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Normal</span>
        </button>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="glass rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-secondary-se">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">How to use this:</strong> Drag the{" "}
            <strong className="text-[#1A080C]">&ldquo;How full is the building?&rdquo;</strong> slider down to see how your monthly rent holds up in bad times.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>What is Occupancy? Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Main Grid: Interactive Controls on Left (5 cols), Live Results on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders (5 cols) */}
        <div className="lg:col-span-5 glass rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="space-y-1 pb-3 border-b border-[#EADCDD]">
            <label className="text-xs font-bold text-muted-se uppercase">Choose a Property to Test</label>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="select text-xs font-bold"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (${p.sharePrice}/share &bull; {p.netYield}% Yearly Return)
                </option>
              ))}
            </select>
          </div>

          {/* Investment Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1A080C]">
              <div className="flex items-center gap-1">
                <span>How much to invest</span>
                <InfoTooltip termId="fractional-shares" size="sm" />
              </div>
              <span className="text-accent-se">${investmentAmount.toLocaleString()} ({scenarios.sharesCount} shares)</span>
            </div>
            <input
              type="range"
              min="100"
              max="25000"
              step="100"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[var(--se-primary)]"
            />
          </div>

          {/* Occupancy Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1A080C]">
              <div className="flex items-center gap-1">
                <span>How full is the building? (Occupancy)</span>
                <InfoTooltip termId="occupancy-rate" size="sm" />
              </div>
              <span className={occupancyRate < 80 ? "text-red-600 font-bold" : "text-emerald-700 font-bold"}>
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
              className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[var(--se-primary)]"
            />
          </div>

          {/* Rent Variation % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1A080C]">
              <span>Tenant Rent Change</span>
              <span className={rentVariationPercent < 0 ? "text-red-600 font-bold" : "text-emerald-700 font-bold"}>
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
              className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[var(--se-primary)]"
            />
          </div>

          {/* Maintenance Multiplier */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1A080C]">
              <div className="flex items-center gap-1">
                <span>Repair &amp; Maintenance Bills</span>
                <InfoTooltip termId="operating-expenses" size="sm" />
              </div>
              <span className={maintenanceMultiplier > 1.2 ? "text-red-600 font-bold" : "text-[#1A080C]"}>
                {(maintenanceMultiplier * 100).toFixed(0)}% of Normal
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={maintenanceMultiplier}
              onChange={(e) => setMaintenanceMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[var(--se-primary)]"
            />
          </div>

          {/* Management Fee Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1A080C]">
              <span>Building Manager Fee</span>
              <span className="text-accent-se font-bold">{managementFeeRate}%</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="12.0"
              step="0.5"
              value={managementFeeRate}
              onChange={(e) => setManagementFeeRate(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5F5] border border-[#EADCDD] rounded-lg appearance-none cursor-pointer accent-[var(--se-primary)]"
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
                Tough Times (Recession)
              </span>
              <div className="text-xl font-black text-red-900">
                ${scenarios.worst.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-red-700 font-semibold">
                {scenarios.worst.yield.toFixed(1)}% Yearly Return
              </div>
            </div>

            {/* Simulated Case */}
            <div className="p-4 rounded-2xl bg-white border border-[#3B0F18]/30 shadow-sm text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent-se">
                Your Custom Test
              </span>
              <div className="text-xl font-black text-[#1A080C]">
                ${scenarios.simulated.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-secondary-se font-semibold">
                {scenarios.simulated.yield.toFixed(1)}% Yearly Return
              </div>
            </div>

            {/* Best Case */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                Boom Times (100% Full)
              </span>
              <div className="text-xl font-black text-emerald-900">
                ${scenarios.best.monthly.toFixed(2)} / mo
              </div>
              <div className="text-xs text-emerald-700 font-semibold">
                {scenarios.best.yield.toFixed(1)}% Yearly Return
              </div>
            </div>
          </div>

          {/* Scenario Comparison Chart */}
          <div className="glass rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="font-bold text-base text-[#1A080C]">Estimated Yearly Rent Under Each Scenario ($)</h3>
            <div ref={chartInView.ref} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="scenario" stroke="#8C7B7F" fontSize={11} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", color: "#1A080C", fontSize: "12px", border: "1px solid #EADCDD", boxShadow: "0 4px 12px rgba(26,8,12,0.08)" }}
                  />
                  <Bar dataKey="annualIncome" fill="#3B0F18" radius={[0, 4, 4, 0]} isAnimationActive={chartInView.isAnimationActive} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Explanatory Risk Callout */}
          <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl p-4 text-xs text-[#5E4A4E] leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1A080C]">Helpful Tip: </strong>
              Empty apartments hurt your monthly rent much more than a slightly higher repair bill. That is why every property has an emergency fund set aside to protect your monthly rent even if a tenant moves out.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
