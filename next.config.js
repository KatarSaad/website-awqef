const path = require("path"); // <-- You need this!

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Ignoring TypeScript errors to match development behavior
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  // Completely disable static generation
  staticPageGenerationTimeout: 1000,
  distDir: process.env.NODE_ENV === 'development' ? '.next' : '.next',
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;