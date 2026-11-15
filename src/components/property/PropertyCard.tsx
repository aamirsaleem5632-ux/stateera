"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Percent,
  Bookmark,
  ShieldCheck,
  Building,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Property } from "@/types/property";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
  onCompareToggle?: () => void;
  isCompared?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  featured,
  onCompareToggle,
  isCompared,
}) => {
  const { isWatchlisted, toggleWatchlist } = useDemo();
  const { t } = useLanguage();
  const isSaved = isWatchlisted(property.id);

  return (
    <div className="stateera-card rounded-2xl overflow-hidden flex flex-col group h-full">
      {/* Property Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3EAFC]">
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E1B4B] shadow-sm">
              {property.category}
            </span>
            {featured && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#7C4DFF] text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-mint" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWatchlist(property.id);
            }}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isSaved
                ? "bg-[#7C4DFF] text-white shadow-md"
                : "bg-white/80 backdrop-blur-md text-[#585375] hover:bg-white hover:text-[#7C4DFF]"
            }`}
            aria-label="Add to watchlist"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom image overlay with Net Yield Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-[#1E1B4B]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-mint" />
            <span>{property.city}, {property.country}</span>
          </div>

          <div className="bg-mint text-emerald-900 font-black px-2.5 py-1 rounded-lg text-xs shadow-sm flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>{property.netYield}% Net Yield</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/property/${property.id}`}>
            <h3 className="font-bold text-lg text-[#1E1B4B] hover:text-[#7C4DFF] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <p className="text-xs text-[#585375] line-clamp-2 mt-1">
            {property.headline}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[#F8F4FD] border border-[#E6D8F5] text-xs">
          <div>
            <span className="text-[10px] text-[#8782A3] block uppercase font-medium">Share Price</span>
            <span className="font-bold text-[#1E1B4B]">${property.sharePrice}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8782A3] block uppercase font-medium">Est. Rent/Mo</span>
            <span className="font-bold text-emerald-700">${property.estimatedMonthlyRent.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8782A3] block uppercase font-medium">AI Confidence</span>
            <span className="font-bold text-[#7C4DFF] flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {property.aiValuationConfidence}%
            </span>
          </div>
        </div>

        {/* Funding Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#585375]">
            <span>Funded: <strong className="text-[#1E1B4B]">{property.fundedPercentage}%</strong></span>
            <span>Available: <strong className="text-[#7C4DFF]">{property.availableShares.toLocaleString()}</strong> shares</span>
          </div>
          <div className="w-full bg-[#E6D8F5] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7C4DFF] h-full rounded-full transition-all duration-500"
              style={{ width: `${property.fundedPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {onCompareToggle && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCompareToggle();
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                isCompared
                  ? "bg-[#7C4DFF] text-white border-[#7C4DFF]"
                  : "bg-white text-[#585375] border-[#E6D8F5] hover:bg-[#F3EAFC]"
              }`}
            >
              {isCompared ? "✓ Selected" : "Compare"}
            </button>
          )}
          <Link
            href={`/property/${property.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] text-[#5B3A8C] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>{t.common.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
          </Link>
          <Link
            href={`/trade/${property.id}`}
            className="py-2.5 px-4 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold text-center transition-colors shadow-sm"
          >
            {t.common.buyShares}
          </Link>
        </div>
      </div>
    </div>
  );
};
