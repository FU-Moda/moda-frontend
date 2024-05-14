/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   montserrat: ["Montserrat", "sans-serif"],
      // },
      colors: {
        mainColor: "#0284c7",
        primary: "#0c4a6e",
        secondary: "#075985",
        dark: "#082f49",
        "badge-resting": "#CDAA6B",
        "badge-entertaiment": "#C9DABC",
        "badge-fb": "#4f46e5",
        "badge-vehicle": "#4338ca",
      },
      fontSize: {
        14: "14px",
        18: "18px",
        24: "24px",
        32: "32px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
