import { ALL_CONVERTER_SLUGS, parseConverterSlug, slugToLabel, getTargetLabel } from '@/lib/formats'
import { classifyConversion, shouldIndexConversion, getRelatedConversions } from '@/lib/seo/url-quality'
import { generateConversionDescription } from '@/lib/seo/descriptions'

function auditConversions() {
  let total = 0
  let high = 0
  let medium = 0
  let low = 0
  let selfConversions = 0
  let indexableSelfConversions = 0

  ALL_CONVERTER_SLUGS.forEach((slug) => {
    const parsed = parseConverterSlug(slug)
    if (!parsed) return
    total += 1

    const { source, target } = parsed
    const quality = classifyConversion(source, target)
    const indexable = shouldIndexConversion(source, target)

    if (source === target) {
      selfConversions += 1
      if (indexable) {
        indexableSelfConversions += 1
      }
    }

    if (quality === 'high') high += 1
    else if (quality === 'medium') medium += 1
    else low += 1
  })

  console.log('=== Conversion SEO Audit ===')
  console.log(`Total conversion routes: ${total}`)
  console.log(`High value: ${high}`)
  console.log(`Medium value: ${medium}`)
  console.log(`Low value: ${low}`)
  console.log(`Self-conversions: ${selfConversions}`)
  console.log(`Indexable self-conversions (should be 0): ${indexableSelfConversions}`)
}

function auditRelatedLinks() {
  const samples = ALL_CONVERTER_SLUGS.slice(0, 10)

  console.log('\n=== Related Links Sample (first 10 slugs) ===')
  samples.forEach((slug) => {
    const related = getRelatedConversions(slug)
    const duplicates = new Set<string>()
    const all = [...related.bySource, ...related.byTarget]
    all.forEach((s) => {
      if (all.filter((x) => x === s).length > 1) {
        duplicates.add(s)
      }
    })

    console.log(`\n${slug}`)
    console.log(`  bySource: ${related.bySource.join(', ') || '(none)'}`)
    console.log(`  byTarget: ${related.byTarget.join(', ') || '(none)'}`)
    if (duplicates.size > 0) {
      console.log(`  Duplicated related links: ${Array.from(duplicates).join(', ')}`)
    }
  })
}

function auditMetaDescriptions() {
  const descriptionMap = new Map<string, string[]>()

  ALL_CONVERTER_SLUGS.forEach((slug) => {
    const parsed = parseConverterSlug(slug)
    if (!parsed) return

    const { source, target } = parsed
    const from = slugToLabel(source)
    const to = getTargetLabel(target)
    const description = generateConversionDescription(from, to, slug)

    const list = descriptionMap.get(description) ?? []
    list.push(slug)
    descriptionMap.set(description, list)
  })

  const totalPages = ALL_CONVERTER_SLUGS.length
  const uniqueDescriptions = descriptionMap.size

  const duplicates: { description: string; slugs: string[] }[] = []
  descriptionMap.forEach((slugs, description) => {
    if (slugs.length > 1) {
      duplicates.push({ description, slugs })
    }
  })

  console.log('\n=== Meta Description Audit ===')
  console.log(`Total conversion pages: ${totalPages}`)
  console.log(`Unique meta descriptions: ${uniqueDescriptions}`)
  console.log(`Descriptions with duplicates: ${duplicates.length}`)

  if (duplicates.length > 0) {
    console.log('\nSample duplicate descriptions:')
    duplicates.slice(0, 5).forEach((item, index) => {
      console.log(`\n#${index + 1}`)
      console.log(`Description: "${item.description}"`)
      console.log(`Slugs: ${item.slugs.join(', ')}`)
    })
  }
}

export function runSeoAudit() {
  auditConversions()
  auditRelatedLinks()
  auditMetaDescriptions()
}

if (require.main === module) {
  runSeoAudit()
}

