import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { serverUrl } from "./src/config/server";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Set NEXT_PUBLIC_SERVER_URL to the URL of the server.
 * If NEXT_PUBLIC_SERVER_URL is not set, it will default to the URL of the Vercel deployment.
 * If Vercel URL is not set, it will default to http://localhost:3000.
 */
export const NEXT_PUBLIC_SERVER_URL = serverUrl;

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
  async headers() {
    return [
      {
        source: '/media/:path*.svg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      ...[new URL(serverUrl)].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "") as "http" | "https",
        };
      }),
      {
        hostname: "*.vercel.app",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withPayload(
  withSentryConfig(nextConfig, {
    org: process.env.NEXT_PUBLIC_SENTRY_ORG,
    project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
  }),
);
