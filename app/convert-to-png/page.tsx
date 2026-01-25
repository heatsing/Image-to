import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import type { Metadata } from 'next'
import { getBaseUrl, titleWithSuffix } from '@/lib/seo'

const baseUrl = getBaseUrl()

const pageTitle = 'Convert images to PNG online for free'
export const metadata: Metadata = {
  title: pageTitle,
  description:
    '100% free. Convert images to PNG locally—no uploads, no signup. Your files never leave your device. 40+ formats. Batch convert.',
  keywords: [
    'image to PNG',
    'convert to PNG',
    'PNG converter',
    'image converter',
    'free PNG converter',
    'local image conversion',
  ],
  openGraph: {
    title: titleWithSuffix(pageTitle),
    description: '100% free. Convert images to PNG locally. No uploads, no signup. 40+ formats.',
    url: `${baseUrl}/convert-to-png`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: titleWithSuffix(pageTitle),
    description: '100% free. Convert images to PNG locally. No uploads, no signup.',
  },
  alternates: { canonical: `${baseUrl}/convert-to-png` },
}

export default function ToPNGPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Image to PNG Converter</h2>
          <p className="text-slate-600 mb-3">
            100% free. Convert images to PNG <strong>locally</strong>—no uploads, no signup. Your files never leave your device.
          </p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter
            outputFormat="png"
            title="Image to PNG Converter"
            description="100% free. Convert images to PNG locally—no uploads, no signup."
          />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Supported Formats</h3>
            <FormatGrid target="png" />
          </div>
        </section>

        <BenefitsSection title="Why Use Our PNG Converter?" subtitle="Lossless quality and transparency—convert to PNG locally and for free." />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
