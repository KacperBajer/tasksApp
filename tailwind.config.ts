import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-100": "#0a0a0c",
        "dark-200": "#1e1e20",
        "dark-300": "#636365",
        "dark-400": "#c5c5c7",
        "dark-500": "#949496"
      },
    },
  },
  plugins: [],
};
export default config;
