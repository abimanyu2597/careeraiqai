import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#060816",
        surface: "#0d1325",
        stroke: "rgba(255,255,255,0.10)",
        accent: "#3b82f6",
        accent2: "#8b5cf6"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,130,246,.20), 0 10px 30px rgba(59,130,246,.20)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at center, rgba(59,130,246,0.18) 0, rgba(59,130,246,0) 55%), linear-gradient(to bottom right, rgba(59,130,246,.06), rgba(139,92,246,.08))"
      }
    },
  },
  plugins: [],
} satisfies Config;
