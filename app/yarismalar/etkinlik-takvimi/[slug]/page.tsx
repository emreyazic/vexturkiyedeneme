'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowLeft, ExternalLink, MapPin } from 'lucide-react'

export default function EtkinlikDetayPage({ params }: { params: { slug: string } }) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    
    // Convert slug to a somewhat readable string if needed, or just use as ID
    const eventId = params.slug.replace(/-/g, ' ').toUpperCase()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

            <CorporateHero
                title={eventId}
                subtitle="RECF Türkiye Onaylı Etkinlik Detayı"
            />

            <section className="py-12 bg-white min-h-[50vh] flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-12">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-inner">
                            <CalendarDays className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Etkinlik Detayları Hazırlanıyor</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            <strong>{eventId}</strong> etkinliğine ait kayıt, lokasyon, ajanda ve kural güncellemeleri şu an RECFevents sistemine aktarılmaktadır. "Kayıt Açık" statüsüne geçtiğinde tüm detaylara ve resmi başvuru linkine bu sayfadan ulaşabileceksiniz.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/yarismalar/etkinlik-takvimi">
                                <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-6 text-lg rounded-xl shadow-lg shadow-primary/20">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Takvime Dön
                                </Button>
                            </Link>
                            <a href="https://www.recfevents.org/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="border-gray-300 text-gray-700 h-12 px-6 text-lg rounded-xl bg-white hover:bg-gray-50">
                                    RECFevents'e Git
                                    <ExternalLink className="w-5 h-5 ml-2 text-gray-400" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
