import { getAllNews } from '@/lib/sanity-queries'
import { TumHaberlerClient } from '@/components/TumHaberlerClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Haber Arşivi | VEX Türkiye',
    description: 'VEX Türkiye tüm haberler, duyurular ve gelişmeler arşivi',
}

// Tüm Haberler - Arşiv Sayfası
export default async function TumHaberlerPage() {
    // Tüm haberleri çek (sınırsız)
    const allNews = await getAllNews()

    return <TumHaberlerClient news={allNews} />
}
