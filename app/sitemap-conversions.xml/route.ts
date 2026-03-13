import { NextResponse } from 'next/server'
import { LOCALES, localizedUrl } from '@/lib/seo'
import { ALL_CONVERTER_SLUGS, parseConverterSlug } from '@/lib/formats'
import { shouldIndexConversion } from '@/lib/seo/url-quality'

export async function GET() {
  const now = new Date().toISOString()

  const urls: string[] = []

  ALL_CONVERTER_SLUGS.forEach((slug) => {
    const parsed = parseConverterSlug(slug)
    if (!parsed) return

    const { source, target } = parsed
    if (!shouldIndexConversion(source, target)) return

    LOCALES.forEach((locale) => {
      const path = `/${slug}`
      const loc = localizedUrl(path, locale)
      urls.push(
        `<url>
  <loc>${loc}</loc>
  <lastmod>${now}</lastmod>
</url>`
      )
    })
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

