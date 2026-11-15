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
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
              Notification Centre
            </span>
            {unreadNotificationCount > 0 && (
              <span className="text-xs font-bold text-[#7C4DFF]">
                {unreadNotificationCount} unread
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            Smart Alerts & Updates
          </h1>
          <p className="text-xs sm:text-sm text-[#585375]">
            Real-time notifications for rental payouts, due diligence renewals, work orders, and execution events.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E6D8F5] text-xs font-bold text-[#5B3A8C] hover:border-[#7C4DFF] shadow-sm transition-colors self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-[#7C4DFF]" />
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
                ? "bg-[#7C4DFF] text-white shadow-sm"
                : "bg-white text-[#585375] border border-[#E6D8F5] hover:bg-[#F3EAFC]"
            }`}
          >
            {cat === "ALL" ? "All Alerts" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle divide-y divide-[#F3EAFC]">
        {filtered.length > 0 ? (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.actionUrl) router.push(n.actionUrl);
              }}
              className={`py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#F8F4FD] transition-colors rounded-xl px-2 ${
                !n.read ? "bg-[#F3EAFC]/40 font-semibold" : ""
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    n.category === "PAYOUT"
                      ? "bg-mint text-emerald-800"
                      : n.category === "TRANSACTION"
                      ? "bg-[#F3EAFC] text-[#7C4DFF]"
                      : n.category === "MAINTENANCE"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-[#E0F2FE] text-sky-800"
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
                    <h3 className="text-sm font-bold text-[#1E1B4B]">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#7C4DFF]" />
                    )}
                  </div>
                  <p className="text-xs text-[#585375] leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-[#8782A3] block pt-0.5">{n.timestamp}</span>
                </div>
              </div>

              {n.actionUrl && (
                <div className="text-xs text-[#7C4DFF] font-bold flex items-center gap-1 flex-shrink-0">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-xs text-[#8782A3]">
            No alerts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
