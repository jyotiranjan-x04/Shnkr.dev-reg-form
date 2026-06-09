import React from 'react'

export default function SectionHeading({ 
  icon, 
  title, 
  subtitle 
}: { 
  icon: string
  title: string
  subtitle?: string 
}) {
  return (
    <div className="mb-8 pb-4 border-b border-[var(--color-border-default)]">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-xl font-[family-name:var(--font-barlow)] font-bold text-[var(--color-text-primary)] tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mt-3 h-0.5 w-12 bg-[var(--color-brand-orange)] rounded-full" />
    </div>
  )
}
