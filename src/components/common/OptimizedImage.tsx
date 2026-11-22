"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Building2 } from "lucide-react";

export interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackLabel?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage: High-performance Next.js Image wrapper for StateEra.
 * - Shimmer skeleton placeholder while loading (prevents blank flashes)
 * - Smooth fade-in transition once loaded
 * - Default responsive `sizes` to prevent downloading oversized raw images
 * - Graceful fallback UI with brand skyline/building icon if image fails
 * - Aspect ratio stability (zero Cumulative Layout Shift)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  loading,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  containerClassName = "",
  fallbackSrc,
  fallbackLabel,
  onLoad,
  onError,
  ...rest
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync internal state when external src prop changes (e.g., gallery thumbnail clicks)
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
    }
  };

  // If fill is true, the container must be relative and fill parent
  const isFill = fill || (!width && !height);

  // Deterministic loading behavior: priority images are eager by browser default and must not pass loading="lazy",
  // while non-priority images default to loading="lazy" for performance.
  const resolvedLoading = priority ? undefined : (loading || "lazy");

  // Guaranteed SSR and hydration parity: prior to mount settling, initial classes strictly match server HTML
  const isShimmerActive = !isMounted || (isLoading && !hasError);
  const isFallbackActive = isMounted && hasError;
  const isImageVisible = isMounted && !isLoading;

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF5F5] ${
        isFill ? "w-full h-full" : ""
      } ${containerClassName}`}
    >
      {/* Shimmer skeleton placeholder - permanent DOM node to prevent SSR/client hydration mismatch */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 bg-gradient-to-r from-[#FAF5F5] via-[#F2E8E9] to-[#FAF5F5] bg-[length:200%_100%] animate-pulse flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          isShimmerActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <Building2 className="w-8 h-8 text-[#EADCDD] opacity-60" />
      </div>

      {/* Graceful Fallback if image fails to load */}
      {hasError ? (
        <div
          role="img"
          aria-label={alt || "Property visual unavailable"}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#FAF5F5] text-center border border-[#EADCDD]/50"
        >
          <div className="w-10 h-10 rounded-full bg-[#F2E8E9] flex items-center justify-center mb-2 text-[#3B0F18]/60">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#5E4A4E] line-clamp-1">
            {fallbackLabel || alt || "Property Preview"}
          </span>
          <span className="text-[10px] text-[#5E4A4E]/70 mt-0.5">
            Verified StateEra Asset
          </span>
        </div>
      ) : (
        <Image
          key={typeof currentSrc === "string" ? currentSrc : undefined}
          src={currentSrc}
          alt={alt}
          fill={isFill}
          width={!isFill ? width : undefined}
          height={!isFill ? height : undefined}
          priority={priority}
          loading={resolvedLoading}
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isImageVisible ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={handleLoadingComplete}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  );
};
