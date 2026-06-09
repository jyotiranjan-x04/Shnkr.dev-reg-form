'use client'
import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StepIndicator from './StepIndicator'
import ProgressBar from './ProgressBar'
import SuccessScreen from './ui/SuccessScreen'
import { getActiveSteps, STEPS } from '@/lib/constants'
import { FullFormData } from '@/lib/schema'

// Import all steps
import Step0 from './steps/Step0_ClientInfo'
import Step1 from './steps/Step1_BrandAssets'
import Step2 from './steps/Step2_BusinessInfo'
import Step3 from './steps/Step3_Content'
import Step4 from './steps/Step4_Photos'
import Step5 from './steps/Step5_TechnicalDetails'
import Step6 from './steps/Step6_DesignPrefs'
import Step7 from './steps/Step7_SocialMedia'
import Step8 from './steps/Step8_MetaAds'
import Step9 from './steps/Step9_Strategy'

const STORAGE_KEY = 'shnkr_onboarding_draft'

export default function OnboardingForm() {
  const [formData, setFormData] = useState<Partial<FullFormData>>({})
  const [filesMap, setFilesMap] = useState<Record<string, File[]>>({})
  const [currentLogicalStep, setCurrentLogicalStep] = useState(0) // Index in the activeSteps array
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const formRef = useRef<HTMLDivElement>(null)

  // Load drafts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.formData) setFormData(parsed.formData)
        if (parsed.step) setCurrentLogicalStep(parsed.step)
      } catch (e) { console.error('Failed to parse draft', e) }
    }
  }, [])

  // Save drafts
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step: currentLogicalStep }))
    }
  }, [formData, currentLogicalStep])

  const selectedServices = (formData.projectType as string[]) || []
  const activeSteps = getActiveSteps(selectedServices)
  const totalSteps = activeSteps.length
  
  // Is this the review step? (After all data entry steps)
  const isReviewStep = currentLogicalStep === totalSteps

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    setCurrentLogicalStep(s => s + 1)
    scrollToTop()
  }

  const handleBack = () => {
    setCurrentLogicalStep(s => Math.max(0, s - 1))
    scrollToTop()
  }

  const handleFilesChange = (fieldId: string, newFiles: File[]) => {
    setFilesMap(prev => ({ ...prev, [fieldId]: newFiles }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    const fd = new FormData()
    
    // Append JSON fields
    Object.entries(formData).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        fd.append(k, v.join(', '))
      } else if (v !== undefined && v !== null) {
        fd.append(k, String(v))
      }
    })

    // Append Files
    Object.entries(filesMap).forEach(([fieldId, files]) => {
      files.forEach(f => fd.append(fieldId, f))
    })

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        body: fd,
      })
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit')
      }
      setIsSuccess(true)
      localStorage.removeItem(STORAGE_KEY)
      scrollToTop()
    } catch (err: any) {
      setSubmitError(err.message || 'Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFormData({})
    setFilesMap({})
    setCurrentLogicalStep(0)
    setIsSuccess(false)
    scrollToTop()
  }

  const renderCurrentStep = () => {
    if (isReviewStep) return null

    const actualStepId = activeSteps[currentLogicalStep].id

    switch (actualStepId) {
      case 0: return <Step0 onNext={handleNext} initialValues={formData} />
      case 1: return <Step1 onNext={handleNext} onFilesChange={handleFilesChange} initialValues={formData} initialFiles={filesMap} />
      case 2: return <Step2 onNext={handleNext} initialValues={formData} />
      case 3: return <Step3 onNext={handleNext} initialValues={formData} />
      case 4: return <Step4 onNext={handleNext} onFilesChange={handleFilesChange} initialFiles={filesMap} />
      case 5: return <Step5 onNext={handleNext} onFilesChange={handleFilesChange} initialValues={formData} initialFiles={filesMap} />
      case 6: return <Step6 onNext={handleNext} initialValues={formData} />
      case 7: return <Step7 onNext={handleNext} onFilesChange={handleFilesChange} initialValues={formData} initialFiles={filesMap} />
      case 8: return <Step8 onNext={handleNext} initialValues={formData} />
      case 9: return <Step9 onNext={handleNext} onFilesChange={handleFilesChange} initialValues={formData} initialFiles={filesMap} />
      default: return null
    }
  }

  const totalFilesCount = Object.values(filesMap).reduce((acc, files) => acc + files.length, 0)
  const totalFilesSize = Object.values(filesMap).reduce((acc, files) => acc + files.reduce((s, f) => s + f.size, 0), 0)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-page)]">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6">
        <div ref={formRef} className="max-w-4xl mx-auto -mt-24 pt-24" />
        <div className="max-w-4xl mx-auto">
          
          {isSuccess ? (
            <div className="shnkr-card">
              <SuccessScreen 
                clientName={formData.clientName} 
                contactEmail={formData.contactEmail}
                fieldsCount={Object.keys(formData).length}
                filesCount={totalFilesCount}
                totalMB={Number((totalFilesSize / 1024 / 1024).toFixed(1))}
                onReset={resetForm}
              />
            </div>
          ) : (
            <div className="shnkr-card relative overflow-hidden">
              <StepIndicator steps={activeSteps} currentIndex={currentLogicalStep} />
              
              <div className="mt-8 mb-6">
                <ProgressBar 
                  current={currentLogicalStep + 1} 
                  total={totalSteps + 1} 
                  title={isReviewStep ? 'Review & Submit' : activeSteps[currentLogicalStep].title} 
                />
              </div>

              <div className="shnkr-step-panel relative z-10">
                {isReviewStep ? (
                  <div className="animate-[slideInRight_0.3s_cubic-bezier(0.22,1,0.36,1)]">
                    <h2 className="text-2xl font-[family-name:var(--font-barlow)] font-bold text-[var(--color-text-primary)] mb-2">Review Your Information</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6 pb-6 border-b border-[var(--color-border-default)]">Please double check your submission. We&apos;ll be in touch shortly.</p>
                    
                    <div className="bg-white rounded-xl p-5 border border-[var(--color-border-default)] mb-6 space-y-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Business Name</span>
                        <div className="text-[var(--color-text-primary)] font-medium">{formData.clientName}</div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Contact Details</span>
                        <div className="text-[var(--color-text-primary)]">{formData.contactPerson} • {formData.contactEmail} • {formData.contactPhone}</div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Services Required</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {(formData.projectType as string[])?.map(s => (
                            <span key={s} className="px-2.5 py-1 bg-orange-50 text-[var(--color-brand-dim)] rounded text-xs font-medium border border-orange-100">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Files Attached</span>
                        <div className="text-[var(--color-text-primary)]">{totalFilesCount} files ({(totalFilesSize / 1024 / 1024).toFixed(1)} MB)</div>
                      </div>
                    </div>

                    {submitError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex gap-3 items-start animate-[fadeUp_0.3s]">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                          <strong className="block font-semibold mb-0.5">Submission Error</strong>
                          {submitError}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--color-border-default)] sticky bottom-0 bg-[var(--color-surface-panel)] sm:static pb-4 sm:pb-0 z-20">
                      <button 
                        type="button" 
                        onClick={handleBack} 
                        className="w-full sm:w-auto px-6 py-3 shnkr-btn-ghost rounded-xl order-2 sm:order-1"
                        disabled={isSubmitting}
                      >
                        ← Back to Edit
                      </button>
                      <button 
                        type="button" 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 shnkr-btn-primary rounded-xl flex items-center justify-center gap-2 order-1 sm:order-2 shadow-lg shadow-orange-500/20"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Details...
                          </>
                        ) : 'Submit Form'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {renderCurrentStep()}
                    
                    {currentLogicalStep > 0 && (
                      <div className="mt-8 pt-6 border-t border-[var(--color-border-default)] flex sticky bottom-0 bg-[var(--color-surface-panel)] sm:static pb-4 sm:pb-0 z-20">
                        <button 
                          type="button" 
                          onClick={handleBack} 
                          className="px-6 py-2.5 shnkr-btn-ghost rounded-xl text-sm w-full sm:w-auto"
                        >
                          ← Back
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
