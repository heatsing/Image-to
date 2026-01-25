import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale, getLocaleFromPath } from './lib/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Exclude SEO files and system files from locale redirection
  const seoFiles = ['/sitemap.xml', '/robots.txt', '/sitemap', '/robots']
  if (seoFiles.includes(pathname) || pathname.endsWith('.xml') || pathname.endsWith('.txt')) {
    return NextResponse.next()
  }
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Try to detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  let detectedLocale = defaultLocale

  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,zh-CN;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q = '1'] = lang.trim().split(';q=')
        return { code: code.split('-')[0].toLowerCase(), quality: parseFloat(q) }
      })
      .sort((a, b) => b.quality - a.quality)

    // Try to match with our supported locales
    for (const lang of languages) {
      // Exact match (e.g., 'en', 'zh')
      if (isValidLocale(lang.code)) {
        detectedLocale = lang.code as typeof detectedLocale
        break
      }
      // Try zh-cn/zh-tw for 'zh'
      if (lang.code === 'zh') {
        // Default to zh-cn, could be enhanced with region detection
        detectedLocale = 'zh-cn'
        break
      }
    }
  }

  // Redirect to locale-prefixed path
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt (SEO files)
     * - logo.svg, logo.png, icon.svg, etc. (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)',
  ],
}
