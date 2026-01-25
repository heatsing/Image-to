import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBaseUrl, titleWithSuffix } from '@/lib/seo'

const baseUrl = getBaseUrl()
const pageTitle = 'About us'
export const metadata: Metadata = {
  title: pageTitle,
  description:
    'Learn about Image Converter, a free online tool for converting images to JPG, WebP, or PNG. 100% local conversion, no uploads, no signup.',
  openGraph: {
    title: titleWithSuffix(pageTitle),
    description: 'Learn about Image Converter, a free online tool for converting images.',
    url: `${baseUrl}/about`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/about` },
}

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn more about Image Converter and our mission to provide free, secure image conversion tools.
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Image Converter is dedicated to providing a free, secure, and user-friendly tool for converting images between different formats. We believe that image conversion should be simple, fast, and completely private.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our platform supports 40+ image formats and allows you to convert images to JPG, WebP, or PNG with just a few clicks. All processing happens locally in your browser—your files never leave your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>100% Local Processing:</strong> All conversions happen on your device. No files are uploaded to our servers.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Completely Free:</strong> No signup required, no hidden fees, no watermarks on your converted images.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Fast & Efficient:</strong> Convert images in seconds with our optimized conversion engine.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Batch Processing:</strong> Convert multiple images simultaneously to save time.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Wide Format Support:</strong> Support for 40+ image formats including WebP, PNG, JPEG, SVG, BMP, AVIF, HEIC, and more.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy & Security</h2>
            <p className="text-slate-600 leading-relaxed">
              Your privacy is our top priority. Since all image conversion happens locally in your browser, we never see, store, or have access to your files. There are no cookies, no tracking, and no data collection. Your images remain completely private and secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you! Please visit our{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">
                Contact Us
              </Link>{' '}
              page to get in touch.
            </p>
          </section>
        </div>

        <BenefitsSection title="Why Choose Image Converter?" subtitle="Free, local, and secure—image conversion the way it should be." />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
