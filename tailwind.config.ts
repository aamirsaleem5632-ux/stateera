import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean White Editorial Theme Tokens mapped to CSS variables
        se: {
          bg: "var(--se-bg)",
          "bg-deep": "var(--se-bg-deep)",
          "bg-soft": "var(--se-bg-soft)",
          primary: "var(--se-primary)",
          "primary-hover": "var(--se-primary-hover)",
          "primary-active": "var(--se-primary-active)",
          glass: "var(--se-glass)",
          "glass-strong": "var(--se-glass-strong)",
          "glass-rose": "var(--se-glass-rose)",
          "glass-border": "var(--se-glass-border)",
          text: "var(--se-text)",
          "text-2": "var(--se-text-2)",
          "text-muted": "var(--se-text-muted)",
          success: "var(--se-success)",
          warning: "var(--se-warning)",
          error: "var(--se-error)",
          info: "var(--se-info)",
        },
        rose: {
          500: "var(--se-rose-500)",
          400: "var(--se-rose-400)",
          300: "var(--se-rose-300)",
          200: "var(--se-rose-200)",
        },
        // Mapped legacy tokens to dark rose glass theme tokens
        lavender: {
          light: "var(--se-glass)",
          DEFAULT: "var(--se-glass-border)",
          dark: "var(--se-glass-border-soft)",
        },
        blush: {
          light: "var(--se-glass-rose)",
          DEFAULT: "var(--se-rose-400)",
          dark: "var(--se-rose-500)",
        },
        mint: {
          light: "rgba(134, 239, 172, 0.12)",
          DEFAULT: "var(--se-success)",
          dark: "#4ade80",
        },
        sky: {
          light: "rgba(147, 197, 253, 0.12)",
          DEFAULT: "var(--se-info)",
          dark: "#60a5fa",
        },
        brand: {
          purple: "var(--se-primary)",
          indigo: "var(--se-rose-500)",
          hover: "var(--se-primary-hover)",
          active: "var(--se-primary-active)",
          light: "var(--se-rose-200)",
          DEFAULT: "var(--se-primary)",
        },
        card: "var(--se-glass)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "var(--se-shadow-soft)",
        card: "var(--se-shadow-soft)",
        dropdown: "var(--se-shadow)",
      },
      borderRadius: {
        xl: "var(--se-r-sm)",
        "2xl": "var(--se-r-md)",
        "3xl": "var(--se-r-lg)",
      },
    },
  },
  plugins: [],
};
export default config;
