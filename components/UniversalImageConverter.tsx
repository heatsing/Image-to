'use client'

import { useState, useCallback, useRef, useEffect, DragEvent } from 'react'

interface FileWithPreview extends File {
  preview?: string
}

type OutputFormat = 'jpg' | 'webp' | 'png'

interface UniversalImageConverterProps {
  outputFormat: OutputFormat
  title: string
  description: string
}

export default function UniversalImageConverter({ outputFormat, title, description }: UniversalImageConverterProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState(false)
  const [converting, setConverting] = useState(false)
  const [converted, setConverted] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [convertedSize, setConvertedSize] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)
  const objectUrlRef = useRef<string | null>(null)

  const revokePreviewUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }, [])

  const formatSize = useCallback((bytes: number) => {
    return bytes >= 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`
  }, [])

  const getFileFormat = useCallback((file: File) => {
    const name = file.name.toLowerCase()
    const ext = name.substring(name.lastIndexOf('.'))
    const formatMap: Record<string, string> = {
      '.png': 'PNG',
      '.jpg': 'JPG',
      '.jpeg': 'JPG',
      '.jpe': 'JPE',
      '.jfif': 'JFIF',
      '.jps': 'JPS',
      '.gif': 'GIF',
      '.webp': 'WEBP',
      '.bmp': 'BMP',
      '.tiff': 'TIFF',
      '.tif': 'TIFF',
      '.svg': 'SVG',
      '.ico': 'ICO',
      '.cur': 'CUR',
      '.heic': 'HEIC',
      '.heif': 'HEIC',
      '.avif': 'AVIF',
      '.dds': 'DDS',
      '.fts': 'FTS',
      '.hdr': 'HDR',
      '.mng': 'MNG',
      '.pam': 'PAM',
      '.pbm': 'PBM',
      '.pcd': 'PCD',
      '.pcx': 'PCX',
      '.pfm': 'PFM',
      '.pgm': 'PGM',
      '.picon': 'PICON',
      '.pict': 'PICT',
      '.pnm': 'PNM',
      '.ppm': 'PPM',
      '.psd': 'PSD',
      '.ras': 'RAS',
      '.rw2': 'RW2',
      '.sgi': 'SGI',
      '.tga': 'TGA',
      '.wbmp': 'WBMP',
      '.xbm': 'XBM',
      '.xpm': 'XPM',
    }
    return formatMap[ext] || (file.type ? file.type.split('/')[1].toUpperCase() : 'IMAGE')
  }, [])

  const isImageFile = useCallback((file: File) => {
    if (!file) return false
    const type = file.type.toLowerCase()
    const name = file.name.toLowerCase()
    const imageTypes = [
      'image/',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
      'image/vnd.microsoft.icon',
      'image/x-ms-bmp',
      'image/x-tga',
      'image/x-photoshop',
    ]
    const imageExts = [
      '.png',
      '.jpg',
      '.jpeg',
      '.jpe',
      '.jfif',
      '.jps',
      '.gif',
      '.webp',
      '.bmp',
      '.tiff',
      '.tif',
      '.svg',
      '.ico',
      '.cur',
      '.heic',
      '.heif',
      '.avif',
      '.dds',
      '.fts',
      '.hdr',
      '.mng',
      '.pam',
      '.pbm',
      '.pcd',
      '.pcx',
      '.pfm',
      '.pgm',
      '.picon',
      '.pict',
      '.pnm',
      '.ppm',
      '.psd',
      '.ras',
      '.rw2',
      '.sgi',
      '.tga',
      '.wbmp',
      '.xbm',
      '.xpm',
    ]
    return imageTypes.some((t) => type.startsWith(t)) || imageExts.some((ext) => name.endsWith(ext))
  }, [])

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      if (!isImageFile(selectedFile)) {
        setError(
          `"${selectedFile.name}" is not a supported image format. Supported: WebP, PNG, JPEG, SVG, BMP, AVIF, HEIC, TIFF, GIF, ICO, PSD, TGA, and 30+ more formats.`
        )
        return
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError(`"${selectedFile.name}" exceeds 10MB limit`)
        return
      }

      setError(null)
      setConverted(false)
      setDownloadUrl(null)
      setPreviewError(false)
      revokePreviewUrl()

      const fileWithPreview = selectedFile as FileWithPreview
      setFile(fileWithPreview)
      setOriginalSize(selectedFile.size)

      const tryObjectUrl = () => {
        try {
          const url = URL.createObjectURL(selectedFile)
          objectUrlRef.current = url
          setPreview(url)
        } catch {
          tryDataUrl()
        }
      }

      const tryDataUrl = () => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            setPreview(result)
          } else setError('Image read failed, please try again')
        }
        reader.onerror = () => setError('Image read failed, please try again')
        reader.readAsDataURL(selectedFile)
      }

      tryObjectUrl()
    },
    [isImageFile, revokePreviewUrl]
  )

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      e.currentTarget.classList.add('border-blue-500', 'bg-blue-50')
    }
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')
    }
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current = 0
      e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0])
      }
    },
    [handleFileSelect]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0])
      }
    },
    [handleFileSelect]
  )

  const handleConvert = useCallback(async () => {
    if (!file || !preview) return

    setConverting(true)
    setError(null)

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = preview

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Image load timeout')), 30000)
        img.onload = () => {
          clearTimeout(timeout)
          resolve(null)
        }
        img.onerror = () => {
          clearTimeout(timeout)
          reject(new Error('Failed to load image. Some formats (like HEIC) may require server-side conversion.'))
        }
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || img.width
      canvas.height = img.naturalHeight || img.height

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Invalid image dimensions')
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Failed to get canvas context')
      }

      // Fill white background for SVG
      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : `image/${outputFormat}`
      const quality = outputFormat === 'png' ? 1.0 : outputFormat === 'webp' ? 0.9 : 0.92

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              setDownloadUrl(url)
              setConvertedSize(blob.size)
              setConverted(true)
              resolve()
            } else {
              reject(new Error(`Failed to convert to ${outputFormat.toUpperCase()}. The image format may not be supported.`))
            }
          },
          mimeType,
          quality
        )
      })
    } catch (err) {
      const errorMsg = err && err instanceof Error ? err.message : 'Please try again'
      setError('Conversion failed: ' + errorMsg)
    } finally {
      setConverting(false)
    }
  }, [file, preview, outputFormat])

  const handleDownload = useCallback(() => {
    if (downloadUrl && file) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = (file.name.replace(/\.[^/.]+$/, '') || 'converted') + `.${outputFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }, [downloadUrl, file, outputFormat])

  const handleReset = useCallback(() => {
    setFile(null)
    setPreview(null)
    setPreviewError(false)
    setConverted(false)
    setDownloadUrl(null)
    setError(null)
    setOriginalSize(0)
    setConvertedSize(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    revokePreviewUrl()
  }, [downloadUrl, revokePreviewUrl])

  const openPreviewInNewTab = useCallback(() => {
    if (preview) window.open(preview, '_blank', 'noopener,noreferrer')
  }, [preview])

  useEffect(() => () => revokePreviewUrl(), [revokePreviewUrl])

  const formatName = outputFormat.toUpperCase()

  return (
    <div className="w-full">
      <div
        className="upload-area rounded-xl p-8 md:p-12 transition-all bg-slate-50 min-h-[200px] flex flex-col items-center justify-center"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Drag and drop images</h3>
            <p className="text-slate-600 mb-6">or click the button below to select files</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary px-6 py-3 text-white rounded-lg font-semibold"
            >
              Select Images
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif,.webp,.avif,.bmp,.tiff,.tif,.ico,.svg,.jfif,.cur,.dds,.fts,.hdr,.mng,.pam,.pbm,.pcd,.pcx,.pfm,.pgm,.picon,.pict,.pnm,.ppm,.psd,.ras,.rw2,.sgi,.tga,.wbmp,.xbm,.xpm"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <p className="text-xs text-slate-500 mt-4">
              <span className="font-semibold">100% Free</span> · <span className="font-semibold text-emerald-600">Local conversion</span> · No Uploading · No Signup · Max 10MB per file
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Converts on your device only. Files never leave your computer. 40+ formats: WebP, PNG, JPEG, SVG, BMP, AVIF, HEIC, TIFF, GIF, ICO, PSD, TGA, and more.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900 truncate max-w-[200px]" title={file?.name}>
                    {file?.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatSize(originalSize)}
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {getFileFormat(file!)} → {formatName}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-lg font-semibold text-slate-900">Preview</span>
              <button
                type="button"
                onClick={openPreviewInNewTab}
                className="text-sm text-blue-600 hover:underline"
              >
                Open in New Tab
              </button>
            </div>
            <div className="rounded-xl bg-slate-100 p-6 min-h-[260px] flex items-center justify-center">
              {preview && !previewError ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <p className="text-slate-500 text-sm">Preview not supported. Please convert directly or open in a new tab.</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg p-3 text-sm bg-red-50 text-red-600 border border-red-200">
                {error}
              </div>
            )}

            {/* Size Comparison */}
            {converted && convertedSize > 0 && (
              <div className="flex items-center justify-center gap-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-slate-600">
                  <span className="font-semibold">{getFileFormat(file!)}</span> <span className="text-slate-500">{formatSize(originalSize)}</span>
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">
                  <span className="font-semibold text-green-600">{formatName}</span>{' '}
                  <span className="text-green-600">{formatSize(convertedSize)}</span>
                </span>
                {originalSize > convertedSize && (
                  <span className="text-xs text-green-600 font-semibold">
                    Saved {formatSize(originalSize - convertedSize)}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200">
              {!converted ? (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={converting}
                  className="btn-primary px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {converting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                      Converting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Convert to {formatName}
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {formatName}
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold"
              >
                Choose Another
              </button>
            </div>

            {/* Success Message */}
            {converted && (
              <div className="bg-green-50 text-green-600 border border-green-200 rounded-lg p-3 text-sm">
                Conversion successful! Click &quot;Download {formatName}&quot; to save
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
