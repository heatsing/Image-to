import type { MetadataRoute } from 'next'
import { getBaseUrl, localizedUrl, languageAlternates, LOCALES } from '@/lib/seo'
import { ALL_CONVERTER_SLUGS } from '@/lib/formats'

/**
 * Sitemap Generator
 *
 * Generates URLs for:
 * - All static pages in all 18 languages
 * - All dynamic converter pages (37 formats × 3 targets × 18 languages)
 *
 * English uses root path (no /en prefix)
 * Other locales use prefix: /zh-cn, /ja, /fr, etc.
 */

// Static pages paths (without locale prefix)
const STATIC_PATHS = [
  '/',
  '/convert-to-jpg',
  '/convert-to-webp',
  '/convert-to-png',
  '/about',
  '/security',
  '/terms',
  '/privacy',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const allPages: MetadataRoute.Sitemap = []

  // Generate static pages for all locales
  STATIC_PATHS.forEach((path) => {
    LOCALES.forEach((locale) => {
      const url = localizedUrl(path, locale)

      // Determine priority and changeFrequency based on page type
      let priority: number
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

      if (path === '/') {
        priority = 1.0
        changeFrequency = 'weekly'
      } else if (path.startsWith('/convert-to-')) {
        priority = 0.9
        changeFrequency = 'weekly'
      } else {
        priority = 0.7
        changeFrequency = 'monthly'
      }

      allPages.push({
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: languageAlternates(path),
        },
      })
    })
  })

  // Generate dynamic converter pages for all locales (e.g., webp-to-jpg, png-to-webp)
  ALL_CONVERTER_SLUGS.forEach((slug) => {
    LOCALES.forEach((locale) => {
      const path = `/${slug}`
      const url = localizedUrl(path, locale)

      allPages.push({
        url,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: languageAlternates(path),
        },
      })
    })
  })

  // Sort by priority (highest first)
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return allPages
}
