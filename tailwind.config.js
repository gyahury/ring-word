/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.html','./**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'minimum-height': {'raw': '(max-height: 450px)'}, 
        'minimum-width': {'raw': '(max-width: 345px)'}, 
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};