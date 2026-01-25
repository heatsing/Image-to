import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import FormatGrid from '@/components/FormatGrid'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'
import { generatePageMetadata } from '@/lib/seo-i18n'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const pageTitle = t(locale, 'converter.title', { format: 'JPG' })
  const pageDesc = t(locale, 'converter.description', { format: 'JPG' })
  const path = addLocaleToPath('/convert-to-jpg', locale)

  return generatePageMetadata({
    locale,
    title: pageTitle,
    description: pageDesc,
    keywords: [
      'image to JPG',
      'convert to JPG',
      'JPG converter',
      'image converter',
      'free JPG converter',
      'local image conversion',
      'batch JPG converter',
    ],
    path: path.startsWith('/') ? path : `/${path}`,
  })
}

export default async function ToJPGPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t(locale, 'converter.title', { format: 'JPG' })}</h2>
          <p className="text-slate-600 mb-3">
            {t(locale, 'converter.description', { format: 'JPG' })}
          </p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter
            outputFormat="jpg"
            title={t(locale, 'converter.title', { format: 'JPG' })}
            description={t(locale, 'converter.description', { format: 'JPG' })}
          />
        </div>

        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{messages.common.supportedFormats}</h3>
            <FormatGrid target="jpg" />
          </div>
        </section>

        <BenefitsSection
          title={t(locale, 'benefits.title')}
          subtitle={t(locale, 'benefits.subtitle')}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
