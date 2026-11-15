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
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InvestorUser, PropertyApprovalQueueItem, PlatformAuditLog } from "@/types/admin";

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
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-900">
            System Administration
          </span>
          <span className="text-xs text-[#8782A3]">ROOT ACCESS • ROLE-BASED ACCESS CONTROL</span>
        </div>
        <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
          Platform Administrator Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#585375]">
          Global platform liquidity, investor KYC audit queue, offering approvals, and immutable audit logs.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-mint border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] uppercase font-bold">Total Platform Volume</span>
          <div className="text-2xl font-black text-[#1E1B4B]">$182,450,000</div>
          <div className="text-[11px] text-emerald-600 font-bold">+14.2% Month-over-Month</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] uppercase font-bold">Total Registered Investors</span>
          <div className="text-2xl font-black text-[#7C4DFF]">48,512</div>
          <div className="text-[11px] text-[#585375]">94% KYC Completion Rate</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] uppercase font-bold">Active Properties</span>
          <div className="text-2xl font-black text-[#1E1B4B]">{properties.length} Assets</div>
          <div className="text-[11px] text-emerald-600 font-bold">100% Freehold Title Audited</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E6D8F5] shadow-subtle space-y-1">
          <span className="text-xs text-[#8782A3] uppercase font-bold">Escrow Liquidity Buffer</span>
          <div className="text-2xl font-black text-emerald-600">$14,200,000</div>
          <div className="text-[11px] text-[#585375]">Tier-1 Bank Custody</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E6D8F5] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview & Transactions" },
          { id: "investors", label: "Investor Management & KYC" },
          { id: "approvals", label: "Property Approval Queue" },
          { id: "audit", label: "Security & Audit Logs" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#7C4DFF] text-white shadow-sm"
                : "text-[#585375] hover:bg-[#F3EAFC]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & ALL TRANSACTIONS */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">Platform Real-Time Transaction Oversight</h3>
            <span className="text-xs text-[#8782A3]">Live secondary and escrow events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EAFC]">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F8F4FD] transition-colors">
                    <td className="py-3 text-[#585375]">{t.timestamp}</td>
                    <td className="py-3 font-bold text-[#1E1B4B]">{t.type}</td>
                    <td className="py-3 text-[#585375]">{t.propertyTitle || "Demo Cash"}</td>
                    <td className="py-3 font-semibold text-[#1E1B4B]">${t.amount.toLocaleString()}</td>
                    <td className="py-3 font-mono text-[11px] text-[#8782A3]">{t.referenceCode}</td>
                    <td className="py-3 text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint text-emerald-900">
                        {t.status}
                      </span>
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">Investor Register & KYC Verification Status</h3>
            <span className="text-xs text-[#8782A3]">AML / Anti-Fraud checks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                  <th className="pb-3">Investor Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Country</th>
                  <th className="pb-3">Tier</th>
                  <th className="pb-3">KYC Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EAFC]">
                {investors.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F8F4FD] transition-colors">
                    <td className="py-3 font-bold text-[#1E1B4B]">{inv.fullName}</td>
                    <td className="py-3 text-[#585375]">{inv.email}</td>
                    <td className="py-3 text-[#585375]">{inv.country}</td>
                    <td className="py-3 font-semibold text-[#7C4DFF]">{inv.tier}</td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          inv.kycStatus === "Verified"
                            ? "bg-mint text-emerald-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {inv.kycStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-1.5">
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
                          className="px-2.5 py-1 rounded-lg bg-[#F8F4FD] text-[#585375] border border-[#E6D8F5] font-semibold text-[11px] hover:bg-[#F3EAFC]"
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">New Offering Submission Pipeline</h3>
            <span className="text-xs text-[#8782A3]">Due diligence compliance queue</span>
          </div>

          <div className="divide-y divide-[#F3EAFC]">
            {approvalQueue.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1E1B4B]">{item.propertyTitle}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.complianceReviewStatus === "Approved"
                          ? "bg-mint text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {item.complianceReviewStatus}
                    </span>
                  </div>
                  <div className="text-[#585375]">
                    {item.city} • Developer: <strong>{item.developer}</strong> • Manager: {item.managerName}
                  </div>
                  <div className="text-[#8782A3] text-[11px]">
                    Valuation: <strong>${item.proposedValuation.toLocaleString()}</strong> • Projected Net Yield: <strong>{item.projectedNetYield}%</strong>
                  </div>
                </div>

                {item.complianceReviewStatus !== "Approved" ? (
                  <button
                    onClick={() => handleApproveProperty(item.id)}
                    className="px-4 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Approve for Marketplace
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-mint px-3 py-1 rounded-xl">
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">Platform Security & Compliance Audit Log</h3>
            <span className="text-xs text-[#8782A3]">Append-only audit trail</span>
          </div>

          <div className="divide-y divide-[#F3EAFC]">
            {INITIAL_LOGS.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1E1B4B]">{log.action}</div>
                  <div className="text-[11px] text-[#585375]">{log.details}</div>
                  <div className="text-[10px] text-[#8782A3]">
                    Actor: {log.actorName} ({log.actorRole}) • IP: {log.ipAddress}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#8782A3]">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
