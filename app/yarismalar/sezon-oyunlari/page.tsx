'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { ExternalLink, BookOpen, Clock, UserPlus, FileText, Target } from 'lucide-react'

const seasonGames = [
    {
        id: 'engage',
        program: 'RECF Engage',
        gameName: 'Tier Takeover',
        description: '2026-2027 sezonu RECF Engage ligi oyunu "Tier Takeover", ilk ve ortaokul öğrencilerini takım çalışması ve stratejik hedefleme üzerine odaklıyor. Oyun, 6x8 ft boyutlarında standart Engage sahasında oynanır. Amaç, takım çalışması (Teamwork) maçlarında ortaklaşa en yüksek puanı almak veya bireysel sürüş/kodlama (Skills) yarışmalarında görevleri tamamlamaktır.',
        version: 'Versiyon 1.0',
        lastUpdate: '1 Mayıs 2026',
        manualUrl: 'https://games.recf.org/engage/1.1',
        bgTheme: 'bg-red-50 border-red-100',
        iconTheme: 'text-red-600 bg-red-100',
        btnTheme: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20',
        dotColor: 'bg-red-600',
        textColor: 'text-red-700',
        blob1Color: 'bg-red-200',
        blob2Color: 'bg-red-300'
    },
    {
        id: 'achieve',
        program: 'RECF Achieve',
        gameName: 'Pinnacle',
        description: '2026-2027 sezonu RECF Achieve (Ortaokul ve Lise) ligi oyunu "Pinnacle", ortaokul ve lise öğrencileri için profesyonel metal robot yapımı ve ileri düzey programlama sunan robotik yarışma platformudur. 12x12 ft boyutlarındaki sahada oynanan oyunda, ittifak maçları, otonom periyot, nesnelerin (halkaların) çeşitli seviyelerdeki direklere (stakes) istiflenmesi ve maç sonunda robotların tırmanması gibi dinamik görevler yer alır.',
        version: 'Versiyon 1.0',
        lastUpdate: '5 Mayıs 2026',
        manualUrl: 'https://games.recf.org/achieve/1.2',
        bgTheme: 'bg-blue-50 border-blue-100',
        iconTheme: 'text-blue-600 bg-blue-100',
        btnTheme: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20',
        dotColor: 'bg-blue-600',
        textColor: 'text-blue-700',
        blob1Color: 'bg-blue-200',
        blob2Color: 'bg-blue-300'
    },
    {
        id: 'inspire',
        program: 'RECF Inspire',
        gameName: 'Pinnacle',
        description: '2026-2027 sezonu RECF Inspire (Üniversite) ligi oyunu "Pinnacle", üniversite öğrencileri için tasarlanmış, sınırsız tasarım özgürlüğü sunan elit robotik yarışma platformudur. 12x12 ft boyutlarındaki sahada oynanan oyunda takımlar, otonom periyot, nesnelerin direklere istiflenmesi ve tırmanma görevlerini gerçekleştirmek için iki adet koordineli çalışan robot tasarlar.',
        version: 'Versiyon 1.0',
        lastUpdate: '5 Mayıs 2026',
        manualUrl: 'https://games.recf.org/inspire/1.2',
        bgTheme: 'bg-purple-50 border-purple-100',
        iconTheme: 'text-purple-600 bg-purple-100',
        btnTheme: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20',
        dotColor: 'bg-purple-600',
        textColor: 'text-purple-700',
        blob1Color: 'bg-purple-200',
        blob2Color: 'bg-purple-300'
    }
]

export default function SezonOyunlariPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="2026–2027 RECF Sezon Oyunları"
                subtitle="RECF Engage: Tier Takeover; RECF Achieve: Pinnacle; RECF Inspire: Pinnacle"
            />

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Yeni Sezonun Heyecanına Katılın</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Robotics Education & Competition Foundation (RECF) tarafından açıklanan 2026-2027 sezon oyunlarının temel kurallarını inceleyin, resmi Oyun Kılavuzlarına (Game Manual) erişin ve robotunuzu tasarlamaya başlayın.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {seasonGames.map((game) => (
                            <div key={game.id} className={`rounded-3xl border p-8 md:p-12 overflow-hidden relative ${game.bgTheme}`}>
                                <div className="grid lg:grid-cols-2 gap-12 items-center">

                                    {/* Content */}
                                    <div className="z-10 relative">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold shadow-sm mb-6">
                                            <div className={`w-2 h-2 rounded-full ${game.dotColor}`} />
                                            <span className={game.textColor}>{game.program}</span>
                                        </div>

                                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                            {game.gameName}
                                        </h3>

                                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                            {game.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                            <a href={game.manualUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 ${game.btnTheme}`}>
                                                <BookOpen className="w-5 h-5" />
                                                Oyun Kılavuzu (Manual)
                                            </a>
                                            <Link href="/takimlar/kayit" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                                                <UserPlus className="w-5 h-5 text-gray-500" />
                                                Kayıt Ol
                                            </Link>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 bg-white/60 p-4 rounded-xl inline-flex backdrop-blur-sm">
                                            <div className="flex items-center gap-2 font-medium">
                                                <FileText className={`w-4 h-4 ${game.iconTheme.split(' ')[0]}`} />
                                                {game.version}
                                            </div>
                                            <div className="flex items-center gap-2 font-medium">
                                                <Clock className={`w-4 h-4 ${game.iconTheme.split(' ')[0]}`} />
                                                Son Güncelleme: {game.lastUpdate}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Placeholder */}
                                    <div className="relative">
                                        <div className="aspect-[4/3] rounded-2xl bg-white/80 border border-white shadow-xl flex flex-col items-center justify-center p-8 text-center relative z-10 overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 z-0" />
                                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10 ${game.iconTheme}`}>
                                                <Target className="w-10 h-10" />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{game.gameName} Sahası</h4>
                                            <p className="text-gray-500 text-sm relative z-10">Resmi saha render görseli etkinlik duyuruları ile güncellenecektir.</p>
                                        </div>
                                        {/* Decorative blobs */}
                                        <div className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 rounded-full blur-3xl opacity-50 ${game.blob1Color}`} />
                                        <div className={`absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 rounded-full blur-3xl opacity-50 ${game.blob2Color}`} />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
