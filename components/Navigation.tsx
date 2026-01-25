'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, removeLocaleFromPath, addLocaleToPath, type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const locale = getLocaleFromPath(pathname)
  const cleanPath = removeLocaleFromPath(pathname)
  const messages = getMessages(locale)

  const navItems = [
    { href: '/convert-to-jpg', label: messages.nav.imagesToJpg },
    { href: '/convert-to-webp', label: messages.nav.imagesToWebp },
    { href: '/convert-to-png', label: messages.nav.imagesToPng },
  ]

  const isActive = (href: string) => {
    const fullHref = addLocaleToPath(href, locale)
    return (
      pathname === fullHref ||
      (href === '/convert-to-jpg' && /\/[a-z0-9]+-to-jpg$/.test(pathname)) ||
      (href === '/convert-to-webp' && /\/[a-z0-9]+-to-webp$/.test(pathname)) ||
      (href === '/convert-to-png' && /\/[a-z0-9]+-to-png$/.test(pathname))
    )
  }

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
              <Image
                src="/logo.svg"
                alt="Image Converter Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{messages.common.siteName}</h1>
              <p className="text-xs text-slate-500">{messages.common.siteTagline}</p>
            </div>
          </Link>
          
          {/* 桌面端导航 - 居中 */}
          <nav className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const fullHref = addLocaleToPath(item.href, locale)
              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    active
                      ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* 右侧：移动端菜单按钮 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 border-t border-slate-200 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href)
                const fullHref = addLocaleToPath(item.href, locale)
                return (
                  <Link
                    key={item.href}
                    href={fullHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                      active
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
