import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import { ALL_CONVERTER_SLUGS } from '@/lib/formats'
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config'
import { addLocaleToPath } from '@/lib/i18n/config'

/**
 * Google Search Console Sitemap with hreflang support
 *
 * This sitemap includes:
 * - All static pages in all 18 languages with alternates
 * - All dynamic converter pages (37 formats × 3 targets × 18 languages = 1,998 pages)
 * - Total: ~2,160 URLs with full hreflang mapping
 *
 * SEO Features:
 * - Proper priority and changeFrequency for each page type
 * - Full hreflang alternates for international SEO
 * - x-default for unmatched languages
 * - Canonical URLs for default locale
 * - Optimized for Google Search Console submission
 */

/**
 * Convert locale to hreflang format
 */
function getHreflang(locale: Locale): string {
  if (locale === 'zh-cn') return 'zh-Hans'
  if (locale === 'zh-tw') return 'zh-Hant'
  return locale
}

/**
 * Generate alternates (hreflang) for a given path
 */
function generateAlternates(path: string, base: string): Record<string, string> {
  const alternates: Record<string, string> = {}

  locales.forEach((locale) => {
    const hreflang = getHreflang(locale)
    const url = addLocaleToPath(path, locale)
    const fullUrl = locale === defaultLocale && path === '' ? base : `${base}${url}`
    alternates[hreflang] = fullUrl
  })

  // Add x-default pointing to English (default) version
  const defaultUrl = path === '' ? base : `${base}${path}`
  alternates['x-default'] = defaultUrl

  return alternates
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl()
  const now = new Date()

  const staticPaths = [
    '',
    '/convert-to-jpg',
    '/convert-to-webp',
    '/convert-to-png',
    '/about',
    '/security',
    '/terms',
    '/privacy',
    '/contact',
  ]

  const allPages: MetadataRoute.Sitemap = []

  // Generate pages for all locales with alternates
  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      const url = addLocaleToPath(path, locale)
      const fullUrl = locale === defaultLocale && path === '' ? base : `${base}${url}`

      // Determine priority and changeFrequency based on page type
      let priority: number
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

      if (path === '') {
        // Homepage - highest priority
        priority = 1.0
        changeFrequency = 'weekly'
      } else if (path.startsWith('/convert-to-')) {
        // Main converter pages - high priority
        priority = 0.9
        changeFrequency = 'weekly'
      } else {
        // Static content pages - medium priority
        priority = 0.7
        changeFrequency = 'monthly'
      }

      allPages.push({
        url: fullUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: generateAlternates(path, base),
        },
      })
    })

    // Add dynamic slug pages for each locale (e.g., webp-to-jpg, png-to-webp)
    ALL_CONVERTER_SLUGS.forEach((slug) => {
      const url = addLocaleToPath(`/${slug}`, locale)
      allPages.push({
        url: `${base}${url}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8, // Medium-high priority for converter pages
        alternates: {
          languages: generateAlternates(`/${slug}`, base),
        },
      })
    })
  })

  // Sort by priority (highest first) for better SEO
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return allPages
}
