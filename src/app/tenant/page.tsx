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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", user.id)
    .single();

  if (!profile || profileError) {
    redirect("/login?error=profile_not_found&next=/tenant");
  }

  const trustedRole = profile.role;
  const isApproved = profile.role_approval_status === "Approved";

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
