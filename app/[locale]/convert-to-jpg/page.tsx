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
  const title = messages.seo?.convertToJpg?.title || 'Image to JPG Converter'
  const description =
    messages.seo?.convertToJpg?.description ||
    'Convert any image to JPG online for free. 100% local conversion, no upload needed.'
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
  const content = buildTargetLandingContent('jpg')
  const relatedGuides = getRelevantGuideSlugsForFormats(['jpg'])
  const relatedTopics = getRelevantTopicSlugsForFormats(['jpg'])

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
        <SeoContent title={content.introTitle} content={content.introParagraphs} />
        <CardSection
          title="Why JPG stays a core delivery format"
          description="Use JPG when compatibility and lightweight photo delivery matter more than preserving every original pixel."
          items={content.keyPoints}
        />
        <ListSection
          title="How to convert any image to JPG"
          description="This is the target-first workflow for users who already know the final output should be JPG."
          items={content.steps}
          ordered
        />
        <ListSection
          title="JPG conversion tips"
          description="Use these checks to keep file size and visual quality in balance."
          items={content.tips}
        />
        <RelatedLinksSection
          title="Top image to JPG routes"
          description="These are the strongest source formats to convert into JPG."
          locale={locale}
          slugs={content.featuredConversions}
        />
        <GuideLinksSection
          title="JPG guides and comparisons"
          description="Read these before converting if you want the strategy behind when JPG is the right destination."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title="JPG workflow topics"
          description="These pages cover uploads, sharing, and file-size decisions that often end with a JPG copy."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={content.faqItems}
          title="Image to JPG FAQ"
          subtitle="Answers for users who need a JPG-first workflow without worrying about the source format."
        />
      </main>
      <Footer />
    </div>
  )
}
