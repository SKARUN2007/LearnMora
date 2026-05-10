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
  // Standard image optimizations
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.uplead.com", pathname: "/**" },
      { protocol: "https", hostname: "t3.gstatic.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
