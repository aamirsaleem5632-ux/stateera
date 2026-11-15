"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  TrendingUp,
  Bookmark,
  Share2,
  ShieldCheck,
  Building,
  Calendar,
  DollarSign,
  Percent,
  CheckCircle2,
  FileText,
  AlertCircle,
  Download,
  Eye,
  Sparkles,
  ArrowRight,
  Bot,
  Layers,
  ChevronRight,
  Clock,
  Briefcase,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DueDiligenceStatus } from "@/types/property";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { properties, isWatchlisted, toggleWatchlist, walletBalance } = useDemo();
  const { t, dir } = useLanguage();

  const property = properties.find((p) => p.id === propertyId) || properties[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "due-diligence" | "financials" | "manager">("overview");

  // Share Notification
  const [copiedShare, setCopiedShare] = useState(false);

  const isSaved = isWatchlisted(property.id);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  // Valuation Chart Data (Combines Historical + AI Forecast)
  const combinedValuationChartData = [
    ...property.valuationHistory.map((h) => ({
      name: h.date,
      historical: h.value,
      forecast: null,
      sharePrice: h.sharePrice,
    })),
    ...property.aiForecast.map((f) => ({
      name: f.month,
      historical: null,
      forecast: f.mid,
      sharePrice: Number((f.mid / property.totalShares).toFixed(2)),
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir={dir}>
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-[#585375]">
          <Link href="/" className="hover:text-[#7C4DFF]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl-flip" />
          <Link href="/explore" className="hover:text-[#7C4DFF]">Explore</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl-flip" />
          <span className="font-semibold text-[#1E1B4B] truncate max-w-xs">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6D8F5] text-xs font-semibold text-[#585375] hover:border-[#7C4DFF] hover:text-[#7C4DFF] shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? "Link Copied!" : "Share"}</span>
          </button>
          <button
            onClick={() => toggleWatchlist(property.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm ${
              isSaved
                ? "bg-[#7C4DFF] text-white border-[#7C4DFF]"
                : "bg-white text-[#585375] border-[#E6D8F5] hover:border-[#7C4DFF]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Location Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#F3EAFC] text-[#5B3A8C]">
            {property.category}
          </span>
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-mint text-emerald-900">
            {property.status === "active" ? "Active Offering" : "Funded"}
          </span>
          <span className="text-xs text-[#8782A3] flex items-center gap-1">
            <Building className="w-3.5 h-3.5" />
            Developer: <strong>{property.developer}</strong>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] tracking-tight">
          {property.title}
        </h1>
        <div className="flex items-center gap-1.5 text-sm text-[#585375] mt-2">
          <MapPin className="w-4 h-4 text-[#7C4DFF]" />
          <span>{property.address}</span>
        </div>
      </div>

      {/* Interactive Multi-Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
        {/* Main Large Display Image */}
        <div className="lg:col-span-9 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-card border border-[#E6D8F5] bg-[#F3EAFC]">
          <Image
            src={property.galleryImages[activeImageIndex] || property.coverImage}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#1E1B4B]/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-mint" />
            <span>Due Diligence Score: {property.dueDiligenceScore}/100</span>
          </div>
        </div>

        {/* Thumbnails Column */}
        <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {property.galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/10] lg:aspect-auto lg:h-28 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 w-32 sm:w-40 lg:w-full ${
                activeImageIndex === idx ? "border-[#7C4DFF] ring-2 ring-[#7C4DFF]/30 scale-[1.02]" : "border-[#E6D8F5] opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Details / Charts / Due Diligence on Left, Buy Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E6D8F5] pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview & Forecasts" },
              { id: "due-diligence", label: "Due Diligence Centre" },
              { id: "financials", label: "Rental History & NOI" },
              { id: "manager", label: "Asset Manager & Tenants" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#7C4DFF] text-white shadow-sm"
                    : "text-[#585375] hover:bg-[#F3EAFC]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & AI FORECASTS */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
                <h3 className="text-xl font-bold text-[#1E1B4B]">Property Description</h3>
                <p className="text-sm text-[#585375] leading-relaxed">
                  {property.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#F3EAFC] text-xs">
                  <div>
                    <span className="text-[#8782A3] block">Year Built</span>
                    <strong className="text-[#1E1B4B] text-sm">{property.yearBuilt}</strong>
                  </div>
                  <div>
                    <span className="text-[#8782A3] block">Total Area</span>
                    <strong className="text-[#1E1B4B] text-sm">{property.totalAreaSqFt.toLocaleString()} sq ft</strong>
                  </div>
                  <div>
                    <span className="text-[#8782A3] block">Total Units</span>
                    <strong className="text-[#1E1B4B] text-sm">{property.tenantMetrics.totalUnits} Units</strong>
                  </div>
                  <div>
                    <span className="text-[#8782A3] block">Occupancy Rate</span>
                    <strong className="text-emerald-700 text-sm font-bold">{property.occupancyRate}%</strong>
                  </div>
                </div>
              </div>

              {/* AI Valuation & Forecast Chart */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3EAFC]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#1E1B4B]">
                        Historical Valuation & AI Forecast
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint text-emerald-900">
                        {property.aiValuationConfidence}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-[#585375]">
                      Algorithmic pricing based on 40+ macroeconomic and municipal real estate indicators.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#8782A3]">Current AI Valuation</span>
                    <div className="text-xl font-black text-[#7C4DFF]">
                      ${property.aiEstimatedValuation.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={combinedValuationChartData}>
                      <defs>
                        <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5B3A8C" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#5B3A8C" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#8782A3" fontSize={11} />
                      <YAxis
                        stroke="#8782A3"
                        fontSize={11}
                        domain={["auto", "auto"]}
                        tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip
                        formatter={(val: any) => [`$${val?.toLocaleString()}`, "Valuation"]}
                        contentStyle={{
                          backgroundColor: "#1E1B4B",
                          borderRadius: "0.75rem",
                          color: "#fff",
                          border: "none",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="historical"
                        stroke="#7C4DFF"
                        strokeWidth={2.5}
                        fill="url(#histGrad)"
                        name="Historical Valuation"
                      />
                      <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="#5B3A8C"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="url(#foreGrad)"
                        name="AI 6-Month Projection"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[11px] text-[#8782A3] text-center pt-2">
                  *Illustrative simulation forecast. Past performance does not guarantee future valuation growth.
                </div>
              </div>

              {/* Market Drivers Scores */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
                <h3 className="text-lg font-bold text-[#1E1B4B]">AI Market Drivers & Health Scores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Location & Prime District Demand", score: property.marketDrivers.locationDemand },
                    { label: "Secondary Market Trading Momentum", score: property.marketDrivers.marketMomentum },
                    { label: "Physical Structural Condition", score: property.marketDrivers.propertyCondition },
                    { label: "Tenant Rental Demand & Absorption", score: property.marketDrivers.rentalDemand },
                  ].map((d, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#F8F4FD] border border-[#E6D8F5] space-y-2">
                      <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
                        <span>{d.label}</span>
                        <span className="text-[#7C4DFF]">{d.score} / 100</span>
                      </div>
                      <div className="w-full bg-[#E6D8F5] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#7C4DFF] h-full rounded-full"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DUE DILIGENCE CENTRE */}
          {activeTab === "due-diligence" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E1B4B]">Due Diligence & Title Verification</h3>
                    <p className="text-xs text-[#585375]">
                      Every document is audited by third-party legal, engineering, and accounting firms.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-800 bg-mint px-3 py-1 rounded-full">
                      Overall Audit: {property.dueDiligenceScore}%
                    </span>
                  </div>
                </div>

                {/* Due Diligence Checklist Table */}
                <div className="divide-y divide-[#E6D8F5]">
                  {property.dueDiligenceItems.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F3EAFC] text-[#5B3A8C]">
                            {item.category}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1E1B4B]">{item.title}</h4>
                        <p className="text-xs text-[#585375]">{item.notes}</p>
                        <div className="text-[11px] text-[#8782A3]">
                          Issuer: <strong>{item.issuer}</strong> • Verified: {item.verifiedDate}
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Simulated Download: ${item.title} (${item.fileSize || "PDF"})`)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#5B3A8C] border border-[#E6D8F5] text-xs font-semibold whitespace-nowrap transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#7C4DFF]" />
                        <span>Inspect {item.fileSize}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS & NOI */}
          {activeTab === "financials" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-6">
                <h3 className="text-xl font-bold text-[#1E1B4B]">
                  Monthly Rental Collections & Distributions
                </h3>

                {/* Rental History Bar Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={property.rentalHistory}>
                      <XAxis dataKey="month" stroke="#8782A3" fontSize={11} />
                      <YAxis stroke="#8782A3" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1E1B4B",
                          borderRadius: "0.75rem",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="grossCollected" name="Gross Rent" fill="#7C4DFF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="netDistributed" name="Net Distributable Rent" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Operating Expense Breakdown */}
                <div className="pt-4 border-t border-[#F3EAFC] space-y-3">
                  <h4 className="text-sm font-bold text-[#1E1B4B]">Annual Operating Expense Assumptions</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Property Tax</span>
                      <strong className="text-[#1E1B4B]">${property.operatingExpenses.propertyTaxAnnual.toLocaleString()}</strong>
                    </div>
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Insurance</span>
                      <strong className="text-[#1E1B4B]">${property.operatingExpenses.insuranceAnnual.toLocaleString()}</strong>
                    </div>
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Maintenance</span>
                      <strong className="text-[#1E1B4B]">${property.operatingExpenses.maintenanceAnnual.toLocaleString()}</strong>
                    </div>
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Management Fee</span>
                      <strong className="text-[#1E1B4B]">{(property.operatingExpenses.managementFeeRate * 100).toFixed(1)}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASSET MANAGER & TENANTS */}
          {activeTab === "manager" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-6">
                <h3 className="text-xl font-bold text-[#1E1B4B]">Assigned Property Manager</h3>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F4FD] border border-[#E6D8F5]">
                  <div className="w-14 h-14 rounded-2xl bg-[#7C4DFF] text-white flex items-center justify-center text-xl font-bold">
                    {property.assignedManager.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#1E1B4B]">{property.assignedManager.name}</h4>
                    <p className="text-xs text-[#585375]">{property.assignedManager.company}</p>
                    <div className="text-xs text-amber-600 font-bold mt-1">
                      ★ {property.assignedManager.rating} / 5.0 Rating • Phone: {property.assignedManager.phone}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-[#1E1B4B]">Tenant Covenants & Stability</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Average Lease Duration</span>
                      <strong className="text-[#1E1B4B]">{property.tenantMetrics.avgLeaseMonths} Months</strong>
                    </div>
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">On-Time Payment History</span>
                      <strong className="text-emerald-700 font-bold">{property.tenantMetrics.onTimePaymentRate}%</strong>
                    </div>
                    <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                      <span className="text-[#8782A3] block">Next Payout Date</span>
                      <strong className="text-[#7C4DFF] font-bold">{property.nextPayoutDate}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Investment Summary Card (Sticky) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8782A3]">Fractional Share Price</span>
                <div className="text-3xl font-black text-[#1E1B4B]">${property.sharePrice}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-mint px-2.5 py-1 rounded-lg">
                  {property.netYield}% Net Yield
                </span>
                <div className="text-[11px] text-[#8782A3] mt-1">{property.grossYield}% Gross</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2 text-xs text-[#585375]">
              <div className="flex justify-between">
                <span>Total Asset Valuation:</span>
                <strong className="text-[#1E1B4B]">${property.totalValuation.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Available Shares:</span>
                <strong className="text-[#7C4DFF]">{property.availableShares.toLocaleString()} / {property.totalShares.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rent / Share:</span>
                <strong className="text-emerald-700">${property.monthlyPerShareRent.toFixed(3)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Next Dividend Payout:</span>
                <strong className="text-[#1E1B4B]">{property.nextPayoutDate}</strong>
              </div>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#585375]">Funding Progress</span>
                <strong className="text-[#7C4DFF]">{property.fundedPercentage}%</strong>
              </div>
              <div className="w-full bg-[#E6D8F5] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#7C4DFF] h-full" style={{ width: `${property.fundedPercentage}%` }} />
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 space-y-2.5">
              <Link
                href={`/trade/${property.id}`}
                className="w-full py-3.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Buy Shares on Exchange</span>
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>

              <Link
                href={`/simulator`}
                className="w-full py-2.5 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] font-semibold text-xs transition-colors text-center block"
              >
                Run Investment Scenario Simulation
              </Link>
            </div>

            <div className="pt-3 border-t border-[#F3EAFC] text-[11px] text-[#8782A3] flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Simulated Prototype • 100% Escrow Backed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
