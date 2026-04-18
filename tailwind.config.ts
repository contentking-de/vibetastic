import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#fff8f1",
          variant: "#e4ddd5",
          container: {
            lowest: "#ffffff",
            low: "#faf2ea",
            DEFAULT: "#f2eae2",
            high: "#eee7df",
            highest: "#e8e1da",
          },
        },
        "on-surface": {
          DEFAULT: "#1e1b17",
          variant: "#524e47",
        },
        primary: {
          DEFAULT: "#703210",
          container: "#8d4925",
          fixed: "#ffdbcc",
          "fixed-dim": "#f0c5b0",
        },
        "on-primary": "#ffffff",
        "on-primary-fixed": "#351000",
        secondary: {
          DEFAULT: "#745b20",
          container: "#ffdb94",
        },
        "on-secondary-container": "#795f24",
        tertiary: {
          DEFAULT: "#004b56",
          container: "#b8eaf3",
        },
        "inverse-surface": "#1e1b17",
        outline: {
          variant: "#d9c2b8",
        },
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      letterSpacing: {
        display: "-0.02em",
        label: "0.05em",
      },
      boxShadow: {
        ambient: "0px 20px 40px rgba(30, 27, 23, 0.06)",
        "ambient-sm": "0px 12px 24px rgba(30, 27, 23, 0.05)",
      },
    },
  },
  plugins: [],
}
export default config
