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
        'charcoal': '#1D1D1F', // 애플 스타일 부드러운 블랙
        'burgundy': {
          '50': '#FFF5F5',
          '100': '#FED7D7',
          '200': '#FEB2B2',
          '300': '#FC8181',
          '400': '#F56565',
          '500': '#8B2E2E', // 메인 버건디
          '600': '#7A2828',
          '700': '#6A2222',
          '800': '#5A1D1D',
          '900': '#4A1818',
        },
        'cream': '#FAFAF8', // 애플 스타일 부드러운 베이지
        'soft-gray': '#6E6E73', // 애플 스타일 보조 텍스트
        'light-gray': '#86868B', // 애플 스타일 caption
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
