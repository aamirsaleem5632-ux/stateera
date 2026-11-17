"use client";

import React, { useState } from "react";
import {
  Shield,
  Users,
  Building,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  UserCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InvestorUser, PropertyApprovalQueueItem, PlatformAuditLog } from "@/types/admin";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import Link from "next/link";

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
    fullName: "Amina Al-Hassan",
    email: "amina.h@example.ae",
    country: "United Arab Emirates",
    kycStatus: "Under Review",
    tier: "Standard",
    portfolioValue: 0,
    totalSharesOwned: 0,
    joinedDate: "2026-11-14",
  },
];

const INITIAL_QUEUE: PropertyApprovalQueueItem[] = [
  {
    id: "prop-sub-01",
    propertyTitle: "Bavarian Alpine Wellness Retreat",
    city: "Munich, Germany",
    developer: "Alps Sovereign Developments",
    proposedValuation: 6800000,
    projectedNetYield: 8.9,
    submissionDate: "2026-11-10",
    complianceReviewStatus: "In Review",
    managerName: "Stefan Gruber",
  },
  {
    id: "prop-sub-02",
    propertyTitle: "Shinjuku High-Tech Office Hub",
    city: "Tokyo, Japan",
    developer: "Mori Asset Holdings",
    proposedValuation: 18500000,
    projectedNetYield: 7.8,
    submissionDate: "2026-11-12",
    complianceReviewStatus: "Approved",
    managerName: "Kenji Takahashi",
  },
];

const INITIAL_LOGS: PlatformAuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-11-15 10:14:22",
    actorRole: "admin",
    actorName: "SuperAdmin (System)",
    action: "KYC_VERIFICATION_APPROVED",
    entityType: "KYC",
    details: "Approved Passport and Proof of Address for Elena Rostova",
    ipAddress: "192.168.1.104",
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

export default function AdminPortalPage() {
  const { properties, transactions } = useDemo();
  const { t, dir } = useLanguage();

  const [investors, setInvestors] = useState<InvestorUser[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stateera_admin_investors");
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_INVESTORS;
  });

  const [approvalQueue, setApprovalQueue] = useState<PropertyApprovalQueueItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stateera_admin_queue");
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_QUEUE;
  });

  const [activeTab, setActiveTab] = useState<"overview" | "investors" | "approvals" | "audit">("overview");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdateKyc = (id: string, newStatus: InvestorUser["kycStatus"]) => {
    setInvestors((prev) => {
      const next = prev.map((inv) => (inv.id === id ? { ...inv, kycStatus: newStatus } : inv));
      if (typeof window !== "undefined") {
        localStorage.setItem("stateera_admin_investors", JSON.stringify(next));
      }
      return next;
    });
    setFeedback(`Investor KYC status updated to ${newStatus}.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleApproveProperty = (id: string) => {
    setApprovalQueue((prev) => {
      const next = prev.map((q) => (q.id === id ? { ...q, complianceReviewStatus: "Approved" as const } : q));
      if (typeof window !== "undefined") {
        localStorage.setItem("stateera_admin_queue", JSON.stringify(next));
      }
      return next;
    });
    setFeedback("Property offering compliance verified and approved for marketplace!");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="badge badge-error">Platform Controls</span>
          <span className="text-xs text-muted-se">SIMULATED ADMIN CONTROLS</span>
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
            <strong className="text-[#1A080C]">&ldquo;Building Approvals&rdquo;</strong> to verify listings.
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

          <div className="overflow-x-auto">
            <table className="table-glass w-full text-left text-xs">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Reference</th>
                  <th className="text-right">Audit</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
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

          <div className="overflow-x-auto">
            <table className="table-glass w-full text-left text-xs">
              <thead>
                <tr>
                  <th>Investor Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Tier</th>
                  <th>KYC Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investors.map((inv) => (
                  <tr key={inv.id}>
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
                    {item.city} &bull; Developer: <strong className="text-[#1A080C]">{item.developer}</strong> &bull; Manager: {item.managerName}
                  </div>
                  <div className="text-muted-se text-[11px]">
                    Valuation: <strong className="text-[#1A080C]">${item.proposedValuation.toLocaleString()}</strong> &bull; Projected Net Yield: <strong className="text-[#1A080C]">{item.projectedNetYield}%</strong>
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
                    Actor: {log.actorName} ({log.actorRole}) &bull; IP: {log.ipAddress}
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
}
