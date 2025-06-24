import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { AdminBar } from '@/components/AdminBar'
import { FooterComponent as Footer } from '@/components/Common/Footer'
import { HeaderComponent as Header } from '@/components/Common/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '@/styles/globals.css'
import {
  TrackingScriptsBody,
  TrackingScriptsHead,
} from '@/components/providers/TrackingScriptWrapper'
import { routing } from '@/i18n/routing'
import { getServerSideURL } from '@/utilities/getURL'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

export default async function RootLayout({
  children,
  params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { isEnabled } = await draftMode()

  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <title>OptiTrack Template</title>
        <meta name="description" content="A modern template built with Next.js and Payload CMS" />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        <TrackingScriptsHead />
      </head>
      <body>
        <TrackingScriptsBody />
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />

          <div className="contentWrapper">
            <Header />
            <div className="contentMain">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'OptiTrack Template',
  description: 'A modern template built with Next.js and Payload CMS',
  metadataBase: new URL(getServerSideURL()),
  openGraph: {
    ...mergeOpenGraph(),
    title: 'OptiTrack Template',
    description: 'A modern template built with Next.js and Payload CMS',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
    title: 'OptiTrack Template',
    description: 'A modern template built with Next.js and Payload CMS',
  },
}
