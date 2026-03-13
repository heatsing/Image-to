import { NextResponse } from 'next/server'
import { LOCALES, localizedUrl } from '@/lib/seo'

const ROOT_ONLY = ['/']

export async function GET() {
  const now = new Date().toISOString()

  const urls: string[] = []

  ROOT_ONLY.forEach((path) => {
    LOCALES.forEach((locale) => {
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

