'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'

export default function KVKKPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

            <CorporateHero
                title="KVKK Aydınlatma Metni"
                subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-4xl prose prose-gray">
                    <h2>Veri Sorumlusu</h2>
                    <p>
                        RECF Türkiye programları kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Intechne Teknoloji Ticaret A.Ş.</strong> tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat çerçevesinde işlenmektedir.
                    </p>

                    <h2>Kişisel Verilerin İşlenme Amacı</h2>
                    <ul>
                        <li>Takım kaydı, etkinlik başvurusu ve gönüllülük süreçlerinin yürütülmesi</li>
                        <li>İletişim formları aracılığıyla gelen taleplerin değerlendirilmesi ve yanıtlanması</li>
                        <li>RECF programları kapsamında bilgilendirme ve duyuru yapılması</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    </ul>

                    <h2>Kişisel Verilerin Aktarımı</h2>
                    <p>
                        Toplanan kişisel veriler; yasal zorunluluklar ve RECF'nin küresel kayıt sistemi (RECFevents) kapsamında, Robotics Education & Competition Foundation (ABD) ile paylaşılabilir. Bu aktarım yalnızca takım kaydı ve etkinlik yönetimi süreçleri için gerekli olan minimum veri ile sınırlıdır.
                    </p>

                    <h2>Haklarınız</h2>
                    <p>
                        KVKK'nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve itiraz etme haklarınız bulunmaktadır. Başvurularınızı <strong>info@recfturkiye.org</strong> adresine iletebilirsiniz.
                    </p>

                    <p className="text-sm text-gray-500 mt-12 border-t pt-6">
                        Son güncelleme: Temmuz 2026 · Intechne Teknoloji Ticaret A.Ş.
                    </p>
                </div>
            </section>
        </div>
    )
}
