"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Globe,
  Bell,
  Wallet,
  RotateCcw,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  BarChart3,
  Sliders,
  Shield,
  KeyRound,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n/types";
import { BRAND_CONFIG } from "@/config/brand";
import { UserRole } from "@/types/admin";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage, dir } = useLanguage();
  const {
    role,
    setRole,
    walletBalance,
    unreadNotificationCount,
    resetDemoData,
    notifications,
    markNotificationAsRead,
  } = useDemo();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; desc: string; icon: any }[] = [
    { id: "investor", label: t.nav.roleInvestor, desc: "Explore, buy shares & collect rent", icon: UserCheck },
    { id: "manager", label: t.nav.roleManager, desc: "Manage properties, rent & work orders", icon: Layers },
    { id: "tenant", label: t.nav.roleTenant, desc: "View lease, pay rent & requests", icon: KeyRound },
    { id: "admin", label: t.nav.roleAdmin, desc: "Platform stats, KYC & approvals", icon: Shield },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === "manager") router.push("/manager");
    else if (newRole === "tenant") router.push("/tenant");
    else if (newRole === "admin") router.push("/admin");
    else router.push("/dashboard");
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      {/* Top Demo Disclaimer Ribbon */}
      <div className="bg-[#5B3A8C] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 relative z-50">
        <span className="inline-block w-2 h-2 rounded-full bg-mint animate-pulse" />
        <span className="font-semibold tracking-wide uppercase bg-[#7C4DFF] px-2 py-0.5 rounded text-[10px]">
          {t.common.demoBadge}
        </span>
        <span className="hidden sm:inline text-white/90">{BRAND_CONFIG.disclaimer}</span>
        <button
          onClick={() => {
            resetDemoData();
            alert("Demo data reset to default successfully!");
          }}
          className="ml-2 inline-flex items-center gap-1 text-[11px] underline hover:text-mint transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.nav.resetDemo}</span>
        </button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6D8F5] shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B3A8C] to-[#7C4DFF] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#1E1B4B]">
                {BRAND_CONFIG.name}
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-semibold tracking-widest text-[#7C4DFF]">
                Fractional PropTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#585375]">
            <Link
              href="/"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/explore"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/explore" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.explore}
            </Link>
            <Link
              href="/dashboard"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/dashboard" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.dashboard}
            </Link>
            <Link
              href="/reports"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/reports" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.reports}
            </Link>
            <Link
              href="/simulator"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/simulator" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.simulator}
            </Link>
            <Link
              href="/governance"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/governance" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.governance}
            </Link>
            <Link
              href="/glossary"
              className={`hover:text-[#7C4DFF] transition-colors ${
                pathname === "/glossary" ? "text-[#7C4DFF] font-semibold" : ""
              }`}
            >
              {t.nav.glossary}
            </Link>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Demo Wallet Balance Pill */}
            <Link
              href="/wallet"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F3EAFC] hover:bg-[#E6D8F5] border border-[#E6D8F5] text-[#1E1B4B] text-xs font-semibold shadow-sm transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-[#7C4DFF]" />
              <span className="hidden sm:inline text-[#585375]">Demo:</span>
              <span className="text-[#7C4DFF] font-bold text-[11px] sm:text-xs">
                ${walletBalance >= 1000 ? `${(walletBalance / 1000).toFixed(1)}k` : walletBalance}
              </span>
            </Link>

            {/* Role Switcher Dropdown (hidden on small mobile screens to prevent header overflow) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#E6D8F5] text-[#1E1B4B] text-xs font-medium hover:border-[#7C4DFF] shadow-sm transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="capitalize font-semibold">{role}</span>
                <ChevronDown className="w-3 h-3 text-[#585375]" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-[#E6D8F5] rounded-xl shadow-dropdown py-2 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1.5 border-b border-[#E6D8F5] text-[10px] uppercase font-bold tracking-wider text-[#8782A3]">
                    Switch User Role View
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-[#F3EAFC] transition-colors ${
                          role === r.id ? "bg-[#F3EAFC] text-[#7C4DFF] font-semibold" : "text-[#1E1B4B]"
                        }`}
                      >
                        <Icon className="w-4 h-4 mt-0.5 text-[#7C4DFF]" />
                        <div>
                          <div className="font-semibold">{r.label}</div>
                          <div className="text-[10px] text-[#585375]">{r.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setLangDropdownOpen(false);
                  setRoleDropdownOpen(false);
                }}
                className="p-2 rounded-xl bg-white border border-[#E6D8F5] hover:border-[#7C4DFF] text-[#585375] hover:text-[#7C4DFF] relative transition-colors shadow-sm"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7C4DFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white border border-[#E6D8F5] rounded-xl shadow-dropdown py-2 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1.5 border-b border-[#E6D8F5] flex items-center justify-between text-[#1E1B4B] font-bold">
                    <span>Notifications ({unreadNotificationCount} unread)</span>
                    <Link
                      href="/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-[11px] text-[#7C4DFF] hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#E6D8F5]/50">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.actionUrl) {
                            setNotifDropdownOpen(false);
                            router.push(n.actionUrl);
                          }
                        }}
                        className={`p-3 cursor-pointer hover:bg-[#F3EAFC] transition-colors ${
                          !n.read ? "bg-[#F3EAFC]/50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-[#1E1B4B]">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-[#8782A3]">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-[#585375] mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector (hidden on small mobile screens to prevent overflow; available in mobile drawer) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#E6D8F5] hover:border-[#7C4DFF] text-xs font-semibold shadow-sm transition-colors"
                aria-label="Language Selector"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.name}</span>
                <ChevronDown className="w-3 h-3 text-[#585375]" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border border-[#E6D8F5] rounded-xl shadow-dropdown py-1.5 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1 border-b border-[#E6D8F5] text-[10px] uppercase font-bold tracking-wider text-[#8782A3]">
                    Select Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F3EAFC] transition-colors ${
                        language === l.code ? "bg-[#F3EAFC] text-[#7C4DFF] font-bold" : "text-[#1E1B4B]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </div>
                      <span className="text-[10px] text-[#8782A3]">{l.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Try Interactive Demo CTA */}
            <Link
              href="/explore"
              className="hidden 2xl:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6C3CE9] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-mint" />
              <span>{t.nav.tryDemo}</span>
            </Link>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#585375] hover:bg-[#F3EAFC] hover:text-[#7C4DFF] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#E6D8F5] bg-white px-4 pt-3 pb-6 space-y-3" dir={dir}>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.explore}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.dashboard}
              </Link>
              <Link
                href="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.reports}
              </Link>
              <Link
                href="/simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.simulator}
              </Link>
              <Link
                href="/governance"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.governance}
              </Link>
              <Link
                href="/glossary"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.glossary}
              </Link>
              <Link
                href="/manager"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.manager}
              </Link>
              <Link
                href="/tenant"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.tenant}
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.admin}
              </Link>
              <Link
                href="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#F8F4FD] hover:bg-[#F3EAFC] text-[#1E1B4B]"
              >
                {t.nav.wallet}
              </Link>
            </div>

            <div className="pt-2 border-t border-[#E6D8F5] flex flex-col gap-2">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#7C4DFF] text-white font-bold text-sm shadow-md"
              >
                {t.nav.tryDemo}
              </Link>
              <button
                onClick={() => {
                  resetDemoData();
                  setMobileMenuOpen(false);
                  alert("Demo data reset to default successfully!");
                }}
                className="w-full text-center py-2 rounded-xl bg-[#F3EAFC] text-[#5B3A8C] font-semibold text-xs border border-[#E6D8F5]"
              >
                {t.nav.resetDemo}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
