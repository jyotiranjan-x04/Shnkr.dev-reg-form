import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[var(--color-border-default)] py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/logo-icon.png" alt="SHNKR.DEV" className="h-6 w-auto opacity-60" />
          <span className="text-sm font-semibold text-[var(--color-text-secondary)]">SHNKR.DEV</span>
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          shnkrdev.in · Sai Shankar Das · Bhubaneswar, Odisha
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          This submission is powered by the SHNKR.DEV Client Onboarding Portal
        </p>
      </div>
    </footer>
  )
}
