'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FORMAT_SLUGS,
  slugToLabel,
  toConverterSlug,
  type TargetFormat,
} from '@/lib/formats'
import { getLocaleFromPath, addLocaleToPath } from '@/lib/i18n/config'

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
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
      {FORMAT_SLUGS.map((source) => {
        // 如果源格式和目标格式相同，使用 jpg 作为源格式
        const displaySource = source === target ? 'jpg' : source
        const from = slugToLabel(displaySource)
        const slug = toConverterSlug(displaySource, target)
        const href = addLocaleToPath(`/${slug}`, locale)
        return (
          <Link
            key={source}
            href={href}
            className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            {from} to {label}
          </Link>
        )
      })}
    </div>
  )
}
