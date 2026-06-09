'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import TagBadge from './TagBadge'

export default function DropZone({
  fieldId,
  label,
  accept = ['image/*'],
  multiple = false,
  maxFiles = 50,
  maxSizeMB = 10,
  required = false,
  badge = 'optional',
  onFilesChange,
  hint,
  error,
  initialFiles,
}: {
  fieldId: string
  label: string
  accept?: string[]
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  required?: boolean
  badge?: 'required' | 'preferred' | 'optional'
  onFilesChange: (fieldId: string, files: File[]) => void
  hint?: string
  error?: string
  initialFiles?: File[]
}) {
  const [files, setFiles] = useState<File[]>(initialFiles || [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filtered = acceptedFiles.slice(0, maxFiles)
    setFiles(prev => {
      const combined = multiple ? [...prev, ...filtered].slice(0, maxFiles) : filtered
      onFilesChange(fieldId, combined)
      return combined
    })
  }, [fieldId, maxFiles, multiple, onFilesChange])

  const removeFile = (idx: number) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== idx)
      onFilesChange(fieldId, updated)
      return updated
    })
  }

  const clearAll = () => {
    setFiles([])
    onFilesChange(fieldId, [])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {} as Record<string, string[]>), 
    multiple,
    maxSize: maxSizeMB * 1024 * 1024 
  })

  useEffect(() => {
    return () => {
      files.forEach(f => { if ((f as File & { preview?: string }).preview) URL.revokeObjectURL((f as File & { preview?: string }).preview!) })
    }
  }, [files])

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const isError = !!error

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-[var(--color-text-label)]">{label}</label>
        <TagBadge type={badge} />
      </div>

      <div 
        {...getRootProps()} 
        className={`relative p-6 border-2 rounded-2xl border-dashed transition-all duration-200 cursor-pointer
          ${isError 
            ? 'border-[var(--color-error)] bg-red-50/50' 
            : isDragActive 
              ? 'border-[var(--color-brand-orange)] bg-orange-50/60 scale-[1.01]' 
              : 'border-[var(--color-border-default)] bg-[var(--color-surface-panel)] hover:border-[var(--color-brand-orange)] hover:bg-orange-50/30'
          }`}
      > 
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
            <svg className="h-6 w-6 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {isDragActive ? 'Drop files here...' : 'Drag files here or click to browse'}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{hint || `Max ${maxSizeMB}MB per file`}</p>
        </div>
      </div>
      
      {isError && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-error)] mt-1.5 font-medium">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {files.map((file, idx) => {
              const fileWithPreview = file as File & { preview?: string }
              const preview = fileWithPreview.preview || (fileWithPreview.preview = URL.createObjectURL(file))
              const isImage = file.type.startsWith('image/')
              return (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border-default)] group bg-white shadow-sm">
                  {isImage ? (
                    <img src={preview} alt={file.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="p-2 flex flex-col items-center justify-center h-full text-center bg-[var(--color-surface-panel)]">
                      <svg className="w-6 h-6 text-[var(--color-text-muted)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-[10px] text-[var(--color-text-muted)] break-all line-clamp-2">{file.name}</span>
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); removeFile(idx) }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-[var(--color-text-muted)]">
            <span className="font-medium">
              {files.length} file{files.length !== 1 && 's'} • {(totalSize / 1024 / 1024).toFixed(1)} MB
            </span>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); clearAll() }}
              className="text-[var(--color-brand-orange)] hover:text-[var(--color-brand-dim)] font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
