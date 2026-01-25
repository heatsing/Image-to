import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import { ALL_CONVERTER_SLUGS } from '@/lib/formats'
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config'
import { addLocaleToPath } from '@/lib/i18n/config'

/**
 * Google Search Console Sitemap
 * 
 * This sitemap includes:
 * - All static pages in all 18 languages
 * - All dynamic converter pages (37 formats × 3 targets × 18 languages = 1,998 pages)
 * - Total: ~2,160 URLs
 * 
 * SEO Features:
 * - Proper priority and changeFrequency for each page type
 * - All language versions included
 * - Canonical URLs for default locale
 * - Optimized for Google Search Console submission
 */
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

  // Generate pages for all locales
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
      })
    })
  })

  // Sort by priority (highest first) for better SEO
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return allPages
}
