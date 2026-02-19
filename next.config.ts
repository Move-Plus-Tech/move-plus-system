import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    qualities: [
      100, 75, 70
    ]
  },
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
