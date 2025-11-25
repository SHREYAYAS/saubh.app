import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Turbopack explicitly
  turbopack: {},
  
  // PWA configuration will be handled differently in production
  // For now, we'll keep it simple for development
};

export default nextConfig;