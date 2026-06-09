'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step5Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import DropZone from '@/components/ui/DropZone'
import SectionHeading from '@/components/ui/SectionHeading'

type Step5Data = z.infer<typeof step5Schema>

export default function Step5_TechnicalDetails({ onNext, onFilesChange, initialValues, initialFiles }: {
  onNext: (data: Step5Data) => void
  onFilesChange: (fieldId: string, files: File[]) => void
  initialValues?: Partial<Step5Data>
  initialFiles?: Record<string, File[]>
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="⚙️" title="Technical Details" subtitle="Domain and hosting setup information" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="domainName" label="Existing Domain Name" badge="optional" error={errors.domainName?.message} hint="If you already own one">
          <input placeholder="e.g. yourbrand.com" {...register('domainName')} />
        </FieldWrapper>
        <FieldWrapper id="preferredDomains" label="Preferred Domain Name(s)" badge="preferred" error={errors.preferredDomains?.message} hint="If you don't have one yet, list your ideas">
          <input placeholder="e.g. yourbrand.in, yourbrandindia.com" {...register('preferredDomains')} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="hostingProvider" label="Current Hosting Provider" badge="optional" error={errors.hostingProvider?.message}>
          <input placeholder="e.g. Hostinger, GoDaddy, Shopify" {...register('hostingProvider')} />
        </FieldWrapper>
        <FieldWrapper id="domainRegistrar" label="Domain Registrar" badge="optional" error={errors.domainRegistrar?.message} hint="Where did you buy your domain?">
          <input placeholder="e.g. GoDaddy, Namecheap" {...register('domainRegistrar')} />
        </FieldWrapper>
      </div>

      <DropZone fieldId="domainScreenshot" label="Screenshot of Domain / Hosting Dashboard" accept={['image/jpeg', 'image/png']} multiple={false} badge="optional" onFilesChange={onFilesChange} hint="Upload a screenshot of your GoDaddy/Hostinger dashboard to help us find the login requirements" initialFiles={initialFiles?.domainScreenshot} />

      <FieldWrapper id="existingWebsiteUrl" label="Current Website URL" badge="optional" error={errors.existingWebsiteUrl?.message} hint="If you are replacing an old website">
        <input placeholder="https://oldwebsite.com" {...register('existingWebsiteUrl')} />
      </FieldWrapper>

      <FieldWrapper id="businessEmails" label="Existing Business Emails" badge="optional" error={errors.businessEmails?.message} hint="List any @yourdomain.com emails currently active">
        <input placeholder="contact@yourbrand.com, support@yourbrand.com" {...register('businessEmails')} />
      </FieldWrapper>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
