import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SeoContent from '@/components/SeoContent'
import CardSection from '@/components/CardSection'
import ListSection from '@/components/ListSection'
import FAQ from '@/components/FAQ'
import RelatedLinksSection from '@/components/RelatedLinksSection'
import GuideLinksSection from '@/components/GuideLinksSection'
import TopicLinksSection from '@/components/TopicLinksSection'
import { type Locale, locales } from '@/lib/i18n/config'
import {
  getTopicBySlug,
  getTopicCategoryLabel,
  getTopicSlugs,
  getRelatedTopicSlugs,
} from '@/lib/seo/topics'
import {
  getCanonicalUrl,
  languageAlternates,
  getOgLocale,
  getBaseUrl,
  SITE_NAME,
  TITLE_SUFFIX,
} from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getTopicSlugs().flatMap((slug) => locales.map((locale) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return { title: 'Not Found' }

  const canonical = getCanonicalUrl(`/topics/${slug}`, locale)
  const alternates = languageAlternates(`/topics/${slug}`)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title: topic.title,
    description: topic.description,
    openGraph: {
      type: 'article',
      locale: ogLocale,
      url: canonical,
      siteName: TITLE_SUFFIX,
      title: topic.title,
      description: topic.description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical,
      languages: alternates,
    },
  }
}

export default async function TopicDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) notFound()

  const canonical = getCanonicalUrl(`/topics/${slug}`, locale)
  const baseUrl = getBaseUrl()
  const relatedTopics = getRelatedTopicSlugs(slug)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: topic.title,
      description: topic.description,
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
        { '@type': 'ListItem', position: 2, name: 'Topics', item: getCanonicalUrl('/topics', locale) },
        { '@type': 'ListItem', position: 3, name: topic.title, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topic.faqItems.map((item) => ({
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
            {getTopicCategoryLabel(topic.category)}
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{topic.title}</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">{topic.description}</p>
        </div>

        <SeoContent title={topic.introTitle} content={topic.introParagraphs} />
        <CardSection
          title="Core decisions"
          description="These are the checks that matter most before you touch export settings or start trial-and-error converting."
          items={topic.highlights}
        />
        <ListSection
          title="Recommended workflow"
          description="Use this sequence when you want the fastest path to a working result without redoing the task later."
          items={topic.steps}
          ordered
        />
        <ListSection
          title="Common mistakes to avoid"
          description="These are the shortcuts that usually create a second cleanup pass later."
          items={topic.pitfalls}
        />
        <RelatedLinksSection
          title="Recommended conversion routes"
          description="Use these tools when this workflow question turns into a direct conversion task."
          locale={locale}
          slugs={topic.relatedConversions}
        />
        <GuideLinksSection
          title="Related guides"
          description="These guides explain the format strategy behind the task so you can make the next decision faster."
          locale={locale}
          slugs={topic.relatedGuides}
        />
        <TopicLinksSection
          title="Related topics"
          description="Use these adjacent workflow pages if the job expands beyond the first issue you came here to solve."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={topic.faqItems}
          title="Topic FAQ"
          subtitle="Short answers to the most common follow-up questions around this workflow."
        />
      </main>
      <Footer />
    </div>
  )
}
