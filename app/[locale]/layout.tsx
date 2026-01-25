import type { Metadata } from 'next'
import '../globals.css'
import { getBaseUrl, SITE_NAME, TITLE_SUFFIX, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS } from '@/lib/seo'
import { type Locale, locales, defaultLocale, isValidLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n'
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
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
      template: `%s | ${TITLE_SUFFIX}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: SITE_NAME, url: baseUrl }],
    creator: SITE_NAME,
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
      title: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Logo`,
        },
      ],
      alternateLocale: locales.map((loc) => (loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`)),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
      description: DEFAULT_DESCRIPTION,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
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
