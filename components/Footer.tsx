'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, addLocaleToPath, type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'

export default function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const messages = getMessages(locale)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-black mt-auto py-8 flex-shrink-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-white text-center md:text-left">
            <p>{t(locale, 'footer.copyright', { year: currentYear.toString() })}</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <Link
              href={addLocaleToPath('/about', locale)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              {messages.common.about}
            </Link>
            <Link
              href={addLocaleToPath('/security', locale)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              {messages.common.security}
            </Link>
            <Link
              href={addLocaleToPath('/terms', locale)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              {messages.common.terms}
            </Link>
            <Link
              href={addLocaleToPath('/privacy', locale)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              {messages.common.privacy}
            </Link>
            <Link
              href={addLocaleToPath('/contact', locale)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              {messages.common.contact}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
