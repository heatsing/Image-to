import type { FAQItem } from '@/lib/faq-data'

export type TopicCategory = 'workflow' | 'publishing' | 'performance'

export type TopicCardItem = {
  title: string
  body: string
}

export type TopicDefinition = {
  slug: string
  category: TopicCategory
  title: string
  description: string
  introTitle: string
  introParagraphs: string[]
  highlights: TopicCardItem[]
  steps: string[]
  pitfalls: string[]
  faqItems: FAQItem[]
  relatedConversions: string[]
  relatedGuides: string[]
  relatedTopics: string[]
  formats: string[]
}

export const TOPICS: TopicDefinition[] = [
  {
    slug: 'reduce-image-file-size-without-losing-quality',
    category: 'performance',
    title: 'Reduce Image File Size Without Losing Quality',
    description: 'A practical workflow for shrinking image payloads without making photos, screenshots, and product assets look broken.',
    introTitle: 'How to make images smaller without trashing them',
    introParagraphs: [
      'Most teams do not have an image-size problem. They have a workflow problem. The wrong format gets used, the export settings are copied across every asset type, and the final page ends up heavy anyway.',
      'The fastest wins usually come from format choice before compression. A photo, a transparent logo, and a screenshot should not all be optimized the same way.',
      'Use this topic when the goal is simple: smaller files, cleaner delivery, and no visible quality collapse on the final page.',
    ],
    highlights: [
      { title: 'Format choice beats tiny quality tweaks', body: 'Switching PNG photos to JPG or WebP usually saves more weight than shaving a few points off a quality slider.' },
      { title: 'Screenshots and logos need different rules', body: 'Sharp edges, text, and transparency often break first when teams compress everything as if it were a photo.' },
      { title: 'Delivery format and source format can differ', body: 'Keep a stronger working asset if needed, then publish a lighter format for the site or upload target.' },
      { title: 'Measure the page, not only the file', body: 'The right optimization choice is the one that improves the actual page experience without damaging trust.' },
    ],
    steps: [
      'Separate assets into photos, screenshots, transparent graphics, and decorative images before converting anything.',
      'Pick the lighter valid format first: JPG or WebP for photos, PNG or WebP for transparency, and test screenshots in both PNG and WebP.',
      'Convert a few representative files and compare them on the real page instead of judging from a zoomed-in editor view.',
      'Lock the winning route into your publishing workflow so the team stops re-solving the same decision every week.',
    ],
    pitfalls: [
      'Do not compress screenshots the same way you compress product photos.',
      'Do not convert transparent graphics to JPG just to force a smaller file.',
      'Do not chase a smaller file if the page now looks less trustworthy.',
      'Do not standardize on one format unless the destination really behaves the same for every asset type.',
    ],
    faqItems: [
      { question: 'What is the fastest way to reduce image file size?', answer: 'Start by switching to the right format for the asset type, then tune quality only after that.' },
      { question: 'Is WebP always the best way to reduce image size?', answer: 'No. WebP is strong for many assets, but some screenshots and transparent graphics still need PNG, and some compatibility-first workflows still prefer JPG.' },
      { question: 'How do I reduce image size without losing quality?', answer: 'Use the format that matches the job, compare a few real assets, and avoid pushing compression past the point where the page feels less credible.' },
      { question: 'Should I convert PNG to JPG to make files smaller?', answer: 'Only when the image does not need transparency and behaves more like a photo than a graphic.' },
    ],
    relatedConversions: ['png-to-webp', 'jpg-to-webp', 'png-to-jpg', 'avif-to-webp'],
    relatedGuides: ['how-to-optimize-images-for-fast-websites', 'best-image-format-for-web', 'png-vs-webp'],
    relatedTopics: ['speed-up-image-heavy-pages', 'optimize-screenshots-for-docs-and-support', 'prepare-product-images-for-marketplaces'],
    formats: ['jpg', 'png', 'webp', 'avif'],
  },
  {
    slug: 'fix-heic-upload-issues',
    category: 'workflow',
    title: 'Fix HEIC Upload Issues',
    description: 'A task-first guide for when iPhone photos fail in forms, seller portals, support tools, and generic website uploads.',
    introTitle: 'Why HEIC uploads fail and what to do next',
    introParagraphs: [
      'HEIC problems are rarely mysterious. The file came from an iPhone, the destination expects JPG or PNG, and the upload breaks somewhere between preview, validation, and final submission.',
      'The fix is usually not to rework the whole photo library. It is to produce a reliable delivery copy in the format the destination already handles well.',
      'Use this topic when the problem is practical: get the upload to work now, keep the source file if you want it, and stop losing time to rejected phone images.',
    ],
    highlights: [
      { title: 'The destination is usually the blocker', body: 'Many forms, support tools, and seller dashboards still treat JPG as the safe input format.' },
      { title: 'JPG is the default handoff answer', body: 'When you just need the upload to work, HEIC to JPG is usually the highest-confidence path.' },
      { title: 'Keep HEIC if your workflow supports it', body: 'There is no need to destroy the source format when the real issue is just outward-facing compatibility.' },
      { title: 'Batch conversion solves recurring pain fast', body: 'If a whole folder of iPhone images is failing, convert the batch instead of troubleshooting each file individually.' },
    ],
    steps: [
      'Confirm the rejected files came from an iPhone or another HEIC-producing workflow.',
      'Convert the images to JPG first unless the destination specifically asks for PNG.',
      'Retry the upload with a smaller batch to verify the problem was the source format and not the form itself.',
      'Keep the successful conversion route saved for the next upload flow that rejects phone images.',
    ],
    pitfalls: [
      'Do not keep retrying the same HEIC file if the platform clearly expects another format.',
      'Do not assume every website will preview HEIC correctly just because the phone can display it.',
      'Do not flatten transparent graphics into JPG if the original problem is not a photo upload.',
      'Do not delete the source file unless the workflow really no longer needs it.',
    ],
    faqItems: [
      { question: 'Why are my iPhone photos not uploading?', answer: 'Many iPhone photos are HEIC files, and some websites still only handle JPG or PNG cleanly.' },
      { question: 'What is the best format to replace HEIC for uploads?', answer: 'JPG is usually the safest answer when the goal is broad upload compatibility.' },
      { question: 'Should I convert HEIC to PNG instead of JPG?', answer: 'Only if the destination specifically asks for PNG or the image needs transparency, which most phone photos do not.' },
      { question: 'Can I keep HEIC and still upload successfully?', answer: 'Yes, if the destination supports it. Otherwise convert a copy and keep HEIC as the original source.' },
    ],
    relatedConversions: ['heic-to-jpg', 'heic-to-png', 'heic-to-webp', 'jpg-to-webp'],
    relatedGuides: ['heic-vs-jpg', 'how-to-convert-iphone-photos-to-jpg', 'best-image-format-for-ecommerce-images'],
    relatedTopics: ['prepare-product-images-for-marketplaces', 'choose-the-right-format-for-email-and-chat', 'reduce-image-file-size-without-losing-quality'],
    formats: ['heic', 'jpg', 'png', 'webp'],
  },
  {
    slug: 'prepare-transparent-logos-for-websites',
    category: 'publishing',
    title: 'Prepare Transparent Logos for Websites',
    description: 'Choose the right format and delivery workflow for transparent logos, badges, overlays, and clean-edge brand assets.',
    introTitle: 'How to publish transparent logos without ugly edges',
    introParagraphs: [
      'Transparent brand assets fail in predictable ways. The background gets flattened, the edges go fuzzy, or the file stays much heavier than it needs to be.',
      'The key decision is usually not artistic. It is format fit. JPG is wrong for transparency, PNG is the safe workflow default, and WebP can be the lighter delivery layer when tested carefully.',
      'Use this topic when you need a logo, badge, overlay, or cutout to stay clean on the web without carrying unnecessary weight.',
    ],
    highlights: [
      { title: 'PNG is still the safety-first choice', body: 'For transparent working assets, PNG remains the most predictable and least surprising route.' },
      { title: 'WebP is worth testing for delivery', body: 'If the published result stays crisp, WebP can cut payload without breaking transparency.' },
      { title: 'JPG is a dead end for transparency', body: 'The alpha channel has to be flattened, which defeats the entire asset requirement.' },
      { title: 'Edge quality matters more than raw file size', body: 'A lighter logo is not a win if it now looks soft or dirty against real page backgrounds.' },
    ],
    steps: [
      'Keep the source asset in a transparency-safe format such as PNG or SVG while you evaluate delivery options.',
      'Publish a PNG first if reliability matters more than squeezing every kilobyte out of the file.',
      'Test WebP as a lighter delivery copy on the real site background, including light and dark sections if the page uses both.',
      'Standardize the winning route so future logo uploads do not get re-exported ad hoc by different team members.',
    ],
    pitfalls: [
      'Do not export a transparent logo to JPG.',
      'Do not judge logo quality only on a white canvas if the actual site has gradients, color blocks, or photography behind it.',
      'Do not assume the smallest file is the right file if the outline now looks dirty.',
      'Do not mix multiple logo export rules across teams if you want consistent brand presentation.',
    ],
    faqItems: [
      { question: 'What is the best format for a transparent logo on a website?', answer: 'PNG is usually the safest working and publishing format, while WebP is worth testing as a lighter delivery copy.' },
      { question: 'Can WebP keep transparency for logos?', answer: 'Yes. That is why PNG and WebP are often compared for transparent brand assets.' },
      { question: 'Why does my logo look bad after conversion?', answer: 'The format may be wrong for transparency or the file was compressed too aggressively for clean edges.' },
      { question: 'Should I keep SVG or convert it to PNG?', answer: 'Keep SVG if your workflow supports it, but PNG is often the easier fallback when you need a predictable raster export.' },
    ],
    relatedConversions: ['svg-to-png', 'png-to-webp', 'webp-to-png', 'png-to-jpg'],
    relatedGuides: ['best-image-format-for-transparent-backgrounds', 'png-vs-webp', 'best-image-format-for-web'],
    relatedTopics: ['optimize-screenshots-for-docs-and-support', 'choose-the-right-format-for-email-and-chat', 'speed-up-image-heavy-pages'],
    formats: ['png', 'webp', 'svg', 'jpg'],
  },
  {
    slug: 'optimize-screenshots-for-docs-and-support',
    category: 'publishing',
    title: 'Optimize Screenshots for Docs and Support',
    description: 'Pick the right screenshot workflow for help centers, product docs, changelogs, bug reports, and support articles.',
    introTitle: 'How to keep screenshots readable and lightweight',
    introParagraphs: [
      'Screenshots are one of the easiest asset types to damage with the wrong export rule. Text turns soft, interfaces lose clarity, and the support page becomes harder to trust.',
      'The main question is whether the image behaves more like a precision graphic or more like a compressed photo. For most screenshots, PNG starts as the safer baseline.',
      'Use this topic when you need documentation and support assets to stay readable while still respecting page weight and publishing speed.',
    ],
    highlights: [
      { title: 'Readability comes first', body: 'If a user cannot read the screenshot clearly, the lighter file is not helping the page.' },
      { title: 'PNG is the default starting point', body: 'Screenshots with UI text, diagrams, or sharp lines usually hold up better in PNG.' },
      { title: 'WebP needs a real test pass', body: 'WebP can still be the right delivery format, but only after checking the exact screenshot type on the live page.' },
      { title: 'Docs pages often repeat the same mistakes', body: 'A single export rule for every screenshot usually creates either bloated docs or blurry instructions.' },
    ],
    steps: [
      'Start with PNG when the screenshot contains UI text, code, diagrams, or line-heavy interface elements.',
      'Test a WebP copy only after you verify the PNG version looks correct and you know the page would benefit from lower payload.',
      'Check screenshot clarity on both desktop and mobile breakpoints, because small text problems get worse there.',
      'Lock in a screenshot workflow for the docs team so support and product pages stay visually consistent.',
    ],
    pitfalls: [
      'Do not compress screenshots like product photos.',
      'Do not choose WebP for docs pages without checking text and icon crispness on the actual page.',
      'Do not mix export rules across the same article or changelog page.',
      'Do not crop away context so aggressively that the image stops helping the reader.',
    ],
    faqItems: [
      { question: 'What is the best format for screenshots on a website?', answer: 'PNG is usually the safest starting point, especially when the screenshot contains text or sharp UI details.' },
      { question: 'Can WebP work for screenshots?', answer: 'Yes, but only if the final result still looks crisp enough on the live page.' },
      { question: 'Why do screenshots get blurry after conversion?', answer: 'The export settings or delivery format may be treating a screenshot like a photo instead of a precision graphic.' },
      { question: 'Should support articles use JPG screenshots?', answer: 'Usually no. JPG is more likely to soften text and interface edges.' },
    ],
    relatedConversions: ['png-to-webp', 'webp-to-png', 'jpg-to-png', 'png-to-jpg'],
    relatedGuides: ['png-vs-webp', 'best-image-format-for-web', 'how-to-optimize-images-for-fast-websites'],
    relatedTopics: ['prepare-transparent-logos-for-websites', 'reduce-image-file-size-without-losing-quality', 'speed-up-image-heavy-pages'],
    formats: ['png', 'webp', 'jpg'],
  },
  {
    slug: 'prepare-product-images-for-marketplaces',
    category: 'workflow',
    title: 'Prepare Product Images for Marketplaces',
    description: 'A repeatable workflow for turning phone photos and mixed assets into marketplace-friendly product images that actually upload.',
    introTitle: 'How to get product images ready for seller portals',
    introParagraphs: [
      'Marketplace image workflows usually fail on the basics: wrong source format, oversized files, inconsistent backgrounds, or a portal that quietly expects JPG.',
      'The fastest path is to treat marketplace prep as a publishing task, not a photography task. You need the accepted format, a reasonable file size, and a clean product presentation.',
      'Use this topic when you are preparing product photos from phones, suppliers, design teams, or mixed asset folders for a portal that needs reliable uploads.',
    ],
    highlights: [
      { title: 'JPG is still the safest marketplace default', body: 'Seller portals and upload forms are much more likely to accept JPG without surprises.' },
      { title: 'HEIC is a common hidden blocker', body: 'Phone photos may look fine locally but still fail once they hit the listing form.' },
      { title: 'Transparent assets are a separate workflow', body: 'If the product image needs transparency, PNG or WebP may still be relevant for supporting assets.' },
      { title: 'Consistency beats ad hoc fixes', body: 'A marketplace team benefits more from a repeatable prep workflow than from manual one-off corrections.' },
    ],
    steps: [
      'Separate source files into phone photos, supplier photos, transparent cutouts, and any asset that must preserve sharp graphic edges.',
      'Convert phone photos from HEIC to JPG first if the portal is even slightly compatibility-sensitive.',
      'Use lighter delivery formats only after you confirm the portal accepts them and the listing still looks trustworthy.',
      'Save the successful route as the default prep workflow for the next batch of listings.',
    ],
    pitfalls: [
      'Do not assume marketplace forms will handle HEIC just because the phone can preview it.',
      'Do not over-compress product images until they look cheap or noisy.',
      'Do not use JPG for assets that must keep transparency around the product.',
      'Do not let every seller or operator invent a different export process.',
    ],
    faqItems: [
      { question: 'What is the best image format for marketplace product photos?', answer: 'JPG is usually the safest default because it balances compatibility, file size, and visual trust.' },
      { question: 'Why do seller portals reject some phone photos?', answer: 'Many phone photos are HEIC files, and some portals still expect JPG.' },
      { question: 'Should product cutouts be PNG or JPG?', answer: 'Use PNG when the asset needs transparency. Use JPG for standard product-photo workflows.' },
      { question: 'Can WebP be used for ecommerce listings?', answer: 'Sometimes, but only after you confirm the platform accepts it and the page still renders the image correctly.' },
    ],
    relatedConversions: ['heic-to-jpg', 'jpg-to-webp', 'png-to-jpg', 'png-to-webp'],
    relatedGuides: ['best-image-format-for-ecommerce-images', 'heic-vs-jpg', 'how-to-convert-iphone-photos-to-jpg'],
    relatedTopics: ['fix-heic-upload-issues', 'reduce-image-file-size-without-losing-quality', 'choose-the-right-format-for-email-and-chat'],
    formats: ['heic', 'jpg', 'png', 'webp'],
  },
  {
    slug: 'speed-up-image-heavy-pages',
    category: 'performance',
    title: 'Speed Up Image-Heavy Pages',
    description: 'A page-level approach to lighter image delivery for stores, blogs, portfolios, guides, and any template overloaded with visuals.',
    introTitle: 'How to improve pages that are carrying too many image bytes',
    introParagraphs: [
      'Image-heavy pages are slow for one boring reason: too many assets are being delivered in heavyweight formats for the job they actually perform.',
      'The fix is not one heroic optimization pass. It is a system: choose the right format by asset type, remove waste from repeat patterns, and standardize the route across the page template.',
      'Use this topic when the whole page is heavy, not just one image. The goal is cleaner layout performance without making the page feel visually cheap.',
    ],
    highlights: [
      { title: 'Template rules matter more than one-off fixes', body: 'A category page or guide template can quietly repeat the same image mistake dozens of times.' },
      { title: 'Photos, screenshots, and logos should not share one format policy', body: 'The wrong page-level assumption creates recurring weight across every new page you ship.' },
      { title: 'WebP often becomes the default delivery win', body: 'It is usually the easiest format upgrade for photo-heavy pages that still need broad browser support.' },
      { title: 'Good performance still needs visual trust', body: 'If the page looks low-quality after optimization, the user experience may still get worse.' },
    ],
    steps: [
      'Audit the page by asset type so you know which images are photos, screenshots, transparent graphics, and decorative duplicates.',
      'Move heavy photo blocks toward JPG or WebP depending on the page goals and compatibility needs.',
      'Keep screenshots and transparent assets on their own decision path instead of forcing them into the same format as photos.',
      'Turn the winning rules into a repeatable template standard so every future page gets the benefit automatically.',
    ],
    pitfalls: [
      'Do not optimize a category or guide page asset by asset if the template keeps generating the same problem.',
      'Do not convert screenshots to a lighter format without checking whether the content stays readable.',
      'Do not ignore decorative images that repeat across many cards, tiles, or sections.',
      'Do not measure success only by kilobytes if the page now feels visually unreliable.',
    ],
    faqItems: [
      { question: 'How do I speed up pages with many images?', answer: 'Start by grouping assets by type, then standardize a lighter format policy for each group instead of treating every file the same.' },
      { question: 'Should image-heavy pages use WebP?', answer: 'Often yes for photos, but you should still test screenshots and transparent graphics separately.' },
      { question: 'Why are image-heavy pages still slow after compression?', answer: 'Because the main problem may be the template repeating the wrong asset formats across many sections.' },
      { question: 'What matters more for page speed: format or compression?', answer: 'Format choice usually moves the needle first, then compression helps refine the result.' },
    ],
    relatedConversions: ['jpg-to-webp', 'png-to-webp', 'avif-to-webp', 'png-to-jpg'],
    relatedGuides: ['how-to-optimize-images-for-fast-websites', 'best-image-format-for-web', 'png-vs-webp'],
    relatedTopics: ['reduce-image-file-size-without-losing-quality', 'optimize-screenshots-for-docs-and-support', 'prepare-transparent-logos-for-websites'],
    formats: ['jpg', 'png', 'webp', 'avif'],
  },
  {
    slug: 'choose-the-right-format-for-email-and-chat',
    category: 'publishing',
    title: 'Choose the Right Format for Email and Chat',
    description: 'A compatibility-first workflow for sending images through email, support threads, chat tools, and generic sharing channels.',
    introTitle: 'How to choose image formats when the destination is not specialized',
    introParagraphs: [
      'Email and chat are where format theory usually loses to compatibility. The recipient needs to open the image, preview it quickly, and understand it with no troubleshooting.',
      'That usually means JPG for photos, PNG for screenshots and transparency-sensitive assets, and a bias toward the formats that are least likely to confuse general-purpose tools.',
      'Use this topic when you are handing images to other people rather than publishing them through a tightly controlled web stack.',
    ],
    highlights: [
      { title: 'Compatibility outranks elegance', body: 'The best format is the one the recipient can open and use immediately.' },
      { title: 'JPG is still the default handoff format for photos', body: 'It remains the safest answer for broad sharing across unknown tools and devices.' },
      { title: 'PNG is usually better for screenshots', body: 'Text, annotations, and interface detail often survive better in PNG.' },
      { title: 'HEIC is a recurring sharing problem', body: 'Phone images may need conversion before they work smoothly in support threads, email, or attachments.' },
    ],
    steps: [
      'Start by identifying whether the image is a photo, a screenshot, or a transparent graphic.',
      'Use JPG for ordinary photos, PNG for screenshots and transparency-sensitive assets, and avoid exotic source formats when you do not control the recipient workflow.',
      'Convert HEIC phone images before sending them if the recipient environment is unknown or compatibility-sensitive.',
      'Save the handoff-ready copy separately so the next share does not require repeating the same decision.',
    ],
    pitfalls: [
      'Do not send HEIC by default when the recipient environment is unknown.',
      'Do not use JPG for screenshots that depend on text clarity.',
      'Do not assume a chat preview means the original file will behave correctly everywhere else in the thread.',
      'Do not flatten transparency unless the destination really does not need it.',
    ],
    faqItems: [
      { question: 'What image format is best for email attachments?', answer: 'JPG is usually the safest for photos, while PNG is better for screenshots and images that need sharp text or transparency.' },
      { question: 'Why does a photo work on my phone but not in a support thread?', answer: 'It may be a HEIC file, and the receiving tool may expect JPG or PNG instead.' },
      { question: 'Should I send screenshots as JPG or PNG?', answer: 'PNG is usually the better option because it preserves text and interface detail more reliably.' },
      { question: 'What should I do before sharing iPhone photos broadly?', answer: 'Convert HEIC to JPG when you want the lowest-friction sharing path.' },
    ],
    relatedConversions: ['heic-to-jpg', 'jpg-to-png', 'png-to-jpg', 'webp-to-jpg'],
    relatedGuides: ['heic-vs-jpg', 'how-to-convert-iphone-photos-to-jpg', 'best-image-format-for-web'],
    relatedTopics: ['fix-heic-upload-issues', 'prepare-transparent-logos-for-websites', 'optimize-screenshots-for-docs-and-support'],
    formats: ['heic', 'jpg', 'png', 'webp'],
  },
]

