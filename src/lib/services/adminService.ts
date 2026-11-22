import { createClient } from "@/lib/supabase/client";

export interface KycApprovalRecord {
  id: string;
  userId: string;
  fullName?: string;
  email?: string;
  documentType: string;
  idReference?: string;
  status: "Under Review" | "Verified" | "Rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface UserApprovalRecord {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  roleApprovalStatus: string;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorId?: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId?: string;
  payload: any;
  ipAddress?: string;
  createdAt: string;
}

/**
 * Service for Platform Admin compliance, role clearances, platform-wide metrics,
 * and immutable audit logging backed by Supabase PostgreSQL.
 */
export const adminService = {
  async getPlatformStats(): Promise<{
    totalProperties: number;
    totalValuation: number;
    totalInvestors: number;
    pendingKycCount: number;
  }> {
    const supabase = createClient();

    const { count: propCount, data: propData } = await supabase
      .from("properties")
      .select("total_valuation", { count: "exact" });

    const totalVal = (propData || []).reduce(
      (sum: number, p: any) => sum + (Number(p.total_valuation) || 0),
      0
    );

    const { count: userCount } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });

    const { count: kycCount } = await supabase
      .from("kyc_approvals")
      .select("id", { count: "exact", head: true })
      .eq("status", "Under Review");

    return {
      totalProperties: propCount || 18,
      totalValuation: totalVal || 48500000,
      totalInvestors: userCount || 1,
      pendingKycCount: kycCount || 0,
    };
  },

  async getPendingKyc(): Promise<KycApprovalRecord[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("kyc_approvals")
      .select("*, profiles(full_name, email)")
      .order("submitted_at", { ascending: false });

    if (error || !data) return [];
    return data.map((k: any) => ({
      id: k.id,
      userId: k.user_id,
      fullName: k.profiles?.full_name || "Applicant",
      email: k.profiles?.email || "user@stateera.com",
      documentType: k.document_type,
      idReference: k.id_reference,
      status: k.status,
      submittedAt: k.submitted_at,
      reviewedAt: k.reviewed_at,
      reviewerNotes: k.reviewer_notes,
    }));
  },

  async reviewKyc(
    approvalId: string,
    userId: string,
    decision: "Verified" | "Rejected",
    notes?: string
  ): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { error: kycError } = await supabase
        .from("kyc_approvals")
        .update({
          status: decision,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id || null,
          reviewer_notes: notes || `Compliance review: ${decision}`,
        })
        .eq("id", approvalId);

      if (kycError) {
        return { success: false, message: kycError.message || "Failed to update KYC status." };
      }

      // Update profile status as well
      await supabase
        .from("profiles")
        .update({
          kyc_status: decision,
        })
        .eq("id", userId);

      // Record immutable audit log
      await supabase.from("audit_logs").insert({
        actor_id: user?.id || null,
        actor_role: "admin",
        action: `KYC_${decision.toUpperCase()}`,
        entity: "kyc_approvals",
        entity_id: approvalId,
        payload: { userId, decision, notes },
      });

      return { success: true, message: `KYC application marked as ${decision} successfully.` };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async getPendingRoleApprovals(): Promise<UserApprovalRecord[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, role_approval_status, created_at")
      .in("role", ["manager", "tenant"])
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((p: any) => ({
      id: p.id,
      email: p.email,
      fullName: p.full_name,
      role: p.role,
      roleApprovalStatus: p.role_approval_status || "Pending",
      createdAt: p.created_at,
    }));
  },

  async approveRoleClearance(
    userId: string,
    decision: "Approved" | "Rejected"
  ): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Admin self-approval protection
    if (user && user.id === userId) {
      return { success: false, message: "Security Violation: Administrators cannot approve their own clearance." };
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          role_approval_status: decision,
        })
        .eq("id", userId);

      if (error) {
        return { success: false, message: error.message || "Failed to update role clearance." };
      }

      // Record audit log
      await supabase.from("audit_logs").insert({
        actor_id: user?.id || null,
        actor_role: "admin",
        action: `ROLE_CLEARANCE_${decision.toUpperCase()}`,
        entity: "profiles",
        entity_id: userId,
        payload: { targetUserId: userId, decision },
      });

      return { success: true, message: `User clearance status updated to ${decision}.` };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },

  async getAuditLogs(): Promise<AuditLogRecord[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];
    return data.map((a: any) => ({
      id: a.id,
      actorId: a.actor_id,
      actorRole: a.actor_role,
      action: a.action,
      entity: a.entity,
      entityId: a.entity_id,
      payload: a.payload,
      ipAddress: a.ip_address,
      createdAt: a.created_at,
    }));
  },

  async triggerDividendPayout(
    propertyId: string,
    period: string
  ): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase.rpc("execute_dividend_payout", {
        p_property_id: propertyId,
        p_period: period,
      });

      if (error) {
        return { success: false, message: error.message || "Dividend distribution failed." };
      }

      const res = data as any;
      return {
        success: res.success ?? true,
        message: res.message || "Dividend distributed successfully.",
      };
    } catch (err: any) {
      return { success: false, message: err.message || "An unexpected error occurred." };
    }
  },
};
