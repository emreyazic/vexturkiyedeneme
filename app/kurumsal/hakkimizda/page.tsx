'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
    Target, Eye, Globe2,
    Users,
    MapPin, ArrowRight, CheckCircle2, ExternalLink,
    Heart, ShieldCheck, Award, UserCheck,
    BookOpen, AlertCircle
} from 'lucide-react'

export default function HakkimizdaPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Geleceğin Mühendislik Ekosistemini Birlikte Kuruyoruz"
                subtitle="RECF Türkiye; öğrencileri, eğitimcileri, mentorları, gönüllüleri ve kurumları robotik, drone ve mühendislik yarışmaları etrafında buluşturan öğrenci merkezli bir teknoloji ekosistemidir."
            />

            {/* 1. RECF ve RECF Türkiye Nedir? */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* RECF */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Globe2 className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">RECF Hakkında</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Robotics Education & Competition Foundation (RECF), öğrencilerin bilim, teknoloji, mühendislik ve matematik alanlarına ilgisini artırmayı amaçlayan, kâr amacı gütmeyen uluslararası bir kuruluştur.
                            </p>
                            <br />
                            <p className="text-gray-600 leading-relaxed text-lg">
                                RECF programları; öğrencilerin teorik bilgilerini gerçek görevler, mühendislik projeleri ve takım temelli yarışma deneyimleriyle uygulamaya dönüştürmesini sağlar. Katılımcılar yalnızca teknik becerilerini değil; liderlik, iletişim, problem çözme ve proje yönetimi yetkinliklerini de geliştirir.
                            </p>
                        </div>

                        {/* RECF Türkiye */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">RECF Türkiye Hakkında</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                RECF Türkiye, RECF programlarının Türkiye’de yaygınlaştırılması, takımların desteklenmesi ve sürdürülebilir bir yarışma ekosisteminin oluşturulması için çalışır.
                            </p>
                            <br />
                            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                                Öğrencilerden eğitimcilere, gönüllülerden kurumlara kadar tüm paydaşları aynı hedef etrafında buluşturur. Amacı gençlerin teknoloji üreten, çözüm geliştiren ve sorumluluk alan bireyler olarak yetişmesine katkı sağlamaktır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Değerlerimiz */}
            <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">İlkelerimiz</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Değerlerimiz
                        </h2>
                        <p className="text-lg text-gray-600">
                            RECF Türkiye ekosistemini yönlendiren, paydaşlarımızla ilişkilerimizi ve çalışmalarımızı şekillendiren temel ilkelerimiz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 1. Tutku */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <Heart className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Tutku</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Merakı destekleyen, keşfetmenin heyecanını yaşatan ve yeni fırsatlar oluşturan programlarla gelecek nesillere ilham vermek için tutkuyla çalışıyoruz.
                            </p>
                        </div>

                        {/* 2. Dürüstlük */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Dürüstlük</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Dürüstlük, şeffaflık ve etik ilkelere bağlılık tüm çalışmalarımızın temelini oluşturur. Kararlarımızda adaleti, güveni ve sorumluluğu esas alırız.
                            </p>
                        </div>

                        {/* 3. Mükemmellik */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                                <Award className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mükemmellik</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Programlarımızı, etkinliklerimizi ve paydaş deneyimini sürekli geliştirerek yüksek kalite standartlarına ulaşmayı hedefleriz.
                            </p>
                        </div>

                        {/* 4. Öğrenci Merkezlilik */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <UserCheck className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Öğrenci Merkezlilik</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Öğrencilerin kendi fikirlerini geliştirmesini, kararlarını vermesini, sistemlerini üretmesini ve çalışmalarını kendi ifadeleriyle anlatmasını destekleriz.
                            </p>
                        </div>

                        {/* 5. Kapsayıcılık */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Kapsayıcılık</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Farklı geçmişlere, beceri seviyelerine ve deneyimlere sahip öğrencilerin kendilerini güvende ve değerli hissettikleri bir ekosistem oluştururuz.
                            </p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mt-20 border-t border-gray-200/60 pt-20">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm font-medium text-primary">Ekibimiz</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                RECF Türkiye Ekibi
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                RECF Türkiye ekibi; program yönetimi, takım desteği, etkinlik operasyonu, gönüllü koordinasyonu, eğitim, iletişim ve kurumsal işbirlikleri alanlarında çalışan profesyonellerden oluşur. Ekibimiz, takımların ilk kayıt adımından yarışma deneyimine kadar ihtiyaç duyduğu yönlendirme ve desteği sağlamak için birlikte çalışır.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {/* Card 1 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">Program Direktörü</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">Takım Desteği ve Operasyon</p>
                            </div>
                            {/* Card 2 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">Etkinlik Koordinatörü</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">Operasyon ve Gönüllü Yönetimi</p>
                            </div>
                            {/* Card 3 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">Eğitim ve Okul Destek Uzmanı</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">Eğitmen Eğitimleri ve Kaynaklar</p>
                            </div>
                            {/* Card 4 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">İletişim ve Partner İlişkileri</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">Kurumsal İşbirlikleri ve Sponsorluk</p>
                            </div>
                        </div>
                    </div>

                    {/* Committee Section */}
                    <div className="mt-20 border-t border-gray-200/60 pt-20">
                        <div className="grid lg:grid-cols-12 gap-12 items-start text-left">
                            {/* Left Column: Heading and Paragraphs */}
                            <div className="lg:col-span-5">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium text-primary">Danışma & İşbirliği</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Planlama Komitesi
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4 text-base">
                                    RECF Türkiye Planlama Komitesi; sezonun etkinlik takvimi, yarışma standartları, gönüllü yapısı, eğitim ihtiyaçları ve ekosistem gelişimi üzerine çalışan danışma ve koordinasyon grubudur.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                    Komite; eğitimciler, mentorlar, mühendisler, sektör profesyonelleri, etkinlik yöneticileri ve ilgili uzmanların katkısıyla çalışmalarını yürütür.
                                </p>

                                <Link href="/iletisim/form">
                                    <Button size="lg" className="bg-primary text-white font-semibold px-8 h-12 hover:bg-primary/90 shadow-lg shadow-primary/20">
                                        Planlama Komitesine Katıl
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Right Column: Working Areas Grid */}
                            <div className="lg:col-span-7">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">
                                    Planlama Komitesinin Çalışma Alanları
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Sezon ve etkinlik planlaması',
                                        'Yarışma operasyon standartları',
                                        'Eğitim ve mentor ihtiyaçları',
                                        'Gönüllü ve görevli gelişimi',
                                        'Takım deneyiminin iyileştirilmesi',
                                        'Bölgesel yaygınlaşma',
                                        'Kurumsal ve akademik işbirlikleri',
                                        'Güvenlik, etik ve kapsayıcılık'
                                    ].map((area, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800 leading-tight">{area}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Misyon & Yaklaşım */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm font-medium text-primary">Öğrenci Merkezli Vizyon</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        Geleceği Kodlayan Bir Ekosistem
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-12">
                        Amacımız sadece yarışmak değil; öğrencilerin mühendislik disiplinini uygulamalı öğrenmesi, takım çalışması yapması, problem çözme yetisi geliştirmesi ve geleceğin teknoloji liderleri olarak yetişmesidir. Robotik sadece bir amaç değil, yetenekli ve özgüvenli bireyler yetiştirmek için kullandığımız güçlü bir araçtır.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/programlar">
                            <Button size="lg" className="bg-primary text-white font-semibold px-8 h-12">
                                RECF Programlarını İncele
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/iletisim/form">
                            <Button size="lg" variant="outline" className="border-gray-300 font-semibold px-8 h-12">
                                Bize Ulaşın
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. Intechne Teknoloji Hakkında */}
            <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-sm font-medium text-blue-600">Resmi Temsilci & Operasyon</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Intechne Teknoloji Hakkında
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
                        Intechne Teknoloji; robotik yarışmalar, teknoloji eğitimleri, etkinlik sistemleri ve genç yetenek gelişimi alanlarında faaliyet gösteren bir teknoloji şirketidir.
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                        RECF’in, Türkiye koordinasyon ve operasyon çalışmaları Intechne Teknoloji tarafından yürütülür. Intechne; takım desteği, etkinlik planlama, gönüllü koordinasyonu, eğitim, iletişim ve ekosistem geliştirme süreçlerine katkı sağlar.
                    </p>

                    <a href="https://intechne.com.tr" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 shadow-lg shadow-blue-600/20">
                            Intechne’yi Tanıyın
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
