'use client'
import React from 'react'
import DropZone from '@/components/ui/DropZone'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Step4_Photos({ onNext, onFilesChange, initialFiles }: {
  onNext: (data: Record<string, unknown>) => void
  onFilesChange: (fieldId: string, files: File[]) => void
  initialFiles?: Record<string, File[]>
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({})
  }

  return (
    <form onSubmit={handleSubmit} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="📸" title="Photos & Media" subtitle="High-quality images for your website" />

      <DropZone fieldId="productPhotos" label="Product Photos" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={50} badge="preferred" onFilesChange={onFilesChange} hint="Upload individual product images (max 50)" initialFiles={initialFiles?.productPhotos} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone fieldId="heroImages" label="Hero / Banner Images" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={5} badge="preferred" onFilesChange={onFilesChange} hint="Wide, high-res images for the top of pages" initialFiles={initialFiles?.heroImages} />
        <DropZone fieldId="storePhotos" label="Physical Store / Office" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={5} badge="optional" onFilesChange={onFilesChange} hint="Exterior and interior shots of your location" initialFiles={initialFiles?.storePhotos} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone fieldId="teamPhotos" label="Team Photos / Founders" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={5} badge="optional" onFilesChange={onFilesChange} hint="Show the faces behind the brand" initialFiles={initialFiles?.teamPhotos} />
        <DropZone fieldId="artisanPhotos" label="BTS / Artisan / Workshop" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={10} badge="optional" onFilesChange={onFilesChange} hint="Behind the scenes, manufacturing, or workshop photos" initialFiles={initialFiles?.artisanPhotos} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone fieldId="lifestylePhotos" label="Lifestyle / Model Shoots" accept={['image/jpeg', 'image/png', 'image/webp']} multiple maxFiles={15} badge="optional" onFilesChange={onFilesChange} hint="Products in use or worn by models" initialFiles={initialFiles?.lifestylePhotos} />
        <DropZone fieldId="certificates" label="Certificates & Awards" accept={['image/jpeg', 'image/png', 'application/pdf']} multiple maxFiles={5} badge="optional" onFilesChange={onFilesChange} hint="Any official certificates or awards to build trust" initialFiles={initialFiles?.certificates} />
      </div>

      <DropZone fieldId="videos" label="Videos" accept={['video/mp4', 'video/quicktime']} multiple maxFiles={3} maxSizeMB={50} badge="optional" onFilesChange={onFilesChange} hint="Upload short video clips (max 50MB per video)" initialFiles={initialFiles?.videos} />

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
