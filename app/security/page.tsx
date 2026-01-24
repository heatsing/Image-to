import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/seo'

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: 'Security - Image Converter',
  description:
    'Learn about the security measures and privacy protections in place at Image Converter. 100% local processing, no data collection.',
  openGraph: {
    title: 'Security - Image Converter',
    description: 'Learn about the security measures and privacy protections at Image Converter.',
    url: `${baseUrl}/security`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/security` },
}

export default function SecurityPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Security</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your security and privacy are our top priorities. Learn how we protect your data.
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">100% Local Processing</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              All image conversion happens entirely on your device using your browser's built-in capabilities. Your files never leave your computer—they are never uploaded to our servers or any third-party services.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-4 ml-4">
              <li>No file uploads to external servers</li>
              <li>No data transmission over the internet</li>
              <li>No storage of your images on our systems</li>
              <li>Complete privacy and security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No Data Collection</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We do not collect, store, or track any personal information or image data. Our service operates without:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>User accounts or registration</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cookies or tracking technologies</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Analytics or usage tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Third-party data sharing</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Browser-Based Security</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our tool uses standard web technologies (HTML5 Canvas API) that are built into modern browsers. All processing is done client-side, ensuring:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>No server-side vulnerabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>No network transmission of your files</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Immediate file deletion from memory after conversion</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Best Practices</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              To ensure maximum security when using our tool:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>Use a modern, up-to-date browser with security features enabled</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>Only convert images from trusted sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>Clear your browser cache after sensitive conversions if needed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>Download converted files immediately and close the browser tab when done</span>
              </li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Questions About Security?</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions or concerns about security, please{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">
                contact us
              </Link>
              . We're committed to maintaining the highest standards of privacy and security.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
