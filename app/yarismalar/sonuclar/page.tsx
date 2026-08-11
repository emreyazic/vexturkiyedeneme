'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Filter,
    Trophy,
    ExternalLink,
    Activity,
    Medal,
    ShieldCheck
} from 'lucide-react'

// Veri gelene kadar liste boş kalacak
const resultsData: any[] = []

const content = {
    TR: {
        hero: {
            title: 'RECF Türkiye Sonuçları',
            subtitle: 'Onaylı RECF Türkiye etkinlik sonuçları'
        },

        filters: {
            program: 'Program Seçin',
            event: 'Etkinlik Seçin'
        },

        empty: {
            title: 'Henüz Sonuç Yayımlanmadı',
            description:
                '2026-2027 RECF sezonuna ait (Alliance Match, Solo Driving ve Solo Coding) etkinlik sonuçları, resmi bölgesel turnuvalar tamamlandıktan ve sonuçlar RECFevents üzerinden doğrulandıktan sonra bu ekranda yayımlanacaktır.',
            button: 'RECFevents Canlı Sonuçlara Git'
        },

        placeholders: {
            alliance: 'Alliance Match Sonuçları',
            driving: 'Solo Driving (Sürüş)',
            coding: 'Solo Coding (Kodlama)',
            final: 'Final Sıralaması ve Ödüller',
            waiting: 'Veri Bekleniyor'
        }
    },

    EN: {
        hero: {
            title: 'RECF Türkiye Results',
            subtitle: 'Approved RECF Türkiye event results'
        },

        filters: {
            program: 'Select Program',
            event: 'Select Event'
        },

        empty: {
            title: 'No Results Published Yet',
            description:
                'Results for the 2026-2027 RECF season (Alliance Match, Solo Driving, and Solo Coding) will be published here after the official regional tournaments are completed and the results are verified through RECFevents.',
            button: 'View Live Results on RECFevents'
        },

        placeholders: {
            alliance: 'Alliance Match Results',
            driving: 'Solo Driving',
            coding: 'Solo Coding',
            final: 'Final Rankings and Awards',
            waiting: 'Data Pending'
        }
    }
} as const

export default function SonuclarPage() {
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

                        <div className="w-full md:flex-1 relative">

                            <select
                                disabled
                                className="w-full px-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-not-allowed text-gray-500"
                            >
                                <option>
                                    {t.filters.event}
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Empty State */}
                    {resultsData.length === 0 ? (

                        <div className="bg-green-50/50 border border-green-100 rounded-3xl p-12 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden">

                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2" />

                            <div className="relative z-10">

                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-inner">

                                    <Trophy className="w-10 h-10" />

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
                                    <Button className="bg-green-600 hover:bg-green-700 text-white h-12 px-6 rounded-xl shadow-lg shadow-green-600/20 font-bold">

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

                        {/* Alliance Match */}
                        <div className="flex items-center gap-2 mb-6 mt-16">

                            <ShieldCheck className="w-6 h-6 text-gray-400" />

                            <h2 className="text-2xl font-bold text-gray-400">
                                {t.placeholders.alliance}
                            </h2>

                        </div>

                        <div className="h-24 bg-gray-50 rounded-xl border border-gray-200 mb-10 border-dashed flex items-center justify-center text-gray-400">

                            {t.placeholders.waiting}

                        </div>

                        {/* Solo Results */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">

                            {/* Solo Driving */}
                            <div>

                                <div className="flex items-center gap-2 mb-6">

                                    <Activity className="w-6 h-6 text-gray-400" />

                                    <h2 className="text-2xl font-bold text-gray-400">
                                        {t.placeholders.driving}
                                    </h2>

                                </div>

                                <div className="h-24 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">

                                    {t.placeholders.waiting}

                                </div>

                            </div>

                            {/* Solo Coding */}
                            <div>

                                <div className="flex items-center gap-2 mb-6">

                                    <Activity className="w-6 h-6 text-gray-400" />

                                    <h2 className="text-2xl font-bold text-gray-400">
                                        {t.placeholders.coding}
                                    </h2>

                                </div>

                                <div className="h-24 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">

                                    {t.placeholders.waiting}

                                </div>

                            </div>

                        </div>

                        {/* Final Ranking */}
                        <div className="flex items-center gap-2 mb-6 mt-16">

                            <Medal className="w-6 h-6 text-gray-400" />

                            <h2 className="text-2xl font-bold text-gray-400">
                                {t.placeholders.final}
                            </h2>

                        </div>

                        <div className="h-48 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">

                            {t.placeholders.waiting}

                        </div>

                    </div>

                </div>

            </section>

        </div>
    )
}