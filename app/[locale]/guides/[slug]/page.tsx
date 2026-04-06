import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SeoContent from '@/components/SeoContent'
import CardSection from '@/components/CardSection'
import ListSection from '@/components/ListSection'
import ComparisonSection from '@/components/ComparisonSection'
import FAQ from '@/components/FAQ'
import RelatedLinksSection from '@/components/RelatedLinksSection'
import GuideLinksSection from '@/components/GuideLinksSection'
import TopicLinksSection from '@/components/TopicLinksSection'
import { type Locale, locales } from '@/lib/i18n/config'
import { getGuideBySlug, getGuideCategoryLabel, getGuideSlugs, getRelatedGuideSlugs } from '@/lib/seo/guides'
import { getRelevantTopicSlugsForFormats } from '@/lib/seo/topics'
import { getCanonicalUrl, languageAlternates, getOgLocale, getBaseUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getGuideSlugs().flatMap((slug) => locales.map((locale) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return { title: 'Not Found' }

  const canonical = getCanonicalUrl(`/guides/${slug}`, locale)
  const alternates = languageAlternates(`/guides/${slug}`)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      type: 'article',
      locale: ogLocale,
      url: canonical,
      siteName: TITLE_SUFFIX,
      title: guide.title,
      description: guide.description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical,
      languages: alternates,
    },
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const canonical = getCanonicalUrl(`/guides/${slug}`, locale)
  const baseUrl = getBaseUrl()
  const relatedGuides = getRelatedGuideSlugs(slug)
  const relatedTopics = getRelevantTopicSlugsForFormats(guide.formats)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      url: canonical,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: getCanonicalUrl('/guides', locale) },
        { '@type': 'ListItem', position: 3, name: guide.title, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
            {getGuideCategoryLabel(guide.category)}
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{guide.title}</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">{guide.description}</p>
        </div>

        <SeoContent title={guide.introTitle} content={guide.introParagraphs} />
        <CardSection
          title="Key points"
          description="Use these decisions to simplify the format choice instead of guessing from file extensions."
          items={guide.highlights}
        />
        {guide.comparison ? (
          <ComparisonSection
            title={`${guide.comparison.sourceLabel} vs ${guide.comparison.targetLabel}`}
            sourceLabel={guide.comparison.sourceLabel}
            targetLabel={guide.comparison.targetLabel}
            rows={guide.comparison.rows}
          />
        ) : null}
        <ListSection
          title="Practical takeaways"
          description="Use this checklist when you need to make a fast format decision."
          items={guide.takeaways}
        />
        <RelatedLinksSection
          title="Related conversion tools"
          description="Use these routes when the answer is not just educational and you need to convert files right now."
          locale={locale}
          slugs={guide.relatedConversions}
        />
        <GuideLinksSection
          title="Related guides"
          description="These guides cover adjacent workflow questions and format tradeoffs."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title="Related workflow topics"
          description="These task-first pages cover upload fixes, publishing choices, and performance decisions related to this guide."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={guide.faqItems}
          title="Guide FAQ"
          subtitle="Short answers to the most common follow-up questions around this topic."
        />
      </main>
      <Footer />
    </div>
  )
}
