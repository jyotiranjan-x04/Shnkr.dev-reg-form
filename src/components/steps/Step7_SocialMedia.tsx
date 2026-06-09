'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step7Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import DropZone from '@/components/ui/DropZone'
import SectionHeading from '@/components/ui/SectionHeading'

type Step7Data = z.infer<typeof step7Schema>

export default function Step7_SocialMedia({ onNext, onFilesChange, initialValues, initialFiles }: {
  onNext: (data: Step7Data) => void
  onFilesChange: (fieldId: string, files: File[]) => void
  initialValues?: Partial<Step7Data>
  initialFiles?: Record<string, File[]>
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step7Data>({
    resolver: zodResolver(step7Schema),
    defaultValues: initialValues,
  })

  const [fileErrors, setFileErrors] = useState<Record<string, string>>({})

  const onSubmit = (data: Step7Data) => {
    let hasErrors = false
    const newFileErrors: Record<string, string> = {}

    if (!initialFiles?.smm_profilePhoto || initialFiles.smm_profilePhoto.length === 0) {
      newFileErrors.smm_profilePhoto = 'Profile Photo is required'
      hasErrors = true
    }
    if (!initialFiles?.smm_productPhotos || initialFiles.smm_productPhotos.length === 0) {
      newFileErrors.smm_productPhotos = 'At least one product photo is required'
      hasErrors = true
    }

    if (hasErrors) {
      setFileErrors(newFileErrors)
      return
    }

    onNext(data)
  }

  const interceptFiles = (fieldId: string, files: File[]) => {
    if (fileErrors[fieldId] && files.length > 0) {
      setFileErrors(p => ({ ...p, [fieldId]: '' }))
    }
    onFilesChange(fieldId, files)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="📱" title="Social Media Access" subtitle="Links to your active social profiles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="facebookPageUrl" label="Facebook Page URL" required error={errors.facebookPageUrl?.message}>
          <input placeholder="https://facebook.com/yourpage" {...register('facebookPageUrl')} />
        </FieldWrapper>
        <FieldWrapper id="instagramHandle" label="Instagram Handle" required error={errors.instagramHandle?.message}>
          <input placeholder="@yourbrand" {...register('instagramHandle')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="facebookLinkedToInstagram" label="Is Facebook linked to Instagram?" required error={errors.facebookLinkedToInstagram?.message}>
        <select {...register('facebookLinkedToInstagram')}>
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Not Yet">Not Yet</option>
        </select>
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="metaBusinessManagerId" label="Meta Business Manager ID" badge="optional" error={errors.metaBusinessManagerId?.message} hint="If you have an existing Meta Business account">
          <input placeholder="e.g. 109823091823" {...register('metaBusinessManagerId')} />
        </FieldWrapper>
        <FieldWrapper id="otaNumber" label="2FA / OTP Number" required error={errors.otaNumber?.message} hint="Number linked to social accounts for login OTPs">
          <input type="tel" placeholder="+91 98765 43210" {...register('otaNumber')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="youtubeChannel" label="YouTube Channel URL" badge="optional" error={errors.youtubeChannel?.message}>
        <input placeholder="https://youtube.com/c/..." {...register('youtubeChannel')} />
      </FieldWrapper>

      <FieldWrapper id="otherSocialLinks" label="Other Social Links" badge="optional" error={errors.otherSocialLinks?.message} hint="LinkedIn, Twitter, Pinterest, TikTok, etc.">
        <textarea placeholder="Paste other links here..." {...register('otherSocialLinks')} rows={2} />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-6">
        <FieldWrapper id="socialMediaLoginId" label="Social Media Login ID" required error={errors.socialMediaLoginId?.message} hint="Email or username for Facebook/Instagram">
          <input placeholder="e.g. hello@yourbrand.com" {...register('socialMediaLoginId')} />
        </FieldWrapper>
        <FieldWrapper id="socialMediaPassword" label="Social Media Password" required error={errors.socialMediaPassword?.message} hint="Password for the provided Login ID">
          <input type="password" placeholder="Your password" {...register('socialMediaPassword')} />
        </FieldWrapper>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Social Media Assets</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <DropZone fieldId="smm_profilePhoto" label="Profile Photo" accept={['image/jpeg', 'image/png']} multiple={false} required badge="required" onFilesChange={interceptFiles} initialFiles={initialFiles?.smm_profilePhoto} error={fileErrors.smm_profilePhoto} />
          <DropZone fieldId="smm_coverPhoto" label="Cover Photo (Facebook/YouTube)" accept={['image/jpeg', 'image/png']} multiple={false} badge="preferred" onFilesChange={interceptFiles} initialFiles={initialFiles?.smm_coverPhoto} />
        </div>
        
        <DropZone fieldId="smm_productPhotos" label="Product Photos for Posts" accept={['image/jpeg', 'image/png']} multiple maxFiles={15} required badge="required" onFilesChange={interceptFiles} initialFiles={initialFiles?.smm_productPhotos} error={fileErrors.smm_productPhotos} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <DropZone fieldId="smm_reelFootage" label="Raw Reels / Video Footage" accept={['video/mp4', 'video/quicktime']} multiple maxFiles={5} maxSizeMB={50} badge="preferred" onFilesChange={interceptFiles} initialFiles={initialFiles?.smm_reelFootage} />
          <DropZone fieldId="smm_btsContent" label="Behind-the-Scenes Photos" accept={['image/jpeg', 'image/png']} multiple maxFiles={10} badge="preferred" onFilesChange={interceptFiles} initialFiles={initialFiles?.smm_btsContent} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
