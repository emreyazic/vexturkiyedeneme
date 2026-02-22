import { getAllTeams } from '@/lib/sanity-queries'
import { TumTakimlarClient } from '@/components/TumTakimlarClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tüm Takımlar | VEX Türkiye',
    description: 'VEX Türkiye kayıtlı tüm robotik takımları - VEX IQ, V5 ve VEX U platformları',
}

// Tüm Takımlar Sayfası
export default async function TumTakimlarPage() {
    // Tüm aktif takımları çek
    const allTeams = await getAllTeams()

    return <TumTakimlarClient teams={allTeams} />
}
