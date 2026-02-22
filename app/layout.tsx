import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VEX Türkiye',
  description: 'VEX Robotik Türkiye resmi web sitesi. Robotik yarışmalar, eğitim programları ve STEM ekosistemi.',
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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
