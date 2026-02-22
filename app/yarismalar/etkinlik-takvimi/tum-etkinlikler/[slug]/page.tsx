import { getEventBySlug, getAllEvents } from '@/lib/sanity-queries'
import { TurnuvaDetayClient } from '@/components/TurnuvaDetayClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Generate static paths for all events
export async function generateStaticParams() {
    const events = await getAllEvents()
    return events.map((event) => ({
        slug: event.slug.current,
    }))
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        return {
            title: 'Etkinlik Bulunamadı | VEX Türkiye',
        }
    }

    return {
        title: `${event.name} | VEX Türkiye`,
        description: `${event.name} - ${event.city}, ${new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    }
}

// Turnuva Detay Sayfası
export default async function TurnuvaDetayPage({ params }: PageProps) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    return <TurnuvaDetayClient event={event} />
}
