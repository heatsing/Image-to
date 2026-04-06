import Link from 'next/link'
import { addLocaleToPath, type Locale } from '@/lib/i18n/config'
import { parseConverterSlug, slugToLabel, getTargetLabel } from '@/lib/formats'

interface RelatedLinksSectionProps {
  title: string
  description?: string
  locale: Locale
  slugs: string[]
}

export default function RelatedLinksSection({
  title,
  description,
  locale,
  slugs,
}: RelatedLinksSectionProps) {
  if (!slugs.length) return null

  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
          {description ? <p className="text-slate-600 mt-2">{description}</p> : null}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {slugs.map((slug) => {
            const parsed = parseConverterSlug(slug)
            if (!parsed) return null

            const label = `${slugToLabel(parsed.source)} to ${getTargetLabel(parsed.target)}`

            return (
              <Link
                key={slug}
                href={addLocaleToPath(`/${slug}`, locale)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
