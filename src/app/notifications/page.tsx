"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Coins,
  Wrench,
  ShieldCheck,
  Building,
  CheckCheck,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { NotificationCategory } from "@/types/notification";

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount,
  } = useDemo();
  const { t, dir } = useLanguage();
  const router = useRouter();

  const [filterCategory, setFilterCategory] = useState<"ALL" | NotificationCategory>("ALL");

  const filtered = notifications.filter((n) => {
    if (filterCategory === "ALL") return true;
    return n.category === filterCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-success">Notification Centre</span>
            {unreadNotificationCount > 0 && (
              <span className="text-xs font-bold text-accent-se">
                {unreadNotificationCount} unread
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
            Smart Alerts &amp; Updates
          </h1>
          <p className="text-xs sm:text-sm text-secondary-se">
            Real-time notifications for rental payouts, due diligence renewals, work orders, and execution events.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="btn btn-ghost flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-accent-se" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {(["ALL", "PAYOUT", "TRANSACTION", "MAINTENANCE", "DUE_DILIGENCE"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterCategory === cat
                ? "bg-[var(--se-primary)] text-white shadow-sm"
                : "bg-[#FAF5F5] text-secondary-se border border-[#EADCDD] hover:bg-[#F2E8E9]"
            }`}
          >
            {cat === "ALL" ? "All Alerts" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="glass rounded-3xl p-6 sm:p-8 divide-y divide-[#EADCDD]">
        {filtered.length > 0 ? (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.actionUrl) router.push(n.actionUrl);
              }}
              className={`py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF5F5] transition-colors rounded-xl px-2 ${
                !n.read ? "bg-[#FAF5F5] font-semibold" : ""
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                    n.category === "PAYOUT"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : n.category === "TRANSACTION"
                      ? "bg-[#FAF5F5] text-[#3B0F18] border-[#EADCDD]"
                      : n.category === "MAINTENANCE"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {n.category === "PAYOUT" ? (
                    <Coins className="w-4 h-4" />
                  ) : n.category === "TRANSACTION" ? (
                    <Building className="w-4 h-4" />
                  ) : n.category === "MAINTENANCE" ? (
                    <Wrench className="w-4 h-4" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1A080C]">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[var(--se-primary)]" />
                    )}
                  </div>
                  <p className="text-xs text-secondary-se leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-muted-se block pt-0.5">{n.timestamp}</span>
                </div>
              </div>

              {n.actionUrl && (
                <div className="text-xs text-accent-se font-bold flex items-center gap-1 flex-shrink-0">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-xs text-muted-se">
            No alerts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
