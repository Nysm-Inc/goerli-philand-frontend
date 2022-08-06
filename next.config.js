/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.arweave.net"],
    minimumCacheTTL: 86400,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
