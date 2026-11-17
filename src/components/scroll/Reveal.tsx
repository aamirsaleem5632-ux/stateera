"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  // If reduced motion, render plain container with content immediately visible
  if (reducedMotion) {
    const Tag = as as React.ElementType;
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: EASING,
      }}
      className={className}
      style={{ willChange: "opacity, transform", ...((rest as any).style ?? {}) }}
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

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const childVariants = (
  variant: RevealVariant,
  duration: number,
  isRTL: boolean,
  dist: number
): Variants => {
  const resolvedVariant: RevealVariant =
    isRTL && variant === "fade-left"
      ? "fade-right"
      : isRTL && variant === "fade-right"
      ? "fade-left"
      : variant;

  const hidden: Record<string, number> = {};
  const visible: Record<string, number> = {};

  switch (resolvedVariant) {
    case "fade-up":
      hidden.opacity = 0; hidden.y = dist;
      visible.opacity = 1; visible.y = 0;
      break;
    case "fade-in":
      hidden.opacity = 0;
      visible.opacity = 1;
      break;
    case "fade-left":
      hidden.opacity = 0; hidden.x = -dist;
      visible.opacity = 1; visible.x = 0;
      break;
    case "fade-right":
      hidden.opacity = 0; hidden.x = dist;
      visible.opacity = 1; visible.x = 0;
      break;
    case "scale-in":
      hidden.opacity = 0; hidden.scale = 0.94;
      visible.opacity = 1; visible.scale = 1;
      break;
  }

  return {
    hidden,
    visible: {
      ...visible,
      transition: { duration, ease: EASING },
    },
  };
};

/**
 * Wraps children with staggered reveal animations (default 0.08s).
 * Each direct child animates one-by-one as the group scrolls into view.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.5,
  variant = "fade-up",
  className,
  as = "div",
}) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  if (reducedMotion) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag: any = (motion as any)[as] || motion.div;
  const dist = isMobile ? MOBILE_DISTANCE : DESKTOP_DISTANCE;
  const cv = childVariants(variant, duration, isRTL, dist);

  return (
    <MotionTag
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      style={{ willChange: "opacity, transform" } as React.CSSProperties}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div
            variants={cv}
            style={{ willChange: "opacity, transform" } as React.CSSProperties}
          >
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </MotionTag>
  );
};
