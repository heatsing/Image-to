/**
 * SEO utilities for internationalized pages
 * Ensures consistent SEO format across all language versions
 * Enhanced with x-default and comprehensive hreflang support
 */

import type { Metadata } from 'next'
import type { Locale } from './i18n/config'
import { getBaseUrl, TITLE_SUFFIX, SITE_NAME } from './seo'
import { getMessages, t } from './i18n'
import { locales, defaultLocale } from './i18n/config'

const baseUrl = getBaseUrl()

/**
 * Convert locale to Open Graph locale format
 * Follows Facebook/Meta specifications
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
 * Convert locale to hreflang format
 * Uses BCP 47 language tags for proper SEO
 */
export function getHreflang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-Hans'
  if (locale === 'zh-tw') return 'zh-Hant'
  return locale
}

/**
 * Get HTML lang attribute value
 */
export function getHtmlLang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-CN'
  if (locale === 'zh-tw') return 'zh-TW'
  return locale
}

/**
 * Generate hreflang map for all locales
 * Includes x-default for unspecified language preference
 */
export function generateHreflangMap(path: string = ''): Record<string, string> {
  const hreflangMap: Record<string, string> = {}

  // Normalize path
  const normalizedPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`

  locales.forEach((locale) => {
    const hreflang = getHreflang(locale)
    const url = locale === defaultLocale && normalizedPath === ''
      ? baseUrl
      : `${baseUrl}/${locale}${normalizedPath}`
    hreflangMap[hreflang] = url
  })

  // Add x-default pointing to English (default) version
  // This helps search engines understand which version to show for unmatched languages
  const xDefaultUrl = normalizedPath === '' ? baseUrl : `${baseUrl}${normalizedPath}`
  hreflangMap['x-default'] = xDefaultUrl

  return hreflangMap
}

/**
 * Generate standardized metadata for pages
 * Ensures consistent SEO format across all language versions
 * Includes comprehensive OpenGraph and Twitter Card support
 */
export function generatePageMetadata({
  locale,
  title,
  description,
  keywords,
  path = '',
  imageUrl,
  noIndex = false,
}: {
  locale: Locale
  title: string
  description: string
  keywords?: string[]
  path?: string
  imageUrl?: string
  noIndex?: boolean
}): Metadata {
  const messages = getMessages(locale)
  const ogLocale = getOgLocale(locale)
  const htmlLang = getHtmlLang(locale)

  // Normalize path - ensure it starts with / if not empty
  const normalizedPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`

  // Generate canonical URL
  const canonicalUrl = locale === defaultLocale && normalizedPath === ''
    ? baseUrl
    : `${baseUrl}/${locale}${normalizedPath}`

  // Use translated SEO keywords if available, otherwise use provided keywords
  const seoKeywords = keywords || messages.seo?.defaultKeywords || []

  // Don't add suffix here - layout.tsx template handles it
  const fullTitle = title

  // Generate hreflang map (includes x-default)
  const hreflangMap = generateHreflangMap(normalizedPath)

  // Default image
  const ogImage = imageUrl || `${baseUrl}/logo.png`

  // Get alternate locales for OpenGraph (exclude current locale and x-default)
  const alternateOgLocales = locales
    .filter(l => l !== locale)
    .map(l => getOgLocale(l))

  return {
    title: fullTitle,
    description,
    keywords: seoKeywords,
    authors: [{ name: SITE_NAME, url: baseUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      siteName: TITLE_SUFFIX,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${title}`,
        },
      ],
      alternateLocale: alternateOgLocales,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@sckde',
      site: '@sckde',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangMap,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'technology',
  }
}

/**
 * Generate JSON-LD structured data for WebApplication
 */
export function generateWebAppJsonLd(locale: Locale, title: string, description: string) {
  const messages = getMessages(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url: baseUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    inLanguage: getHtmlLang(locale),
    isAccessibleForFree: true,
    featureList: [
      'Convert images to JPG',
      'Convert images to WebP',
      'Convert images to PNG',
      'Batch image conversion',
      'Local processing - no upload required',
    ],
  }
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  }
}

/**
 * Generate JSON-LD structured data for WebSite with search action
 */
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
