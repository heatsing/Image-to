import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import SeoContent from '@/components/SeoContent'
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
  const pageTitle = messages.common.about
  const description = t(locale, 'home.subtitle') || 'Learn about Image Converter, a free online tool for converting images to JPG, WebP, or PNG. 100% local conversion, no uploads, no signup.'
  const pagePath = '/about'

  return {
    title: titleWithSuffix(pageTitle),
    description,
    keywords: ['about', 'image converter', 'free tool', 'online converter'],
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t(locale, 'pages.about.title')}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'pages.about.subtitle')}
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.about.mission.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.about.mission.description1')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t(locale, 'pages.about.mission.description2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.about.features.title')}</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t(locale, 'pages.about.features.localTitle')}:</strong> {t(locale, 'pages.about.features.localDesc')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t(locale, 'pages.about.features.freeTitle')}:</strong> {t(locale, 'pages.about.features.freeDesc')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t(locale, 'pages.about.features.fastTitle')}:</strong> {t(locale, 'pages.about.features.fastDesc')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t(locale, 'pages.about.features.batchTitle')}:</strong> {t(locale, 'pages.about.features.batchDesc')}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t(locale, 'pages.about.features.formatsTitle')}:</strong> {t(locale, 'pages.about.features.formatsDesc')}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.about.privacy.title')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t(locale, 'pages.about.privacy.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t(locale, 'pages.about.contact.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t(locale, 'pages.about.contact.description')}{' '}
              <Link href={addLocaleToPath('/contact', locale)} className="text-blue-600 hover:text-blue-700 underline">
                {t(locale, 'pages.about.contact.link')}
              </Link>
            </p>
          </section>
        </div>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />

        <SeoContent
          title="Why Choose Our Image Converter"
          content={[
            "Image Converter at Sckde.com is built with a privacy-first approach. Unlike traditional online converters that require uploading your files to remote servers, our tool processes everything directly in your web browser. This means your sensitive images, personal photos, and confidential documents never leave your device.",
            "We support a comprehensive range of image formats to meet all your conversion needs. From common formats like JPG, PNG, and WebP to specialized formats like HEIC (from iPhones), AVIF, TIFF, BMP, and even vector formats like SVG – we've got you covered with over 40 supported input formats.",
            "Our converter is designed for efficiency. Whether you need to convert a single image or process hundreds of files in batch, the conversion happens instantly. There's no waiting for uploads, no queue, and no server processing delays. Everything runs on your device's processing power.",
            "Best of all, Image Converter is completely free with no hidden costs, no watermarks, and no registration required. We believe everyone deserves access to professional-quality image conversion tools without barriers or limitations.",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
