import type { Metadata } from 'next'
import '../globals.css'
import { getBaseUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'
import { type Locale, locales, defaultLocale, isValidLocale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const baseUrl = getBaseUrl()

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const lang = locale === 'zh-cn' ? 'zh-CN' : locale === 'zh-tw' ? 'zh-TW' : locale === 'en' ? 'en-US' : locale
  
  // Get SEO content from translations
  const seoTitle = messages.seo?.defaultTitle || `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`
  const seoDescription = messages.seo?.defaultDescription || '100% free online image converter. Convert images to JPG, WebP, or PNG locally—no uploads, no signup. Your files never leave your device.'
  const seoKeywords = messages.seo?.defaultKeywords || [
    'image converter',
    'JPG converter',
    'WebP converter',
    'PNG converter',
    'convert image',
    'image format converter',
    'free image converter',
    'local image conversion',
    'batch image converter'
  ]
  
  // Generate hreflang map for all locales
  const hreflangMap: Record<string, string> = {}
  locales.forEach((loc) => {
    const hreflang = loc === 'zh-cn' ? 'zh-CN' : loc === 'zh-tw' ? 'zh-TW' : loc === 'en' ? 'en-US' : loc
    const url = loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`
    hreflangMap[hreflang] = url
  })
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seoTitle,
      template: `%s | ${TITLE_SUFFIX}`,
    },
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: SITE_NAME, url: baseUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/logo.png',
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      siteName: TITLE_SUFFIX,
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Logo`,
        },
      ],
      alternateLocale: Object.keys(hreflangMap).filter(l => l !== lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages: hreflangMap,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = locale === 'zh-cn' ? 'zh-CN' : locale === 'zh-tw' ? 'zh-TW' : locale === 'en' ? 'en-US' : locale

  return (
    <html lang={lang} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
