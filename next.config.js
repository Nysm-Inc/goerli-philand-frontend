/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.arweave.net"],
    minimumCacheTTL: 60 * 60,
  },
};

module.exports = nextConfig;
