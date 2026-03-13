import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/seo'

export async function GET() {
  const base = getBaseUrl()
  const sitemaps = [
    'sitemap-core.xml',
    'sitemap-conversions.xml',
    'sitemap-hubs.xml',
    'sitemap-locales.xml',
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (name) => `  <sitemap>
    <loc>${base}/${name}</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

