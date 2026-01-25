/**
 * SEO utilities for internationalized pages
 * Ensures consistent SEO format across all language versions
 */

import type { Metadata } from 'next'
import type { Locale } from './i18n/config'
import { getBaseUrl, TITLE_SUFFIX } from './seo'
import { getMessages, t } from './i18n'
import { locales, defaultLocale } from './i18n/config'

const baseUrl = getBaseUrl()

/**
 * Convert locale to Open Graph locale format
 */
export function getOgLocale(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh_CN'
  if (locale === 'zh-tw') return 'zh_TW'
  if (locale === 'en') return 'en_US'
  // Convert locale to og:locale format (e.g., 'es' -> 'es_ES', 'fr' -> 'fr_FR')
  const parts = locale.split('-')
  if (parts.length === 2) {
    return `${parts[0]}_${parts[1].toUpperCase()}`
  }
  return `${locale}_${locale.toUpperCase()}`
}

/**
 * Convert locale to hreflang format
 */
export function getHreflang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-CN'
  if (locale === 'zh-tw') return 'zh-TW'
  if (locale === 'en') return 'en-US'
  return locale
}

/**
 * Generate hreflang map for all locales
 */
export function generateHreflangMap(path: string = ''): Record<string, string> {
  const hreflangMap: Record<string, string> = {}
  locales.forEach((locale) => {
    const hreflang = getHreflang(locale)
    const url = locale === defaultLocale && path === ''
      ? baseUrl
      : `${baseUrl}/${locale}${path}`
    hreflangMap[hreflang] = url
  })
  return hreflangMap
}

/**
 * Generate standardized metadata for pages
 * Ensures consistent SEO format across all language versions
 */
export function generatePageMetadata({
  locale,
  title,
  description,
  keywords,
  path = '',
  imageUrl,
}: {
  locale: Locale
  title: string
  description: string
  keywords?: string[]
  path?: string
  imageUrl?: string
}): Metadata {
  const messages = getMessages(locale)
  const ogLocale = getOgLocale(locale)
  
  // Normalize path - ensure it starts with / if not empty
  const normalizedPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`
  
  // Generate canonical URL
  const canonicalUrl = locale === defaultLocale && normalizedPath === ''
    ? baseUrl
    : `${baseUrl}/${locale}${normalizedPath}`
  
  // Use translated SEO keywords if available, otherwise use provided keywords
  const seoKeywords = keywords || messages.seo?.defaultKeywords || []
  
  // Format title with suffix
  const fullTitle = title.includes(TITLE_SUFFIX) ? title : `${title} | ${TITLE_SUFFIX}`
  
  // Generate hreflang map
  const hreflangMap = generateHreflangMap(normalizedPath)
  
  // Default image
  const ogImage = imageUrl || `${baseUrl}/logo.png`
  
  return {
    title: fullTitle,
    description,
    keywords: seoKeywords,
    authors: [{ name: messages.common.siteName, url: baseUrl }],
    creator: messages.common.siteName,
    publisher: messages.common.siteName,
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
          alt: `${messages.common.siteName} - ${title}`,
        },
      ],
      alternateLocale: Object.keys(hreflangMap).filter(l => l !== getHreflang(locale)),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangMap,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
