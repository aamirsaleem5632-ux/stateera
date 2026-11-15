import type { Metadata } from "next";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoProvider } from "@/context/DemoContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { StateEraAI } from "@/components/ai/StateEraAI";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

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
      <body className="min-h-screen flex flex-col bg-[#F8F4FD] text-[#1E1B4B]">
        <LanguageProvider>
          <DemoProvider>
            <Navbar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <Footer />
            <BottomNav />
            <StateEraAI />
            <OnboardingModal />
          </DemoProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
