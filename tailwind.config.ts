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
        'charcoal': '#3D3835',
        'burgundy': {
          '50': '#FFF5F5',
          '100': '#FFE5E5',
          '200': '#FFCCCC',
          '300': '#FFB3B3',
          '400': '#FF8080',
          '500': '#E62727',
          '600': '#cc1f1f',
          '700': '#B31B1B',
          '800': '#991717',
          '900': '#801313',
          'muddy': '#5D3131',
          'muddy-dark': '#4A2525',
        },
        'cream': '#FAF8F5',
        'warm-gray': '#5C5550',
        'soft-brown': '#8B7B6B',
        'paper': '#F5F0E8',
        'kraft': '#C9B99A',
        'sepia': '#9C8B7A',
        'olive': '#7D8B6F',
        'mocha': '#6B5B4F',
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
      boxShadow: {
        'muddy': '0 4px 14px rgba(93, 49, 49, 0.25)',
        'muddy-hover': '0 8px 20px rgba(93, 49, 49, 0.35)',
      },
    },
  },
  plugins: [],
};
export default config;
