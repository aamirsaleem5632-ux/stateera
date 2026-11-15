export interface ShareHolding {
  propertyId: string;
  propertyTitle: string;
  sharesOwned: number;
  averagePurchasePrice: number;
  currentSharePrice: number;
  totalInvested: number;
  currentValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  monthlyEstimatedRentalIncome: number;
  netYield: number;
  lastPayoutAmount: number;
}

export type TransactionType = "BUY" | "SELL" | "RENT_PAYOUT" | "DEPOSIT" | "WITHDRAW";

export interface Transaction {
  id: string;
  timestamp: string;
  type: TransactionType;
  propertyId?: string;
  propertyTitle?: string;
  shares?: number;
  pricePerShare?: number;
  amount: number;
  fee?: number;
  status: "Completed" | "Pending" | "Failed";
  referenceCode: string;
}

export interface RentalPayoutRecord {
  id: string;
  payoutDate: string;
  propertyId: string;
  propertyTitle: string;
  sharesEligible: number;
  grossRentCollected: number;
  operatingExpenses: number;
  maintenanceReserve: number;
  managementFee: number;
  netDistributableRent: number;
  payoutPerShare: number;
  totalReceived: number;
  referenceId: string;
}

export interface InvestorStatement {
  id: string;
  statementPeriod: string; // e.g. "October 2026"
  generationDate: string;
  investorName: string;
  totalInvestedValue: number;
  currentPortfolioValue: number;
  totalRentalYieldEarned: number;
  capitalAppreciation: number;
  managementFeesPaid: number;
  netYieldReturnPercent: number;
  holdingsSummary: {
    propertyTitle: string;
    shares: number;
    rentalEarned: number;
    currentValue: number;
  }[];
}
