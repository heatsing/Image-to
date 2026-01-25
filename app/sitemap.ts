import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import { ALL_CONVERTER_SLUGS } from '@/lib/formats'
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config'
import { addLocaleToPath } from '@/lib/i18n/config'

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
      
      allPages.push({
        url: fullUrl,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/convert-to-') ? 0.9 : 0.7,
      })
    })

    // Add dynamic slug pages for each locale
    ALL_CONVERTER_SLUGS.forEach((slug) => {
      const url = addLocaleToPath(`/${slug}`, locale)
      allPages.push({
        url: `${base}${url}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })
    })
  })

  return allPages
}
