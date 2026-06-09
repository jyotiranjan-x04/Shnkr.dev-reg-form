'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step0Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

type Step0Data = z.infer<typeof step0Schema>

const PROJECT_TYPES = [
  'Website Development',
  'Social Media Marketing',
  'Meta Ads Management',
  'Monthly Maintenance',
  'Full Package',
]

export default function Step0_ClientInfo({ onNext, initialValues }: { onNext: (data: Step0Data) => void; initialValues?: Partial<Step0Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step0Data>({
    resolver: zodResolver(step0Schema),
    defaultValues: initialValues || { projectType: [] },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="👤" title="Client & Project Info" subtitle="Tell us about yourself and the services you need" />

      <FieldWrapper id="clientName" label="Client / Business Name" required error={errors.clientName?.message}>
        <input placeholder="e.g. Puri Handloom Garden" {...register('clientName')} suppressHydrationWarning />
      </FieldWrapper>

      <FieldWrapper id="contactPerson" label="Your Name (Point of Contact)" required error={errors.contactPerson?.message}>
        <input placeholder="e.g. John Doe" {...register('contactPerson')} suppressHydrationWarning />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="contactEmail" label="Your Email Address" required error={errors.contactEmail?.message}>
          <input type="email" placeholder="you@example.com" {...register('contactEmail')} suppressHydrationWarning />
        </FieldWrapper>

        <FieldWrapper id="contactPhone" label="WhatsApp / Phone Number" required error={errors.contactPhone?.message}>
          <input type="tel" placeholder="+91 98765 43210" {...register('contactPhone')} suppressHydrationWarning />
        </FieldWrapper>
      </div>

      <FieldWrapper id="projectType" label="Service Required" required error={errors.projectType?.message as string}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {PROJECT_TYPES.map(option => (
            <label key={option} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border-default)] bg-white hover:border-[var(--color-brand-orange)] hover:bg-orange-50/30 cursor-pointer transition-all group">
              <input type="checkbox" value={option} {...register('projectType')} className="shrink-0" />
              <span className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-orange)] transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <FieldWrapper id="projectNotes" label="Any initial notes or context" badge="optional" error={errors.projectNotes?.message}>
        <textarea placeholder="Tell us anything relevant about your project..." {...register('projectNotes')} rows={4} />
      </FieldWrapper>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold" suppressHydrationWarning>
          Next →
        </button>
      </div>
    </form>
  )
}
