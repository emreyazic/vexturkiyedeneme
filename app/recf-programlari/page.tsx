'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    ArrowRight,
    Sparkles,
    Puzzle,
    Bot,
    Gamepad2,
    Cpu,
    Factory
} from 'lucide-react'

type Language = 'TR' | 'EN'

const recfPrograms = [
    {
        id: 'engage',
        name: 'RECF Engage',
        ageLevel: {
            TR: 'İlkokul (4-7 Yaş)',
            EN: 'Elementary (Ages 4-7)'
        },
        focusArea: {
            TR: 'Temel Kodlama ve Robotik Farkındalığı',
            EN: 'Basic Coding & Robotics Awareness'
        },
        structure: {
            TR: 'Görev Odaklı Sınıf Etkinlikleri',
            EN: 'Task-Oriented Classroom Activities'
        },
        color: '#00A651',
        icon: Sparkles,
        description: {
            TR: 'Öğrencileri robotik ve mühendislikle tanıştıran temel düzey eğitim.',
            EN: 'Foundational training introducing students to robotics and engineering.'
        }
    },
    {
        id: 'achieve',
        name: 'RECF Achieve',
        ageLevel: {
            TR: 'Ortaokul (8-14 Yaş)',
            EN: 'Middle School (Ages 8-14)'
        },
        focusArea: {
            TR: 'Takım Çalışması ve Mekanik Tasarım',
            EN: 'Teamwork & Mechanical Design'
        },
        structure: {
            TR: 'Yerel ve Ulusal Turnuvalar',
            EN: 'Local & National Tournaments'
        },
        color: '#F7941D',
        icon: Puzzle,
        description: {
            TR: 'Ortaokul öğrencilerinin mühendislik ve takım çalışması becerilerini geliştiren yarışmalar.',
            EN: 'Competitions developing engineering and teamwork skills for middle school students.'
        }
    },
    {
        id: 'inspire',
        name: 'RECF Inspire',
        ageLevel: {
            TR: 'Lise (14-18 Yaş)',
            EN: 'High School (Ages 14-18)'
        },
        focusArea: {
            TR: 'İleri Seviye Mühendislik ve Programlama',
            EN: 'Advanced Engineering & Programming'
        },
        structure: {
            TR: 'Küresel Çaplı Rekabetçi Lig',
            EN: 'Global Competitive League'
        },
        color: '#E31837',
        icon: Bot,
        description: {
            TR: 'Lise düzeyinde profesyonel metal robot yapımı ve karmaşık algoritmik görevler.',
            EN: 'High school level professional metal robotics and complex algorithmic challenges.'
        }
    },
    {
        id: 'adc',
        name: 'Aerial Drone Competition (ADC)',
        ageLevel: {
            TR: 'Ortaokul ve Lise',
            EN: 'Middle & High School'
        },
        focusArea: {
            TR: 'Havacılık, Uçuş Dinamikleri ve Kodlama',
            EN: 'Aeronautics, Flight Dynamics & Coding'
        },
        structure: {
            TR: 'Görev ve Uçuş Odaklı Turnuvalar',
            EN: 'Mission & Flight-Oriented Tournaments'
        },
        color: '#00AEEF',
        icon: Gamepad2,
        description: {
            TR: 'Drone teknolojisi ve programlamayı birleştiren yenilikçi uçuş yarışmaları.',
            EN: 'Innovative flight competitions combining drone technology and programming.'
        }
    },
    {
        id: 'adc-pro',
        name: 'ADC Pro',
        ageLevel: {
            TR: 'Üniversite',
            EN: 'University'
        },
        focusArea: {
            TR: 'Otonom Sistemler ve İleri Havacılık',
            EN: 'Autonomous Systems & Advanced Aeronautics'
        },
        structure: {
            TR: 'Otonom Uçuş ve Proje Odaklı',
            EN: 'Autonomous Flight & Project-Based'
        },
        color: '#6B21A8',
        icon: Cpu,
        description: {
            TR: 'Üniversite öğrencilerine yönelik yapay zeka ve tamamen otonom drone görevleri.',
            EN: 'AI and fully autonomous drone missions designed for university students.'
        }
    },
    {
        id: 'online-challenges',
        name: 'Online Challenges',
        ageLevel: {
            TR: 'Tüm Seviyeler',
            EN: 'All Levels'
        },
        focusArea: {
            TR: 'Tasarım, Medya, CAD ve Mühendislik',
            EN: 'Design, Media, CAD & Engineering'
        },
        structure: {
            TR: 'Çevrimiçi Gönderim ve Değerlendirme',
            EN: 'Online Submissions & Evaluation'
        },
        color: '#1E3A8A',
        icon: Factory,
        description: {
            TR: 'Fiziksel robot tasarlamanın ötesinde sanal ortamda ve teorik alanda yarışma fırsatı.',
            EN: 'Opportunities to compete virtually and theoretically beyond physical robot building.'
        }
    }
]

