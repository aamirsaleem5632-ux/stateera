"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  TrendingUp,
  LayoutGrid,
  List,
  Map as MapIcon,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  GitCompare,
  CheckCircle2,
  Percent,
  Building2,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Property, PropertyCategory } from "@/types/property";
import { PropertyCard } from "@/components/property/PropertyCard";
import { BeginnerGuideBanner } from "@/components/common/BeginnerGuideBanner";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { Reveal } from "@/components/scroll/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function ExplorePage() {
  const { properties, isWatchlisted, toggleWatchlist } = useDemo();
  const { t, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minYield, setMinYield] = useState<number>(5.0);
  const [maxSharePrice, setMaxSharePrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<"yield" | "price-asc" | "price-desc" | "valuation">("yield");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");

  // Interactive Map Selected Property State
  const [mapSelectedPropertyId, setMapSelectedPropertyId] = useState<string>(properties[0]?.id || "");

  const categories = [
    { id: "all", label: "All Properties" },
    { id: "residential", label: "Residential" },
    { id: "luxury", label: "Luxury Penthouses" },
    { id: "villa", label: "Villas & Homes" },
    { id: "waterfront", label: "Waterfront" },
    { id: "commercial", label: "Commercial" },
    { id: "office", label: "Office Towers" },
    { id: "retail", label: "Retail Spaces" },
    { id: "student", label: "Student Housing" },
    { id: "hospitality", label: "Hospitality & Resorts" },
    { id: "logistics", label: "Logistics & Warehouses" },
    { id: "mixed-use", label: "Mixed-Use" },
    { id: "affordable", label: "Affordable Housing" },
  ];

  // Distinct countries and cities derived dynamically from properties
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.country) set.add(p.country);
    });
    return Array.from(set).sort();
  }, [properties]);

  const availableCities = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (selectedCountry === "all" || p.country === selectedCountry) {
        if (p.city) set.add(p.city);
      }
    });
    return Array.from(set).sort();
  }, [properties, selectedCountry]);

  // Compare mode state — allows selecting up to 3 properties for comparison
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Progressive Load More State & Motion
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const prevCountRef = useRef<number>(0);

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  // Filtered & Sorted Properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.country.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCountry =
          selectedCountry === "all" || p.country.toLowerCase() === selectedCountry.toLowerCase();

        const matchesCity =
          selectedCity === "all" || p.city.toLowerCase() === selectedCity.toLowerCase();

        // Case-insensitive category matching
        const matchesCategory =
          selectedCategory === "all" ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        
        const matchesYield = p.netYield >= minYield;
        const matchesPrice = p.sharePrice <= maxSharePrice;

        return matchesSearch && matchesCountry && matchesCity && matchesCategory && matchesYield && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "yield") return b.netYield - a.netYield;
        if (sortBy === "price-asc") return a.sharePrice - b.sharePrice;
        if (sortBy === "price-desc") return b.sharePrice - a.sharePrice;
        if (sortBy === "valuation") return b.totalValuation - a.totalValuation;
        return 0;
      });
  }, [properties, searchQuery, selectedCountry, selectedCity, selectedCategory, minYield, maxSharePrice, sortBy]);

  const mapSelectedProp = properties.find((p) => p.id === mapSelectedPropertyId) || properties[0];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("all");
    setSelectedCity("all");
    setSelectedCategory("all");
    setMinYield(5.0);
    setMaxSharePrice(250);
    setSortBy("yield");
    setVisibleCount(12);
    prevCountRef.current = 0;
  };

  const handleLoadMore = () => {
    prevCountRef.current = visibleCount;
    setVisibleCount((prev) => Math.min(prev + 12, filteredProperties.length));
  };

  const isFiltered =
    searchQuery !== "" ||
    selectedCountry !== "all" ||
    selectedCity !== "all" ||
    selectedCategory !== "all" ||
    minYield > 5.0 ||
    maxSharePrice < 250;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir={dir}>
      {/* 3-Step Beginner Explainer Strip */}
      <BeginnerGuideBanner pageName="explore" />

      {/* Header */}
      <div className="mb-6">
        <div className="badge badge-demo mb-2 inline-flex items-center gap-1.5">
          <span>{t.nav.explore}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A080C] tracking-tight">
          Find Properties to Invest In
        </h1>
        <p className="text-sm sm:text-base text-secondary-se mt-1">
          Browse real buildings, inspect their photos and paperwork, and buy small shares to start collecting monthly rent.
        </p>

        {/* Friendly Next Step Hint */}
        <div className="mt-4 p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs text-[#5E4A4E]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base">💡</span>
            <span>
              <strong className="text-[#1A080C]">Next Step:</strong> Click on any property below to see its photos, monthly rent payouts, and safety checks.
            </span>
          </div>
          <Link
            href="/glossary"
            className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
          >
            <span>Confused by terms? See Guide</span>
            <ArrowRight className="w-3 h-3 rtl-flip" />
          </Link>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass p-4 sm:p-5 mb-8 space-y-4">
        {/* Search Input, Country, City & View Toggles */}
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-se absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by property name, neighborhood, city or country..."
              className="input pl-10 pr-10 rtl:pr-10 rtl:pl-10 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-se hover:text-[#1A080C]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            {/* Country Selector */}
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedCity("all");
              }}
              aria-label="Filter by Country"
              className="select text-xs font-semibold px-3 py-2.5 w-auto"
            >
              <option value="all">All Countries ({availableCountries.length})</option>
              {availableCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by City"
              className="select text-xs font-semibold px-3 py-2.5 w-auto"
            >
              <option value="all">All Cities ({availableCities.length})</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-secondary-se">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort Properties"
                className="select text-xs font-semibold px-3 py-2.5 w-auto"
              >
                <option value="yield">Highest Yearly Rent Return</option>
                <option value="price-asc">Share Price: Low to High</option>
                <option value="price-desc">Share Price: High to Low</option>
                <option value="valuation">Highest Property Price</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#FAF5F5] border border-[#EADCDD] rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-[var(--se-primary)] text-white shadow-sm" : "text-muted-se hover:text-[#1A080C]"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-[var(--se-primary)] text-white shadow-sm" : "text-muted-se hover:text-[#1A080C]"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "map" ? "bg-[var(--se-primary)] text-white shadow-sm" : "text-muted-se hover:text-[#1A080C]"
                }`}
                title="Interactive Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Sliders */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[var(--se-glass-border-soft)]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === c.id
                    ? "btn-primary shadow-sm"
                    : "bg-[#FAF5F5] hover:bg-[#F2E8E9] text-secondary-se border border-[#EADCDD]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-se">
            <div className="flex items-center gap-1.5">
              <span>Min Yearly Rent:</span>
              <InfoTooltip termId="net-rental-yield" size="sm" />
              <strong className="text-accent-se w-10">{minYield}%</strong>
              <input
                type="range"
                min="7.0"
                max="11.0"
                step="0.5"
                value={minYield}
                onChange={(e) => setMinYield(Number(e.target.value))}
                aria-label="Minimum Yearly Rent"
                className="w-20 sm:w-24 h-1.5 bg-[#FAF5F5] border border-[#EADCDD] rounded appearance-none accent-[var(--se-primary)] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span>Max Share Price:</span>
              <InfoTooltip termId="fractional-shares" size="sm" />
              <strong className="text-accent-se w-12">${maxSharePrice}</strong>
              <input
                type="range"
                min="25"
                max="250"
                step="25"
                value={maxSharePrice}
                onChange={(e) => setMaxSharePrice(Number(e.target.value))}
                aria-label="Maximum Share Price"
                className="w-20 sm:w-24 h-1.5 bg-[#FAF5F5] border border-[#EADCDD] rounded appearance-none accent-[var(--se-primary)] cursor-pointer"
              />
            </div>

            {isFiltered && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-accent-se hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <span className="text-xs text-secondary-se">
          Showing <strong className="text-[#1A080C]">{filteredProperties.length}</strong> of {properties.length} available properties
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-se hidden sm:inline">
            Simulated institutional assets • All transactions illustrative
          </span>
          <button
            onClick={() => { setCompareMode(!compareMode); if (compareMode) setCompareList([]); }}
            className={`btn btn-secondary text-xs py-1.5 px-3 min-h-[36px] ${
              compareMode ? "!bg-[var(--se-primary)] !text-white border-transparent" : ""
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare{compareMode && compareList.length > 0 ? ` (${compareList.length})` : ""}</span>
          </button>
          {compareMode && compareList.length >= 2 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="btn btn-primary text-xs py-1.5 px-3 min-h-[36px]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>View Comparison</span>
            </button>
          )}
        </div>
      </div>

      {/* Compare Mode Banner */}
      {compareMode && (
        <div className="mb-5 p-3 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#1A080C] font-semibold">
            <GitCompare className="w-4 h-4 text-accent-se" />
            <span>
              {compareList.length === 0
                ? "Select 2–3 properties to compare side-by-side."
                : compareList.length === 1
                ? "Select 1–2 more properties to compare."
                : `${compareList.length} properties selected — ready to compare.`}
            </span>
          </div>
          {compareList.length > 0 && (
            <button onClick={() => setCompareList([])} className="text-accent-se hover:underline font-bold flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && compareList.length >= 2 && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <div className="modal-glass w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-[#EADCDD] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1A080C]">Property Comparison</h2>
                <p className="text-xs text-secondary-se mt-0.5">Side-by-side financial and operational metrics</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 rounded-xl border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className={`grid gap-4 ${compareList.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {compareList.map((id) => {
                  const p = properties.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="glass rounded-2xl p-4 space-y-4">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden img-overlay bg-[#FAF5F5]">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="badge badge-demo text-[10px] uppercase font-bold tracking-wider">{p.category}</span>
                        <h3 className="font-black text-[#1A080C] text-sm mt-2 leading-tight">{p.title}</h3>
                        <p className="text-[11px] text-secondary-se flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-accent-se" /> {p.city}, {p.country}
                        </p>
                      </div>
                      <div className="space-y-2 text-xs">
                        {[
                          { label: "Total Valuation", value: `$${(p.totalValuation / 1000000).toFixed(1)}M` },
                          { label: "Share Price", value: `$${p.sharePrice}` },
                          { label: "Gross Yield", value: `${p.grossYield}%` },
                          { label: "Net Yield", value: `${p.netYield}%`, highlight: true },
                          { label: "Monthly Rent", value: `$${p.estimatedMonthlyRent.toLocaleString()}` },
                          { label: "Occupancy Rate", value: `${p.occupancyRate}%` },
                          { label: "AI Confidence", value: `${p.aiValuationConfidence}%` },
                          { label: "Funded", value: `${p.fundedPercentage}%` },
                          { label: "Shares Available", value: p.availableShares.toLocaleString() },
                        ].map((row) => (
                          <div key={row.label} className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg ${row.highlight ? "bg-[#FAF5F5] font-bold" : "bg-white"} border border-[#EADCDD]`}>
                            <span className="text-[#5E4A4E]">{row.label}</span>
                            <span className={`font-bold ${row.highlight ? "text-[#3B0F18] text-sm" : "text-[#1A080C]"}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-1 flex gap-2">
                        <Link href={`/property/${p.id}`} onClick={() => setShowCompareModal(false)} className="btn btn-secondary flex-1 text-xs min-h-[38px]">View Details</Link>
                        <Link href={`/trade/${p.id}`} onClick={() => setShowCompareModal(false)} className="btn btn-primary flex-1 text-xs min-h-[38px]">Buy Shares</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content View Based on viewMode */}
      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, visibleCount).map((property, idx) => {
              const isInitialBatch = prevCountRef.current === 0;
              const isNewFromLoadMore = idx >= prevCountRef.current && prevCountRef.current > 0;

              if (isInitialBatch) {
                return (
                  <Reveal
                    key={property.id}
                    variant="fade-up"
                    delay={Math.min(idx * 0.08, 0.4)}
                    duration={0.5}
                  >
                    <PropertyCard
                      property={property}
                      onCompareToggle={compareMode ? () => toggleCompare(property.id) : undefined}
                      isCompared={compareList.includes(property.id)}
                    />
                  </Reveal>
                );
              }

              if (isNewFromLoadMore) {
                return (
                  <motion.div
                    key={property.id}
                    initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 14 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (idx - prevCountRef.current) * 0.08,
                      ease: EASING,
                    }}
                  >
                    <PropertyCard
                      property={property}
                      onCompareToggle={compareMode ? () => toggleCompare(property.id) : undefined}
                      isCompared={compareList.includes(property.id)}
                    />
                  </motion.div>
                );
              }

              return (
                <div key={property.id}>
                  <PropertyCard
                    property={property}
                    onCompareToggle={compareMode ? () => toggleCompare(property.id) : undefined}
                    isCompared={compareList.includes(property.id)}
                  />
                </div>
              );
            })}
          </div>

          {visibleCount < filteredProperties.length && (
            <div className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="btn btn-secondary px-8 py-3.5 text-sm"
              >
                Load More Properties ({filteredProperties.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {viewMode === "list" && (
        <>
          <div className="space-y-4">
            {filteredProperties.slice(0, visibleCount).map((property, idx) => {
              const isInitialBatch = prevCountRef.current === 0;
              const isNewFromLoadMore = idx >= prevCountRef.current && prevCountRef.current > 0;

              const cardContent = (
                <div className="glass glass-hover p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden flex-shrink-0 img-overlay bg-[#FAF5F5]">
                      <Image
                        src={property.coverImage}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 badge badge-demo text-[10px]">
                        {property.category}
                      </div>
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-xs text-muted-se flex items-center justify-center sm:justify-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent-se" />
                        <span>{property.city}, {property.country}</span>
                      </div>
                      <Link href={`/property/${property.id}`}>
                        <h3 className="font-bold text-lg text-[#1A080C] hover:text-accent-se transition-colors">
                          {property.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-secondary-se line-clamp-1 max-w-md">
                        {property.headline}
                      </p>
                      <div className="text-xs text-secondary-se pt-1">
                        Funded: <strong className="text-[#1A080C]">{property.fundedPercentage}%</strong> ({property.availableShares.toLocaleString()} shares remaining)
                      </div>
                    </div>
                  </div>

                  {/* Metrics & Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--se-glass-border-soft)]">
                    <div className="text-center sm:text-right">
                      <span className="text-[10px] text-muted-se uppercase block font-medium">Net Yield</span>
                      <span className="text-lg font-black text-accent-se">
                        {property.netYield}%
                      </span>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="text-[10px] text-muted-se uppercase block font-medium">Share Price</span>
                      <span className="text-lg font-black text-[#1A080C]">
                        ${property.sharePrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/property/${property.id}`}
                        className="btn btn-secondary text-xs px-4 py-2 min-h-[38px]"
                      >
                        View
                      </Link>
                      <Link
                        href={`/trade/${property.id}`}
                        className="btn btn-primary text-xs px-4 py-2 min-h-[38px]"
                      >
                        Buy
                      </Link>
                    </div>
                  </div>
                </div>
              );

              if (isInitialBatch) {
                return (
                  <Reveal key={property.id} variant="fade-up" delay={Math.min(idx * 0.08, 0.4)} duration={0.5}>
                    {cardContent}
                  </Reveal>
                );
              }

              if (isNewFromLoadMore) {
                return (
                  <motion.div
                    key={property.id}
                    initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 14 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (idx - prevCountRef.current) * 0.08,
                      ease: EASING,
                    }}
                  >
                    {cardContent}
                  </motion.div>
                );
              }

              return <div key={property.id}>{cardContent}</div>;
            })}
          </div>

          {visibleCount < filteredProperties.length && (
            <div className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="btn btn-secondary px-8 py-3.5 text-sm"
              >
                Load More Properties ({filteredProperties.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Interactive Demo Map View */}
      {viewMode === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 glass p-5 overflow-hidden">
          {/* Simulated Interactive World / Regional Map */}
          <div className="lg:col-span-8 bg-[#FAF5F5] rounded-2xl min-h-[460px] relative overflow-hidden flex flex-col justify-between p-4 border border-[#EADCDD]">
            {/* Top Map Bar */}
            <div className="flex items-center justify-between relative z-10">
              <div className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-[#1A080C] flex items-center gap-1.5 border border-[#EADCDD] shadow-sm">
                <MapIcon className="w-4 h-4 text-accent-se" />
                <span>Interactive Global Map Simulation</span>
              </div>
              <span className="text-[11px] text-secondary-se bg-white border border-[#EADCDD] px-2.5 py-1 rounded-lg">
                Click pin to inspect asset
              </span>
            </div>

            {/* Simulated Map Graphical Background with Stylized Geographies */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(var(--se-rose-400)_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Clickable Property Pins */}
            <div className="relative z-10 w-full h-80 my-auto">
              {[
                { id: "prop-dubai-marina-tower", top: "52%", left: "62%", city: "Dubai", yield: "9.4%" },
                { id: "prop-nyc-manhattan-penthouse", top: "34%", left: "28%", city: "New York", yield: "8.2%" },
                { id: "prop-london-mayfair-commercial", top: "28%", left: "48%", city: "London", yield: "8.8%" },
                { id: "prop-zurich-lakeview-villas", top: "32%", left: "52%", city: "Zurich", yield: "7.6%" },
                { id: "prop-singapore-marina-bay", top: "62%", left: "75%", city: "Singapore", yield: "8.3%" },
                { id: "prop-paris-champs-elysees", top: "31%", left: "49%", city: "Paris", yield: "7.9%" },
                { id: "prop-miami-biscayne-bay", top: "44%", left: "26%", city: "Miami", yield: "9.8%" },
                { id: "prop-tokyo-ginza-residences", top: "36%", left: "84%", city: "Tokyo", yield: "7.5%" },
                { id: "prop-pk-dha-karachi-tower", top: "54%", left: "64%", city: "Karachi", yield: "10.2%" },
                { id: "prop-pk-gulberg-lahore-plaza", top: "46%", left: "66%", city: "Lahore", yield: "11.4%" },
                { id: "prop-pk-bahria-town-islamabad", top: "42%", left: "65%", city: "Islamabad", yield: "9.8%" },
                { id: "prop-pk-multan-agri-warehouse", top: "49%", left: "64.5%", city: "Multan", yield: "13.1%" },
                { id: "prop-pk-pcw-peshawar-business", top: "41%", left: "63%", city: "Peshawar", yield: "11.9%" },
              ].map((pin) => {
                const isSelected = mapSelectedPropertyId === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={() => setMapSelectedPropertyId(pin.id)}
                    style={{ top: pin.top, left: pin.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
                      isSelected
                        ? "bg-[var(--se-primary)] text-white scale-110 ring-4 ring-[var(--se-ring)] z-20"
                        : "bg-white text-[#1A080C] border border-[#EADCDD] hover:bg-[#FAF5F5] z-10"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-accent-se"}`} />
                    <span>{pin.city}</span>
                    <span className="text-[10px] bg-[#FAF5F5] text-[#1A080C] px-1.5 py-0.2 rounded font-extrabold border border-[#EADCDD]">
                      {pin.yield}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 text-[10px] text-secondary-se bg-white p-2 rounded-lg border border-[#EADCDD] max-w-sm">
              Coordinates plotted for simulation testing. Select any pin to preview financial metrics.
            </div>
          </div>

          {/* Right Selected Property Card Preview */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {mapSelectedProp && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider badge badge-demo">
                    Selected Asset Preview
                  </span>
                  <span className="text-xs font-bold badge badge-success">
                    {mapSelectedProp.netYield}% Net Yield
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden img-overlay bg-[#FAF5F5]">
                  <Image
                    src={mapSelectedProp.coverImage}
                    alt={mapSelectedProp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/90 text-[#1A080C] text-xs px-2.5 py-1 rounded-lg border border-[#EADCDD] font-medium">
                    {mapSelectedProp.city}, {mapSelectedProp.country}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#1A080C]">
                    {mapSelectedProp.title}
                  </h3>
                  <p className="text-xs text-secondary-se line-clamp-2 mt-1">
                    {mapSelectedProp.headline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 glass rounded-xl">
                    <span className="text-[10px] text-muted-se block uppercase">Share Price</span>
                    <span className="font-bold text-[#1A080C]">${mapSelectedProp.sharePrice}</span>
                  </div>
                  <div className="p-2.5 glass rounded-xl">
                    <span className="text-[10px] text-muted-se block uppercase">Monthly Rent</span>
                    <span className="font-bold text-accent-se">${mapSelectedProp.estimatedMonthlyRent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href={`/property/${mapSelectedProp.id}`}
                    className="btn btn-primary flex-1 text-xs min-h-[40px]"
                  >
                    Open Full Details
                  </Link>
                  <Link
                    href={`/trade/${mapSelectedProp.id}`}
                    className="btn btn-secondary px-4 text-xs min-h-[40px]"
                  >
                    Trade Shares
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-16 glass p-8">
          <Search className="w-10 h-10 text-muted-se mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1A080C]">No properties found with these filters</h3>
          <p className="text-xs text-secondary-se mt-1 max-w-sm mx-auto">
            Try lowering your minimum rent return or clearing your search keywords.
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-primary mt-4 text-xs"
          >
            Clear Filters & Show All
          </button>
        </div>
      )}
    </div>
  );
}
