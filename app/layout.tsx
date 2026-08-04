import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'RECF Türkiye | Robotics Education & Competition Foundation',
  description: 'RECF Türkiye resmi web sitesi. Türkiye temsilcisi Intechne Teknoloji rehberliğinde STEM robotik yarışmaları ve eğitim programları.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/RECF_LargerFiles.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/RECF_LargerFiles.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/RECF_LargerFiles.svg',
        type: 'image/png',
      },
    ],
    apple: 'RECF_LargerFiles.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
