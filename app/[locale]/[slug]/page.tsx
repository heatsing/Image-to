import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import SeoContent from '@/components/SeoContent'
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
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getBaseUrl,
  languageAlternates,
  getCanonicalUrl,
  getOgLocale,
  SITE_NAME,
  TITLE_SUFFIX,
} from '@/lib/seo'
import {
  buildConversionMetadataBase,
  generateOpenGraphTitle,
  generateOpenGraphDescription,
  generateTwitterTitle,
  generateTwitterDescription,
  generateRobotsMeta,
  generateStructuredData,
} from '@/lib/seo/metadata-engine'
import Script from 'next/script'

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
  const base = buildConversionMetadataBase(slug, locale, source, target)
  const ogTitle = generateOpenGraphTitle(source, target, slug)
  const ogDescription = generateOpenGraphDescription(source, target, slug)
  const twitterTitle = generateTwitterTitle(source, target, slug)
  const twitterDescription = generateTwitterDescription(source, target, slug)

  // Conversion pages are already filtered for indexability in sitemap layer;
  // here we keep all pages functional and control indexation via robots.
  const indexable = true

  const keywords = [
    `${base.fromName} to ${base.toName}`,
    `${base.fromName} to ${base.toName} converter`,
    `convert ${base.fromName} to ${base.toName}`,
    `${base.fromName.toLowerCase()} to ${base.toName.toLowerCase()}`,
    `${base.fromName} converter`,
    `${base.toName} converter`,
    'free image converter',
    'online converter',
    'local image conversion',
  ]

  return {
    title: base.title,
    description: base.description,
    robots: generateRobotsMeta(indexable),
    keywords,
    openGraph: {
      type: 'website',
      locale: base.ogLocale,
      url: base.canonical,
      siteName: TITLE_SUFFIX,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: `${base.baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: [`${base.baseUrl}/logo.png`],
    },
    alternates: {
      canonical: base.canonical,
      languages: base.alternates,
    },
  }
}

export default async function ConverterSlugPage({ params }: Props) {
  const { locale, slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed) notFound()

  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const messages = getMessages(locale)

  // Use specific format keywords: "WebP to JPG Converter"
  const title = `${from} to ${to} Converter`
  const desc = `Convert ${from} to ${to} online for free. 100% local conversion, no upload needed.`

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Script
        id="conversion-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData(slug, locale, source, target, getCanonicalUrl(`/${slug}`, locale), desc)
          ),
        }}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
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
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h2>
            <FormatGrid target={target} />
          </div>
        </section>

        <BenefitsSection
          title={t(locale, 'benefits.title')}
          subtitle={t(locale, 'benefits.subtitle')}
        />
        <FAQ />

        <SeoContent
          title={`About ${from} to ${to} Conversion`}
          content={[
            `Converting ${from} to ${to} is a common task for many users who need to optimize their images for different purposes. Our free online ${from} to ${to} converter makes this process quick and easy, with all processing done directly in your browser for maximum privacy and security.`,
            `${from} files are widely used across various platforms and applications. By converting to ${to} format, you can take advantage of ${to}'s specific benefits such as better compression, wider compatibility, or specialized features that suit your needs.`,
            `Our converter supports high-quality conversion with customizable settings. You can adjust the output quality to balance file size and image clarity according to your requirements. Whether you're preparing images for web use, print, or archival purposes, our tool delivers excellent results.`,
            `The conversion process is instant and works entirely offline once the page loads. Your ${from} files never leave your device, making this the most secure way to convert sensitive or private images. No registration, no uploads, no waiting – just fast, reliable image conversion.`,
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
