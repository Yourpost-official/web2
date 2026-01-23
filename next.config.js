/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  // experimental.turbo removed as requested to resolve "invalid experimental options" build failure.
  experimental: {
    // Other valid experimental flags can be placed here if verified.
  },
};

module.exports = nextConfig;