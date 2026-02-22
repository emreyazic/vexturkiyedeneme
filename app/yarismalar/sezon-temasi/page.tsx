import { getScoringRulesByPlatform, getSeasonResourcesByPlatform } from '@/lib/sanity-queries'
import { SezonTemasiClient } from '@/components/SezonTemasiClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sezon Teması | VEX Türkiye',
    description: 'VEX Robotics Competition 2025-2026 sezon teması - Push Back ve Rapid Relay oyun kuralları, puan hesaplayıcı ve kaynaklar',
}

// Sezon Teması - Ana Sayfa (Server Component)
export default async function SezonTemasiPage() {
    // VRC ve IQ puanlama kurallarını çek
    const [vrcRules, iqRules] = await Promise.all([
        getScoringRulesByPlatform('vrc'),
        getScoringRulesByPlatform('iq'),
    ])

    // VRC ve IQ kaynaklarını çek
    const [vrcResources, iqResources] = await Promise.all([
        getSeasonResourcesByPlatform('vrc'),
        getSeasonResourcesByPlatform('iq'),
    ])

    return (
        <SezonTemasiClient
            vrcRules={vrcRules}
            iqRules={iqRules}
            vrcResources={vrcResources}
            iqResources={iqResources}
        />
    )
}
