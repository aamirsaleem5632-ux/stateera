import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TenantPortalView } from "@/components/portal/TenantPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resident Tenant Portal | StateEra",
  description: "Production resident leaseholder dashboard, rent payments, and maintenance requests.",
};

export default async function TenantPortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?error=session_required&next=/tenant");
  }

  let profile: { role: string; role_approval_status?: string | null } | null = null;
  let isSchemaError = false;

  const { data, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", user.id)
    .single();

  if (!profileError && data) {
    profile = data as { role: string; role_approval_status?: string | null };
  } else if (profileError) {
    const errCode = profileError.code || "";
    const errMsg = (profileError.message || "").toLowerCase();
    const errDetails = (profileError.details || "").toLowerCase();

    if (
      errCode === "PGRST204" ||
      errCode === "42703" ||
      errMsg.includes("role_approval_status") ||
      errDetails.includes("role_approval_status") ||
      (errMsg.includes("column") && errMsg.includes("does not exist"))
    ) {
      isSchemaError = true;
    } else if (errCode === "PGRST116") {
      profile = null;
    } else {
      const { data: baseProfile, error: baseError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!baseError && baseProfile) {
        isSchemaError = true;
      } else if (baseError && baseError.code === "PGRST116") {
        profile = null;
      } else {
        isSchemaError = true;
      }
    }
  }

  if (isSchemaError) {
    redirect("/login?error=schema_upgrade_pending&next=/tenant");
  }

  if (!profile) {
    redirect("/login?error=profile_not_found&next=/tenant");
  }

  const trustedRole = profile.role;
  const isApproved = (profile.role_approval_status || "").toLowerCase() === "approved";

  if (trustedRole === "admin" && isApproved) {
    // Super-admin permitted cross-access
  } else if (trustedRole === "tenant") {
    if (!isApproved) {
      redirect("/login?error=tenant_unapproved&next=/tenant");
    }
  } else {
    redirect("/login?error=tenant_unauthorized&next=/tenant");
  }

  return <TenantPortalView isDemo={false} />;
}
