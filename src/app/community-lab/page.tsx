"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  ThumbsUp,
  MessageSquare,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/scroll/Reveal";

interface Proposal {
  id: string;
  title: string;
  city: string;
  country: string;
  category: string;
  estimatedCost: string;
  author: string;
  votes: number;
  hasVoted: boolean;
  status: "Feasibility Study" | "Community Voting" | "Under Review" | "Due Diligence";
  rationale: string;
  commentsCount: number;
}

export default function CommunityPropertyLabPage() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "prop-lab-01",
      title: "Solar-Powered Student Housing Hub near NUST",
      city: "Islamabad",
      country: "Pakistan",
      category: "student",
      estimatedCost: "$1.8M",
      author: "Farhan Qureshi (Community Member)",
      votes: 184,
      hasVoted: false,
      status: "Feasibility Study",
      rationale: "Over 8,000 university students struggle to find safe, high-speed fiber-equipped student accommodation near Sector H-12. A purpose-built student block with rooftop solar can deliver steady 10%+ net rental yield.",
      commentsCount: 38,
    },
    {
      id: "prop-lab-02",
      title: "Biophilic Co-Living & Creative Studios in Shoreditch",
      city: "London",
      country: "United Kingdom",
      category: "residential",
      estimatedCost: "$4.5M",
      author: "Elena Rostova (Investor Circle)",
      votes: 142,
      hasVoted: false,
      status: "Due Diligence",
      rationale: "High demand from European tech founders and creative designers for flexible 3-to-12 month serviced suites with communal podcast studios and garden terraces.",
      commentsCount: 29,
    },
    {
      id: "prop-lab-03",
      title: "Cold-Chain Logistics Terminal for Mango & Citrus Exports",
      city: "Multan",
      country: "Pakistan",
      category: "logistics",
      estimatedCost: "$2.6M",
      author: "Malik Shahzad (Agri-Logistics)",
      votes: 119,
      hasVoted: false,
      status: "Community Voting",
      rationale: "Export agricultural processors in Southern Punjab face 25% post-harvest spoilage. A climate-controlled cold storage warehouse along M-4 Motorway guarantees year-round long-term corporate leases.",
      commentsCount: 22,
    },
    {
      id: "prop-lab-04",
      title: "Affordable Healthcare Professional Housing near Dubai Healthcare City",
      city: "Dubai",
      country: "United Arab Emirates",
      category: "affordable",
      estimatedCost: "$3.9M",
      author: "Dr. Ayesha Rehman",
      votes: 95,
      hasVoted: false,
      status: "Under Review",
      rationale: "Mid-level nursing and healthcare technicians commute 90 minutes daily. Developing dedicated affordable community apartments creates immediate 100% occupancy with long-term hospital leases.",
      commentsCount: 17,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("Pakistan");
  const [newCategory, setNewCategory] = useState("residential");
  const [newEstimatedCost, setNewEstimatedCost] = useState("");
  const [newRationale, setNewRationale] = useState("");

  const handleVote = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            votes: p.hasVoted ? p.votes - 1 : p.votes + 1,
            hasVoted: !p.hasVoted,
          };
        }
        return p;
      })
    );
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Proposal = {
      id: `prop-lab-${Date.now()}`,
      title: newTitle,
      city: newCity,
      country: newCountry,
      category: newCategory,
      estimatedCost: newEstimatedCost || "$2.0M",
      author: "You (Active Contributor)",
      votes: 1,
      hasVoted: true,
      status: "Under Review",
      rationale: newRationale,
      commentsCount: 0,
    };
    setProposals([created, ...proposals]);
    setModalOpen(false);
    setNewTitle("");
    setNewCity("");
    setNewRationale("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="badge badge-demo inline-flex items-center gap-1.5 mb-2">
          <Users className="w-3.5 h-3.5 text-[#3B0F18]" />
          <span>Democratized Asset Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A080C] tracking-tight">
          Community Property Lab
        </h1>
        <p className="text-base sm:text-lg text-[#5E4A4E] leading-relaxed">
          Propose unserved local housing demands, vote on emerging real estate concepts, and collaborate with institutional surveyors before an asset is acquired.
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#FAF5F5] border border-[#EADCDD] rounded-3xl">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#1A080C]">Have a compelling property concept?</h3>
          <p className="text-xs text-[#5E4A4E]">Submit an idea for community review and independent feasibility study.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Property Proposal</span>
        </button>
      </div>

      {/* Proposals Grid */}
      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08} variant="fade-up">
        {proposals.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  item.status === "Feasibility Study" ? "bg-blue-50 text-blue-800 border border-blue-200" :
                  item.status === "Due Diligence" ? "bg-purple-50 text-purple-800 border border-purple-200" :
                  item.status === "Community Voting" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                  "bg-amber-50 text-amber-800 border border-amber-200"
                }`}>
                  {item.status}
                </span>
                <span className="text-xs font-bold text-[#3B0F18]">Target: {item.estimatedCost}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1A080C] leading-snug">
                {item.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-[#8C7B7F]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#3B0F18]" />
                  {item.city}, {item.country}
                </span>
                <span>&bull;</span>
                <span className="capitalize">{item.category}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4A4E] leading-relaxed pt-1">
                {item.rationale}
              </p>

              <div className="text-[11px] text-[#8C7B7F] pt-2 border-t border-[#EADCDD]">
                Proposed by <strong className="text-[#1A080C]">{item.author}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EADCDD] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleVote(item.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  item.hasVoted
                    ? "bg-[#3B0F18] text-white border-[#3B0F18]"
                    : "bg-[#FAF5F5] text-[#1A080C] border-[#EADCDD] hover:bg-[#F2E8E9]"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{item.hasVoted ? "Upvoted" : "Upvote"} ({item.votes})</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Discussion feed for "${item.title}" opened. ${item.commentsCount} community insights submitted.`)}
                className="text-xs font-semibold text-[#5E4A4E] hover:text-[#1A080C] flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{item.commentsCount} Comments</span>
              </button>
            </div>
          </div>
        ))}
      </RevealGroup>

      {/* Strict Legal Due Diligence Notice */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block">Important Governance &amp; Diligence Boundary:</strong>
          <p className="leading-relaxed">
            Community upvoting and idea submissions serve solely as market discovery and demand intelligence. Community approval does NOT automatically approve an investment or replace independent structural, legal, and financial due diligence.
          </p>
        </div>
      </div>

      {/* Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white border border-[#EADCDD] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative">
            <h3 className="text-xl font-bold text-[#1A080C]">Submit Community Property Idea</h3>
            <p className="text-xs text-[#5E4A4E]">
              Share an unserved real estate opportunity with the StateEra research community.
            </p>

            <form onSubmit={handleCreateProposal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Concept Title:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Eco-Friendly Student Village near King Saud University"
                  className="input w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">City:</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="e.g. Riyadh"
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Country:</label>
                  <input
                    type="text"
                    required
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="e.g. Saudi Arabia"
                    className="input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="select w-full"
                  >
                    <option value="residential">Residential</option>
                    <option value="student">Student Housing</option>
                    <option value="commercial">Commercial Office</option>
                    <option value="logistics">Logistics Hub</option>
                    <option value="affordable">Affordable Housing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1A080C] mb-1">Est. Target Cost:</label>
                  <input
                    type="text"
                    value={newEstimatedCost}
                    onChange={(e) => setNewEstimatedCost(e.target.value)}
                    placeholder="e.g. $3.2M"
                    className="input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A080C] mb-1">Community Demand &amp; Economic Rationale:</label>
                <textarea
                  rows={4}
                  required
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  placeholder="Explain why this area needs this property, expected occupancy, and tenant demographic..."
                  className="input w-full"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary text-xs font-semibold py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs font-bold py-2 px-5"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
