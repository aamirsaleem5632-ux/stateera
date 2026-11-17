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
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { InfoTooltip } from "@/components/common/InfoTooltip";
import Link from "next/link";

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
          <span className="badge badge-success">Owner Voting &amp; Decisions</span>
          <span className="text-xs text-muted-se">SIMULATED RECORDS</span>
        </div>
        <h1 className="text-3xl font-black text-[#1A080C] tracking-tight">
          Owner Updates &amp; Big Decisions
        </h1>
        <p className="text-xs sm:text-sm text-secondary-se">
          As a part-owner of buildings, you get a vote on big decisions like solar panel upgrades and building manager contracts.
        </p>
      </div>

      {/* Friendly Next Step Hint */}
      <div className="glass rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-secondary-se">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">💡</span>
          <span>
            <strong className="text-[#1A080C]">How voting works:</strong> 1 share = 1 vote. If you own 10 shares, your vote counts as 10 votes. Click <strong className="text-[#1A080C]">&ldquo;Vote YES&rdquo;</strong> or <strong className="text-[#1A080C]">&ldquo;Vote NO&rdquo;</strong> below to test.
          </span>
        </div>
        <Link
          href="/glossary"
          className="text-[11px] font-semibold text-accent-se hover:underline whitespace-nowrap flex items-center gap-1"
        >
          <span>See Simple Terms Guide</span>
          <ArrowRight className="w-3 h-3 rtl-flip" />
        </Link>
      </div>

      {feedback && (
        <div className="toast-glass p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm border border-emerald-200 bg-emerald-50 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Shareholder Voting Proposals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-bold text-[#1A080C]">Decisions That Need Your Vote</h2>
            <InfoTooltip termId="governance" size="sm" />
          </div>
          <span className="text-xs text-muted-se">Weighted by how many shares you own</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposals.map((prop) => {
            const totalCasted = prop.votesYes + prop.votesNo;
            const yesPercent = totalCasted > 0 ? (prop.votesYes / totalCasted) * 100 : 0;

            return (
              <div
                key={prop.id}
                className="glass rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#3B0F18] bg-[#FAF5F5] border border-[#EADCDD] px-2.5 py-0.5 rounded-full">
                      {prop.category}
                    </span>
                    <span className="text-muted-se flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Deadline: {prop.deadline}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-muted-se block font-semibold">{prop.propertyTitle}</span>
                    <h3 className="font-bold text-base text-[#1A080C] mt-0.5">{prop.title}</h3>
                  </div>

                  <p className="text-xs text-secondary-se leading-relaxed">{prop.description}</p>
                </div>

                {/* Voting Progress */}
                <div className="space-y-3 pt-3 border-t border-[#EADCDD]">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-emerald-700">Yes: {yesPercent.toFixed(1)}% ({prop.votesYes.toLocaleString()} shares)</span>
                      <span className="font-bold text-red-700">No: {(100 - yesPercent).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-red-100 h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-600 h-full transition-all" style={{ width: `${yesPercent}%` }} />
                      <div className="bg-red-500 h-full transition-all" style={{ width: `${100 - yesPercent}%` }} />
                    </div>
                  </div>

                  {/* Actions */}
                  {prop.userVote ? (
                    <div className="bg-[#FAF5F5] rounded-xl text-xs font-bold text-[#3B0F18] text-center p-2.5 border border-[#EADCDD]">
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
                        className="btn btn-danger py-2.5 text-xs flex items-center justify-center gap-1.5"
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
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADCDD]">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#1A080C]">List of Building Owners &amp; Shares</h3>
              <InfoTooltip termId="owners-list" size="sm" />
            </div>
            <p className="text-xs text-secondary-se">Shows how parts (shares) of each building are divided between investors:</p>
          </div>
          <span className="badge badge-success">Digital Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table-glass w-full text-left text-xs">
            <thead>
              <tr>
                <th>Building Name</th>
                <th>Total Shares</th>
                <th>Big Investors</th>
                <th>Community Members</th>
                <th className="text-right">Shares Left to Buy</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="font-bold text-[#1A080C]">{p.title}</td>
                  <td className="text-secondary-se">{p.totalShares.toLocaleString()} shares</td>
                  <td className="font-semibold text-[#1A080C]">{Math.round(p.totalShares * 0.4).toLocaleString()} shares (40%)</td>
                  <td className="font-semibold text-accent-se">{Math.round(p.totalShares * 0.6).toLocaleString()} shares (60%)</td>
                  <td className="text-right font-black text-emerald-700">{(100 - p.fundedPercentage).toFixed(1)}% Available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
