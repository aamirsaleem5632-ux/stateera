"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number; // seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

/**
 * Counts up from `start` to `end` when the ref element enters the viewport.
 * Runs only once (once: true). Respects prefers-reduced-motion.
 */
export function useCountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: UseCountUpOptions) {
  const [displayValue, setDisplayValue] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (hasStarted) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            observer.disconnect();

            if (reducedMotion) {
              setDisplayValue(end);
              return;
            }

            const startTime = performance.now();
            const totalDurationMs = duration * 1000;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / totalDurationMs, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = start + (end - start) * eased;
              setDisplayValue(parseFloat(current.toFixed(decimals)));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(end);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, start, duration, decimals, hasStarted, reducedMotion]);

  const formatted = `${prefix}${displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return { ref, value: displayValue, formatted };
}
