import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'
import { languageAlternates, getCanonicalUrl, titleWithSuffix, getOgLocale } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const pageTitle = messages.common.security
  const description = 'Learn about the security measures and privacy protections in place at Image Converter. 100% local processing, no data collection.'
  const pagePath = '/security'

  return {
    title: titleWithSuffix(pageTitle),
    description,
    keywords: ['security', 'privacy', 'data protection', 'secure image converter'],
    alternates: {
      canonical: getCanonicalUrl(pagePath, locale),
      languages: languageAlternates(pagePath),
    },
    openGraph: {
      title: titleWithSuffix(pageTitle),
      description,
      locale: getOgLocale(locale),
      siteName: 'Sckde.com',
      type: 'website',
    },
  }
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t(locale, 'pages.security.title')}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'pages.security.subtitle')}
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.security.localProcessing.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.security.localProcessing.description')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t(locale, 'pages.security.localProcessing.means')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-4 ml-4">
              <li>{t(locale, 'pages.security.localProcessing.noUploads')}</li>
              <li>{t(locale, 'pages.security.localProcessing.noTransmission')}</li>
              <li>{t(locale, 'pages.security.localProcessing.noStorage')}</li>
              <li>{t(locale, 'pages.security.localProcessing.completePrivacy')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.security.noDataCollection.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.security.noDataCollection.description')}
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{t(locale, 'pages.security.noDataCollection.noAccounts')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{t(locale, 'pages.security.noDataCollection.noCookies')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{t(locale, 'pages.security.noDataCollection.noAnalytics')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{t(locale, 'pages.security.noDataCollection.noSharing')}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.security.browserSecurity.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.security.browserSecurity.description')}
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t(locale, 'pages.security.browserSecurity.noVulnerabilities')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t(locale, 'pages.security.browserSecurity.noNetwork')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t(locale, 'pages.security.browserSecurity.immediateDeletion')}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.security.bestPractices.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.security.bestPractices.description')}
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t(locale, 'pages.security.bestPractices.modernBrowser')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t(locale, 'pages.security.bestPractices.trustedSources')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t(locale, 'pages.security.bestPractices.clearCache')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t(locale, 'pages.security.bestPractices.downloadImmediately')}</span>
              </li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t(locale, 'pages.security.questions.title')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t(locale, 'pages.security.questions.description')}{' '}
              <Link href={addLocaleToPath('/contact', locale)} className="text-blue-600 hover:text-blue-700 underline">
                {t(locale, 'pages.security.questions.link')}
              </Link>
            </p>
          </section>
        </div>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
