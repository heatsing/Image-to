import { type FAQItem } from '@/lib/faq-data'
import { getTargetLabel, slugToLabel, type TargetFormat } from '@/lib/formats'
import {
  INDEXED_CONVERTER_SLUGS,
  getIndexableConversionsBySource,
  getIndexableConversionsByTarget,
} from './url-quality'

type CardItem = {
  title: string
  body: string
}

type ComparisonRow = {
  topic: string
  source: string
  target: string
  recommendation: string
}

type FormatProfile = {
  slug: string
  name: string
  summary: string
  bestFor: string
  compression: string
  transparency: string
  compatibility: string
  strengths: string[]
  tradeoffs: string[]
  audience: string[]
  hubPath: string | null
}

type ConversionPageContent = {
  introTitle: string
  introParagraphs: string[]
  keyPoints: CardItem[]
  useCases: string[]
  steps: string[]
  tips: string[]
  comparisonRows: ComparisonRow[]
  faqItems: FAQItem[]
  sourceRelated: string[]
  targetRelated: string[]
}

type TargetLandingContent = {
  introTitle: string
  introParagraphs: string[]
  keyPoints: CardItem[]
  steps: string[]
  tips: string[]
  faqItems: FAQItem[]
  featuredConversions: string[]
}

type HubPageContent = {
  introTitle: string
  introParagraphs: string[]
  keyPoints: CardItem[]
  strategySteps: string[]
  faqItems: FAQItem[]
  featuredConversions: string[]
}

