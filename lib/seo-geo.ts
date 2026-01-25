/**
 * SEO and Geographic Targeting Configuration
 * For Google Search Console and international SEO
 */

import { type Locale, locales } from './i18n/config'
import { getBaseUrl } from './seo'

/**
 * Geographic targeting for each locale
 * Maps locales to their primary target countries/regions
 */
export const localeGeoMapping: Record<Locale, string[]> = {
  'en': ['US', 'GB', 'CA', 'AU', 'NZ', 'IE'], // English-speaking countries
  'zh-cn': ['CN', 'SG'], // Mainland China, Singapore
  'zh-tw': ['TW', 'HK', 'MO'], // Taiwan, Hong Kong, Macau
  'es': ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE'], // Spanish-speaking countries
  'fr': ['FR', 'BE', 'CH', 'CA', 'LU'], // French-speaking countries
  'de': ['DE', 'AT', 'CH', 'LI'], // German-speaking countries
  'ja': ['JP'], // Japan
  'ko': ['KR'], // South Korea
  'pt': ['PT', 'BR', 'AO', 'MZ'], // Portuguese-speaking countries
  'it': ['IT', 'CH', 'SM', 'VA'], // Italy and regions
  'ru': ['RU', 'BY', 'KZ', 'KG'], // Russian-speaking countries
  'ar': ['SA', 'AE', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'OM', 'QA', 'SY', 'TN', 'YE'], // Arabic-speaking countries
  'nl': ['NL', 'BE'], // Netherlands, Belgium
  'pl': ['PL'], // Poland
  'tr': ['TR', 'CY'], // Turkey, Cyprus
  'vi': ['VN'], // Vietnam
  'th': ['TH'], // Thailand
  'id': ['ID'], // Indonesia
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
 * Generate hreflang mapping for all locales
 * Returns a map of locale -> URL for hreflang tags
 */
export function generateHreflangMap(path: string): Record<string, string> {
  const base = getBaseUrl()
  const hreflangMap: Record<string, string> = {}
  
  locales.forEach((locale) => {
    // Convert locale to hreflang format
    let hreflang: string
    if (locale === 'zh-cn') {
      hreflang = 'zh-CN'
    } else if (locale === 'zh-tw') {
      hreflang = 'zh-TW'
    } else if (locale === 'en') {
      hreflang = 'en-US' // Default to US for English
    } else {
      hreflang = locale
    }
    
    // Build URL with locale
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const url = locale === 'en' && cleanPath === '/' 
      ? base 
      : `${base}/${locale}${cleanPath === '/' ? '' : cleanPath}`
    
    hreflangMap[hreflang] = url
  })
  
  return hreflangMap
}

/**
 * Get geographic targeting information for Google Search Console
 */
export function getGeoInfo(locale: Locale): {
  country: string
  countries: string[]
  hreflang: string
} {
  return {
    country: getPrimaryCountry(locale),
    countries: getTargetCountries(locale),
    hreflang: locale === 'zh-cn' ? 'zh-CN' : locale === 'zh-tw' ? 'zh-TW' : locale === 'en' ? 'en-US' : locale,
  }
}
