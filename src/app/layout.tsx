import type { Metadata } from "next";
import "./globals.css";
import "./stateera-theme.css";
import { BRAND_CONFIG } from "@/config/brand";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoProvider } from "@/context/DemoContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StateEraAI } from "@/components/ai/StateEraAI";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { ScrollProgressBar } from "@/components/scroll/ScrollProgressBar";
import { BackToTop } from "@/components/scroll/BackToTop";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — Fractional Real Estate & Rental Yield Investment Platform`,
  description: BRAND_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-[var(--se-text)] bg-[var(--se-bg)] font-sans antialiased">
        <LanguageProvider>
          <DemoProvider>
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1 overflow-x-hidden relative">{children}</main>
            <Footer />

            <StateEraAI />
            <OnboardingModal />
            <BackToTop />
          </DemoProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
