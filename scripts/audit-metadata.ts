import { ALL_CONVERTER_SLUGS, parseConverterSlug, slugToLabel, getTargetLabel } from '@/lib/formats'
import { type Locale, defaultLocale } from '@/lib/i18n/config'
import { generateSeoTitle, generateMetaDescription, generateCanonicalUrl, hashRouteSlug } from '@/lib/seo/metadata-engine'
import { getCanonicalUrl } from '@/lib/seo'

type RouteMeta = {
  slug: string
  locale: Locale
  title: string
  description: string
  canonical: string
}

function buildRouteMeta(slug: string, locale: Locale): RouteMeta | null {
  const parsed = parseConverterSlug(slug)
  if (!parsed) return null

  const { source, target } = parsed
  const title = generateSeoTitle(source, target, slug)
  const description = generateMetaDescription(source, target, slug)
  const canonical = generateCanonicalUrl(`/${slug}`, locale)

  return {
    slug,
    locale,
    title,
    description,
    canonical,
  }
}

function auditMetadata() {
  const locales: Locale[] = [defaultLocale]

  const routeMetas: RouteMeta[] = []

  locales.forEach((locale) => {
    ALL_CONVERTER_SLUGS.forEach((slug) => {
      const meta = buildRouteMeta(slug, locale)
      if (meta) routeMetas.push(meta)
    })
  })

  const totalRoutes = routeMetas.length

  const titleMap = new Map<string, string[]>()
  const descriptionMap = new Map<string, string[]>()

  const missingCanonical: string[] = []
  const longTitles: string[] = []
  const badDescriptions: string[] = []

  routeMetas.forEach((meta) => {
    const key = `${meta.locale}:${meta.slug}`

    if (!meta.canonical || !meta.canonical.trim()) {
      missingCanonical.push(key)
    }

    if (meta.title.length > 60) {
      longTitles.push(key)
    }

    if (meta.description.length < 120 || meta.description.length > 170) {
      badDescriptions.push(key)
    }

    const titles = titleMap.get(meta.title) ?? []
    titles.push(key)
    titleMap.set(meta.title, titles)

    const descs = descriptionMap.get(meta.description) ?? []
    descs.push(key)
    descriptionMap.set(meta.description, descs)
  })

  const duplicateTitles: { value: string; routes: string[] }[] = []
  titleMap.forEach((routes, value) => {
    if (routes.length > 1) {
      duplicateTitles.push({ value, routes })
    }
  })

  const duplicateDescriptions: { value: string; routes: string[] }[] = []
  descriptionMap.forEach((routes, value) => {
    if (routes.length > 1) {
      duplicateDescriptions.push({ value, routes })
    }
  })

  console.log('=== Metadata Audit ===')
  console.log(`Total routes (default locale only): ${totalRoutes}`)
  console.log(`Unique titles: ${titleMap.size}`)
  console.log(`Duplicate title strings: ${duplicateTitles.length}`)
  console.log(`Unique descriptions: ${descriptionMap.size}`)
  console.log(`Duplicate description strings: ${duplicateDescriptions.length}`)
  console.log(`Routes missing canonical: ${missingCanonical.length}`)
  console.log(`Routes with long titles (>60 chars): ${longTitles.length}`)
  console.log(`Routes with description outside 120–170 chars: ${badDescriptions.length}`)

  if (duplicateTitles.length > 0) {
    console.log('\nSample duplicate titles:')
    duplicateTitles.slice(0, 5).forEach((item, i) => {
      console.log(`\n#${i + 1}`)
      console.log(`Title: "${item.value}"`)
      console.log(`Routes: ${item.routes.join(', ')}`)
    })
  }

  if (duplicateDescriptions.length > 0) {
    console.log('\nSample duplicate descriptions:')
    duplicateDescriptions.slice(0, 5).forEach((item, i) => {
      console.log(`\n#${i + 1}`)
      console.log(`Description: "${item.value}"`)
      console.log(`Routes: ${item.routes.join(', ')}`)
    })
  }
}

if (require.main === module) {
  auditMetadata()
}

