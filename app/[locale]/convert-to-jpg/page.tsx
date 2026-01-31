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
  const title = 'Image to JPG Converter'
  const description = 'Convert any image to JPG online for free. 100% local conversion, no upload needed.'
  const pagePath = '/convert-to-jpg'
  const canonical = getCanonicalUrl(pagePath, locale)
  const alternates = languageAlternates(pagePath)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title,
    description,
    keywords: ['image to JPG', 'convert to JPG', 'JPG converter', 'free JPG converter'],
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

export default async function ToJPGPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  const title = t(locale, 'converter.title', { format: 'JPG' })
  const desc = t(locale, 'converter.description', { format: 'JPG' })

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-3">{desc}</p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter outputFormat="jpg" title={title} description={desc} />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h2>
            <FormatGrid target="jpg" />
          </div>
        </section>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />

        <SeoContent
          title="About JPG Image Format"
          content={[
            "JPG (also known as JPEG) is one of the most widely used image formats in the world. Developed by the Joint Photographic Experts Group, JPG uses lossy compression to reduce file sizes while maintaining acceptable image quality. This makes it ideal for photographs, web images, and any scenario where file size matters.",
            "Our JPG converter supports over 40 input formats including PNG, WebP, GIF, BMP, TIFF, HEIC, AVIF, SVG, and more. Whether you're converting a single image or batch processing hundreds of files, our tool handles it efficiently with all processing done locally in your browser.",
            "JPG format is universally supported across all devices, operating systems, and applications. It's the standard format for digital cameras, social media platforms, and email attachments. By converting your images to JPG, you ensure maximum compatibility and easy sharing.",
            "The converter allows you to adjust quality settings to find the perfect balance between file size and image clarity. Higher quality settings preserve more detail but result in larger files, while lower settings create smaller files suitable for web use and quick sharing.",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
