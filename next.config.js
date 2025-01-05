/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trymylook.xyz',
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
