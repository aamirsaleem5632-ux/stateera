import type { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_CONFIG.name} — Fractional Real Estate & Rental Yield`,
    short_name: BRAND_CONFIG.name,
    description: BRAND_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5F5",
    theme_color: "#3B0F18",
    orientation: "portrait-primary",
    categories: ["finance", "education", "business"],
    icons: [
      {
        src: "/skyline-logo-dark.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/skyline-logo-dark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/skyline-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
