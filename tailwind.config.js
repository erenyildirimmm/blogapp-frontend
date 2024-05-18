/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00df9a",
      },
    },
    container: {
      // default breakpoints but with 40px removed
      screens: {
        xs: "475px",
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1240px",
      },
      padding: "20px",
    },
  },
  plugins: [],
};
