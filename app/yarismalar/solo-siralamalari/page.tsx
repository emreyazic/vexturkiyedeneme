'use client'

import React, { useState } from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Filter, Trophy, ExternalLink, ShieldCheck, Calculator, AlertCircle, Gamepad2, Code2 } from 'lucide-react'

// Veri gelene kadar liste boş kalacak
const soloRankings: any[] = []

export default function SoloSiralamalariPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Solo Sıralamaları"
                subtitle="RECF Türkiye Solo Driving ve Solo Coding performans sıralamaları"
            />

            <section className="py-12 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12 border-b border-gray-100 pb-8">
                        <div className="w-full md:w-64 relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Program Seçin (Engage, Achieve...)</option>
                            </select>
                        </div>
                        <div className="w-full md:w-64 relative">
                            <select disabled className="w-full px-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-not-allowed text-gray-500">
                                <option>Yaş Kategorisi (U12, U15...)</option>
                            </select>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row gap-4 items-start">
                        <Calculator className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 mb-2">Combined Solo Ranking (Birleşik Solo Sıralaması) Mantığı</h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                                RECF etkinliklerinde takımlar, "Solo Driving Matches" (Sürücü Kontrollü) ve "Solo Coding Matches" (Otonom/Kodlama) olmak üzere iki farklı solo beceri mücadelesine katılır. 
                                Bir takımın genel sıralama puanı (Combined Score), etkinlikteki en yüksek Solo Driving skoru ile en yüksek Solo Coding skorunun toplamıdır. Eşitlik durumunda, en yüksek ikinci kodlama skoru gibi tie-breaker (eşitlik bozucu) kuralları uygulanır.
                            </p>
                        </div>
                    </div>

                    {/* Empty State / Not Published Yet */}
                    {soloRankings.length === 0 ? (
                        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-12 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-inner">
                                    <AlertCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Solo Sıralamaları Henüz Oluşmadı</h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    2026-2027 sezonuna ait bölgesel turnuvalar henüz tamamlanmadığı için güncel RECF Türkiye solo sıralama listesi boş durumdadır. Takımların resmi skorları, etkinlikler tamamlandıkça doğrudan RECFevents veritabanından çekilerek burada yayımlanacaktır.
                                </p>
                                <a href="https://www.recfevents.org/" target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-6 rounded-xl shadow-lg shadow-orange-600/20 font-bold">
                                        RECFevents'teki Sonuçları İncele
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
                    
                    {/* Structure UI Placeholders (Faded) */}
                    <div className="opacity-40 pointer-events-none select-none">
                        <div className="flex items-center gap-2 mb-6 mt-16">
                            <ShieldCheck className="w-6 h-6 text-gray-400" />
                            <h2 className="text-2xl font-bold text-gray-400">Combined Solo Ranking (Genel Sıralama Tablosu)</h2>
                        </div>
                        <div className="h-48 bg-gray-50 rounded-xl border border-gray-200 mb-10 border-dashed flex items-center justify-center text-gray-400">Birleşik Sıralama Tablosu Bekleniyor</div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Gamepad2 className="w-6 h-6 text-gray-400" />
                                    <h2 className="text-2xl font-bold text-gray-400">Solo Driving Scores</h2>
                                </div>
                                <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">Sürüş Skorları Tablosu</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Code2 className="w-6 h-6 text-gray-400" />
                                    <h2 className="text-2xl font-bold text-gray-400">Solo Coding Scores</h2>
                                </div>
                                <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">Kodlama Skorları Tablosu</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
