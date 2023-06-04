/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        dark: "#1c1a1a",
        "anti-white": "#e5e7eb",
        "dim-grey": "#666666",
        seasalt: "#F7F7F7",
        "light-grey": "rgb(102, 102, 102)",
        "battle-grey": "#999999",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(90deg, rgba(52,58,64,1) 0%, rgba(130,140,150,1) 45%, rgba(233,236,239,1) 100%);",
      },
    },
    fontFamily: {
      IBM: ["IBM Plex Sans", "sans-serif"],
    },
    boxShadow: {
      xl: "box-shadow: 2px 6px 5px -2px rgba(0,0,0,0.75);",
      lg: "0px 1px 3px rgba(0, 0, 0, 0.07);",
    },
  },
  plugins: [],
};
