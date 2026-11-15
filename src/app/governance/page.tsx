"use client";

import React, { useState } from "react";
import {
  Vote,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Proposal {
  id: string;
  propertyTitle: string;
  title: string;
  description: string;
  category: "Capital Expenditure" | "Management Contract" | "Dividend Strategy" | "Refurbishment";
  votesYes: number;
  votesNo: number;
  totalVotesNeeded: number;
  deadline: string;
  status: "Active" | "Passed" | "Rejected";
  userVote?: "YES" | "NO";
}

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: "prop-vote-01",
    propertyTitle: "Marina Horizon Luxury Tower",
    title: "Installation of Rooftop Solar Microgrid & Energy Storage",
    description: "Proposal to allocate $45,000 from capital reserves to install solar PV panels, reducing building utility expenses by an estimated 28% annually and enhancing ESG score.",
    category: "Capital Expenditure",
    votesYes: 48200,
    votesNo: 3400,
    totalVotesNeeded: 65000,
    deadline: "2026-12-15",
    status: "Active",
  },
  {
    id: "prop-vote-02",
    propertyTitle: "One Madison Glass Penthouse Suites",
    title: "Renewal of Savills Master Property Management Contract (2 Years)",
    description: "Approval to renew Savills asset management covenant at a negotiated 7.0% management fee (down from 8.0%), saving $12,240 in annual operational expenses.",
    category: "Management Contract",
    votesYes: 72100,
    votesNo: 1200,
    totalVotesNeeded: 80000,
    deadline: "2026-12-20",
    status: "Active",
  },
];

export default function GovernancePage() {
  const { properties, holdings } = useDemo();
  const { t, dir } = useLanguage();

  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleVote = (proposalId: string, choice: "YES" | "NO") => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const userHolding = holdings.find((h) => h.propertyTitle === p.propertyTitle);
          const voteWeight = userHolding ? userHolding.sharesOwned : 25;

          return {
            ...p,
            userVote: choice,
            votesYes: choice === "YES" ? p.votesYes + voteWeight : p.votesYes,
            votesNo: choice === "NO" ? p.votesNo + voteWeight : p.votesNo,
          };
        }
        return p;
      })
    );

    setFeedback(`Your vote of ${choice} has been successfully recorded in the decentralized shareholder register!`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" dir={dir}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
            Shareholder Governance
          </span>
          <span className="text-xs text-[#8782A3]">SIMULATED REGISTRY</span>
        </div>
        <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
          Ownership & Governance Centre
        </h1>
        <p className="text-xs sm:text-sm text-[#585375]">
          Exercise shareholder voting rights, inspect ownership allocations, and review asset management resolutions.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-mint border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Shareholder Voting Proposals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E1B4B]">Active Shareholder Resolutions</h2>
          <span className="text-xs text-[#8782A3]">Weighted by fractional share count</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposals.map((prop) => {
            const totalCasted = prop.votesYes + prop.votesNo;
            const yesPercent = totalCasted > 0 ? (prop.votesYes / totalCasted) * 100 : 0;

            return (
              <div
                key={prop.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6D8F5] shadow-subtle space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#7C4DFF] bg-[#F3EAFC] px-2.5 py-1 rounded-full">
                      {prop.category}
                    </span>
                    <span className="text-[#8782A3] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Deadline: {prop.deadline}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-[#8782A3] block font-semibold">{prop.propertyTitle}</span>
                    <h3 className="font-bold text-base text-[#1E1B4B] mt-0.5">{prop.title}</h3>
                  </div>

                  <p className="text-xs text-[#585375] leading-relaxed">{prop.description}</p>
                </div>

                {/* Voting Progress */}
                <div className="space-y-3 pt-3 border-t border-[#F3EAFC]">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-emerald-700">Yes: {yesPercent.toFixed(1)}% ({prop.votesYes.toLocaleString()} shares)</span>
                      <span className="font-bold text-red-500">No: {(100 - yesPercent).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-red-100 h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full transition-all" style={{ width: `${yesPercent}%` }} />
                      <div className="bg-red-400 h-full transition-all" style={{ width: `${100 - yesPercent}%` }} />
                    </div>
                  </div>

                  {/* Actions */}
                  {prop.userVote ? (
                    <div className="p-2.5 bg-[#F8F4FD] rounded-xl text-xs font-bold text-[#7C4DFF] text-center border border-[#E6D8F5]">
                      ✓ You voted {prop.userVote} on this resolution
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleVote(prop.id, "YES")}
                        className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Vote YES</span>
                      </button>
                      <button
                        onClick={() => handleVote(prop.id, "NO")}
                        className="py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>Vote NO</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Property Shareholder Registry Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D8F5] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EAFC]">
          <div>
            <h3 className="font-bold text-base text-[#1E1B4B]">Ownership Share Allocation Register</h3>
            <p className="text-xs text-[#585375]">Simulated cap-table and equity distributions:</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-mint text-emerald-900">
            Immutable Registry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6D8F5] text-[#8782A3] uppercase text-[10px]">
                <th className="pb-3">Property Name</th>
                <th className="pb-3">Total Shares</th>
                <th className="pb-3">Institutional Shares</th>
                <th className="pb-3">Retail Community Shares</th>
                <th className="pb-3 text-right">Free Float %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EAFC]">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8F4FD] transition-colors">
                  <td className="py-3 font-bold text-[#1E1B4B]">{p.title}</td>
                  <td className="py-3 text-[#585375]">{p.totalShares.toLocaleString()} shares</td>
                  <td className="py-3 font-semibold text-[#1E1B4B]">{Math.round(p.totalShares * 0.4).toLocaleString()} shares (40%)</td>
                  <td className="py-3 font-semibold text-[#7C4DFF]">{Math.round(p.totalShares * 0.6).toLocaleString()} shares (60%)</td>
                  <td className="py-3 text-right font-black text-emerald-600">{(100 - p.fundedPercentage).toFixed(1)}% Available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
