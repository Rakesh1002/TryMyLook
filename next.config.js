/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trymylook.xyz",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.klingai.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Disable caching in production builds
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
