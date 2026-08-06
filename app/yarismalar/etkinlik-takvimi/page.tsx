'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Filter, Calendar, ExternalLink, CalendarDays, Clock, Users, ArrowRight, ShieldAlert } from 'lucide-react'

// Veritabanı hazır olana kadar ve sezon planlaması bitene kadar liste boş tutulur.
const upcomingEvents: any[] = []
const pastEvents: any[] = []

export default function EtkinlikTakvimiPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Türkiye Etkinlik Takvimi"
                subtitle="RECF Türkiye onaylı etkinlikleri: Yaklaşan RECF Engage, Achieve, Inspire ve drone etkinlikleri"
            />

            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Filters Placeholder - disabled since no data */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input 
                                placeholder="Etkinlik Adı Ara..." 
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-xl text-lg"
                                disabled
                            />
                        </div>
                        <div className="w-full md:w-48 relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Program</option>
                            </select>
                        </div>
                        <div className="w-full md:w-48 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Şehir</option>
                            </select>
                        </div>
                        <div className="w-full md:w-48 relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Tarih</option>
                            </select>
                        </div>
                    </div>

                    {/* Upcoming Events Section (Empty State) */}
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Yaklaşan Etkinlikler</h2>
                            <span className="text-sm font-medium text-gray-500">Kayıtlar yakında RECFevents'te</span>
                        </div>
                        
                        {upcomingEvents.length === 0 ? (
                            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-12 text-center max-w-4xl mx-auto">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-inner">
                                    <CalendarDays className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">2026-2027 Sezon Planlaması Devam Ediyor</h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Yaklaşan RECF Engage, Achieve, Inspire ve Aerial Drone Competition (ADC) bölgesel ve ulusal turnuvaları şu an planlama aşamasındadır. Etkinlikler onaylandığında burada listelenecek ve takım kayıtları doğrudan <strong>RECFevents.org</strong> sistemi üzerinden (Kayıt Açık / Kayıt Kapalı durumlarına göre) yapılacaktır.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Event cards will map here */}
                            </div>
                        )}
                    </div>

                    {/* Past Events Archive */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                            <Clock className="w-6 h-6 text-gray-400" />
                            <h2 className="text-2xl font-bold text-gray-900">Geçmiş Etkinlik Arşivi</h2>
                        </div>
                        
                        {pastEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Arşivlenecek geçmiş etkinlik bulunmamaktadır.</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Past event cards will map here */}
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    )
}
