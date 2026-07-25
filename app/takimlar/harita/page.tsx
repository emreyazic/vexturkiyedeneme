import { getAllTeams } from '@/lib/sanity-queries'
import { TeamsMapClient } from '@/components/TeamsMapClient'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react'

export default async function TakimHaritasiPage() {
    // Sanity'den tüm takımları çek
    const teams = await getAllTeams()

    return (
        <>
            <TeamsMapClient teams={teams} />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">RECF</div>
                                <div><div className="text-lg font-bold">RECF TÜRKİYE</div><div className="text-xs text-gray-400">Türkiye Temsilcisi: Intechne Teknoloji</div></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Takımlar</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="/takimlar/harita" className="text-gray-400 hover:text-primary transition-colors">Takım Haritası</a></li>
                                <li><a href="/takimlar/nasil-kurulur" className="text-gray-400 hover:text-primary transition-colors">Nasıl Kurulur?</a></li>
                                <li><a href="/takimlar/kayit" className="text-gray-400 hover:text-primary transition-colors">Takım Kaydı</a></li>
                                <li><a href="/takimlar/mentor" className="text-gray-400 hover:text-primary transition-colors">Mentor Desteği</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Sonuçlar</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><strong>Yerel Operasyon:</strong> Intechne Teknoloji</li>
                                <li>info@recfturkiye.org</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800 text-center">
                        <p className="text-sm text-gray-500">© 2026 RECF Türkiye. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
