"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  Bell,
  Wallet,
  RotateCcw,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  Layers,
  Shield,
  KeyRound,
  LogOut,
} from "lucide-react";
import { SkylineLogo } from "@/components/brand/SkylineLogo";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/types";
import { BRAND_CONFIG } from "@/config/brand";
import { UserRole } from "@/types/admin";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage, dir } = useLanguage();
  const {
    role,
    setRole,
    authUserId,
    authUserEmail,
    signOut,
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; desc: string; icon: any }[] = [
    { id: "investor", label: t.nav.roleInvestor, desc: "Explore, buy shares & collect rent", icon: UserCheck },
    { id: "manager", label: t.nav.roleManager, desc: "Manage properties, rent & work orders", icon: Layers },
    { id: "tenant", label: t.nav.roleTenant, desc: "View lease, pay rent & requests", icon: KeyRound },
    { id: "admin", label: t.nav.roleAdmin, desc: "Platform stats, KYC & approvals", icon: Shield },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === "manager") router.push("/demo/manager");
    else if (newRole === "tenant") router.push("/demo/tenant");
    else if (newRole === "admin") router.push("/demo/admin");
    else router.push("/dashboard");
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      {/* Slim white/soft-rose Practice Demo Mode ribbon */}
      <div className="bg-[#FAF5F5] text-[#1A080C] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 relative z-50 border-b border-[#EADCDD]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0" />
        <span className="bg-[#3B0F18] text-white text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
          Practice mode
        </span>
        <span className="hidden lg:inline text-[#5E4A4E]">{BRAND_CONFIG.disclaimer}</span>
        <button
          onClick={() => {
            resetDemoData();
            alert("Demo data reset to default successfully!");
          }}
          className="ml-1 sm:ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#3B0F18] underline hover:text-[#2A0A10] transition-colors shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset practice data</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EADCDD] shadow-[0_1px_2px_rgba(26,8,12,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[#3B0F18] flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
              <SkylineLogo size={26} color="white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1A080C]">
                {BRAND_CONFIG.name}
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-semibold tracking-wider text-[#8C7B7F]">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Horizontal Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#5E4A4E]">
            <Link
              href="/"
              className={`hover:text-[#3B0F18] transition-colors ${
                pathname === "/" ? "text-[#3B0F18] font-bold" : ""
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/explore"
              className={`hover:text-[#3B0F18] transition-colors ${
                pathname === "/explore" ? "text-[#3B0F18] font-bold" : ""
              }`}
            >
              {t.nav.explore}
            </Link>
            <Link
              href="/dashboard"
              className={`hover:text-[#3B0F18] transition-colors ${
                pathname === "/dashboard" ? "text-[#3B0F18] font-bold" : ""
              }`}
            >
              {t.nav.dashboard}
            </Link>
            <Link
              href="/reports"
              className={`hover:text-[#3B0F18] transition-colors ${
                pathname === "/reports" ? "text-[#3B0F18] font-bold" : ""
              }`}
            >
              {t.nav.reports}
            </Link>
            <Link
              href="/wallet"
              className={`lg:hidden hover:text-[#3B0F18] transition-colors ${
                pathname === "/wallet" ? "text-[#3B0F18] font-bold" : ""
              }`}
            >
              {t.nav.wallet}
            </Link>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Demo Wallet Balance Pill */}
            <Link
              href="/wallet"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5F5] border border-[#EADCDD] text-[#1A080C] text-xs font-semibold hover:border-[#3B0F18] transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-[#3B0F18]" />
              <span className="hidden sm:inline text-[#5E4A4E]">Demo:</span>
              <span className="text-[#3B0F18] font-bold text-xs">
                ${walletBalance >= 1000 ? `${(walletBalance / 1000).toFixed(1)}k` : walletBalance}
              </span>
            </Link>

            {/* Role Switcher Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EADCDD] text-[#1A080C] text-xs font-medium hover:border-[#3B0F18] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                <span className="capitalize font-semibold">{role}</span>
                <span className="text-[10px] text-[#8C7B7F] font-medium hidden lg:inline">(Demo)</span>
                <ChevronDown className="w-3 h-3 text-[#8C7B7F]" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-[#EADCDD] rounded-xl shadow-lg py-2 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1.5 border-b border-[#FAF5F5] text-[10px] uppercase font-bold tracking-wider text-[#8C7B7F]">
                    Switch Demo Role Sandbox
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-[#FAF5F5] transition-colors ${
                          role === r.id ? "bg-[#FAF5F5] text-[#3B0F18] font-semibold" : "text-[#1A080C]"
                        }`}
                      >
                        <Icon className="w-4 h-4 mt-0.5 text-[#3B0F18]" />
                        <div>
                          <div className="font-semibold">{r.label}</div>
                          <div className="text-[10px] text-[#5E4A4E]">{r.desc}</div>
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
                className="p-2 rounded-lg bg-white border border-[#EADCDD] hover:border-[#3B0F18] text-[#5E4A4E] hover:text-[#3B0F18] relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3B0F18] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white border border-[#EADCDD] rounded-xl shadow-lg py-2 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1.5 border-b border-[#EADCDD] flex items-center justify-between text-[#1A080C] font-bold">
                    <span>Notifications ({unreadNotificationCount} unread)</span>
                    <Link
                      href="/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-[11px] text-[#3B0F18] hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#FAF5F5]">
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
                        className={`p-3 cursor-pointer hover:bg-[#FAF5F5] transition-colors ${
                          !n.read ? "bg-[#FAF5F5]" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-[#1A080C]">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-[#8C7B7F]">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-[#5E4A4E] mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EADCDD] hover:border-[#3B0F18] text-xs font-semibold transition-colors text-[#1A080C]"
                aria-label="Language Selector"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.name}</span>
                <ChevronDown className="w-3 h-3 text-[#8C7B7F]" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border border-[#EADCDD] rounded-xl shadow-lg py-1.5 z-50 text-xs"
                  dir={dir}
                >
                  <div className="px-3 py-1 border-b border-[#FAF5F5] text-[10px] uppercase font-bold tracking-wider text-[#8C7B7F]">
                    Select Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#FAF5F5] transition-colors ${
                        language === l.code ? "bg-[#FAF5F5] text-[#3B0F18] font-bold" : "text-[#1A080C]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </div>
                      <span className="text-[10px] text-[#8C7B7F]">{l.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Portal Login / Authenticated User Status */}
            {authUserId ? (
              <div className="hidden lg:inline-flex items-center gap-2">
                <span className="text-xs text-[#5E4A4E] max-w-[130px] truncate" title={authUserEmail || undefined}>
                  {authUserEmail || "Signed In"}
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    router.push("/login");
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EADCDD] hover:border-[#DC2626] text-[#DC2626] text-xs font-semibold hover:bg-[#FEF2F2] transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EADCDD] hover:border-[#3B0F18] text-[#1A080C] text-xs font-semibold hover:bg-[#FAF5F5] transition-all"
              >
                <span>Live Login</span>
              </Link>
            )}

            {/* Try Interactive Demo CTA (Plain text, no sparkle icon) */}
            <Link
              href="/explore"
              className="!hidden 2xl:!inline-flex btn btn-primary text-xs"
            >
              <span>{t.nav.tryDemo}</span>
            </Link>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#5E4A4E] hover:bg-[#FAF5F5] hover:text-[#3B0F18] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EADCDD] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg" dir={dir}>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C] font-semibold"
              >
                {t.nav.explore}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.dashboard}
              </Link>
              <Link
                href="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.reports}
              </Link>
              <Link
                href="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.wallet}
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.howItWorks}
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                How It Works
              </Link>
              <Link
                href="/schemes"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Micro-Saver Schemes
              </Link>
              <Link
                href="/trust"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Trust Centre
              </Link>
              <Link
                href="/ai-features"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                AI Property Detective
              </Link>
              <Link
                href="/experts"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Human Expert Network
              </Link>
              <Link
                href="/community-lab"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Community Property Lab
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.dashboard}
              </Link>
              <Link
                href="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                P&amp;L Analytics
              </Link>
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Learn Centre
              </Link>
              <Link
                href="/simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.simulator}
              </Link>
              <Link
                href="/governance"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.governance}
              </Link>
              <Link
                href="/glossary"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.glossary}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                About Us
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                FAQ
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                Support Desk
              </Link>
              <Link
                href="/demo/manager"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.manager} (Demo)
              </Link>
              <Link
                href="/demo/tenant"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.tenant} (Demo)
              </Link>
              <Link
                href="/demo/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.admin} (Demo)
              </Link>
              {authUserId ? (
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                    router.push("/login");
                  }}
                  className="p-2.5 rounded-lg border border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] font-bold text-left flex items-center justify-between"
                >
                  <span className="truncate text-xs">{authUserEmail || "Account"}</span>
                  <span className="text-xs flex items-center gap-1 font-semibold">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg border border-[#3B0F18] bg-[#FAF5F5] text-[#3B0F18] font-bold"
                >
                  Live Portal Login
                </Link>
              )}
              <Link
                href="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg border border-[#EADCDD] hover:bg-[#FAF5F5] text-[#1A080C]"
              >
                {t.nav.wallet}
              </Link>
            </div>

            {/* Mobile Role Switcher */}
            <div className="pt-2 border-t border-[#EADCDD]">
              <span className="text-xs font-bold text-[#8C7B7F] uppercase tracking-wider block mb-2">Switch Role:</span>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      handleRoleSelect(r.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-lg text-xs font-medium text-left border ${
                      role === r.id ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD]"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-[#EADCDD]">
              <span className="text-xs font-bold text-[#8C7B7F] uppercase tracking-wider block mb-2">Language:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium border ${
                      language === l.code ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD]"
                    }`}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
