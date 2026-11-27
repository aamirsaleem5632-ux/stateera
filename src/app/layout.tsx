import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./stateera-theme.css";
import { BRAND_CONFIG } from "@/config/brand";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoProvider } from "@/context/DemoContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DeferredGlobalWidgets } from "@/components/layout/DeferredGlobalWidgets";
import { ScrollProgressBar } from "@/components/scroll/ScrollProgressBar";
import { PWARegister } from "@/components/common/PWARegister";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — Fractional Real Estate & Rental Yield Investment Platform`,
  description: BRAND_CONFIG.description,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND_CONFIG.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#3B0F18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col text-[var(--se-text)] bg-[var(--se-bg)] font-sans antialiased">
        <LanguageProvider>
          <DemoProvider>
            <PWARegister />
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1 overflow-x-hidden relative">{children}</main>
            <Footer />
            <DeferredGlobalWidgets />
          </DemoProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
