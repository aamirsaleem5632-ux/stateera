import { ManagerPortalView } from "@/components/portal/ManagerPortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo: Property Manager Portal | StateEra",
  description: "Experience property management workflows, rent collection logging, and maintenance work order tracking in an isolated sandbox.",
};

export default function DemoManagerPage() {
  return <ManagerPortalView isDemo={true} />;
}
