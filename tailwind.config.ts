import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#0a0a0a",
        },
        secondary: {
          dark: "#111111",
        },
        panel: {
          dark: "#1a1a2e",
        },
        accent: {
          blue: "#1e88e5",
          "blue-hover": "#1976d2",
          gold: "#d4a843",
        },
        success: {
          green: "#22c55e",
        },
        error: {
          red: "#ef4444",
        },
        text: {
          primary: "#f0f0f0",
          secondary: "#8a8a9a",
        },
        border: "rgba(255, 255, 255, 0.06)",
        glass: {
          bg: "rgba(10, 10, 10, 0.8)",
        },
        card: {
          bg: "rgba(255, 255, 255, 0.03)",
          "bg-hover": "rgba(255, 255, 255, 0.05)",
        },
      },
      fontFamily: {
        primary: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["DM Mono", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "48px",
        "5xl": "64px",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.2",
        normal: "1.5",
        relaxed: "1.6",
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.5px",
        wider: "1px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        30: "120px",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 4px 20px rgba(0, 0, 0, 0.3)",
        card: "0 8px 40px rgba(0, 0, 0, 0.4)",
        cta: "0 12px 48px rgba(0, 0, 0, 0.5)",
      },
      transitionTimingFunction: {
        fast: "cubic-bezier(0.4, 0, 0.2, 1)",
        base: "cubic-bezier(0.4, 0, 0.2, 1)",
        slow: "cubic-bezier(0.4, 0, 0.2, 1)",
        fade: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        fade: "800ms",
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
      },
      screens: {
        mobile: { max: "640px" },
        tablet: { min: "641px", max: "1024px" },
        desktop: { min: "1025px" },
      },
    },
  },
  plugins: [],
};

export default config;