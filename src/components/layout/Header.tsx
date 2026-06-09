import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-[var(--color-border-default)] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-icon.png" 
            alt="SHNKR.DEV Logo" 
            className="h-9 w-auto"
          />
          <img 
            src="/logo-name.png" 
            alt="SHNKR.DEV" 
            className="h-8 w-auto hidden sm:block"
          />
        </div>
        <div className="text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-panel)] border border-[var(--color-border-default)] px-4 py-2 rounded-full">
          Client Onboarding
        </div>
      </div>
    </header>
  )
}
