import type { Metadata } from 'next'
import './globals.css'
import { getBaseUrl, SITE_NAME, TITLE_SUFFIX, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS } from '@/lib/seo'

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
    template: `%s | ${TITLE_SUFFIX}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: baseUrl }],
  creator: SITE_NAME,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: TITLE_SUFFIX,
    title: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Convert images to JPG, WebP, PNG online for free | ${TITLE_SUFFIX}`,
    description: DEFAULT_DESCRIPTION,
    images: [`${baseUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