const filterOptions = [
    { id: 'all', label: { TR: 'Tümü', EN: 'All' }, matchId: null },
    { id: 'ilkokul', label: { TR: 'İlkokul (4-7 Yaş)', EN: 'Elementary (Ages 4-7)' }, matchId: 'engage' },
    { id: 'ortaokul', label: { TR: 'Ortaokul (8-14 Yaş)', EN: 'Middle School (Ages 8-14)' }, matchId: 'achieve' },
    { id: 'lise', label: { TR: 'Lise (14-18 Yaş)', EN: 'High School (Ages 14-18)' }, matchId: 'inspire' },
    { id: 'ortaokul-lise', label: { TR: 'Ortaokul ve Lise', EN: 'Middle & High School' }, matchId: 'adc' },
    { id: 'universite', label: { TR: 'Üniversite', EN: 'University' }, matchId: 'adc-pro' },
    { id: 'tum-seviyeler', label: { TR: 'Tüm Seviyeler', EN: 'All Levels' }, matchId: 'online-challenges' }
]

const translations = {
    TR: {
        heroTitle: 'RECF Programları',
        heroSubtitle: 'Yaşınıza, eğitim seviyenize ve teknoloji ilgi alanınıza uygun RECF programını keşfedin.',
        filterTitle: 'Seviyenize Uygun Programı Bulun',
        filterSubtitle: 'İlgilendiğiniz eğitim seviyesini seçerek size uygun programları görüntüleyin',
        focusAreaLabel: 'Ana Odak Alanı',
        structureLabel: 'Yarışma Yapısı',
        detailsBtn: 'Detayları İncele'
    },
    EN: {
        heroTitle: 'RECF Programs',
        heroSubtitle: 'Discover the RECF program suited to your age, education level, and technology interests.',
        filterTitle: 'Find the Right Program for Your Level',
        filterSubtitle: 'Select your target education level to view matching programs',
        focusAreaLabel: 'Primary Focus Area',
        structureLabel: 'Competition Structure',
        detailsBtn: 'View Details'
    }
}

export default function RecfProgramsPage() {
    const [language, setLanguage] = useState<Language>('TR')
    const [selectedFilterId, setSelectedFilterId] = useState<string>('all')

    const t = translations[language]

    const selectedFilterOption = filterOptions.find(f => f.id === selectedFilterId)
    const filteredPrograms = selectedFilterId === 'all'
        ? recfPrograms
        : recfPrograms.filter(p => p.id === selectedFilterOption?.matchId)

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title={t.heroTitle}
                subtitle={t.heroSubtitle}
            />

            {/* Program Seçici (Filter/Selector) */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.filterTitle}</h2>
                        <p className="text-gray-600">{t.filterSubtitle}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {filterOptions.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilterId(filter.id)}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    selectedFilterId === filter.id
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filter.label[language]}
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
                                                {program.ageLevel[language]}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{program.name}</h3>
                                        <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">{program.description[language]}</p>

                                        <div className="space-y-4 mb-8">
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.focusAreaLabel}</div>
                                                <div className="text-sm font-medium text-gray-800">{program.focusArea[language]}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.structureLabel}</div>
                                                <div className="text-sm font-medium text-gray-800">{program.structure[language]}</div>
                                            </div>
                                        </div>

                                        <Link href={`/recf-programlari/${program.id}`} className="mt-auto block">
                                            <Button
                                                variant="outline"
                                                className="w-full border-gray-300 text-gray-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                            >
                                                {t.detailsBtn}
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

            <Footer language={language} />
        </div>
    )
}
