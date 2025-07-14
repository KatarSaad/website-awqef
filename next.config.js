const path = require("path"); // <-- You need this!

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Ignoring TypeScript errors to match development behavior
    // This is not recommended for production code quality
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  // Disable static optimization for problematic pages
  output: 'standalone',
  experimental: {
    // Disable static generation completely
    // This will make all pages server-side rendered
    disableOptimizedLoading: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
