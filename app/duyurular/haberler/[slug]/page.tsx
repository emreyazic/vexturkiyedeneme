import { notFound } from 'next/navigation'
import { getNewsBySlug, getLatestNews } from '@/lib/sanity-queries'
import { NewsDetailClient } from '@/components/NewsDetailClient'
import type { Metadata } from 'next'

interface Props {
    params: Promise<{ slug: string }>
}

// Dinamik metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const news = await getNewsBySlug(slug)

    if (!news) {
        return {
            title: 'Haber Bulunamadı | VEX Türkiye',
        }
    }

    return {
        title: `${news.title} | VEX Türkiye`,
        description: news.excerpt || `${news.title} - VEX Türkiye haberleri`,
        openGraph: {
            title: news.title,
            description: news.excerpt || '',
            type: 'article',
            publishedTime: news.publishedAt,
            authors: news.author ? [news.author] : undefined,
        },
    }
}

// Statik sayfa oluşturma için (isteğe bağlı)
export async function generateStaticParams() {
    const news = await getLatestNews(20) // Son 20 haber için statik sayfa oluştur
    return news.map((item) => ({
        slug: item.slug.current,
    }))
}

// Server Component - Haber verisini çeker
export default async function NewsDetailPage({ params }: Props) {
    const { slug } = await params
    const news = await getNewsBySlug(slug)

    // Haber bulunamazsa 404
    if (!news) {
        notFound()
    }

    return <NewsDetailClient news={news} />
}
