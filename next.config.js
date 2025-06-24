import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs'

import redirects from './redirects.js'

import createNextIntlPlugin from 'next-intl/plugin'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  redirects,
}

const withNextIntl = createNextIntlPlugin()

export default withPayload(
  withNextIntl(
    withSentryConfig(nextConfig, {
      org: process.env.NEXT_PUBLIC_SENTRY_ORG,
      project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      widenClientFileUpload: true,
      tunnelRoute: '/monitoring',
    }),
  ),
  {
    devBundleServerPackages: false,
  },
)
