import { ALL_CONVERTER_SLUGS, parseConverterSlug, toConverterSlug, type TargetFormat } from '@/lib/formats'

type ConversionQuality = 'high' | 'medium' | 'low'

/**
 * Keep the initial indexable route set intentionally small.
 * These are the highest-intent, highest-utility conversion pages for launch SEO.
 */
export const INDEXED_CONVERTER_SLUGS = [
  'png-to-jpg',
  'webp-to-jpg',
  'heic-to-jpg',
  'avif-to-jpg',
  'gif-to-jpg',
  'bmp-to-jpg',
  'tiff-to-jpg',
  'svg-to-jpg',
  'ico-to-jpg',
  'jfif-to-jpg',
  'jpg-to-png',
  'webp-to-png',
  'svg-to-png',
  'gif-to-png',
  'heic-to-png',
  'avif-to-png',
  'bmp-to-png',
  'tiff-to-png',
  'ico-to-png',
  'jpg-to-webp',
  'png-to-webp',
  'gif-to-webp',
  'heic-to-webp',
  'avif-to-webp',
  'svg-to-webp',
] as const

const INDEXED_CONVERTER_SET = new Set<string>(INDEXED_CONVERTER_SLUGS)

function normalizeFormat(value: string): string {
  return value.toLowerCase()
}

const LOSSY_WEB_FORMATS = new Set(['jpg', 'jpeg', 'jfif', 'jpe'])
const LOSSLESS_WEB_FORMATS = new Set(['png', 'webp', 'avif'])
const LEGACY_OR_OBSCURE_FORMATS = new Set([
  'bmp',
  'tiff',
  'cur',
  'dds',
  'fts',
  'gif',
  'hdr',
  'ico',
  'jps',
  'mng',
  'pam',
  'pbm',
  'pcd',
  'pcx',
  'pfm',
  'pgm',
  'picon',
  'pict',
  'pnm',
  'ppm',
  'psd',
  'ras',
  'rw2',
  'sgi',
  'tga',
  'wbmp',
  'xbm',
  'xpm',
])

/**
 * Classify how "valuable" a conversion is for SEO.
 * This is a simple heuristic and does not affect runtime logic
 * beyond sitemap prioritization and audit scripts.
 */
export function classifyConversion(sourceRaw: string, targetRaw: TargetFormat): ConversionQuality {
  const source = normalizeFormat(sourceRaw)
  const target = normalizeFormat(targetRaw)

  // Self-conversions are not useful
  if (source === target) return 'low'

  const toLossyWeb = LOSSY_WEB_FORMATS.has(target)
  const toLosslessWeb = LOSSLESS_WEB_FORMATS.has(target)
  const fromLegacyOrObscure =
    LEGACY_OR_OBSCURE_FORMATS.has(source) || LOSSY_WEB_FORMATS.has(source) || LOSSLESS_WEB_FORMATS.has(source)

  // Converting from legacy / obscure or heavy formats into common web targets is high value
  if (fromLegacyOrObscure && (toLossyWeb || toLosslessWeb)) {
    return 'high'
  }

  // Cross-conversion between common web formats is still useful
  if (toLossyWeb || toLosslessWeb) {
    return 'medium'
  }

  // Fallback
  return 'low'
}

/**
 * Decide whether a given conversion should be indexable in sitemap/SEO.
 * We exclude self-conversions and other obviously low-value routes.
 */
export function shouldIndexConversion(sourceRaw: string, targetRaw: TargetFormat): boolean {
  const source = normalizeFormat(sourceRaw)
  const target = normalizeFormat(targetRaw)

  // Never index self-conversions
  if (source === target) return false

  return INDEXED_CONVERTER_SET.has(toConverterSlug(source, target as TargetFormat))
}

/**
 * Map quality buckets to sitemap priority values.
 */
export function getConversionPriority(sourceRaw: string, targetRaw: TargetFormat): number {
  const quality = classifyConversion(sourceRaw, targetRaw)
  switch (quality) {
    case 'high':
      return 0.9
    case 'medium':
      return 0.7
    case 'low':
    default:
      return 0.3
  }
}

/**
 * Get all indexable conversion slugs for a given source format.
 */
export function getIndexableConversionsBySource(sourceRaw: string): string[] {
  const source = normalizeFormat(sourceRaw)

  return INDEXED_CONVERTER_SLUGS.filter((slug) => slug.startsWith(`${source}-to-`))
}

export function getIndexableConversionsByTarget(targetRaw: TargetFormat): string[] {
  const target = normalizeFormat(targetRaw)

  return INDEXED_CONVERTER_SLUGS.filter((slug) => slug.endsWith(`-to-${target}`))
}

/**
 * For a given conversion slug, find related conversions:
 * - bySource: same source format, different targets
 * - byTarget: same target format, different sources
 *
 * This is used only in audit tooling; it does not affect runtime behavior.
 */
export function getRelatedConversions(slug: string): { bySource: string[]; byTarget: string[] } {
  const parsed = parseConverterSlug(slug)
  if (!parsed) {
    return { bySource: [], byTarget: [] }
  }

  const { source, target } = parsed

  const bySource: string[] = []
  const byTarget: string[] = []

  ALL_CONVERTER_SLUGS.forEach((candidate) => {
    if (candidate === slug) return
    const p = parseConverterSlug(candidate)
    if (!p) return

    if (p.source === source) {
      bySource.push(candidate)
    } else if (p.target === target) {
      byTarget.push(candidate)
    }
  })

  return { bySource, byTarget }
}
