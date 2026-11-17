"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  ShieldAlert,
  Search,
  FileText,
  TrendingUp,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Languages,
  UserCheck,
  Scale,
  Compass,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

export default function AiFeaturesPage() {
  const [activeTab, setActiveTab] = useState<"detective" | "yield" | "urdu" | "referral">("detective");

  // Detective Interactive Demo State
  const [selectedDocType, setSelectedDocType] = useState<string>("lease");
  const [detectiveAnalyzing, setDetectiveAnalyzing] = useState(false);
  const [detectiveReport, setDetectiveReport] = useState<any>(null);

  // Yield Predictor State
  const [predCity, setPredCity] = useState("Dubai");
  const [predCategory, setPredCategory] = useState("residential");
  const [predYield, setPredYield] = useState<any>(null);

  // Urdu Explainer State
  const [urduRiskTopic, setUrduRiskTopic] = useState("occupancy");

  const runDetectiveAnalysis = () => {
    setDetectiveAnalyzing(true);
    setDetectiveReport(null);
    setTimeout(() => {
      setDetectiveAnalyzing(false);
      setDetectiveReport({
        score: 96,
        status: "Pass with Low Risk Flag",
        findings: [
          { type: "positive", text: "Freehold title verification authenticated against government land department registry." },
          { type: "positive", text: "5-year commercial lease backed by corporate banking parent guarantee." },
          { type: "warning", text: "Utility escalation clause caps inflation pass-through at 4% annually." },
          { type: "positive", text: "Zero municipal encumbrances, liens, or pending litigation identified." },
        ],
        missingInfo: "None. All mandatory physical engineering and financial escrow audits attached.",
      });
    }, 900);
  };

  const runYieldPrediction = () => {
    let base = 8.5;
    if (predCity === "Dubai") base = 9.4;
    else if (predCity === "London") base = 7.1;
    else if (predCity === "Islamabad") base = 9.8;
    else if (predCity === "New York") base = 7.6;
    else if (predCity === "Singapore") base = 6.2;

    if (predCategory === "logistics") base += 0.8;
    if (predCategory === "luxury") base -= 0.6;
    if (predCategory === "student") base += 0.5;

    setPredYield({
      predictedGross: (base + 1.8).toFixed(1),
      predictedNet: base.toFixed(1),
      confidence: "94% Model Confidence",
      keyDrivers: ["Historical 5-year neighborhood rent index", "Local office/residential vacancy rate", "Inflation-linked lease adjustments"],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Bot className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Advanced PropTech Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          StateEra AI Ecosystem
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Beyond a simple conversational chatbot. StateEra AI is a specialized real estate intelligence engine built for document verification, automated risk scoring, and evidence-based due diligence.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-[#EADCDD]">
        <button
          onClick={() => setActiveTab("detective")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "detective"
              ? "bg-[#3B0F18] text-white shadow-sm"
              : "bg-[#FAF5F5] text-[#5E4A4E] hover:bg-[#F2E8E9]"
          }`}
        >
          🔍 AI Property Detective
        </button>
        <button
          onClick={() => setActiveTab("yield")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "yield"
              ? "bg-[#3B0F18] text-white shadow-sm"
              : "bg-[#FAF5F5] text-[#5E4A4E] hover:bg-[#F2E8E9]"
          }`}
        >
          📊 Rental Yield Predictor
        </button>
        <button
          onClick={() => setActiveTab("urdu")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "urdu"
              ? "bg-[#3B0F18] text-white shadow-sm"
              : "bg-[#FAF5F5] text-[#5E4A4E] hover:bg-[#F2E8E9]"
          }`}
        >
          🌐 Urdu Risk Explainer
        </button>
        <button
          onClick={() => setActiveTab("referral")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "referral"
              ? "bg-[#3B0F18] text-white shadow-sm"
              : "bg-[#FAF5F5] text-[#5E4A4E] hover:bg-[#F2E8E9]"
          }`}
        >
          🤝 AI-to-Expert Referral
        </button>
      </div>

      {/* TAB 1: AI Property Detective */}
      {activeTab === "detective" && (
        <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C] flex items-center gap-2">
              <span>Interactive Property Document Audit</span>
              <span className="badge badge-success text-[10px]">Real-Time Simulation</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5E4A4E]">
              Select a sample institutional legal document to simulate our AI Property Detective scanning for hidden encumbrances, missing annexures, and vacancy risk factors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border border-[#EADCDD] rounded-2xl p-6 space-y-4">
              <label className="block text-xs font-bold text-[#1A080C] uppercase tracking-wider">
                Select Document To Scan:
              </label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="select w-full text-xs font-semibold"
              >
                <option value="lease">Commercial Triple-Net Tenant Lease (Canary Wharf)</option>
                <option value="title">Freehold Title Deed &amp; Non-Encumbrance (Dubai Marina)</option>
                <option value="mep">Structural Engineering Audit (Centaurus Heights Islamabad)</option>
              </select>

              <div className="p-3 bg-[#FAF5F5] rounded-xl border border-[#EADCDD] text-xs text-[#5E4A4E] space-y-1">
                <strong>Simulated Document Payload:</strong>
                <p className="font-mono text-[11px] text-[#8C7B7F]">
                  {selectedDocType === "lease" && "48-page institutional commercial agreement with annual CPI indexing & tenant repair covenants..."}
                  {selectedDocType === "title" && "Verified electronic land department title certificate issued with clean escrow ledger..."}
                  {selectedDocType === "mep" && "Full seismic, foundation, elevator, and MEP engineering inspection certificate..."}
                </p>
              </div>

              <button
                type="button"
                onClick={runDetectiveAnalysis}
                disabled={detectiveAnalyzing}
                className="btn btn-primary w-full text-xs font-bold py-3 flex items-center justify-center gap-2"
              >
                {detectiveAnalyzing ? (
                  <span>Scanning Document Clauses...</span>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Run AI Detective Scan</span>
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#EADCDD] rounded-2xl p-6 flex flex-col justify-between">
              {detectiveReport ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EADCDD] pb-3">
                    <div>
                      <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block">Integrity Score</span>
                      <strong className="text-2xl font-black text-[#3B0F18]">{detectiveReport.score}/100</strong>
                    </div>
                    <span className="badge badge-success text-xs font-bold">{detectiveReport.status}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1A080C] uppercase tracking-wider block">
                      AI Detective Audit Findings:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {detectiveReport.findings.map((f: any, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          {f.type === "positive" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <span className="text-[#1A080C]">{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <strong>Missing Information Status:</strong> {detectiveReport.missingInfo}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-[#8C7B7F]">
                  <Cpu className="w-10 h-10 text-[#3B0F18] opacity-40 animate-pulse" />
                  <p className="text-xs font-medium">
                    Click &quot;Run AI Detective Scan&quot; to test real-time document analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Rental Yield Predictor */}
      {activeTab === "yield" && (
        <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-xl space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C]">
              AI Multi-Factor Rental Yield Predictor
            </h3>
            <p className="text-xs sm:text-sm text-[#5E4A4E]">
              Simulates macroeconomic interest rate trajectories, historical neighborhood vacancy, and local tenant supply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A080C] mb-1">Select Market:</label>
                <select
                  value={predCity}
                  onChange={(e) => setPredCity(e.target.value)}
                  className="select w-full text-xs font-semibold"
                >
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="London">London, UK</option>
                  <option value="Islamabad">Islamabad, Pakistan</option>
                  <option value="New York">New York, USA</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A080C] mb-1">Property Category:</label>
                <select
                  value={predCategory}
                  onChange={(e) => setPredCategory(e.target.value)}
                  className="select w-full text-xs font-semibold"
                >
                  <option value="residential">Residential Apartments</option>
                  <option value="luxury">Luxury Waterfront Penthouses</option>
                  <option value="commercial">Commercial Corporate Offices</option>
                  <option value="logistics">Logistics Warehouses</option>
                  <option value="student">Student Accommodation</option>
                </select>
              </div>

              <button
                type="button"
                onClick={runYieldPrediction}
                className="btn btn-primary w-full text-xs font-bold py-2.5"
              >
                Calculate Yield Projection
              </button>
            </div>

            <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 space-y-4">
              {predYield ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-[#EADCDD] pb-3">
                    <span className="text-xs text-[#5E4A4E]">Forecasted Net Yield:</span>
                    <span className="text-3xl font-black text-[#3B0F18]">{predYield.predictedNet}%</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[#EADCDD] pb-3">
                    <span className="text-xs text-[#5E4A4E]">Projected Gross Yield:</span>
                    <span className="text-lg font-bold text-[#1A080C]">{predYield.predictedGross}%</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#5E4A4E]">
                    <strong className="text-[#1A080C] block">Model Drivers Considered:</strong>
                    {predYield.keyDrivers.map((d: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                  <span className="badge badge-demo text-[10px] block text-center">{predYield.confidence}</span>
                </div>
              ) : (
                <div className="text-center p-8 space-y-2 text-[#8C7B7F]">
                  <TrendingUp className="w-8 h-8 text-[#3B0F18] mx-auto opacity-40" />
                  <p className="text-xs">Click calculate to view machine learning forecast.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Urdu Risk Explainer */}
      {activeTab === "urdu" && (
        <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C] flex items-center gap-2">
              <Languages className="w-6 h-6 text-[#3B0F18]" />
              <span>StateEra AI Urdu Risk Explainer (اردو وضاحت)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5E4A4E]">
              Democratizing property education through plain-language Urdu explanations of complex real estate risks, preventing misunderstandings before investing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setUrduRiskTopic("occupancy")}
              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                urduRiskTopic === "occupancy" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-white text-[#1A080C] border-[#EADCDD]"
              }`}
            >
              1. کرایہ دار کی خالی جگہ کا خطرہ (Vacancy Risk)
            </button>
            <button
              onClick={() => setUrduRiskTopic("currency")}
              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                urduRiskTopic === "currency" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-white text-[#1A080C] border-[#EADCDD]"
              }`}
            >
              2. کرنسی کے اتار چڑھاؤ کا خطرہ (Currency Risk)
            </button>
            <button
              onClick={() => setUrduRiskTopic("maintenance")}
              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                urduRiskTopic === "maintenance" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-white text-[#1A080C] border-[#EADCDD]"
              }`}
            >
              3. عمارت کی مرمت اور اخراجات (Maintenance Risk)
            </button>
          </div>

          <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 sm:p-8 space-y-4" dir="rtl">
            <span className="badge badge-demo text-xs">مصنوعی ذہانت (AI) اردو تجزیہ</span>
            <div className="space-y-2 text-sm sm:text-base text-[#1A080C] leading-relaxed">
              {urduRiskTopic === "occupancy" && (
                <>
                  <h4 className="text-lg font-bold text-[#3B0F18]">کرایہ دار کے جانے یا خالی جگہ کا خطرہ کیا ہے؟</h4>
                  <p>
                    جب کسی جائیداد سے کرایہ دار نکل جاتا ہے اور نیا کرایہ دار آنے میں وقت لگتا ہے، تو اس دوران کرایہ رک سکتا ہے۔ StateEra اس خطرے کو کم کرنے کے لیے صرف ایسے کاروباری اور رہائشی اثاثے منتخب کرتا ہے جن کے پاس طویل مدتی (2 سے 5 سال) کے رجسٹرڈ معاہدے ہوں اور ان کے پاس پہلے سے ایمرجنسی ریزرو فنڈ موجود ہو۔
                  </p>
                </>
              )}
              {urduRiskTopic === "currency" && (
                <>
                  <h4 className="text-lg font-bold text-[#3B0F18]">کرنسی کے اتار چڑھاؤ سے منافع پر کیا اثر پڑتا ہے؟</h4>
                  <p>
                    بین الاقوامی جائیدادوں میں سرمایہ کاری کرتے وقت (مثلاً ڈالر، پاؤنڈ یا درہم میں)، آپ کا کرایہ غیر ملکی کرنسی میں بنتا ہے۔ اگر مقامی کرنسی کے ریٹ بدلیں تو منافع روپے میں تبدیل ہوتے وقت بڑھ یا گھٹ سکتا ہے۔ اس لیے پورٹ فولیو کو مختلف ممالک میں تقسیم کرنا بہترین حکمت عملی ہے۔
                  </p>
                </>
              )}
              {urduRiskTopic === "maintenance" && (
                <>
                  <h4 className="text-lg font-bold text-[#3B0F18]">عمارت کی مرمت کے اخراجات کس طرح منہا ہوتے ہیں؟</h4>
                  <p>
                    کرائے کی رقم سیدھی آپ کے بٹوے میں آنے سے پہلے عمارت کی انشورنس، ٹیکس، اور باقاعدہ دیکھ بھال کی فیس منہا کی جاتی ہے۔ اس سے یہ یقینی ہوتا ہے کہ عمارت کی حالت ہمیشہ فرسٹ کلاس رہے اور مستقبل میں کوئی بڑا غیر متوقع خرچہ سرمایہ کار پر نہ آئے۔
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AI-to-Expert Referral */}
      {activeTab === "referral" && (
        <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A080C] flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#3B0F18]" />
              <span>AI-to-Human Expert Referral Workflow</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5E4A4E]">
              Artificial intelligence provides fast calculations and document parsing, but complex legal titles, inheritance tax structures, and large transactions require human judgment.
            </p>
          </div>

          <div className="bg-white border border-[#EADCDD] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1">
                <strong className="text-[#1A080C] text-sm block">1. Complex Query Detection</strong>
                <p className="text-[#5E4A4E]">When a user asks questions regarding local tax residency, cross-border inheritance, or bespoke contracts, the AI flags the need for human review.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1">
                <strong className="text-[#1A080C] text-sm block">2. Smart Expert Matching</strong>
                <p className="text-[#5E4A4E]">The AI matches your inquiry to licensed Property Legal Advisors, Chartered Valuation Surveyors, or Tax Consultants based on the property&apos;s jurisdiction.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5F5] border border-[#EADCDD] space-y-1">
                <strong className="text-[#1A080C] text-sm block">3. One-Click Consultation</strong>
                <p className="text-[#5E4A4E]">Pre-populates an appointment dossier with relevant property data and schedules a direct video or in-person consultation.</p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link href="/experts" className="btn btn-primary text-xs font-bold inline-flex items-center gap-2 px-6 py-3">
                <span>Browse Human Expert Directory &amp; Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Strict Ethical AI Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block">AI Ethics, Limitations &amp; Verification Notice:</strong>
          <p className="leading-relaxed">
            StateEra AI tools synthesize public market statistics, lease documents, and algorithmic models to aid investor research. AI predictions do not constitute guaranteed returns or formal legal counsel. Live AI interactions clearly indicate model confidence scores, missing inputs, and assumptions.
          </p>
        </div>
      </div>
    </div>
  );
}
