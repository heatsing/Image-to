import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import {
  ALL_CONVERTER_SLUGS,
  parseConverterSlug,
  slugToLabel,
  getTargetLabel,
} from '@/lib/formats'
import { getBaseUrl, titleWithSuffix } from '@/lib/seo'
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
  const baseUrl = getBaseUrl()
  const titlePart = `Convert ${from} to ${to} online for free`
  const title = titleWithSuffix(titlePart)
  const description = `100% free. Convert ${from} to ${to} locally—no uploads, no signup. Your files never leave your device. 40+ formats. Batch convert.`
  const url = `${baseUrl}/${slug}`
  const kw = [
    `${from} to ${to}`,
    `convert ${from} to ${to}`,
    `${from} to ${to} converter`,
    'image converter',
    'free image converter',
  ]
  return {
    title: titlePart,
    description,
    keywords: kw,
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  }
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

        <BenefitsSection
          title={`Why Use Our ${from} to ${to} Converter?`}
          subtitle={`Convert ${from} to ${to} locally—fast, free, and secure.`}
        />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
