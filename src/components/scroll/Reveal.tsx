"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

// Supported direction variants
export type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in";

// Premium easing curve: cubic-bezier(0.22, 1, 0.36, 1)
const EASING = [0.22, 1, 0.36, 1] as const;

// Desktop movement distance (24px) & Mobile movement distance (14px)
const DESKTOP_DISTANCE = 24;
const MOBILE_DISTANCE = 14;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "transition"> {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable scroll-reveal component using Framer Motion whileInView.
 * - viewport={{ once: true, amount: 0.2 }}
 * - Respects prefers-reduced-motion: if enabled, disables movement and simply displays content.
 * - RTL: flips fade-left and fade-right for Urdu and Arabic.
 * - Mobile: shorter distance (14px) to ensure smoothness on low-end devices.
 * - Content is always visible if JS animation is disabled or fails.
 */
export const Reveal: React.FC<RevealProps> = ({
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  as = "div",
  children,
  className,
  ...rest
}) => {
  const mounted = useIsMounted();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  const Tag = as as any;

  // Render pure static HTML on server and during initial client hydration to guarantee 100% hydration match
  if (!mounted || reducedMotion) {
    return (
      <Tag className={className} {...(rest as any)}>
        {children}
      </Tag>
    );
  }

  // RTL-aware directional flip for left/right variants
  const resolveVariant = (v: RevealVariant): RevealVariant => {
    if (!isRTL) return v;
    if (v === "fade-left") return "fade-right";
    if (v === "fade-right") return "fade-left";
    return v;
  };

  const resolvedVariant = resolveVariant(variant);
  const dist = isMobile ? MOBILE_DISTANCE : DESKTOP_DISTANCE;

  const getHiddenState = (v: RevealVariant) => {
    switch (v) {
      case "fade-up":
        return { opacity: 0, y: dist };
      case "fade-in":
        return { opacity: 0, y: 0 };
      case "fade-left":
        return { opacity: 0, x: -dist };
      case "fade-right":
        return { opacity: 0, x: dist };
      case "scale-in":
        return { opacity: 0, scale: 0.94 };
      default:
        return { opacity: 0, y: dist };
    }
  };

  const getVisibleState = (v: RevealVariant) => {
    switch (v) {
      case "fade-up":
        return { opacity: 1, y: 0 };
      case "fade-in":
        return { opacity: 1, y: 0 };
      case "fade-left":
        return { opacity: 1, x: 0 };
      case "fade-right":
        return { opacity: 1, x: 0 };
      case "scale-in":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const MotionTag: any = (motion as any)[as] || motion.div;

  return (
    <MotionTag
      initial={getHiddenState(resolvedVariant)}
      whileInView={getVisibleState(resolvedVariant)}
      viewport={{ once: true, amount: 0.05, margin: "100px" }}
      transition={{
        duration,
        delay,
        ease: EASING,
      }}
      className={className}
      {...(rest as any)}
    >
      {children}
    </MotionTag>
  );
};

// ─── RevealGroup: staggered children ───────────────────────────────────────

interface RevealGroupProps {
  children: React.ReactNode;
  stagger?: number; // seconds between children (default 0.08s)
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Robust group wrapper that reliably renders all children across all devices,
 * eliminating blank grids or hidden DOM items while preserving responsive styling.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  as = "div",
}) => {
  const Tag = as as any;
  return <Tag className={className}>{children}</Tag>;
};
