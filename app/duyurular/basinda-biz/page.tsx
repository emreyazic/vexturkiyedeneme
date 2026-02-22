import { getAllTvNews } from '@/lib/sanity-queries'
import BasindaBizClient from '@/components/BasindaBizClient'

export default async function BasindaBizPage() {
    // Sanity'den TV haberlerini çek
    const tvNews = await getAllTvNews()

    return <BasindaBizClient tvNews={tvNews} />
}
