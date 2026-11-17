"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Star,
  Search,
  Filter,
  X,
  MessageSquare,
  Award,
  AlertCircle,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

interface Expert {
  id: string;
  name: string;
  role: string;
  category: "legal" | "consultant" | "financial" | "valuation" | "rental";
  experienceYears: number;
  credentials: string[];
  languages: string[];
  jurisdiction: string;
  rating: number;
  reviewCount: number;
  bio: string;
  hourlyRate: string;
  availability: string;
}

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookingModalExpert, setBookingModalExpert] = useState<Expert | null>(null);

  // Booking Form State
  const [bookDate, setBookDate] = useState<string>("2026-11-25");
  const [bookTime, setBookTime] = useState<string>("14:00 GMT");
  const [meetingType, setMeetingType] = useState<"video" | "in-person" | "phone">("video");
  const [meetingPurpose, setMeetingPurpose] = useState<string>("Cross-Border Property Due Diligence");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Mock Active Appointments History
  const [myAppointments, setMyAppointments] = useState<any[]>([
    {
      id: "apt-101",
      expertName: "Adv. Bilal Hassan, LL.M",
      expertRole: "Senior Property Legal Counsel",
      date: "2026-11-20",
      time: "10:30 AM",
      type: "Video Consultation",
      status: "Confirmed",
      purpose: "Title deed validation & overseas Pakistani tax structure review",
    },
  ]);

  const experts: Expert[] = [
    {
      id: "exp-1",
      name: "Adv. Bilal Hassan, LL.M",
      role: "Senior Real Estate Legal Advisor",
      category: "legal",
      experienceYears: 16,
      credentials: ["High Court Bar Association", "LL.M International Commercial Law (UCL)"],
      languages: ["English", "Urdu"],
      jurisdiction: "Pakistan & GCC Free Zones",
      rating: 4.96,
      reviewCount: 142,
      bio: "Specializes in cross-border property acquisitions, SPV structuring, and title deed dispute avoidance for international and expatriate buyers.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available Tomorrow",
    },
    {
      id: "exp-2",
      name: "Clara Beauchamp, MRICS",
      role: "Chartered Valuation Surveyor",
      category: "valuation",
      experienceYears: 14,
      credentials: ["Royal Institution of Chartered Surveyors (RICS)", "Registered Valuer"],
      languages: ["English", "French"],
      jurisdiction: "United Kingdom & Western Europe",
      rating: 4.94,
      reviewCount: 98,
      bio: "Independent chartered surveyor conducting red-book valuations, lease covenant audits, and capital expenditure forecasting for commercial assets.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available this Friday",
    },
    {
      id: "exp-3",
      name: "Fahad Al-Nuaimi, CFA",
      role: "Real Estate Investment Portfolio Strategist",
      category: "financial",
      experienceYears: 12,
      credentials: ["CFA Charterholder", "Chartered Alternative Investment Analyst (CAIA)"],
      languages: ["English", "Arabic"],
      jurisdiction: "UAE, Saudi Arabia & Qatar",
      rating: 4.98,
      reviewCount: 184,
      bio: "Advises individual and family-office investors on multi-currency rental yield optimization, real estate portfolio hedging, and inflation preservation.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available Next Monday",
    },
    {
      id: "exp-4",
      name: "Marcus Vance",
      role: "Asset & Tenancy Management Specialist",
      category: "rental",
      experienceYears: 18,
      credentials: ["Certified Property Manager (CPM)", "BOMA Fellow"],
      languages: ["English", "Spanish"],
      jurisdiction: "North America (US & Canada)",
      rating: 4.91,
      reviewCount: 115,
      bio: "Oversees large-scale multi-family and commercial leasing, tenant dispute mitigation, preventative engineering maintenance, and escrow management.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available Thursday",
    },
    {
      id: "exp-5",
      name: "Dr. Kenji Sato",
      role: "Asia-Pacific Commercial Real Estate Consultant",
      category: "consultant",
      experienceYears: 15,
      credentials: ["Certified Commercial Investment Member (CCIM)", "Tokyo Real Estate Bar"],
      languages: ["English", "Japanese"],
      jurisdiction: "Japan, Singapore & Malaysia",
      rating: 4.95,
      reviewCount: 88,
      bio: "Advises global investors on logistics hubs, commercial offices, and prime residential acquisitions across Tokyo, Singapore, and Kuala Lumpur.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available Tomorrow",
    },
    {
      id: "exp-6",
      name: "Amina Al-Mansoor",
      role: "Expatriate Property Guidance & KYC Consultant",
      category: "consultant",
      experienceYears: 11,
      credentials: ["Dubai Land Department Licensed Consultant", "AML Compliance Certified"],
      languages: ["English", "Arabic", "Urdu"],
      jurisdiction: "GCC & Middle East",
      rating: 4.97,
      reviewCount: 210,
      bio: "Guides first-time overseas buyers and Micro-Saver participants through document authentication, cross-border remittances, and ownership verification.",
      hourlyRate: "Free Demo Consultation",
      availability: "Available Today",
    },
  ];

  const filteredExperts = experts.filter((exp) => {
    const matchesCat = selectedCategory === "all" || exp.category === selectedCategory;
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalExpert) return;

    const newApt = {
      id: `apt-${Date.now()}`,
      expertName: bookingModalExpert.name,
      expertRole: bookingModalExpert.role,
      date: bookDate,
      time: bookTime,
      type: meetingType === "video" ? "Video Consultation" : meetingType === "phone" ? "Phone Call" : "In-Person Meeting",
      status: "Confirmed",
      purpose: meetingPurpose,
    };

    setMyAppointments([newApt, ...myAppointments]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalExpert(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Vetted Professional Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Human Expert Network
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Connect directly with accredited real estate attorneys, chartered RICS surveyors, and cross-border portfolio managers for personalized guidance.
        </p>
      </div>

      {/* Active Appointments Strip (if any) */}
      {myAppointments.length > 0 && (
        <div className="bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#1A080C] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3B0F18]" />
              <span>Your Scheduled Expert Consultations ({myAppointments.length})</span>
            </h3>
            <span className="badge badge-success text-xs font-bold">Upcoming</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myAppointments.map((apt) => (
              <div key={apt.id} className="bg-white border border-[#EADCDD] rounded-2xl p-5 space-y-2.5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-[#1A080C]">{apt.expertName}</h4>
                    <p className="text-xs text-[#8C7B7F]">{apt.expertRole}</p>
                  </div>
                  <span className="badge badge-demo text-[10px]">{apt.status}</span>
                </div>
                <div className="text-xs text-[#5E4A4E] flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold text-[#1A080C]">
                    <Calendar className="w-3.5 h-3.5 text-[#3B0F18]" />
                    {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3B0F18]" />
                    {apt.time}
                  </span>
                  <span className="flex items-center gap-1 text-[#3B0F18] font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    {apt.type}
                  </span>
                </div>
                <p className="text-xs text-[#5E4A4E] pt-1 border-t border-[#EADCDD]">
                  <strong className="text-[#1A080C]">Purpose:</strong> {apt.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="glass p-5 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-se absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experts by name, specialty, or country jurisdiction..."
              className="input pl-10 pr-4 text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            {[
              { id: "all", label: "All Specialties" },
              { id: "legal", label: "Legal Advisors" },
              { id: "valuation", label: "Valuation Specialists" },
              { id: "financial", label: "Financial Strategists" },
              { id: "rental", label: "Tenancy Managers" },
              { id: "consultant", label: "Consultants" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "btn-primary shadow-sm"
                    : "bg-[#FAF5F5] hover:bg-[#F2E8E9] text-secondary-se border border-[#EADCDD]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experts Directory Grid */}
      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08} variant="fade-up">
        {filteredExperts.map((exp) => (
          <div
            key={exp.id}
            className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B0F18] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {exp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1A080C]">{exp.name}</h3>
                    <p className="text-xs text-[#8C7B7F] font-semibold">{exp.role}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{exp.rating}</span>
                      <span className="text-[#8C7B7F] font-normal">({exp.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5E4A4E] leading-relaxed">
                {exp.bio}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-[#EADCDD] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8C7B7F]">Jurisdiction:</span>
                  <strong className="text-[#1A080C]">{exp.jurisdiction}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B7F]">Experience:</span>
                  <strong className="text-[#1A080C]">{exp.experienceYears} Years Licensed</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B7F]">Languages:</span>
                  <span className="text-[#5E4A4E]">{exp.languages.join(", ")}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8C7B7F] block">Accreditations:</span>
                <div className="flex flex-wrap gap-1">
                  {exp.credentials.map((c, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-[#FAF5F5] border border-[#EADCDD] text-[#1A080C] px-2 py-0.5 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EADCDD] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-700 font-semibold">{exp.availability}</span>
                <span className="badge badge-demo text-[10px]">{exp.hourlyRate}</span>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalExpert(exp)}
                className="btn btn-primary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        ))}
      </RevealGroup>

      {/* Booking Calendar Modal */}
      {bookingModalExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setBookingModalExpert(null)}
              className="absolute right-5 top-5 text-[#8C7B7F] hover:text-[#1A080C]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="badge badge-demo text-[10px] mb-1">StateEra Expert Booking</div>
              <h3 className="text-xl font-bold text-[#1A080C]">
                Schedule with {bookingModalExpert.name}
              </h3>
              <p className="text-xs text-[#5E4A4E]">{bookingModalExpert.role} &bull; {bookingModalExpert.jurisdiction}</p>
            </div>

            {bookingSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-[#1A080C]">Consultation Confirmed!</h4>
                <p className="text-xs text-[#5E4A4E]">
                  Your appointment invite and calendar link have been dispatched. Check &quot;Your Scheduled Consultations&quot; above.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Preferred Consultation Date:</label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Time Slot (GMT):</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="select w-full"
                  >
                    <option value="10:00 GMT">10:00 AM GMT (Morning Session)</option>
                    <option value="14:00 GMT">02:00 PM GMT (Afternoon Session)</option>
                    <option value="17:30 GMT">05:30 PM GMT (Evening Session)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Meeting Format:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setMeetingType("video")}
                      className={`p-2 rounded-xl border text-center font-bold ${
                        meetingType === "video" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-[#FAF5F5] text-[#5E4A4E]"
                      }`}
                    >
                      🎥 Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeetingType("phone")}
                      className={`p-2 rounded-xl border text-center font-bold ${
                        meetingType === "phone" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-[#FAF5F5] text-[#5E4A4E]"
                      }`}
                    >
                      📞 Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeetingType("in-person")}
                      className={`p-2 rounded-xl border text-center font-bold ${
                        meetingType === "in-person" ? "bg-[#3B0F18] text-white border-[#3B0F18]" : "bg-[#FAF5F5] text-[#5E4A4E]"
                      }`}
                    >
                      🏢 In-Person
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Primary Objective &amp; Case Notes:</label>
                  <textarea
                    rows={3}
                    required
                    value={meetingPurpose}
                    onChange={(e) => setMeetingPurpose(e.target.value)}
                    placeholder="Describe the property, title, or tax question you wish to discuss..."
                    className="input w-full"
                  />
                </div>

                <div className="p-3 bg-[#FAF5F5] rounded-xl border border-[#EADCDD] text-[11px] text-[#5E4A4E]">
                  Free demonstration consultation. All professional interactions are encrypted and confidential.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalExpert(null)}
                    className="btn btn-secondary text-xs font-semibold py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-xs font-bold py-2 px-5 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
