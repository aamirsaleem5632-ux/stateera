"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, TranslationDictionary } from "./types";
import { en } from "./dictionaries/en";
import { ur } from "./dictionaries/ur";
import { ar } from "./dictionaries/ar";
import { hi } from "./dictionaries/hi";
import { pa } from "./dictionaries/pa";
import { es } from "./dictionaries/es";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  dir: "ltr" | "rtl";
}

const dictionaries: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  ur,
  ar,
  hi,
  pa,
  es,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("stateera_language") as SupportedLanguage;
      if (saved && dictionaries[saved]) {
        setLanguageState(saved);
        updateHtmlDir(saved);
      }
    } catch {
      // Ignore localStorage read errors in SSR/strict env
    }
  }, []);

  const updateHtmlDir = (lang: SupportedLanguage) => {
    const isRtl = lang === "ur" || lang === "ar";
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    updateHtmlDir(lang);
    try {
      localStorage.setItem("stateera_language", lang);
    } catch {
      // Ignore storage errors
    }
  };

  const dir: "ltr" | "rtl" = language === "ur" || language === "ar" ? "rtl" : "ltr";
  const t = dictionaries[language] || en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
