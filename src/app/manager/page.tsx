"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Building,
  Plus,
  Coins,
  Wrench,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MaintenanceRequest } from "@/types/tenant";
import { InfoTooltip } from "@/components/common/InfoTooltip";

export default function PropertyManagerPage() {
  const {
    properties,
    maintenanceRequests,
    submitMaintenanceRequest,
    updateMaintenanceStatus,
    accountingLedger,
    addLedgerEntry,
  } = useDemo();

  const { t, dir } = useLanguage();

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

  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Submit rent collection
  const handleCollectRent = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = properties.find((p) => p.id === rentPropertyId);
    if (!prop) return;

    addLedgerEntry({
      date: new Date().toISOString().substring(0, 10),
      propertyTitle: prop.title,
      category: "Rent Revenue",
      description: `Monthly rent collection record for ${rentMonth} (${rentTenantName})`,
      type: "INCOME",
      amount: Number(rentAmount),
      vendorOrTenant: rentTenantName,
      reconciled: true,
    });

    setFeedback({
      success: true,
      message: `Successfully logged rent collection of $${Number(rentAmount).toLocaleString()} for ${prop.title}!`,
    });
  };

  // Submit maintenance work order
  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = properties.find((p) => p.id === rentPropertyId) || properties[0];

    submitMaintenanceRequest({
      propertyId: prop.id,
      propertyTitle: prop.title,
      unitNumber: "Main Facilities & MEP",
      title: maintTitle || "Routine Preventive Maintenance",
      category: maintCategory,
      priority: maintPriority,
      description: maintDesc || "Scheduled quarterly operational inspection and maintenance check.",
      estimatedCost: Number(maintCost),
      assignedVendor: "Prime Engineering & Facility Services LLC",
    });

    setFeedback({
      success: true,
      message: `Work order "${maintTitle || "Routine Maintenance"}" created and vendor assigned!`,
    });

    setMaintTitle("");
    setMaintDesc("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-info">Building Manager Portal</span>
            <span className="badge badge-success">License #MGR-44910</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((p) => (
              <div key={p.id} className="glass rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF5F5] border border-[#EADCDD]">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
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
        </div>
      )}

      {/* TAB 2: LOG RENT COLLECTION */}
      {activeTab === "rent-collection" && (
        <div className="glass rounded-3xl p-6 sm:p-8 max-w-2xl space-y-5">
          <div>
            <h3 className="text-xl font-bold text-[#1A080C]">Log Monthly Tenant Rent Collection</h3>
            <p className="text-xs text-secondary-se">
              Upload collections to credit the escrow account for monthly investor dividend distributions.
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
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                  className="input font-bold text-[#1A080C]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Collection Month</label>
                <input
                  type="text"
                  value={rentMonth}
                  onChange={(e) => setRentMonth(e.target.value)}
                  className="input font-semibold text-[#1A080C]"
                />
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
              Confirm and Reconcile Rent Deposit
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
                  value={maintCost}
                  onChange={(e) => setMaintCost(Number(e.target.value))}
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
                Assign Work Order
              </button>
            </form>
          </div>

          {/* Active Work Orders List (7 cols) */}
          <div className="lg:col-span-7 glass rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="font-bold text-base text-[#1A080C]">Active Maintenance &amp; Repairs</h3>

            <div className="divide-y divide-[#EADCDD]">
              {maintenanceRequests.map((m) => (
                <div key={m.id} className="py-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1A080C]">{m.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        m.status === "Completed"
                          ? "badge badge-success"
                          : m.priority === "Emergency"
                          ? "badge badge-error"
                          : "badge badge-warning"
                      }`}
                    >
                      {m.status} &bull; {m.priority}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-se">{m.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-muted-se pt-1">
                    <span>
                      {m.propertyTitle} ({m.unitNumber}) &bull; Vendor: {m.assignedVendor || "Assigned"}
                    </span>
                    <strong className="text-[#1A080C]">Est: ${m.estimatedCost}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROPERTY ACCOUNTING LEDGER */}
      {activeTab === "ledger" && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">General Operational Ledger</h3>
            <span className="text-xs text-muted-se">All entries audited</span>
          </div>

          <div className="overflow-x-auto">
            <table className="table-glass w-full text-left text-xs">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Property</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {accountingLedger.map((led) => (
                  <tr key={led.id}>
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
                      <span className="badge badge-success text-[10px]">
                        {led.reconciled ? "Reconciled" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
