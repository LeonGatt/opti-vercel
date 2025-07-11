import * as Sentry from '@sentry/nextjs'
import { env } from './env'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
}

export const onRequestError = env.NEXT_PUBLIC_SENTRY_DSN ? Sentry.captureRequestError : undefined
