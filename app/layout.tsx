import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RECF Türkiye | Robotics Education & Competition Foundation',
  description: 'RECF Türkiye resmi web sitesi. Türkiye temsilcisi Intechne Teknoloji rehberliğinde STEM robotik yarışmaları ve eğitim programları.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/VEX-Robotics_Full-Color-1.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/VEX-Robotics_Full-Color-1.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/VEX-Robotics_Full-Color-1.png',
        type: 'image/png',
      },
    ],
    apple: '/VEX-Robotics_Full-Color-1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
