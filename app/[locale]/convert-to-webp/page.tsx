import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import SeoContent from '@/components/SeoContent'
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
  const messages = getMessages(locale)
  const title = messages.seo?.convertToWebp?.title || 'Image to WebP Converter'
  const description = messages.seo?.convertToWebp?.description || 'Convert any image to WebP online for free. 100% local conversion, no upload needed.'
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

        <SeoContent
          title="About WebP Image Format"
          content={[
            "WebP is a modern image format developed by Google that provides superior compression for images on the web. WebP images are typically 25-35% smaller than equivalent JPG or PNG files while maintaining the same visual quality, making them ideal for websites and applications where loading speed matters.",
            "Our WebP converter supports over 40 input formats including JPG, PNG, GIF, BMP, TIFF, HEIC, AVIF, SVG, and more. All conversion happens directly in your browser using advanced algorithms, ensuring your images remain private and secure throughout the process.",
            "WebP supports both lossy and lossless compression, as well as animation and alpha transparency. This versatility makes it a great all-purpose format that can replace JPG for photographs, PNG for graphics with transparency, and even GIF for simple animations.",
            "All major browsers now support WebP, including Chrome, Firefox, Safari, and Edge. By converting your images to WebP, you can significantly improve your website's loading speed and reduce bandwidth costs while maintaining excellent image quality for your visitors.",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
