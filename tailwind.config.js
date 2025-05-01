/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-red': '#CD291E',
        'accent-yellow': '#FDB912',
        'light-white': '#FFF9EE',
        'custom-grey': '#231F20',
        'dark-green': '#316131',
      },
    },
  },
  plugins: [],
}; 