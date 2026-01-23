import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#2D2D2D',
        'burgundy': {
          // NOTE: This is a guessed value. Please replace with the actual brand color if different.
          '500': '#A73737' 
        },
        'cream': '#FCF9F5'
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      animation: {
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        reveal: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
