import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import BenefitsSection from '@/components/BenefitsSection'
import Link from 'next/link'
import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'
import { generatePageMetadata } from '@/lib/seo-i18n'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = getMessages(locale)
  const pageTitle = messages.common.privacy
  const description = 'Read the privacy policy for Image Converter. Learn how we protect your privacy with 100% local processing and no data collection.'
  const path = addLocaleToPath('/privacy', locale)

  return generatePageMetadata({
    locale,
    title: pageTitle,
    description,
    keywords: ['privacy', 'privacy policy', 'data protection', 'image converter'],
    path: path.startsWith('/') ? path : `/${path}`,
  })
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              At Image Converter, we are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our service. Since all processing happens locally in your browser, we have minimal data collection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Do NOT Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Because all image conversion happens locally on your device, we do NOT collect:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Image files:</strong> Your images never leave your device. We never see, store, or have access to them.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Personal information:</strong> No registration, no accounts, no personal data required.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Usage data:</strong> We do not track how you use the service or which files you convert.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Cookies:</strong> We do not use cookies or similar tracking technologies.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How Processing Works</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              All image conversion is performed entirely in your web browser using standard web technologies (HTML5 Canvas API). This means:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Files are loaded into your browser's memory only</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>No data is transmitted over the internet</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>No data is stored on our servers</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Files are removed from memory when you close the page</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not use third-party analytics, advertising, or tracking services. The website may use standard web hosting services, but these services do not have access to your image files or conversion activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Since we do not collect personal data, there is no data to access, modify, or delete. However, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
              <li>Use the service without providing any personal information</li>
              <li>Stop using the service at any time</li>
              <li>Clear your browser cache and history to remove any temporary files</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Children's Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              Our service is safe for users of all ages. Since we do not collect any personal information, there are no special privacy concerns for children. However, we recommend that children use the service under adult supervision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please{' '}
              <Link href={addLocaleToPath('/contact', locale)} className="text-blue-600 hover:text-blue-700 underline">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>

        <BenefitsSection title={t(locale, 'benefits.title')} subtitle={t(locale, 'benefits.subtitle')} />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
