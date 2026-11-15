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
        // Strict StateEra Design Tokens
        lavender: {
          light: "#F3EAFC",
          DEFAULT: "#E6D8F5",
          dark: "#D4BEEB",
        },
        blush: {
          light: "#FCE7F3",
          DEFAULT: "#F8D7E8",
          dark: "#F4B6D8",
        },
        mint: {
          light: "#EDFCF2",
          DEFAULT: "#DCFCE7",
          dark: "#BBF7D0",
        },
        sky: {
          light: "#F0F9FF",
          DEFAULT: "#E0F2FE",
          dark: "#BAE6FD",
        },
        brand: {
          purple: "#7C4DFF",
          indigo: "#5B3A8C",
          hover: "#6C3CE9",
          active: "#4E2F78",
          light: "#9A75FF",
        },
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(91, 58, 140, 0.05)",
        card: "0 4px 20px rgba(91, 58, 140, 0.07)",
        dropdown: "0 10px 30px rgba(91, 58, 140, 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
