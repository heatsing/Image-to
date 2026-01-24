import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image Converter - Free Online Tool',
  description: '100% free online tool to convert images to JPG, WebP, or PNG. No signup and no files uploaded.',
  keywords: 'image converter, JPG converter, WebP converter, PNG converter, image format converter',
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
