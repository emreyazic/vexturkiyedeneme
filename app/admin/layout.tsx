import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'VEX Command Center - Admin Panel',
    description: 'VEX Türkiye Yönetim Paneli',
    robots: 'noindex, nofollow' // Admin sayfaları indexlenmemeli
}

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
