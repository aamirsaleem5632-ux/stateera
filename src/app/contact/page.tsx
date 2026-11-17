"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  Globe,
  Sparkles,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [officeTarget, setOfficeTarget] = useState("dubai");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const offices = [
    {
      city: "New York",
      country: "United States",
      address: "One Financial Center, 42nd Floor, New York, NY 10005",
      phone: "+1 (800) 555-ERA-PROP",
      email: "nyc@stateera.demo",
      hours: "09:00 – 18:00 EST (Mon–Fri)",
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "25 Bank Street, Canary Wharf, London, E14 5JP",
      phone: "+44 20 7946 0912",
      email: "london@stateera.demo",
      hours: "09:00 – 18:00 GMT (Mon–Fri)",
    },
    {
      city: "Dubai",
      country: "United Arab Emirates",
      address: "DIFC Gate Precinct 4, Level 7, Dubai, UAE",
      phone: "+971 4 388 9120",
      email: "dubai@stateera.demo",
      hours: "09:00 – 18:00 GST (Mon–Fri)",
    },
    {
      city: "Islamabad",
      country: "Pakistan",
      address: "Islamabad Corporate Center, Jinnah Avenue, Blue Area",
      phone: "+92 51 289 4400",
      email: "islamabad@stateera.demo",
      hours: "09:00 – 18:00 PKT (Mon–Sat)",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Globe className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Global Footprint</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Contact StateEra
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Whether you are an institutional developer seeking to list a property or an individual exploring fractional ownership, our global teams are ready to assist.
        </p>
      </div>

      {/* Global Offices Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offices.map((off) => (
          <div
            key={off.city}
            className="bg-white border border-[#EADCDD] rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B0F18] text-white flex items-center justify-center font-bold text-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A080C]">{off.city}</h3>
                <span className="text-xs text-[#8C7B7F]">{off.country}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#5E4A4E] pt-2 border-t border-[#EADCDD]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3B0F18] shrink-0 mt-0.5" />
                <span>{off.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3B0F18] shrink-0" />
                <span>{off.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3B0F18] shrink-0" />
                <span>{off.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#8C7B7F]">
                <Clock className="w-3.5 h-3.5 text-[#3B0F18] shrink-0" />
                <span>{off.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold text-[#1A080C]">Send an Inquiry</h2>
          <p className="text-xs text-[#5E4A4E]">
            Our regional property coordinators will respond within 24 business hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-base font-bold text-[#1A080C]">Inquiry Dispatched!</h4>
            <p className="text-xs text-[#5E4A4E]">
              Thank you for reaching out. A regional StateEra representative will contact you via email shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn btn-secondary text-xs font-bold py-2 px-4"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#1A080C] mb-1">Your Full Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jonathan Sterling"
                className="input w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Email Address:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Preferred Regional Desk:</label>
                <select
                  value={officeTarget}
                  onChange={(e) => setOfficeTarget(e.target.value)}
                  className="select w-full"
                >
                  <option value="dubai">Dubai (Middle East &amp; GCC)</option>
                  <option value="london">London (UK &amp; Europe)</option>
                  <option value="nyc">New York (Americas)</option>
                  <option value="islamabad">Islamabad (Pakistan &amp; South Asia)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A080C] mb-1">Inquiry Message:</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our real estate or technical team assist you?"
                className="input w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-xs font-bold py-3 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
