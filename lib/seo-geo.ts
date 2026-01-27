/**
 * SEO and Geographic Targeting Configuration
 * Enhanced for Google Search Console and international SEO
 * Supports multiple hreflang variants per language
 */

import { type Locale, locales } from './i18n/config'
import { getBaseUrl } from './seo'

/**
 * Geographic targeting for each locale
 * Maps locales to their primary target countries/regions
 */
export const localeGeoMapping: Record<Locale, string[]> = {
  'en': ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'PH', 'IN', 'SG', 'MY'], // English-speaking countries
  'zh-cn': ['CN', 'SG', 'MY'], // Mainland China, Singapore, Malaysia
  'zh-tw': ['TW', 'HK', 'MO'], // Taiwan, Hong Kong, Macau
  'es': ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'DO', 'HN', 'SV', 'NI', 'CR', 'PA', 'UY', 'PY', 'BO', 'PR'], // Spanish-speaking countries
  'fr': ['FR', 'BE', 'CH', 'CA', 'LU', 'MC', 'SN', 'CI', 'ML', 'BF', 'NE', 'TG', 'BJ', 'CD', 'MG', 'CM', 'TN', 'MA', 'DZ'], // French-speaking countries
  'de': ['DE', 'AT', 'CH', 'LI', 'LU', 'BE'], // German-speaking countries
  'ja': ['JP'], // Japan
  'ko': ['KR', 'KP'], // Korean-speaking countries
  'pt': ['PT', 'BR', 'AO', 'MZ', 'GW', 'TL', 'CV', 'ST'], // Portuguese-speaking countries
  'it': ['IT', 'CH', 'SM', 'VA', 'MT'], // Italian-speaking regions
  'ru': ['RU', 'BY', 'KZ', 'KG', 'UA', 'UZ', 'TJ', 'TM', 'AZ', 'MD', 'GE', 'AM'], // Russian-speaking countries
  'ar': ['SA', 'AE', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'OM', 'QA', 'SY', 'TN', 'YE', 'SD', 'DZ', 'BH', 'PS', 'MR'], // Arabic-speaking countries
  'nl': ['NL', 'BE', 'SR', 'AW', 'CW'], // Dutch-speaking regions
  'pl': ['PL'], // Poland
  'tr': ['TR', 'CY'], // Turkish-speaking countries
  'vi': ['VN'], // Vietnam
  'th': ['TH'], // Thailand
  'id': ['ID'], // Indonesia
}

/**
 * Extended hreflang variants for regional targeting
 * Maps main locale to additional regional variants
 */
export const localeHreflangVariants: Record<Locale, string[]> = {
  'en': ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-IE', 'en-ZA', 'en-IN', 'en-SG'],
  'zh-cn': ['zh-Hans', 'zh-CN', 'zh-SG'],
  'zh-tw': ['zh-Hant', 'zh-TW', 'zh-HK', 'zh-MO'],
  'es': ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE', 'es-419'],
  'fr': ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
  'de': ['de', 'de-DE', 'de-AT', 'de-CH'],
  'ja': ['ja', 'ja-JP'],
  'ko': ['ko', 'ko-KR'],
  'pt': ['pt', 'pt-PT', 'pt-BR'],
  'it': ['it', 'it-IT', 'it-CH'],
  'ru': ['ru', 'ru-RU', 'ru-BY', 'ru-KZ'],
  'ar': ['ar', 'ar-SA', 'ar-AE', 'ar-EG'],
  'nl': ['nl', 'nl-NL', 'nl-BE'],
  'pl': ['pl', 'pl-PL'],
  'tr': ['tr', 'tr-TR'],
  'vi': ['vi', 'vi-VN'],
  'th': ['th', 'th-TH'],
  'id': ['id', 'id-ID'],
}

/**
 * Language name in native script for each locale
 */
export const localeNativeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
  'pt': 'Português',
  'it': 'Italiano',
  'ru': 'Русский',
  'ar': 'العربية',
  'nl': 'Nederlands',
  'pl': 'Polski',
  'tr': 'Türkçe',
  'vi': 'Tiếng Việt',
  'th': 'ไทย',
  'id': 'Bahasa Indonesia',
}

