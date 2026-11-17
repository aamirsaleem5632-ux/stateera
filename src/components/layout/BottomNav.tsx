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
    { label: t.nav.reports, href: "/reports", icon: Bookmark },
    { label: t.nav.wallet, href: "/wallet", icon: Wallet },
  ];

  return (
    <nav className="md:hidden glass-bottom-nav" aria-label="Mobile Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-colors ${
              isActive
                ? "text-[#3B0F18] font-bold"
                : "text-[#5E4A4E] hover:text-[#1A080C]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
