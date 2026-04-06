import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { type Locale } from '@/lib/i18n/config'
import CardSection from '@/components/CardSection'
import ListSection from '@/components/ListSection'
import RelatedLinksSection from '@/components/RelatedLinksSection'
import GuideLinksSection from '@/components/GuideLinksSection'
import TopicLinksSection from '@/components/TopicLinksSection'
import FAQ from '@/components/FAQ'
import SeoContent from '@/components/SeoContent'
import { buildHubPageContent } from '@/lib/seo/page-content'
import { getRelevantGuideSlugsForFormats } from '@/lib/seo/guides'
import { getRelevantTopicSlugsForFormats } from '@/lib/seo/topics'

type Props = {
  locale: Locale
  sourceFormat: string
  title: string
  description: string
}

export function FormatHubPage({ locale, sourceFormat, title, description }: Props) {
  const hubContent = buildHubPageContent(sourceFormat)
  const relatedGuides = getRelevantGuideSlugsForFormats([sourceFormat])
  const relatedTopics = getRelevantTopicSlugsForFormats([sourceFormat])

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-3">{description}</p>
        </div>

        <SeoContent title={hubContent.introTitle} content={hubContent.introParagraphs} />
        <CardSection
          title="What this format is good at"
          description={`Use this ${sourceFormat.toUpperCase()} hub to choose the output format that matches your next step.`}
          items={hubContent.keyPoints}
        />
        <ListSection
          title="How to choose the right destination format"
          description="Use the workflow decision below before converting every file the same way by default."
          items={hubContent.strategySteps}
          ordered
        />
        <RelatedLinksSection
          title="Featured conversion tools"
          description="These are the most practical routes from this source format right now."
          locale={locale}
          slugs={hubContent.featuredConversions}
        />
        <GuideLinksSection
          title="Related guides"
          description="Use these articles when you need a format recommendation or broader workflow context."
          locale={locale}
          slugs={relatedGuides}
        />
        <TopicLinksSection
          title="Related workflow topics"
          description="These pages cover upload fixes, publishing tasks, and performance decisions around this source format."
          locale={locale}
          slugs={relatedTopics}
        />
        <FAQ
          items={hubContent.faqItems}
          title={`${sourceFormat.toUpperCase()} conversion FAQ`}
          subtitle="Answers for users who keep receiving this source format and need the fastest path to a publishable output."
        />
      </main>
      <Footer />
    </div>
  )
}
