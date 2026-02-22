'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    ArrowRight, ChevronRight, ChevronLeft, Sparkles,
    Gamepad2, Puzzle, Bot, Cpu, Factory, GraduationCap,
    CheckCircle2, HelpCircle
} from 'lucide-react'

// Program data with colors
const programs = [
    {
        id: 'vex-123',
        name: 'VEX 123',
        shortName: '123',
        ageRange: '4-7',
        ageStart: 4,
        ageEnd: 7,
        color: '#00A651',
        bgColor: 'bg-green-500',
        lightBg: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600',
        icon: Sparkles,
        description: 'Okul öncesi ve ilkokul başlangıcı için oyunla öğrenme temelli robotik deneyimi.',
        material: 'Modüler Yapı',
        difficulty: 'Başlangıç',
        coding: 'Ekransız Kodlama',
        href: '/vex-nedir/vex-123'
    },
    {
        id: 'vex-go',
        name: 'VEX GO',
        shortName: 'GO',
        ageRange: '6-11',
        ageStart: 6,
        ageEnd: 11,
        color: '#00AEEF',
        bgColor: 'bg-cyan-500',
        lightBg: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        textColor: 'text-cyan-600',
        icon: Gamepad2,
        description: 'İlkokul seviyesinde STEM kavramlarını keşfetmek için tasarlanmış yapı sistemi.',
        material: 'Modüler Yapı',
        difficulty: 'Başlangıç',
        coding: 'VEXcode GO (Blok)',
        href: '/vex-nedir/vex-go'
    },
    {
        id: 'vex-iq',
        name: 'VEX IQ',
        shortName: 'IQ',
        ageRange: '8-14',
        ageStart: 8,
        ageEnd: 14,
        color: '#F7941D',
        bgColor: 'bg-orange-500',
        lightBg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-600',
        icon: Puzzle,
        description: 'Ortaokul seviyesinde takım çalışması ve plastik yapı taşlı robotik yarışma platformu.',
        material: 'Modüler Yapı',
        difficulty: 'Orta',
        coding: 'VEXcode IQ (Blok/Python)',
        href: '/vex-nedir/vex-iq'
    },
    {
        id: 'vex-v5',
        name: 'VEX V5 (VRC)',
        shortName: 'V5',
        ageRange: '11-18',
        ageStart: 11,
        ageEnd: 18,
        color: '#E31837',
        bgColor: 'bg-red-600',
        lightBg: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600',
        icon: Bot,
        description: 'Lise seviyesinde profesyonel metal robotik, mühendislik ve ileri seviye programlama.',
        material: 'Endüstriyel Yapı',
        difficulty: 'İleri',
        coding: 'VEXcode V5 (Python/C++)',
        href: '/vex-nedir/vex-v5'
    },
    {
        id: 'vex-ai',
        name: 'VEX V5 AI / Workcell',
        shortName: 'AI',
        ageRange: '14-18',
        ageStart: 14,
        ageEnd: 18,
        color: '#6B21A8',
        bgColor: 'bg-purple-700',
        lightBg: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-600',
        icon: Cpu,
        description: 'Yapay zeka, makine öğrenmesi ve endüstriyel otomasyon odaklı ileri düzey program.',
        material: 'Endüstriyel Yapı',
        difficulty: 'Uzman',
        coding: 'Python + AI Kütüphaneleri',
        href: '/vex-nedir/vex-ai'
    },
    {
        id: 'vex-u',
        name: 'VEX U',
        shortName: 'U',
        ageRange: '18+',
        ageStart: 18,
        ageEnd: 25,
        color: '#1E3A8A',
        bgColor: 'bg-blue-900',
        lightBg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        icon: GraduationCap,
        description: 'Üniversite liginde özgün tasarımlar ve akademik Ar-Ge platformu.',
        material: 'Endüstriyel Yapı',
        difficulty: 'Uzman',
        coding: 'C++/Python (Sınırsız)',
        href: '/vex-nedir/vex-u'
    }
]

