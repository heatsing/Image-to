import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './lib/i18n/config'

/**
 * Middleware for locale routing
 * - English is the default language (no prefix needed in URL)
 * - Other languages require explicit locale prefix (e.g., /zh-cn, /ja)
 * - No automatic browser language detection - users choose their language manually
 * - Uses URL rewrite (not redirect) so English URLs stay clean without /en
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exclude SEO files and system files from any processing
  const seoFiles = ['/sitemap.xml', '/robots.txt', '/sitemap', '/robots']
  const isSeoFile = seoFiles.includes(pathname) ||
                    pathname.endsWith('.xml') ||
                    pathname.endsWith('.txt') ||
                    pathname === '/sitemap' ||
                    pathname === '/robots'

  if (isSeoFile) {
    return NextResponse.next()
  }

  // Check if pathname has a valid locale prefix (non-English)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname has a locale prefix, continue (user explicitly chose a language)
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // No locale prefix = English (default)
  // Rewrite to /en internally, but keep URL clean without /en
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt (SEO files - MUST be excluded)
     * - logo.svg, logo.png, icon.svg, etc. (public assets)
     *
     * Important: sitemap.xml and robots.txt must be accessible at root
     * for Google Search Console and other search engines.
     *
     * The negative lookahead excludes:
     * - Paths starting with: api, _next/static, _next/image, favicon.ico
     * - Paths exactly matching: sitemap.xml, robots.txt
     * - Paths ending with: .svg, .png, .jpg, .jpeg, .gif, .webp, .ico, .xml, .txt
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)',
  ],
}
