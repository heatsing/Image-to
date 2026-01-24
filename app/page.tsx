import Navigation from '@/components/Navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Converter - Free Online Tool',
  description: '100% free online tool. Convert images to JPG, WebP, or PNG locally—no uploads, no signup.',
}

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Image Format Converter</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert images to JPG, WebP, or PNG. 100% free and secure. <strong>All conversion happens locally</strong>—your files never leave your device.
          </p>
        </div>

        {/* Converter Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/convert-to-jpg"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to JPG</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert any image format to JPG. Perfect for photos and web use.
            </p>
            <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/convert-to-webp"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to WebP</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert images to WebP for smaller file sizes and faster loading.
            </p>
            <span className="inline-flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/convert-to-png"
            className="card rounded-2xl p-8 hover:shadow-lg transition-all hover:scale-105 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Images to PNG</h2>
            <p className="text-slate-600 text-sm mb-4">
              Convert images to PNG for lossless quality and transparency support.
            </p>
            <span className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
              Convert Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Features */}
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Why use this tool?</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card rounded-xl p-6 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-semibold text-slate-900 mb-1">Local conversion</h4>
            <p className="text-xs text-slate-600">
              Conversion runs entirely on your device. Files never leave your computer—no uploads, no servers.
            </p>
          </div>
          <div className="card rounded-xl p-6 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-slate-900 mb-1">Super Fast</h4>
            <p className="text-xs text-slate-600">
              Each file costs about 1 second for conversion. Batch process hundreds of images at once.
            </p>
          </div>
          <div className="card rounded-xl p-6 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-slate-900 mb-1">Fully Functional</h4>
            <p className="text-xs text-slate-600">
              Handles all jobs involved with image conversion. From any format to JPG, WebP, or PNG.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto py-6 flex-shrink-0">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2025 Image Converter - 100% Free Online Tool</p>
          <p className="text-xs mt-2">No signup · No uploads · 100% local conversion in your browser</p>
        </div>
      </footer>
    </div>
  )
}