const PROFILE_MAP: Record<string, Omit<FormatProfile, 'slug'>> = {
  jpg: {
    name: 'JPG',
    summary: 'JPG is the default choice for photos, email attachments, marketplaces, and broad device compatibility.',
    bestFor: 'photos, product shots, emails, CMS uploads, and anywhere you want maximum compatibility',
    compression: 'Lossy compression optimized for smaller photo files.',
    transparency: 'No alpha transparency support.',
    compatibility: 'Supported almost everywhere, including older apps and devices.',
    strengths: [
      'very wide compatibility',
      'small file sizes for photos',
      'easy sharing across apps and devices',
    ],
    tradeoffs: [
      're-compression can soften details',
      'not suitable for transparent graphics',
      'less ideal for UI assets and logos',
    ],
    audience: ['content teams', 'photographers', 'ecommerce sellers'],
    hubPath: '/jpg-tools',
  },
  jpeg: {
    name: 'JPEG',
    summary: 'JPEG behaves like JPG and is commonly used for photos and general image sharing.',
    bestFor: 'photos and compatibility-first workflows',
    compression: 'Lossy photo compression.',
    transparency: 'No transparency support.',
    compatibility: 'Extremely broad compatibility.',
    strengths: ['broad compatibility', 'small files', 'simple delivery'],
    tradeoffs: ['no transparency', 'quality loss after repeated saves'],
    audience: ['marketing teams', 'photographers'],
    hubPath: '/jpg-tools',
  },
  jfif: {
    name: 'JFIF',
    summary: 'JFIF is a JPEG-family file often produced by cameras, scanners, and older export tools.',
    bestFor: 'JPEG-based images that need standard web delivery',
    compression: 'JPEG-style lossy compression.',
    transparency: 'No transparency support.',
    compatibility: 'Often better converted to JPG before publishing.',
    strengths: ['easy to convert', 'photo-friendly'],
    tradeoffs: ['less familiar to users', 'sometimes awkward in upload workflows'],
    audience: ['camera users', 'scanner workflows'],
    hubPath: null,
  },
  png: {
    name: 'PNG',
    summary: 'PNG preserves sharp edges and transparency, making it useful for graphics, UI assets, screenshots, and logos.',
    bestFor: 'transparent graphics, UI exports, screenshots, and images that must stay crisp',
    compression: 'Lossless compression with larger file sizes than JPG or WebP.',
    transparency: 'Full alpha transparency support.',
    compatibility: 'Excellent browser and design-tool support.',
    strengths: [
      'lossless quality',
      'great for transparency',
      'clean edges for logos, UI, and screenshots',
    ],
    tradeoffs: [
      'larger files than JPG or WebP',
      'can be inefficient for large photos',
      'bandwidth costs rise if overused on the web',
    ],
    audience: ['designers', 'product teams', 'developers'],
    hubPath: '/png-tools',
  },
  webp: {
    name: 'WebP',
    summary: 'WebP is a strong web delivery format when you need smaller images without giving up too much quality.',
    bestFor: 'web performance, image-heavy landing pages, and modern browser delivery',
    compression: 'Supports lossy and lossless compression with efficient web delivery.',
    transparency: 'Supports transparency and animation.',
    compatibility: 'Good browser support, but some older workflows still prefer JPG or PNG.',
    strengths: [
      'smaller web files',
      'supports transparency',
      'works well for mixed photo and graphic workloads',
    ],
    tradeoffs: [
      'not every legacy workflow handles it cleanly',
      'some editors still export better to PNG or JPG',
      'you may still need fallback formats in older systems',
    ],
    audience: ['SEO teams', 'frontend engineers', 'publishers'],
    hubPath: '/webp-tools',
  },
  avif: {
    name: 'AVIF',
    summary: 'AVIF can be extremely efficient, but many teams still convert it to more compatible formats for delivery.',
    bestFor: 'aggressive compression and modern image delivery',
    compression: 'Modern high-efficiency compression.',
    transparency: 'Supports transparency.',
    compatibility: 'Improving support, but still less universal than JPG, PNG, or WebP.',
    strengths: ['excellent compression potential', 'modern format efficiency'],
    tradeoffs: ['slower encode/decode in some stacks', 'not universal in legacy tools'],
    audience: ['performance teams', 'modern publishing stacks'],
    hubPath: '/avif-tools',
  },
  heic: {
    name: 'HEIC',
    summary: 'HEIC is common in Apple workflows, but many websites, marketplaces, and older apps still prefer JPG, PNG, or WebP.',
    bestFor: 'Apple-origin photos before broader sharing or publishing',
    compression: 'Efficient photo compression.',
    transparency: 'Usually not part of mainstream HEIC sharing workflows.',
    compatibility: 'Weak outside Apple-first environments.',
    strengths: ['good image efficiency', 'common on iPhone'],
    tradeoffs: ['poor upload compatibility', 'confuses non-Apple workflows'],
    audience: ['iPhone users', 'ecommerce teams', 'support teams'],
    hubPath: '/heic-tools',
  },
  gif: {
    name: 'GIF',
    summary: 'GIF is often converted when teams want a smaller static format or need to repurpose older assets.',
    bestFor: 'simple legacy graphics and lightweight animations',
    compression: 'Legacy compression and limited color support.',
    transparency: 'Limited transparency support.',
    compatibility: 'Very widely supported, but inefficient for many modern jobs.',
    strengths: ['easy sharing', 'legacy compatibility'],
    tradeoffs: ['limited colors', 'large files for modern needs'],
    audience: ['content editors', 'support teams'],
    hubPath: '/gif-tools',
  },
  bmp: {
    name: 'BMP',
    summary: 'BMP is a legacy bitmap format that is usually converted for publishing, sharing, and storage efficiency.',
    bestFor: 'older Windows or bitmap-oriented workflows before conversion',
    compression: 'Usually uncompressed or inefficient.',
    transparency: 'Not typically used for transparency-first workflows.',
    compatibility: 'Readable in some tools, but rarely ideal for publishing.',
    strengths: ['simple bitmap structure'],
    tradeoffs: ['very large files', 'poor for the modern web'],
    audience: ['legacy desktop workflows', 'support teams'],
    hubPath: null,
  },
  tiff: {
    name: 'TIFF',
    summary: 'TIFF is often kept for archival or print workflows, then converted for faster delivery and easier sharing.',
    bestFor: 'high-fidelity archives, print handoff, and master files',
    compression: 'Can be large and high fidelity.',
    transparency: 'Varies by workflow, not usually the main reason to choose TIFF.',
    compatibility: 'Strong in pro tools, weaker in casual web workflows.',
    strengths: ['high quality masters', 'good archival fit'],
    tradeoffs: ['heavy files', 'awkward for casual sharing'],
    audience: ['photographers', 'print workflows', 'creative ops'],
    hubPath: null,
  },
  svg: {
    name: 'SVG',
    summary: 'SVG is ideal for vectors, but many users need a raster export for uploads, previews, or design handoff.',
    bestFor: 'logos, icons, diagrams, and infinitely scalable vector artwork',
    compression: 'Text-based vector format rather than raster compression.',
    transparency: 'Can support transparency in vector workflows.',
    compatibility: 'Great on the web, but not every upload field accepts it.',
    strengths: ['sharp at any size', 'small for simple graphics', 'great for logos and icons'],
    tradeoffs: ['not accepted everywhere', 'must be rasterized for many image upload fields'],
    audience: ['designers', 'frontend teams', 'documentation teams'],
    hubPath: '/svg-tools',
  },
  ico: {
    name: 'ICO',
    summary: 'ICO is useful for favicons and app icons, but not as a general-purpose publishing format.',
    bestFor: 'favicons and Windows icon assets',
    compression: 'Icon container rather than general-purpose image compression.',
    transparency: 'Supports transparency in icon workflows.',
    compatibility: 'Useful in specific icon contexts, weak as a general image format.',
    strengths: ['works for favicon pipelines'],
    tradeoffs: ['limited publishing use', 'not a general website image format'],
    audience: ['frontend engineers', 'design systems'],
    hubPath: null,
  },
}

