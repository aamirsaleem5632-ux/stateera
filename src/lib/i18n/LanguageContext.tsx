"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, TranslationDictionary } from "./types";
import { en } from "./dictionaries/en";
import { ur } from "./dictionaries/ur";
import { ar } from "./dictionaries/ar";
import { hi } from "./dictionaries/hi";
import { pa } from "./dictionaries/pa";
import { es } from "./dictionaries/es";
import { useStorageItem, setStorageItem } from "@/lib/storageStore";

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

function updateHtmlDir(lang: SupportedLanguage) {
  const isRtl = lang === "ur" || lang === "ar";
  if (typeof document !== "undefined") {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedLangRaw = useStorageItem("stateera_language", "en");
  const storedLang: SupportedLanguage =
    storedLangRaw && dictionaries[storedLangRaw as SupportedLanguage]
      ? (storedLangRaw as SupportedLanguage)
      : "en";

  // In-memory fallback if localStorage is completely blocked or restricted
  const [localFallback, setLocalFallback] = useState<{
    targetLang: SupportedLanguage;
    prevStored: string | null;
  } | null>(null);

  // If storage updated (same-tab or cross-tab), fallback is cleared/superseded
  const language =
    localFallback && localFallback.prevStored === storedLangRaw
      ? localFallback.targetLang
      : storedLang;

  // DOM attribute synchronization (external system mutation - no React setState)
  useEffect(() => {
    updateHtmlDir(language);
  }, [language]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    if (!dictionaries[lang]) return;
    setLocalFallback({ targetLang: lang, prevStored: storedLangRaw });
    setStorageItem("stateera_language", lang);
  }, [storedLangRaw]);

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
