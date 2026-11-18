"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Hook to trigger Recharts animation only when the chart scrolls into view.
 * Runs once (once: true) and respects prefers-reduced-motion.
 * Returns a tuple [ref, isAnimationActive, isVisible] for clean compiler inference.
 */
export function useChartInView() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const isVisible = reducedMotion || hasIntersected;
  const isAnimationActive = !reducedMotion && isVisible;

  useEffect(() => {
    if (reducedMotion || hasIntersected) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, hasIntersected]);

  return [ref, isAnimationActive, isVisible] as const;
}
