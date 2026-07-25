'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Instagram,
    ArrowRight,
    Sparkles,
    Puzzle,
    Bot,
    Gamepad2,
    Cpu,
    Factory,
    MapPin,
    Phone
} from 'lucide-react'

const recfPrograms = [
    {
        id: 'engage',
        name: 'RECF Engage',
        ageLevel: 'İlkokul (4-7 Yaş)',
        focusArea: 'Temel Kodlama ve Robotik Farkındalığı',
        structure: 'Görev Odaklı Sınıf Etkinlikleri',
        color: '#00A651',
        icon: Sparkles,
        description: 'Öğrencileri robotik ve mühendislikle tanıştıran temel düzey eğitim.'
    },
    {
        id: 'achieve',
        name: 'RECF Achieve',
        ageLevel: 'Ortaokul (8-14 Yaş)',
        focusArea: 'Takım Çalışması ve Mekanik Tasarım',
        structure: 'Yerel ve Ulusal Turnuvalar',
        color: '#F7941D',
        icon: Puzzle,
        description: 'Ortaokul öğrencilerinin mühendislik ve takım çalışması becerilerini geliştiren yarışmalar.'
    },
    {
        id: 'inspire',
        name: 'RECF Inspire',
        ageLevel: 'Lise (14-18 Yaş)',
        focusArea: 'İleri Seviye Mühendislik ve Programlama',
        structure: 'Küresel Çaplı Rekabetçi Lig',
        color: '#E31837',
        icon: Bot,
        description: 'Lise düzeyinde profesyonel metal robot yapımı ve karmaşık algoritmik görevler.'
    },
    {
        id: 'adc',
        name: 'Aerial Drone Competition (ADC)',
        ageLevel: 'Ortaokul ve Lise',
        focusArea: 'Havacılık, Uçuş Dinamikleri ve Kodlama',
        structure: 'Görev ve Uçuş Odaklı Turnuvalar',
        color: '#00AEEF',
        icon: Gamepad2,
        description: 'Drone teknolojisi ve programlamayı birleştiren yenilikçi uçuş yarışmaları.'
    },
    {
        id: 'adc-pro',
        name: 'ADC Pro',
        ageLevel: 'Üniversite',
        focusArea: 'Otonom Sistemler ve İleri Havacılık',
        structure: 'Otonom Uçuş ve Proje Odaklı',
        color: '#6B21A8',
        icon: Cpu,
        description: 'Üniversite öğrencilerine yönelik yapay zeka ve tamamen otonom drone görevleri.'
    },
    {
        id: 'online-challenges',
        name: 'Online Challenges',
        ageLevel: 'Tüm Seviyeler',
        focusArea: 'Tasarım, Medya, CAD ve Mühendislik',
        structure: 'Çevrimiçi Gönderim ve Değerlendirme',
        color: '#1E3A8A',
        icon: Factory,
        description: 'Fiziksel robot tasarlamanın ötesinde sanal ortamda ve teorik alanda yarışma fırsatı.'
    }
]

