import type { Config } from "tailwindcss";
import type { Config as DaisyUIConfig } from "daisyui";
import daisyui from "daisyui";

export default {
  // content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4f46e5",
          "primary-content": "#d6ddfe",
          secondary: "#374151",
          "secondary-content": "#d3d6da",
          accent: "#6d28d9",
          "accent-content": "#ded8fb",
          neutral: "#6d28d9",
          "neutral-content": "#ded8fb",
          "base-100": "#312e81",
          "base-200": "#29276f",
          "base-300": "#221f5e",
          "base-content": "#d0d3e7",
          info: "#1d4ed8",
          "info-content": "#cfdefb",
          success: "#15803d",
          "success-content": "#d4e5d6",
          warning: "#b45309",
          "warning-content": "#f3ddd1",
          error: "#b91c1c",
          "error-content": "#f7d5d1",
        },
      },
    ],
  },
} satisfies Config & { daisyui: DaisyUIConfig };
