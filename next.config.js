/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  // Removed experimental.turbo as it is deprecated or causing conflicts in the current Next.js 16 build environment.
  experimental: {
    // Keep only validated experimental flags if necessary.
  },
};

module.exports = nextConfig;