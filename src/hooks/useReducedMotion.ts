"use client";

import { useState, useEffect } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns true if the user has requested reduced motion.
 * Hydration-safe: always defaults to false during SSR and initial client hydration,
 * resolving to the client's actual system preference only after mount.
 */
export function useReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const shouldReduce = useFramerReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;
  return shouldReduce ?? false;
}
