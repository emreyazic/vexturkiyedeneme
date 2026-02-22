export const metadata = {
    title: 'VEX Türkiye CMS - Sanity Studio',
    description: 'VEX Türkiye içerik yönetim sistemi',
    robots: 'noindex, nofollow', // Studio sayfaları indexlenmemeli
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Studio kendi html/body yapısını oluşturur, burada sadece children döndürüyoruz
    return children
}
