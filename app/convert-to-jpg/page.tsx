import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/seo'

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: 'Image to JPG Converter - Free Online Tool',
  description:
    '100% free. Convert images to JPG locally—no uploads, no signup. Your files never leave your device. 40+ formats supported. Batch convert.',
  keywords: [
    'image to JPG',
    'convert to JPG',
    'JPG converter',
    'image converter',
    'free JPG converter',
    'local image conversion',
  ],
  openGraph: {
    title: 'Image to JPG Converter - Free Online Tool',
    description: '100% free. Convert images to JPG locally. No uploads, no signup. 40+ formats.',
    url: `${baseUrl}/convert-to-jpg`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to JPG Converter - Free Online Tool',
    description: '100% free. Convert images to JPG locally. No uploads, no signup.',
  },
  alternates: { canonical: `${baseUrl}/convert-to-jpg` },
}

export default function ToJPGPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Image to JPG Converter</h2>
          <p className="text-slate-600 mb-3">
            100% free. Convert images to JPG <strong>locally</strong>—no uploads, no signup. Your files never leave your device.
          </p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter
            outputFormat="jpg"
            title="Image to JPG Converter"
            description="100% free. Convert images to JPG locally—no uploads, no signup."
          />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Supported Formats</h3>
            <FormatGrid target="jpg" />
          </div>
        </section>

        <BenefitsSection title="Why Use Our JPG Converter?" subtitle="Simple, fast, and secure image conversion—right in your browser." />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