export function getTopicSlugs(): string[] {
  return TOPICS.map((topic) => topic.slug)
}

export function getTopicBySlug(slug: string): TopicDefinition | null {
  return TOPICS.find((topic) => topic.slug === slug) ?? null
}

export function getTopicSummaries() {
  return TOPICS.map(({ slug, title, description, category }) => ({ slug, title, description, category }))
}

export function getFeaturedTopicSlugs(limit = 4): string[] {
  return TOPICS.slice(0, limit).map((topic) => topic.slug)
}

export function getTopicCategoryLabel(category: TopicCategory): string {
  if (category === 'performance') return 'Performance'
  if (category === 'publishing') return 'Publishing'
  return 'Workflow'
}

export function getRelatedTopicSlugs(slug: string, limit = 4): string[] {
  const topic = getTopicBySlug(slug)
  if (!topic) return []
  if (topic.relatedTopics.length) return topic.relatedTopics.slice(0, limit)

  return TOPICS.filter((candidate) => candidate.slug !== slug)
    .slice(0, limit)
    .map((candidate) => candidate.slug)
}

export function getRelevantTopicSlugsForFormats(formats: string[], limit = 4): string[] {
  const uniqueFormats = Array.from(new Set(formats.map((format) => format.toLowerCase())))

  return TOPICS
    .map((topic) => ({
      slug: topic.slug,
      score: topic.formats.filter((format) => uniqueFormats.includes(format)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.slug)
}
