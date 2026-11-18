"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InvestorUser, PropertyApprovalQueueItem, PlatformAuditLog } from "@/types/admin";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import { DemoBanner } from "@/components/common/DemoBanner";

const INITIAL_INVESTORS: InvestorUser[] = [
  {
    id: "inv-01",
    fullName: "Jonathan Sterling",
    email: "j.sterling@example.com",
    country: "United States",
    kycStatus: "Verified",
    tier: "Premium",
    portfolioValue: 8125,
    totalSharesOwned: 75,
    joinedDate: "2026-09-12",
  },
  {
    id: "inv-02",
    fullName: "Elena Rostova",
    email: "e.rostova@example.ch",
    country: "Switzerland",
    kycStatus: "Verified",
    tier: "Institutional",
    portfolioValue: 145000,
    totalSharesOwned: 1200,
    joinedDate: "2026-08-04",
  },
  {
    id: "inv-03",
    fullName: "Tariq Mansoor",
    email: "tariq.m@example.ae",
    country: "United Arab Emirates",
    kycStatus: "Under Review",
    tier: "Standard",
    portfolioValue: 2400,
    totalSharesOwned: 25,
    joinedDate: "2026-11-02",
  },
  {
    id: "inv-04",
    fullName: "Sarah Jenkins",
    email: "s.jenkins@example.co.uk",
    country: "United Kingdom",
    kycStatus: "Documents Required",
    tier: "Standard",
    portfolioValue: 0,
    totalSharesOwned: 0,
    joinedDate: "2026-11-14",
  },
];

const INITIAL_QUEUE: PropertyApprovalQueueItem[] = [
  {
    id: "queue-01",
    propertyTitle: "Downtown Financial Tower - Floor 12",
    city: "Dubai, UAE",
    developer: "Emaar Properties PJSC",
    proposedValuation: 4200000,
    projectedNetYield: 8.8,
    complianceReviewStatus: "In Review",
    submissionDate: "2026-11-10",
    managerName: "Apex Asset Management LLC",
  },
  {
    id: "queue-02",
    propertyTitle: "Shoreditch Creative Lofts",
    city: "London, UK",
    developer: "Telford Homes",
    proposedValuation: 3100000,
    projectedNetYield: 7.4,
    complianceReviewStatus: "Approved",
    submissionDate: "2026-11-04",
    managerName: "Knight Frank UK",
  },
  {
    id: "queue-03",
    propertyTitle: "Canal Ring Waterfront Offices",
    city: "Amsterdam, Netherlands",
    developer: "Vastned Retail",
    proposedValuation: 5600000,
    projectedNetYield: 8.1,
    complianceReviewStatus: "Additional Documents Needed",
    submissionDate: "2026-11-12",
    managerName: "Orange Real Estate Partners",
  },
];

const INITIAL_LOGS: PlatformAuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-11-16 11:24:19",
    actorRole: "admin",
    actorName: "Sarah Connor",
    action: "KYC_VERIFICATION_APPROVED",
    entityType: "KYC",
    details: "Approved Tier-2 institutional onboarding for Elena Rostova (inv-02)",
    ipAddress: "194.230.14.88",
  },
  {
    id: "log-2",
    timestamp: "2026-11-15 08:30:00",
    actorRole: "admin",
    actorName: "SuperAdmin (System)",
    action: "ESCROW_DISTRIBUTION_BATCH",
    entityType: "PAYOUT",
    details: "Simulated batch dividend distribution of $61.22 triggered",
    ipAddress: "127.0.0.1",
  },
];

