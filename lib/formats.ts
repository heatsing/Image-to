export type TargetFormat = 'jpg' | 'webp' | 'png'

/** Slug (URL) -> Display label */
export const FORMAT_LABELS: Record<string, string> = {
  webp: 'WebP',
  png: 'PNG',
  jpeg: 'JPEG',
  jfif: 'JFIF',
  svg: 'SVG',
  bmp: 'BMP',
  avif: 'AVIF',
  heic: 'HEIC',
  tiff: 'TIFF',
  cur: 'CUR',
  dds: 'DDS',
  fts: 'FTS',
  gif: 'GIF',
  hdr: 'HDR',
  ico: 'ICO',
  jpe: 'JPE',
  jps: 'JPS',
  mng: 'MNG',
  pam: 'PAM',
  pbm: 'PBM',
  pcd: 'PCD',
  pcx: 'PCX',
  pfm: 'PFM',
  pgm: 'PGM',
  picon: 'PICON',
  pict: 'PICT',
  pnm: 'PNM',
  ppm: 'PPM',
  psd: 'PSD',
  ras: 'RAS',
  rw2: 'RW2',
  sgi: 'SGI',
  tga: 'TGA',
  wbmp: 'WBMP',
  xbm: 'XBM',
  xpm: 'XPM',
}

/** All source format slugs (same for JPG, WebP, PNG) */
export const FORMAT_SLUGS = [
  'webp', 'png', 'jpeg', 'jfif', 'svg', 'bmp', 'avif', 'heic', 'tiff',
  'cur', 'dds', 'fts', 'gif', 'hdr', 'ico', 'jpe', 'jps', 'mng', 'pam',
  'pbm', 'pcd', 'pcx', 'pfm', 'pgm', 'picon', 'pict', 'pnm', 'ppm', 'psd',
  'ras', 'rw2', 'sgi', 'tga', 'wbmp', 'xbm', 'xpm',
] as const

export type FormatSlug = (typeof FORMAT_SLUGS)[number]

export function slugToLabel(slug: string): string {
  return FORMAT_LABELS[slug.toLowerCase()] ?? slug.toUpperCase()
}

export function isValidFormatSlug(slug: string): slug is FormatSlug {
  const lower = slug.toLowerCase()
  return (FORMAT_SLUGS as readonly string[]).includes(lower)
}

export function getTargetLabel(target: TargetFormat): string {
  return target === 'jpg' ? 'JPG' : target.toUpperCase()
}
