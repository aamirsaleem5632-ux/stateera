"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import { Building2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackLabel?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimizes external Unsplash URLs on the fly:
 * - auto=format (delivers WebP/AVIF based on browser header)
 * - fit=crop (preserves architectural aspect ratio)
 * - q=75 (high visual fidelity at 70% smaller file size)
 * - w=... (caps oversized dimensions to actual viewport requirements)
 */
function getOptimizedSrc(src: string | any, targetWidth?: number): string {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("images.unsplash.com")) return src;

  try {
    const url = new URL(src);
    const maxW = targetWidth ? Math.min(Math.max(targetWidth, 320), 1200) : 800;
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("q", "75");

    const currentW = url.searchParams.get("w");
    if (!currentW || Number(currentW) > maxW) {
      url.searchParams.set("w", String(maxW));
    }
    return url.toString();
  } catch {
    return src;
  }
}

/**
 * OptimizedImage: High-performance Next.js Image wrapper for StateEra.
 * - Dynamic Unsplash CDN formatting (WebP/AVIF, optimal compression)
 * - Immediate resolution for cached images (eliminates stuck skeleton shimmer)
 * - Smooth fade-in transition once loaded
 * - Default responsive `sizes` to prevent downloading oversized raw images
 * - Graceful fallback UI with brand building icon if image genuinely cannot be retrieved
 * - Aspect ratio stability (zero Cumulative Layout Shift)
 * - Resilient 4s watchdog timeout prevents indefinite loading hangs
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
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retried, setRetried] = useState(false);

  const targetW = typeof width === "number" ? width : 800;
  const srcKey = `${typeof src === "string" ? src : ""}|${targetW}`;
  const [prevSrcKey, setPrevSrcKey] = useState(srcKey);
  const [currentSrc, setCurrentSrc] = useState<string>(() => getOptimizedSrc(src, targetW));
  const imgRef = useRef<HTMLImageElement | null>(null);

  if (srcKey !== prevSrcKey) {
    setPrevSrcKey(srcKey);
    setCurrentSrc(getOptimizedSrc(src, targetW));
    setHasError(false);
    setRetried(false);
    setIsLoading(true);
  }

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!retried && fallbackSrc && currentSrc !== fallbackSrc) {
      setRetried(true);
      setCurrentSrc(getOptimizedSrc(fallbackSrc, targetW));
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
    }
  }, [fallbackSrc, currentSrc, retried, targetW, onError]);

  // CRITICAL FIX: If image is already complete (from HTTP/browser cache), immediately resolve
  const checkImgComplete = useCallback((img: HTMLImageElement | null) => {
    imgRef.current = img;
    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        setIsLoading(false);
        setHasError(false);
      } else if (img.naturalWidth === 0 && img.src) {
        handleError();
      }
    }
  }, [handleError]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoading(false);
        setHasError(false);
      }
    }
  }, [currentSrc]);

  // 4s Watchdog Timeout: Prevent images from being indefinitely stuck in shimmer state
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      if (isLoading) {
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
          setIsLoading(false);
        } else if (!retried && fallbackSrc && currentSrc !== fallbackSrc) {
          setRetried(true);
          setCurrentSrc(getOptimizedSrc(fallbackSrc, targetW));
        } else {
          setIsLoading(false);
          setHasError(true);
        }
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLoading, currentSrc, fallbackSrc, retried, targetW]);

  // If fill is true, the container must be relative and fill parent
  const isFill = fill || (!width && !height);

  // Deterministic loading behavior
  const resolvedLoading = priority ? undefined : (loading || "lazy");

  const isShimmerActive = !isMounted || (isLoading && !hasError);
  const isImageVisible = isMounted && !isLoading && !hasError;

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF5F5] ${
        isFill ? "w-full h-full" : ""
      } ${containerClassName}`}
    >
      {/* Shimmer skeleton placeholder */}
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
          ref={checkImgComplete}
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
