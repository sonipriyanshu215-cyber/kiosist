import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kio-primary":  "var(--kio-primary)",
        "kio-accent":   "var(--kio-accent)",
        "kio-accent2":  "var(--kio-accent2)",
        "kio-ink":      "var(--kio-ink)",
        "kio-bg":       "var(--kio-bg)",
        "kio-bg-soft":  "var(--kio-bg-soft)",
        "kio-cream":    "var(--kio-cream)",
        "kio-line":     "var(--kio-line)",
        "kio-muted":    "var(--kio-muted)",
        "kio-success":  "var(--kio-success)",
        "kio-error":    "var(--kio-error)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      transitionTimingFunction: {
        "kio-out":    "cubic-bezier(0.16, 1, 0.3, 1)",
        "kio-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "float-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%":      { transform: "translateX(-8px)" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%":      { transform: "scale(1.4)", opacity: "0" },
        },
        "dot-blink": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: ".4", transform: "scale(1.3)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "blob-morph": {
          "0%,100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%":     { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "300% center" },
        },
        "scan-beam": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
        "orbit": {
          "0%":   { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
      },
      animation: {
        "float-y":         "float-y 5s ease-in-out infinite",
        "float-y-slow":    "float-y 8s ease-in-out infinite",
        "float-x":         "float-x 6s ease-in-out infinite",
        "pulse-ring":      "pulse-ring 2.2s ease-in-out infinite",
        "dot-blink":       "dot-blink 1.5s ease infinite",
        marquee:           "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "spin-slow":       "spin-slow 20s linear infinite",
        "blob-morph":      "blob-morph 8s ease-in-out infinite",
        "fade-in-up":      "fade-in-up .7s ease both",
        shimmer:           "shimmer 5s linear infinite",
        "scan-beam":       "scan-beam 2.8s ease-in-out infinite",
        "scan-beam-slow":  "scan-beam 5s ease-in-out infinite",
        "scan-beam-fast":  "scan-beam 1.5s ease-in-out infinite",
        "orbit":           "orbit 12s linear infinite",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
