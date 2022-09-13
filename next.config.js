/** @type {import('next').NextConfig} */

// import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.arweave.net"],
    minimumCacheTTL: 86400,
  },
  rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "playground.oji3.dev" }],
          destination: "/playground",
        },
      ],
    };
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// export default withBundleAnalyzer({ enabled: process.env.NEXT_PUBLIC_APP_ENV === "local" })(nextConfig);
