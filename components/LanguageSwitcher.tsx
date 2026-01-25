'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { type Locale, locales, localeNames, localeFlags, defaultLocale, getLocaleFromPath, removeLocaleFromPath, addLocaleToPath } from '@/lib/i18n/config'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = getLocaleFromPath(pathname)
  const cleanPath = removeLocaleFromPath(pathname)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLocaleChange = (locale: Locale) => {
    setIsOpen(false)
    const newPath = addLocaleToPath(cleanPath, locale)
    router.push(newPath)
  }

  // 检测是否在页脚中
  const [isInFooter, setIsInFooter] = useState(false)
  
  useEffect(() => {
    if (dropdownRef.current) {
      const footer = dropdownRef.current.closest('footer')
      setIsInFooter(footer !== null)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
          isInFooter
            ? 'text-white hover:bg-slate-800 border-slate-700 bg-slate-900'
            : 'text-slate-700 hover:bg-slate-100 border-slate-200 bg-white'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-2 z-50 max-h-[400px] overflow-y-auto ${
          isInFooter
            ? 'bg-slate-900 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleLocaleChange(locale)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                isInFooter
                  ? currentLocale === locale
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                  : currentLocale === locale
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl">{localeFlags[locale]}</span>
              <span className="flex-1 font-medium">{localeNames[locale]}</span>
              {currentLocale === locale && (
                <svg className={`w-5 h-5 ${isInFooter ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