/**
 * Get primary target country for a locale
 */
export function getPrimaryCountry(locale: Locale): string {
  const countries = localeGeoMapping[locale]
  return countries[0] || 'US'
}

/**
 * Get all target countries for a locale
 */
export function getTargetCountries(locale: Locale): string[] {
  return localeGeoMapping[locale] || []
}

/**
 * Get primary hreflang for a locale
 */
export function getPrimaryHreflang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-Hans'
  if (locale === 'zh-tw') return 'zh-Hant'
  return locale
}

/**
 * Get all hreflang variants for a locale
 */
export function getHreflangVariants(locale: Locale): string[] {
  return localeHreflangVariants[locale] || [locale]
}

/**
 * Generate hreflang mapping for all locales
 * Returns a map of locale -> URL for hreflang tags
 * Includes x-default for unmatched languages
 */
export function generateHreflangMap(path: string): Record<string, string> {
  const base = getBaseUrl()
  const hreflangMap: Record<string, string> = {}

  locales.forEach((locale) => {
    // Use primary hreflang format
    const hreflang = getPrimaryHreflang(locale)

    // Build URL with locale
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const url = locale === 'en' && cleanPath === '/'
      ? base
      : `${base}/${locale}${cleanPath === '/' ? '' : cleanPath}`

    hreflangMap[hreflang] = url
  })

  // Add x-default pointing to English version
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  hreflangMap['x-default'] = cleanPath === '/' ? base : `${base}${cleanPath}`

  return hreflangMap
}

/**
 * Generate extended hreflang mapping with regional variants
 * For comprehensive international SEO coverage
 */
export function generateExtendedHreflangMap(path: string): Record<string, string> {
  const base = getBaseUrl()
  const hreflangMap: Record<string, string> = {}
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  locales.forEach((locale) => {
    const url = locale === 'en' && cleanPath === '/'
      ? base
      : `${base}/${locale}${cleanPath === '/' ? '' : cleanPath}`

    // Add all regional variants pointing to the same URL
    const variants = getHreflangVariants(locale)
    variants.forEach((variant) => {
      hreflangMap[variant] = url
    })
  })

  // Add x-default pointing to English version
  hreflangMap['x-default'] = cleanPath === '/' ? base : `${base}${cleanPath}`

  return hreflangMap
}

/**
 * Get geographic targeting information for Google Search Console
 */
export function getGeoInfo(locale: Locale): {
  country: string
  countries: string[]
  hreflang: string
  hreflangVariants: string[]
  nativeName: string
} {
  return {
    country: getPrimaryCountry(locale),
    countries: getTargetCountries(locale),
    hreflang: getPrimaryHreflang(locale),
    hreflangVariants: getHreflangVariants(locale),
    nativeName: localeNativeNames[locale],
  }
}

/**
 * Get locale from Accept-Language header value
 * Enhanced detection with regional variant support
 */
export function getLocaleFromAcceptLanguage(acceptLanguage: string): Locale | null {
  if (!acceptLanguage) return null

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,zh-CN;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q = '1'] = lang.trim().split(';q=')
      return { code: code.toLowerCase(), quality: parseFloat(q) }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const lang of languages) {
    const code = lang.code

    // Direct match with our locales
    if (locales.includes(code as Locale)) {
      return code as Locale
    }

    // Handle Chinese variants
    if (code === 'zh' || code === 'zh-hans' || code === 'zh-cn') {
      return 'zh-cn'
    }
    if (code === 'zh-hant' || code === 'zh-tw' || code === 'zh-hk' || code === 'zh-mo') {
      return 'zh-tw'
    }

    // Handle language without region (e.g., 'en' -> 'en', 'es' -> 'es')
    const baseLang = code.split('-')[0]
    if (locales.includes(baseLang as Locale)) {
      return baseLang as Locale
    }
  }

  return null
}
