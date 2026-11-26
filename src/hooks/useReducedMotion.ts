"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";

/**
 * Returns true if the user has requested reduced motion.
 * Hydration-safe: always defaults to false during SSR and initial client hydration,
 * resolving to the client's actual system preference only after mount.
 */
export function useReducedMotion(): boolean {
  const mounted = useIsMounted();
  const shouldReduce = useFramerReducedMotion();

  if (!mounted) return false;
  return shouldReduce ?? false;
}
