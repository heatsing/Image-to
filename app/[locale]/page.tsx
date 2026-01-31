import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'
import { generatePageMetadata } from '@/lib/seo-i18n'
import { FAQ_DATA } from '@/lib/faq-data'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const homeTitle = messages.seo?.homeTitle || t(locale, 'home.title')
  const homeDesc = messages.seo?.homeDescription || t(locale, 'home.subtitle')
  const homeKeywords = messages.seo?.homeKeywords || [
    'image converter',
    'convert to JPG',
    'convert to WebP',
    'convert to PNG',
    'batch image converter',
    'free image converter',
    'online image converter',
  ]

  return generatePageMetadata({
    locale,
    title: homeTitle,
    description: homeDesc,
    keywords: homeKeywords,
    path: locale === 'en' ? '' : `/${locale}`,
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  const baseUrl = getBaseUrl()

  function homeJsonLd() {
    const webApp = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: messages.common.siteName,
      description: t(locale, 'home.subtitle'),
      url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Convert to JPG, WebP, PNG',
        '40+ input formats supported',
        '100% local conversion',
        'Batch processing',
        'No signup, no uploads',
      ],
    }
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }
    return [webApp, faq]
  }

  const jsonLd = homeJsonLd()

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {jsonLd.map((data, i) => (
        <Script
          key={i}
          id={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          strategy="afterInteractive"
        />
      ))}
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{messages.home.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{messages.home.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href={addLocaleToPath('/convert-to-jpg', locale)}
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{messages.nav.imagesToJpg}</h2>
            <p className="text-slate-600 text-sm mb-4">{messages.home.convertToJpg}</p>
            <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              {messages.home.convertNow}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href={addLocaleToPath('/convert-to-webp', locale)}
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{messages.nav.imagesToWebp}</h2>
            <p className="text-slate-600 text-sm mb-4">{messages.home.convertToWebp}</p>
            <span className="inline-flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              {messages.home.convertNow}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href={addLocaleToPath('/convert-to-png', locale)}
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{messages.nav.imagesToPng}</h2>
            <p className="text-slate-600 text-sm mb-4">{messages.home.convertToPng}</p>
            <span className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              {messages.home.convertNow}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        <BenefitsSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
