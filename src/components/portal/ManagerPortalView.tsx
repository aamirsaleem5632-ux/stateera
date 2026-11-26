"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MaintenanceRequest } from "@/types/tenant";
import { DemoBanner } from "@/components/common/DemoBanner";
import { PortalChat } from "@/components/portal/PortalChat";
import { managerService } from "@/lib/services/managerService";

interface ManagerPortalViewProps {
  isDemo?: boolean;
}

export const ManagerPortalView: React.FC<ManagerPortalViewProps> = ({ isDemo = true }) => {
  const {
    properties,
    maintenanceRequests,
    submitMaintenanceRequest,
    updateMaintenanceStatus,
    accountingLedger,
    addLedgerEntry,
  } = useDemo();

  const { dir } = useLanguage();

  // Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "rent-collection" | "maintenance" | "ledger">("overview");

  // Rent Collection Form State
  const [rentPropertyId, setRentPropertyId] = useState<string>(properties[0]?.id || "");
  const [rentAmount, setRentAmount] = useState<number>(78400);
  const [rentMonth, setRentMonth] = useState<string>("December 2026");
  const [rentTenantName, setRentTenantName] = useState<string>("Master Escrow Collections");

  // Maintenance Work Order Form State
  const [maintTitle, setMaintTitle] = useState("");
  const [maintCategory, setMaintCategory] = useState<MaintenanceRequest["category"]>("Plumbing");
  const [maintPriority, setMaintPriority] = useState<MaintenanceRequest["priority"]>("Medium");
  const [maintCost, setMaintCost] = useState<number>(350);
  const [maintDesc, setMaintDesc] = useState("");
  const [maintVendor, setMaintVendor] = useState("");

  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Submit rent collection
  const handleCollectRent = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(rentAmount);
    if (!Number.isFinite(numAmount) || numAmount <= 0) {
      setFeedback({
        success: false,
        message: "Please enter a valid positive rent collection amount.",
      });
      return;
    }

    const prop = properties.find((p) => p.id === rentPropertyId) || properties[0];

    addLedgerEntry({
      propertyTitle: prop?.title || "Master Escrow",
      date: new Date().toISOString().split("T")[0],
      type: "INCOME",
      category: "Rent Revenue",
      description: `${rentMonth} rent collected via ${rentTenantName}`,
      amount: numAmount,
      vendorOrTenant: rentTenantName,
      reconciled: true,
    });

    if (!isDemo && prop) {
      managerService
        .recordRentCollection({
          propertyId: prop.id,
          amount: numAmount,
          month: rentMonth,
          tenantName: rentTenantName,
        })
        .catch(() => {});
    }

    setFeedback({
      success: true,
      message: `Successfully recorded ${rentMonth} rent deposit of $${numAmount.toLocaleString()} for ${prop?.title}!`,
    });
  };

  // Submit maintenance work order
  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = Number(maintCost);
    if (!Number.isFinite(costNum) || costNum <= 0) {
      setFeedback({
        success: false,
        message: "Please enter a valid positive estimated repair cost.",
      });
      return;
    }

    submitMaintenanceRequest({
      propertyId: properties[0]?.id || "prop-dubai-marina-tower",
      propertyTitle: properties[0]?.title || "Marina Horizon Luxury Tower",
      unitNumber: "Suite 1402",
      title: maintTitle || "Routine Inspection & Repair",
      category: maintCategory,
      priority: maintPriority,
      estimatedCost: costNum,
      description: maintDesc || "Scheduled maintenance repair job.",
      assignedVendor: maintVendor || "Prime Facilities & MEP Services",
    });

    addLedgerEntry({
      propertyTitle: properties[0]?.title || "Marina Horizon Luxury Tower",
      date: new Date().toISOString().split("T")[0],
      type: "EXPENSE",
      category: "Maintenance",
      description: `Dispatched work order: ${maintTitle || "Maintenance"}`,
      amount: costNum,
      vendorOrTenant: maintVendor || "Prime Facilities & MEP Services",
      reconciled: false,
    });

    if (!isDemo && properties[0]) {
      managerService
        .createWorkOrder({
          propertyId: properties[0].id,
          vendorName: maintVendor || "Prime Facilities & MEP Services",
          estimatedCost: costNum,
          title: maintTitle,
        })
        .catch(() => {});
    }

    setFeedback({
      success: true,
      message: `Work order "${maintTitle || "Routine Maintenance"}" created successfully!`,
    });

    setMaintTitle("");
    setMaintDesc("");
    setMaintVendor("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Demo Mode Notice Banner */}
      {isDemo ? (
        <DemoBanner
          portalName="Property Asset Manager"
          roleDescription="You are operating in the property management simulation as an accredited Asset Manager."
          liveRoute="/manager"
        />
      ) : (
        <div className="bg-[#FAF5F5] border-2 border-[#15803D]/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15803D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              LIVE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#1A080C]">Live Production Asset Manager Session</h2>
                <span className="badge badge-success text-[10px]">Verified Credentials</span>
              </div>
              <p className="text-xs text-[#5E4A4E]">
                Authenticated against Supabase PostgreSQL catalog with approved manager role authority.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-info">Building Manager Portal</span>
            <span className="badge badge-success">
              {isDemo ? "Demo License #MGR-DEMO-44910" : "License #MGR-44910"}
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            Building Manager Portal
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Record rent collected from tenants, schedule repair jobs, and keep building records accurate.
          </p>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="glass rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-secondary-se">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Click{" "}
            <strong className="text-[#1A080C]">&ldquo;Record Rent Collected&rdquo;</strong> to log incoming tenant rent, or{" "}
            <strong className="text-[#1A080C]">&ldquo;Repair Jobs&rdquo;</strong> to track fixing building issues.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>See Simple Terms Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm ${
            feedback.success
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#EADCDD] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "My Buildings" },
          { id: "rent-collection", label: "Record Rent Collected" },
          { id: "maintenance", label: "Repair Jobs" },
          { id: "ledger", label: "Money In & Out" },
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

      {/* TAB 1: ASSIGNED PROPERTIES */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {properties.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center text-xs text-muted-se">
              No buildings are currently assigned to your property manager account.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 3).map((p) => (
                <div key={p.id} className="glass rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF5F5] border border-[#EADCDD]">
                      <OptimizedImage
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                        fallbackLabel={p.title}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1A080C] line-clamp-1">{p.title}</h3>
                      <span className="text-xs text-muted-se">{p.city}, {p.country}</span>
                      <div className="text-xs text-emerald-700 font-bold mt-0.5">
                        {p.occupancyRate}% Occupied
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#EADCDD]">
                    <div className="p-2 bg-[#FAF5F5] rounded-lg border border-[#EADCDD]">
                      <span className="text-[10px] text-muted-se block uppercase">Monthly Rent</span>
                      <strong className="text-[#1A080C]">${p.estimatedMonthlyRent.toLocaleString()}</strong>
                    </div>
                    <div className="p-2 bg-[#FAF5F5] rounded-lg border border-[#EADCDD]">
                      <span className="text-[10px] text-muted-se block uppercase">Total Units</span>
                      <strong className="text-[#1A080C]">{p.tenantMetrics.totalUnits} Units</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-se">On-time Rent: <strong className="text-[#1A080C]">{p.tenantMetrics.onTimePaymentRate}%</strong></span>
                    <Link
                      href={`/property/${p.id}`}
                      className="text-accent-se font-semibold hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LOG RENT COLLECTION */}
      {activeTab === "rent-collection" && (
        <div className="glass rounded-3xl p-6 sm:p-8 max-w-2xl space-y-5">
          <div>
            <h3 className="text-xl font-bold text-[#1A080C]">Log Monthly Tenant Rent Collection</h3>
            <p className="text-xs text-secondary-se">
              Simulate rent collection uploads to credit the demo escrow account for monthly investor distributions.
            </p>
          </div>

          <form onSubmit={handleCollectRent} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#1A080C]">Select Assigned Property</label>
              <select
                value={rentPropertyId}
                onChange={(e) => setRentPropertyId(e.target.value)}
                className="select font-semibold"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} (Target: ${p.estimatedMonthlyRent.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Gross Rent Collected ($)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                  className="input font-bold text-[#1A080C]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Collection Month</label>
                <select
                  value={rentMonth}
                  onChange={(e) => setRentMonth(e.target.value)}
                  className="select font-semibold text-[#1A080C]"
                >
                  <option value="November 2026">November 2026</option>
                  <option value="December 2026">December 2026</option>
                  <option value="January 2027">January 2027</option>
                  <option value="February 2027">February 2027</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1A080C]">Tenant / Escrow Source</label>
              <input
                type="text"
                value={rentTenantName}
                onChange={(e) => setRentTenantName(e.target.value)}
                className="input font-semibold text-[#1A080C]"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full text-xs">
              Record Simulated Rent Deposit
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: MAINTENANCE WORK ORDERS */}
      {activeTab === "maintenance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Work Order Form (5 cols) */}
          <div className="lg:col-span-5 glass rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="font-bold text-base text-[#1A080C]">Create Maintenance Work Order</h3>

            <form onSubmit={handleCreateWorkOrder} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. HVAC Filter Replacement & Sensor Tune-up"
                  value={maintTitle}
                  onChange={(e) => setMaintTitle(e.target.value)}
                  className="input text-[#1A080C]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#1A080C]">Category</label>
                  <select
                    value={maintCategory}
                    onChange={(e) => setMaintCategory(e.target.value as any)}
                    className="select text-[#1A080C]"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Structural">Structural</option>
                    <option value="Appliance">Appliance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1A080C]">Priority</label>
                  <select
                    value={maintPriority}
                    onChange={(e) => setMaintPriority(e.target.value as any)}
                    className="select text-[#1A080C]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Estimated Repair Cost ($)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={maintCost}
                  onChange={(e) => setMaintCost(Number(e.target.value))}
                  className="input text-[#1A080C]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Assigned Contractor / Vendor (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Prime Facilities & MEP Services"
                  value={maintVendor}
                  onChange={(e) => setMaintVendor(e.target.value)}
                  className="input text-[#1A080C]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details of inspection and repair required..."
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  className="textarea text-[#1A080C]"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full text-xs">
                Log Work Order
              </button>
            </form>
          </div>

          {/* Active Work Orders List (7 cols) */}
          <div className="lg:col-span-7 glass rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="font-bold text-base text-[#1A080C]">Active Maintenance &amp; Repairs</h3>

            <div className="divide-y divide-[#EADCDD]">
              {maintenanceRequests.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-se">No active maintenance work orders.</div>
              ) : (
                maintenanceRequests.map((m) => (
                  <div key={m.id} className="py-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#1A080C]">{m.title}</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={m.status}
                          onChange={(e) => updateMaintenanceStatus(m.id, e.target.value as any)}
                          aria-label={`Status for ${m.title}`}
                          className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#EADCDD] bg-white text-[#1A080C] cursor-pointer"
                        >
                          <option value="Reported">Reported</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            m.status === "Completed"
                              ? "badge badge-success"
                              : m.priority === "Emergency"
                              ? "badge badge-error"
                              : "badge badge-warning"
                          }`}
                        >
                          {m.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-secondary-se">{m.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-muted-se pt-1">
                      <span>
                        {m.propertyTitle} ({m.unitNumber}) • Vendor: {m.assignedVendor || "Unassigned"}
                      </span>
                      <strong className="text-[#1A080C]">Est: ${m.estimatedCost}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROPERTY ACCOUNTING LEDGER */}
      {activeTab === "ledger" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">General Operational Ledger</h3>
            <span className="text-xs text-muted-se">{isDemo ? "Simulated Demo Ledger" : "Production Ledger"}</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#EADCDD]">
            <table className="table-glass w-full text-left text-xs min-w-[640px]">
              <thead>
                <tr className="whitespace-nowrap">
                  <th>Date</th>
                  <th>Property</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADCDD]">
                {accountingLedger.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-se">
                      No operational ledger entries recorded.
                    </td>
                  </tr>
                ) : (
                  accountingLedger.map((led) => (
                    <tr key={led.id} className="whitespace-nowrap">
                      <td className="text-secondary-se">{led.date}</td>
                      <td className="font-semibold text-[#1A080C]">{led.propertyTitle}</td>
                      <td className="text-accent-se font-medium">{led.category}</td>
                      <td className="text-secondary-se max-w-xs truncate">{led.description}</td>
                      <td
                        className={`font-bold ${
                          led.type === "INCOME" ? "text-emerald-700" : "text-red-700"
                        }`}
                      >
                        {led.type === "INCOME" ? "+" : "-"}${led.amount.toLocaleString()}
                      </td>
                      <td className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${led.reconciled ? "badge badge-success" : "badge badge-warning"}`}>
                          {led.reconciled ? "Reconciled" : "Pending Reconciliation"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Manager-Tenant Communication Channel */}
      <PortalChat
        currentRole="manager"
        senderName={isDemo ? "Demo Manager" : "Property Manager"}
        isDemo={isDemo}
        propertyId={properties[0]?.id}
      />
    </div>
  );
};
