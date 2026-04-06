import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isActiveLocale, legacyLocales } from './lib/i18n/config'

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

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  // Redirect /en/* to the canonical unprefixed English URL.
  if (firstSegment === defaultLocale) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/'
    return NextResponse.redirect(redirectUrl, 308)
  }

  // Retire low-priority locales by consolidating them to the default locale URL.
  if (firstSegment && legacyLocales.includes(firstSegment as typeof legacyLocales[number])) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/'
    return NextResponse.redirect(redirectUrl, 308)
  }

  // Active non-default locale prefixes remain public.
  if (firstSegment && isActiveLocale(firstSegment)) {
    return NextResponse.next()
  }

  // No locale prefix = English (default)
  // Rewrite to /en internally, but keep URL clean without /en
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
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