function getFallbackProfile(format: string): FormatProfile {
  const name = slugToLabel(format)

  return {
    slug: format,
    name,
    summary: `${name} is a supported image format that people often convert when they need a better fit for web delivery, sharing, or uploads.`,
    bestFor: `specialized workflows that still need conversion for broader publishing`,
    compression: `Format-specific compression behavior.`,
    transparency: `Transparency support depends on the original file type and workflow.`,
    compatibility: `Compatibility varies across apps and upload systems.`,
    strengths: ['specialized support', 'convertible to common formats'],
    tradeoffs: ['usually less convenient than JPG, PNG, or WebP for publishing'],
    audience: ['specialized workflows'],
    hubPath: null,
  }
}

export function getFormatProfile(format: string): FormatProfile {
  const slug = format.toLowerCase()
  const profile = PROFILE_MAP[slug]

  if (!profile) return getFallbackProfile(slug)

  return {
    slug,
    ...profile,
  }
}

export function getFormatHubPath(format: string): string | null {
  return getFormatProfile(format).hubPath
}

export function getPopularConversionSlugs(limit = 12): string[] {
  return INDEXED_CONVERTER_SLUGS.slice(0, limit)
}

export function buildConversionPageContent(source: string, target: TargetFormat): ConversionPageContent {
  const sourceProfile = getFormatProfile(source)
  const targetProfile = getFormatProfile(target)
  const fromName = sourceProfile.name
  const toName = targetProfile.name
  const currentSlug = `${source.toLowerCase()}-to-${target}`

  return {
    introTitle: `When ${fromName} to ${toName} conversion makes sense`,
    introParagraphs: [
      `${fromName} to ${toName} is usually the right move when your current file fits the source workflow but your final destination needs ${toName.toLowerCase()} instead. Teams typically make this switch for ${targetProfile.bestFor}.`,
      `The main decision is not whether ${fromName} is good or bad. It is whether ${fromName} still matches the job in front of you. ${sourceProfile.summary} ${targetProfile.summary}`,
      `This converter keeps that workflow simple by running entirely in the browser, so you can test ${toName.toLowerCase()} output, verify the result, and download it immediately without sending files to a server.`,
    ],
    keyPoints: [
      {
        title: `Why people leave ${fromName}`,
        body: `The usual trigger is a delivery mismatch: ${sourceProfile.tradeoffs[0]}. If the destination is a website, upload form, CMS, or customer handoff, converting can remove friction fast.`,
      },
      {
        title: `What ${toName} does better`,
        body: `${toName} is stronger when you need ${targetProfile.strengths.join(', ')}. That makes it easier to publish, share, and reuse the image in the next step of the workflow.`,
      },
      {
        title: `What to review after conversion`,
        body: `Check the final file size, edges, text sharpness, and transparency behavior. ${targetProfile.compression} ${targetProfile.transparency}`,
      },
      {
        title: `Who uses this route most`,
        body: `${[...sourceProfile.audience, ...targetProfile.audience].slice(0, 3).join(', ')} often use this conversion when they need a faster publishing handoff.`,
      },
    ],
    useCases: [
      `Convert ${fromName} to ${toName} before uploading images to a CMS, marketplace, help center, or profile editor that rejects the source format.`,
      `Switch from ${fromName} to ${toName} when you need a file that behaves better in browsers, email clients, or collaboration tools.`,
      `Standardize mixed assets into ${toName} so designers, marketers, and developers can work from one predictable output format.`,
      `Create a smaller or more compatible export when the original ${fromName} file is too heavy, too specialized, or too awkward for the final delivery channel.`,
    ],
    steps: [
      `Upload one or more ${fromName} files from your device.`,
      `Choose ${toName} as the output format and start the conversion.`,
      `Preview the finished ${toName} files to confirm quality, transparency, and overall size.`,
      `Download the output and publish it in the target workflow that originally required ${toName}.`,
    ],
    tips: [
      `If the original file contains text, UI, or logos, compare the converted result at 100% zoom before shipping it.`,
      `If the design depends on transparency, confirm that the target format keeps it the way you expect.`,
      `Keep the original ${fromName} master if it is your source-of-truth asset and use ${toName} as the delivery version.`,
      `For web publishing, compare visual quality against the final file size instead of assuming the smallest file is automatically best.`,
      `${targetProfile.compatibility}`,
    ],
    comparisonRows: [
      {
        topic: 'Typical role',
        source: sourceProfile.bestFor,
        target: targetProfile.bestFor,
        recommendation: `Choose ${toName} when the final destination is closer to the target use case than the original source workflow.`,
      },
      {
        topic: 'Compression behavior',
        source: sourceProfile.compression,
        target: targetProfile.compression,
        recommendation: `If file size or transfer speed is a constraint, test the target output and compare the result directly.`,
      },
      {
        topic: 'Transparency handling',
        source: sourceProfile.transparency,
        target: targetProfile.transparency,
        recommendation: `Do a quick visual check whenever background removal, UI overlays, or logos are involved.`,
      },
      {
        topic: 'Compatibility',
        source: sourceProfile.compatibility,
        target: targetProfile.compatibility,
        recommendation: `${toName} is usually the safer publishing choice when compatibility is the reason for converting.`,
      },
    ],
    faqItems: [
      {
        question: `Why should I convert ${fromName} to ${toName}?`,
        answer: `${fromName} to ${toName} is useful when the original file no longer fits the final workflow. The usual reasons are compatibility, file size, transparency requirements, or the need to standardize assets before publishing.`,
      },
      {
        question: `Will converting ${fromName} to ${toName} reduce image quality?`,
        answer: `It depends on the source and target pair. Some conversions are mostly about compatibility, while others trade file size for visual fidelity. The safest approach is to preview the result and compare sharp edges, gradients, and text before publishing.`,
      },
      {
        question: `Is ${fromName} or ${toName} better for websites?`,
        answer: `Neither is universally better. ${fromName} is better when the source workflow matches its strengths, while ${toName} wins when the delivery channel needs ${targetProfile.bestFor}. The right answer depends on the final use case, not the label alone.`,
      },
      {
        question: `Can I convert multiple ${fromName} files at once?`,
        answer: `Yes. The converter supports batch processing, so you can upload several files, convert them locally in the browser, and download the outputs together.`,
      },
      {
        question: `Are my ${fromName} files uploaded to a server?`,
        answer: `No. Conversion happens locally in the browser, so your files stay on your device throughout the workflow.`,
      },
    ],
    sourceRelated: getIndexableConversionsBySource(source)
      .filter((slug) => slug !== currentSlug)
      .slice(0, 6),
    targetRelated: getIndexableConversionsByTarget(target)
      .filter((slug) => slug !== currentSlug)
      .slice(0, 6),
  }
}

