import React from 'react'

interface StepDef {
  id: number
  title: string
  icon: string
}

export default function StepIndicator({ steps, currentIndex }: { steps: StepDef[]; currentIndex: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-none">
      {steps.map((s, i) => {
        const isActive = i === currentIndex
        const isDone = i < currentIndex
        return (
          <React.Fragment key={s.id}>
            {i > 0 && (
              <div className={`h-0.5 w-4 sm:w-6 shrink-0 rounded-full transition-colors duration-300 ${isDone ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-border-default)]'}`} />
            )}
            <div 
              className={`flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                ${isDone 
                  ? 'bg-[var(--color-brand-orange)] text-white shadow-sm shadow-orange-200' 
                  : isActive 
                    ? 'bg-orange-50 text-[var(--color-brand-orange)] ring-2 ring-[var(--color-brand-orange)] ring-offset-1' 
                    : 'bg-stone-100 text-[var(--color-text-muted)]'
                }`}
            >
              <span className="text-sm">{isDone ? '✓' : s.icon}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
