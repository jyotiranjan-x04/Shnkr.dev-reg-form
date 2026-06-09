export const STEPS = [
  { id: 0, title: 'Client & Project', icon: '👤', conditional: false },
  { id: 1, title: 'Brand Assets', icon: '🎨', conditional: false },
  { id: 2, title: 'Business Info', icon: '🏪', conditional: false },
  { id: 3, title: 'Written Content', icon: '📝', conditional: false },
  { id: 4, title: 'Photos & Media', icon: '📸', conditional: false },
  { id: 5, title: 'Domain & Technical', icon: '🌐', conditional: false },
  { id: 6, title: 'Design Preferences', icon: '🎯', conditional: false },
  { id: 7, title: 'Social Media', icon: '📱', conditional: true, requires: ['Social Media Marketing'] },
  { id: 8, title: 'Meta Ads', icon: '💰', conditional: true, requires: ['Meta Ads Management','Social Media Marketing'] },
  { id: 9, title: 'Brand Strategy', icon: '🗣️', conditional: true, requires: ['Social Media Marketing'] },
]

export function getActiveSteps(selectedServices: string[]) {
  return STEPS.filter(step => !step.conditional || step.requires?.some((r: string) => selectedServices.includes(r)))
}
