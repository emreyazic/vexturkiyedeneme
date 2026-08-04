'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
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
        id: 'recf-engage',
        name: 'RECF Engage',
        ageLevel: 'İlkokul (4-7 Yaş)',
        focusArea: 'Temel Kodlama ve Robotik Farkındalığı',
        structure: 'Görev Odaklı Sınıf Etkinlikleri',
        color: '#00A651',
        icon: Sparkles,
        description: 'Öğrencileri robotik ve mühendislikle tanıştıran temel düzey eğitim.'
    },
    {
        id: 'recf-achieve',
        name: 'RECF Achieve',
        ageLevel: 'Ortaokul (8-14 Yaş)',
        focusArea: 'Takım Çalışması ve Mekanik Tasarım',
        structure: 'Yerel ve Ulusal Turnuvalar',
        color: '#F7941D',
        icon: Puzzle,
        description: 'Ortaokul öğrencilerinin mühendislik ve takım çalışması becerilerini geliştiren yarışmalar.'
    },
    {
        id: 'recf-inspire',
        name: 'RECF Inspire',
        ageLevel: 'Lise (14-18 Yaş)',
        focusArea: 'İleri Seviye Mühendislik ve Programlama',
        structure: 'Küresel Çaplı Rekabetçi Lig',
        color: '#E31837',
        icon: Bot,
        description: 'Lise düzeyinde profesyonel metal robot yapımı ve karmaşık algoritmik görevler.'
    },
    {
        id: 'aerial-drone-competition',
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
    const { language, setLanguage } = useLanguage()
    const [selectedFilter, setSelectedFilter] = useState<string>('Tümü')

    const filters = ['Tümü', 'İlkokul (4-7 Yaş)', 'Ortaokul (8-14 Yaş)', 'Lise (14-18 Yaş)', 'Ortaokul ve Lise', 'Üniversite', 'Tüm Seviyeler']

    const filteredPrograms = selectedFilter === 'Tümü' 
        ? recfPrograms 
        : recfPrograms.filter(p => p.ageLevel.includes(selectedFilter))

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

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

                                        <Link href={`/programlar/${program.id}`} className="mt-auto block">
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

            <Footer />
        </div>
    )
}