'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { ShieldCheck, ArrowLeft, Database, UserX } from 'lucide-react'

export default function TakimDetayPage({ params }: { params: { slug: string } }) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const teamId = params.slug.toUpperCase()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

            <CorporateHero
                title={`Takım: ${teamId}`}
                subtitle="RECF Türkiye Takım Profili"
            />

            <section className="py-12 bg-white min-h-[50vh] flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-12">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Profil Güncelleniyor</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Aradığınız <strong>{teamId}</strong> numaralı takımın profili şu an RECFevents sistemiyle senkronizasyon ve kişisel veri (KVKK) onay sürecindedir. Sadece açık onay vermiş doğrulanmış takımların detayları (Takım Numarası, Adı, Program, Şehir, Kurum, Sosyal Medya ve Başarılar) bu sayfada görüntülenebilecektir.
                        </p>
                        
                        <Link href="/takimlar/tum-takimlar">
                            <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-6 text-lg rounded-xl shadow-lg shadow-primary/20">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Takım Dizinine Dön
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
