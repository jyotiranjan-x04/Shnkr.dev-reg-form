'use client'
import React from 'react'

export default function SuccessScreen({ 
  clientName, 
  contactEmail,
  fieldsCount = 0,
  filesCount = 0,
  totalMB = 0,
  onReset,
}: { 
  clientName?: string
  contactEmail?: string
  fieldsCount?: number
  filesCount?: number
  totalMB?: number
  onReset?: () => void
}) {
  return (
    <div className="text-center py-16 animate-[fadeUp_0.35s_cubic-bezier(0.22,1,0.36,1)]">
      {/* Animated checkmark circle */}
      <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-8 shadow-lg shadow-orange-100/50 animate-[scaleIn_0.5s_cubic-bezier(0.22,1,0.36,1)]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" strokeDasharray="30" strokeDashoffset="30" className="animate-[checkDraw_0.6s_ease-out_0.3s_forwards]" />
        </svg>
      </div>

      <h3 className="text-3xl font-[family-name:var(--font-barlow)] font-bold mb-3 text-[var(--color-text-primary)]">
        Form Submitted Successfully!
      </h3>
      <p className="text-lg text-[var(--color-text-secondary)] mb-6">
        We&apos;ve received <strong className="text-[var(--color-brand-orange)]">{clientName || 'your'}</strong>&apos;s details.
      </p>
      
      <p className="text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed mb-8">
        A confirmation has been sent to{' '}
        <strong className="text-[var(--color-text-primary)]">{contactEmail || 'your email'}</strong>. 
        Our team will review your submission and get back to you within 24 hours on WhatsApp.
      </p>

      <hr className="border-[var(--color-border-default)] w-32 mx-auto mb-8" />

      <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-[var(--color-text-secondary)] mb-10">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
          Total fields filled: <strong className="text-[var(--color-text-primary)]">{fieldsCount}</strong>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand-orange)]" />
          Files uploaded: <strong className="text-[var(--color-text-primary)]">{filesCount} ({totalMB} MB)</strong>
        </div>
      </div>

      <button 
        onClick={onReset || (() => window.location.reload())} 
        className="px-8 py-3.5 shnkr-btn-primary rounded-2xl text-base"
      >
        Submit Another Client →
      </button>

      <p className="text-xs text-[var(--color-text-muted)] mt-8">SHNKR.DEV · shnkrdev.in</p>
    </div>
  )
}
