import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  swSrc: "service-worker.js", 
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === "development",
})


const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
