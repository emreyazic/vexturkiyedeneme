import { getLatestNews, getSingleFeaturedNews } from '@/lib/sanity-queries'
import { HaberlerVitrinClient } from '@/components/HaberlerVitrinClient'

// Haber Merkezi - Vitrin Sayfası
export default async function HaberlerPage() {
    // Öne çıkan haber
    const featuredNews = await getSingleFeaturedNews()

    // Son 10 haber (öne çıkan hariç arasından filtrelenecek)
    const allLatestNews = await getLatestNews(10)

    // Öne çıkan haberi listeden çıkar
    const latestNews = featuredNews
        ? allLatestNews.filter(news => news._id !== featuredNews._id).slice(0, 4)
        : allLatestNews.slice(0, 4)

    return <HaberlerVitrinClient featuredNews={featuredNews} latestNews={latestNews} />
}
