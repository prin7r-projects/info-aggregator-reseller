import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0F12",
        "ink-2": "#1B1D22",
        "ink-soft": "#3F4148",
        paper: "#FAFAF8",
        "paper-2": "#F2F0EA",
        "paper-3": "#E6E2D5",
        rule: "#0E0F12",
        "rule-soft": "#C9C4B5",
        oxblood: "#7A1F2B",
        "oxblood-deep": "#5C141E",
        olive: "#4F5A2E",
        ochre: "#A87A2E",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        none: "0",
        plate: "2px",
        chrome: "8px",
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
