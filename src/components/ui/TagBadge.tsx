import React from 'react'

const BADGE_CONFIG = {
  required: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    label: 'Required',
  },
  preferred: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    label: 'Preferred',
  },
  optional: {
    bg: 'bg-stone-100',
    text: 'text-stone-500',
    border: 'border-stone-200',
    label: 'Optional',
  },
} as const

export default function TagBadge({ type }: { type: 'required' | 'preferred' | 'optional' }) {
  const config = BADGE_CONFIG[type]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  )
}
