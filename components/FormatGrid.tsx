import Link from 'next/link'
import {
  FORMAT_SLUGS,
  slugToLabel,
  toConverterSlug,
  type TargetFormat,
} from '@/lib/formats'

interface FormatGridProps {
  target: TargetFormat
}

const targetLabel: Record<TargetFormat, string> = {
  jpg: 'JPG',
  webp: 'WebP',
  png: 'PNG',
}

export default function FormatGrid({ target }: FormatGridProps) {
  const label = targetLabel[target]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
      {FORMAT_SLUGS.map((source) => {
        const from = slugToLabel(source)
        const href = `/${toConverterSlug(source, target)}`
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
