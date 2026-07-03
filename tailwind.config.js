/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#070A13',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
