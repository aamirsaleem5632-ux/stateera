"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { OptimizedImage } from "@/components/common/OptimizedImage";
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
import { useIsMounted } from "@/hooks/useIsMounted";

export default function TradePropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { properties, walletBalance, holdings, buyShares, sellShares } = useDemo();
  const { t, dir } = useLanguage();

  const property = properties.find((p) => p.id === propertyId);

  // User holdings for this property
  const currentHolding = holdings.find((h) => h.propertyId === property?.id);
  const sharesOwned = currentHolding ? currentHolding.sharesOwned : 0;

  // Order State
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"Market" | "Limit">("Market");
  const [quantity, setQuantity] = useState<number>(10);
  const [prevPropertyId, setPrevPropertyId] = useState<string | null>(property?.id ?? null);
  const [limitPrice, setLimitPrice] = useState<number>(property ? property.sharePrice : 100);
  const [timeframe, setTimeframe] = useState<"5m" | "15m" | "30m" | "4h" | "1D" | "1M">("1D");
  const [chartType, setChartType] = useState<"area" | "candle">("area");
  const chartReady = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync limitPrice default when property changes (render-phase state adjustment)
  const currentPropertyId = property?.id ?? null;
  if (currentPropertyId !== prevPropertyId) {
    setPrevPropertyId(currentPropertyId);
    if (property) {
      setLimitPrice(property.sharePrice);
    }
  }

  // Feedback Modal & Alerts
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Computed Values
  const effectivePrice = property ? (orderType === "Market" ? property.sharePrice : limitPrice) : 0;
  const orderTotalValue = Number.isFinite(quantity) && quantity > 0 ? quantity * effectivePrice : 0;
  const estMonthlyRentalIncome = property && Number.isFinite(quantity) && quantity > 0 ? quantity * property.monthlyPerShareRent : 0;

  // Chart data points per timeframe
  const priceChartData = useMemo(() => {
    if (!property) return [];
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
  }, [property, timeframe]);

  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center" dir={dir}>
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-8 sm:p-10 shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#1A080C] tracking-tight">
              Property Listing Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
              The property offering ID &quot;{propertyId}&quot; was not found in the catalogue. It may be invalid or unlisted.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <Link href="/explore" className="btn btn-primary text-xs font-bold py-2.5 px-6">
              Browse Available Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const numQty = Number(quantity);
    if (!Number.isFinite(numQty) || numQty <= 0 || !Number.isInteger(numQty)) {
      setFeedback({ success: false, message: "Please specify a valid whole number of shares greater than 0." });
      return;
    }

    setIsSubmitting(true);
    try {
      if (orderSide === "BUY") {
        const res = buyShares(property.id, numQty, orderType, orderType === "Limit" ? Number(limitPrice) : undefined);
        setFeedback(res);
      } else {
        const res = sellShares(property.id, numQty);
        setFeedback(res);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-se">
            <Link href="/explore" className="hover:text-accent-se">Explore</Link>
            <span>/</span>
            <span className="text-accent-se font-semibold">Buy &amp; Sell Shares</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            Buy &amp; Sell Property Shares
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Pick how many shares you want to buy or sell. Real math with zero financial risk.
          </p>
        </div>

        {/* Property Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-se">Choose Property:</label>
          <select
            value={property.id}
            onChange={(e) => router.push(`/trade/${e.target.value}`)}
            aria-label="Choose Property"
            className="select text-xs font-bold w-auto"
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
      <div className="mb-6 p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs text-[#5E4A4E]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Choose <strong>&quot;Buy Shares&quot;</strong> or <strong>&quot;Sell Shares&quot;</strong> on the right, type your quantity, and click the button to test.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>Market vs Limit Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Main Grid: Chart & Asset Info on Left (8 cols desktop, 7 cols tablet), Order Card on Right (4 cols desktop, 5 cols tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (md: 7 cols, lg: 8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          {/* Asset Price Banner */}
          <div className="glass rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#FAF5F5] border border-[#EADCDD]">
                <OptimizedImage
                  src={property.coverImage}
                  alt={property.title}
                  fill
                  priority
                  sizes="64px"
                  className="object-cover"
                  fallbackLabel={property.title}
                />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-accent-se">
                  {property.category}
                </span>
                <h2 className="text-xl font-bold text-[#1A080C] line-clamp-1">{property.title}</h2>
                <div className="text-xs text-muted-se">{property.city}, {property.country}</div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-muted-se">Current Share Price</span>
              <div className="text-3xl font-black text-[#1A080C]">${property.sharePrice.toFixed(2)}</div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
                +{property.netYield}% Net Rental Yield
              </span>
            </div>
          </div>

          {/* Interactive Trading Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADCDD] shadow-sm space-y-4">
            {/* Chart Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EADCDD]">
              {/* Timeframes */}
              <div className="flex items-center gap-1 bg-[#FAF5F5] p-1 rounded-xl border border-[#EADCDD]">
                {(["5m", "15m", "30m", "4h", "1D", "1M"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeframe === tf
                        ? "bg-[#3B0F18] text-white shadow-sm"
                        : "text-secondary-se hover:text-[#1A080C]"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Mode */}
              <div className="flex items-center gap-1.5 text-xs text-secondary-se">
                <button
                  onClick={() => setChartType("area")}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${
                    chartType === "area" ? "bg-[#FAF5F5] text-[#3B0F18] border border-[#EADCDD]" : "text-muted-se"
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType("candle")}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${
                    chartType === "candle" ? "bg-[#FAF5F5] text-[#3B0F18] border border-[#EADCDD]" : "text-muted-se"
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
                        <stop offset="5%" stopColor="#3B0F18" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3B0F18" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#8C7B7F" fontSize={11} />
                    <YAxis stroke="#8C7B7F" fontSize={11} domain={["auto", "auto"]} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      formatter={(v: any) => [`$${v}`, "Share Price"]}
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        color: "#1A080C",
                        border: "1px solid #EADCDD",
                        fontSize: "12px",
                        boxShadow: "0 4px 12px rgba(26,8,12,0.08)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#3B0F18"
                      strokeWidth={2.5}
                      fill="url(#tradePriceGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col justify-end relative bg-gradient-to-t from-[#FAF5F5] to-transparent rounded-2xl p-4 overflow-hidden border border-[#EADCDD]">
                  <svg className="w-full h-40" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="fallbackGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B0F18" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3B0F18" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,130 Q100,100 200,110 T350,60 T500,40 L500,150 L0,150 Z" fill="url(#fallbackGrad)" />
                    <path d="M0,130 Q100,100 200,110 T350,60 T500,40" fill="none" stroke="#3B0F18" strokeWidth="3" />
                  </svg>
                  <div className="absolute top-4 left-4 bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-[#1A080C] border border-[#EADCDD] shadow-sm">
                    Share Price: ${property.sharePrice.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-se pt-2 border-t border-[#EADCDD]">
              <span>Market Cap: ${(property.totalValuation).toLocaleString()}</span>
              <span>Available Shares: {property.availableShares.toLocaleString()}</span>
              <span>Total Shares: {property.totalShares.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Execution Card (md: 5 cols, lg: 4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADCDD] shadow-sm space-y-5">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl">
              <button
                type="button"
                onClick={() => setOrderSide("BUY")}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  orderSide === "BUY" ? "bg-[#3B0F18] text-white shadow-sm" : "text-secondary-se hover:text-[#1A080C]"
                }`}
              >
                Buy Shares
              </button>
              <button
                type="button"
                onClick={() => setOrderSide("SELL")}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  orderSide === "SELL" ? "bg-[#B91C1C] text-white shadow-sm" : "text-secondary-se hover:text-[#1A080C]"
                }`}
              >
                Sell Shares
              </button>
            </div>

            {/* Wallet & Holding Status */}
            <div className="p-3 bg-[#FAF5F5] rounded-xl border border-[#EADCDD] text-xs space-y-1">
              <div className="flex justify-between text-secondary-se">
                <span>Demo Cash Balance:</span>
                <strong className="text-emerald-700 font-bold">${walletBalance.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-secondary-se">
                <span>Shares You Own:</span>
                <strong className="text-[#1A080C]">{sharesOwned} shares</strong>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleExecuteOrder} className="space-y-4">
              {/* Order Type */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <label className="text-xs font-bold text-[#1A080C]">How do you want to set the price?</label>
                  <InfoTooltip termId="market-order" size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType("Market")}
                    className={`py-2 px-2 rounded-xl font-semibold border flex items-center justify-center gap-1 ${
                      orderType === "Market"
                        ? "border-[#3B0F18] bg-[#FAF5F5] text-[#3B0F18] font-bold"
                        : "border-[#EADCDD] text-secondary-se hover:bg-[#FAF5F5]"
                    }`}
                  >
                    <span>Today's Price</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("Limit")}
                    className={`py-2 px-2 rounded-xl font-semibold border flex items-center justify-center gap-1 ${
                      orderType === "Limit"
                        ? "border-[#3B0F18] bg-[#FAF5F5] text-[#3B0F18] font-bold"
                        : "border-[#EADCDD] text-secondary-se hover:bg-[#FAF5F5]"
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
                    <label className="text-xs font-bold text-[#1A080C]">My Maximum Price per Share ($)</label>
                    <InfoTooltip termId="limit-order" size="sm" />
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="input w-full px-3.5 py-2.5 text-sm font-bold text-[#1A080C]"
                  />
                  <p className="text-[10px] text-muted-se">We will only buy if the price is at or below this amount.</p>
                </div>
              )}

              {/* Share Quantity */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <label className="font-bold text-[#1A080C]">How many shares?</label>
                    <InfoTooltip termId="fractional-shares" size="sm" />
                  </div>
                  <span className="text-muted-se">Max: {orderSide === "BUY" ? property.availableShares : sharesOwned}</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max={orderSide === "BUY" ? property.availableShares : sharesOwned}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="input w-full px-3.5 py-2.5 text-sm font-bold text-[#1A080C]"
                />
              </div>

              {/* Order Calculations */}
              <div className="p-3 bg-[#FAF5F5] rounded-xl border border-[#EADCDD] text-xs space-y-1.5">
                <div className="flex justify-between text-secondary-se">
                  <span>Total {orderSide === "BUY" ? "Cost" : "You Receive"}:</span>
                  <strong className="text-sm font-black text-[#1A080C]">${orderTotalValue.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-secondary-se">
                  <span>Estimated Monthly Rent:</span>
                  <strong className="text-emerald-700 font-bold">
                    {orderSide === "BUY" ? "+" : "-"}${estMonthlyRentalIncome.toFixed(2)} / mo
                  </strong>
                </div>
              </div>

              {/* Execute Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-sm transition-all ${
                  orderSide === "BUY"
                    ? "bg-[#3B0F18] hover:bg-[#2A0A10]"
                    : "bg-[#B91C1C] hover:bg-[#991B1B]"
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
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-800"
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
