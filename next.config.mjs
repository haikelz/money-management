import withPWAInit from "@ducanh2912/next-pwa";
import UnoCSS from "@unocss/webpack";

import "./src/env.mjs";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development" ? true : false,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
});

export default nextConfig;
