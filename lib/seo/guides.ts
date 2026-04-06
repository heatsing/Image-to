import type { FAQItem } from '@/lib/faq-data'

export type GuideCategory = 'strategy' | 'comparison' | 'tutorial'

export type GuideCardItem = {
  title: string
  body: string
}

export type GuideComparisonRow = {
  topic: string
  source: string
  target: string
  recommendation: string
}

export type GuideDefinition = {
  slug: string
  category: GuideCategory
  title: string
  description: string
  introTitle: string
  introParagraphs: string[]
  highlights: GuideCardItem[]
  takeaways: string[]
  faqItems: FAQItem[]
  relatedConversions: string[]
  relatedGuides: string[]
  formats: string[]
  comparison?: {
    sourceLabel: string
    targetLabel: string
    rows: GuideComparisonRow[]
  }
}

export const GUIDES: GuideDefinition[] = [
  {
    slug: 'best-image-format-for-web',
    category: 'strategy',
    title: 'Best Image Format for the Web',
    description: 'Choose the right format for faster pages, cleaner visuals, and fewer publishing problems.',
    introTitle: 'How to choose the best image format for the web',
    introParagraphs: [
      'The best image format depends on the job. Photos, screenshots, transparent graphics, and hero images do not all want the same output.',
      'Most teams are balancing compatibility, file size, transparency, and visible quality. Once you know which one matters most, the format decision gets much easier.',
      'Use this guide as the top-level decision layer before converting assets or changing your delivery pipeline.',
    ],
    highlights: [
      { title: 'JPG for compatibility-first photos', body: 'JPG remains a strong default when broad support matters more than perfect preservation.' },
      { title: 'PNG for transparency and sharp graphics', body: 'PNG is still the safe choice for logos, screenshots, and UI assets.' },
      { title: 'WebP for lighter delivery', body: 'WebP often gives the best balance between smaller files and modern browser support.' },
      { title: 'AVIF for deeper optimization', body: 'AVIF can be powerful, but it asks more from your workflow and rollout discipline.' },
    ],
    takeaways: [
      'Choose the format based on the final use case, not habit.',
      'Use JPG for photos, PNG for transparent graphics, and WebP for efficient delivery.',
      'Test AVIF selectively instead of forcing it into every workflow.',
      'Format choice often matters more than small quality tweaks.',
    ],
    faqItems: [
      { question: 'What is the best image format for websites?', answer: 'There is no universal winner. JPG, PNG, WebP, and AVIF each fit different jobs.' },
      { question: 'Should I convert everything to WebP?', answer: 'No. WebP is strong for many assets, but some graphics still belong in PNG and some uploads still favor JPG.' },
      { question: 'When is PNG better than JPG?', answer: 'PNG is better when the asset needs transparency or very crisp edges.' },
      { question: 'Is AVIF always better than WebP?', answer: 'No. AVIF can be more efficient, but WebP is usually easier to ship and maintain.' },
    ],
    relatedConversions: ['jpg-to-webp', 'png-to-webp', 'png-to-jpg', 'avif-to-webp', 'webp-to-jpg'],
    relatedGuides: ['png-vs-webp', 'heic-vs-jpg', 'best-image-format-for-transparent-backgrounds', 'how-to-optimize-images-for-fast-websites'],
    formats: ['jpg', 'png', 'webp', 'avif'],
  },
  {
    slug: 'png-vs-webp',
    category: 'comparison',
    title: 'PNG vs WebP',
    description: 'Compare PNG and WebP for transparency, screenshots, web performance, and publishing workflows.',
    introTitle: 'PNG vs WebP for real product teams',
    introParagraphs: [
      'PNG and WebP often compete because both can handle transparency, but they solve different priorities.',
      'PNG is the safer quality-first choice. WebP is usually the lighter delivery-first choice.',
      'If your site ships screenshots, UI assets, product cutouts, or transparent graphics, this choice matters constantly.',
    ],
    highlights: [
      { title: 'PNG is safer for design assets', body: 'PNG stays predictable for logos, screenshots, and transparency-sensitive graphics.' },
      { title: 'WebP usually wins on weight', body: 'WebP often reduces page payload without needing a completely new content workflow.' },
      { title: 'Screenshots need testing', body: 'UI screenshots can still look cleaner as PNG, especially when they contain text.' },
      { title: 'Delivery stack matters', body: 'If your CDN or CMS already favors WebP, the case for WebP gets stronger.' },
    ],
    takeaways: [
      'Use PNG when image fidelity and transparency safety matter most.',
      'Use WebP when page speed is the stronger priority.',
      'Test screenshots and overlays in both formats before standardizing.',
      'Keep PNG as the working asset if needed and deliver WebP on the web.',
    ],
    faqItems: [
      { question: 'Is WebP always smaller than PNG?', answer: 'Often yes, but the smaller file is only useful if the visual result still looks correct.' },
      { question: 'Is PNG or WebP better for logos?', answer: 'PNG is usually safer for working assets. WebP can be a good delivery format when the result still looks crisp.' },
      { question: 'Can WebP keep transparency like PNG?', answer: 'Yes. That is one reason the two formats are often compared.' },
      { question: 'Which is better for screenshots?', answer: 'Start with PNG, then test WebP if you need lower page weight.' },
    ],
    relatedConversions: ['png-to-webp', 'webp-to-png', 'svg-to-png', 'jpg-to-webp'],
    relatedGuides: ['best-image-format-for-web', 'best-image-format-for-transparent-backgrounds', 'how-to-optimize-images-for-fast-websites'],
    formats: ['png', 'webp'],
    comparison: {
      sourceLabel: 'PNG',
      targetLabel: 'WebP',
      rows: [
        { topic: 'Main strength', source: 'Transparency and sharp edges.', target: 'Smaller modern delivery files.', recommendation: 'Choose based on whether image fidelity or performance matters more.' },
        { topic: 'Typical use case', source: 'Logos, screenshots, UI graphics.', target: 'Website delivery and lighter asset payloads.', recommendation: 'PNG for source quality, WebP for optimized publishing.' },
        { topic: 'Main risk', source: 'Larger page weight.', target: 'Possible softness on sharp assets.', recommendation: 'Visually compare screenshots and logos before standardizing.' },
      ],
    },
  },
  {
    slug: 'heic-vs-jpg',
    category: 'comparison',
    title: 'HEIC vs JPG',
    description: 'Understand when iPhone HEIC files should stay as-is and when converting to JPG is the better move.',
    introTitle: 'HEIC vs JPG for compatibility and uploads',
    introParagraphs: [
      'HEIC is common on iPhone, but JPG is still the safer publishing format across the wider web.',
      'This is mostly a workflow problem, not a theory problem. People convert HEIC because uploads fail or recipients cannot open the image cleanly.',
      'If the destination is broad sharing, ecommerce, email, or a generic CMS, JPG still wins surprisingly often.',
    ],
    highlights: [
      { title: 'HEIC is fine as a source format', body: 'It works well in Apple-first workflows and is common on iPhone capture pipelines.' },
      { title: 'JPG is safer for delivery', body: 'JPG remains the easier format for uploads, marketplaces, support tools, and older apps.' },
      { title: 'Upload friction drives the conversion', body: 'Most users convert after a form or platform rejects the original HEIC file.' },
      { title: 'Keep the source when possible', body: 'It often makes sense to keep the HEIC original and publish a JPG copy.' },
    ],
    takeaways: [
      'Keep HEIC when the workflow fully supports it.',
      'Convert to JPG when compatibility and fast sharing matter more.',
      'If an iPhone image fails to upload, HEIC is often the reason.',
      'Treat JPG as the handoff format and HEIC as the source when needed.',
    ],
    faqItems: [
      { question: 'Why do iPhone photos fail to upload?', answer: 'Many iPhone photos are HEIC, and some websites still expect JPG or PNG.' },
      { question: 'Should I keep photos as HEIC or convert them to JPG?', answer: 'Keep HEIC if your workflow supports it. Convert to JPG when you need broad compatibility.' },
      { question: 'Is JPG better for ecommerce uploads?', answer: 'Often yes, because seller portals and forms are more likely to accept JPG.' },
      { question: 'Can I batch convert iPhone photos to JPG?', answer: 'Yes. Batch conversion is often the fastest way to prepare many phone images at once.' },
    ],
    relatedConversions: ['heic-to-jpg', 'heic-to-png', 'heic-to-webp', 'jpg-to-webp'],
    relatedGuides: ['how-to-convert-iphone-photos-to-jpg', 'best-image-format-for-ecommerce-images', 'best-image-format-for-web'],
    formats: ['heic', 'jpg'],
    comparison: {
      sourceLabel: 'HEIC',
      targetLabel: 'JPG',
      rows: [
        { topic: 'Best fit', source: 'Apple-native storage and capture workflows.', target: 'Sharing, uploads, email, and broad publishing.', recommendation: 'Keep HEIC as the original and use JPG as the delivery copy when needed.' },
        { topic: 'Compatibility', source: 'Limited outside Apple-first tools.', target: 'Broad support almost everywhere.', recommendation: 'JPG is the safer outward-facing format.' },
        { topic: 'Typical pain point', source: 'Rejected uploads or unsupported previews.', target: 'Less friction but more recompression.', recommendation: 'Convert when the destination rejects HEIC.' },
      ],
    },
  },
  {
    slug: 'how-to-convert-iphone-photos-to-jpg',
    category: 'tutorial',
    title: 'How to Convert iPhone Photos to JPG',
    description: 'Turn iPhone HEIC photos into JPG for uploads, sharing, ecommerce, and support workflows.',
    introTitle: 'How to convert iPhone photos to JPG quickly',
    introParagraphs: [
      'This workflow exists because many iPhone photos are saved as HEIC, while many websites still expect JPG.',
      'The best approach is usually simple: keep the original HEIC file if you want it, and make a JPG copy when the destination needs compatibility.',
      'This guide is designed for users who need a working upload right now, not a deep photo-encoding lesson.',
    ],
    highlights: [
      { title: 'The problem is usually the destination', body: 'The site or platform often rejects HEIC, which is why JPG export solves the issue.' },
      { title: 'JPG is the practical handoff format', body: 'It is more widely accepted across forms, portals, and sharing tools.' },
      { title: 'Keep the source if it matters', body: 'You can preserve the original iPhone file and still publish a JPG copy.' },
      { title: 'Batch conversion saves time', body: 'This is especially useful when preparing multiple images for listings or support tickets.' },
    ],
    takeaways: [
      'Convert to JPG before uploading to a compatibility-sensitive platform.',
      'Keep the original HEIC file if it is still useful to you.',
      'Batch conversion is the fastest fix when several iPhone photos fail together.',
      'Use JPG as the outward-facing copy for mainstream web workflows.',
    ],
    faqItems: [
      { question: 'Why are my iPhone photos not uploading?', answer: 'The platform may not support HEIC, which is common on iPhone images.' },
      { question: 'Will JPG make iPhone photos easier to share?', answer: 'Yes. JPG is much more widely accepted across websites and apps.' },
      { question: 'Should I permanently switch iPhone photos to JPG?', answer: 'Not necessarily. Keeping HEIC as the source and exporting JPG only when needed is often better.' },
      { question: 'Can I convert many iPhone photos at once?', answer: 'Yes. Batch conversion is ideal for seller uploads, content teams, and support workflows.' },
    ],
    relatedConversions: ['heic-to-jpg', 'heic-to-png', 'heic-to-webp'],
    relatedGuides: ['heic-vs-jpg', 'best-image-format-for-ecommerce-images'],
    formats: ['heic', 'jpg'],
  },
  {
    slug: 'best-image-format-for-transparent-backgrounds',
    category: 'strategy',
    title: 'Best Image Format for Transparent Backgrounds',
    description: 'Choose the right transparent format for logos, UI assets, cutouts, overlays, and clean-edge graphics.',
    introTitle: 'The best image format for transparent backgrounds',
    introParagraphs: [
      'Transparency changes the format decision immediately because JPG is no longer a valid answer.',
      'Most teams end up deciding between PNG and WebP: PNG for safety and crispness, WebP for lighter delivery.',
      'If the asset is a logo, UI component, screenshot overlay, or product cutout, you want the format that keeps edges clean after publishing.',
    ],
    highlights: [
      { title: 'PNG is the safer default', body: 'PNG remains the most predictable workflow for transparent graphics.' },
      { title: 'WebP can reduce delivery weight', body: 'WebP is often worth testing for final website delivery.' },
      { title: 'JPG is not suitable', body: 'JPG does not support transparency, so it will flatten the background.' },
      { title: 'Edge quality matters', body: 'Always inspect anti-aliasing and outline quality after converting transparent assets.' },
    ],
    takeaways: [
      'Use PNG when transparency safety matters most.',
      'Use WebP when the web delivery format needs to be lighter.',
      'Do not use JPG for images that require transparent backgrounds.',
      'Check edge quality before shipping transparent assets.',
    ],
    faqItems: [
      { question: 'What is the best format for transparent backgrounds?', answer: 'PNG is usually the safest answer, while WebP is often the better delivery answer on the web.' },
      { question: 'Can WebP keep transparency like PNG?', answer: 'Yes. That is why PNG and WebP are often compared for transparent assets.' },
      { question: "Why can't JPG keep transparent backgrounds?", answer: 'JPG does not support alpha transparency, so the transparent area must be flattened.' },
      { question: 'What should I use for a transparent logo?', answer: 'PNG is usually the safer working format, while WebP can be tested as the lighter delivery format.' },
    ],
    relatedConversions: ['png-to-webp', 'svg-to-png', 'webp-to-png', 'png-to-jpg'],
    relatedGuides: ['png-vs-webp', 'best-image-format-for-web'],
    formats: ['png', 'webp', 'jpg', 'svg'],
  },
  {
    slug: 'best-image-format-for-ecommerce-images',
    category: 'strategy',
    title: 'Best Image Format for Ecommerce Images',
    description: 'Pick the right format for product photos, seller uploads, transparent cutouts, and fast storefront pages.',
    introTitle: 'How to choose the best image format for ecommerce',
    introParagraphs: [
      'Ecommerce teams usually need images to look trustworthy, load quickly, and pass upload requirements at the same time.',
      'That is why format choice matters so much on product pages, category pages, seller portals, and feed pipelines.',
      'The right answer depends on whether the asset is a product photo, a transparent cutout, or a performance-sensitive delivery file.',
    ],
    highlights: [
      { title: 'JPG remains the safe photo default', body: 'JPG still works well for product photos and compatibility-sensitive uploads.' },
      { title: 'PNG matters for transparent cutouts', body: 'PNG is still the safer choice for assets that need background transparency.' },
      { title: 'WebP helps storefront performance', body: 'WebP is often the better delivery format when page speed matters.' },
      { title: 'Source format can block uploads', body: 'Phone photos and HEIC files often need conversion before they fit ecommerce workflows cleanly.' },
    ],
    takeaways: [
      'Use JPG for mainstream product-photo workflows.',
      'Use PNG for transparent overlays or cutouts.',
      'Use WebP when performance is the stronger storefront priority.',
      'Convert HEIC before uploading to strict seller portals when necessary.',
    ],
    faqItems: [
      { question: 'What is the best image format for product photos?', answer: 'JPG is often the safest answer because it balances compatibility and file size well.' },
      { question: 'What should I use for transparent product images?', answer: 'PNG is usually the safer working format, while WebP can be tested for delivery.' },
      { question: 'Should ecommerce sites use WebP?', answer: 'Often yes for delivery, especially on image-heavy pages.' },
      { question: 'Why do seller portals reject some phone photos?', answer: 'The source may be HEIC, which many platforms still handle poorly.' },
    ],
    relatedConversions: ['heic-to-jpg', 'jpg-to-webp', 'png-to-webp', 'png-to-jpg'],
    relatedGuides: ['heic-vs-jpg', 'how-to-convert-iphone-photos-to-jpg', 'best-image-format-for-web'],
    formats: ['jpg', 'png', 'webp', 'heic'],
  },
  {
    slug: 'how-to-optimize-images-for-fast-websites',
    category: 'tutorial',
    title: 'How to Optimize Images for Fast Websites',
    description: 'A practical optimization guide covering format choice, asset types, quality tradeoffs, and page speed.',
    introTitle: 'How to optimize images without hurting the experience',
    introParagraphs: [
      'Fast sites usually win because teams make consistent format and asset decisions, not because they found one magical compression setting.',
      'The biggest mistake is treating every image the same. Photos, screenshots, logos, and transparent overlays should not all follow identical rules.',
      "Use this guide to think in workflows: choose the right format, then optimize quality and file size based on the page's actual goal.",
    ],
    highlights: [
      { title: 'Format choice comes first', body: 'The wrong format causes more waste than small quality-setting mistakes.' },
      { title: 'Different asset types need different rules', body: 'Separate photo workflows from screenshots, logos, and transparent graphics.' },
      { title: 'Test real pages, not only files', body: 'Benchmark your actual templates instead of making decisions from isolated samples.' },
      { title: 'Visual trust still matters', body: 'A smaller file is not a win if the product image or screenshot now looks unreliable.' },
    ],
    takeaways: [
      'Choose the format before tuning compression.',
      'Use different optimization rules for photos, graphics, and screenshots.',
      'Measure the pages that actually matter to traffic or revenue.',
      'Optimize for speed without sacrificing image trust.',
    ],
    faqItems: [
      { question: 'What is the biggest image optimization mistake?', answer: 'Treating every asset type the same and skipping format selection.' },
      { question: 'Should I convert everything to WebP for speed?', answer: 'No. WebP is strong, but some assets still belong in PNG or JPG.' },
      { question: 'Is image optimization only about file size?', answer: "No. The asset still needs to look correct and support the page's purpose." },
      { question: 'How do I optimize iPhone photos for the web?', answer: 'A common path is HEIC to JPG or WebP depending on whether compatibility or efficiency matters more.' },
    ],
    relatedConversions: ['jpg-to-webp', 'png-to-webp', 'heic-to-jpg', 'avif-to-webp'],
    relatedGuides: ['best-image-format-for-web', 'png-vs-webp', 'best-image-format-for-ecommerce-images'],
    formats: ['jpg', 'png', 'webp', 'avif', 'heic'],
  },
]

