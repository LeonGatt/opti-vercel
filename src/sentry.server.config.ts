import * as Sentry from '@sentry/nextjs'
import { env } from './env'

const sentryDns = env.NEXT_PUBLIC_SENTRY_DSN

if (sentryDns) {
  Sentry.init({
    dsn: sentryDns,
    sendDefaultPii: true,
  })
}
