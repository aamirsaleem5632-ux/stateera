import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminPortalView } from "@/components/portal/AdminPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin & KYC Compliance | StateEra",
  description: "Production platform administration, KYC verification, and due diligence approvals.",
};

export default async function AdminPortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?error=session_required&next=/admin");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", user.id)
    .single();

  if (!profile || profileError) {
    redirect("/login?error=profile_not_found&next=/admin");
  }

  if (profile.role !== "admin" || profile.role_approval_status !== "Approved") {
    redirect("/login?error=admin_unauthorized&next=/admin");
  }

  return <AdminPortalView isDemo={false} />;
}
