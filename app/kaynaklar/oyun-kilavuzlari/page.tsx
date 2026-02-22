import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { getAllGameRules, getAllManualDownloads } from '@/lib/sanity-queries'
import OyunKilavuzlariClient from '@/components/OyunKilavuzlariClient'
import { ManualDownloadsSection } from '@/components/ManualDownloadsSection'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Oyun Kılavuzları | VEX Türkiye',
    description: 'VEX yarışma kurallarını Türkçe ve İngilizce olarak keşfedin. VEX 123, GO, IQ, V5, U ve AI platformlarına özel kurallar.',
}

export default async function OyunKilavuzlariPage() {
    // Fetch data from Sanity on the server
    const [rules, manualDownloads] = await Promise.all([
        getAllGameRules(),
        getAllManualDownloads()
    ])

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar />

            <div className="h-20" />
            <CorporateHero
                title="Oyun Kılavuzları"
                subtitle="VEX yarışma kurallarını Türkçe ve İngilizce olarak keşfedin"
            />

            {/* Client Component with all interactive features */}
            <OyunKilavuzlariClient initialRules={rules} />

            {/* Disclaimer */}
            <div className="container mx-auto px-6 max-w-7xl py-6">
                <p className="text-xs text-gray-500 text-center">
                    Burada yazılan kural açıklamaları özet niteliğindedir. Kaynak olarak kullanılamaz. Kaynak olarak resmi dokümanları inceleyiniz.
                </p>
            </div>

            {/* Dynamic Download Section */}
            <ManualDownloadsSection downloads={manualDownloads} />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">VEX</div>
                                <div><div className="text-lg font-bold">VEX TÜRKİYE</div><div className="text-xs text-gray-400">Robotics Competition</div></div>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                                <li><a href="/kaynaklar/mufredat" className="text-gray-400 hover:text-primary transition-colors">Müfredatlar</a></li>
                                <li><a href="/kaynaklar/juri" className="text-gray-400 hover:text-primary transition-colors">Jüri & Değerlendirme</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Sonuçlar</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <p className="text-sm text-gray-500 text-center">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
