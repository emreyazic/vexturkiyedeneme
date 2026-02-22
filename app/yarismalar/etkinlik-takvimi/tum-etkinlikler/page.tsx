import { getAllEvents, getUpcomingEvents, getPastEvents } from '@/lib/sanity-queries'
import { TumEtkinliklerClient } from '@/components/TumEtkinliklerClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tüm Etkinlikler | VEX Türkiye',
    description: 'VEX Türkiye tüm turnuvalar ve etkinlikler arşivi',
}

// Tüm Etkinlikler - Arşiv Sayfası
export default async function TumEtkinliklerPage() {
    // Paralel veri çekme
    const [allEvents, upcomingEvents, pastEvents] = await Promise.all([
        getAllEvents(),
        getUpcomingEvents(),
        getPastEvents(),
    ])

    return (
        <TumEtkinliklerClient
            allEvents={allEvents}
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
        />
    )
}
