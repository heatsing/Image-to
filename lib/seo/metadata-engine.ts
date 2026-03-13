import { slugToLabel, getTargetLabel, TargetFormat } from '@/lib/formats'
import { type Locale } from '@/lib/i18n/config'
import {
  getBaseUrl,
  getCanonicalUrl,
  languageAlternates,
  getOgLocale,
  SITE_NAME,
  TITLE_SUFFIX,
} from '@/lib/seo'
import { generateConversionDescription } from '@/lib/seo/descriptions'

export type FormatTraitKey =
  | 'transparency'
  | 'lossless'
  | 'photo'
  | 'compatibility'
  | 'modern'
  | 'compression'
  | 'apple'
  | 'vector'
  | 'animation'
  | 'legacy'

export type FormatTraits = {
  name: string
  traits: FormatTraitKey[]
}

const FORMAT_TRAITS: Record<string, FormatTraits> = {
  png: {
    name: 'PNG',
    traits: ['transparency', 'lossless', 'compatibility'],
  },
  jpg: {
    name: 'JPG',
    traits: ['photo', 'compatibility'],
  },
  jpeg: {
    name: 'JPEG',
    traits: ['photo', 'compatibility'],
  },
  webp: {
    name: 'WebP',
    traits: ['modern', 'compression'],
  },
  avif: {
    name: 'AVIF',
    traits: ['modern', 'compression'],
  },
  heic: {
    name: 'HEIC',
    traits: ['apple', 'photo', 'compatibility'],
  },
  svg: {
    name: 'SVG',
    traits: ['vector', 'compatibility'],
  },
  gif: {
    name: 'GIF',
    traits: ['animation', 'compatibility'],
  },
  bmp: {
    name: 'BMP',
    traits: ['legacy', 'compatibility'],
  },
  tiff: {
    name: 'TIFF',
    traits: ['photo', 'legacy'],
  },
  ico: {
    name: 'ICO',
    traits: ['legacy', 'compatibility'],
  },
}

export function normalizeFormatName(format: string): string {
  const lower = format.toLowerCase()
  if (FORMAT_TRAITS[lower]) {
    return FORMAT_TRAITS[lower].name
  }
  return slugToLabel(lower)
}

export function getFormatTraits(format: string): FormatTraits {
  const lower = format.toLowerCase()
  const baseName = normalizeFormatName(lower)
  return (
    FORMAT_TRAITS[lower] ?? {
      name: baseName,
      traits: [],
    }
  )
}

export function hashRouteSlug(slug: string): number {
  let hash = 5381
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i)
  }
  return hash >>> 0
}

const TITLE_TEMPLATES: string[] = [
  '{FROM} to {TO} Converter Online',
  'Convert {FROM} to {TO} Online',
  'Free {FROM} to {TO} Image Converter',
  'Change {FROM} into {TO} Format Online',
  '{FROM} to {TO} Tool for Fast Image Conversion',
]

function pickTitleTemplate(slug: string): string {
  const idx = hashRouteSlug(slug) % TITLE_TEMPLATES.length
  return TITLE_TEMPLATES[idx]
}

export function generateSeoTitle(fromFormat: string, toFormat: TargetFormat, slug: string): string {
  const fromName = normalizeFormatName(fromFormat)
  const toName = getTargetLabel(toFormat)
  const template = pickTitleTemplate(slug)
  return template.replace('{FROM}', fromName).replace('{TO}', toName)
}

export function generateMetaDescription(fromFormat: string, toFormat: TargetFormat, slug: string): string {
  const fromName = normalizeFormatName(fromFormat)
  const toName = getTargetLabel(toFormat)
  // Delegate to existing deterministic description engine (already length-controlled)
  return generateConversionDescription(fromName, toName, slug)
}

export function generateOpenGraphTitle(fromFormat: string, toFormat: TargetFormat, slug: string): string {
  return generateSeoTitle(fromFormat, toFormat, slug)
}

export function generateOpenGraphDescription(
  fromFormat: string,
  toFormat: TargetFormat,
  slug: string
): string {
  return generateMetaDescription(fromFormat, toFormat, slug)
}

export function generateTwitterTitle(fromFormat: string, toFormat: TargetFormat, slug: string): string {
  return generateSeoTitle(fromFormat, toFormat, slug)
}

export function generateTwitterDescription(
  fromFormat: string,
  toFormat: TargetFormat,
  slug: string
): string {
  return generateMetaDescription(fromFormat, toFormat, slug)
}

export function generateCanonicalUrl(path: string, locale: Locale): string {
  return getCanonicalUrl(path, locale)
}

export function generateRobotsMeta(indexable: boolean) {
  return {
    index: indexable,
    follow: true,
    nocache: false,
    googleBot: {
      index: indexable,
      follow: true,
    },
  } as const
}

export function buildConversionMetadataBase(
  slug: string,
  locale: Locale,
  source: string,
  target: TargetFormat
) {
  const fromName = normalizeFormatName(source)
  const toName = getTargetLabel(target)

  const title = generateSeoTitle(source, target, slug)
  const description = generateMetaDescription(source, target, slug)

  const pagePath = `/${slug}`
  const canonical = generateCanonicalUrl(pagePath, locale)
  const alternates = languageAlternates(pagePath)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  return {
    title,
    description,
    canonical,
    alternates,
    ogLocale,
    baseUrl,
    fromName,
    toName,
  }
}

export function generateStructuredData(
  slug: string,
  locale: Locale,
  source: string,
  target: TargetFormat,
  canonical: string,
  description: string
) {
  const baseUrl = getBaseUrl()
  const fromName = normalizeFormatName(source)
  const toName = getTargetLabel(target)
  const pageTitle = generateSeoTitle(source, target, slug)

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    url: canonical,
    description,
  }

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${fromName} to ${toName} Converter`,
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    url: canonical,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl,
    },
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${fromName} Tools`,
        item: `${baseUrl}/${locale === 'en' ? '' : `${locale}/`}png-tools`.replace('//', '/'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${fromName} to ${toName} Converter`,
        item: canonical,
      },
    ],
  }

  return [webPage, softwareApp, breadcrumbs]
}

