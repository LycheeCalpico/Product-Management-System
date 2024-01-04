/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.js}",
    "./src/**/*.jsx}",
    "./src/**/*.ts}",
    "./src/**/*.tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chuwa-blue': '#5048e5',
      },
      screens: {
        xs: "320px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
