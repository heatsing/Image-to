import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale, type Locale } from './lib/i18n/config'

/**
 * Enhanced locale detection from Accept-Language header
 * Supports regional variants and proper fallback logic
 */
function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q = '1'] = lang.trim().split(';q=')
      const normalizedCode = code.toLowerCase().trim()
      return { code: normalizedCode, quality: parseFloat(q) || 0 }
    })
    .filter((lang) => lang.quality > 0)
    .sort((a, b) => b.quality - a.quality)

  for (const lang of languages) {
    const code = lang.code

    // Handle Chinese variants with regional specificity
    if (code === 'zh-cn' || code === 'zh-hans' || code === 'zh-hans-cn') {
      return 'zh-cn'
    }
    if (code === 'zh-tw' || code === 'zh-hant' || code === 'zh-hant-tw' || code === 'zh-hk' || code === 'zh-mo') {
      return 'zh-tw'
    }
    if (code === 'zh') {
      // Default Chinese to simplified
      return 'zh-cn'
    }

    // Handle Portuguese variants
    if (code === 'pt-br') {
      return 'pt' // Brazilian Portuguese maps to our pt locale
    }
    if (code.startsWith('pt')) {
      return 'pt'
    }

    // Handle Spanish variants (all map to es)
    if (code.startsWith('es')) {
      return 'es'
    }

    // Handle French variants
    if (code.startsWith('fr')) {
      return 'fr'
    }

    // Handle German variants
    if (code.startsWith('de')) {
      return 'de'
    }

    // Handle English variants
    if (code.startsWith('en')) {
      return 'en'
    }

    // Direct match with our supported locales
    if (isValidLocale(code)) {
      return code as Locale
    }

    // Try base language code (e.g., 'ja-JP' -> 'ja')
    const baseLang = code.split('-')[0]
    if (isValidLocale(baseLang)) {
      return baseLang as Locale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exclude SEO files and system files from locale redirection
  // These files must be accessible at root level for search engines
  const seoFiles = ['/sitemap.xml', '/robots.txt', '/sitemap', '/robots']
  const isSeoFile = seoFiles.includes(pathname) ||
                    pathname.endsWith('.xml') ||
                    pathname.endsWith('.txt') ||
                    pathname === '/sitemap' ||
                    pathname === '/robots'

  if (isSeoFile) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Detect locale from Accept-Language header with enhanced detection
  const acceptLanguage = request.headers.get('accept-language')
  const detectedLocale = detectLocaleFromHeader(acceptLanguage)

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