// Quiz questions
const quizQuestions = [
    {
        id: 1,
        question: 'Öğrenciniz / Çocuğunuz kaç yaşında?',
        options: [
            { label: '4-7 yaş', value: '4-7' },
            { label: '8-11 yaş', value: '8-11' },
            { label: '12-14 yaş', value: '12-14' },
            { label: '15-18 yaş', value: '15-18' },
            { label: '18+ (Üniversite)', value: '18+' }
        ]
    },
    {
        id: 2,
        question: 'Daha önce robotik veya kodlama deneyimi var mı?',
        options: [
            { label: 'Hayır, hiç yok', value: 'none' },
            { label: 'Temel seviye (Scratch vb.)', value: 'basic' },
            { label: 'Orta seviye (Arduino, blok kodlama)', value: 'intermediate' },
            { label: 'İleri seviye (Python, C++)', value: 'advanced' }
        ]
    },
    {
        id: 3,
        question: 'Öncelikli hedefiniz nedir?',
        options: [
            { label: 'Eğlenerek öğrenme', value: 'fun' },
            { label: 'Yarışmalara katılma', value: 'competition' },
            { label: 'Kariyer hazırlığı', value: 'career' },
            { label: 'Akademik araştırma', value: 'academic' }
        ]
    }
]

// Quiz result calculator
function getRecommendedProgram(answers: Record<number, string>): typeof programs[0] {
    const age = answers[1]
    const experience = answers[2]

    if (age === '4-7') return programs[0] // VEX 123
    if (age === '8-11' && experience === 'none') return programs[1] // VEX GO
    if (age === '8-11') return programs[2] // VEX IQ
    if (age === '12-14') return programs[2] // VEX IQ
    if (age === '15-18' && experience === 'advanced') return programs[4] // VEX AI
    if (age === '15-18') return programs[3] // VEX V5
    if (age === '18+') return programs[5] // VEX U

    return programs[3] // Default: VEX V5
}

