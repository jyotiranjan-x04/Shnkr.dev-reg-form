'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step6Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

type Step6Data = z.infer<typeof step6Schema>

export default function Step6_DesignPrefs({ onNext, initialValues }: { onNext: (data: Step6Data) => void; initialValues?: Partial<Step6Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="✨" title="Design Preferences" subtitle="Help us understand the look and feel you want" />

      <FieldWrapper id="designStyle" label="Overall Design Style" badge="preferred" error={errors.designStyle?.message}>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {['Minimal & Clean', 'Bold & Vibrant', 'Earthy & Organic', 'Luxurious & Premium', 'Modern & Tech', 'Playful & Fun'].map(style => (
            <label key={style} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border-default)] bg-white hover:border-[var(--color-brand-orange)] hover:bg-orange-50/30 cursor-pointer transition-all group">
              <input type="radio" value={style} {...register('designStyle')} className="shrink-0" />
              <span className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-orange)] transition-colors">{style}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="colorPreference" label="Colours you LIKE" badge="optional" error={errors.colorPreference?.message}>
          <input placeholder="e.g. Earth tones, Navy blue, Gold" {...register('colorPreference')} />
        </FieldWrapper>
        <FieldWrapper id="colorsToAvoid" label="Colours to AVOID" badge="optional" error={errors.colorsToAvoid?.message}>
          <input placeholder="e.g. Neon colors, Red, Black" {...register('colorsToAvoid')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="referenceWebsites" label="Reference Websites you love" badge="preferred" error={errors.referenceWebsites?.message} hint="Paste links to 2-3 websites whose design you admire">
        <textarea placeholder="1. https://... (Love their typography)&#10;2. https://... (Love the minimal layout)" {...register('referenceWebsites')} rows={3} />
      </FieldWrapper>

      <FieldWrapper id="competitorWebsites" label="Competitor Websites" badge="optional" error={errors.competitorWebsites?.message} hint="Who are your main competitors?">
        <textarea placeholder="Paste links to competitor websites..." {...register('competitorWebsites')} rows={3} />
      </FieldWrapper>

      <FieldWrapper id="additionalNotes" label="Additional Design Notes" badge="optional" error={errors.additionalNotes?.message}>
        <textarea placeholder="Any other specific design requests or instructions..." {...register('additionalNotes')} rows={3} />
      </FieldWrapper>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
