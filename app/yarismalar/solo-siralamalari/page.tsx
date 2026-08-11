'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Filter,
    ExternalLink,
    ShieldCheck,
    Calculator,
    AlertCircle,
    Gamepad2,
    Code2
} from 'lucide-react'

// Veri gelene kadar liste boş kalacak
const soloRankings: any[] = []

const content = {
    TR: {
        hero: {
            title: 'Solo Sıralamaları',
            subtitle:
                'RECF Türkiye Solo Driving ve Solo Coding performans sıralamaları'
        },

        filters: {
            program: 'Program Seçin (Engage, Achieve...)',
            age: 'Yaş Kategorisi (U12, U15...)'
        },

        explanation: {
            title:
                'Combined Solo Ranking (Birleşik Solo Sıralaması) Mantığı',
            description:
                'RECF etkinliklerinde takımlar, "Solo Driving Matches" (Sürücü Kontrollü) ve "Solo Coding Matches" (Otonom/Kodlama) olmak üzere iki farklı solo beceri mücadelesine katılır. Bir takımın genel sıralama puanı (Combined Score), etkinlikteki en yüksek Solo Driving skoru ile en yüksek Solo Coding skorunun toplamıdır. Eşitlik durumunda, en yüksek ikinci kodlama skoru gibi tie-breaker (eşitlik bozucu) kuralları uygulanır.'
        },

        empty: {
            title: 'Solo Sıralamaları Henüz Oluşmadı',
            description:
                '2026-2027 sezonuna ait bölgesel turnuvalar henüz tamamlanmadığı için güncel RECF Türkiye solo sıralama listesi boş durumdadır. Takımların resmi skorları, etkinlikler tamamlandıkça doğrudan RECFevents veritabanından çekilerek burada yayımlanacaktır.',
            button: "RECFevents'teki Sonuçları İncele"
        },

        tables: {
            combined:
                'Combined Solo Ranking (Genel Sıralama Tablosu)',
            combinedPlaceholder:
                'Birleşik Sıralama Tablosu Bekleniyor',

            driving: 'Solo Driving Scores',
            drivingPlaceholder:
                'Sürüş Skorları Tablosu',

            coding: 'Solo Coding Scores',
            codingPlaceholder:
                'Kodlama Skorları Tablosu'
        }
    },

    EN: {
        hero: {
            title: 'Solo Rankings',
            subtitle:
                'RECF Türkiye Solo Driving and Solo Coding performance rankings'
        },

        filters: {
            program: 'Select Program (Engage, Achieve...)',
            age: 'Age Category (U12, U15...)'
        },

        explanation: {
            title:
                'How Combined Solo Ranking Works',
            description:
                'At RECF events, teams participate in two different solo skills challenges: "Solo Driving Matches" and "Solo Coding Matches" (Autonomous/Coding). A team’s overall ranking score (Combined Score) is the sum of its highest Solo Driving score and highest Solo Coding score at the event. In case of a tie, tie-breaker rules such as the second-highest coding score may be applied.'
        },

        empty: {
            title: 'Solo Rankings Are Not Available Yet',
            description:
                'Since the regional tournaments for the 2026-2027 season have not yet been completed, the current RECF Türkiye solo ranking list is empty. Official team scores will be retrieved directly from the RECFevents database and published here as events are completed.',
            button: 'View Results on RECFevents'
        },

        tables: {
            combined:
                'Combined Solo Ranking (Overall Ranking Table)',
            combinedPlaceholder:
                'Combined Ranking Table Pending',

            driving: 'Solo Driving Scores',
            drivingPlaceholder:
                'Driving Scores Table',

            coding: 'Solo Coding Scores',
            codingPlaceholder:
                'Coding Scores Table'
        }
    }
} as const

export default function SoloSiralamalariPage() {
    const { language, setLanguage } = useLanguage()

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">

            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l =>
                        l === 'TR' ? 'EN' : 'TR'
                    )
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-12 bg-white min-h-[50vh]">

                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12 border-b border-gray-100 pb-8">

                        <div className="w-full md:w-64 relative">

                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                            <select
                                disabled
                                className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500"
                            >
                                <option>
                                    {t.filters.program}
                                </option>
                            </select>

                        </div>

                        <div className="w-full md:w-64 relative">

                            <select
                                disabled
                                className="w-full px-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-not-allowed text-gray-500"
                            >
                                <option>
                                    {t.filters.age}
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row gap-4 items-start">

                        <Calculator className="w-6 h-6 text-blue-600 shrink-0 mt-1" />

                        <div>

                            <h4 className="font-bold text-blue-900 mb-2">
                                {t.explanation.title}
                            </h4>

                            <p className="text-blue-800 text-sm leading-relaxed">
                                {t.explanation.description}
                            </p>

                        </div>

                    </div>

                    {/* Empty State */}
                    {soloRankings.length === 0 ? (

                        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-12 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden">

                            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2" />

                            <div className="relative z-10">

                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-inner">

                                    <AlertCircle className="w-10 h-10" />

                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {t.empty.title}
                                </h3>

                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {t.empty.description}
                                </p>

                                <a
                                    href="https://www.recfevents.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-6 rounded-xl shadow-lg shadow-orange-600/20 font-bold">

                                        {t.empty.button}

                                        <ExternalLink className="w-5 h-5 ml-2" />

                                    </Button>
                                </a>

                            </div>

                        </div>

                    ) : (

                        <div>
                            {/* Content will be mapped here */}
                        </div>

                    )}

                    {/* Structure UI Placeholders */}
                    <div className="opacity-40 pointer-events-none select-none">

                        {/* Combined Ranking */}
                        <div className="flex items-center gap-2 mb-6 mt-16">

                            <ShieldCheck className="w-6 h-6 text-gray-400" />

                            <h2 className="text-2xl font-bold text-gray-400">
                                {t.tables.combined}
                            </h2>

                        </div>

                        <div className="h-48 bg-gray-50 rounded-xl border border-gray-200 mb-10 border-dashed flex items-center justify-center text-gray-400">

                            {t.tables.combinedPlaceholder}

                        </div>

                        {/* Driving / Coding */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">

                            {/* Driving */}
                            <div>

                                <div className="flex items-center gap-2 mb-6">

                                    <Gamepad2 className="w-6 h-6 text-gray-400" />

                                    <h2 className="text-2xl font-bold text-gray-400">
                                        {t.tables.driving}
                                    </h2>

                                </div>

                                <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">

                                    {t.tables.drivingPlaceholder}

                                </div>

                            </div>

                            {/* Coding */}
                            <div>

                                <div className="flex items-center gap-2 mb-6">

                                    <Code2 className="w-6 h-6 text-gray-400" />

                                    <h2 className="text-2xl font-bold text-gray-400">
                                        {t.tables.coding}
                                    </h2>

                                </div>

                                <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">

                                    {t.tables.codingPlaceholder}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    )
}