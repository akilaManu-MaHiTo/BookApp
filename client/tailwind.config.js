/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        desp:["Source Code Pro", "sans-serif"],
      }
    },
  },
  plugins: [],
}