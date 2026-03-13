import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { type Locale, defaultLocale } from '@/lib/i18n/config'
import { slugToLabel, getTargetLabel, TargetFormat } from '@/lib/formats'
import { getIndexableConversionsBySource } from '@/lib/seo/url-quality'

type Props = {
  locale: Locale
  sourceFormat: string
  title: string
  description: string
}

export function FormatHubPage({ locale, sourceFormat, title, description }: Props) {
  const conversions = getIndexableConversionsBySource(sourceFormat)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-3">{description}</p>
        </div>

        <section className="card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Available {slugToLabel(sourceFormat)} conversion tools
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-800">
            {conversions.map((slug) => {
              const [from, to] = slug.split('-to-')
              const hrefPrefix = locale === defaultLocale ? '' : `/${locale}`
              return (
                <li key={slug}>
                  <Link
                    href={`${hrefPrefix}/${slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {slugToLabel(from)} to {getTargetLabel(to as TargetFormat)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}

