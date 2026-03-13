import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'
import {
  getBaseUrl,
  SITE_NAME,
  TITLE_SUFFIX,
  languageAlternates,
  getCanonicalUrl,
  getOgLocale,
  getHtmlLang,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from '@/lib/seo'
import { type Locale, locales } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n'

const baseUrl = getBaseUrl()

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const ogLocale = getOgLocale(locale)

  // Get SEO content from translations or defaults
  const seoTitle = messages.seo?.defaultTitle || `Convert images to JPG, WebP, PNG online for free`
  const seoDescription = messages.seo?.defaultDescription || DEFAULT_DESCRIPTION
  const seoKeywords = messages.seo?.defaultKeywords || DEFAULT_KEYWORDS

  // Generate canonical and alternates for root path
  const canonical = getCanonicalUrl('/', locale)
  const alternates = languageAlternates('/')

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
      url: canonical,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical,
      languages: alternates,
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
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const htmlLang = getHtmlLang(locale)

  return (
    <html lang={htmlLang} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W16THKMBJR"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-W16THKMBJR');`}
        </Script>
      </body>
    </html>
  )
}
