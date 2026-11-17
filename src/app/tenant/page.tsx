"use client";

import React, { useState, useEffect } from "react";
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
  ShieldAlert,
  Bell,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function TenantPortalPage() {
  const {
    leases,
    rentPayments,
    payTenantRent,
    maintenanceRequests,
    submitMaintenanceRequest,
    role,
    setRole,
  } = useDemo();

  const { t, dir } = useLanguage();

  const [checkingAuth, setCheckingAuth] = useState(role !== "tenant" && role !== "admin");

  useEffect(() => {
    if (role === "tenant" || role === "admin") {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;
    const checkServerAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user && isMounted) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, role_approval_status")
            .eq("id", user.id)
            .single();

          if (profile && profile.role_approval_status === "Approved" && isMounted) {
            if (profile.role === "tenant" || profile.role === "admin") {
              setRole(profile.role as any);
              setCheckingAuth(false);
              return;
            }
          }
        }
      } catch {
        // Fallback for offline demo mode
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    };

    checkServerAuth();
    return () => {
      isMounted = false;
    };
  }, [role, setRole]);

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

  if (checkingAuth) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center" dir={dir}>
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#3B0F18] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#5E4A4E] font-medium">Verifying resident tenant credentials...</p>
        </div>
      </div>
    );
  }

  if (role !== "tenant" && role !== "admin") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center" dir={dir}>
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-8 sm:p-10 shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="badge badge-demo text-[10px] uppercase font-bold text-amber-800 bg-amber-100">
              Role Permission Required
            </span>
            <h1 className="text-2xl font-black text-[#1A080C] tracking-tight">
              Resident Tenant Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed">
              This dashboard is designated for verified leaseholders and residents to submit work orders and track rental agreements. Your active session role is {role.toUpperCase()}.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dashboard" className="btn btn-primary text-xs font-bold w-full sm:flex-1 py-2.5 px-6 text-center">
              Return to Investor Dashboard
            </Link>
            <Link href="/login" className="btn btn-secondary text-xs font-bold w-full sm:flex-1 py-2.5 px-6 text-center">
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-success">Active Resident</span>
            <span className="text-xs text-muted-se">Tenant ID: TNT-9082</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            Tenant &amp; Renter Portal
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Check your lease terms, pay your monthly rent, and request home repairs.
          </p>
        </div>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="glass rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-secondary-se">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">Next Step:</strong> Click the{" "}
            <strong className="text-[#1A080C]">&ldquo;Pay Monthly Rent&rdquo;</strong> button below to test how tenant rent flows to property investors.
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

      {/* Active Lease Agreement Card */}
      {activeLease && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EADCDD] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-se">
                Current Home Lease
              </span>
              <h2 className="text-2xl font-black text-[#1A080C] mt-0.5">
                {activeLease.propertyTitle} &bull; {activeLease.unitNumber}
              </h2>
              <div className="text-xs text-secondary-se">
                Renter: <strong className="text-[#1A080C]">{activeLease.tenantName}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePayRent(activeLease.id)}
                className="btn btn-primary text-xs flex items-center gap-1.5"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pay Monthly Rent (${activeLease.monthlyRent.toLocaleString()})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-xl p-3">
              <span className="text-muted-se block uppercase">Monthly Rent</span>
              <strong className="text-lg font-black text-[#1A080C]">
                ${activeLease.monthlyRent.toLocaleString()}
              </strong>
            </div>
            <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-xl p-3">
              <span className="text-muted-se block uppercase">Security Deposit</span>
              <strong className="text-lg font-black text-[#1A080C]">
                ${activeLease.securityDeposit.toLocaleString()}
              </strong>
            </div>
            <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-xl p-3">
              <span className="text-muted-se block uppercase">Lease Term</span>
              <strong className="text-sm font-bold text-[#1A080C]">
                {activeLease.startDate} to {activeLease.endDate}
              </strong>
            </div>
            <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-xl p-3">
              <span className="text-muted-se block uppercase">Due Date</span>
              <strong className="text-sm font-bold text-[#3B0F18]">
                {activeLease.paymentDueDay}st of every month
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Rent Receipts on Left (6), Maintenance Request on Right (6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rent Payment Receipts (6 cols) */}
        <div className="lg:col-span-6 glass rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">Rent Payment Receipts</h3>
            <span className="badge badge-success">Zero Overdue Rent</span>
          </div>

          <div className="divide-y divide-[#EADCDD]">
            {rentPayments.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1A080C]">{p.month} Rent Payment</div>
                  <div className="text-[11px] text-muted-se">
                    Paid on {p.paidDate} &bull; Receipt: {p.receiptId}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#1A080C]">${p.amount.toLocaleString()}</div>
                  <span className="badge badge-success text-[10px]">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Maintenance Request (6 cols) */}
        <div className="lg:col-span-6 glass rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
            <h3 className="font-bold text-base text-[#1A080C]">Submit Maintenance Request</h3>
            <span className="text-xs text-muted-se">Direct to Property Manager</span>
          </div>

          <form onSubmit={handleTenantMaintenance} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#1A080C]">Issue Subject</label>
              <input
                type="text"
                placeholder="e.g. Master bathroom tap dripping"
                value={maintTitle}
                onChange={(e) => setMaintTitle(e.target.value)}
                className="input text-[#1A080C]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Category</label>
                <select
                  value={maintCategory}
                  onChange={(e) => setMaintCategory(e.target.value as any)}
                  className="select text-[#1A080C]"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC &amp; Climate</option>
                  <option value="Appliance">Appliances</option>
                  <option value="General">General / Painting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1A080C]">Priority Level</label>
                <select
                  value={maintPriority}
                  onChange={(e) => setMaintPriority(e.target.value as any)}
                  className="select text-[#1A080C]"
                >
                  <option value="Low">Low (Within 7 days)</option>
                  <option value="Medium">Medium (Within 48 hours)</option>
                  <option value="High">High (Within 24 hours)</option>
                  <option value="Emergency">Emergency (Immediate)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1A080C]">Description of Maintenance Needed</label>
              <textarea
                rows={3}
                placeholder="Describe when the issue started and access instructions for technicians..."
                value={maintDesc}
                onChange={(e) => setMaintDesc(e.target.value)}
                className="textarea text-[#1A080C]"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full text-xs">
              Submit Maintenance Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
