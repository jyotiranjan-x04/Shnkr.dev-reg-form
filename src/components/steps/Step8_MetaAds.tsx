'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step8Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

type Step8Data = z.infer<typeof step8Schema>

export default function Step8_MetaAds({ onNext, initialValues }: { onNext: (data: Step8Data) => void; initialValues?: Partial<Step8Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step8Data>({
    resolver: zodResolver(step8Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="📈" title="Meta Ads Details" subtitle="Budget, targeting, and ad account setup" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="monthlyAdBudget" label="Monthly Ad Budget (₹)" required error={errors.monthlyAdBudget?.message} hint="Exclude agency fee. Only spend paid directly to Meta.">
          <input type="number" min="0" placeholder="e.g. 50000" {...register('monthlyAdBudget', { valueAsNumber: true })} />
        </FieldWrapper>
        <FieldWrapper id="adAccountFunded" label="Is Ad Account Funded?" required error={errors.adAccountFunded?.message}>
          <select {...register('adAccountFunded')}>
            <option value="">Select...</option>
            <option value="Yes">Yes, card added / prepaid loaded</option>
            <option value="No">No, needs setup</option>
          </select>
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="adAccountId" label="Existing Ad Account ID" badge="optional" error={errors.adAccountId?.message}>
          <input placeholder="e.g. 109823091823" {...register('adAccountId')} />
        </FieldWrapper>
        <FieldWrapper id="existingPixelId" label="Existing Meta Pixel ID" badge="optional" error={errors.existingPixelId?.message}>
          <input placeholder="e.g. 109823091823" {...register('existingPixelId')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="targetLocation" label="Target Geography / Locations" required error={errors.targetLocation?.message} hint="Where should your ads run? (e.g. PAN India, only Mumbai/Delhi, Worldwide)">
        <input placeholder="e.g. PAN India, Tier 1 Cities" {...register('targetLocation')} />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="targetAgeRange" label="Target Age Range" badge="optional" error={errors.targetAgeRange?.message}>
          <input placeholder="e.g. 18-35, 25-50" {...register('targetAgeRange')} />
        </FieldWrapper>
        <FieldWrapper id="targetGender" label="Target Gender" badge="optional" error={errors.targetGender?.message}>
          <select {...register('targetGender')}>
            <option value="">All</option>
            <option value="Male">Male Only</option>
            <option value="Female">Female Only</option>
          </select>
        </FieldWrapper>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
