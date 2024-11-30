/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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
