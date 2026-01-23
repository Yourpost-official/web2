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
        burgundy: {
          50: '#fef6f6',
          100: '#fdecec',
          200: '#fadcdc',
          300: '#f8c0c0',
          400: '#f29696',
          500: '#e96767', // 기준 색상과 유사하게 조정
          600: '#d94747',
          700: '#b53737',
          800: '#963131',
          900: '#7d2f2f',
        },
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
}