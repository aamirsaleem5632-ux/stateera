"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  KeyRound,
  FileText,
  DollarSign,
  Wrench,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Clock,
  ShieldCheck,
  Bell,
  MessageSquare,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TenantPortalPage() {
  const {
    leases,
    rentPayments,
    payTenantRent,
    maintenanceRequests,
    submitMaintenanceRequest,
  } = useDemo();

  const { t, dir } = useLanguage();

  const activeLease = leases[0];
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // New Maintenance Form State
  const [maintTitle, setMaintTitle] = useState("");
  const [maintCategory, setMaintCategory] = useState<any>("Plumbing");
  const [maintPriority, setMaintPriority] = useState<any>("Medium");
  const [maintDesc, setMaintDesc] = useState("");

  const handlePayRent = (leaseId: string) => {
    const res = payTenantRent(leaseId);
    setFeedback(res);
  };

  const handleTenantMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    submitMaintenanceRequest({
      propertyId: activeLease.propertyId,
      propertyTitle: activeLease.propertyTitle,
      unitNumber: activeLease.unitNumber,
      title: maintTitle || "Tenant Maintenance Request",
      category: maintCategory,
      priority: maintPriority,
      description: maintDesc || "Submitted via Tenant Portal.",
      estimatedCost: 150,
    });

    setFeedback({
      success: true,
      message: `Your maintenance request "${maintTitle}" has been logged with the property manager!`,
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
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
              Active Resident
            </span>
            <span className="text-xs text-[#8782A3]">Tenant ID: TNT-9082</span>
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Tenant & Leasing Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Review lease covenants, pay monthly rent, and submit maintenance work orders.
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

      {/* Active Lease Agreement Card */}
      {activeLease && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F3EAFC] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C4DFF]">
                Active Master Lease
              </span>
              <h2 className="text-2xl font-black text-[#1E1B4B] mt-0.5">
                {activeLease.propertyTitle} • {activeLease.unitNumber}
              </h2>
              <div className="text-xs text-[#585375]">
                Lease Holder: <strong>{activeLease.tenantName}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePayRent(activeLease.id)}
                className="px-6 py-3 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <DollarSign className="w-4 h-4 text-mint" />
                <span>Pay Monthly Rent (${activeLease.monthlyRent.toLocaleString()})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
              <span className="text-[#8782A3] block uppercase">Monthly Rent</span>
              <strong className="text-lg font-black text-[#1E1B4B]">
                ${activeLease.monthlyRent.toLocaleString()}
              </strong>
            </div>
            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
              <span className="text-[#8782A3] block uppercase">Security Deposit</span>
              <strong className="text-lg font-black text-[#1E1B4B]">
                ${activeLease.securityDeposit.toLocaleString()}
              </strong>
            </div>
            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
              <span className="text-[#8782A3] block uppercase">Lease Term</span>
              <strong className="text-sm font-bold text-[#1E1B4B]">
                {activeLease.startDate} to {activeLease.endDate}
              </strong>
            </div>
            <div className="p-3 bg-[#F8F4FD] rounded-xl border border-[#E6D8F5]">
              <span className="text-[#8782A3] block uppercase">Due Date</span>
              <strong className="text-sm font-bold text-[#7C4DFF]">
                {activeLease.paymentDueDay}st of every month
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Rent Receipts on Left (6), Maintenance Request on Right (6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rent Payment Receipts (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">Rent Payment Receipts</h3>
            <span className="text-xs text-emerald-700 bg-mint font-bold px-2 py-0.5 rounded-full">
              Zero Overdue Rent
            </span>
          </div>

          <div className="divide-y divide-[#F3EAFC]">
            {rentPayments.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1E1B4B]">{p.month} Rent Payment</div>
                  <div className="text-[11px] text-[#8782A3]">
                    Paid on {p.paidDate} • Receipt: {p.receiptId}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#1E1B4B]">${p.amount.toLocaleString()}</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-mint px-2 py-0.5 rounded">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Maintenance Request (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
            <h3 className="font-bold text-base text-[#1E1B4B]">Submit Maintenance Request</h3>
            <span className="text-xs text-[#8782A3]">Direct to Property Manager</span>
          </div>

          <form onSubmit={handleTenantMaintenance} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#1E1B4B]">Issue Subject</label>
              <input
                type="text"
                placeholder="e.g. Master bathroom tap dripping"
                value={maintTitle}
                onChange={(e) => setMaintTitle(e.target.value)}
                className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2 text-[#1E1B4B]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Category</label>
                <select
                  value={maintCategory}
                  onChange={(e) => setMaintCategory(e.target.value as any)}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC & Climate</option>
                  <option value="Appliance">Appliances</option>
                  <option value="General">General / Painting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1E1B4B]">Priority Level</label>
                <select
                  value={maintPriority}
                  onChange={(e) => setMaintPriority(e.target.value as any)}
                  className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3 py-2 text-[#1E1B4B]"
                >
                  <option value="Low">Low (Within 7 days)</option>
                  <option value="Medium">Medium (Within 48 hours)</option>
                  <option value="High">High (Within 24 hours)</option>
                  <option value="Emergency">Emergency (Immediate)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1E1B4B]">Description of Maintenance Needed</label>
              <textarea
                rows={3}
                placeholder="Describe when the issue started and access instructions for technicians..."
                value={maintDesc}
                onChange={(e) => setMaintDesc(e.target.value)}
                className="w-full bg-[#F8F4FD] border border-[#E6D8F5] rounded-xl px-3.5 py-2 text-[#1E1B4B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white font-bold text-xs shadow-md transition-all"
            >
              Submit Maintenance Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
