import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { FormatHubPage } from '@/components/FormatHubPage'
import { getBaseUrl, getCanonicalUrl, languageAlternates, getOgLocale, SITE_NAME, TITLE_SUFFIX } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const path = '/png-tools'
  const canonical = getCanonicalUrl(path, locale)
  const alternates = languageAlternates(path)
  const ogLocale = getOgLocale(locale)
  const baseUrl = getBaseUrl()

  const title = 'PNG conversion tools'
  const description =
    'Browse all free PNG image conversion tools. Convert PNG images to JPG, WebP, AVIF, GIF, SVG and more directly in your browser.'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: TITLE_SUFFIX,
      title,
      description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical,
      languages: alternates,
    },
  }
}

export default async function PngToolsPage({ params }: Props) {
  const { locale } = await params

  return (
    <FormatHubPage
      locale={locale}
      sourceFormat="png"
      title="PNG tools"
      description="All PNG-related image conversion tools in one place."
    />
  )
}

