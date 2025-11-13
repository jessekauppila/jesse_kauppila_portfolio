import type { NextConfig } from 'next';

const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.graphassets.com' },
    ],
  },
};

export default nextConfig;
