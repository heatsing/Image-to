import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SeoContent from '@/components/SeoContent'
import GuideLinksSection from '@/components/GuideLinksSection'
import { type Locale } from '@/lib/i18n/config'
import { addLocaleToPath } from '@/lib/i18n/config'
import { getGuideSlugs } from '@/lib/seo/guides'
import {
  getTopicCategoryLabel,
  getTopicSummaries,
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
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = 'Image Workflow Topics'
  const description =
    'Problem-first pages about shrinking image size, fixing HEIC uploads, preparing transparent logos, optimizing screenshots, and improving image-heavy workflows.'
  const pagePath = '/topics'
  const canonical = getCanonicalUrl(pagePath, locale)
  const alternates = languageAlternates(pagePath)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: TITLE_SUFFIX,
      title,
      description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical,
      languages: alternates,
    },
  }
}

export default async function TopicsIndexPage({ params }: Props) {
  const { locale } = await params
  const topics = getTopicSummaries()
  const featuredGuides = getGuideSlugs().slice(0, 4)
  const categories = ['workflow', 'publishing', 'performance'] as const

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Image Workflow Topics</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Browse practical pages built around real image problems: failed uploads, oversized files, blurry screenshots, transparent logos, and heavy visual templates.
          </p>
        </div>

        <SeoContent
          title="Why these topics exist"
          content={[
            'Many searches are not really asking for a format definition. They are asking how to fix a practical workflow problem, ship faster, or choose the safest next step.',
            'This topic section targets that layer directly with task-first pages about compatibility, publishing, and performance decisions that happen around image conversion.',
            'Use it when the problem starts with a workflow question and only ends with a conversion route after the decision becomes clear.',
          ]}
        />

        <div className="space-y-10">
          {categories.map((category) => {
            const items = topics.filter((topic) => topic.category === category)
            if (!items.length) return null

            return (
              <section key={category}>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-slate-900">{getTopicCategoryLabel(category)}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={addLocaleToPath(`/topics/${topic.slug}`, locale)}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-300"
                    >
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{topic.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{topic.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <GuideLinksSection
          title="Related format guides"
          description="These editorial guides add format strategy and comparisons around the workflow topics above."
          locale={locale}
          slugs={featuredGuides}
        />
      </main>
      <Footer />
    </div>
  )
}
