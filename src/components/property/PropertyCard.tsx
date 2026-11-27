"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Bookmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types/property";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { OptimizedImage } from "@/components/common/OptimizedImage";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
  onCompareToggle?: () => void;
  isCompared?: boolean;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  featured,
  onCompareToggle,
  isCompared,
  priority = false,
}) => {
  const { isWatchlisted, toggleWatchlist } = useDemo();
  const { t } = useLanguage();
  const isSaved = isWatchlisted(property.id);

  return (
    <div className="bg-white border border-[#EADCDD] rounded-xl overflow-hidden flex flex-col group h-full transition-all duration-200 hover:border-[#3B0F18]/50 hover:shadow-sm">
      {/* Property Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF5F5]">
        <OptimizedImage
          src={property.coverImage}
          alt={property.title}
          fill
          maxWidth={640}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          fallbackSrc={property.galleryImages?.find((img) => img !== property.coverImage)}
          fallbackLabel={property.title}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="badge text-[10px] uppercase tracking-wider font-semibold">
              {property.category}
            </span>
            {featured && (
              <span className="bg-[#3B0F18] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                Featured
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
                ? "bg-[#3B0F18] text-white shadow-sm"
                : "bg-white/90 text-[#5E4A4E] hover:text-[#3B0F18] border border-[#EADCDD]"
            }`}
            aria-label="Add to watchlist"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom subtle overlay with Net Yield Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-white/95 border border-[#EADCDD] px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 text-[#1A080C] shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#3B0F18]" />
            <span>{property.city}, {property.country}</span>
          </div>

          <div className="badge badge-success font-bold text-xs flex items-center gap-1 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-[#15803D]" />
            <span>{property.netYield}% Return</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/property/${property.id}`}>
            <h3 className="font-bold text-base sm:text-lg text-[#1A080C] hover:text-[#3B0F18] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <p className="text-xs text-[#5E4A4E] line-clamp-2 mt-1 leading-relaxed">
            {property.headline}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-[#FAF5F5] border border-[#EADCDD] text-xs">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#8C7B7F] block uppercase font-medium">1 Share</span>
              <InfoTooltip termId="fractional-shares" size="sm" />
            </div>
            <span className="font-bold text-[#1A080C]">${property.sharePrice}</span>
            <span className="text-[9px] text-[#8C7B7F] block">Entry price</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#8C7B7F] block uppercase font-medium">Rent / Mo</span>
              <InfoTooltip termId="rent-payments" size="sm" />
            </div>
            <span className="font-bold text-[#15803D]">${property.estimatedMonthlyRent.toLocaleString()}</span>
            <span className="text-[9px] text-[#8C7B7F] block">Whole property</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#8C7B7F] block uppercase font-medium">Audit</span>
              <InfoTooltip termId="property-checks" size="sm" />
            </div>
            <span className="font-bold text-[#3B0F18] flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {property.aiValuationConfidence}%
            </span>
            <span className="text-[9px] text-[#8C7B7F] block">Score</span>
          </div>
        </div>

        {/* Funding Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#5E4A4E]">
              <strong>{property.availableShares.toLocaleString()}</strong> shares left
            </span>
            <span className="font-semibold text-[#1A080C]">
              {property.fundedPercentage}% Funded
            </span>
          </div>
          <div className="w-full bg-[#FAF5F5] border border-[#EADCDD] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3B0F18] h-full rounded-full transition-all duration-700"
              style={{ width: `${property.fundedPercentage}%` }}
            />
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-2 border-t border-[#EADCDD] flex items-center justify-between gap-2">
          {onCompareToggle && (
            <button
              onClick={onCompareToggle}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                isCompared
                  ? "bg-[#3B0F18] text-white border-[#3B0F18]"
                  : "bg-white text-[#5E4A4E] border-[#EADCDD] hover:border-[#3B0F18]"
              }`}
            >
              {isCompared ? "Compared" : "Compare"}
            </button>
          )}

          <Link
            href={`/property/${property.id}`}
            className="flex-1 btn btn-secondary text-xs flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
          </Link>
        </div>
      </div>
    </div>
  );
};
