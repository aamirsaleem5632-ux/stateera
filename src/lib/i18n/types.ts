export type SupportedLanguage = "en" | "ur" | "ar" | "pa" | "hi" | "es";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl", flag: "🇵🇰" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇦🇪" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", dir: "ltr", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
];

export interface TranslationDictionary {
  nav: {
    home: string;
    explore: string;
    howItWorks: string;
    about: string;
    contact: string;
    dashboard: string;
    portfolio: string;
    wallet: string;
    trading: string;
    reports: string;
    manager: string;
    tenant: string;
    admin: string;
    governance: string;
    simulator: string;
    login: string;
    getStarted: string;
    tryDemo: string;
    resetDemo: string;
    roleInvestor: string;
    roleManager: string;
    roleTenant: string;
    roleAdmin: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    demoBtn: string;
    trustInvestors: string;
    trustVolume: string;
    trustAvgYield: string;
    trustProperties: string;
  };
  common: {
    demoBadge: string;
    demoNotice: string;
    yield: string;
    grossYield: string;
    netYield: string;
    sharePrice: string;
    availableShares: string;
    totalShares: string;
    totalValuation: string;
    fundingProgress: string;
    location: string;
    category: string;
    searchPlaceholder: string;
    filter: string;
    sortBy: string;
    viewDetails: string;
    buyShares: string;
    sellShares: string;
    investNow: string;
    rentPayout: string;
    estimatedRent: string;
    monthlyPayout: string;
    annualYield: string;
    status: string;
    verified: string;
    pending: string;
    all: string;
    residential: string;
    commercial: string;
    villa: string;
    waterfront: string;
    luxury: string;
  };
  dashboard: {
    welcome: string;
    portfolioValue: string;
    totalInvested: string;
    totalGainLoss: string;
    monthlyIncome: string;
    annualReturn: string;
    quickActions: string;
    invest: string;
    withdraw: string;
    topUp: string;
    myHoldings: string;
    recentActivity: string;
    watchlist: string;
    payoutHistory: string;
  };
  trading: {
    title: string;
    orderCard: string;
    marketOrder: string;
    limitOrder: string;
    quantity: string;
    orderValue: string;
    monthlyYieldEst: string;
    availableCash: string;
    confirmBuy: string;
    confirmSell: string;
    orderSuccess: string;
    insufficientFunds: string;
    insufficientShares: string;
  };
  ai: {
    title: string;
    subtitle: string;
    tooltip: string;
    welcomeMsg: string;
    placeholder: string;
    prompt1: string;
    prompt2: string;
    prompt3: string;
    prompt4: string;
    clearChat: string;
  };
  footer: {
    intro: string;
    quickLinks: string;
    investorResources: string;
    managerResources: string;
    legalRisk: string;
    rights: string;
  };
}
