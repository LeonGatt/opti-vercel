'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import type { Locale } from '@/localization.config'

const queryClient = new QueryClient()

export const ClientProviders: React.FC<{
  children: React.ReactNode
  locale: Locale
  messages: any
}> = ({ children, locale, messages }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  )
}
