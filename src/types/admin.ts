export type UserRole = "investor" | "manager" | "tenant" | "admin";

export type KycStatus = "Verified" | "Under Review" | "Documents Required" | "Rejected";

export interface InvestorUser {
  id: string;
  fullName: string;
  email: string;
  country: string;
  kycStatus: KycStatus;
  tier: "Standard" | "Premium" | "Institutional";
  portfolioValue: number;
  totalSharesOwned: number;
  joinedDate: string;
}

export interface PropertyApprovalQueueItem {
  id: string;
  propertyTitle: string;
  city: string;
  developer: string;
  proposedValuation: number;
  projectedNetYield: number;
  submissionDate: string;
  complianceReviewStatus: "Approved" | "In Review" | "Additional Documents Needed";
  managerName: string;
}

export interface PlatformAuditLog {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  entityType: "PROPERTY" | "TRANSACTION" | "KYC" | "PAYOUT" | "LEASE" | "SETTING";
  details: string;
  ipAddress: string;
}
