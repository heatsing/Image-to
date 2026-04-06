import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import SeoContent from '@/components/SeoContent'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import CardSection from '@/components/CardSection'
import ListSection from '@/components/ListSection'
import ComparisonSection from '@/components/ComparisonSection'
import RelatedLinksSection from '@/components/RelatedLinksSection'
import GuideLinksSection from '@/components/GuideLinksSection'
import TopicLinksSection from '@/components/TopicLinksSection'
import { parseConverterSlug, slugToLabel, getTargetLabel } from '@/lib/formats'
import { type Locale, locales } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCanonicalUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'
import {
  buildConversionMetadataBase,
  generateOpenGraphTitle,
  generateOpenGraphDescription,
  generateTwitterTitle,
  generateTwitterDescription,
  generateRobotsMeta,
  generateStructuredData,
} from '@/lib/seo/metadata-engine'
import { buildConversionPageContent } from '@/lib/seo/page-content'
import { getRelevantGuideSlugsForFormats } from '@/lib/seo/guides'
import { getRelevantTopicSlugsForFormats } from '@/lib/seo/topics'
import { INDEXED_CONVERTER_SLUGS, shouldIndexConversion } from '@/lib/seo/url-quality'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return INDEXED_CONVERTER_SLUGS.flatMap((slug) => locales.map((locale) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const parsed = parseConverterSlug(slug)
  if (!parsed || !shouldIndexConversion(parsed.source, parsed.target)) return { title: 'Not Found' }

  const { source, target } = parsed
  const base = buildConversionMetadataBase(slug, locale, source, target)
  const ogTitle = generateOpenGraphTitle(source, target, slug)
  const ogDescription = generateOpenGraphDescription(source, target, slug)
  const twitterTitle = generateTwitterTitle(source, target, slug)
  const twitterDescription = generateTwitterDescription(source, target, slug)

  return {
    title: base.title,
    description: base.description,
    robots: generateRobotsMeta(true),
    keywords: [
      `${base.fromName} to ${base.toName}`,
      `${base.fromName} to ${base.toName} converter`,
      `convert ${base.fromName} to ${base.toName}`,
      `${base.fromName} converter`,
      `${base.toName} converter`,
      'free image converter',
      'online converter',
      'local image conversion',
    ],
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
  if (!parsed || !shouldIndexConversion(parsed.source, parsed.target)) notFound()

  const { source, target } = parsed
  const from = slugToLabel(source)
  const to = getTargetLabel(target)
  const messages = getMessages(locale)
  const content = buildConversionPageContent(source, target)
  const relatedGuides = getRelevantGuideSlugsForFormats([source, target])
  const relatedTopics = getRelevantTopicSlugsForFormats([source, target])
  const title = `${from} to ${to} Converter`
  const desc = `Convert ${from} to ${to} online for free. 100% local conversion, no upload needed.`

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData(
              slug,
              locale,
              source,
              target,
              getCanonicalUrl(`/${slug}`, locale),
              desc,
              content.faqItems
            )
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
          <UniversalImageConverter outputFormat={target} title={title} description={desc} />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h2>
            <FormatGrid target={target} />
          </div>
        </section>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <SeoContent title={content.introTitle} content={content.introParagraphs} />
        <CardSection
          title={`Key decisions when converting ${from} to ${to}`}
          description="Use these checks to decide whether this format change is the right one for the final destination."
          items={content.keyPoints}
        />
        <ListSection
          title={`${from} to ${to} use cases`}
          description="These are the most common situations where this route is worth using."
          items={content.useCases}
        />
        <ComparisonSection
          title={`${from} vs ${to}`}
          sourceLabel={from}
          targetLabel={to}
          rows={content.comparisonRows}
        />
        <ListSection
          title={`How to convert ${from} to ${to}`}
          description="This is the practical browser-based workflow used by the tool on this page."
          items={content.steps}
          ordered
        />
        <ListSection
          title={`${to} output tips`}
          description="Run through these checks before publishing or sending the converted file."
          items={content.tips}
        />
        <RelatedLinksSection
          title={`More ${from} conversion routes`}
          description={`If ${from} is a recurring source format in your workflow, these are the next routes to keep handy.`}
          locale={locale}
          slugs={content.sourceRelated}
        />
        <RelatedLinksSection
          title={`More ways to create ${to}`}
          description={`These are the strongest source formats that also convert well into ${to}.`}
          locale={locale}
          slugs={content.targetRelated}
        />
        <GuideLinksSection
          title={`Guides related to ${from} and ${to}`}
          description="Use these articles if you want a format recommendation, workflow answer, or comparison before converting."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title={`Workflow topics related to ${from} and ${to}`}
          description="Use these topic pages when the job is really about fixing uploads, shrinking files, or preparing assets for a specific destination."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={content.faqItems}
          title={`${from} to ${to} FAQ`}
          subtitle="Practical answers about quality, compatibility, and when this conversion route is the right choice."
        />
      </main>
      <Footer />
    </div>
  )
}
