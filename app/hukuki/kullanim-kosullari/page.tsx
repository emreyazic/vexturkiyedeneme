'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'

export default function KullanimKosullariPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Kullanım Koşulları"
                subtitle="Web sitesi kullanım koşulları ve sorumluluk sınırlamaları"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-4xl prose prose-gray">
                    <h2>Genel Koşullar</h2>
                    <p>
                        Bu web sitesi Intechne Teknoloji Ticaret A.Ş. tarafından RECF Türkiye programları kapsamında bilgilendirme amacıyla yayınlanmaktadır. Siteye erişim ve kullanım, aşağıdaki koşulların kabul edildiği anlamına gelir.
                    </p>

                    <h2>İçerik ve Doğruluk</h2>
                    <p>
                        Site içeriklerinde yer alan program bilgileri, yarışma kuralları ve sezon detayları bilgilendirme amaçlıdır. Resmi ve bağlayıcı kurallar için her zaman RECF'nin İngilizce resmi belgeleri (Game Manual, Judges Guide vb.) geçerlidir. Çeviri farklılıklarında İngilizce orijinal metin esas alınır.
                    </p>

                    <h2>Fikri Mülkiyet</h2>
                    <p>
                        Bu web sitesindeki metin, grafik ve tasarım öğeleri Intechne Teknoloji'ye aittir. "RECF", "VEX", "VEX Robotics" ve ilgili tescilli markalar, ilgili sahiplerinin mülkiyetindedir ve izinsiz ticari kullanılamaz.
                    </p>

                    <h2>Dış Bağlantılar (External Links)</h2>
                    <p>
                        Bu siteden üçüncü taraf web sitelerine (RECFevents.org, recf.org, vex.com vb.) yönlendirmeler bulunmaktadır. Intechne Teknoloji, bu sitelerin içeriklerinden sorumlu değildir.
                    </p>

                    <p className="text-sm text-gray-500 mt-12 border-t pt-6">
                        Son güncelleme: Temmuz 2026 · Intechne Teknoloji Ticaret A.Ş.
                    </p>
                </div>
            </section>
        </div>
    )
}
