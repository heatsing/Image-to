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
  const pageTitle = messages.common.contact
  const description = "Get in touch with Image Converter. Have questions, feedback, or suggestions? We'd love to hear from you."
  const path = addLocaleToPath('/contact', locale)

  return generatePageMetadata({
    locale,
    title: pageTitle,
    description,
    keywords: ['contact', 'support', 'image converter', 'help'],
    path: path.startsWith('/') ? path : `/${path}`,
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="card rounded-2xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We're here to help! Whether you have a question about how to use Image Converter, found a bug, have a feature request, or just want to share your feedback, we'd love to hear from you.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="card rounded-xl p-6 bg-blue-50 border border-blue-200">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">General Questions</h3>
              <p className="text-slate-600 text-sm">
                Have questions about how to use the converter or need help with a specific format? We're here to help.
              </p>
            </div>

            <div className="card rounded-xl p-6 bg-green-50 border border-green-200">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Feature Requests</h3>
              <p className="text-slate-600 text-sm">
                Have an idea for a new feature or improvement? Share your suggestions with us.
              </p>
            </div>

            <div className="card rounded-xl p-6 bg-purple-50 border border-purple-200">
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Report Issues</h3>
              <p className="text-slate-600 text-sm">
                Found a bug or experiencing an issue? Let us know so we can fix it quickly.
              </p>
            </div>

            <div className="card rounded-xl p-6 bg-orange-50 border border-orange-200">
              <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Feedback</h3>
              <p className="text-slate-600 text-sm">
                We value your feedback! Share your thoughts on how we can improve the service.
              </p>
            </div>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">How to Reach Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Currently, we handle inquiries through our GitHub repository. If you have technical questions, bug reports, or feature requests, please visit our repository and open an issue or discussion.
            </p>
            <p className="text-slate-600 leading-relaxed">
              For general inquiries, you can also check our{' '}
              <Link href={addLocaleToPath('/about', locale)} className="text-blue-600 hover:text-blue-700 underline">
                About Us
              </Link>{' '}
              page for more information about the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Response Time</h2>
            <p className="text-slate-600 leading-relaxed">
              We aim to respond to all inquiries within 48-72 hours. Please note that we are a small team, so response times may vary during peak periods. Thank you for your patience!
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
