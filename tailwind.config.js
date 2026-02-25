/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1120"
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, 0.35)"
      }
    }
  },
  plugins: []
};