export default function VexNedirPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedAge, setSelectedAge] = useState<number | null>(null)
    const [quizStep, setQuizStep] = useState(0) // 0 = not started
    const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
    const [quizResult, setQuizResult] = useState<typeof programs[0] | null>(null)

    // Get highlighted programs based on selected age
    const getHighlightedPrograms = () => {
        if (selectedAge === null) return []
        return programs.filter(p => selectedAge >= p.ageStart && selectedAge <= p.ageEnd)
    }

    const highlightedPrograms = getHighlightedPrograms()

    // Quiz handlers
    const startQuiz = () => setQuizStep(1)

    const answerQuestion = (answer: string) => {
        const newAnswers = { ...quizAnswers, [quizStep]: answer }
        setQuizAnswers(newAnswers)

        if (quizStep < quizQuestions.length) {
            setQuizStep(quizStep + 1)
        } else {
            setQuizResult(getRecommendedProgram(newAnswers))
            setQuizStep(quizQuestions.length + 1)
        }
    }

    const resetQuiz = () => {
        setQuizStep(0)
        setQuizAnswers({})
        setQuizResult(null)
    }

    // Age timeline points
    const agePoints = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22]

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="VEX Nedir?"
                subtitle="Her yaş için tasarlanmış robotik eğitim platformlarını keşfedin"
            />

            {/* 1. Interactive Age Timeline */}
            <section className="py-12 md:py-16 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Yaşa Göre Program Seçin</h2>
                        <p className="text-gray-600">Bir yaş grubuna tıklayarak uygun programları görün</p>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute top-1/2 left-[20px] right-[20px] md:left-0 md:right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />

                        {/* Program ranges background */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-[20px] right-[20px] md:left-0 md:right-0 h-1 flex">
                            {programs.map((program, index) => {
                                // Desktop Calculation
                                const startPercent = ((program.ageStart - 4) / 18) * 100
                                const widthPercent = ((program.ageEnd - program.ageStart) / 18) * 100

                                // Mobile Calculation (Fixed 25% slots)
                                // Slots: 0-25 (4-6), 25-50 (6-10), 50-75 (10-14), 75-100 (14-18)
                                let mobileStart = 0
                                if (program.id === 'vex-go') mobileStart = 25
                                else if (program.id === 'vex-iq') mobileStart = 50
                                else if (program.id === 'vex-v5' || program.id === 'vex-ai') mobileStart = 75
                                else if (program.id === 'vex-u') mobileStart = 100

                                const isHiddenOnMobile = program.id === 'vex-u'

                                return (
                                    <React.Fragment key={program.id}>
                                        {/* Desktop Bar */}
                                        <motion.div
                                            className="hidden md:block absolute h-2 rounded-full opacity-30"
                                            style={{
                                                left: `${startPercent}%`,
                                                width: `${widthPercent}%`,
                                                backgroundColor: program.color,
                                                top: `${index % 2 === 0 ? -8 : 4}px`
                                            }}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                        />

                                        {/* Mobile Bar */}
                                        {!isHiddenOnMobile && (
                                            <motion.div
                                                className="md:hidden absolute h-2 rounded-full opacity-30"
                                                style={{
                                                    left: `${mobileStart}%`,
                                                    width: '25%',
                                                    backgroundColor: program.color,
                                                    top: `${index % 2 === 0 ? -8 : 4}px`
                                                }}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                            />
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        {/* Age points */}
                        <div className="relative flex justify-between items-center py-8">
                            {agePoints.map((age) => {
                                const isSelected = selectedAge === age
                                const isInRange = highlightedPrograms.some(p => age >= p.ageStart && age <= p.ageEnd)
                                const isMobilePoint = [4, 6, 10, 14, 18].includes(age)

                                return (
                                    <motion.button
                                        key={age}
                                        onClick={() => setSelectedAge(isSelected ? null : age)}
                                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 
                                            ${!isMobilePoint ? 'hidden md:flex' : 'flex'} 
                                            ${isSelected
                                                ? 'bg-primary text-white scale-125 shadow-lg'
                                                : isInRange && selectedAge !== null
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                                            }`}
                                        whileHover={{ scale: isSelected ? 1.25 : 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {age === 18 ? (
                                            <>
                                                <span className="md:hidden">18+</span>
                                                <span className="hidden md:inline">18</span>
                                            </>
                                        ) : age}
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Age labels */}
                        <div className="flex justify-between text-xs text-gray-500 -mt-2">
                            <span>Okul Öncesi</span>
                            <span>İlkokul</span>
                            <span>Ortaokul</span>
                            <span>Lise</span>
                            <span>Üniversite</span>
                        </div>
                    </div>

                    {/* Selected age info */}
                    <AnimatePresence mode="wait">
                        {selectedAge !== null && highlightedPrograms.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-8 text-center"
                            >
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold text-primary">{selectedAge} yaş</span> için uygun programlar:
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {highlightedPrograms.map(program => (
                                        <motion.span
                                            key={program.id}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${program.lightBg} ${program.textColor} ${program.borderColor} border`}
                                        >
                                            {program.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 2. Program Cards Grid */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">VEX Platformları</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Her seviye için tasarlanmış 6 farklı robotik programı</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program, index) => {
                            const Icon = program.icon
                            const isHighlighted = highlightedPrograms.some(p => p.id === program.id)

                            return (
                                <motion.div
                                    key={program.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group bg-white rounded-2xl border-2 overflow-hidden hover:shadow-xl transition-all duration-300 ${isHighlighted && selectedAge !== null ? 'border-primary shadow-lg scale-[1.02]' : 'border-gray-200'
                                        }`}
                                >
                                    {/* Color bar */}
                                    <div className="h-2" style={{ backgroundColor: program.color }} />

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${program.color}15` }}
                                            >
                                                <Icon className="w-7 h-7" style={{ color: program.color }} />
                                            </div>
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{ backgroundColor: `${program.color}15`, color: program.color }}
                                            >
                                                {program.ageRange} yaş
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{program.material}</span>
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{program.difficulty}</span>
                                        </div>

                                        <Link href={program.href}>
                                            <Button
                                                className="w-full group-hover:shadow-md transition-shadow"
                                                style={{ backgroundColor: program.color }}
                                            >
                                                Detayları Keşfet
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

            {/* 3. Mini Quiz */}
            <section className="py-16 md:py-20 bg-white border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <HelpCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Program Bulucu</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hangi Program Bana Uygun?</h2>
                        <p className="text-gray-600">Birkaç soruyla size en uygun programı bulalım</p>
                    </div>

                    <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8 md:p-10">
                        <AnimatePresence mode="wait">
                            {/* Start */}
                            {quizStep === 0 && (
                                <motion.div
                                    key="start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <HelpCircle className="w-10 h-10 text-primary" />
                                    </div>
                                    <p className="text-gray-600 mb-6">3 kısa soruyla size en uygun VEX programını bulalım.</p>
                                    <Button onClick={startQuiz} size="lg" className="bg-primary hover:bg-primary/90">
                                        Teste Başla
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            )}

                            {/* Questions */}
                            {quizStep > 0 && quizStep <= quizQuestions.length && (
                                <motion.div
                                    key={`question-${quizStep}`}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="py-4"
                                >
                                    {/* Progress */}
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            onClick={() => setQuizStep(quizStep - 1)}
                                            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Geri
                                        </button>
                                        <div className="flex gap-2">
                                            {quizQuestions.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-8 h-1 rounded-full transition-colors ${i + 1 <= quizStep ? 'bg-primary' : 'bg-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">{quizStep}/{quizQuestions.length}</span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                                        {quizQuestions[quizStep - 1].question}
                                    </h3>

                                    <div className="grid gap-3">
                                        {quizQuestions[quizStep - 1].options.map((option, i) => (
                                            <motion.button
                                                key={option.value}
                                                onClick={() => answerQuestion(option.value)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="w-full p-4 text-left bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all group"
                                            >
                                                <span className="text-gray-700 group-hover:text-primary transition-colors">{option.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Result */}
                            {quizResult && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-4"
                                >
                                    <div className="mb-6">
                                        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Size Önerilen Program</h3>
                                    </div>

                                    <div
                                        className="p-6 rounded-2xl border-2 mb-6"
                                        style={{ borderColor: quizResult.color, backgroundColor: `${quizResult.color}08` }}
                                    >
                                        <div
                                            className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${quizResult.color}20` }}
                                        >
                                            <quizResult.icon className="w-8 h-8" style={{ color: quizResult.color }} />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2" style={{ color: quizResult.color }}>{quizResult.name}</h4>
                                        <p className="text-gray-600 mb-4">{quizResult.description}</p>
                                        <Link href={quizResult.href}>
                                            <Button style={{ backgroundColor: quizResult.color }}>
                                                Programı İncele
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>

                                    <button onClick={resetQuiz} className="text-gray-500 hover:text-primary transition-colors">
                                        Testi Tekrarla
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 4. Comparison Table */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Karşılaştırması</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Tüm VEX platformlarını detaylı olarak karşılaştırın</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Platform</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Yaş Grubu</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Malzeme</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Kodlama Dili</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programs.map((program, index) => {
                                    const Icon = program.icon
                                    return (
                                        <motion.tr
                                            key={program.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                        style={{ backgroundColor: `${program.color}15` }}
                                                    >
                                                        <Icon className="w-5 h-5" style={{ color: program.color }} />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{program.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                                                    style={{ backgroundColor: `${program.color}15`, color: program.color }}
                                                >
                                                    {program.ageRange} yaş
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{program.material}</td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">{program.coding}</td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">VEX</div>
                                <div><div className="text-lg font-bold">VEX TÜRKİYE</div><div className="text-xs text-gray-400">Robotics Competition</div></div>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">Geleceğin mühendislerini yetiştiriyoruz.</p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h3>
                            <ul className="space-y-3">
                                <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Ana Sayfa</a></li>
                                <li><a href="/kurumsal/hakkimizda" className="text-gray-400 hover:text-primary transition-colors">Hakkımızda</a></li>
                                <li><a href="/vex-nedir" className="text-gray-400 hover:text-primary transition-colors">VEX Nedir?</a></li>
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                {programs.slice(0, 4).map(p => (
                                    <li key={p.id}><a href={p.href} className="text-gray-400 hover:text-primary transition-colors">{p.name}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                                <li>İstanbul, Türkiye</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Gizlilik Politikası</a>
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Kullanım Koşulları</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