interface AdminPortalViewProps {
  isDemo?: boolean;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ isDemo = true }) => {
  const { properties, transactions } = useDemo();
  const { dir } = useLanguage();

  const [investors, setInvestors] = useState<InvestorUser[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stateera_admin_investors");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_INVESTORS;
  });

  const [approvalQueue, setApprovalQueue] = useState<PropertyApprovalQueueItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stateera_admin_queue");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_QUEUE;
  });

  const [activeTab, setActiveTab] = useState<"overview" | "investors" | "approvals" | "audit">("overview");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdateKyc = (id: string, newStatus: InvestorUser["kycStatus"]) => {
    setInvestors((prev) => {
      const updated = prev.map((inv) => (inv.id === id ? { ...inv, kycStatus: newStatus } : inv));
      if (typeof window !== "undefined") {
        localStorage.setItem("stateera_admin_investors", JSON.stringify(updated));
      }
      return updated;
    });
    setFeedback(`Updated KYC status for user ${id} to "${newStatus}".`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleApproveProperty = (id: string) => {
    setApprovalQueue((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, complianceReviewStatus: "Approved" as const } : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("stateera_admin_queue", JSON.stringify(updated));
      }
      return updated;
    });
    setFeedback(`Property ${id} approved for public marketplace listing!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Demo Mode Notice Banner */}
      {isDemo ? (
        <DemoBanner
          portalName="Platform Administration & Compliance"
          roleDescription="You are operating in the compliance simulation as an Executive Administrator."
          liveRoute="/admin"
        />
      ) : (
        <div className="bg-[#FAF5F5] border-2 border-[#15803D]/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15803D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              LIVE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#1A080C]">Live Production Administrator Session</h2>
                <span className="badge badge-success text-[10px]">Cryptographically Verified</span>
              </div>
              <p className="text-xs text-[#5E4A4E]">
                Authenticated against Supabase PostgreSQL catalog with approved role authority.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="badge badge-error">Platform Controls</span>
          <span className="text-xs text-muted-se">
            {isDemo ? "SIMULATED ADMIN CONTROLS" : "PRODUCTION CONTROLS"}
          </span>
        </div>
        <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
          Platform Management &amp; Controls
        </h1>
        <p className="text-xs sm:text-sm text-secondary-se">
          Review investor identity checks, approve new property listings, and inspect system records.
        </p>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="glass rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-secondary-se">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Click{" "}
            <strong className="text-[#1A080C]">&ldquo;Investor Management&rdquo;</strong> to approve pending KYC identity checks, or{" "}
            <strong className="text-[#1A080C]">&ldquo;Building Safety Approvals&rdquo;</strong> to verify listings.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>What is KYC? See Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass rounded-3xl p-6 space-y-1">
          <span className="text-xs text-muted-se uppercase font-bold">Total Platform Volume</span>
          <div className="text-2xl font-black text-[#1A080C]">$182,450,000</div>
          <div className="text-[11px] text-emerald-700 font-bold">+14.2% Month-over-Month</div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-1">
          <span className="text-xs text-muted-se uppercase font-bold">Registered Investors</span>
          <div className="text-2xl font-black text-accent-se">48,512</div>
          <div className="text-[11px] text-secondary-se">94% Identity check completed</div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-1">
          <span className="text-xs text-muted-se uppercase font-bold">Live Buildings</span>
          <div className="text-2xl font-black text-[#1A080C]">{properties.length} Buildings</div>
          <div className="text-[11px] text-emerald-700 font-bold">100% Ownership papers checked</div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-se uppercase font-bold">Emergency Reserve Fund</span>
            <InfoTooltip termId="escrow" size="sm" />
          </div>
          <div className="text-2xl font-black text-emerald-700">$14,200,000</div>
          <div className="text-[11px] text-secondary-se">Protected emergency backup</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EADCDD] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview & Money Records" },
          { id: "investors", label: "Investor Management" },
          { id: "approvals", label: "Building Safety Approvals" },
          { id: "audit", label: "Activity Records" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[var(--se-primary)] text-white shadow-sm"
                : "text-secondary-se hover:bg-[#FAF5F5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & ALL TRANSACTIONS */}
      {activeTab === "overview" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">Platform Real-Time Transaction Oversight</h3>
            <span className="text-xs text-muted-se">Live secondary and escrow events</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#EADCDD]">
            <table className="table-glass w-full text-left text-xs min-w-[620px]">
              <thead>
                <tr className="whitespace-nowrap">
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Reference</th>
                  <th className="text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADCDD]">
                {transactions.map((t) => (
                  <tr key={t.id} className="whitespace-nowrap">
                    <td className="text-secondary-se">{t.timestamp}</td>
                    <td className="font-bold text-[#1A080C]">{t.type}</td>
                    <td className="text-secondary-se">{t.propertyTitle || "Demo Cash"}</td>
                    <td className="font-semibold text-[#1A080C]">${t.amount.toLocaleString()}</td>
                    <td className="font-mono text-[11px] text-muted-se">{t.referenceCode}</td>
                    <td className="text-right">
                      <span className="badge badge-success text-[10px]">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INVESTOR MANAGEMENT & KYC */}
      {activeTab === "investors" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">Investor Register &amp; KYC Verification Status</h3>
            <span className="text-xs text-muted-se">AML / Anti-Fraud checks</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#EADCDD]">
            <table className="table-glass w-full text-left text-xs min-w-[680px]">
              <thead>
                <tr className="whitespace-nowrap">
                  <th>Investor Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Tier</th>
                  <th>KYC Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADCDD]">
                {investors.map((inv) => (
                  <tr key={inv.id} className="whitespace-nowrap">
                    <td className="font-bold text-[#1A080C]">{inv.fullName}</td>
                    <td className="text-secondary-se">{inv.email}</td>
                    <td className="text-secondary-se">{inv.country}</td>
                    <td className="font-semibold text-accent-se">{inv.tier}</td>
                    <td>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          inv.kycStatus === "Verified"
                            ? "badge badge-success"
                            : "badge badge-warning"
                        }`}
                      >
                        {inv.kycStatus}
                      </span>
                    </td>
                    <td className="text-right space-x-1.5">
                      {inv.kycStatus !== "Verified" && (
                        <button
                          onClick={() => handleUpdateKyc(inv.id, "Verified")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700"
                        >
                          Approve KYC
                        </button>
                      )}
                      {inv.kycStatus === "Verified" && (
                        <button
                          onClick={() => handleUpdateKyc(inv.id, "Under Review")}
                          className="btn btn-ghost text-[11px] py-1 px-2.5"
                        >
                          Request Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROPERTY APPROVAL QUEUE */}
      {activeTab === "approvals" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">New Offering Submission Pipeline</h3>
            <span className="text-xs text-muted-se">Due diligence compliance queue</span>
          </div>

          <div className="divide-y divide-[#EADCDD]">
            {approvalQueue.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1A080C]">{item.propertyTitle}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.complianceReviewStatus === "Approved"
                          ? "badge badge-success"
                          : "badge badge-warning"
                      }`}
                    >
                      {item.complianceReviewStatus}
                    </span>
                  </div>
                  <div className="text-secondary-se">
                    {item.city} • Developer: <strong className="text-[#1A080C]">{item.developer}</strong> • Manager: {item.managerName}
                  </div>
                  <div className="text-muted-se text-[11px]">
                    Valuation: <strong className="text-[#1A080C]">${item.proposedValuation.toLocaleString()}</strong> • Projected Net Yield: <strong className="text-[#1A080C]">{item.projectedNetYield}%</strong>
                  </div>
                </div>

                {item.complianceReviewStatus !== "Approved" ? (
                  <button
                    onClick={() => handleApproveProperty(item.id)}
                    className="btn btn-primary text-xs"
                  >
                    Approve for Marketplace
                  </button>
                ) : (
                  <span className="badge badge-success text-xs px-3 py-1 rounded-xl">
                    ✓ Approved Offering
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">Platform Security &amp; Compliance Audit Log</h3>
            <span className="text-xs text-muted-se">Append-only audit trail</span>
          </div>

          <div className="divide-y divide-[#EADCDD]">
            {INITIAL_LOGS.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1A080C]">{log.action}</div>
                  <div className="text-[11px] text-secondary-se">{log.details}</div>
                  <div className="text-[10px] text-muted-se">
                    Actor: {log.actorName} ({log.actorRole}) • IP: {log.ipAddress}
                  </div>
                </div>
                <div className="text-right text-[11px] text-muted-se">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
