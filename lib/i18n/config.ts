/**
 * i18n Configuration
 * Supports 18 languages with locale-based routing
 */

export type Locale = 
  | 'en'      // English
  | 'zh-cn'   // Simplified Chinese
  | 'zh-tw'   // Traditional Chinese
  | 'es'      // Spanish
  | 'fr'      // French
  | 'de'      // German
  | 'ja'      // Japanese
  | 'ko'      // Korean
  | 'pt'      // Portuguese
  | 'it'      // Italian
  | 'ru'      // Russian
  | 'ar'      // Arabic
  | 'nl'      // Dutch
  | 'pl'      // Polish
  | 'tr'      // Turkish
  | 'vi'      // Vietnamese
  | 'th'      // Thai
  | 'id'      // Indonesian

export const locales: Locale[] = [
  'en',
  'zh-cn',
  'zh-tw',
  'es',
  'fr',
  'de',
  'ja',
  'ko',
  'pt',
  'it',
  'ru',
  'ar',
  'nl',
  'pl',
  'tr',
  'vi',
  'th',
  'id',
]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
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

export const localeFlags: Record<Locale, string> = {
  'en': '🇺🇸',
  'zh-cn': '🇨🇳',
  'zh-tw': '🇹🇼',
  'es': '🇪🇸',
  'fr': '🇫🇷',
  'de': '🇩🇪',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'pt': '🇵🇹',
  'it': '🇮🇹',
  'ru': '🇷🇺',
  'ar': '🇸🇦',
  'nl': '🇳🇱',
  'pl': '🇵🇱',
  'tr': '🇹🇷',
  'vi': '🇻🇳',
  'th': '🇹🇭',
  'id': '🇮🇩',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment
  }
  return defaultLocale
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && isValidLocale(firstSegment)) {
    return '/' + segments.slice(1).join('/')
  }
  return pathname
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (cleanPath === '/') {
    return locale === defaultLocale ? '/' : `/${locale}`
  }
  return locale === defaultLocale ? cleanPath : `/${locale}${cleanPath}`
}
