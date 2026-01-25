/**
 * Shared SEO helpers: base URL, default metadata
 * Production site: https://sckde.com
 */

export const SITE_URL = 'https://sckde.com'

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = String(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, '')
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }
  return SITE_URL
}

export const SITE_NAME = 'Image Converter'
export const DEFAULT_DESCRIPTION =
  '100% free online image converter. Convert images to JPG, WebP, or PNG locally—no uploads, no signup. Your files never leave your device.'

export const DEFAULT_KEYWORDS = [
  'image converter',
  'JPG converter',
  'WebP converter',
  'PNG converter',
  'convert image',
  'image format converter',
  'free image converter',
  'local image conversion',
  'batch image converter',
]
