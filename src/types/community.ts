export interface ExpertAppointment {
  id: string;
  expertName: string;
  expertRole: string;
  date: string;
  time: string;
  type: "Video Consultation" | "Phone Call" | "In-Person Meeting";
  status: "Confirmed" | "Completed" | "Cancelled";
  purpose: string;
  createdAt?: string;
}

export interface CommunityProposal {
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
  createdAt?: string;
}
