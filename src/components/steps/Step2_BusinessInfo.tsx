'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

type Step2Data = z.infer<typeof step2Schema>

export default function Step2_BusinessInfo({ onNext, initialValues }: { onNext: (data: Step2Data) => void; initialValues?: Partial<Step2Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="🏪" title="Business Information" subtitle="Official details about your business" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="businessFullName" label="Full Business / Brand Name" required error={errors.businessFullName?.message}>
          <input placeholder="e.g. Puri Handloom Garden Pvt. Ltd." {...register('businessFullName')} />
        </FieldWrapper>
        <FieldWrapper id="tagline" label="Tagline / Slogan" badge="optional" error={errors.tagline?.message}>
          <input placeholder="Your brand's tagline" {...register('tagline')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="businessAddress" label="Full Business Address" required error={errors.businessAddress?.message}>
        <textarea placeholder="Shop #12, Market Road, Bhubaneswar, Odisha, 751001" {...register('businessAddress')} rows={2} />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="primaryPhone" label="Primary Phone" required error={errors.primaryPhone?.message}>
          <input type="tel" placeholder="+91 98765 43210" {...register('primaryPhone')} />
        </FieldWrapper>
        <FieldWrapper id="secondaryPhone" label="Secondary Phone" badge="optional" error={errors.secondaryPhone?.message}>
          <input type="tel" placeholder="+91 87654 32100" {...register('secondaryPhone')} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="businessEmail" label="Business Email" required error={errors.businessEmail?.message}>
          <input type="email" placeholder="contact@yourbrand.com" {...register('businessEmail')} />
        </FieldWrapper>
        <FieldWrapper id="whatsappNumber" label="WhatsApp Number" required error={errors.whatsappNumber?.message}>
          <input type="tel" placeholder="+91 98765 43210" {...register('whatsappNumber')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="googleMapsUrl" label="Google Maps Pin URL" required error={errors.googleMapsUrl?.message} hint="Open Google Maps → Click your location → Copy the share link">
        <input placeholder="https://maps.google.com/..." {...register('googleMapsUrl')} />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
        <FieldWrapper id="googleBusinessAccess" label="Google Business Profile Access?" badge="optional" error={errors.googleBusinessAccess?.message}>
          <select {...register('googleBusinessAccess')}>
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FieldWrapper>
        <FieldWrapper id="yearEstablished" label="Year Established" badge="optional" error={errors.yearEstablished?.message}>
          <input placeholder="e.g. 2019" {...register('yearEstablished')} />
        </FieldWrapper>
        <FieldWrapper id="gstNumber" label="GST Number" badge="optional" error={errors.gstNumber?.message}>
          <input placeholder="e.g. 21XXXXXXX1Z5" {...register('gstNumber')} />
        </FieldWrapper>
      </div>

      <FieldWrapper id="website" label="Existing Website URL (if any)" badge="optional" error={errors.website?.message}>
        <input placeholder="https://yourbrand.com" {...register('website')} />
      </FieldWrapper>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
