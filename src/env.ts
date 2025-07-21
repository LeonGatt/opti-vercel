import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  emptyStringAsUndefined: true,

  /*
   * ServerSide Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    // Required environment variables
    SERVER_URL: z.string().url(),
    CRON_SECRET: z.string().min(1, 'CRON_SECRET is required'),
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
    PREVIEW_SECRET: z.string().min(1, 'PREVIEW_SECRET is required'),

    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    STRAPI_PREVIEW_SECRET: z.string().optional(),
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING: z.string().optional(),

    RECAPTCHA_SECRET_KEY: z.string().optional(),
    DEBUG_PAYLOAD_CLOUD: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   * You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_SENTRY_ORG: z.string().optional(),
    NEXT_PUBLIC_SENTRY_PROJECT: z.string().optional(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),

    NEXT_PUBLIC_VERCEL_URL: z.string().url().optional(),

    NEXT_PUBLIC_CART_NAME: z.string().optional(),

    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().optional(),
    NEXT_PUBLIC_GTM_AUTH: z.string().optional(),

    NEXT_PUBLIC_CART_API_URL: z.string().url(),
  },
  shared: {
    // NODE_ENV makes app to behave as it's in production mode (optimized builds, no dev-only behavior, etc.)
    NODE_ENV: z.enum(['development', 'production']).optional(),
    CI: z.string().optional(),
    isDevelopment: z.boolean().optional(),
    isProduction: z.boolean().optional(),
    isVercel: z.boolean().optional(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   * You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // Server environment variables
    SERVER_URL:
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000'),
    CRON_SECRET: process.env.CRON_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    STRAPI_PREVIEW_SECRET: process.env.STRAPI_PREVIEW_SECRET,
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING:
      process.env.SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    DEBUG_PAYLOAD_CLOUD: process.env.DEBUG_PAYLOAD_CLOUD,

    // Client environment variables
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ORG: process.env.NEXT_PUBLIC_SENTRY_ORG,
    NEXT_PUBLIC_SENTRY_PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_CART_NAME: process.env.NEXT_PUBLIC_CART_NAME || 'opticart',
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_GTM_AUTH: process.env.NEXT_PUBLIC_GTM_AUTH,
    NEXT_PUBLIC_CART_API_URL: process.env.NEXT_PUBLIC_CART_API_URL,

    // Shared environment variables
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,

    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isVercel: !!process.env.VERCEL,
  },
})
