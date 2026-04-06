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
  const title = messages.seo?.convertToPng?.title || 'Image to PNG Converter'
  const description =
    messages.seo?.convertToPng?.description ||
    'Convert any image to PNG online for free. 100% local conversion, no upload needed.'
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
  const content = buildTargetLandingContent('png')
  const relatedGuides = getRelevantGuideSlugsForFormats(['png'])
  const relatedTopics = getRelevantTopicSlugsForFormats(['png'])

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
        <SeoContent title={content.introTitle} content={content.introParagraphs} />
        <CardSection
          title="Why PNG is still essential"
          description="PNG remains the safest target when you need crisp raster quality or transparent backgrounds."
          items={content.keyPoints}
        />
        <ListSection
          title="How to convert any image to PNG"
          description="This route is ideal when the destination format is known before the source format matters."
          items={content.steps}
          ordered
        />
        <ListSection
          title="PNG conversion tips"
          description="Check these points before using PNG as the final delivery format."
          items={content.tips}
        />
        <RelatedLinksSection
          title="Top image to PNG routes"
          description="These are the source formats that most often need a PNG output."
          locale={locale}
          slugs={content.featuredConversions}
        />
        <GuideLinksSection
          title="PNG guides and comparisons"
          description="Use these articles when the real question is about transparency, sharpness, or when PNG is worth the larger file."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title="PNG workflow topics"
          description="These pages cover transparent assets, screenshot handling, and publishing tasks where PNG often stays in the workflow."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={content.faqItems}
          title="Image to PNG FAQ"
          subtitle="Practical answers for users who need transparency, sharp graphics, or a cleaner delivery format."
        />
      </main>
      <Footer />
    </div>
  )
}