export function buildTargetLandingContent(target: TargetFormat): TargetLandingContent {
  const targetProfile = getFormatProfile(target)
  const toName = targetProfile.name

  return {
    introTitle: `Why people convert images to ${toName}`,
    introParagraphs: [
      `A broad "image to ${toName}" route works because many real-world workflows start with the destination requirement, not the source format. Users know they need ${toName} for ${targetProfile.bestFor}, but the incoming files may come from many different tools and devices.`,
      `${targetProfile.summary} That makes this page a practical entry point when you want one converter that handles multiple source formats without stopping to think about the exact file extension first.`,
      `For SEO and usability, this kind of target-first page performs best when it helps users understand when ${toName.toLowerCase()} is the right end state, what changes during conversion, and which source routes are most common.`,
    ],
    keyPoints: [
      {
        title: `${toName} is best when`,
        body: targetProfile.bestFor,
      },
      {
        title: `What you gain`,
        body: targetProfile.strengths.join(', '),
      },
      {
        title: `What to watch`,
        body: targetProfile.tradeoffs.join(', '),
      },
      {
        title: `Compatibility notes`,
        body: targetProfile.compatibility,
      },
    ],
    steps: [
      `Upload the image files you want to standardize into ${toName}.`,
      `Start the conversion and let the browser process each file locally.`,
      `Review the finished ${toName} output for size, sharpness, and background behavior.`,
      `Download the assets and publish them in the workflow that required ${toName}.`,
    ],
    tips: [
      `Use this page when the destination format matters more than the source format.`,
      `If you regularly receive a specific source type, bookmark the dedicated source-to-${target} route as well.`,
      `Keep the original upload if it is your editable master and use ${toName} as the delivery copy.`,
      `Batch conversion is the fastest way to normalize mixed assets into one output format.`,
    ],
    faqItems: [
      {
        question: `What kinds of images should I convert to ${toName}?`,
        answer: `${toName} is usually chosen for ${targetProfile.bestFor}. If that matches your final delivery channel, this page is the right entry point even if your source files come from many different formats.`,
      },
      {
        question: `Can I convert PNG, WebP, HEIC, and other formats to ${toName} here?`,
        answer: `Yes. This target-first converter is designed for mixed input. You can upload several supported source formats and convert them into ${toName} in one place.`,
      },
      {
        question: `Do I need to know the source format before converting to ${toName}?`,
        answer: `No. If you already know the output format you need, this page is enough. If you want a source-specific guide, the related conversion links below are a better fit.`,
      },
      {
        question: `Is conversion to ${toName} private?`,
        answer: `Yes. The workflow runs locally in the browser, so files stay on your device during conversion.`,
      },
    ],
    featuredConversions: getIndexableConversionsByTarget(target).slice(0, 12),
  }
}

