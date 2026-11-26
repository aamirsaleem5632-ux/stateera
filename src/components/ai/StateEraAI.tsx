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

function createUserMessageId(): string {
  return `usr-${Date.now()}`;
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
      "How does fractional real estate work?",
      "Can I sell my shares whenever I want?",
      "How are monthly rent payouts calculated?",
      "What are the best properties to explore?",
    ];
  }, [pathname]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: createUserMessageId(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // AI Response Generation
    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = "";
      let actionObj: { label: string; path: string } | undefined;

      if (
        lower.includes("recommend") ||
        lower.includes("best propert") ||
        lower.includes("under $") ||
        lower.includes("dubai") ||
        lower.includes("lahore") ||
        lower.includes("karachi") ||
        lower.includes("london") ||
        lower.includes("new york") ||
        lower.includes("highest yield")
      ) {
        const maxPriceMatch = lower.match(/under\s*\$?(\d+)/);
        const maxPrice = maxPriceMatch ? Number(maxPriceMatch[1]) : Infinity;
        const cityKeywords = ["dubai", "lahore", "karachi", "islamabad", "london", "new york", "singapore", "tokyo", "miami", "zurich", "paris"];
        const matchedCity = cityKeywords.find((c) => lower.includes(c));
        const matches = properties
          .filter((p) => {
            const okPrice = p.sharePrice <= maxPrice;
            const okCity = !matchedCity || p.city.toLowerCase().includes(matchedCity);
            return okPrice && okCity;
          })
          .sort((a, b) => b.netYield - a.netYield)
          .slice(0, 3);

        if (matches.length > 0) {
          const listText = matches
            .map((p) => `• ${p.title} (${p.city}) — ${p.netYield}% net yield, $${p.sharePrice}/share`)
            .join("\n");
          responseText = `Based on the live StateEra catalog (${properties.length} properties), here are the top matching assets:\n${listText}`;
          actionObj = { label: `Inspect ${matches[0].title}`, path: `/property/${matches[0].id}` };
        } else {
          responseText = `No properties matched those exact filters in our ${properties.length}-asset catalog. Try broadening your price or city criteria in Explore.`;
          actionObj = { label: "Browse All Properties", path: "/explore" };
        }
      } else if (lower.includes("how does") || lower.includes("how it works") || lower.includes("fractional")) {
        responseText =
          "Fractional real estate means a large property is split into thousands of small, affordable parts called 'shares' (from $25–$100 each). When you own shares, real tenants pay rent each month. After basic building bills are paid, your share of the profit is sent straight into your practice wallet on the 1st of every month.";
        actionObj = { label: "How StateEra Works", path: "/how-it-works" };
      } else if (lower.includes("expert") || lower.includes("lawyer") || lower.includes("consult") || lower.includes("advisor") || lower.includes("attorney")) {
        responseText =
          "StateEra connects you directly with accredited Property Legal Advisors, Chartered RICS Valuation Surveyors, and Financial Strategists. You can schedule a video or in-person consultation anytime.";
        actionObj = { label: "Human Expert Network", path: "/experts" };
      } else if (lower.includes("micro") || lower.includes("saver") || lower.includes("scheme") || lower.includes("family circle") || lower.includes("rent to equity")) {
        responseText =
          "Our Affordable Ownership pathways include the Micro-Saver (recurring contributions from $15/wk), Learn-to-Own Academy, Rent-to-Equity for tenants, and Family Property Circles for intergenerational savings.";
        actionObj = { label: "Explore Ownership Schemes", path: "/schemes" };
      } else if (lower.includes("passport") || lower.includes("trust") || lower.includes("safe") || lower.includes("legal") || lower.includes("audit")) {
        responseText =
          "Every listed building features a verifiable Digital Property Passport with independent title checks, Bureau Veritas engineering audits, bank escrow reconciliations, and comprehensive replacement insurance.";
        actionObj = { label: "Trust & Verification Centre", path: "/trust" };
      } else if (lower.includes("ai") || lower.includes("detective") || lower.includes("urdu") || lower.includes("predict")) {
        responseText =
          "Explore the StateEra AI Property Detective for instant document parsing, multi-factor rental yield predictions, and plain-language Urdu property risk explanations.";
        actionObj = { label: "AI Intelligence Ecosystem", path: "/ai-features" };
      } else if (lower.includes("rent") || lower.includes("monthly") || lower.includes("payout")) {
        const estMonthly = holdings.reduce((sum, h) => sum + h.sharesOwned * 0.9, 0);
        responseText = `You currently earn an estimated $${estMonthly.toFixed(2)} in monthly rent from your holdings. Rent is collected from tenants and paid directly into your wallet on the 1st of every month.`;
        actionObj = { label: "Open Wallet", path: "/wallet" };
      } else if (lower.includes("safe") || lower.includes("legal") || lower.includes("due diligence") || lower.includes("audit")) {
        responseText =
          "Every building undergoes 4 independent checks before listing: 1) Title Deed check at the official land registry, 2) Structural engineering & MEP audit, 3) Financial & escrow bank reconciliation, and 4) All-risk property insurance. You can view all audited certificates on the property's Due Diligence tab.";
        actionObj = { label: "View Reports", path: "/reports" };
      } else if (lower.includes("sell") || lower.includes("cash out") || lower.includes("trade") || lower.includes("liquidity")) {
        responseText =
          "You do not have to wait years to sell the building. You can place your shares on the secondary market trade page anytime, set your price, and receive demo cash as soon as another investor buys them.";
        actionObj = { label: "Secondary Trading", path: "/trade" };
      } else if (lower.includes("practice") || lower.includes("money") || lower.includes("wallet") || lower.includes("balance")) {
        responseText = `Your practice wallet has $${walletBalance.toLocaleString()} available. This is simulated demo money so you can test buying shares, collecting rent, and selling shares with zero financial risk.`;
        actionObj = { label: "View Wallet", path: "/wallet" };
      } else if (lower.includes("calculator") || lower.includes("stress test") || lower.includes("what if")) {
        responseText =
          "Try our 'What If?' Scenario Calculator to see how your monthly rent changes if occupancy drops or maintenance costs rise.";
        actionObj = { label: "Open Scenario Simulator", path: "/simulator" };
      } else {
        responseText =
          "StateEra lets you own pieces of high-yield properties and collect passive monthly rent. Would you like me to guide you to our top-rated properties, explain the ownership paperwork, or show you how to buy your first share with practice funds?";
        actionObj = { label: "Explore Properties", path: "/explore" };
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: actionObj,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "msg-welcome-new",
        sender: "ai",
        text: t.ai.welcomeMsg,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Trigger Button: solid maroon circle with white icon */}
      <div className="se-ai-fab">
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#3B0F18] text-white shadow-md flex items-center justify-center relative hover:bg-[#2A0A10] transition-colors"
            aria-label="Ask StateEra AI"
          >
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-[#15803D] rounded-full border-2 border-white" />
          </motion.button>
        </div>
      </div>

      {/* Floating Chat Modal / Drawer: clean white card with border */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed z-50 bg-white border border-[#EADCDD] rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${
              isMaximized
                ? "inset-4 md:inset-12 w-auto h-auto"
                : "bottom-[76px] md:bottom-24 right-4 md:right-6 w-[94vw] sm:w-[420px] md:w-[450px] h-[580px] max-h-[75vh] md:max-h-[85vh]"
            }`}
            dir={dir}
          >
            {/* Header */}
            <div className="bg-[#FAF5F5] p-3.5 border-b border-[#EADCDD] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#3B0F18] text-white flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1A080C] text-sm leading-tight">
                      {BRAND_CONFIG.aiAgentName}
                    </h3>
                    <span className="bg-[#FAF5F5] border border-[#EADCDD] text-[#5E4A4E] text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Rule-Based Demo
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5E4A4E]">
                    {t.ai.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title={t.ai.clearChat}
                  className="p-1.5 rounded-lg text-[#5E4A4E] hover:bg-white hover:text-[#3B0F18] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="hidden sm:block p-1.5 rounded-lg text-[#5E4A4E] hover:bg-white hover:text-[#3B0F18] transition-colors"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#5E4A4E] hover:bg-white hover:text-[#B91C1C] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current Context Strip */}
            <div className="bg-white px-4 py-1.5 border-b border-[#EADCDD] text-[11px] text-[#5E4A4E] flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <Compass className="w-3.5 h-3.5 text-[#3B0F18]" />
                <span className="font-medium truncate">
                  Context: {getContextLabel(pathname)}
                </span>
              </div>
              <span className="text-[10px] text-[#15803D] font-bold">
                Connected
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white">
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
                    className={`max-w-[85%] rounded-xl p-3.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#3B0F18] text-white"
                        : "bg-[#FAF5F5] border border-[#EADCDD] text-[#1A080C]"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-[#EADCDD]">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            router.push(msg.action!.path);
                          }}
                          className="btn btn-secondary text-xs py-1 px-3 min-h-[32px] inline-flex items-center gap-1 font-semibold"
                        >
                          <span>{msg.action.label}</span>
                          &rarr;
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8C7B7F] px-1 pt-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-[#FAF5F5] border border-[#EADCDD] p-3 rounded-xl w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#3B0F18] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#3B0F18] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#3B0F18] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Quick Suggestions (no sparkles, plain clean pills) */}
            <div className="px-3 py-2 bg-[#FAF5F5] border-t border-[#EADCDD] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {contextualPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap text-xs px-2.5 py-1 rounded-lg bg-white border border-[#EADCDD] text-[#5E4A4E] hover:border-[#3B0F18] hover:text-[#1A080C] transition-all flex-shrink-0"
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#EADCDD] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.ai.placeholder}
                className="input flex-1 text-sm placeholder-[#8C7B7F]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="btn btn-primary w-10 h-10 p-0 flex items-center justify-center rounded-lg disabled:opacity-40"
              >
                <Send className="w-4 h-4 rtl-flip text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function getContextLabel(pathname: string): string {
  if (pathname === "/") return "Homepage";
  if (pathname.includes("/explore")) return "Explore & Map";
  if (pathname.includes("/property/")) return "Property Details";
  if (pathname.includes("/dashboard")) return "Investor Portfolio";
  if (pathname.includes("/wallet")) return "Demo Wallet";
  if (pathname.includes("/reports")) return "Reports & Insights";
  if (pathname.includes("/manager")) return "Manager Portal";
  if (pathname.includes("/tenant")) return "Tenant Portal";
  if (pathname.includes("/admin")) return "Admin Portal";
  if (pathname.includes("/governance")) return "Owner Voting";
  if (pathname.includes("/simulator")) return "Scenario Calculator";
  return "StateEra Platform";
}
