import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SeoContent from '@/components/SeoContent'
import TopicLinksSection from '@/components/TopicLinksSection'
import { type Locale } from '@/lib/i18n/config'
import { getCanonicalUrl, languageAlternates, getOgLocale, getBaseUrl, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'
import { getGuideCategoryLabel, getGuideSummaries } from '@/lib/seo/guides'
import { getFeaturedTopicSlugs } from '@/lib/seo/topics'
import { addLocaleToPath } from '@/lib/i18n/config'

type Props = {
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = 'Image Format Guides'
  const description =
    'Editorial guides about image formats, web performance, transparency, ecommerce image workflows, and practical conversion decisions.'
  const pagePath = '/guides'
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

export default async function GuidesIndexPage({ params }: Props) {
  const { locale } = await params
  const guides = getGuideSummaries()
  const featuredTopics = getFeaturedTopicSlugs(4)
  const categories = ['strategy', 'comparison', 'tutorial'] as const

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Image Format Guides</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Read practical guides about image formats, format comparisons, upload compatibility, transparency, and web performance.
          </p>
        </div>

        <SeoContent
          title="Why these guides exist"
          content={[
            'Tool pages solve direct conversion tasks, but many searches are actually about choosing the right format or fixing a workflow problem before conversion even starts.',
            'This guide section targets that intent directly with comparison pages, tutorials, and decision guides built around the most common image-format questions.',
            'Use it when you want a format recommendation, a workflow answer, or a sharper understanding of which conversion path makes the most sense.',
          ]}
        />

        <div className="space-y-10">
          {categories.map((category) => {
            const items = guides.filter((guide) => guide.category === category)
            if (!items.length) return null

            return (
              <section key={category}>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-slate-900">{getGuideCategoryLabel(category)}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={addLocaleToPath(`/guides/${guide.slug}`, locale)}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-300"
                    >
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{guide.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{guide.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <TopicLinksSection
          title="Workflow topics and fixes"
          description="These pages approach the same space from the task side: reducing file size, fixing uploads, preparing screenshots, and handling publishing friction."
          locale={locale}
          slugs={featuredTopics}
        />
      </main>
      <Footer />
    </div>
  )
}
