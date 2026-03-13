/**
 * SEO Configuration and Utilities
 *
 * English is the root path (/) - NO /en prefix
 * Other locales use prefix: /zh-cn, /ja, /fr, etc.
 */

import { locales, defaultLocale, type Locale } from './i18n/config'

// Site configuration
export const SITE_URL = 'https://sckde.com'
export const SITE_NAME = 'Image Converter'
export const TITLE_SUFFIX = 'Sckde.com'

// All supported locales
export const LOCALES = locales

/**
 * Get base URL from environment or default
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = String(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, '')
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }
  return SITE_URL
}

/**
 * Generate localized path
 * English (default) uses root path, other locales use prefix
 *
 * @example
 * localizedPath('/convert-to-jpg', 'en') => '/convert-to-jpg'
 * localizedPath('/convert-to-jpg', 'zh-cn') => '/zh-cn/convert-to-jpg'
 * localizedPath('/', 'en') => '/'
 * localizedPath('/', 'ja') => '/ja'
 */
export function localizedPath(path: string, locale: Locale): string {
  // Normalize path
  const normalizedPath = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`

  // English (default locale) uses root path without prefix
  if (locale === defaultLocale) {
    return normalizedPath === '' ? '/' : normalizedPath
  }

  // Other locales use prefix
  return normalizedPath === '' ? `/${locale}` : `/${locale}${normalizedPath}`
}

/**
 * Generate full localized URL
 *
 * @example
 * localizedUrl('/convert-to-jpg', 'en') => 'https://sckde.com/convert-to-jpg'
 * localizedUrl('/convert-to-jpg', 'zh-cn') => 'https://sckde.com/zh-cn/convert-to-jpg'
 * localizedUrl('/', 'en') => 'https://sckde.com'
 */
export function localizedUrl(path: string, locale: Locale): string {
  const base = getBaseUrl()
  const localePath = localizedPath(path, locale)

  // Root path for English
  if (localePath === '/') {
    return base
  }

  return `${base}${localePath}`
}

/**
 * Convert locale to hreflang format (BCP 47)
 */
export function getHreflang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-Hans'
  if (locale === 'zh-tw') return 'zh-Hant'
  return locale
}

/**
 * Generate language alternates for hreflang tags
 * Used in metadata.alternates.languages
 *
 * @example
 * languageAlternates('/convert-to-jpg') => {
 *   'en': 'https://sckde.com/convert-to-jpg',
 *   'zh-Hans': 'https://sckde.com/zh-cn/convert-to-jpg',
 *   'ja': 'https://sckde.com/ja/convert-to-jpg',
 *   'x-default': 'https://sckde.com/convert-to-jpg'
 * }
 */
export function languageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}

  locales.forEach((locale) => {
    const hreflang = getHreflang(locale)
    alternates[hreflang] = localizedUrl(path, locale)
  })

  // x-default points to English version
  alternates['x-default'] = localizedUrl(path, defaultLocale)

  return alternates
}

/**
 * Get canonical URL for a page
 */
export function getCanonicalUrl(path: string, locale: Locale): string {
  return localizedUrl(path, locale)
}

/**
 * Generate title with suffix
 */
export function titleWithSuffix(title: string): string {
  if (title.includes(TITLE_SUFFIX)) return title
  return `${title} | ${TITLE_SUFFIX}`
}

/**
 * Get OpenGraph locale format
 */
export function getOgLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    'en': 'en_US',
    'zh-cn': 'zh_CN',
    'zh-tw': 'zh_TW',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'pt': 'pt_PT',
    'it': 'it_IT',
    'ru': 'ru_RU',
    'ar': 'ar_SA',
    'nl': 'nl_NL',
    'pl': 'pl_PL',
    'tr': 'tr_TR',
    'vi': 'vi_VN',
    'th': 'th_TH',
    'id': 'id_ID',
  }
  return ogLocaleMap[locale] || `${locale}_${locale.toUpperCase()}`
}

/**
 * Get HTML lang attribute
 */
export function getHtmlLang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-CN'
  if (locale === 'zh-tw') return 'zh-TW'
  return locale
}

// Default SEO content
export const DEFAULT_DESCRIPTION =
  '100% free online image converter. Convert images to JPG, WebP, or PNG locally—no uploads, no signup. Your files never leave your device.'

export const DEFAULT_KEYWORDS = [
  'image converter',
  'JPG converter',
  'WebP converter',
  'PNG converter',
  'convert image',
  'image format converter',
  'free image converter',
  'local image conversion',
  'batch image converter',
]
