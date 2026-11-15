"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PieChart, Bookmark, Wallet } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "/", icon: Home },
    { label: t.nav.explore, href: "/explore", icon: Compass },
    { label: t.nav.portfolio, href: "/dashboard", icon: PieChart },
    { label: t.common.status, href: "/reports", icon: Bookmark },
    { label: t.nav.wallet, href: "/wallet", icon: Wallet },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-40">
      <div className="bg-white/95 backdrop-blur-lg border border-[#E6D8F5] shadow-2xl rounded-2xl p-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#7C4DFF] text-white shadow-sm font-semibold scale-105"
                  : "text-[#585375] hover:text-[#7C4DFF]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
