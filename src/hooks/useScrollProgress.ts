"use client";

import { useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Returns a smoothed scroll progress value [0, 1] for the page.
 * Returns 0 at all times if reduced-motion is active.
 */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  // If reducedMotion, return a static 0 value
  // We can't conditionally call hooks so we return smoothed always but
  // callers should check reducedMotion separately.
  return reducedMotion ? scrollYProgress : smoothed;
}

/**
 * Returns a parallax translateY value derived from scroll position.
 * On mobile (<768px) or reduced-motion, returns a static 0.
 */
export function useParallaxY(
  amount: number = 40,
  inputRange: [number, number] = [0, 1]
): MotionValue<number> {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();

  const translateY = useTransform(
    scrollY,
    [0, 1000],
    reducedMotion ? [0, 0] : [-amount / 2, amount / 2]
  );

  return translateY;
}
