'use client'

import { useState, useCallback, useRef, useEffect, DragEvent } from 'react'

interface FileWithPreview extends File {
  preview?: string
  id: string
}

interface FileConversionState {
  file: FileWithPreview
  preview: string | null
  previewError: boolean
  converting: boolean
  converted: boolean
  downloadUrl: string | null
  error: string | null
  originalSize: number
  convertedSize: number
  objectUrl: string | null
}

type OutputFormat = 'jpg' | 'webp' | 'png'

interface UniversalImageConverterProps {
  outputFormat: OutputFormat
  title: string
  description: string
}

export default function UniversalImageConverter({ outputFormat, title, description }: UniversalImageConverterProps) {
  const [files, setFiles] = useState<Map<string, FileConversionState>>(new Map())
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)
  const downloadUrlsRef = useRef<Set<string>>(new Set())

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

  const createPreview = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        resolve(url)
      } catch {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) resolve(result)
          else reject(new Error('Failed to read file'))
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      }
    })
  }, [])

  const handleFilesAdd = useCallback(
    async (fileList: FileList | File[]) => {
      const filesArray = Array.from(fileList)
      const newFiles = new Map(files)
      const errors: string[] = []

      for (const file of filesArray) {
        if (!isImageFile(file)) {
          errors.push(`"${file.name}" is not a supported image format`)
          continue
        }

        if (file.size > 10 * 1024 * 1024) {
          errors.push(`"${file.name}" exceeds 10MB limit`)
          continue
        }

        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const fileWithId = Object.assign(file, { id }) as FileWithPreview

        try {
          const preview = await createPreview(file)
          const objectUrl = preview.startsWith('blob:') ? preview : null

          newFiles.set(id, {
            file: fileWithId,
            preview,
            previewError: false,
            converting: false,
            converted: false,
            downloadUrl: null,
            error: null,
            originalSize: file.size,
            convertedSize: 0,
            objectUrl,
          })

          if (objectUrl) {
            downloadUrlsRef.current.add(objectUrl)
          }
        } catch (err) {
          errors.push(`Failed to load "${file.name}"`)
        }
      }

      setFiles(newFiles)
      if (newFiles.size > 0 && !selectedFileId) {
        setSelectedFileId(Array.from(newFiles.keys())[0])
      }
      if (errors.length > 0) {
        setGlobalError(errors.join('; '))
      } else {
        setGlobalError(null)
      }
    },
    [files, isImageFile, createPreview, selectedFileId]
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
        handleFilesAdd(e.dataTransfer.files)
      }
    },
    [handleFilesAdd]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFilesAdd(e.target.files)
      }
    },
    [handleFilesAdd]
  )

  const convertFile = useCallback(
    async (fileId: string): Promise<void> => {
      const fileState = files.get(fileId)
      if (!fileState || !fileState.preview) return

      setFiles((prev) => {
        const next = new Map(prev)
        const state = next.get(fileId)
        if (state) {
          next.set(fileId, { ...state, converting: true, error: null })
        }
        return next
      })

      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = fileState.preview!

        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Image load timeout')), 30000)
          img.onload = () => {
            clearTimeout(timeout)
            resolve(null)
          }
          img.onerror = () => {
            clearTimeout(timeout)
            reject(new Error('Failed to load image'))
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

        if (fileState.file.type === 'image/svg+xml' || fileState.file.name.toLowerCase().endsWith('.svg')) {
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(img, 0, 0)

        const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : `image/${outputFormat}`
        const quality = outputFormat === 'png' ? 1.0 : outputFormat === 'webp' ? 0.9 : 0.92

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b)
              else reject(new Error(`Failed to convert to ${outputFormat.toUpperCase()}`))
            },
            mimeType,
            quality
          )
        })

        const url = URL.createObjectURL(blob)
        downloadUrlsRef.current.add(url)

        setFiles((prev) => {
          const next = new Map(prev)
          const state = next.get(fileId)
          if (state) {
            next.set(fileId, {
              ...state,
              converting: false,
              converted: true,
              downloadUrl: url,
              convertedSize: blob.size,
            })
          }
          return next
        })
      } catch (err) {
        const errorMsg = err && err instanceof Error ? err.message : 'Conversion failed'
        setFiles((prev) => {
          const next = new Map(prev)
          const state = next.get(fileId)
          if (state) {
            next.set(fileId, { ...state, converting: false, error: errorMsg })
          }
          return next
        })
      }
    },
    [files, outputFormat]
  )

  const handleConvertAll = useCallback(async () => {
    const fileIds = Array.from(files.keys())
    for (const id of fileIds) {
      await convertFile(id)
    }
  }, [files, convertFile])

  const handleConvert = useCallback(() => {
    if (selectedFileId) {
      convertFile(selectedFileId)
    }
  }, [selectedFileId, convertFile])

  const handleDownload = useCallback(
    (fileId: string) => {
      const fileState = files.get(fileId)
      if (fileState?.downloadUrl && fileState.file) {
        const a = document.createElement('a')
        a.href = fileState.downloadUrl
        a.download = (fileState.file.name.replace(/\.[^/.]+$/, '') || 'converted') + `.${outputFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    },
    [files, outputFormat]
  )

  const handleDownloadAll = useCallback(() => {
    files.forEach((state, id) => {
      if (state.converted && state.downloadUrl) {
        setTimeout(() => handleDownload(id), 100)
      }
    })
  }, [files, handleDownload])

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      setFiles((prev) => {
        const next = new Map(prev)
        const state = next.get(fileId)
        if (state) {
          if (state.objectUrl) {
            URL.revokeObjectURL(state.objectUrl)
            downloadUrlsRef.current.delete(state.objectUrl)
          }
          if (state.downloadUrl) {
            URL.revokeObjectURL(state.downloadUrl)
            downloadUrlsRef.current.delete(state.downloadUrl)
          }
        }
        next.delete(fileId)
        return next
      })
      if (selectedFileId === fileId) {
        const remaining = Array.from(files.keys()).filter((id) => id !== fileId)
        setSelectedFileId(remaining.length > 0 ? remaining[0] : null)
      }
    },
    [files, selectedFileId]
  )

  const handleReset = useCallback(() => {
    files.forEach((state) => {
      if (state.objectUrl) {
        URL.revokeObjectURL(state.objectUrl)
        downloadUrlsRef.current.delete(state.objectUrl)
      }
      if (state.downloadUrl) {
        URL.revokeObjectURL(state.downloadUrl)
        downloadUrlsRef.current.delete(state.downloadUrl)
      }
    })
    setFiles(new Map())
    setSelectedFileId(null)
    setGlobalError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [files])

  useEffect(() => {
    return () => {
      downloadUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      downloadUrlsRef.current.clear()
    }
  }, [])

  const formatName = outputFormat.toUpperCase()
  const filesArray = Array.from(files.values())
  const selectedFile = selectedFileId ? files.get(selectedFileId) : null
  const allConverted = filesArray.length > 0 && filesArray.every((f) => f.converted)
  const anyConverting = filesArray.some((f) => f.converting)
  const convertedCount = filesArray.filter((f) => f.converted).length

  return (
    <div className="w-full">
      <div
        className="upload-area rounded-xl p-8 md:p-12 transition-all bg-slate-50 min-h-[200px] flex flex-col items-center justify-center"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {files.size === 0 ? (
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
            <p className="text-slate-600 mb-6">or click the button below to select files (multiple files supported)</p>
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
              multiple
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
            {/* File List - 多张图片按行排列 */}
            <div className="space-y-2 mb-4">
              {filesArray.map((fileState) => {
                const isSelected = selectedFileId === fileState.file.id
                return (
                  <div
                    key={fileState.file.id}
                    onClick={() => setSelectedFileId(fileState.file.id)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {/* 缩略图 */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                      {fileState.preview && !fileState.previewError ? (
                        <img
                          src={fileState.preview}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={() => {
                            setFiles((prev) => {
                              const next = new Map(prev)
                              const s = next.get(fileState.file.id)
                              if (s) next.set(fileState.file.id, { ...s, previewError: true })
                              return next
                            })
                          }}
                        />
                      ) : (
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                      )}
                    </div>
                    {/* 文件名 + 大小 */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate" title={fileState.file.name}>
                        {fileState.file.name}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {fileState.converted && fileState.convertedSize > 0 ? (
                          <>
                            <span>{formatSize(fileState.originalSize)}</span>
                            <span className="mx-1.5 text-slate-400">→</span>
                            <span className="text-green-600 font-medium">{formatSize(fileState.convertedSize)}</span>
                            {fileState.originalSize > fileState.convertedSize && (
                              <span className="ml-1.5 text-xs text-green-600">
                                (Saved {formatSize(fileState.originalSize - fileState.convertedSize)})
                              </span>
                            )}
                          </>
                        ) : (
                          formatSize(fileState.originalSize)
                        )}
                        {fileState.converting && (
                          <span className="ml-2 inline-flex items-center gap-1">
                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-400 border-t-transparent" />
                            Converting…
                          </span>
                        )}
                        {fileState.converted && (
                          <span className="ml-2 text-green-600 font-medium">✓ Converted</span>
                        )}
                        {fileState.error && (
                          <span className="ml-2 text-red-600 text-xs">✗ {fileState.error}</span>
                        )}
                      </p>
                    </div>
                    {/* 删除 */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile(fileState.file.id)
                      }}
                      className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )
              })}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 w-full p-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium">+ Add More</span>
              </button>
            </div>

            {/* Global Error */}
            {globalError && (
              <div className="rounded-lg p-3 text-sm bg-red-50 text-red-600 border border-red-200">
                {globalError}
              </div>
            )}

            {/* Batch Actions */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200">
              {files.size > 1 && (
                <>
                  {!allConverted ? (
                    <button
                      type="button"
                      onClick={handleConvertAll}
                      disabled={anyConverting}
                      className="btn-primary px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                      {anyConverting ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                          Converting... ({convertedCount}/{files.size})
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Convert All ({files.size} files)
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDownloadAll}
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download All ({files.size} files)
                    </button>
                  )}
                </>
              )}

              {/* Single File Actions */}
              {selectedFile && (
                <>
                  {!selectedFile.converted ? (
                    <button
                      type="button"
                      onClick={handleConvert}
                      disabled={selectedFile.converting}
                      className="btn-primary px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                      {selectedFile.converting ? (
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
                      onClick={() => handleDownload(selectedFile.file.id)}
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download {formatName}
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Success Message */}
            {allConverted && files.size > 0 && (
              <div className="bg-green-50 text-green-600 border border-green-200 rounded-lg p-3 text-sm">
                All {files.size} files converted successfully! Click &quot;Download All&quot; to save them.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
