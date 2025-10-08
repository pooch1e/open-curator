import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nrs.harvard.edu',
        pathname: '**',
      },
      {
        protocol: 'https', 
        hostname: 'hvrd.art',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.artic.edu',
        pathname: '/iiif/**',
      },
      {
        protocol: 'https',
        hostname: 'data.nma.gov.au',
        pathname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
