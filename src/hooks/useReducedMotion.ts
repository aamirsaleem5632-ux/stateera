"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns true if the user has requested reduced motion.
 * Uses Framer Motion's built-in hook so it stays consistent with the animation system.
 */
export function useReducedMotion(): boolean {
  const shouldReduce = useFramerReducedMotion();
  return shouldReduce ?? false;
}
