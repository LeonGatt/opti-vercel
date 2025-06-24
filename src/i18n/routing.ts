import { defineRouting } from 'next-intl/routing'
import localization from './localization'

export const routing = defineRouting({
  defaultLocale: localization.defaultLocale,
  locales: localization.locales.map((locale) => locale.code),
  localeDetection: false,
  localePrefix: 'as-needed',
})
