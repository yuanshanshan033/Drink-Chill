import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d1117",
        mist: "#eef8ff",
        skyline: "#9bdcff",
        coral: "#ff8f70",
        leaf: "#63c6a6"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(13, 17, 23, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
