"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Back-to-top button.
 * - Appears after scrolling 400px down
 * - Positioned safely to the side of the StateEraAI FAB button so they never overlap
 * - Stays clear of the mobile bottom nav
 * - Clean white editorial styling with maroon icon
 */
export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (reducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed z-50
            bottom-[88px] right-4
            md:bottom-6 md:right-24
            w-11 h-11 rounded-full
            bg-white
            border border-[#EADCDD]
            shadow-sm
            text-[#3B0F18]
            hover:bg-[#FAF5F5] hover:border-[#3B0F18]
            flex items-center justify-center
            transition-all duration-200
          "
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
