import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <div className="space-y-6 max-w-md">
                <h1 className="text-8xl font-black text-[#E31837]">404</h1>
                <h2 className="text-2xl font-bold tracking-tight">Sayfa Bulunamadı</h2>
                <p className="text-muted-foreground">
                    Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-[#E31837] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c1132e] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:ring-offset-2"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    )
}