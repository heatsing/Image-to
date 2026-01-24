/**
 * Shared SEO helpers: base URL, default metadata
 */

export function getBaseUrl(): string {
  // 优先使用 NEXT_PUBLIC_SITE_URL（用户配置的域名）
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `https://${url}`
  }
  // Vercel 部署时自动提供 VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // 默认回退 URL（构建时或本地开发）
  return 'https://image-to.vercel.app'
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
