import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ManagerPortalView } from "@/components/portal/ManagerPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Manager Portal | StateEra",
  description: "Production property manager operations, rent collections, and work orders.",
};

export default async function PropertyManagerPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?error=session_required&next=/manager");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, role_approval_status")
    .eq("id", user.id)
    .single();

  if (!profile || profileError) {
    redirect("/login?error=profile_not_found&next=/manager");
  }

  const trustedRole = profile.role;
  const isApproved = profile.role_approval_status === "Approved";

  if (trustedRole === "admin" && isApproved) {
    // Super-admin permitted cross-access
  } else if (trustedRole === "manager") {
    if (!isApproved) {
      redirect("/login?error=manager_unapproved&next=/manager");
    }
  } else {
    redirect("/login?error=manager_unauthorized&next=/manager");
  }

  return <ManagerPortalView isDemo={false} />;
}
