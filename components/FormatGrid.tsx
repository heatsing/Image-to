'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { slugToLabel, type TargetFormat } from '@/lib/formats'
import { getLocaleFromPath, addLocaleToPath } from '@/lib/i18n/config'
import { getIndexableConversionsByTarget } from '@/lib/seo/url-quality'

interface FormatGridProps {
  target: TargetFormat
}

const targetLabel: Record<TargetFormat, string> = {
  jpg: 'JPG',
  webp: 'WebP',
  png: 'PNG',
}

export default function FormatGrid({ target }: FormatGridProps) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const label = targetLabel[target]
  const conversions = getIndexableConversionsByTarget(target)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
      {conversions.map((slug) => {
        const [source] = slug.split('-to-')
        const href = addLocaleToPath(`/${slug}`, locale)

        return (
          <Link
            key={slug}
            href={href}
            className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            {slugToLabel(source)} to {label}
          </Link>
        )
      })}
    </div>
  )
}
