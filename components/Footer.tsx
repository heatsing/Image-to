'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
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
        <div className="flex flex-col gap-6">
          {/* 第一行：链接和语言切换器 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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

            {/* 语言切换器 */}
            <div className="flex items-center justify-center">
              <LanguageSwitcher />
            </div>
          </div>

          {/* 第二行：Copyright */}
          <div className="text-sm text-white text-center border-t border-slate-700 pt-4">
            <p>{t(locale, 'footer.copyright', { year: currentYear.toString() })}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
