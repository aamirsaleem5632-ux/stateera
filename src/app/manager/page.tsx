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
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MaintenanceRequest } from "@/types/tenant";

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
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3EAFC] text-[#5B3A8C]">
              Operational Portal
            </span>
            <span className="text-xs text-emerald-700 bg-mint px-2 py-0.5 rounded-full font-bold">
              License #MGR-44910
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Property Manager Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Manage assigned assets, upload rent collections, track maintenance work orders, and review NOI.
          </p>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm ${
            feedback.success ? "bg-mint border border-emerald-300 text-emerald-900" : "bg-red-50 border border-red-200 text-red-900"
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
      <div className="flex items-center gap-2 border-b border-[#E6D8F5] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Assigned Properties" },
          { id: "rent-collection", label: "Log Rent Collection" },
          { id: "maintenance", label: "Maintenance Work Orders" },
          { id: "ledger", label: "Property Accounting Ledger" },
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

      {/* TAB 1: ASSIGNED PROPERTIES */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((p) => (
              <div key={p.id} className="stateera-card rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3EAFC]">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1E1B4B] line-clamp-1">{p.title}</h3>
                    <span className="text-xs text-[#8782A3]">{p.city}, {p.country}</span>
                    <div className="text-xs text-emerald-700 font-bold mt-0.5">
                      {p.occupancyRate}% Occupied
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#F3EAFC]">
                  <div className="p-2 bg-[#F8F4FD] rounded-lg">
                    <span className="text-[10px] text-[#8782A3] block uppercase">Monthly Rent</span>
                    <strong className="text-[#1E1B4B]">${p.estimatedMonthlyRent.toLocaleString()}</strong>
                  </div>
                  <div className="p-2 bg-[#F8F4FD] rounded-lg">
                    <span className="text-[10px] text-[#8782A3] block uppercase">Total Units</span>
                    <strong className="text-[#1E1B4B]">{p.tenantMetrics.totalUnits} Units</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#8782A3]">On-time Rent: <strong>{p.tenantMetrics.onTimePaymentRate}%</strong></span>
                  <Link
                    href={`/property/${p.id}`}
                    className="text-[#7C4DFF] font-semibold hover:underline"
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle max-w-2xl space-y-5">
          <div>
            <h3 className="text-xl font-bold text-[#1E1B4B]">Log Monthly Tenant Rent Collection</h3>
            <p className="text-xs text-[#585375]">
              Upload collections to credit the escrow account for monthly investor dividend distributions.
            </p>
          </div>

          <form onSubmit={handleCollectRent} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#1E1B4B]">Select Assigned Property</label>
              <select
                value={rentPropertyId}
                onChange={(e) => setRentPropertyId(e.target.value)}
                className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 font-semibold text-[#1E1B4B]"
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
                <label className="font-bold text-[#1E1B4B]">Gross Rent Collected ($)</label>
                <input
                  type="number"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 font-bold text-[#1E1B4B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Collection Month</label>
                <input
                  type="text"
                  value={rentMonth}
                  onChange={(e) => setRentMonth(e.target.value)}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 font-semibold text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1E1B4B]">Tenant / Escrow Source</label>
              <input
                type="text"
                value={rentTenantName}
                onChange={(e) => setRentTenantName(e.target.value)}
                className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2.5 font-semibold text-[#1E1B4B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all"
            >
              Confirm and Reconcile Rent Deposit
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: MAINTENANCE WORK ORDERS */}
      {activeTab === "maintenance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Work Order Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
            <h3 className="font-bold text-base text-[#1E1B4B]">Create Maintenance Work Order</h3>

            <form onSubmit={handleCreateWorkOrder} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. HVAC Filter Replacement & Sensor Tune-up"
                  value={maintTitle}
                  onChange={(e) => setMaintTitle(e.target.value)}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#1E1B4B]">Category</label>
                  <select
                    value={maintCategory}
                    onChange={(e) => setMaintCategory(e.target.value as any)}
                    className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Structural">Structural</option>
                    <option value="Appliance">Appliance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1E1B4B]">Priority</label>
                  <select
                    value={maintPriority}
                    onChange={(e) => setMaintPriority(e.target.value as any)}
                    className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Estimated Repair Cost ($)</label>
                <input
                  type="number"
                  value={maintCost}
                  onChange={(e) => setMaintCost(Number(e.target.value))}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details of inspection and repair required..."
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all"
              >
                Assign Work Order
              </button>
            </form>
          </div>

          {/* Active Work Orders List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
            <h3 className="font-bold text-base text-[#1E1B4B]">Active Maintenance & Repairs</h3>

            <div className="divide-y divide-[#F3EAFC]">
              {maintenanceRequests.map((m) => (
                <div key={m.id} className="py-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1E1B4B]">{m.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        m.status === "Completed"
                          ? "bg-mint text-emerald-900"
                          : m.priority === "Emergency"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {m.status} • {m.priority}
                    </span>
                  </div>
                  <p className="text-xs text-[#585375]">{m.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#8782A3] pt-1">
                    <span>
                      {m.propertyTitle} ({m.unitNumber}) • Vendor: {m.assignedVendor || "Assigned"}
                    </span>
                    <strong className="text-[#1E1B4B]">Est: ${m.estimatedCost}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROPERTY ACCOUNTING LEDGER */}
      {activeTab === "ledger" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">General Operational Ledger</h3>
            <span className="text-xs text-[#8782A3]">All entries audited</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EAFC]">
                {accountingLedger.map((led) => (
                  <tr key={led.id} className="hover:bg-[#F8F4FD] transition-colors">
                    <td className="py-3 text-[#585375]">{led.date}</td>
                    <td className="py-3 font-semibold text-[#1E1B4B]">{led.propertyTitle}</td>
                    <td className="py-3 text-[#5B3A8C] font-medium">{led.category}</td>
                    <td className="py-3 text-[#585375] max-w-xs truncate">{led.description}</td>
                    <td
                      className={`py-3 font-bold ${
                        led.type === "INCOME" ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {led.type === "INCOME" ? "+" : "-"}${led.amount.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-[10px] bg-mint text-emerald-900 font-bold px-2 py-0.5 rounded">
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
