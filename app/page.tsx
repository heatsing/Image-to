import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
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

        {/* Features - 4个优势，错开布局 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Why Choose Our Image Converter?</h2>
            <p className="text-slate-600">Powerful features that make image conversion simple and secure</p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {/* 优势 1: 本地转换 - 左图右文 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-full md:w-1/2">
                <div className="card rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">100% Local Conversion</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All image conversion happens entirely on your device. Your files never leave your computer—no uploads to servers, no data collection, complete privacy and security.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No file uploads required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complete data privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Works offline</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 优势 2: 超快速度 - 左文右图 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-full md:w-1/2">
                <div className="card rounded-2xl p-8 md:p-12 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Lightning Fast Processing</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Convert images in seconds, not minutes. Our optimized conversion engine processes each file in about 1 second, and you can batch process hundreds of images simultaneously.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>~1 second per image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Batch processing support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No waiting in queues</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 优势 3: 完全免费 - 左图右文 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-full md:w-1/2">
                <div className="card rounded-2xl p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">100% Free Forever</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  No hidden fees, no subscriptions, no watermarks. Use our image converter as much as you want, whenever you need it. Completely free with no strings attached.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No signup required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No usage limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No watermarks on output</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 优势 4: 批量处理 - 左文右图 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-full md:w-1/2">
                <div className="card rounded-2xl p-8 md:p-12 bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Batch Processing Power</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Convert multiple images at once with our powerful batch processing feature. Upload hundreds of images and convert them all in one go, saving you hours of manual work.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Process hundreds of images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Individual file status tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Download all at once</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
