export type PropertyCategory =
  | "residential"
  | "commercial"
  | "villa"
  | "waterfront"
  | "luxury"
  | "retail"
  | "office"
  | "student"
  | "hospitality"
  | "logistics"
  | "mixed-use"
  | "affordable";

export type PropertyStatus = "active" | "funded" | "coming_soon";

export type DueDiligenceStatus = "Verified" | "Pending" | "Requires Review" | "Expired" | "Missing";

export interface DueDiligenceItem {
  id: string;
  category: "Legal & Title" | "Inspection & Condition" | "Financial Audit" | "Insurance & Risk";
  title: string;
  status: DueDiligenceStatus;
  issuer: string;
  verifiedDate: string;
  expiryDate: string;
  notes: string;
  fileSize?: string;
}

export interface ValuationHistoryPoint {
  date: string;
  value: number;
  sharePrice: number;
}

export interface AiForecastPoint {
  month: string;
  low: number;
  mid: number;
  high: number;
}

export interface RentalDistributionPoint {
  month: string;
  grossCollected: number;
  expenses: number;
  netDistributed: number;
  payoutPerShare: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  city: string;
  country: string;
  address: string;
  category: PropertyCategory;
  status: PropertyStatus;
  developer: string;
  yearBuilt: number;
  totalAreaSqFt: number;
  coverImage: string;
  galleryImages: string[];
  
  // Financial & Fractional metrics
  totalValuation: number;
  sharePrice: number;
  totalShares: number;
  availableShares: number;
  fundedPercentage: number;
  
  grossYield: number; // e.g. 11.2%
  netYield: number;   // e.g. 9.4%
  occupancyRate: number; // e.g. 98%
  estimatedMonthlyRent: number; // Total monthly rent generated
  monthlyPerShareRent: number; // Rent per single share
  nextPayoutDate: string;
  
  // AI Metrics
  aiEstimatedValuation: number;
  aiValuationConfidence: number; // e.g. 94%
  marketDrivers: {
    locationDemand: number; // 0 - 100
    marketMomentum: number; // 0 - 100
    propertyCondition: number; // 0 - 100
    rentalDemand: number; // 0 - 100
  };

  // Historical data
  valuationHistory: ValuationHistoryPoint[];
  aiForecast: AiForecastPoint[];
  rentalHistory: RentalDistributionPoint[];

  // Due Diligence & Audits
  dueDiligenceScore: number; // 0 - 100
  dueDiligenceItems: DueDiligenceItem[];
  operatingExpenses: {
    propertyTaxAnnual: number;
    insuranceAnnual: number;
    maintenanceAnnual: number;
    managementFeeRate: number; // percentage, e.g. 0.08
    capitalReservesAnnual: number;
  };

  // Manager & Tenant context
  assignedManager: {
    id: string;
    name: string;
    company: string;
    rating: number;
    phone: string;
  };
  tenantMetrics: {
    totalUnits: number;
    occupiedUnits: number;
    avgLeaseMonths: number;
    onTimePaymentRate: number;
  };

  // StateEra Property Passport & Transparency
  propertyPassportId?: string;
  transparencyScore?: number; // 0 - 100
  countryCode?: string;
  lastInspectionDate?: string;
  legalReviewStatus?: "Verified" | "Approved" | "Under Review";
  isDemo?: boolean;
}
