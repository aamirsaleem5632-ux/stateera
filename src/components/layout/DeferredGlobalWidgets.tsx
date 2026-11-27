"use client";

import dynamic from "next/dynamic";

const StateEraAI = dynamic(
  () => import("@/components/ai/StateEraAI").then((m) => m.StateEraAI),
  { ssr: false }
);

const OnboardingModal = dynamic(
  () => import("@/components/onboarding/OnboardingModal").then((m) => m.OnboardingModal),
  { ssr: false }
);

const BackToTop = dynamic(
  () => import("@/components/scroll/BackToTop").then((m) => m.BackToTop),
  { ssr: false }
);

export function DeferredGlobalWidgets() {
  return (
    <>
      <StateEraAI />
      <OnboardingModal />
      <BackToTop />
    </>
  );
}
