/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px', // Custom breakpoint for screens larger than "lg"
    '2xl': '1600px', // Custom breakpoint for screens larger than "xl"
  },
}
