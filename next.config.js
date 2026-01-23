/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  experimental: {
    // experimental.turbo removed as requested to resolve build failures.
  },
};

module.exports = nextConfig;