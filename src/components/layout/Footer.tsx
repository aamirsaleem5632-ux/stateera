"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/types";

export const Footer: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();

  return (
    <footer className="bg-[#1E1B4B] text-white border-t border-[#332D56] pt-16 pb-24 md:pb-16 mt-20" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#332D56]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B3A8C] to-[#7C4DFF] flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-[#A5A0C8] max-w-sm leading-relaxed">
              {t.footer.intro}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#DCFCE7] bg-[#DCFCE7]/10 w-fit px-3 py-1.5 rounded-lg border border-[#DCFCE7]/20">
              <Sparkles className="w-4 h-4 text-mint" />
              <span>Institutional-Grade Fractional Real Estate Engine</span>
            </div>
            <div className="pt-2 text-xs text-[#A5A0C8] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7C4DFF]" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7C4DFF]" />
                <span>{BRAND_CONFIG.contact.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-mint">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#A5A0C8]">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>{t.nav.explore}</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-white transition-colors">
                  {t.nav.wallet}
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition-colors">
                  {t.nav.reports}
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-white transition-colors">
                  {t.nav.simulator}
                </Link>
              </li>
            </ul>
          </div>

          {/* Investor Resources */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-mint">
              {t.footer.investorResources}
            </h4>
            <ul className="space-y-2 text-sm text-[#A5A0C8]">
              <li>
                <Link href="/governance" className="hover:text-white transition-colors">
                  Shareholder Registry
                </Link>
              </li>
              <li>
                <Link href="/property/prop-dubai-marina-tower" className="hover:text-white transition-colors">
                  Due Diligence Audit Centre
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition-colors">
                  Monthly NOI Statements
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Management & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-mint">
              Operations & Roles
            </h4>
            <ul className="space-y-2 text-sm text-[#A5A0C8]">
              <li>
                <Link href="/manager" className="hover:text-white transition-colors">
                  {t.nav.roleManager}
                </Link>
              </li>
              <li>
                <Link href="/tenant" className="hover:text-white transition-colors">
                  {t.nav.roleTenant}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  {t.nav.roleAdmin}
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-white transition-colors">
                  Smart Notification Centre
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <label className="text-[11px] font-semibold text-[#A5A0C8] block mb-1.5">
                Interface Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                aria-label="Select Interface Language"
                className="bg-[#2D275A] border border-[#3E3672] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#7C4DFF]"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#1E1B4B]">
                    {l.flag} {l.name} ({l.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded-xl bg-[#272252]/80 border border-[#3A336E] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#F8D7E8] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#C5BFE3] leading-relaxed">
            <strong className="text-white font-semibold">Regulatory & Simulation Disclaimer: </strong>
            {BRAND_CONFIG.disclaimer} All dividend distributions, yields, valuations, occupancy rates, and transaction ledgers represent simulated prototype mechanics. StateEra does not provide investment, tax, or legal advisory services.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#332D56] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8782A3] gap-4">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.legalName}. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
            <span className="hover:text-white cursor-pointer">Security Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
