import type { Metadata } from 'next'
import '../globals.css'
import { getBaseUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'
import { type Locale, locales, defaultLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n'
import { getOgLocale, getHreflang, getHtmlLang, generateHreflangMap } from '@/lib/seo-i18n'

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
  const ogLocale = getOgLocale(locale)

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

  // Generate hreflang map for all locales (includes x-default)
  const hreflangMap = generateHreflangMap('')

  // Get alternate locales for OpenGraph (exclude current and x-default)
  const alternateOgLocales = locales
    .filter(l => l !== locale)
    .map(l => getOgLocale(l))

  const canonicalUrl = locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`

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
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/logo.png',
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
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
      alternateLocale: alternateOgLocales,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/logo.png`],
      creator: '@sckde',
      site: '@sckde',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangMap,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'technology',
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const htmlLang = getHtmlLang(locale)

  return (
    <html lang={htmlLang} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
