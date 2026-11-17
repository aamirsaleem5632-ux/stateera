"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Award,
  ArrowRight,
  Sparkles,
  PlayCircle,
  FileCheck,
  TrendingUp,
  Percent,
} from "lucide-react";

export default function LearnCentrePage() {
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const modules = [
    {
      id: "mod-1",
      level: "Beginner",
      title: "Fractional Real Estate 101",
      duration: "5 min read",
      desc: "Understand how an entire commercial building or residential luxury tower is legally divided into small, accessible ownership units starting at $25.",
      topics: ["What is fractionalization?", "How shares represent true equity", "Why fractional real estate eliminates mortgage debt"],
    },
    {
      id: "mod-2",
      level: "Beginner",
      title: "Gross Yield vs Net Yield",
      duration: "6 min read",
      desc: "Learn why looking only at Gross Rental Yield can be misleading. Discover how property tax, management fees, and sinking fund reserves determine your true cashflow.",
      topics: ["Gross yield definition", "Operating expenses (OpEx)", "Net yield formula with realistic examples"],
    },
    {
      id: "mod-3",
      level: "Intermediate",
      title: "How to Read a Property Inspection Report",
      duration: "8 min read",
      desc: "Decode an independent Bureau Veritas engineering audit. Learn to spot foundation soundness, HVAC lifecycle milestones, and critical MEP items.",
      topics: ["Structural soundness criteria", "MEP (Mechanical, Electrical, Plumbing) checks", "Assessing capital expenditure reserve adequacy"],
    },
    {
      id: "mod-4",
      level: "Intermediate",
      title: "Legal Title Deeds & Trust Structures",
      duration: "7 min read",
      desc: "Examine how Special Purpose Vehicles (SPVs) hold property title deeds on behalf of fractional investors and protect against developer insolvencies.",
      topics: ["What is a bankruptcy-remote SPV?", "Freehold title validation", "Escrow protection for rental payouts"],
    },
    {
      id: "mod-5",
      level: "Advanced",
      title: "Global Portfolio Diversification & Currency Hedging",
      duration: "9 min read",
      desc: "Construct an international property portfolio spanning North America, Europe, the Middle East, and Asia to minimize currency exposure and economic cycles.",
      topics: ["Correlating international rental yields", "Hedging USD, EUR, GBP, and AED rental flows", "Emerging market high-yield vs prime market capital safety"],
    },
    {
      id: "mod-6",
      level: "Advanced",
      title: "Liquidity & Secondary Marketplace Trading",
      duration: "6 min read",
      desc: "Master the dynamics of selling your shares to other community members, setting limit orders, and navigating settlement periods.",
      topics: ["How secondary matching works", "Market vs Limit orders", "Fair value benchmarking against AI property valuations"],
    },
  ];

  const quizQuestions = [
    {
      q: "What is the key difference between Gross Yield and Net Yield?",
      options: [
        "Gross yield includes bank loan repayments, whereas net yield does not.",
        "Gross yield is calculated before deducting property expenses (taxes, maintenance, management), while net yield reflects actual cashflow received.",
        "Net yield is only applicable to commercial buildings, while gross yield applies to residential homes.",
        "There is no difference; both terms mean the exact same thing.",
      ],
      correct: 1,
      explanation: "Net yield deducts all operating expenses (property taxes, insurance, building management, and maintenance reserves) from collected tenant rent, showing your true return.",
    },
    {
      q: "How does StateEra hold the legal title of a property?",
      options: [
        "The property is owned personally by the CEO of StateEra.",
        "Through an independent, bankruptcy-remote Special Purpose Vehicle (SPV) where fractional shareholders hold proportional ownership.",
        "StateEra does not purchase real property; it only trades financial derivatives.",
        "The tenant legally owns the building until the lease expires.",
      ],
      correct: 1,
      explanation: "Each property is ring-fenced in a dedicated Special Purpose Vehicle (SPV) that shields fractional share-owners from corporate liabilities.",
    },
    {
      q: "When are monthly rental income dividends credited to investor wallets?",
      options: [
        "Once every 5 years upon property sale.",
        "Randomly whenever the tenant feels like paying.",
        "On the 1st of every month automatically from verified escrow receipts.",
        "Never; rent is always reinvested without investor choice.",
      ],
      correct: 2,
      explanation: "On the 1st of every month, verified net rental proceeds from the tenant escrow account are automatically distributed to share-owners' wallets.",
    },
  ];

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === quizQuestions[activeQuizQuestion].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuizQuestion < quizQuestions.length - 1) {
      setActiveQuizQuestion((q) => q + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Learn-to-Own Academy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Real Estate Literacy Centre
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Knowledge precedes ownership. Explore visual guides, real-world case studies, and test your knowledge before deploying capital.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1A080C]">Curated Learning Modules</h2>
            <p className="text-xs text-[#5E4A4E]">Master fractional property investing at your own pace.</p>
          </div>
          <span className="badge badge-demo text-xs">6 Free Modules Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                    m.level === "Beginner" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                    m.level === "Intermediate" ? "bg-blue-50 text-blue-800 border border-blue-200" :
                    "bg-purple-50 text-purple-800 border border-purple-200"
                  }`}>
                    {m.level}
                  </span>
                  <span className="text-[#8C7B7F]">{m.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-[#1A080C]">{m.title}</h3>
                <p className="text-xs text-[#5E4A4E] leading-relaxed">{m.desc}</p>

                <div className="pt-2 border-t border-[#EADCDD] space-y-1.5 text-xs text-[#1A080C]">
                  {m.topics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Module "${m.title}" opened. You can review the course materials and syllabus!`)}
                className="btn btn-secondary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Module</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Knowledge Check Quiz */}
      <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#3B0F18]" />
              <h3 className="text-xl font-bold text-[#1A080C]">
                Interactive Knowledge Check
              </h3>
            </div>
            <p className="text-xs text-[#5E4A4E]">
              Test your understanding of fractional real estate concepts.
            </p>
          </div>
          <span className="text-xs font-bold text-[#8C7B7F]">
            Question {activeQuizQuestion + 1} of {quizQuestions.length}
          </span>
        </div>

        {!quizCompleted ? (
          <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 sm:p-8 space-y-6">
            <h4 className="text-base sm:text-lg font-bold text-[#1A080C]">
              {quizQuestions[activeQuizQuestion].q}
            </h4>

            <div className="space-y-3">
              {quizQuestions[activeQuizQuestion].options.map((opt, idx) => {
                let btnStyle = "bg-white text-[#1A080C] border-[#EADCDD] hover:bg-[#FAF5F5]";
                if (selectedAnswer !== null) {
                  if (idx === quizQuestions[activeQuizQuestion].correct) {
                    btnStyle = "bg-emerald-50 text-emerald-900 border-emerald-400 font-bold";
                  } else if (idx === selectedAnswer) {
                    btnStyle = "bg-red-50 text-red-900 border-red-300";
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-bold text-[#8C7B7F]">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <strong className="font-bold block">Explanation:</strong>
                <p>{quizQuestions[activeQuizQuestion].explanation}</p>
              </div>
            )}

            {selectedAnswer !== null && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="btn btn-primary text-xs font-bold px-6 py-2.5 flex items-center gap-1.5"
                >
                  <span>{activeQuizQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-[#EADCDD] rounded-2xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <h4 className="text-2xl font-black text-[#1A080C]">
              Quiz Completed! Score: {score} / {quizQuestions.length}
            </h4>
            <p className="text-xs sm:text-sm text-[#5E4A4E] max-w-md mx-auto">
              {score === quizQuestions.length
                ? "Outstanding! You have mastered the foundational concepts of institutional fractional ownership."
                : "Great effort! Review the modules above to sharpen your real estate math and legal understanding."}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveQuizQuestion(0);
                  setSelectedAnswer(null);
                  setScore(0);
                  setQuizCompleted(false);
                }}
                className="btn btn-secondary text-xs font-bold"
              >
                Retake Quiz
              </button>
              <Link href="/explore" className="btn btn-primary text-xs font-bold">
                Apply Knowledge to Explore
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Guide Links */}
      <div className="p-6 rounded-3xl bg-[#FAF5F5] border border-[#EADCDD] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <strong className="text-sm font-bold text-[#1A080C] block">Looking for quick term definitions?</strong>
          <p className="text-xs text-[#5E4A4E]">Check our comprehensive searchable real estate glossary anytime.</p>
        </div>
        <Link href="/glossary" className="btn btn-secondary text-xs font-bold whitespace-nowrap">
          Open StateEra Glossary
        </Link>
      </div>
    </div>
  );
}
