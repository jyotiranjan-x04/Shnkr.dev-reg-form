import React from 'react'
import TagBadge from './TagBadge'

export default function FieldWrapper({
  id,
  label,
  required,
  badge,
  hint,
  children,
  error,
}: {
  id: string
  label: string
  required?: boolean
  badge?: 'required' | 'preferred' | 'optional'
  hint?: string
  children: React.ReactNode
  error?: string | null
}) {
  const badgeType = badge || (required ? 'required' : 'optional')

  const styledChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<{ className?: string; id?: string }>, {
        className: [
          'shnkr-input',
          (children as React.ReactElement<{ className?: string }>).props.className || '',
          error ? 'border-[var(--color-error)]!' : '',
        ].join(' ').trim(),
        id,
      })
    : children
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-label)]">
          {label}
        </label>
        <TagBadge type={badgeType} />
      </div>
      <div>{styledChildren}</div>
      {hint && <div className="text-xs text-[var(--color-text-muted)] mt-1.5">{hint}</div>}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-error)] mt-1.5 font-medium">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}
