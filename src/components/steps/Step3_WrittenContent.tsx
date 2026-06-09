'use client'
import React from 'react'
import FieldWrapper from '../ui/FieldWrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema } from '../../lib/schema'
import { z } from 'zod'

type Step3Data = z.infer<typeof step3Schema>

export default function Step3_WrittenContent({ onNext, initialValues }: { onNext: (data: Step3Data) => void, initialValues?: Partial<Step3Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: initialValues as any })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-slide-in-right">
      <FieldWrapper id="aboutUs" label="About Us — Brand Story" required error={errors.aboutUs?.message}>
        <textarea {...register('aboutUs')} rows={6} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="usps" label="Why Choose You? (3–5 bullet points)" badge="preferred" error={errors.usps?.message}>
        <textarea {...register('usps')} rows={4} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="homepageHeadline" label="Homepage Hero Headline Text" badge="preferred" error={errors.homepageHeadline?.message}>
        <input {...register('homepageHeadline')} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="productCategories" label="Product / Service Categories (one per line)" required error={errors.productCategories?.message}>
        <textarea {...register('productCategories')} rows={4} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="productDescriptions" label="Product Descriptions" badge="preferred" error={errors.productDescriptions?.message}>
        <textarea {...register('productDescriptions')} rows={5} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="pricing" label="Pricing (if to be shown on website)" badge="optional" error={errors.pricing?.message}>
        <textarea {...register('pricing')} rows={3} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="testimonials" label="Customer Testimonials / Reviews" badge="preferred" error={errors.testimonials?.message}>
        <textarea {...register('testimonials')} rows={4} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="faq" label="Frequently Asked Questions" badge="optional" error={errors.faq?.message}>
        <textarea {...register('faq')} rows={4} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <FieldWrapper id="shippingPolicy" label="Shipping / Return Policy" badge="optional" error={errors.shippingPolicy?.message}>
        <textarea {...register('shippingPolicy')} rows={3} className="w-full p-3 bg-[#111] border border-[#2E2E2E] rounded focus:border-[#F2540F] focus:outline-none" />
      </FieldWrapper>

      <div className="flex justify-end mt-4">
        <button type="submit" className="px-6 py-2 bg-[#F2540F] text-white font-medium rounded hover:bg-[#C94309] transition-colors">Next</button>
      </div>
    </form>
  )
}
