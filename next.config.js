/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  // If the dashboard shows these are unrecognized, Vercel might be using a strict mode.
  // We'll keep them but simplify.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
