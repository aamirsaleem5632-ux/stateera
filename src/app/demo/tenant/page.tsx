import { TenantPortalView } from "@/components/portal/TenantPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo: Resident Tenant Portal | StateEra",
  description: "Experience tenant leasing tools, rent payments, and maintenance dispatch tickets in an isolated sandbox.",
};

export default function DemoTenantPage() {
  return <TenantPortalView isDemo={true} />;
}
