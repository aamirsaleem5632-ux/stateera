"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Coins,
  Wallet,
  Sparkles,
  BarChart2,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InfoTooltip } from "@/components/common/InfoTooltip";

export default function TradePropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { properties, walletBalance, holdings, buyShares, sellShares } = useDemo();
  const { t, dir } = useLanguage();

  const property = properties.find((p) => p.id === propertyId) || properties[0];

  // User holdings for this property
  const currentHolding = holdings.find((h) => h.propertyId === property.id);
  const sharesOwned = currentHolding ? currentHolding.sharesOwned : 0;

  // Order State
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"Market" | "Limit">("Market");
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(property.sharePrice);
  const [timeframe, setTimeframe] = useState<"5m" | "15m" | "30m" | "4h" | "1D" | "1M">("1D");
  const [chartType, setChartType] = useState<"area" | "candle">("area");
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setChartReady(true);
  }, []);

  // Feedback Modal & Alerts
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Computed Values
  const effectivePrice = orderType === "Market" ? property.sharePrice : limitPrice;
  const orderTotalValue = quantity * effectivePrice;
  const estMonthlyRentalIncome = quantity * property.monthlyPerShareRent;

  // Chart data points per timeframe
  const priceChartData = useMemo(() => {
    const base = property.sharePrice;
    if (timeframe === "5m") {
      return [
        { time: "10:00", price: base - 0.8 },
        { time: "10:05", price: base - 0.4 },
        { time: "10:10", price: base - 0.2 },
        { time: "10:15", price: base + 0.3 },
        { time: "10:20", price: base },
      ];
    }
    if (timeframe === "15m") {
      return [
        { time: "09:00", price: base - 1.2 },
        { time: "09:15", price: base - 0.8 },
        { time: "09:30", price: base - 0.3 },
        { time: "09:45", price: base + 0.5 },
        { time: "10:00", price: base },
      ];
    }
    if (timeframe === "4h") {
      return [
        { time: "Mon", price: base - 2.5 },
        { time: "Tue", price: base - 1.8 },
        { time: "Wed", price: base - 0.5 },
        { time: "Thu", price: base + 0.8 },
        { time: "Fri", price: base },
      ];
    }
    // Default 1D / 1M
    return [
      { time: "May", price: Number((base * 0.94).toFixed(2)) },
      { time: "Jun", price: Number((base * 0.96).toFixed(2)) },
      { time: "Jul", price: Number((base * 0.97).toFixed(2)) },
      { time: "Aug", price: Number((base * 0.985).toFixed(2)) },
      { time: "Sep", price: Number((base * 0.99).toFixed(2)) },
      { time: "Oct", price: Number((base * 0.995).toFixed(2)) },
      { time: "Nov", price: base },
    ];
  }, [property.sharePrice, timeframe]);

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderSide === "BUY") {
      const res = buyShares(property.id, Number(quantity), orderType);
      setFeedback(res);
    } else {
      const res = sellShares(property.id, Number(quantity));
      setFeedback(res);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <Link href="/explore" className="text-[#8782A3] hover:text-[#7C4DFF]">Explore</Link>
            <span className="text-[#8782A3]">/</span>
            <span className="text-[#7C4DFF] font-semibold">Buy & Sell Shares</span>
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Buy & Sell Property Shares
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Pick how many shares you want to buy or sell. Real math with zero financial risk.
          </p>
        </div>

        {/* Property Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#8782A3]">Choose Property:</label>
          <select
            value={property.id}
            onChange={(e) => router.push(`/trade/${e.target.value}`)}
            aria-label="Choose Property"
            className="bg-white border border-[#E6D8F5] text-xs font-bold text-[#1E1B4B] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:border-[#7C4DFF]"
          >
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} (${p.sharePrice} / share)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-[#F3EAFC] to-[#DCFCE7]/40 border border-[#E6D8F5] flex items-center justify-between gap-3 text-xs text-[#5B3A8C]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong>Next Step:</strong> Choose <strong>"Buy Shares"</strong> or <strong>"Sell Shares"</strong> on the right, type your quantity, and click the purple button to test.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-[#7C4DFF] hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>Market vs Limit Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Main Grid: Chart & Asset Info on Left (8), Order Card on Right (4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Asset Price Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F3EAFC]">
                <Image src={property.coverImage} alt={property.title} fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF]">
                  {property.category}
                </span>
                <h2 className="text-xl font-bold text-[#1E1B4B] line-clamp-1">{property.title}</h2>
                <div className="text-xs text-[#8782A3]">{property.city}, {property.country}</div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-[#8782A3]">Current Share Price</span>
              <div className="text-3xl font-black text-[#1E1B4B]">${property.sharePrice.toFixed(2)}</div>
              <span className="text-xs font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded-full inline-block mt-0.5">
                +{property.netYield}% Net Rental Yield
              </span>
            </div>
          </div>

          {/* Interactive Trading Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
            {/* Chart Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F3EAFC]">
              {/* Timeframes */}
              <div className="flex items-center gap-1 bg-[#F8F4FD] p-1 rounded-xl border border-[#E6D8F5]">
                {(["5m", "15m", "30m", "4h", "1D", "1M"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeframe === tf
                        ? "bg-[#7C4DFF] text-white shadow-sm"
                        : "text-[#585375] hover:text-[#7C4DFF]"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Mode */}
              <div className="flex items-center gap-1.5 text-xs text-[#585375]">
                <button
                  onClick={() => setChartType("area")}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${
                    chartType === "area" ? "bg-[#F3EAFC] text-[#7C4DFF]" : "text-[#8782A3]"
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType("candle")}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${
                    chartType === "candle" ? "bg-[#F3EAFC] text-[#7C4DFF]" : "text-[#8782A3]"
                  }`}
                >
                  Candle Simulation
                </button>
              </div>
            </div>

            {/* Recharts Area Container */}
            <div className="h-72 w-full pt-4">
              {chartReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceChartData}>
                    <defs>
                      <linearGradient id="tradePriceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#8782A3" fontSize={11} />
                    <YAxis stroke="#8782A3" fontSize={11} domain={["auto", "auto"]} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      formatter={(v: any) => [`$${v}`, "Share Price"]}
                      contentStyle={{
                        backgroundColor: "#1E1B4B",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#7C4DFF"
                      strokeWidth={2.5}
                      fill="url(#tradePriceGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col justify-end relative bg-gradient-to-t from-[#F3EAFC]/50 to-transparent rounded-2xl p-4 overflow-hidden border border-[#E6D8F5]">
                  <svg className="w-full h-40" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="fallbackGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C4DFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,130 Q100,100 200,110 T350,60 T500,40 L500,150 L0,150 Z" fill="url(#fallbackGrad)" />
                    <path d="M0,130 Q100,100 200,110 T350,60 T500,40" fill="none" stroke="#7C4DFF" strokeWidth="3" />
                  </svg>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B3A8C] border border-[#E6D8F5]">
                    Share Price: ${property.sharePrice.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#8782A3] pt-2">
              <span>Market Cap: ${(property.totalValuation).toLocaleString()}</span>
              <span>Available Shares: {property.availableShares.toLocaleString()}</span>
              <span>Total Shares: {property.totalShares.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Execution Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-card space-y-5">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F8F4FD] border border-[#E6D8F5] rounded-2xl">
              <button
                type="button"
                onClick={() => setOrderSide("BUY")}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  orderSide === "BUY" ? "bg-[#7C4DFF] text-white shadow-sm" : "text-[#585375]"
                }`}
              >
                Buy Shares
              </button>
              <button
                type="button"
                onClick={() => setOrderSide("SELL")}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  orderSide === "SELL" ? "bg-red-500 text-white shadow-sm" : "text-[#585375]"
                }`}
              >
                Sell Shares
              </button>
            </div>

            {/* Wallet & Holding Status */}
            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5] text-xs space-y-1">
              <div className="flex justify-between text-[#585375]">
                <span>Demo Cash Balance:</span>
                <strong className="text-emerald-700 font-bold">${walletBalance.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-[#585375]">
                <span>Shares You Own:</span>
                <strong className="text-[#1E1B4B]">{sharesOwned} shares</strong>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleExecuteOrder} className="space-y-4">
              {/* Order Type */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <label className="text-xs font-bold text-[#1E1B4B]">How do you want to set the price?</label>
                  <InfoTooltip termId="market-order" size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType("Market")}
                    className={`py-2 px-2 rounded-xl font-semibold border flex items-center justify-center gap-1 ${
                      orderType === "Market"
                        ? "border-[#7C4DFF] bg-[#F3EAFC] text-[#7C4DFF]"
                        : "border-[#E6D8F5] text-[#585375]"
                    }`}
                  >
                    <span>Today's Price</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("Limit")}
                    className={`py-2 px-2 rounded-xl font-semibold border flex items-center justify-center gap-1 ${
                      orderType === "Limit"
                        ? "border-[#7C4DFF] bg-[#F3EAFC] text-[#7C4DFF]"
                        : "border-[#E6D8F5] text-[#585375]"
                    }`}
                  >
                    <span>Only at My Price</span>
                  </button>
                </div>
              </div>

              {/* Limit Price Input (if limit) */}
              {orderType === "Limit" && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <label className="text-xs font-bold text-[#1E1B4B]">My Maximum Price per Share ($)</label>
                    <InfoTooltip termId="limit-order" size="sm" />
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C4DFF]"
                  />
                  <p className="text-[10px] text-[#8782A3]">We will only buy if the price is at or below this amount.</p>
                </div>
              )}

              {/* Share Quantity */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <label className="font-bold text-[#1E1B4B]">How many shares?</label>
                    <InfoTooltip termId="fractional-shares" size="sm" />
                  </div>
                  <span className="text-[#8782A3]">Max: {orderSide === "BUY" ? property.availableShares : sharesOwned}</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max={orderSide === "BUY" ? property.availableShares : sharesOwned}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C4DFF]"
                />
              </div>

              {/* Order Calculations */}
              <div className="p-3 bg-[#F3EAFC]/70 rounded-xl border border-[#E6D8F5] text-xs space-y-1.5">
                <div className="flex justify-between text-[#585375]">
                  <span>Total {orderSide === "BUY" ? "Cost" : "You Receive"}:</span>
                  <strong className="text-sm font-black text-[#1E1B4B]">${orderTotalValue.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-[#585375]">
                  <span>Estimated Monthly Rent:</span>
                  <strong className="text-emerald-700 font-bold">
                    {orderSide === "BUY" ? "+" : "-"}${estMonthlyRentalIncome.toFixed(2)} / mo
                  </strong>
                </div>
              </div>

              {/* Execute Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all ${
                  orderSide === "BUY"
                    ? "bg-[#7C4DFF] hover:bg-[#6C3CE9]"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {orderSide === "BUY"
                  ? `Complete Order: Buy ${quantity} Shares`
                  : `Complete Order: Sell ${quantity} Shares`}
              </button>
            </form>

            {/* Feedback Alert */}
            {feedback && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2 border ${
                  feedback.success
                    ? "bg-mint border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">{feedback.success ? "Success" : "Error"}</div>
                  <div>{feedback.message}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
