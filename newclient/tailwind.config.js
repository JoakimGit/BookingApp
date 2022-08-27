/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#0071c2",
        darkblue: "#003580",
        sun: "#febb02"
      },
      maxWidth: {
        content: "1024px"
      }
    }
  },
  plugins: []
};
