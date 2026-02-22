'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { BasindaBizTvSection } from '@/components/BasindaBizTvSection'
import type { SanityTvNews } from '@/lib/sanity-queries'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Newspaper, Tv, ExternalLink, Download
} from 'lucide-react'

// Press clippings (sadece yazılı basın)
const pressClippings = [
    {
        id: 1,
        outlet: 'Hürriyet',
        title: 'Türk Öğrenciler Dünya Şampiyonasına Gidiyor',
        excerpt: 'VEX Robotics Türkiye Şampiyonasını kazanan 8 takım, Nisan ayında Dallas\'ta düzenlenecek Dünya Şampiyonası\'nda ülkemizi temsil edecek.',
        date: '1 Mart 2026',
        logo: '/press/hurriyet.png',
        link: '#'
    },
    {
        id: 2,
        outlet: 'Milliyet',
        title: 'Robotik Eğitimde Türkiye Atağı',
        excerpt: 'Türkiye\'deki VEX takımlarının sayısı son 2 yılda 3 katına çıktı. Eğitimciler STEM eğitiminin önemini vurguluyor.',
        date: '28 Şubat 2026',
        logo: '/press/milliyet.png',
        link: '#'
    },
    {
        id: 3,
        outlet: 'Sabah',
        title: 'Genç Mühendisler Sahneye Çıktı',
        excerpt: 'İstanbul\'da düzenlenen VEX Robotics turnuvasında 142 takım yarıştı. En genç katılımcı 8 yaşında.',
        date: '28 Şubat 2026',
        logo: '/press/sabah.png',
        link: '#'
    },
    {
        id: 4,
        outlet: 'Sözcü',
        title: 'STEM Eğitiminde Devrim',
        excerpt: 'Robotik yarışmalar öğrencileri nasıl etkiliyor? Uzmanlar anlatıyor.',
        date: '25 Şubat 2026',
        logo: '/press/sozcu.png',
        link: '#'
    },
    {
        id: 5,
        outlet: 'Cumhuriyet',
        title: 'Mühendislik Hayalleri Gerçek Oldu',
        excerpt: 'VEX yarışmalarında ilk kez yer alan okul, bölgesel şampiyonluğu kazandı.',
        date: '20 Şubat 2026',
        logo: '/press/cumhuriyet.png',
        link: '#'
    }
]

// Filter types
const filterTypes = ['Tümü', 'Yazılı Basın', 'TV Haberleri']

// Newspaper Clipping Card
function ClippingCard({ item, index }: { item: typeof pressClippings[0]; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ rotate: 0, scale: 1.02, y: -5 }}
            className="relative bg-[#FDF8E8] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-amber-200/50 group"
            style={{
                transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                boxShadow: '4px 4px 15px rgba(0,0,0,0.1), inset 0 0 30px rgba(0,0,0,0.02)'
            }}
        >
            {/* Newspaper texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)'
            }} />

            {/* Header - Outlet name */}
            <div className="border-b-2 border-gray-900 p-4 pb-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-gray-900 tracking-tight">
                        {item.outlet}
                    </h3>
                    <span className="text-xs text-gray-500 font-serif">{item.date}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h4 className="text-lg font-serif font-bold text-gray-900 leading-tight mb-2">
                    {item.title}
                </h4>
                <p className="text-sm text-gray-700 font-serif leading-relaxed">
                    {item.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500 italic font-serif">Basın Haberi</span>
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                    >
                        Haberi Oku
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Corner fold effect */}
            <div
                className="absolute top-0 right-0 w-8 h-8"
                style={{
                    background: 'linear-gradient(135deg, transparent 50%, #E8DCC8 50%)',
                    boxShadow: '-2px 2px 5px rgba(0,0,0,0.1)'
                }}
            />
        </motion.article>
    )
}

interface BasindaBizClientProps {
    tvNews: SanityTvNews[]
}

export default function BasindaBizClient({ tvNews }: BasindaBizClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [filter, setFilter] = useState('Tümü')

    const filteredGazette = filter === 'Tümü' || filter === 'Yazılı Basın' ? pressClippings : []
    const showTvNews = filter === 'Tümü' || filter === 'TV Haberleri'

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Medya Odası"
                subtitle="VEX Türkiye basında"
            />

            {/* Filter */}
            <section className="py-6 bg-gray-100 border-b border-gray-200 sticky top-20 z-30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-4">
                        {filterTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* TV News Section - Sanity'den */}
            {showTvNews && <BasindaBizTvSection tvNews={tvNews} />}

            {/* Written Press Section */}
            {filteredGazette.length > 0 && (
                <section className="py-12 md:py-16 bg-gradient-to-b from-amber-50 to-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex items-center gap-3 mb-8">
                            <Newspaper className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-900">Yazılı Basın</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredGazette.map((item, index) => (
                                <ClippingCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Press Kit CTA */}
            <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Basın Kiti</h2>
                    <p className="text-gray-600 mb-8">
                        Logolar, görseller ve basın bültenleri için hazırladığımız kiti indirin
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Download className="w-4 h-4 mr-2" />
                        Basın Kitini İndir
                    </Button>
                </div>
            </section>

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
                            <h3 className="text-lg font-semibold mb-6">Duyurular</h3>
                            <ul className="space-y-3">
                                <li><a href="/duyurular/haberler" className="text-gray-400 hover:text-primary transition-colors">Haberler</a></li>
                                <li><a href="/duyurular/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                                <li><a href="/duyurular/basinda-biz" className="text-gray-400 hover:text-primary transition-colors">Basında Biz</a></li>
                                <li><a href="/duyurular/galeri" className="text-gray-400 hover:text-primary transition-colors">Galeri</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
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
