import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        'accent-light': "var(--accent-light)",
      },
    },
    boxShadow: {
      'glow-sm': '0 0 20px 15px rgba(255, 255, 255, 0.5)',
    },
  },
  plugins: [],
} satisfies Config;
