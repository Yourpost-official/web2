/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./App.tsx",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        burgundy: {
          50: '#FDF2F2',
          100: '#FDECEC',
          200: '#f9d5d5',
          500: '#8B2E2E',
          600: '#7A2828',
        },
        charcoal: '#2D2D2D',
        soft: '#FCF9F5',
        surface: '#F8F9FA',
      },
      animation: {
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        reveal: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}