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
  const title = messages.seo?.convertToPng?.title || 'Image to PNG Converter'
  const description = messages.seo?.convertToPng?.description || 'Convert any image to PNG online for free. 100% local conversion, no upload needed.'
  const pagePath = '/convert-to-png'
  const canonical = getCanonicalUrl(pagePath, locale)
  const alternates = languageAlternates(pagePath)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title,
    description,
    keywords: ['image to PNG', 'convert to PNG', 'PNG converter', 'free PNG converter'],
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

export default async function ToPNGPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  const title = t(locale, 'converter.title', { format: 'PNG' })
  const desc = t(locale, 'converter.description', { format: 'PNG' })

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-3">{desc}</p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter outputFormat="png" title={title} description={desc} />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h2>
            <FormatGrid target="png" />
          </div>
        </section>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />

        <SeoContent
          title="About PNG Image Format"
          content={[
            "PNG (Portable Network Graphics) is a lossless image format that supports transparency and high color depth. Unlike JPG, PNG preserves every pixel of your original image without any quality loss, making it perfect for graphics, logos, screenshots, and images that require transparency.",
            "Our PNG converter accepts over 40 input formats including JPG, WebP, GIF, BMP, TIFF, HEIC, AVIF, SVG, and many more. The conversion process is entirely local – your images never leave your device, ensuring complete privacy and security for sensitive content.",
            "PNG's support for alpha channel transparency makes it the preferred format for web graphics, UI elements, and any image that needs to blend seamlessly with different backgrounds. The format also supports 24-bit RGB and 32-bit RGBA color, providing excellent color accuracy.",
            "While PNG files are typically larger than JPG due to lossless compression, they're essential when image quality and transparency are priorities. Our converter optimizes the output to achieve the best balance between quality and file size for your specific needs.",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
