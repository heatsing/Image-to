import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import SeoContent from '@/components/SeoContent'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import CardSection from '@/components/CardSection'
import ListSection from '@/components/ListSection'
import RelatedLinksSection from '@/components/RelatedLinksSection'
import GuideLinksSection from '@/components/GuideLinksSection'
import TopicLinksSection from '@/components/TopicLinksSection'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import {
  languageAlternates,
  getCanonicalUrl,
  getOgLocale,
  getBaseUrl,
  SITE_NAME,
  TITLE_SUFFIX,
} from '@/lib/seo'
import { buildTargetLandingContent } from '@/lib/seo/page-content'
import { getRelevantGuideSlugsForFormats } from '@/lib/seo/guides'
import { getRelevantTopicSlugsForFormats } from '@/lib/seo/topics'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const title = messages.seo?.convertToWebp?.title || 'Image to WebP Converter'
  const description =
    messages.seo?.convertToWebp?.description ||
    'Convert any image to WebP online for free. 100% local conversion, no upload needed.'
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
  const content = buildTargetLandingContent('webp')
  const relatedGuides = getRelevantGuideSlugsForFormats(['webp'])
  const relatedTopics = getRelevantTopicSlugsForFormats(['webp'])

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
        <SeoContent title={content.introTitle} content={content.introParagraphs} />
        <CardSection
          title="Why WebP is a strong web target"
          description="WebP is usually the best next step when you want smaller delivery files without losing too much flexibility."
          items={content.keyPoints}
        />
        <ListSection
          title="How to convert any image to WebP"
          description="Use this workflow when performance is the destination requirement and the source files may vary."
          items={content.steps}
          ordered
        />
        <ListSection
          title="WebP conversion tips"
          description="Use these checks when you are balancing visual quality against page speed."
          items={content.tips}
        />
        <RelatedLinksSection
          title="Top image to WebP routes"
          description="These are the source formats that most often convert into WebP for delivery."
          locale={locale}
          slugs={content.featuredConversions}
        />
        <GuideLinksSection
          title="WebP guides and comparisons"
          description="Read these guides if you are balancing page speed against compatibility and visual quality."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title="WebP workflow topics"
          description="These pages focus on lighter delivery, page speed, and publishing decisions where WebP is often the next step."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={content.faqItems}
          title="Image to WebP FAQ"
          subtitle="Answers for users optimizing image-heavy pages, product galleries, and documentation assets."
        />
      </main>
      <Footer />
    </div>
  )
}
