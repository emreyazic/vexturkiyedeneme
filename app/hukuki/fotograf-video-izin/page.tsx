'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'

export default function FotografVideoIzinPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Fotoğraf ve Video İzin Metni"
                subtitle="Etkinliklerde fotoğraf ve video çekimine ilişkin izin ve kullanım koşulları"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-4xl prose prose-gray">
                    <h2>Etkinlik Görüntü Kaydı Politikası</h2>
                    <p>
                        RECF Türkiye etkinliklerine (turnuvalar, atölyeler, tanıtım günleri vb.) katılan tüm katılımcılar, koçlar, mentorlar ve gönüllüler; etkinlik süresince fotoğraf ve video çekimi yapılabileceğini kabul ederler.
                    </p>

                    <h2>Kullanım Amaçları</h2>
                    <ul>
                        <li>RECF Türkiye ve Intechne Teknoloji resmi web sitesi, sosyal medya hesapları ve basılı materyallerinde kullanım</li>
                        <li>RECF küresel (recf.org) ve bölgesel platformlarda tanıtım amaçlı paylaşım</li>
                        <li>Eğitim ve bilgilendirme amaçlı içerik üretimi</li>
                    </ul>

                    <h2>Çocuk ve Genç Katılımcılar</h2>
                    <p>
                        18 yaşından küçük katılımcıların fotoğraf ve video kayıtları için veli/vasi izni aranır. Etkinlik kayıt formlarında yer alan ilgili onay kutusunun işaretlenmesi zorunludur.
                    </p>

                    <h2>İtiraz ve Silme Talepleri</h2>
                    <p>
                        Yayımlanan herhangi bir fotoğraf veya videonun kaldırılmasını talep etmek için <strong>info@recfturkiye.org</strong> adresine başvurabilirsiniz. Talepler 5 iş günü içerisinde değerlendirilir.
                    </p>

                    <p className="text-sm text-gray-500 mt-12 border-t pt-6">
                        Son güncelleme: Temmuz 2026 · Intechne Teknoloji Ticaret A.Ş.
                    </p>
                </div>
            </section>
        </div>
    )
}
