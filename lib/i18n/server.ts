/**
 * Server-side i18n utilities
 */

import { type Locale, defaultLocale, isValidLocale } from './config'
import { getMessages, t } from './index'
import { headers } from 'next/headers'

export async function getLocale(): Promise<Locale> {
  // In Next.js App Router, locale comes from the [locale] segment
  // This will be used in page components
  return defaultLocale
}

export async function getTranslations(locale: Locale) {
  const messages = getMessages(locale)
  return (key: string, params?: Record<string, string>) => t(locale, key, params)
}

export function getLocaleFromHeaders(): Locale {
  // This is a fallback - in practice, locale comes from URL
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language')
  
  if (acceptLanguage) {
    const lang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    if (isValidLocale(lang)) return lang
    if (lang === 'zh') return 'zh-cn'
  }
  
  return defaultLocale
}
