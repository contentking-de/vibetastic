import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      "md-wide": "860px",
      lg: "960px",
      xl: "1080px",
      "2xl": "1280px",
    },
    extend: {
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          soft: "var(--bg-soft)",
          card: "var(--bg-card)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          mute: "var(--ink-mute)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          ink: "var(--accent-ink)",
        },
        line: "var(--line)",
        terminal: {
          bg: "var(--terminal-bg)",
          fg: "var(--terminal-fg)",
          accent: "var(--terminal-accent)",
        },
      },
      maxWidth: {
        page: "1240px",
      },
      letterSpacing: {
        display: "-0.025em",
        label: "0.05em",
        wide: "0.08em",
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
    },
  },
  plugins: [],
}
export default config
