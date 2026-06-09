'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema } from '@/lib/schema'
import { z } from 'zod'
import FieldWrapper from '@/components/ui/FieldWrapper'
import SectionHeading from '@/components/ui/SectionHeading'

type Step3Data = z.infer<typeof step3Schema>

export default function Step3_Content({ onNext, initialValues }: { onNext: (data: Step3Data) => void; initialValues?: Partial<Step3Data> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
      <SectionHeading icon="✍️" title="Written Content" subtitle="Content for your website pages and marketing copy" />

      <FieldWrapper id="aboutUs" label="About Us / Brand Story" required error={errors.aboutUs?.message} hint="Write a short paragraph about your brand — or share key points and we will write it for you">
        <textarea placeholder="Tell us the story of your brand..." {...register('aboutUs')} rows={5} />
      </FieldWrapper>

      <FieldWrapper id="usps" label="Why Choose You? (USPs)" badge="preferred" error={errors.usps?.message} hint="Bullet points work great! What makes you different?">
        <textarea placeholder="• Handmade & authentic products&#10;• 10+ years of expertise&#10;• Free shipping above ₹999" {...register('usps')} rows={4} />
      </FieldWrapper>

      <FieldWrapper id="homepageHeadline" label="Homepage Headline" badge="optional" error={errors.homepageHeadline?.message}>
        <input placeholder="e.g. Authentic handloom sarees from the heart of Odisha" {...register('homepageHeadline')} />
      </FieldWrapper>

      <FieldWrapper id="productCategories" label="Product / Service Categories" required error={errors.productCategories?.message} hint="Comma separated list of your main product lines">
        <textarea placeholder="e.g. Sarees, Duppattas, Stoles, Bed Sheets, Table Mats" {...register('productCategories')} rows={3} />
      </FieldWrapper>

      <FieldWrapper id="productDescriptions" label="Product Descriptions" badge="optional" error={errors.productDescriptions?.message} hint="Paste or share descriptions for each product type">
        <textarea placeholder="Short descriptions for your top products..." {...register('productDescriptions')} rows={4} />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="pricing" label="Pricing Info" badge="optional" error={errors.pricing?.message}>
          <textarea placeholder="e.g. Sarees starting ₹1,200" {...register('pricing')} rows={3} />
        </FieldWrapper>
        <FieldWrapper id="testimonials" label="Customer Testimonials" badge="optional" error={errors.testimonials?.message}>
          <textarea placeholder="Paste your best customer reviews" {...register('testimonials')} rows={3} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldWrapper id="faq" label="FAQ (Frequently Asked Questions)" badge="optional" error={errors.faq?.message}>
          <textarea placeholder="Q: Do you ship internationally?&#10;A: Yes, we ship worldwide." {...register('faq')} rows={3} />
        </FieldWrapper>
        <FieldWrapper id="shippingPolicy" label="Shipping & Return Policy" badge="optional" error={errors.shippingPolicy?.message}>
          <textarea placeholder="Free shipping on orders above ₹999. Returns within 7 days." {...register('shippingPolicy')} rows={3} />
        </FieldWrapper>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="px-8 py-3 shnkr-btn-primary rounded-2xl text-sm font-semibold">Next →</button>
      </div>
    </form>
  )
}
