/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'yourpost.co.kr',
      },
    ],
  },
  eslint: {
    // 빌드 시 린트 에러 무시
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;