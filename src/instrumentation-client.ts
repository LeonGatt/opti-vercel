import * as Sentry from '@sentry/nextjs'

const sentryDns = process.env.NEXT_PUBLIC_SENTRY_DSN

if (sentryDns) {
  Sentry.init({
    dsn: sentryDns,
    sendDefaultPii: true,

    // Tracing
    tracesSampleRate: 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
      }),
    ],
  })
}

export const onRouterTransitionStart = sentryDns ? Sentry.captureRouterTransitionStart : undefined
