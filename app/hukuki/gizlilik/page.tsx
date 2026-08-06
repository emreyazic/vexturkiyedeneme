'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'

export default function GizlilikPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Gizlilik ve Çerez Politikası"
                subtitle="Kişisel verilerin korunması ve çerez kullanımına ilişkin politikamız"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-4xl prose prose-gray">
                    <h2>Gizlilik Politikası</h2>
                    <p>
                        Intechne Teknoloji (RECF Türkiye temsilcisi), kullanıcılarının gizliliğine saygı gösterir. Bu web sitesi üzerinden toplanan tüm kişisel veriler 6698 sayılı KVKK ve AB Genel Veri Koruma Tüzüğü (GDPR) ilkeleri doğrultusunda korunmaktadır.
                    </p>

                    <h2>Çerez (Cookie) Kullanımı</h2>
                    <p>
                        Bu web sitesinde oturum yönetimi, site performansının ölçülmesi ve kullanıcı deneyiminin iyileştirilmesi amacıyla çerezler kullanılmaktadır. Çerezler, tarayıcı ayarlarınız üzerinden yönetilebilir veya devre dışı bırakılabilir.
                    </p>

                    <h3>Kullanılan Çerez Türleri</h3>
                    <ul>
                        <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevleri için gerekli olan çerezlerdir.</li>
                        <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistikleri ve site performans ölçümü amacıyla kullanılır.</li>
                        <li><strong>Tercih Çerezleri:</strong> Dil seçimi gibi kullanıcı tercihlerinin hatırlanması için kullanılır.</li>
                    </ul>

                    <h2>Üçüncü Taraf Hizmetler</h2>
                    <p>
                        RECFevents.org ve certifications.vex.com gibi üçüncü taraf platformlara yönlendirme yapıldığında, ilgili platformların gizlilik politikaları geçerlidir.
                    </p>

                    <p className="text-sm text-gray-500 mt-12 border-t pt-6">
                        Son güncelleme: Temmuz 2026 · Intechne Teknoloji Ticaret A.Ş.
                    </p>
                </div>
            </section>
        </div>
    )
}
