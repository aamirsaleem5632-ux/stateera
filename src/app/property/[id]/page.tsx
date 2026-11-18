"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OptimizedImage } from "@/components/common/OptimizedImage";
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
  ArrowRight,
  Bot,
  Layers,
  ChevronRight,
  Clock,
  Briefcase,
  Users,
  X,
  FileCheck,
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
import { BeginnerGuideBanner } from "@/components/common/BeginnerGuideBanner";
import { InfoTooltip } from "@/components/common/InfoTooltip";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { properties, isWatchlisted, toggleWatchlist, walletBalance } = useDemo();
  const { t, dir } = useLanguage();

  const property = properties.find((p) => p.id === propertyId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "due-diligence" | "financials" | "manager">("overview");

  // Share Notification
  const [copiedShare, setCopiedShare] = useState(false);
  const [passportModalOpen, setPassportModalOpen] = useState(false);

  const isSaved = property ? isWatchlisted(property.id) : false;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

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
              The property offering ID &quot;{propertyId}&quot; does not exist or has been removed from the platform catalogue.
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
      {/* 3-Step Beginner Explainer Strip */}
      <BeginnerGuideBanner pageName="property" />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-secondary-se">
          <Link href="/" className="hover:text-accent-se">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl-flip" />
          <Link href="/explore" className="hover:text-accent-se">Explore</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl-flip" />
          <span className="font-semibold text-[#1A080C] truncate max-w-xs">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPassportModalOpen(true)}
            className="btn btn-secondary text-xs py-1.5 px-3 min-h-[36px] border-[#3B0F18] text-[#3B0F18] font-bold flex items-center gap-1.5"
            title="Inspect Digital Property Passport"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Property Passport</span>
            <span className="badge badge-success text-[10px] py-0 px-1.5">
              {property.transparencyScore || 96}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="btn btn-secondary text-xs py-1.5 px-3 min-h-[36px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? "Link Copied!" : "Share"}</span>
          </button>
          <button
            onClick={() => toggleWatchlist(property.id)}
            className={`btn text-xs py-1.5 px-3 min-h-[36px] ${
              isSaved
                ? "btn-primary shadow-sm"
                : "btn-secondary"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="mb-6 p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs text-[#5E4A4E]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Check the safety score, review photos & rent details, then click <strong>&quot;Buy Shares&quot;</strong> on the right to test investing.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>See Simple Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Property Title & Location Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="badge badge-demo text-xs uppercase font-bold tracking-wider">
            {property.category}
          </span>
          <span className="badge badge-success text-xs uppercase font-bold tracking-wider">
            {property.status === "active" ? "Active Offering" : "Funded"}
          </span>
          <span className="text-xs text-muted-se flex items-center gap-1">
            <Building className="w-3.5 h-3.5" />
            Developer: <strong className="text-[#1A080C]">{property.developer}</strong>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A080C] tracking-tight">
          {property.title}
        </h1>
        <div className="flex items-center gap-1.5 text-sm text-secondary-se mt-2">
          <MapPin className="w-4 h-4 text-accent-se" />
          <span>{property.address}</span>
        </div>
      </div>

      {/* Interactive Multi-Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
        {/* Main Large Display Image */}
        <div className="lg:col-span-9 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden glass img-overlay bg-[#FAF5F5]">
          <OptimizedImage
            src={property.galleryImages[activeImageIndex] || property.coverImage}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover"
            fallbackLabel={property.title}
          />
          <div className="absolute top-4 left-4 bg-white/95 text-[#1A080C] border border-[#EADCDD] px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-accent-se" />
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
                activeImageIndex === idx ? "border-[var(--se-primary)] ring-2 ring-[var(--se-ring)] scale-[1.02]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <OptimizedImage
                src={img}
                alt={`${property.title} preview ${idx + 1}`}
                fill
                sizes="(max-width: 1024px) 160px, 280px"
                className="object-cover"
                fallbackLabel={`Thumbnail ${idx + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Details / Charts / Due Diligence on Left, Buy Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[var(--se-glass-border-soft)] pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview & Future Price" },
              { id: "due-diligence", label: "Property Checks (Is it safe?)" },
              { id: "financials", label: "Rent & Money Details" },
              { id: "manager", label: "Building Manager & Renters" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "btn-primary shadow-sm"
                    : "btn-ghost text-secondary-se hover:bg-[#FAF5F5]"
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
              <div className="glass p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-[#1A080C]">About This Property</h3>
                <p className="text-sm text-secondary-se leading-relaxed">
                  {property.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--se-glass-border-soft)] text-xs">
                  <div>
                    <span className="text-muted-se block">Year Built</span>
                    <strong className="text-[#1A080C] text-sm">{property.yearBuilt}</strong>
                    <span className="text-[10px] text-muted-se block">Construction year</span>
                  </div>
                  <div>
                    <span className="text-muted-se block">Total Size</span>
                    <strong className="text-[#1A080C] text-sm">{property.totalAreaSqFt.toLocaleString()} sq ft</strong>
                    <span className="text-[10px] text-muted-se block">Floor area</span>
                  </div>
                  <div>
                    <span className="text-muted-se block">Total Units</span>
                    <strong className="text-[#1A080C] text-sm">{property.tenantMetrics.totalUnits} Units</strong>
                    <span className="text-[10px] text-muted-se block">Apartments/Offices</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-se block">Rented Out</span>
                      <InfoTooltip termId="occupancy-rate" size="sm" />
                    </div>
                    <strong className="text-accent-se text-sm font-bold">{property.occupancyRate}%</strong>
                    <span className="text-[10px] text-muted-se block">Occupancy rate</span>
                  </div>
                </div>
              </div>

              {/* AI Valuation & Forecast Chart */}
              <div className="glass p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--se-glass-border-soft)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#1A080C]">
                        Past Price & AI Future Estimate
                      </h3>
                      <span className="badge badge-success text-[10px] font-bold flex items-center gap-1">
                        <span>{property.aiValuationConfidence}% Estimate Accuracy</span>
                        <InfoTooltip termId="ai-valuation-confidence" size="sm" />
                      </span>
                    </div>
                    <p className="text-xs text-secondary-se">
                      How we calculated the price: based on local sales, rent collected, and neighborhood demand.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-[10px] uppercase font-bold text-muted-se">Estimated Property Price</span>
                      <InfoTooltip termId="estimated-price" size="sm" />
                    </div>
                    <div className="text-xl font-black text-accent-se">
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
                          <stop offset="5%" stopColor="#3B0F18" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#3B0F18" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E8909A" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#E8909A" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#8C7B7F" fontSize={11} />
                      <YAxis
                        stroke="#8C7B7F"
                        fontSize={11}
                        domain={["auto", "auto"]}
                        tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip
                        formatter={(val: any) => [`$${val?.toLocaleString()}`, "Valuation"]}
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
                        dataKey="historical"
                        stroke="#3B0F18"
                        strokeWidth={2.5}
                        fill="url(#histGrad)"
                        name="Historical Valuation"
                      />
                      <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="#E8909A"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="url(#foreGrad)"
                        name="AI 6-Month Projection"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[11px] text-muted-se text-center pt-2">
                  *Illustrative simulation forecast. Past performance does not guarantee future valuation growth.
                </div>
              </div>

              {/* Market Drivers Scores */}
              <div className="glass p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-[#1A080C]">AI Market Drivers & Health Scores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Location & Prime District Demand", score: property.marketDrivers.locationDemand },
                    { label: "Secondary Market Trading Momentum", score: property.marketDrivers.marketMomentum },
                    { label: "Physical Structural Condition", score: property.marketDrivers.propertyCondition },
                    { label: "Tenant Rental Demand & Absorption", score: property.marketDrivers.rentalDemand },
                  ].map((d, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] space-y-2">
                      <div className="flex justify-between text-xs font-bold text-[#1A080C]">
                        <span>{d.label}</span>
                        <span className="text-accent-se">{d.score} / 100</span>
                      </div>
                      <div className="w-full bg-[#FAF5F5] border border-[#EADCDD] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--se-primary)] h-full rounded-full"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTY CHECKS (IS IT SAFE?) */}
          {activeTab === "due-diligence" && (
            <div className="space-y-6">
              <div className="glass p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--se-glass-border-soft)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#1A080C]">Property Checks (Is It Safe?)</h3>
                      <InfoTooltip termId="property-checks" />
                    </div>
                    <p className="text-xs text-secondary-se">
                      Every document, title deed, and structural safety check is inspected by certified independent experts.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-success text-xs font-bold">
                      Safety Score: {property.dueDiligenceScore} / 100
                    </span>
                  </div>
                </div>

                {/* Due Diligence Checklist Table */}
                <div className="divide-y divide-[var(--se-glass-border-soft)]">
                  {property.dueDiligenceItems.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-demo text-[10px] uppercase font-bold tracking-wider">
                            {item.category}
                          </span>
                          <span className="badge badge-success text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1A080C]">{item.title}</h4>
                        <p className="text-xs text-secondary-se">{item.notes}</p>
                        <div className="text-[11px] text-muted-se">
                          Issuer: <strong className="text-[#1A080C]">{item.issuer}</strong> • Verified: {item.verifiedDate}
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Simulated Download: ${item.title} (${item.fileSize || "PDF"})`)}
                        className="btn btn-secondary text-xs py-2 px-3 min-h-[36px]"
                      >
                        <Download className="w-3.5 h-3.5 text-accent-se" />
                        <span>Inspect {item.fileSize}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS & MONEY DETAILS */}
          {activeTab === "financials" && (
            <div className="space-y-6">
              <div className="glass p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#1A080C]">
                      Rent Collected & Rent Money Paid to You
                    </h3>
                    <InfoTooltip termId="rent-payments" />
                  </div>
                  <p className="text-xs text-secondary-se mt-1">
                    See total rent collected from tenants and the rent money shared with property share owners after running costs.
                  </p>
                </div>

                {/* Rental History Bar Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={property.rentalHistory}>
                      <XAxis dataKey="month" stroke="#8C7B7F" fontSize={11} />
                      <YAxis stroke="#8C7B7F" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          color: "#1A080C",
                          border: "1px solid #EADCDD",
                          fontSize: "12px",
                          boxShadow: "0 4px 12px rgba(26,8,12,0.08)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="grossCollected" name="Rent Collected from Tenants" fill="#3B0F18" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="netDistributed" name="Rent Money Paid to You" fill="#15803D" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Operating Expense Breakdown */}
                <div className="pt-4 border-t border-[var(--se-glass-border-soft)] space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#1A080C]">Building Running Costs (Yearly)</h4>
                    <InfoTooltip termId="operating-expenses" size="sm" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Property Tax</span>
                      <strong className="text-[#1A080C]">${property.operatingExpenses.propertyTaxAnnual.toLocaleString()}</strong>
                      <span className="text-[10px] text-muted-se block">Govt tax</span>
                    </div>
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Insurance</span>
                      <strong className="text-[#1A080C]">${property.operatingExpenses.insuranceAnnual.toLocaleString()}</strong>
                      <span className="text-[10px] text-muted-se block">Building protection</span>
                    </div>
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Repairs & Cleaning</span>
                      <strong className="text-[#1A080C]">${property.operatingExpenses.maintenanceAnnual.toLocaleString()}</strong>
                      <span className="text-[10px] text-muted-se block">Upkeep fund</span>
                    </div>
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Manager Fee</span>
                      <strong className="text-[#1A080C]">{(property.operatingExpenses.managementFeeRate * 100).toFixed(1)}%</strong>
                      <span className="text-[10px] text-muted-se block">Building manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASSET MANAGER & TENANTS */}
          {activeTab === "manager" && (
            <div className="space-y-6">
              <div className="glass p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#1A080C]">Building Manager</h3>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF5F5] border border-[#EADCDD]">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center text-xl font-bold">
                    {property.assignedManager.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#1A080C]">{property.assignedManager.name}</h4>
                    <p className="text-xs text-secondary-se">{property.assignedManager.company}</p>
                    <div className="text-xs text-amber-600 font-bold mt-1">
                      ★ {property.assignedManager.rating} / 5.0 Rating • Phone: {property.assignedManager.phone}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-[#1A080C]">Renter Records & Lease Details</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Average Lease Length</span>
                      <strong className="text-[#1A080C]">{property.tenantMetrics.avgLeaseMonths} Months</strong>
                    </div>
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Rent Paid on Time</span>
                      <strong className="text-accent-se font-bold">{property.tenantMetrics.onTimePaymentRate}%</strong>
                    </div>
                    <div className="p-3 glass rounded-xl">
                      <span className="text-muted-se block">Next Rent Payment</span>
                      <strong className="text-accent-se font-bold">{property.nextPayoutDate}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Investment Summary Card (Sticky) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white border border-[#EADCDD] rounded-2xl shadow-[0_1px_2px_rgba(26,8,12,0.04)] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--se-glass-border-soft)]">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold text-muted-se">1 Share Price</span>
                  <InfoTooltip termId="fractional-shares" size="sm" />
                </div>
                <div className="text-3xl font-black text-[#1A080C]">${property.sharePrice}</div>
                <span className="text-[10px] text-muted-se">Entry price for 1 share</span>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="badge badge-success text-xs font-bold">
                    {property.netYield}% Yearly Return
                  </span>
                  <InfoTooltip termId="net-rental-yield" size="sm" />
                </div>
                <div className="text-[11px] text-muted-se mt-1">{property.grossYield}% before costs</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2 text-xs text-secondary-se">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Total Building Price:</span>
                  <InfoTooltip termId="total-valuation" size="sm" />
                </div>
                <strong className="text-[#1A080C]">${property.totalValuation.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Available Shares:</span>
                <strong className="text-accent-se">{property.availableShares.toLocaleString()} / {property.totalShares.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Monthly Rent for 1 Share:</span>
                  <InfoTooltip termId="rent-payments" size="sm" />
                </div>
                <strong className="text-accent-se">${property.monthlyPerShareRent.toFixed(3)}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Next Rent Payment:</span>
                <strong className="text-[#1A080C]">{property.nextPayoutDate}</strong>
              </div>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-secondary-se">Invested So Far</span>
                <strong className="text-accent-se">{property.fundedPercentage}%</strong>
              </div>
              <div className="w-full bg-[#FAF5F5] border border-[#EADCDD] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[var(--se-primary)] h-full" style={{ width: `${property.fundedPercentage}%` }} />
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 space-y-2.5">
              <Link
                href={`/trade/${property.id}`}
                className="btn btn-primary w-full text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Buy Shares Now</span>
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>

              <Link
                href={`/simulator`}
                className="btn btn-secondary w-full text-xs font-semibold block text-center"
              >
                Test &apos;What If?&apos; Rent Calculator
              </Link>
            </div>

            <div className="pt-3 border-t border-[var(--se-glass-border-soft)] text-[11px] text-muted-se flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-accent-se" />
              <span>Practice Mode • Real-world math, zero financial risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATEERA PROPERTY PASSPORT MODAL (FLAGSHIP FEATURE) */}
      {passportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border-2 border-[#3B0F18] rounded-3xl p-6 sm:p-10 max-w-3xl w-full my-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setPassportModalOpen(false)}
              className="absolute right-6 top-6 text-[#8C7B7F] hover:text-[#1A080C] p-1 rounded-full hover:bg-[#FAF5F5]"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Passport Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EADCDD] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="badge badge-demo text-[10px]">Digital Verification Passport</span>
                  <span className="badge badge-success text-[10px]">Verified Asset</span>
                </div>
                <h3 className="text-2xl font-black text-[#1A080C]">{property.title}</h3>
                <div className="flex items-center gap-2 text-xs text-[#8C7B7F]">
                  <MapPin className="w-3.5 h-3.5 text-[#3B0F18]" />
                  <span>{property.address || `${property.city}, ${property.country}`}</span>
                </div>
              </div>

              <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto">
                <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Protection Score</span>
                <div className="text-3xl font-black text-[#3B0F18]">
                  {property.transparencyScore || 96}<span className="text-xs text-[#8C7B7F]">/100</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">Grade-A Institutional</span>
              </div>
            </div>

            {/* Passport Identity Tokens */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl">
                <span className="text-[#8C7B7F] block text-[10px] uppercase font-bold">Passport ID</span>
                <strong className="text-[#1A080C] font-mono text-[11px] truncate block">
                  {property.propertyPassportId || `PASSPORT-SE-${property.countryCode || "GL"}-1088`}
                </strong>
              </div>
              <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl">
                <span className="text-[#8C7B7F] block text-[10px] uppercase font-bold">Legal Review</span>
                <strong className="text-emerald-700 font-bold block">100% Freehold Title</strong>
              </div>
              <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl">
                <span className="text-[#8C7B7F] block text-[10px] uppercase font-bold">Last Inspection</span>
                <strong className="text-[#1A080C] block">{property.lastInspectionDate || "2026-08-15"}</strong>
              </div>
              <div className="p-3 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl">
                <span className="text-[#8C7B7F] block text-[10px] uppercase font-bold">Next Audit Due</span>
                <strong className="text-[#3B0F18] block">2027-08-15</strong>
              </div>
            </div>

            {/* Audit Checklist Items */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#1A080C] uppercase tracking-wider">
                Audited Document &amp; Due Diligence Logs
              </h4>
              <div className="divide-y divide-[#EADCDD] border border-[#EADCDD] rounded-2xl overflow-hidden bg-white">
                {property.dueDiligenceItems.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5 max-w-md">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-[#1A080C]">{item.title}</span>
                      </div>
                      <p className="text-[#5E4A4E] text-[11px] pl-6">{item.notes}</p>
                    </div>
                    <div className="text-right sm:text-right text-[11px] text-[#8C7B7F] pl-6 sm:pl-0 shrink-0">
                      <span className="block font-semibold text-[#1A080C]">{item.issuer}</span>
                      <span>Verified: {item.verifiedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Facility & Maintenance History */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#1A080C] uppercase tracking-wider">
                Physical Maintenance &amp; Structural Condition
              </h4>
              <div className="p-4 bg-[#FAF5F5] border border-[#EADCDD] rounded-2xl text-xs space-y-2 text-[#5E4A4E]">
                <div className="flex justify-between items-center text-[#1A080C]">
                  <span>Structural Foundation &amp; Seismic Integrity:</span>
                  <strong className="text-emerald-700">Zero Defects (Pass)</strong>
                </div>
                <div className="flex justify-between items-center text-[#1A080C]">
                  <span>HVAC &amp; Central Climate System:</span>
                  <strong className="text-emerald-700">Fully Serviced (2026-08)</strong>
                </div>
                <div className="flex justify-between items-center text-[#1A080C]">
                  <span>Fire &amp; Life Safety Sprinkler Certification:</span>
                  <strong className="text-emerald-700">Civil Defense Approved</strong>
                </div>
                <div className="flex justify-between items-center text-[#1A080C]">
                  <span>Annual Sinking Fund Reserve Balance:</span>
                  <strong className="text-[#1A080C]">${(property.operatingExpenses.capitalReservesAnnual * 4).toLocaleString()} in Escrow</strong>
                </div>
              </div>
            </div>

            {/* Passport Footer */}
            <div className="pt-4 border-t border-[#EADCDD] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#8C7B7F]">
                Cryptographically hashed audit dossier &bull; StateEra Transparency Standard
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => alert(`Downloading verified legal dossier for ${property.title} (${property.propertyPassportId || "PASSPORT-SE-VERIFIED"})...`)}
                  className="btn btn-secondary text-xs font-bold py-2 px-4 flex-1 sm:flex-none flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPassportModalOpen(false)}
                  className="btn btn-primary text-xs font-bold py-2 px-5 flex-1 sm:flex-none"
                >
                  Close Passport
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
