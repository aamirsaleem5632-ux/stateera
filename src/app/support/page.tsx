"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  MessageSquare,
  FileQuestion,
  Phone,
  Mail,
  CheckCircle2,
  Send,
  Search,
  ExternalLink,
  LifeBuoy,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function SupportCentrePage() {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("wallet");
  const [ticketMessage, setTicketMessage] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(id);
    setTicketSubject("");
    setTicketMessage("");
  };

  const commonArticles = [
    { title: "How do monthly rental income dividends work?", href: "/how-it-works", cat: "Payouts" },
    { title: "Can I sell my fractional shares before property liquidation?", href: "/fees-and-returns", cat: "Secondary Market" },
    { title: "How do I complete investor KYC identity verification?", href: "/trust", cat: "Verification" },
    { title: "What is the StateEra Property Protection Score?", href: "/trust", cat: "Due Diligence" },
    { title: "What happens if a tenant misses their monthly rent?", href: "/simulator", cat: "Risk Management" },
    { title: "How does the Micro-Saver savings goal operate?", href: "/schemes", cat: "Savings" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <LifeBuoy className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>24/7 Global Member Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Support &amp; Help Centre
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Need assistance with your wallet, fractional transactions, or property audits? Our dedicated support specialists are here to guide you.
        </p>
      </div>

      {/* Quick Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A080C]">Email Support</h3>
          <p className="text-xs text-[#5E4A4E] leading-relaxed">
            Direct priority ticket queue. Average response time under 2 hours.
          </p>
          <a
            href={`mailto:${BRAND_CONFIG.contact.supportEmail}`}
            className="text-xs font-bold text-[#3B0F18] hover:underline block pt-2"
          >
            {BRAND_CONFIG.contact.supportEmail}
          </a>
        </div>

        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A080C]">Toll-Free Phone</h3>
          <p className="text-xs text-[#5E4A4E] leading-relaxed">
            Available Monday to Friday, 08:00 – 20:00 GMT across our global hubs.
          </p>
          <a
            href={`tel:${BRAND_CONFIG.contact.phone}`}
            className="text-xs font-bold text-[#3B0F18] hover:underline block pt-2"
          >
            {BRAND_CONFIG.contact.phone}
          </a>
        </div>

        <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A080C]">Human Expert Advisory</h3>
          <p className="text-xs text-[#5E4A4E] leading-relaxed">
            Need legal, tax, or valuation guidance? Schedule a 1-on-1 video consultation.
          </p>
          <Link
            href="/experts"
            className="text-xs font-bold text-[#3B0F18] hover:underline block pt-2"
          >
            Book Free Expert Consultation &rarr;
          </Link>
        </div>
      </div>

      {/* Ticket Submission Form & Common Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Support Ticket Form */}
        <div className="lg:col-span-7 bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-5">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#1A080C]">Open a Support Ticket</h3>
            <p className="text-xs text-[#5E4A4E]">
              Submit your inquiry directly to our platform operations team.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-2xl bg-white border border-emerald-200 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 className="text-base font-bold text-[#1A080C]">Support Ticket Dispatched!</h4>
              <p className="text-xs text-[#5E4A4E]">
                Reference ID: <strong className="text-[#3B0F18]">{submittedTicket}</strong>. Our member support desk will reply to your registered account email shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="btn btn-secondary text-xs font-bold py-2 px-4"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Issue Category:</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="select w-full"
                >
                  <option value="wallet">Wallet Deposit, Withdrawal or Balance Inquiry</option>
                  <option value="property">Property Details or Due Diligence Clarification</option>
                  <option value="kyc">KYC &amp; Identity Verification Document Status</option>
                  <option value="tenant">Tenant Portal &amp; Rent Payment Assistance</option>
                  <option value="other">General Platform Questions</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Subject:</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of your inquiry..."
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Message Details:</label>
                <textarea
                  rows={4}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Provide all relevant details, property IDs, or transaction reference codes..."
                  className="input w-full"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-xs font-bold py-3 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* Knowledge Base Articles */}
        <div className="lg:col-span-5 bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#1A080C]">Frequently Consulted Guides</h3>
            <p className="text-xs text-[#5E4A4E]">Fast answers to standard member questions.</p>
          </div>

          <div className="divide-y divide-[#EADCDD]">
            {commonArticles.map((art, idx) => (
              <Link
                key={idx}
                href={art.href}
                className="py-3.5 flex items-center justify-between text-xs hover:text-[#3B0F18] group transition-colors block"
              >
                <div>
                  <span className="text-[10px] text-[#8C7B7F] uppercase font-bold block mb-0.5">{art.cat}</span>
                  <span className="font-semibold text-[#1A080C] group-hover:text-[#3B0F18]">{art.title}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C7B7F] group-hover:text-[#3B0F18] shrink-0 ml-2" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EADCDD]">
            <Link href="/faq" className="btn btn-secondary w-full text-xs font-bold block text-center py-2.5">
              Browse Complete Searchable FAQ &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
