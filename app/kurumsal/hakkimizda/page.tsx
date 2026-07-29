'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
    Target, Eye, Globe2,
    Users, Cpu,
    MapPin, ArrowRight, BookOpen, AlertCircle
} from 'lucide-react'

export default function HakkimizdaPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="RECF Türkiye Hakkında"
                subtitle="RECF Türkiye, Robotics Education & Competition Foundation’ın robotik, drone, eğitim ve iş gücü gelişimi programlarını Türkiye’de öğrenciler, okullar, üniversiteler ve teknoloji kurumlarıyla buluşturan yerel ekosistemdir."
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
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">RECF Nedir?</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Robotics Education & Competition (REC) Foundation, dünya çapında öğrencilerin robotik ve teknolojiye olan ilgilerini artırmayı hedefleyen köklü bir eğitim vakfıdır. RECF, öğrencilere mühendislik süreçlerini pratik bir şekilde uygulayabilecekleri yarışmalar ve STEM odaklı öğrenim materyalleri sunar. 
                            </p>
                        </div>

                        {/* RECF Türkiye */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">RECF Türkiye Nedir?</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                RECF Türkiye, dünya genelindeki RECF programlarının yerel ayağı olarak Türkiye'deki okullar, takımlar ve teknoloji kurumlarıyla bağlantı kurar. Türkiye'deki takımları RECF etkinlikleri, eğitim kaynakları ve güncel yeterlilik yolu ile buluşturarak küresel vizyona ulaşmalarını sağlar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Intechne Teknoloji Rolü & RECF vs VEX */}
            <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm font-medium text-primary">Yerel Operasyon</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Türkiye Temsilcisi: Intechne Teknoloji
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Türkiye'deki tüm organizasyon, turnuva yönetimi ve eğitim operasyonları resmi ve yetkili temsilci olan <strong>Intechne Teknoloji</strong> tarafından yürütülmektedir. Intechne Teknoloji, RECF ekosisteminin Türkiye’deki güvenli, standartlara uygun ve sürdürülebilir bir şekilde büyümesini sağlar.
                            </p>

                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-orange-500" />
                                <div className="flex gap-4 items-start">
                                    <div className="bg-orange-100 p-3 rounded-full shrink-0">
                                        <AlertCircle className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-2">RECF ve VEX Arasındaki Fark Nedir?</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            <strong>VEX Robotics</strong>, eğitimsel robot kitleri ve donanımlar üreten, donanım odaklı ticari bir şirkettir. <strong>RECF (Robotics Education & Competition Foundation)</strong> ise eğitim odaklı yarışmalar düzenleyen ve STEM programlarını yöneten sivil bir kuruluştur. RECF, turnuvalarında eğitim aracı olarak çoğunlukla VEX Robotics kitlerini kullanır, ancak bu iki yapı operasyonel olarak birbirinden tamamen bağımsızdır.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <Cpu className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Donanım Ekosistemi</h3>
                                <p className="text-sm text-gray-600">VEX Robotics gibi onaylı STEM eğitim materyalleri ve laboratuvar çözümleri sağlanır.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm translate-y-0 sm:translate-y-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Eğitim ve Müfredat</h3>
                                <p className="text-sm text-gray-600">Dünya standartlarındaki STEM müfredatları, öğretmen eğitimleri ve yarışma kılavuzları Türkçe olarak sunulur.</p>
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
                        <Link href="/recf-programlari">
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

            <Footer />
        </div>
    )
}
