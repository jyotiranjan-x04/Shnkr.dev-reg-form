'use client'
import React, { useState } from 'react'
import DropZone from '@/components/ui/DropZone'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Step1_BrandAssets({ onNext, onFilesChange, initialValues, initialFiles }: {
  onNext: (data: Record<string, unknown>) => void
  onFilesChange: (fieldId: string, files: File[]) => void
  initialValues?: Record<string, unknown>
  initialFiles?: Record<string, File[]>
}) {
  const [brandColours, setBrandColours] = useState((initialValues?.brandColours as string) || '')
  const [brandFont, setBrandFont] = useState((initialValues?.brandFont as string) || '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const interceptFiles = (fieldId: string, files: File[]) => {
    if (errors[fieldId] && files.length > 0) setErrors(p => ({ ...p, [fieldId]: '' }))
    onFilesChange(fieldId, files)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!initialFiles?.logo_primary || initialFiles.logo_primary.length === 0) {
      setErrors({ logo_primary: 'Primary Logo is required' })
      return
    }
    onNext({ brandColours, brandFont })
  }

  return (
    <form onSubmit={handleSubmit} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="🎨" title="Brand & Visual Identity" subtitle="Upload your logo files and brand assets" />

      <DropZone fieldId="logo_primary" label="Primary Logo" accept={['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf']} multiple={false} required badge="required" onFilesChange={interceptFiles} hint="PNG, SVG, AI, PDF — Your main logo file" error={errors.logo_primary} initialFiles={initialFiles?.logo_primary} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone fieldId="logo_dark" label="Logo — Dark BG Version" accept={['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf']} multiple={false} badge="preferred" onFilesChange={interceptFiles} hint="PNG, SVG, AI, PDF" initialFiles={initialFiles?.logo_dark} />
        <DropZone fieldId="logo_light" label="Logo — Light BG Version" accept={['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf']} multiple={false} badge="optional" onFilesChange={interceptFiles} hint="PNG, SVG, AI, PDF" initialFiles={initialFiles?.logo_light} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone fieldId="logo_icon" label="Logo Icon Only (no text)" accept={['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf']} multiple={false} badge="preferred" onFilesChange={interceptFiles} hint="PNG, SVG" initialFiles={initialFiles?.logo_icon} />
        <DropZone fieldId="favicon" label="Favicon (browser tab icon)" accept={['image/png', 'image/svg+xml', 'image/vnd.microsoft.icon']} multiple={false} badge="preferred" onFilesChange={interceptFiles} hint="ICO, PNG, SVG — 32×32 or 64×64" initialFiles={initialFiles?.favicon} />
      </div>

      <DropZone fieldId="existingBrandGuide" label="Brand Guide / Style Sheet" accept={['application/pdf', 'image/png', 'image/jpeg']} multiple={false} badge="optional" onFilesChange={interceptFiles} hint="PDF preferred" initialFiles={initialFiles?.existingBrandGuide} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="brandColours" label="Brand Colours" hint="Comma separated hex values (e.g. #FF5500, #111111)" badge="preferred">
          <input value={brandColours} onChange={e => setBrandColours(e.target.value)} placeholder="#FF5500, #111111" />
        </FieldWrapper>

        <FieldWrapper id="brandFont" label="Brand Font Name(s)" badge="optional">
          <input value={brandFont} onChange={e => setBrandFont(e.target.value)} placeholder="e.g. Poppins, Lora" />
        </FieldWrapper>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
