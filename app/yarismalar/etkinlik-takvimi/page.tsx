import { getUpcomingEvents, getAllEvents, getActiveCountdownSettings } from '@/lib/sanity-queries'
import { EtkinlikTakvimiClient } from '@/components/EtkinlikTakvimiClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Etkinlik Takvimi | VEX Türkiye',
    description: 'VEX Türkiye turnuva takvimi - yaklaşan etkinlikler ve kayıt bilgileri',
}

// Etkinlik Takvimi - Ana Sayfa
export default async function EtkinlikTakvimiPage() {
    // Yaklaşan etkinlikler (tarihe göre sıralı)
    const upcomingEvents = await getUpcomingEvents()

    // Tüm etkinlikler (takvim için)
    const allEvents = await getAllEvents()

    // Geri sayım ayarları
    const countdownSettings = await getActiveCountdownSettings()

    return (
        <EtkinlikTakvimiClient
            upcomingEvents={upcomingEvents}
            allEvents={allEvents}
            countdownSettings={countdownSettings}
        />
    )
}

