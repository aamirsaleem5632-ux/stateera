"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Hook to trigger Recharts animation only when the chart scrolls into view.
 * Runs once (once: true) and respects prefers-reduced-motion.
 */
export function useChartInView() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isVisible) return;
    const element = ref.current;
    if (!element) return;

    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, reducedMotion]);

  return { ref, isVisible, isAnimationActive: !reducedMotion && isVisible };
}
