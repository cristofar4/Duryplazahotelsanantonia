import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        /* Luxury brand palette */
        ink: {
          DEFAULT: "#0B0A08",
          50: "#F6F4F0",
          100: "#E7E2D9",
          800: "#181511",
          900: "#100E0B",
          950: "#0B0A08",
        },
        champagne: {
          DEFAULT: "#C6A867",
          light: "#E2CD9C",
          dark: "#A8854A",
          50: "#FBF7EE",
        },
        ivory: {
          DEFAULT: "#F7F2E9",
          dark: "#EFE7D7",
        },
        riverstone: {
          DEFAULT: "#1F3A37",
          light: "#2E5450",
        },
        stone: {
          50: "#FAF8F4",
          100: "#F2EEE6",
          200: "#E4DCCE",
          300: "#CFC3AE",
          400: "#B0A088",
          500: "#8C7C64",
          600: "#6B5E4B",
          700: "#4C4336",
          800: "#332D24",
          900: "#1C1813",
        },
        /* shadcn tokens */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wider2: "0.18em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "hero-sm": ["clamp(2.75rem, 8vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        hero: ["clamp(3.5rem, 11vw, 9.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        display: ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxe-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.12) translate(-1%, -1%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        kenburns: "kenburns 14s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
