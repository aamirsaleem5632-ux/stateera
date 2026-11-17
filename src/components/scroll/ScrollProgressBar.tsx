"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Thin scroll progress bar at the top of the landing page.
 * Uses solid maroon token (#3B0F18).
 * Respects prefers-reduced-motion and only activates on public landing page.
 */
export const ScrollProgressBar: React.FC = () => {
  const pathname = usePathname();
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();

  // Only render on landing page as requested
  if (pathname !== "/" || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-[#3B0F18]"
        style={{
          scaleX: scrollProgress,
        }}
      />
    </div>
  );
};
