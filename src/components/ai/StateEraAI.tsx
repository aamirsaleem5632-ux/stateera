"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Minimize2,
  Maximize2,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calculator,
  Compass,
  RotateCcw,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BRAND_CONFIG } from "@/config/brand";

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  action?: {
    label: string;
    path: string;
  };
}

export const StateEraAI: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, dir } = useLanguage();
  const { properties, walletBalance, holdings, totalPortfolioValue } = useDemo();

  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: t.ai.welcomeMsg,
      timestamp: "Just now",
    },
  ]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Context-aware prompt suggestions based on current pathname
  const contextualPrompts = React.useMemo(() => {
    if (pathname.includes("/property/")) {
      return [
        "How much rent would 10 shares earn each month?",
        "Is this property safe? Show legal checks",
        "Explain rent return before vs after costs",
        "Who is renting this building right now?",
      ];
    }
    if (pathname.includes("/dashboard") || pathname.includes("/wallet")) {
      return [
        "How much rent do I make every month?",
        "How do monthly rent payments work?",
        "How do I add more practice money?",
        "Which property earns me the most rent?",
      ];
    }
    if (pathname.includes("/manager")) {
      return [
        "How do I record rent collected from tenants?",
        "How much profit is left after property bills?",
        "Show current repair jobs",
      ];
    }
    if (pathname.includes("/tenant")) {
      return [
        "How do I pay my monthly rent?",
        "Ask for a home repair",
        "Explain my lease agreement terms",
      ];
    }
    if (pathname.includes("/admin")) {
      return [
        "How many investors have checked their identity?",
        "Check new buildings waiting for approval",
        "Check emergency reserve funds",
      ];
    }
    return [
      t.ai.prompt1,
      t.ai.prompt2,
      t.ai.prompt3,
      t.ai.prompt4,
    ];
  }, [pathname, t]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate intelligent context-aware reasoning
    setTimeout(() => {
      const response = generateAIResponse(query, pathname, properties, walletBalance, holdings, totalPortfolioValue, language);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: t.ai.welcomeMsg,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating StateEra AI Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <div className="relative group">
          {/* Tooltip */}
          <div className="hidden md:group-hover:flex absolute -top-10 right-0 bg-[#5B3A8C] text-white text-xs px-3 py-1.5 rounded-lg shadow-dropdown whitespace-nowrap items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span>{t.ai.tooltip}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white shadow-xl flex items-center justify-center relative border-2 border-[#E6D8F5] transition-all overflow-hidden"
            aria-label="Ask StateEra AI"
          >
            {/* Subtle internal pulse glow */}
            <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse pointer-events-none" />
            <Bot className="w-7 h-7 relative z-10 text-white" />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-mint rounded-full border-2 border-white" />
          </motion.button>
        </div>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-50 bg-white border border-[#E6D8F5] shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isMaximized
                ? "inset-4 md:inset-12 w-auto h-auto"
                : "bottom-24 md:bottom-24 right-4 md:right-6 w-[94vw] sm:w-[420px] md:w-[460px] h-[580px] max-h-[85vh]"
            }`}
            dir={dir}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F3EAFC] via-[#E6D8F5] to-[#FCE7F3] p-4 border-b border-[#E6D8F5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7C4DFF] text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1E1B4B] text-base leading-tight">
                      {BRAND_CONFIG.aiAgentName}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-mint text-[#1E1B4B]">
                      Demo AI
                    </span>
                  </div>
                  <p className="text-xs text-[#585375]">
                    {t.ai.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title={t.ai.clearChat}
                  className="p-1.5 rounded-lg text-[#585375] hover:bg-white/60 hover:text-[#7C4DFF] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="hidden sm:block p-1.5 rounded-lg text-[#585375] hover:bg-white/60 hover:text-[#7C4DFF] transition-colors"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#585375] hover:bg-white/60 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current Context Pill */}
            <div className="bg-[#F8F4FD] px-4 py-1.5 border-b border-[#E6D8F5] text-[11px] text-[#585375] flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <Compass className="w-3.5 h-3.5 text-[#7C4DFF]" />
                <span className="font-medium truncate">
                  Context: {getContextLabel(pathname)}
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-mint px-2 py-0.5 rounded font-medium">
                Live Data Connected
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-white to-[#F8F4FD]/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user"
                      ? dir === "rtl"
                        ? "items-start"
                        : "items-end"
                      : dir === "rtl"
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#7C4DFF] text-white rounded-tr-none"
                        : "bg-white text-[#1E1B4B] border border-[#E6D8F5] rounded-tl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {msg.action && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          router.push(msg.action!.path);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3EAFC] text-[#5B3A8C] hover:bg-[#E6D8F5] transition-colors"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8782A3] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E6D8F5] rounded-2xl w-fit">
                  <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce [animation-delay:0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce [animation-delay:0.3s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-3 py-2 bg-[#F8F4FD] border-t border-[#E6D8F5]/80 overflow-x-auto flex gap-2 no-scrollbar">
              {contextualPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#E6D8F5] text-[#5B3A8C] hover:border-[#7C4DFF] hover:bg-[#F3EAFC] transition-all flex items-center gap-1.5 flex-shrink-0"
                >
                  <Sparkles className="w-3 h-3 text-[#7C4DFF]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#E6D8F5] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.ai.placeholder}
                className="flex-1 bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder-[#8782A3] focus:outline-none focus:border-[#7C4DFF] focus:ring-1 focus:ring-[#7C4DFF]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-[#7C4DFF] text-white flex items-center justify-center hover:bg-[#6C3CE9] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4 rtl-flip" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function getContextLabel(pathname: string): string {
  if (pathname === "/") return "Homepage & Landing";
  if (pathname.includes("/explore")) return "Property Discovery & Map";
  if (pathname.includes("/property/")) return "Property Details & Due Diligence";
  if (pathname.includes("/dashboard")) return "Investor Portfolio & Performance";
  if (pathname.includes("/wallet")) return "Demo Cash & Distribution Ledger";
  if (pathname.includes("/reports")) return "Financial Reports & NOI Analytics";
  if (pathname.includes("/manager")) return "Property Operations & Work Orders";
  if (pathname.includes("/tenant")) return "Tenant Portal & Lease Agreements";
  if (pathname.includes("/admin")) return "Platform Administration & KYC";
  if (pathname.includes("/governance")) return "Shareholder Voting & Registry";
  if (pathname.includes("/simulator")) return "Risk & Yield Scenario Simulator";
  return "StateEra Platform";
}

// Deterministic, domain-expert real estate responses grounded in live application data
function generateAIResponse(
  query: string,
  pathname: string,
  properties: any[],
  walletBalance: number,
  holdings: any[],
  totalPortfolioValue: number,
  language: string
): ChatMessage {
  const q = query.toLowerCase();
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // 1. Yield & Return Calculations
  if (q.includes("gross") || q.includes("net") || q.includes("yield") || q.includes("difference") || q.includes("cost") || q.includes("return")) {
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**Yearly Rent Return (Before vs After Costs):**\n\n• **Before Costs (Gross Return):** The total rent collected from the renter before paying any bills.\n• **After Costs (Net Return):** What you actually keep in your pocket after paying property taxes, building insurance, cleaning, and repair savings.\n\n**Example:** If a building collects 10.1% rent per year, but costs 1.4% in running bills, you pocket **8.7% yearly rent**.\n\nAll monthly rent payouts on StateEra are paid directly from net rent into your wallet.`,
      timestamp: time,
      action: {
        label: "Compare All Property Returns",
        path: "/explore",
      },
    };
  }

  // 2. Investment calculation query (e.g. $500 or shares)
  if (q.includes("calculate") || q.includes("500") || q.includes("invest") || q.includes("10 shares") || q.includes("rent")) {
    const sampleProperty = properties[0];
    const sharesFor500 = Math.floor(500 / sampleProperty.sharePrice);
    const estMonthlyPayout = (sharesFor500 * sampleProperty.monthlyPerShareRent).toFixed(2);
    const estAnnualPayout = (Number(estMonthlyPayout) * 12).toFixed(2);

    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**Example of what a $500 investment earns:**\n\nUsing **${sampleProperty.title}** (1 share costs $${sampleProperty.sharePrice}, pays ${sampleProperty.netYield}% yearly rent after costs):\n\n• **Shares you get:** ${sharesFor500} shares ($${sharesFor500 * sampleProperty.sharePrice})\n• **Estimated rent paid to you:** $${estMonthlyPayout} every month\n• **Estimated rent for the year:** $${estAnnualPayout} per year\n\n*All rent is credited straight into your wallet on the 1st of every month.*`,
      timestamp: time,
      action: {
        label: `View ${sampleProperty.title}`,
        path: `/property/${sampleProperty.id}`,
      },
    };
  }

  // 3. Property search / highest yield
  if (q.includes("high") || q.includes("find") || q.includes("top") || q.includes("9%")) {
    const highYields = properties.filter((p) => p.netYield >= 8.5);
    const list = highYields
      .slice(0, 3)
      .map(
        (p) => `• **${p.title}** (${p.city}, ${p.country}): **${p.netYield}%** Yearly Return ($${p.sharePrice} / share)`
      )
      .join("\n");

    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**Top Rent-Earning Properties on StateEra:**\n\n${list}\n\nEach building has verified ownership deeds, reliable corporate renters, and monthly rent payouts into your wallet.`,
      timestamp: time,
      action: {
        label: "Explore Top Properties",
        path: "/explore",
      },
    };
  }

  // 4. Due Diligence and Risk Analysis
  if (q.includes("due diligence") || q.includes("risk") || q.includes("legal") || q.includes("audit") || q.includes("safe") || q.includes("document")) {
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**Is this property safe? How we check:**\n\nEvery building listed on StateEra goes through 4 simple checks:\n1. **Ownership Papers:** Verified with official land registry records to confirm clear ownership.\n2. **Building Condition:** Certified engineers inspect plumbing, elevators, and physical structure.\n3. **Renter Payment History:** We check that tenants have paid rent on time without missing months.\n4. **Insurance:** Full insurance protects against physical damage or lost rent.\n\nYou can inspect all certificates on the **Property Checks** tab of any property page.`,
      timestamp: time,
      action: {
        label: "Inspect Property Checks",
        path: `/property/${properties[0].id}`,
      },
    };
  }

  // 5. Portfolio & Wallet balance
  if (q.includes("portfolio") || q.includes("wallet") || q.includes("balance") || q.includes("my shares")) {
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**Your Investments & Wallet Summary:**\n\n• **Practice Cash in Wallet:** $${walletBalance.toLocaleString()}\n• **Total Value of Your Shares:** $${totalPortfolioValue.toLocaleString()}\n• **Properties You Own Shares In:** ${holdings.length} buildings\n\nWould you like to test a rent payout or buy shares in another building?`,
      timestamp: time,
      action: {
        label: "Go to My Investments",
        path: "/dashboard",
      },
    };
  }

  // 6. Fractional ownership explainer
  if (q.includes("how it works") || q.includes("fractional") || q.includes("what is")) {
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `**How Buying Shares in Property Works:**\n\n1. **Small Parts (Shares):** Instead of needing millions to buy an entire building, each building is split into small parts starting from $50.\n2. **Pick Your Shares:** You choose how many shares to buy using your wallet balance.\n3. **Collect Rent Monthly:** Rent collected from the building's tenants is paid straight to your wallet on the 1st of every month.\n4. **Sell Whenever You Want:** You can keep your shares to earn rent, or sell them to other investors on the trading page anytime.`,
      timestamp: time,
      action: {
        label: "Try Buying Shares",
        path: "/explore",
      },
    };
  }

  // Default general assistant response
  return {
    id: `ai-${Date.now()}`,
    sender: "ai",
    text: `I'm happy to help you with "${query}".\n\nOn StateEra, you can explore **${properties.length} real buildings**, buy small shares starting at $50, collect monthly rent, and inspect building safety checks. What would you like to explore?`,
    timestamp: time,
    action: {
      label: "Find Buildings",
      path: "/explore",
    },
  };
}
