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
import { type Locale, locales } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo-i18n'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = ALL_CONVERTER_SLUGS.flatMap((slug) =>
    locales.map((locale) => ({ locale, slug }))
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed) return { title: 'Not Found' }
  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const titlePart = t(locale, 'converter.title', { format: to })
  const description = t(locale, 'converter.description', { format: to })
  const url = addLocaleToPath(`/${slug}`, locale)
  const kw = [
    `${from} to ${to}`,
    `convert ${from} to ${to}`,
    `${from} to ${to} converter`,
    'image converter',
    'free image converter',
    'local image conversion',
  ]
  
  return generatePageMetadata({
    locale,
    title: titlePart,
    description,
    keywords: kw,
    path: url.startsWith('/') ? url : `/${url}`,
  })
}

export default async function ConverterSlugPage({ params }: Props) {
  const { locale, slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed) notFound()

  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const messages = getMessages(locale)
  const title = t(locale, 'converter.title', { format: to })
  const desc = t(locale, 'converter.description', { format: to })

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-600 mb-3">{desc}</p>
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
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h3>
            <FormatGrid target={target} />
          </div>
        </section>

        <BenefitsSection
          title={t(locale, 'benefits.title')}
          subtitle={t(locale, 'benefits.subtitle')}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
