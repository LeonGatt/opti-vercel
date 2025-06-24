import * as Sentry from '@sentry/nextjs'

const sentryDns = process.env.NEXT_PUBLIC_SENTRY_DSN

if (sentryDns) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
  })
}
