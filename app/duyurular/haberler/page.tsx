import { getLatestNews, getSingleFeaturedNews } from '@/lib/sanity-queries'
import { HaberlerVitrinClient } from '@/components/HaberlerVitrinClient'

// Haber Merkezi - Vitrin Sayfası
export default async function HaberlerPage() {
    // Öne çıkan haber
    const featuredNews = await getSingleFeaturedNews()

    // Son 3 haber (öne çıkan hariç)
    const allLatestNews = await getLatestNews(3)

    // Öne çıkan haberi listeden çıkar
    const latestNews = featuredNews
        ? allLatestNews.filter(news => news._id !== featuredNews._id).slice(0, 4)
        : allLatestNews.slice(0, 4)

    return <HaberlerVitrinClient featuredNews={featuredNews} latestNews={latestNews} />
}
