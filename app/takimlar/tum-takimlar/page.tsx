import { getAllTeams } from '@/lib/sanity-queries'
import { TumTakimlarClient } from '@/components/TumTakimlarClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tüm Takımlar | RECF Türkiye',
    description: 'RECF Türkiye kayıtlı tüm robotik ve drone takımları - Intechne Teknoloji temsilciliğinde',
}

// Tüm Takımlar Sayfası
export default async function TumTakimlarPage() {
    // Tüm aktif takımları çek
    const allTeams = await getAllTeams()

    return <TumTakimlarClient teams={allTeams} />
}