export function getGuideSlugs(): string[] {
  return GUIDES.map((guide) => guide.slug)
}

export function getGuideBySlug(slug: string): GuideDefinition | null {
  return GUIDES.find((guide) => guide.slug === slug) ?? null
}

export function getGuideSummaries() {
  return GUIDES.map(({ slug, title, description, category }) => ({ slug, title, description, category }))
}

export function getGuideCategoryLabel(category: GuideCategory): string {
  if (category === 'comparison') return 'Comparisons'
  if (category === 'tutorial') return 'Tutorials'
  return 'Strategy'
}

export function getRelatedGuideSlugs(slug: string, limit = 4): string[] {
  const guide = getGuideBySlug(slug)
  if (!guide) return []
  if (guide.relatedGuides.length) return guide.relatedGuides.slice(0, limit)
  return GUIDES.filter((candidate) => candidate.slug !== slug).slice(0, limit).map((candidate) => candidate.slug)
}

export function getRelevantGuideSlugsForFormats(formats: string[], limit = 4): string[] {
  const uniqueFormats = Array.from(new Set(formats.map((format) => format.toLowerCase())))
  return GUIDES
    .map((guide) => ({
      slug: guide.slug,
      score: guide.formats.filter((format) => uniqueFormats.includes(format)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.slug)
}
