import { AdminPortalView } from "@/components/portal/AdminPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo: Admin & Compliance Portal | StateEra",
  description: "Explore StateEra platform management, KYC approvals, and property due diligence in an isolated sandbox.",
};

export default function DemoAdminPage() {
  return <AdminPortalView isDemo={true} />;
}
