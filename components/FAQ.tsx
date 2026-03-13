'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n'
import { FAQ_DATA } from '@/lib/faq-data'

export default function FAQ() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const messages = getMessages(locale)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{messages.faq.title}</h2>
        <p className="text-slate-600">{messages.faq.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_DATA.map((item, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 pr-4">{item.question}</h3>
              <svg
                className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 pt-0">
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
