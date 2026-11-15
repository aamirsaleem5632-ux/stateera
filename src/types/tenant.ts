export interface LeaseAgreement {
  id: string;
  propertyId: string;
  propertyTitle: string;
  unitNumber: string;
  tenantName: string;
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Upcoming" | "Pending Renewal" | "Terminated";
  paymentDueDay: number; // e.g. 1st of every month
  leaseDocumentUrl?: string;
}

export interface TenantRentPayment {
  id: string;
  leaseId: string;
  propertyTitle: string;
  unitNumber: string;
  month: string;
  amount: number;
  paidDate: string;
  status: "Paid" | "Late" | "Pending";
  receiptId: string;
}

export type MaintenancePriority = "Low" | "Medium" | "High" | "Emergency";
export type MaintenanceStatus = "Reported" | "Assigned" | "In Progress" | "Completed" | "Closed";

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  unitNumber: string;
  title: string;
  category: "Plumbing" | "Electrical" | "HVAC" | "Appliance" | "Structural" | "General";
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  description: string;
  createdAt: string;
  estimatedCost: number;
  actualCost?: number;
  assignedVendor?: string;
  completionDate?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
}
