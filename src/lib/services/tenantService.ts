import { createClient } from "@/lib/supabase/client";

export interface ActiveLeaseRecord {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress?: string;
  unitNumber: string;
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  paymentDueDay: number;
  status: "Active" | "Pending Renewal" | "Terminated" | "Defaulted";
}

export interface TenantRentRecord {
  id: string;
  leaseId: string;
  propertyTitle: string;
  unitNumber: string;
  month: string;
  amount: number;
  paidDate: string;
  status: "Pending" | "Paid" | "Failed" | "Refunded";
  receiptId: string;
}

export interface TenantMaintenanceRecord {
  id: string;
  propertyId: string;
  unitNumber: string;
  title: string;
  category: "Plumbing" | "HVAC" | "Electrical" | "Appliance" | "Structural" | "Other";
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Pending" | "Assigned" | "In Progress" | "Completed" | "Cancelled";
  description: string;
  createdAt: string;
}

/**
 * Service for authenticated Tenant operations backed by Supabase PostgreSQL.
 * Strict database scoping: tenants strictly access their own unit's lease and maintenance.
 */
export const tenantService = {
  async getActiveLease(): Promise<ActiveLeaseRecord | null> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("leases")
      .select("*, properties(title, address)")
      .eq("tenant_id", user.id)
      .eq("status", "Active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return {
      id: data.id,
      propertyId: data.property_id,
      propertyTitle: data.properties?.title || "Residential Tower",
      propertyAddress: data.properties?.address,
      unitNumber: data.unit_number,
      monthlyRent: Number(data.monthly_rent) || 0,
      securityDeposit: Number(data.security_deposit) || 0,
      startDate: data.start_date,
      endDate: data.end_date,
      paymentDueDay: data.payment_due_day || 1,
      status: data.status,
    };
  },

  async getRentPayments(): Promise<TenantRentRecord[]> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("rent_payments")
      .select("*, properties(title), leases(unit_number)")
      .eq("tenant_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      leaseId: r.lease_id,
      propertyTitle: r.properties?.title || "Leased Property",
      unitNumber: r.leases?.unit_number || "Unit",
      month: r.month,
      amount: Number(r.amount) || 0,
      paidDate: r.paid_date,
      status: r.status,
      receiptId: r.receipt_id,
    }));
  },

  async getMaintenanceRequests(): Promise<TenantMaintenanceRecord[]> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("maintenance_requests")
      .select("*")
      .eq("tenant_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((m: any) => ({
      id: m.id,
      propertyId: m.property_id,
      unitNumber: m.unit_number,
      title: m.title,
      category: m.category,
      priority: m.priority,
      status: m.status,
      description: m.description,
      createdAt: m.created_at,
    }));
  },

  async submitMaintenance(params: {
    propertyId: string;
    unitNumber: string;
    title: string;
    category: TenantMaintenanceRecord["category"];
    priority: TenantMaintenanceRecord["priority"];
    description: string;
  }): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Authentication required." };

    try {
      const { error } = await supabase.from("maintenance_requests").insert({
        property_id: params.propertyId,
        unit_number: params.unitNumber,
        tenant_id: user.id,
        title: params.title,
        category: params.category,
        priority: params.priority,
        description: params.description,
        status: "Pending",
      });

      if (error) {
        return { success: false, message: error.message || "Failed to submit maintenance request." };
      }

      return {
        success: true,
        message: "Maintenance request submitted to building management successfully!",
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async payRent(params: {
    leaseId: string;
    propertyId: string;
    amount: number;
    month: string;
  }): Promise<{ success: boolean; message: string; receiptId?: string }> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Authentication required." };

    try {
      const receiptId = "REC-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
      const txRef = "TX-RENT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      const { error } = await supabase.from("rent_payments").insert({
        lease_id: params.leaseId,
        tenant_id: user.id,
        property_id: params.propertyId,
        amount: params.amount,
        month: params.month,
        status: "Paid",
        receipt_id: receiptId,
        transaction_ref: txRef,
      });

      if (error) {
        return { success: false, message: error.message || "Failed to record rent payment." };
      }

      return {
        success: true,
        message: `Rent payment of $${params.amount.toLocaleString()} confirmed for ${params.month}!`,
        receiptId,
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },
};
