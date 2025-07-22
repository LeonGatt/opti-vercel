import type { Metadata } from 'next'

import { Geist_Mono, Geist } from 'next/font/google'
import React from 'react'
import { cn } from 'src/utilities/cn'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'

import localization, { Locale } from '@/localization.config'
import { PublicContextProps } from '@/utilities/publicContextProps'
import './[[...slugs]]/globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getMessages } from '@/i18n/messages'
import { haasGrotText, haasGrotDisplay, haasGrotBody } from '@/fonts'

export default async function NotFound() {
  const publicContext: PublicContextProps = {
    isNotFound: true,
    locale: localization.defaultLocale,
    cleanSlugs: [],
  }

  const locale = localization.defaultLocale as Locale
  const messages = await getMessages(locale)

  return (
    <html
      className={cn(haasGrotText.variable, haasGrotDisplay.variable, haasGrotBody.variable)}
      lang={localization.defaultLocale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          <Header publicContext={publicContext} />
          <div className="container py-28" key="not-found">
            <div className="prose max-w-none">
              <h1 className="mb-0">404</h1>
              <p className="mb-4">This page could not be found.</p>
            </div>
            <Button asChild variant="default">
              <Link href="/">Go home</Link>
            </Button>
          </div>
          <Footer publicContext={publicContext} />
        </Providers>
      </body>
    </html>
  )
}
