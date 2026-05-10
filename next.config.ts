import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.uplead.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t3.gstatic.com",
        pathname: "/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
