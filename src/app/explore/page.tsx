"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  TrendingUp,
  LayoutGrid,
  List,
  Sparkles,
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

export default function ExplorePage() {
  const { properties, isWatchlisted, toggleWatchlist } = useDemo();
  const { t, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minYield, setMinYield] = useState<number>(7.0);
  const [maxSharePrice, setMaxSharePrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<"yield" | "price-asc" | "price-desc" | "valuation">("yield");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");

  // Interactive Map Selected Property State
  const [mapSelectedPropertyId, setMapSelectedPropertyId] = useState<string>(properties[0]?.id || "");

  const categories = [
    { id: "all", label: "All Properties" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "waterfront", label: "Waterfront" },
    { id: "luxury", label: "Luxury Penthouses" },
    { id: "villa", label: "Villas" },
  ];

  // Compare mode state — allows selecting up to 3 properties for comparison
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

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
        // Case-insensitive category matching
        const matchesCategory =
          selectedCategory === "all" ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesYield = p.netYield >= minYield;
        const matchesPrice = p.sharePrice <= maxSharePrice;

        return matchesSearch && matchesCategory && matchesYield && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "yield") return b.netYield - a.netYield;
        if (sortBy === "price-asc") return a.sharePrice - b.sharePrice;
        if (sortBy === "price-desc") return b.sharePrice - a.sharePrice;
        if (sortBy === "valuation") return b.totalValuation - a.totalValuation;
        return 0;
      });
  }, [properties, searchQuery, selectedCategory, minYield, maxSharePrice, sortBy]);

  const mapSelectedProp = properties.find((p) => p.id === mapSelectedPropertyId) || properties[0];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setMinYield(7.0);
    setMaxSharePrice(250);
    setSortBy("yield");
  };

  const isFiltered =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    minYield > 7.0 ||
    maxSharePrice < 250;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir={dir}>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EAFC] text-[#5B3A8C] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#7C4DFF]" />
          <span>Global Property Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Explore Investment Properties
        </h1>
        <p className="text-sm sm:text-base text-[#585375] mt-1">
          Search institutional-grade residential and commercial assets with automated monthly rental yields.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6D8F5] shadow-subtle mb-8 space-y-4">
        {/* Search Input & View Toggles */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8782A3] absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by property name, city (Dubai, New York, London...) or country"
              className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl pl-10 pr-4 py-2.5 rtl:pr-10 rtl:pl-4 text-sm text-[#1E1B4B] placeholder-[#8782A3] focus:outline-none focus:border-[#7C4DFF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8782A3] hover:text-[#1E1B4B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#585375]">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort Properties"
                className="bg-[#F8F4FD] border border-[#E6D8F5] text-xs text-[#1E1B4B] font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#7C4DFF]"
              >
                <option value="yield">Highest Net Yield</option>
                <option value="price-asc">Share Price: Low to High</option>
                <option value="price-desc">Share Price: High to Low</option>
                <option value="valuation">Highest Property Valuation</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-[#7C4DFF] shadow-sm" : "text-[#8782A3]"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-[#7C4DFF] shadow-sm" : "text-[#8782A3]"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "map" ? "bg-white text-[#7C4DFF] shadow-sm" : "text-[#8782A3]"
                }`}
                title="Interactive Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Sliders */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[#F3EAFC]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === c.id
                    ? "bg-[#7C4DFF] text-white shadow-sm"
                    : "bg-[#F8F4FD] text-[#585375] hover:bg-[#F3EAFC]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#585375]">
            <div className="flex items-center gap-2">
              <span>Min Yield:</span>
              <strong className="text-[#1E1B4B] w-10">{minYield}%</strong>
              <input
                type="range"
                min="7.0"
                max="11.0"
                step="0.5"
                value={minYield}
                onChange={(e) => setMinYield(Number(e.target.value))}
                aria-label="Minimum Net Yield"
                className="w-20 sm:w-24 h-1.5 bg-[#E6D8F5] rounded appearance-none accent-[#7C4DFF] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <span>Max Share Price:</span>
              <strong className="text-[#1E1B4B] w-12">${maxSharePrice}</strong>
              <input
                type="range"
                min="50"
                max="250"
                step="25"
                value={maxSharePrice}
                onChange={(e) => setMaxSharePrice(Number(e.target.value))}
                aria-label="Maximum Share Price"
                className="w-20 sm:w-24 h-1.5 bg-[#E6D8F5] rounded appearance-none accent-[#7C4DFF] cursor-pointer"
              />
            </div>

            {isFiltered && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-[#7C4DFF] hover:underline flex items-center gap-1"
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
        <span className="text-xs text-[#585375]">
          Showing <strong>{filteredProperties.length}</strong> of {properties.length} available properties
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8782A3] hidden sm:inline">
            Simulated institutional assets • All transactions illustrative
          </span>
          <button
            onClick={() => { setCompareMode(!compareMode); if (compareMode) setCompareList([]); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              compareMode
                ? "bg-[#7C4DFF] text-white border-[#7C4DFF] shadow-sm"
                : "bg-white text-[#585375] border-[#E6D8F5] hover:border-[#7C4DFF]"
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare{compareMode && compareList.length > 0 ? ` (${compareList.length})` : ""}</span>
          </button>
          {compareMode && compareList.length >= 2 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>View Comparison</span>
            </button>
          )}
        </div>
      </div>

      {/* Compare Mode Banner */}
      {compareMode && (
        <div className="mb-5 p-3 rounded-xl bg-[#F3EAFC] border border-[#E6D8F5] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5B3A8C] font-semibold">
            <GitCompare className="w-4 h-4 text-[#7C4DFF]" />
            <span>
              {compareList.length === 0
                ? "Select 2–3 properties to compare side-by-side."
                : compareList.length === 1
                ? "Select 1–2 more properties to compare."
                : `${compareList.length} properties selected — ready to compare.`}
            </span>
          </div>
          {compareList.length > 0 && (
            <button onClick={() => setCompareList([])} className="text-[#7C4DFF] hover:underline font-bold flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && compareList.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-[#E6D8F5]">
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-[#E6D8F5] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1E1B4B]">Property Comparison</h2>
                <p className="text-xs text-[#585375] mt-0.5">Side-by-side financial and operational metrics</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] transition-colors"
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
                    <div key={id} className="bg-[#F8F4FD] rounded-2xl p-4 border border-[#E6D8F5] space-y-4">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#E6D8F5]">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8782A3] bg-white px-2 py-0.5 rounded-md border border-[#E6D8F5]">{p.category}</span>
                        <h3 className="font-black text-[#1E1B4B] text-sm mt-2 leading-tight">{p.title}</h3>
                        <p className="text-[11px] text-[#585375] flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-[#7C4DFF]" /> {p.city}, {p.country}
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
                          <div key={row.label} className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg ${row.highlight ? "bg-mint/60 font-bold" : "bg-white"} border border-[#E6D8F5]`}>
                            <span className="text-[#8782A3]">{row.label}</span>
                            <span className={`font-bold ${row.highlight ? "text-emerald-700 text-sm" : "text-[#1E1B4B]"}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-1 flex gap-2">
                        <Link href={`/property/${p.id}`} onClick={() => setShowCompareModal(false)} className="flex-1 py-2 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] text-xs font-bold text-center transition-colors">View Details</Link>
                        <Link href={`/trade/${p.id}`} onClick={() => setShowCompareModal(false)} className="flex-1 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold text-center transition-colors">Buy Shares</Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onCompareToggle={compareMode ? () => toggleCompare(property.id) : undefined}
              isCompared={compareList.includes(property.id)}
            />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="stateera-card rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3EAFC]">
                  <Image
                    src={property.coverImage}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#1E1B4B]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {property.category}
                  </div>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs text-[#8782A3] flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7C4DFF]" />
                    <span>{property.city}, {property.country}</span>
                  </div>
                  <Link href={`/property/${property.id}`}>
                    <h3 className="font-bold text-lg text-[#1E1B4B] hover:text-[#7C4DFF] transition-colors">
                      {property.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#585375] line-clamp-1 max-w-md">
                    {property.headline}
                  </p>
                  <div className="text-xs text-[#585375] pt-1">
                    Funded: <strong>{property.fundedPercentage}%</strong> ({property.availableShares.toLocaleString()} shares remaining)
                  </div>
                </div>
              </div>

              {/* Metrics & Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#F3EAFC]">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] text-[#8782A3] uppercase block font-medium">Net Yield</span>
                  <span className="text-lg font-black text-emerald-600">
                    {property.netYield}%
                  </span>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-[10px] text-[#8782A3] uppercase block font-medium">Share Price</span>
                  <span className="text-lg font-black text-[#1E1B4B]">
                    ${property.sharePrice}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/property/${property.id}`}
                    className="px-4 py-2.5 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] text-xs font-bold transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/trade/${property.id}`}
                    className="px-4 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Demo Map View */}
      {viewMode === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-[#E6D8F5] p-5 shadow-card overflow-hidden">
          {/* Simulated Interactive World / Regional Map */}
          <div className="lg:col-span-8 bg-[#EBF3FB] rounded-2xl min-h-[460px] relative overflow-hidden flex flex-col justify-between p-4 border border-[#BAE6FD]">
            {/* Top Map Bar */}
            <div className="flex items-center justify-between relative z-10">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5 border border-[#BAE6FD]">
                <MapIcon className="w-4 h-4 text-[#7C4DFF]" />
                <span>Interactive Global Map Simulation</span>
              </div>
              <span className="text-[11px] text-[#585375] bg-white/80 px-2.5 py-1 rounded-lg">
                Click pin to inspect asset
              </span>
            </div>

            {/* Simulated Map Graphical Background with Stylized Geographies */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#7C4DFF_1px,transparent_1px)] [background-size:16px_16px]" />

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
              ].map((pin) => {
                const isSelected = mapSelectedPropertyId === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={() => setMapSelectedPropertyId(pin.id)}
                    style={{ top: pin.top, left: pin.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
                      isSelected
                        ? "bg-[#7C4DFF] text-white scale-110 ring-4 ring-[#7C4DFF]/30 z-20"
                        : "bg-white text-[#1E1B4B] hover:bg-[#F3EAFC] z-10"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-mint" : "text-[#7C4DFF]"}`} />
                    <span>{pin.city}</span>
                    <span className="text-[10px] bg-mint text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">
                      {pin.yield}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 text-[10px] text-[#585375] bg-white/80 backdrop-blur-md p-2 rounded-lg border border-[#BAE6FD] max-w-sm">
              Coordinates plotted for simulation testing. Select any pin to preview financial metrics.
            </div>
          </div>

          {/* Right Selected Property Card Preview */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {mapSelectedProp && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#7C4DFF] bg-[#F3EAFC] px-2.5 py-1 rounded-full">
                    Selected Asset Preview
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded-md">
                    {mapSelectedProp.netYield}% Net Yield
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F3EAFC]">
                  <Image
                    src={mapSelectedProp.coverImage}
                    alt={mapSelectedProp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#1E1B4B]/80 text-white text-xs px-2.5 py-1 rounded-lg">
                    {mapSelectedProp.city}, {mapSelectedProp.country}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#1E1B4B]">
                    {mapSelectedProp.title}
                  </h3>
                  <p className="text-xs text-[#585375] line-clamp-2 mt-1">
                    {mapSelectedProp.headline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                    <span className="text-[10px] text-[#8782A3] block uppercase">Share Price</span>
                    <span className="font-bold text-[#1E1B4B]">${mapSelectedProp.sharePrice}</span>
                  </div>
                  <div className="p-2.5 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
                    <span className="text-[10px] text-[#8782A3] block uppercase">Monthly Rent</span>
                    <span className="font-bold text-emerald-700">${mapSelectedProp.estimatedMonthlyRent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href={`/property/${mapSelectedProp.id}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs text-center transition-colors shadow-sm"
                  >
                    Open Full Details
                  </Link>
                  <Link
                    href={`/trade/${mapSelectedProp.id}`}
                    className="px-4 py-2.5 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] font-bold text-xs transition-colors"
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
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E6D8F5] p-8">
          <Search className="w-10 h-10 text-[#8782A3] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1E1B4B]">No properties matched your criteria</h3>
          <p className="text-xs text-[#585375] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, minimum yield, or price filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#7C4DFF] text-white text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
