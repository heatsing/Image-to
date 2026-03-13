/**
 * Programmatic meta description generator for conversion pages.
 *
 * - Uses a small template pool with {FROM}/{TO} placeholders
 * - Normalizes format names to uppercase
 * - Picks a template deterministically based on a hash of the route
 * - Ensures final length is between ~120–160 characters
 * - Guarantees non-empty output
 */

function toUpper(name: string): string {
  return name.toUpperCase()
}

const TEMPLATES: string[] = [
  'Convert {FROM} images to {TO} format online in your browser. Fast, secure converter that keeps every file on your device for maximum privacy.',
  'Free {FROM} to {TO} converter that runs entirely in your browser. Change image format quickly without uploads, accounts, or slow server processing.',
  'Turn {FROM} files into {TO} format for better compatibility and smaller file sizes. All conversion happens locally for fast, private image processing.',
  'Quickly convert {FROM} to {TO} using our browser-based image converter. Enjoy instant, secure format changes without sending pictures to any server.',
  'Change {FROM} images into {TO} format with a fast, secure tool that works in your browser. Keep full control of your pictures during conversion.',
  'Easily transform {FROM} files into {TO} format online while keeping high image quality. Local conversion protects privacy and avoids upload limits.',
]

function hashString(value: string): number {
  let hash = 5381
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i)
  }
  return hash >>> 0
}

function pickTemplateKey(key: string): string {
  const idx = hashString(key) % TEMPLATES.length
  return TEMPLATES[idx]
}

function normalizeLength(text: string): string {
  const min = 120
  const max = 160

  let result = text.trim()

  if (result.length < min) {
    const extra =
      ' All processing stays in your browser so images never leave your device, giving you fast, private and reliable format conversion.'
    result = (result + extra).trim()
  }

  if (result.length > max) {
    // Trim to the last space before max and add ellipsis if needed
    const slice = result.slice(0, max + 1)
    const lastSpace = slice.lastIndexOf(' ')
    result = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim()
    if (!result.endsWith('.')) {
      result = `${result}…`
    }
  }

  return result
}

export function generateConversionDescription(fromRaw: string, toRaw: string, key?: string): string {
  const from = toUpper(fromRaw)
  const to = toUpper(toRaw)
  const templateKey = key ?? `${from}->${to}`
  const template = pickTemplateKey(templateKey) || TEMPLATES[0]

  let description = template.replace(/{FROM}/g, from).replace(/{TO}/g, to)
  description = normalizeLength(description)

  if (!description || !description.trim()) {
    return `Convert ${from} images to ${to} format online. Fast, local and private image conversion in your browser.`
  }

  return description
}

