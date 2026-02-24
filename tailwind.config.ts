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
        // DESIGN-SYSTEM-V2.md color palette
        'navy-hero': '#0B1120',
        'light-section': '#FAFAFA', 
        'warm-section': '#F5F0EB',
        'dark-contrast': '#111827',
        'card-white': '#FFFFFF',
        
        // Text colors
        'text-dark-primary': '#FFFFFF',
        'text-dark-secondary': '#94A3B8',
        'text-light-primary': '#111827',
        'text-light-body': '#4B5563',
        'text-light-caption': '#6B7280',
        'text-nav': '#CBD5E1',
        'text-caption-dark': '#64748B',
        
        // Accents
        'copper-accent': '#B45309',
        'blue-cta': '#2563EB',
        'blue-cta-hover': '#1D4ED8',
        'green-metric': '#16A34A',
        
        // Borders
        'border-light': '#E5E7EB',
        'border-dark': 'rgba(255, 255, 255, 0.08)',
        
        // Legacy colors for gradual migration
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
        // DESIGN-SYSTEM-V2.md font stack with CSS variables
        'serif': ['var(--font-dm-serif)', 'DM Serif Display', 'Georgia', 'serif'],
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-dm-mono)', 'DM Mono', 'monospace'],
        
        // Legacy
        primary: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        // DESIGN-SYSTEM-V2.md scale
        'hero-desktop': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section-desktop': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'card-title': ['20px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.7' }],
        'body-large': ['18px', { lineHeight: '1.7' }],
        'caption': ['13px', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'overline': ['12px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
        'nav': ['15px', { lineHeight: '1.0' }],
        'stat-desktop': ['48px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'stat-mobile': ['36px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        
        // Legacy sizes
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
      spacing: {
        // DESIGN-SYSTEM-V2.md spacing scale
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '100px',
        '5xl': '120px',
        
        // Legacy spacing
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
      maxWidth: {
        'container': '1200px',
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
        'card-light': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 2px 8px rgba(0, 0, 0, 0.06)',
        subtle: "0 4px 20px rgba(0, 0, 0, 0.3)",
        card: "0 8px 40px rgba(0, 0, 0, 0.4)",
        cta: "0 12px 48px rgba(0, 0, 0, 0.5)",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        fast: "cubic-bezier(0.4, 0, 0.2, 1)",
        base: "cubic-bezier(0.4, 0, 0.2, 1)",
        slow: "cubic-bezier(0.4, 0, 0.2, 1)",
        fade: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        fade: "600ms", // DESIGN-SYSTEM-V2.md animation duration
      },
      animation: {
        'fade-up': 'fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
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