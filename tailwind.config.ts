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
        // 레트로 따뜻한 색상 팔레트
        'charcoal': '#2D2620',
        'burgundy': {
          '50': '#FDF8F6',
          '100': '#F5EDE4',
          '200': '#E5D9CA',
          '300': '#D4C4B0',
          '400': '#B89E82',
          '500': '#8B4A3C', // 메인 색상
          '600': '#7A3D30',
          '700': '#6A3328',
          '800': '#5A2A20',
          '900': '#4A2218',
        },
        'cream': '#FBF8F3',
        'warm-gray': '#5C5346',
        'soft-brown': '#8B6B4A',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        reveal: 'reveal 0.6s ease-out forwards',
      },
      keyframes: {
        reveal: {
          'from': { opacity: '0', transform: 'translateY(16px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
