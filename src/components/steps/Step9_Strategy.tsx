'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step9Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import DropZone from '@/components/ui/DropZone'
import SectionHeading from '@/components/ui/SectionHeading'

type Step9Data = z.infer<typeof step9Schema>

export default function Step9_Strategy({ onNext, onFilesChange, initialValues, initialFiles }: {
  onNext: (data: Step9Data) => void
  onFilesChange: (fieldId: string, files: File[]) => void
  initialValues?: Partial<Step9Data>
  initialFiles?: Record<string, File[]>
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step9Data>({
    resolver: zodResolver(step9Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="🎯" title="Strategy & Content" subtitle="Understanding your audience and messaging" />

      <FieldWrapper id="targetCustomer" label="Describe your Target Customer" required error={errors.targetCustomer?.message} hint="Who buys your products? Be as specific as possible (e.g. Working women in their 30s who love traditional wear)">
        <textarea placeholder="Our ideal customer is..." {...register('targetCustomer')} rows={3} />
      </FieldWrapper>

      <FieldWrapper id="keyProductsToPromote" label="Key Products/Services to Promote" required error={errors.keyProductsToPromote?.message} hint="What are your bestsellers or high-margin products?">
        <textarea placeholder="1. Silk Sarees&#10;2. Cotton Stoles" {...register('keyProductsToPromote')} rows={3} />
      </FieldWrapper>

      <FieldWrapper id="brandTone" label="Brand Tone of Voice" badge="optional" error={errors.brandTone?.message}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {['Professional & Corporate', 'Friendly & Casual', 'Luxurious & Exclusive', 'Fun & Quirky', 'Educational & Informative', 'Bold & Edgy'].map(tone => (
            <label key={tone} className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--color-border-default)] bg-white hover:border-[var(--color-brand-orange)] hover:bg-orange-50/30 cursor-pointer transition-all">
              <input type="radio" value={tone} {...register('brandTone')} className="shrink-0" />
              <span className="text-[13px] text-[var(--color-text-primary)]">{tone}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <FieldWrapper id="captionLanguages" label="Languages for Ad Copies / Captions" badge="optional" error={errors.captionLanguages?.message as string}>
        <div className="flex flex-wrap gap-4 mt-2">
          {['English', 'Hindi', 'Odia', 'Hinglish'].map(lang => (
            <label key={lang} className="flex items-center gap-2">
              <input type="checkbox" value={lang} {...register('captionLanguages')} />
              <span className="text-sm">{lang}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="topicsToAvoid" label="Topics / Words to AVOID" required error={errors.topicsToAvoid?.message}>
          <input placeholder="e.g. Don't use the word 'cheap'" {...register('topicsToAvoid')} />
        </FieldWrapper>
        <FieldWrapper id="existingHashtags" label="Existing Brand Hashtags" badge="optional" error={errors.existingHashtags?.message}>
          <input placeholder="#YourBrand #YourSlogan" {...register('existingHashtags')} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="upcomingLaunches" label="Upcoming Launches/Events" badge="optional" error={errors.upcomingLaunches?.message}>
          <textarea placeholder="Any festivals or new collections coming up?" {...register('upcomingLaunches')} rows={2} />
        </FieldWrapper>
        <FieldWrapper id="currentOffers" label="Current Offers / Discounts" badge="optional" error={errors.currentOffers?.message}>
          <textarea placeholder="e.g. FLAT20 coupon code" {...register('currentOffers')} rows={2} />
        </FieldWrapper>
      </div>

      <div className="my-8 h-px bg-[var(--color-border-default)]" />
      <SectionHeading icon="👥" title="Communication & Approvals" subtitle="How we'll work together" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="pocName" label="Approval POC Name" required error={errors.pocName?.message} hint="Who will approve ad creatives and spend?">
          <input placeholder="e.g. John Doe" {...register('pocName')} />
        </FieldWrapper>
        <FieldWrapper id="pocWhatsapp" label="POC WhatsApp Number" required error={errors.pocWhatsapp?.message}>
          <input type="tel" placeholder="+91 98765 43210" {...register('pocWhatsapp')} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="reportEmail" label="Email for Reports" required error={errors.reportEmail?.message}>
          <input type="email" placeholder="reports@yourbrand.com" {...register('reportEmail')} />
        </FieldWrapper>
        <FieldWrapper id="preferredApprovalTime" label="Preferred Time for Updates" badge="optional" error={errors.preferredApprovalTime?.message}>
          <input placeholder="e.g. Morning 10AM-12PM" {...register('preferredApprovalTime')} />
        </FieldWrapper>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Initial Content Uploads (Optional)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DropZone fieldId="smm_productPhotos" label="Product Photos" accept={['image/jpeg', 'image/png']} multiple maxFiles={10} badge="optional" onFilesChange={onFilesChange} initialFiles={initialFiles?.smm_productPhotos} />
          <DropZone fieldId="smm_reelFootage" label="Reel/Video Raw Footage" accept={['video/mp4']} multiple maxFiles={5} maxSizeMB={50} badge="optional" onFilesChange={onFilesChange} initialFiles={initialFiles?.smm_reelFootage} />
          <DropZone fieldId="smm_btsContent" label="BTS Content" accept={['image/jpeg', 'video/mp4']} multiple maxFiles={5} maxSizeMB={20} badge="optional" onFilesChange={onFilesChange} initialFiles={initialFiles?.smm_btsContent} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
