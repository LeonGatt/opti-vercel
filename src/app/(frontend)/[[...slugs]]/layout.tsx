import type { Metadata } from 'next'
import type React from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from '@/config/server'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { draftMode } from 'next/headers'

import { resolveSlugs } from '@/utilities/resolveSlugs'
import localization, { type Locale } from '@/localization.config'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { getMessages } from '@/i18n/messages'
import { queryCollectionData } from './data'

import './globals.css'
import { TrackingScriptsBody, TrackingScriptsHead } from '@/providers/TrackingScriptWrapper'
import { cn } from '@/utilities/cn'
import { haasGrotText, haasGrotDisplay, haasGrotBody } from '@/fonts'

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_SERVER_URL || 'https://trieb.work'),
  openGraph: mergeOpenGraph(),
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const paramsR = await params
  const { slugs } = paramsR
  const slugData = resolveSlugs(slugs || [])
  const { isEnabled } = await draftMode()

  const locale = (slugData.locale || localization.defaultLocale) as Locale
  const messages = await getMessages(locale)

  // Query page data to get the theme
  const { cleanSlugs } = slugData
  const collection = cleanSlugs?.[0] === 'posts' ? 'posts' : 'pages'

  let pageTheme: 'light' | 'dark' = 'light'

  if (cleanSlugs && cleanSlugs.length > 0) {
    const page = await queryCollectionData({
      cleanSlugs,
      locale,
      collection,
    })

    // Extract theme from page, fallback to light
    pageTheme = page?.type === 'page' ? page.theme || 'light' : 'light'
  }

  const publicContext: PublicContextProps = {
    ...slugData,
    theme: pageTheme,
  }

  return (
    <html
      className={cn(haasGrotText.variable, haasGrotDisplay.variable, haasGrotBody.variable)}
      lang={locale}
      data-theme={pageTheme}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        <TrackingScriptsHead />
      </head>
      <body>
        <TrackingScriptsBody />
        <Providers locale={locale} messages={messages}>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <LivePreviewListener />
          <Header publicContext={publicContext} />
          {children}
          <Footer publicContext={publicContext} />
        </Providers>
      </body>
    </html>
  )
}
