/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        limestone: {
          DEFAULT: "#FAF8F5",
          deep: "#F6F2EB",
          dark: "#EFE9DD",
        },
        navy: {
          DEFAULT: "#22231F",
        },
        bronze: {
          DEFAULT: "#8F6B4A",
        },
        stone: {
          DEFAULT: "#5E584F",
          mid: "#7D7467",
          light: "#8C8275",
        },
        sand: {
          DEFAULT: "#EAE3D6",
          mid: "#E2DACB",
          dark: "#D5CBB9",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"SF Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        xs: "2px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease both",
        "rise-in": "riseIn 0.7s ease both",
      },
    },
  },
  plugins: [],
};
