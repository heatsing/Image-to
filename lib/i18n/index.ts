/**
 * i18n utilities: load translations, get messages
 */

import { type Locale, defaultLocale } from './config'
import en from './messages/en.json'
import zhCn from './messages/zh-cn.json'
import zhTw from './messages/zh-tw.json'
import es from './messages/es.json'
import fr from './messages/fr.json'
import de from './messages/de.json'
import ja from './messages/ja.json'
import ko from './messages/ko.json'
import pt from './messages/pt.json'
import it from './messages/it.json'
import ru from './messages/ru.json'
import ar from './messages/ar.json'
import nl from './messages/nl.json'
import pl from './messages/pl.json'
import tr from './messages/tr.json'
import vi from './messages/vi.json'
import th from './messages/th.json'
import id from './messages/id.json'

const messages = {
  en,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  es,
  fr,
  de,
  ja,
  ko,
  pt,
  it,
  ru,
  ar,
  nl,
  pl,
  tr,
  vi,
  th,
  id,
} as const

export type Messages = typeof en

export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages[defaultLocale]
}

export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path // Fallback to path if not found
    }
  }
  return typeof value === 'string' ? value : path
}

export function t(locale: Locale, key: string, params?: Record<string, string>): string {
  const messages = getMessages(locale)
  let text = getNestedValue(messages, key)
  
  // Replace params: {format} -> value
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value)
    })
  }
  
  return text
}
