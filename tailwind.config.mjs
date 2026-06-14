/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark mode palette
        dark: {
          bg: "#1B1D23",
          card: "#282A32",
          accent: "#FFC42A",
          error: "#FF4D4F",
          text: "#FFFFFF",
          muted: "#C8C8CC",
        },
        // Light mode palette
        light: {
          bg: "#F6F3ED",
          card: "#FAF9F6",
          accent: "#00847D",
          "accent-hover": "#24A69E",
          error: "#CF6656",
          text: "#444240",
          muted: "#B4B0A9",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
