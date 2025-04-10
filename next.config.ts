import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  images: {
    domains: ['tpgtrwvdzjvfkhjotzex.supabase.co'],
  },
};

export default nextConfig;
