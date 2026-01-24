import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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

        <section className="mt-12 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-slate-900 mb-1">Local conversion</h4>
              <p className="text-xs text-slate-600">Conversion runs on your device only. Files never leave your computer—no uploads, no servers.</p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-slate-900 mb-1">Super Fast</h4>
              <p className="text-xs text-slate-600">Each file costs about 1 second for conversion. Batch process hundreds of images at once.</p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-slate-900 mb-1">Fully Functional</h4>
              <p className="text-xs text-slate-600">Handles all jobs involved with image to JPG conversion. From any format to JPG.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
