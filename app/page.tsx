import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { getBaseUrl, DEFAULT_KEYWORDS } from '@/lib/seo'
import { FAQ_DATA } from '@/lib/faq-data'

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: 'Image Converter - Free Online Tool',
  description:
    '100% free online image converter. Convert images to JPG, WebP, or PNG locally—no uploads, no signup. Your files never leave your device. Batch convert 40+ formats.',
  keywords: [
    ...DEFAULT_KEYWORDS,
    'convert to JPG',
    'convert to WebP',
    'convert to PNG',
    'batch image converter',
  ],
  openGraph: {
    title: 'Image Converter - Free Online Tool',
    description:
      '100% free. Convert images to JPG, WebP, or PNG locally. No uploads, no signup. Batch convert 40+ formats.',
    url: baseUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Converter - Free Online Tool',
    description: '100% free. Convert images to JPG, WebP, or PNG locally. No uploads, no signup.',
  },
  alternates: { canonical: baseUrl },
}

function homeJsonLd() {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Converter',
    description:
      'Free online tool to convert images to JPG, WebP, or PNG. 100% local conversion—no uploads, no signup.',
    url: baseUrl,
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

export default function Home() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Image Format Converter</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert images to JPG, WebP, or PNG. 100% free and secure. <strong>All conversion happens locally</strong>—your files never leave your device.
          </p>
        </div>

        {/* Converter Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/convert-to-jpg"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to JPG</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert any image format to JPG. Perfect for photos and web use.
            </p>
            <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/convert-to-webp"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to WebP</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert images to WebP for smaller file sizes and faster loading.
            </p>
            <span className="inline-flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/convert-to-png"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to PNG</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert images to PNG for lossless quality and transparency support.
            </p>
            <span className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
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