export default function RecfProgramsPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedFilter, setSelectedFilter] = useState<string>('Tümü')

    const filters = ['Tümü', 'İlkokul (4-7 Yaş)', 'Ortaokul (8-14 Yaş)', 'Lise (14-18 Yaş)', 'Ortaokul ve Lise', 'Üniversite', 'Tüm Seviyeler']

    const filteredPrograms = selectedFilter === 'Tümü' 
        ? recfPrograms 
        : recfPrograms.filter(p => p.ageLevel.includes(selectedFilter))

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="RECF Programları"
                subtitle="Yaşınıza, eğitim seviyenize ve teknoloji ilgi alanınıza uygun RECF programını keşfedin."
            />

            {/* Program Seçici (Filter/Selector) */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Seviyenize Uygun Programı Bulun</h2>
                        <p className="text-gray-600">İlgilendiğiniz eğitim seviyesini seçerek size uygun programları görüntüleyin</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    selectedFilter === filter
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Cards Grid */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.map((program, index) => {
                            const Icon = program.icon
                            return (
                                <motion.div
                                    key={program.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Color bar */}
                                    <div className="h-2 w-full" style={{ backgroundColor: program.color }} />

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-start justify-between mb-6">
                                            <div
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${program.color}15` }}
                                            >
                                                <Icon className="w-8 h-8" style={{ color: program.color }} />
                                            </div>
                                            <span
                                                className="px-4 py-2 rounded-full text-xs font-bold"
                                                style={{ backgroundColor: `${program.color}15`, color: program.color }}
                                            >
                                                {program.ageLevel}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{program.name}</h3>
                                        <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">{program.description}</p>

                                        <div className="space-y-4 mb-8">
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ana Odak Alanı</div>
                                                <div className="text-sm font-medium text-gray-800">{program.focusArea}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Yarışma Yapısı</div>
                                                <div className="text-sm font-medium text-gray-800">{program.structure}</div>
                                            </div>
                                        </div>

                                        <Link href={`/vex-nedir/${program.id}`} className="mt-auto block">
                                            <Button
                                                variant="outline"
                                                className="w-full border-gray-300 text-gray-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                            >
                                                Detayları İncele
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-[#0f172a] border-t border-gray-800 text-gray-300">
                <div className="container mx-auto px-6 max-w-7xl py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Column 1 - Brand Identity */}
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="text-2xl font-black tracking-tight text-white flex flex-col">
                                    <span>RECF TÜRKİYE</span>
                                    <span className="text-xs font-normal text-gray-400">Temsilci: Intechne Teknoloji</span>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                                RECF Türkiye: Robotics Education & Competition Foundation resmi platformu. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji.
                            </p>
                            <a
                                href="https://instagram.com/vexroboticsturkiye"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-red-400 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6" />
                                <span className="text-sm font-medium">@vexroboticsturkiye</span>
                            </a>
                        </div>

                        {/* Column 2 - VEX Ecosystem */}
                        <div>
                            <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">VEX NEDİR?</h3>
                            <ul className="space-y-3 text-sm">

                                <li>
                                    <Link href="/vex-nedir/vex-iq" className="hover:text-primary transition-colors">RECF Engage</Link>
                                </li>
                                <li>
                                    <Link href="/vex-nedir/vex-v5" className="hover:text-primary transition-colors">RECF Achieve</Link>
                                </li>
                                <li>
                                    <Link href="/vex-nedir/vex-u" className="hover:text-primary transition-colors">RECF Inspire</Link>
                                </li>
                                <li>
                                    <Link href="/yarismalar/sonuclar" className="hover:text-primary transition-colors">RECF Türkiye Sonuçları</Link>
                                </li>
                                <li>
                                    <Link href="/kaynaklar/yazilim" className="hover:text-primary transition-colors">Programlama ve Yazılım Kaynakları</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Participation */}
                        <div>
                            <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">KATILIM</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/yarismalar/etkinlik-takvimi" className="hover:text-primary transition-colors">RECF Türkiye Etkinlik Takvimi</Link>
                                </li>
                                <li>
                                    <Link href="/yarismalar/sezon-temasi" className="hover:text-primary transition-colors">2026–2027 RECF Sezon Oyunları</Link>
                                </li>
                                <li>
                                    <Link href="/takimlar/nasil-kurulur" className="hover:text-primary transition-colors">RECF Takımı Nasıl Kurulur?</Link>
                                </li>
                                <li>
                                    <Link href="/takimlar/kayit" className="hover:text-primary transition-colors">RECF Takım Kaydı</Link>
                                </li>
                                <li>
                                    <Link href="/takimlar/mentor" className="hover:text-primary transition-colors">Koç ve Mentor Merkezi</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Contact */}
                        <div>
                            <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">BİZE ULAŞIN</h3>
                            <ul className="space-y-3 text-sm mb-6">
                                <li>
                                    <Link href="/kurumsal/hakkimizda" className="hover:text-primary transition-colors">RECF Türkiye Hakkında</Link>
                                </li>
                                <li>
                                    <Link href="/kurumsal/sponsorlar-ve-partnerler" className="hover:text-primary transition-colors">İş Birlikleri ve Destekleyen Kurumlar</Link>
                                </li>
                                <li>
                                    <Link href="/kurumsal/gonullu-olun" className="hover:text-primary transition-colors">RECF Türkiye Gönüllülük</Link>
                                </li>
                            </ul>
                            <div className="space-y-4 text-sm pt-4 border-t border-gray-800">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Ünalan, Ünalan Cd., 34500 Üsküdar/İstanbul</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-primary shrink-0" />
                                    <a href="tel:+905346349058" className="text-gray-400 hover:text-white transition-colors">
                                        +90 534 634 90 58
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Bar */}
                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                        <p>© 2026 RECF Türkiye. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji. Tüm Hakları Saklıdır.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-primary transition-colors">Kullanım Koşulları</Link>
                            <Link href="#" className="hover:text-primary transition-colors">KVKK</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
