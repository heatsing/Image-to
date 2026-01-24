import Navigation from '@/components/Navigation'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import {
  ALL_CONVERTER_SLUGS,
  parseConverterSlug,
  slugToLabel,
  getTargetLabel,
} from '@/lib/formats'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return ALL_CONVERTER_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed) return { title: 'Not Found' }
  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const title = `${from} to ${to} Converter - Free Online Tool`
  const description = `100% free. Convert ${from} to ${to} locally—no uploads, no signup. Your files never leave your device.`
  return { title, description }
}

export default async function ConverterSlugPage({ params }: Props) {
  const { slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed) notFound()

  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const title = `${from} to ${to} Converter`
  const desc = `100% free. Convert ${from} to ${to} locally—no uploads, no signup. Your files never leave your device.`

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-600 mb-3">
            100% free. Convert {from} to {to}{' '}
            <strong>locally</strong>—no uploads, no signup. Your files never
            leave your device.
          </p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter
            outputFormat={target}
            title={title}
            description={desc}
          />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Supported Formats
            </h3>
            <FormatGrid target={target} />
          </div>
        </section>

        <section className="mt-12 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Local conversion
              </h4>
              <p className="text-xs text-slate-600">
                Conversion runs on your device only. Files never leave your
                computer—no uploads, no servers.
              </p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-slate-900 mb-1">Super Fast</h4>
              <p className="text-xs text-slate-600">
                Each file costs about 1 second for conversion. Batch process
                hundreds of images at once.
              </p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Fully Functional
              </h4>
              <p className="text-xs text-slate-600">
                Handles all jobs involved with image to {to} conversion. From
                any format to {to}.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto py-6 flex-shrink-0">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2025 Image to {to} Converter - 100% Free Online Tool</p>
          <p className="text-xs mt-2">
            No signup · No uploads · 100% local conversion in your browser
          </p>
        </div>
      </footer>
    </div>
  )
}
