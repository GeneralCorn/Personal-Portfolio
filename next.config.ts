import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber'],
  },
};

export default nextConfig;
