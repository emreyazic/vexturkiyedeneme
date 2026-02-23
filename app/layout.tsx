import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});
const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

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
      <body className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