export function buildHubPageContent(source: string): HubPageContent {
  const sourceProfile = getFormatProfile(source)
  const fromName = sourceProfile.name

  return {
    introTitle: `${fromName} tools for real publishing workflows`,
    introParagraphs: [
      `${fromName} pages are most useful when they help users move from a format-specific source workflow to the right delivery format. ${sourceProfile.summary}`,
      `This hub groups the most practical ${fromName.toLowerCase()} conversion routes so users can choose the output format that actually matches their next step, whether that is publishing, uploading, emailing, or handing files to another team.`,
      `Strong format hubs also help search engines understand topical coverage. Instead of acting like a thin tag page, this hub explains what ${fromName} is good at, where it creates friction, and which conversions solve the common problems.`,
    ],
    keyPoints: [
      {
        title: `${fromName} is best for`,
        body: sourceProfile.bestFor,
      },
      {
        title: `Why people convert it`,
        body: sourceProfile.tradeoffs.join(', '),
      },
      {
        title: `Who lands on this hub`,
        body: sourceProfile.audience.join(', '),
      },
      {
        title: `Compatibility summary`,
        body: sourceProfile.compatibility,
      },
    ],
    strategySteps: [
      `Start with the reason you are leaving ${fromName}: compatibility, file size, transparency, or workflow standardization.`,
      `Choose the output format that matches the final destination instead of converting by habit.`,
      `Preview the result and compare it against the original when text, logos, screenshots, or photo detail matter.`,
      `Keep the original ${fromName} source if it remains your editable or archival master.`,
    ],
    faqItems: [
      {
        question: `What is the best format to convert ${fromName} into?`,
        answer: `There is no universal best answer. Convert ${fromName} to the format that fits the final job. JPG is often chosen for compatibility, PNG for crisp graphics and transparency, and WebP for efficient web delivery.`,
      },
      {
        question: `Why use a ${fromName} hub page instead of a general converter page?`,
        answer: `A source-format hub is useful when your incoming files are consistently ${fromName}. It helps you choose the right destination format faster and gives you source-specific guidance for that workflow.`,
      },
      {
        question: `Does this ${fromName} converter upload files anywhere?`,
        answer: `No. The tools on this site process files locally in the browser, so the originals stay on your device.`,
      },
    ],
    featuredConversions: getIndexableConversionsBySource(source).slice(0, 12),
  }
}
