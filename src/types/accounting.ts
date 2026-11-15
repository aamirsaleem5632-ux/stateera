export interface PropertyFinancialStatement {
  propertyId: string;
  propertyTitle: string;
  period: string; // e.g. "Q3 2026" or "October 2026"
  grossRentalIncome: number;
  uncollectedRent: number;
  effectiveGrossIncome: number;
  operatingExpenses: {
    propertyManagement: number;
    repairsAndMaintenance: number;
    propertyInsurance: number;
    propertyTaxes: number;
    utilities: number;
    legalAndAccounting: number;
    capitalReserves: number;
  };
  totalOperatingExpenses: number;
  netOperatingIncome: number; // NOI = Effective Gross Income - Operating Expenses
  operatingExpenseRatio: number; // Expenses / Income
  debtService: number; // 0 for all-equity fractional assets
  netCashFlow: number;
  investorDistributions: number;
  retainedEarnings: number;
  reconciliationStatus: "Reconciled" | "Pending Review" | "Variance Detected";
}

export interface AccountingLedgerEntry {
  id: string;
  date: string;
  propertyTitle: string;
  category: "Rent Revenue" | "Maintenance" | "Management Fee" | "Insurance" | "Tax" | "Utilities" | "Reserve Allocation";
  description: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  vendorOrTenant: string;
  reconciled: boolean;
  referenceNo: string;
}
