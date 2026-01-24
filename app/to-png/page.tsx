import Navigation from '@/components/Navigation'
import UniversalImageConverter from '@/components/UniversalImageConverter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image to PNG Converter - Free Online Tool',
  description: '100% free online tool. Convert images to PNG locally—no uploads, no signup. Your files never leave your device.',
}

export default function ToPNGPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Image to PNG Converter</h2>
          <p className="text-slate-600 mb-3">
            100% free. Convert images to PNG <strong>locally</strong>—no uploads, no signup. Your files never leave your device.
          </p>
        </div>

        <div className="card rounded-2xl p-6 md:p-8">
          <UniversalImageConverter
            outputFormat="png"
            title="Image to PNG Converter"
            description="100% free. Convert images to PNG locally—no uploads, no signup."
          />
        </div>

        {/* Supported Formats Section */}
        <section className="mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Supported Formats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">WebP to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PNG to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">JPEG to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">JFIF to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">SVG to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">BMP to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">AVIF to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">HEIC to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">TIFF to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">CUR to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">DDS to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">FTS to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">GIF to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">HDR to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">ICO to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">JPE to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">JPS to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">MNG to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PAM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PBM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PCD to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PCX to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PFM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PGM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PICON to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PICT to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PNM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PPM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">PSD to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">RAS to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">RW2 to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">SGI to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">TGA to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">WBMP to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">XBM to PNG</div>
              <div className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors">XPM to PNG</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-12 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-slate-900 mb-1">Local conversion</h4>
              <p className="text-xs text-slate-600">Conversion runs on your device only. Files never leave your computer—no uploads, no servers.</p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-slate-900 mb-1">Super Fast</h4>
              <p className="text-xs text-slate-600">Each file costs about 1 second for conversion. Batch process hundreds of images at once.</p>
            </div>
            <div className="card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-slate-900 mb-1">Fully Functional</h4>
              <p className="text-xs text-slate-600">Handles all jobs involved with image to PNG conversion. From any format to PNG.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto py-6 flex-shrink-0">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2025 Image to PNG Converter - 100% Free Online Tool</p>
          <p className="text-xs mt-2">No signup · No uploads · 100% local conversion in your browser</p>
        </div>
      </footer>
    </div>
  )
}
