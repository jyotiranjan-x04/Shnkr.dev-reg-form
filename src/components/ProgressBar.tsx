import React from 'react'

export default function ProgressBar({ current, total, title }: { current: number; total: number; title?: string }) {
  const pct = Math.round((current / Math.max(1, total)) * 100)
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Step {current} of {total}
        </span>
        {title && (
          <span className="text-xs font-medium text-[var(--color-brand-orange)]">{title}</span>
        )}
      </div>
      <div className="w-full bg-[var(--color-border-default)] h-1.5 rounded-full overflow-hidden">
        <div 
          style={{ width: `${pct}%` }} 
          className="h-full bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-dim)] transition-all duration-500 ease-out rounded-full"
        />
      </div>
    </div>
  )
}
