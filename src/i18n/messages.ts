import type { Locale } from '@/localization.config'

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('../../messages/en.json')).default
    case 'de':
      return (await import('../../messages/de.json')).default
    case 'fr':
      return (await import('../../messages/fr.json')).default
    case 'ja':
      return (await import('../../messages/ja.json')).default
    case 'ko':
      return (await import('../../messages/ko.json')).default
    case 'pt':
      return (await import('../../messages/pt.json')).default
    case 'sk':
      return (await import('../../messages/sk.json')).default
    case 'zh':
      return (await import('../../messages/zh.json')).default
    default:
      return (await import('../../messages/en.json')).default
  }
}
