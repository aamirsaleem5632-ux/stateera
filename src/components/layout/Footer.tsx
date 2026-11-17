"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  ShieldCheck,
  Globe,
  ExternalLink,
} from "lucide-react";
import { SkylineLogo } from "@/components/brand/SkylineLogo";
import { BRAND_CONFIG } from "@/config/brand";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealGroup, Reveal } from "@/components/scroll/Reveal";

export default function Footer() {
  const { t, dir } = useLanguage();

  return (
    <footer className="bg-[#FAF5F5] text-[#1A080C] border-t border-[#EADCDD] pt-16 pb-24 md:pb-16 mt-20" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EADCDD]"
          stagger={0.08}
          variant="fade-up"
        >
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#3B0F18] flex items-center justify-center overflow-hidden">
                <SkylineLogo size={26} color="white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1A080C]">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs text-[#5E4A4E] leading-relaxed">
              Global PropTech platform empowering international investors with verified fractional ownership, automated monthly rental income, and full transparent Property Passports.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#3B0F18] bg-white w-fit px-3 py-1.5 rounded-lg border border-[#EADCDD]">
              <ShieldCheck className="w-4 h-4 text-[#3B0F18]" />
              <span>Simulated Prototype &bull; Practice Funds</span>
            </div>
            <div className="pt-2 text-xs text-[#5E4A4E] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3B0F18] shrink-0" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3B0F18] shrink-0" />
                <span>{BRAND_CONFIG.contact.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Flagship Programs */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#3B0F18]">
              Flagship Pathways
            </h4>
            <ul className="space-y-2 text-xs text-[#5E4A4E]">
              <li>
                <Link href="/explore" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Explore 100+ Properties
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#3B0F18] transition-colors font-medium">
                  How StateEra Works
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Micro-Saver &amp; Schemes
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Trust &amp; Verification Centre
                </Link>
              </li>
              <li>
                <Link href="/fees-and-returns" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Fees &amp; Returns Schedule
                </Link>
              </li>
              <li>
                <Link href="/ai-features" className="hover:text-[#3B0F18] transition-colors font-medium">
                  AI Property Detective
                </Link>
              </li>
              <li>
                <Link href="/experts" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Human Expert Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Insights & Community */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#3B0F18]">
              Analytics &amp; Education
            </h4>
            <ul className="space-y-2 text-xs text-[#5E4A4E]">
              <li>
                <Link href="/reports" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Profit &amp; Loss Analytics
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Learn Centre Academy
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Scenario Rent Simulator
                </Link>
              </li>
              <li>
                <Link href="/community-lab" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Community Property Lab
                </Link>
              </li>
              <li>
                <Link href="/governance" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Investor Governance
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Real Estate Glossary
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#3B0F18]">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#5E4A4E]">
              <li>
                <Link href="/about" className="hover:text-[#3B0F18] transition-colors font-medium">
                  About StateEra
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Support &amp; Help Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Contact Regional Desks
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Legal Centre Overview
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/risks" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Risk Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Portals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#3B0F18]">
              Role Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#5E4A4E]">
              <li>
                <Link href="/dashboard" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Wallet &amp; Ledger
                </Link>
              </li>
              <li>
                <Link href="/manager" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Property Manager Portal
                </Link>
              </li>
              <li>
                <Link href="/tenant" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Admin &amp; KYC Compliance
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#3B0F18] transition-colors font-medium">
                  Sign In / Create Account
                </Link>
              </li>
            </ul>
          </div>
        </RevealGroup>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7B7F]">
          <div>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. {t.footer.rights}
          </div>
          <p className="max-w-2xl text-center md:text-right leading-relaxed text-[11px]">
            {BRAND_CONFIG.disclaimer} All properties, valuations, and payouts displayed in demo mode are simulated for academic prototype evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
