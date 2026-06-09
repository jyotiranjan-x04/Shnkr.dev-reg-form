'use client'
import React from 'react'
import FieldWrapper from '../ui/FieldWrapper'
import DropZone from '../ui/DropZone'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step5Schema } from '../../lib/schema'
import { z } from 'zod'

type Step5Data = z.infer<typeof step5Schema>

export default function Step5_Technical({ onNext, onFilesChange, initialValues }: { onNext: (data: Step5Data) => void, onFilesChange: (fieldId: string, files: File[]) => void, initialValues?: Partial<Step5Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step5Data>({ resolver: zodResolver(step5Schema), defaultValues: initialValues as any })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-slide-in-right">
      <FieldWrapper id="domainName" label="Existing Domain (e.g. yourbusiness.com)" badge="preferred" error={errors.domainName?.message}>
        <input {...register('domainName')} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="preferredDomains" label="Preferred Domain Names (if no existing domain)" hint="One per line" badge="preferred" error={errors.preferredDomains?.message}>
        <textarea {...register('preferredDomains')} rows={3} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="hostingProvider" label="Hosting Provider" badge="optional" error={errors.hostingProvider?.message}>
        <input {...register('hostingProvider')} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="domainRegistrar" label="Domain Registrar (GoDaddy / BigRock etc.)" badge="optional" error={errors.domainRegistrar?.message}>
        <input {...register('domainRegistrar')} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="existingWebsiteUrl" label="Existing Website URL" badge="optional" error={errors.existingWebsiteUrl?.message}>
        <input type="url" {...register('existingWebsiteUrl')} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="businessEmails" label="Existing Business Email IDs to keep" badge="preferred" error={errors.businessEmails?.message}>
        <textarea {...register('businessEmails')} rows={2} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <DropZone fieldId="domainScreenshot" label="Screenshot of Domain / Hosting Dashboard" accept={['image/png', 'image/jpeg', 'image/webp', 'application/pdf']} multiple={true} badge="optional" onFilesChange={onFilesChange} hint="PNG, JPG, PDF" />

      <div className="flex justify-end mt-4">
        <button type="submit" className="px-6 py-2 bg-[#F2540F] text-white font-medium rounded hover:bg-[#C94309] transition-colors">Next</button>
      </div>
    </form>
  )
}
