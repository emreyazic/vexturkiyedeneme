import { getUpcomingEvents, getAllEvents, getActiveCountdownSettings } from '@/lib/sanity-queries'
import { EtkinlikTakvimiClient } from '@/components/EtkinlikTakvimiClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Etkinlik Takvimi | RECF Türkiye',
    description: 'RECF Türkiye turnuva ve etkinlik takvimi - yaklaşan turnuvalar ve RECFevents kayıt bilgileri',
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

