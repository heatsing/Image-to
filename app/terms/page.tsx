import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/seo'

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: 'Terms of Use - Image Converter',
  description:
    'Read the terms of use for Image Converter. Free online image conversion tool with no signup required.',
  openGraph: {
    title: 'Terms of Use - Image Converter',
    description: 'Terms of use for Image Converter.',
    url: `${baseUrl}/terms`,
    type: 'website',
  },
  alternates: { canonical: `${baseUrl}/terms` },
}

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms of Use</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using Image Converter, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Permission is granted to temporarily use Image Converter for personal, non-commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Service Availability</h2>
            <p className="text-slate-600 leading-relaxed">
              Image Converter is provided "as is" and "as available". We do not guarantee that the service will be available at all times or that it will be free from errors or interruptions. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
              <li>Ensuring you have the legal right to convert any images you upload</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Not using the service for any illegal or unauthorized purpose</li>
              <li>Not uploading malicious files or content that could harm the service or other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              In no event shall Image Converter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service, even if Image Converter or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              Your use of Image Converter is also governed by our Privacy Policy. Please review our{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                Privacy Policy
              </Link>{' '}
              to understand how we handle your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to revise these terms at any time without notice. By using this service, you are agreeing to be bound by the then current version of these Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms of Use, please{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>

        <BenefitsSection title="Why Choose Image Converter?" subtitle="Free, local, and secure—image conversion the way it should be." />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
