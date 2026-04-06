import Link from 'next/link'
import { addLocaleToPath, type Locale } from '@/lib/i18n/config'
import { getGuideBySlug, getGuideCategoryLabel } from '@/lib/seo/guides'

interface GuideLinksSectionProps {
  title: string
  description?: string
  locale: Locale
  slugs: string[]
}

export default function GuideLinksSection({
  title,
  description,
  locale,
  slugs,
}: GuideLinksSectionProps) {
  const guides = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuideBySlug>> => Boolean(guide))

  if (!guides.length) return null

  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
          {description ? <p className="text-slate-600 mt-2">{description}</p> : null}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={addLocaleToPath(`/guides/${guide.slug}`, locale)}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                {getGuideCategoryLabel(guide.category)}
              </p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{guide.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
