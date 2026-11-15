"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
import { GLOSSARY_ITEMS } from "@/data/glossary";

interface InfoTooltipProps {
  /** If termId is provided, text is loaded from glossary automatically */
  termId?: string;
  /** Custom title for the tooltip */
  title?: string;
  /** Plain explanation text */
  text?: string;
  /** Optional real-world example */
  example?: string;
  /** Size variant */
  size?: "sm" | "md";
  /** Custom className */
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  termId,
  title,
  text,
  example,
  size = "sm",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Look up glossary item if termId is provided
  const glossaryItem = termId ? GLOSSARY_ITEMS.find((g) => g.id === termId) : null;
  const displayTitle = title || glossaryItem?.simpleTerm || glossaryItem?.term;
  const displayText = text || glossaryItem?.shortExplanation;
  const displayExample = example || glossaryItem?.example;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!displayText) return null;

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center relative align-middle ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={displayTitle ? `Explain ${displayTitle}` : "Explain this term"}
        className="inline-flex items-center justify-center text-[#8782A3] hover:text-[#7C4DFF] focus:outline-none transition-colors p-0.5 rounded-full hover:bg-[#F3EAFC]"
      >
        <HelpCircle className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3 bg-[#1E1B4B] text-white text-xs rounded-xl shadow-xl z-50 text-left pointer-events-auto border border-[#5B3A8C] animate-fade-in"
        >
          {displayTitle && (
            <span className="font-bold text-mint block mb-1 flex items-center justify-between">
              <span>{displayTitle}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white/60 hover:text-white sm:hidden"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <span className="text-white/90 leading-relaxed block text-[11px] font-normal">
            {displayText}
          </span>
          {displayExample && (
            <span className="mt-2 pt-1.5 border-t border-white/10 block text-[10px] text-mint/90 leading-normal font-normal">
              <strong>Example: </strong>{displayExample}
            </span>
          )}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E1B4B]" />
        </span>
      )}
    </span>
  );
};
