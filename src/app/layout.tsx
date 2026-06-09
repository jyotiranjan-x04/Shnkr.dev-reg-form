import './globals.css'
import React from 'react'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'

const barlow = Barlow_Condensed({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'SHNKR.DEV — Client Onboarding',
  description: 'Client onboarding form for SHNKR.DEV — Submit your brand & campaign information clearly in one place.',
  icons: {
    icon: '/logo-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable}`}>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        {children}
      </body>
    </html>
  )
}
