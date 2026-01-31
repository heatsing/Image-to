import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { languageAlternates, getCanonicalUrl, getOgLocale, getBaseUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = 'Image to WebP Converter'
  const description = 'Convert any image to WebP online for free. 100% local conversion, no upload needed.'
  const pagePath = '/convert-to-webp'
  const canonical = getCanonicalUrl(pagePath, locale)
  const alternates = languageAlternates(pagePath)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title,
    description,
    keywords: ['image to WebP', 'convert to WebP', 'WebP converter', 'free WebP converter'],
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: TITLE_SUFFIX,
      title,
      description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    alternates: { canonical, languages: alternates },
  }
}

export default async function ToWebPPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  const title = t(locale, 'converter.title', { format: 'WebP' })
  const desc = t(locale, 'converter.description', { format: 'WebP' })

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-3">{desc}</p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter outputFormat="webp" title={title} description={desc} />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h2>
            <FormatGrid target="webp" />
          </div>
        </section>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
