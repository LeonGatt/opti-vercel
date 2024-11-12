import React from 'react'
import { Metadata } from 'next'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { LayoutGrid } from './_components/LayoutGrid'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import './_css/global.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
      </head>
      <body>
        <Providers>
          <AdminBar />
          <div className="contentWrapper">
            {/* @ts-expect-error */}
            <Header />
            <div className="contentMain">{children}</div>
            {/* @ts-expect-error */}
            <Footer />
          </div>
          <LayoutGrid />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}
