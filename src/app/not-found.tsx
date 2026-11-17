import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { SkylineLogo } from "@/components/brand/SkylineLogo";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-white">
      <div className="max-w-md w-full text-center">
        {/* Skyline Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#3B0F18] flex items-center justify-center mx-auto mb-6 shadow-[0_1px_2px_rgba(26,8,12,0.08)]">
          <SkylineLogo size={40} color="white" />
        </div>

        {/* 404 Tag */}
        <p className="text-xs font-bold tracking-widest uppercase text-[#8C7B7F] mb-2">
          Error 404
        </p>

        {/* Editorial Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A080C] tracking-tight mb-3">
          Page not found
        </h1>

        {/* Human copy */}
        <p className="text-sm sm:text-base text-[#5E4A4E] leading-relaxed mb-8">
          The property, listing, or page you are looking for doesn't exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B0F18] text-white text-sm font-semibold hover:bg-[#2A0A10] active:bg-[#1A080C] transition-colors shadow-[0_1px_2px_rgba(26,8,12,0.06)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#EADCDD] text-[#3B0F18] text-sm font-semibold hover:bg-[#FAF5F5] transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Properties</span>
          </Link>
        </div>

        {/* Subtle Help Text */}
        <div className="mt-12 pt-6 border-t border-[#EADCDD]">
          <p className="text-xs text-[#8C7B7F]">
            StateEra Fractional PropTech Demo Platform · Practice Mode
          </p>
        </div>
      </div>
    </div>
  );
}
