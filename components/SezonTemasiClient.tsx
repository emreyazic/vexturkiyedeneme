'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Download, Info, Calculator, Minus, Plus, RotateCcw,
    Target, Zap, Timer, Award, ChevronRight
} from 'lucide-react'
import {
    SanityScoringRules,
    SanitySeasonGameResource,
    getPlatformTheme,
    isResourceNew,
} from '@/lib/sanity-queries'

interface SezonTemasiClientProps {
    vrcRules: SanityScoringRules | null
    iqRules: SanityScoringRules | null
    vrcResources: SanitySeasonGameResource[]
    iqResources: SanitySeasonGameResource[]
}

// Fallback scoring data if Sanity is empty
const fallbackScoringElements = {
    vrc: [
        { elementId: 'block', name: 'Bloklar', points: 3, maxCount: 88 },
        { elementId: 'goal', name: 'Kale Kontrolü', points: 10, maxCount: 4 },
        { elementId: 'parkTier1', name: 'Park Etme (Tier 1)', points: 8, maxCount: 2 },
        { elementId: 'parkTier2', name: 'Park Etme (Tier 2)', points: 30, maxCount: 2 },
    ],
    iq: [
        { elementId: 'pass', name: 'Pas', points: 1, maxCount: 99 },
        { elementId: 'goal', name: 'Kale', points: 2, maxCount: 10 },
        { elementId: 'switch', name: 'Switch', points: 5, maxCount: 4 },
    ]
}

const fallbackGamePhases = {
    vrc: [
        { name: 'Otonom Dönem', displayDuration: '15s', duration: 15, description: 'Robot tamamen otonom çalışır. Önceden programlanmış hareketler gerçekleştirilir.', colorFrom: 'blue-500', colorTo: 'blue-600' },
        { name: 'Sürücü Kontrol', displayDuration: '1:45', duration: 105, description: 'Takım üyeleri kumandalarla robotu yönlendirir ve stratejilerini uygular.', colorFrom: 'primary', colorTo: 'red-700' },
        { name: 'Toplam Süre', displayDuration: '2:00', duration: 120, description: 'Her maç tam 2 dakika sürer. Strateji ve hız kritik önem taşır.', colorFrom: 'gray-700', colorTo: 'gray-900' },
    ],
    iq: [
        { name: 'Takım Çalışması', displayDuration: '60s', duration: 60, description: 'İki robot birlikte çalışarak en yüksek skoru yapmaya çalışır.', colorFrom: 'purple-500', colorTo: 'purple-600' },
        { name: 'Bireysel Skills', displayDuration: '60s', duration: 60, description: 'Tek robot sahada en yüksek skoru hedefler.', colorFrom: 'purple-600', colorTo: 'purple-700' },
        { name: 'Toplam Süre', displayDuration: '60s', duration: 60, description: 'Her maç 60 saniye sürer. Hız ve hassasiyet önemlidir.', colorFrom: 'gray-700', colorTo: 'gray-900' },
    ]
}

// Score Calculator Component
function ScoreCalculator({
    platform,
    rules
}: {
    platform: 'vrc' | 'iq'
    rules: SanityScoringRules | null
}) {
    const [scores, setScores] = useState<Record<string, number>>({})
    const theme = getPlatformTheme(platform)

    const elements = useMemo(() => {
        if (rules?.scoringElements && rules.scoringElements.length > 0) {
            return rules.scoringElements
        }
        return fallbackScoringElements[platform]
    }, [rules, platform])

    const updateScore = (id: string, delta: number) => {
        setScores(prev => {
            const element = elements.find(e => e.elementId === id)
            const current = prev[id] || 0
            const max = element?.maxCount || 99
            const newValue = Math.max(0, Math.min(max, current + delta))
            return { ...prev, [id]: newValue }
        })
    }

    const resetScores = () => setScores({})

    const totalScore = elements.reduce((sum, element) => {
        return sum + (scores[element.elementId] || 0) * element.points
    }, 0)

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Calculator className={`w-5 h-5 ${theme.accent}`} />
                    Puan Hesaplayıcı
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${theme.accentBg}`}>
                    {theme.seasonName}
                </span>
            </div>

            <div className="space-y-3 mb-6">
                <AnimatePresence mode="wait">
                    {elements.map((element, index) => (
                        <motion.div
                            key={`${platform}-${element.elementId}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                            <div>
                                <span className="text-sm font-medium text-gray-900">{element.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                    ({element.points} puan{element.maxCount ? `, max: ${element.maxCount}` : ''})
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateScore(element.elementId, -1)}
                                    className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-mono font-bold text-gray-900">
                                    {scores[element.elementId] || 0}
                                </span>
                                <button
                                    onClick={() => updateScore(element.elementId, 1)}
                                    className={`w-8 h-8 rounded-lg text-white hover:opacity-90 flex items-center justify-center transition-colors ${theme.accentBg}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${theme.gradient} rounded-xl text-white`}>
                <div>
                    <span className="text-sm text-white/70">Toplam Puan</span>
                    <div className="text-3xl font-bold">{totalScore}</div>
                </div>
                <button
                    onClick={resetScores}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

// Game Phases Component
function GamePhases({ platform, rules }: { platform: 'vrc' | 'iq'; rules: SanityScoringRules | null }) {
    const phases = useMemo(() => {
        if (rules?.gamePhases && rules.gamePhases.length > 0) {
            return rules.gamePhases
        }
        return fallbackGamePhases[platform]
    }, [rules, platform])

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
                {phases.map((phase, index) => (
                    <motion.div
                        key={`${platform}-${phase.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br from-${phase.colorFrom || 'gray-500'} to-${phase.colorTo || 'gray-600'} rounded-2xl p-6 text-white`}
                        style={{
                            background: `linear-gradient(to bottom right, 
                                ${phase.colorFrom?.includes('primary') ? '#dc2626' :
                                    phase.colorFrom?.includes('blue') ? '#3b82f6' :
                                        phase.colorFrom?.includes('purple') ? '#8b5cf6' : '#374151'}, 
                                ${phase.colorTo?.includes('primary') || phase.colorTo?.includes('red') ? '#b91c1c' :
                                    phase.colorTo?.includes('blue') ? '#2563eb' :
                                        phase.colorTo?.includes('purple') ? '#7c3aed' : '#111827'})`
                        }}
                    >
                        <div className="text-4xl font-bold mb-2">{phase.displayDuration}</div>
                        <h3 className="text-xl font-semibold mb-2">{phase.name}</h3>
                        <p className="text-white/80 text-sm">
                            {phase.description}
                        </p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}



// Resources Section Component
function ResourcesSection({
    platform,
    resources
}: {
    platform: 'vrc' | 'iq'
    resources: SanitySeasonGameResource[]
}) {
    const theme = getPlatformTheme(platform)

    // Fallback resources if none from Sanity
    const displayResources = resources.length > 0 ? resources : [
        { _id: '1', title: 'Oyun Kılavuzu', description: 'Detaylı kural kitapçığı', fileSize: '4.2 MB', platform: 'both' as const },
        { _id: '2', title: 'Saha Appendix', description: 'Saha ölçüleri ve parçalar', fileSize: '2.1 MB', platform: 'both' as const },
        { _id: '3', title: 'Puanlama Rehberi', description: 'Hakemler için kılavuz', fileSize: '1.8 MB', platform: 'both' as const },
    ]

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
                {displayResources.map((resource, index) => (
                    <motion.a
                        key={resource._id}
                        href={resource.externalUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group cursor-pointer relative"
                    >
                        {/* YENİ badge */}
                        {isResourceNew(resource.lastUpdated) && (
                            <span className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                YENİ
                            </span>
                        )}

                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${platform === 'vrc' ? 'bg-primary/10 group-hover:bg-primary/20' : 'bg-purple-100 group-hover:bg-purple-200'
                            }`}>
                            <Download className={`w-6 h-6 ${theme.accent}`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{resource.description}</p>
                        <span className={`text-xs font-medium ${theme.accent}`}>
                            PDF • {resource.fileSize || 'N/A'}
                        </span>
                    </motion.a>
                ))}
            </AnimatePresence>
        </div>
    )
}

// Main Client Component
export function SezonTemasiClient({ vrcRules, iqRules, vrcResources, iqResources }: SezonTemasiClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedPlatform, setSelectedPlatform] = useState<'vrc' | 'iq'>('vrc')

    const theme = getPlatformTheme(selectedPlatform)
    const currentRules = selectedPlatform === 'vrc' ? vrcRules : iqRules
    const currentResources = selectedPlatform === 'vrc' ? vrcResources : iqResources

    const gameFeatures = selectedPlatform === 'vrc' ? [
        { icon: Target, title: 'Bloklar', description: 'Blokları kalelerinize yerleştirerek puan kazanın' },
        { icon: Zap, title: 'Kale Kontrolü', description: 'Kaleleri kontrol altına alarak ekstra puan' },
        { icon: Timer, title: '2 Dakika', description: 'Her maç tam 2 dakika sürer' },
        { icon: Award, title: 'Park Etme', description: 'Maç sonunda park ederek bonus puan' }
    ] : [
        { icon: Target, title: 'Pas Geçme', description: 'Topları takım arkadaşınıza pas vererek puan' },
        { icon: Zap, title: 'Kale Atma', description: 'Topları kalelere atarak puan kazanın' },
        { icon: Timer, title: '60 Saniye', description: 'Her maç 60 saniye sürer' },
        { icon: Award, title: 'Switch', description: 'Switch noktalarını aktive ederek bonus' }
    ]

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />

            {/* Dynamic Hero based on platform */}
            <CorporateHero
                title="2025-2026 Sezon Teması"
                subtitle={theme.label}
            />

            {/* Master Platform Toggle */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-center">
                        <div className="inline-flex bg-gray-100 rounded-2xl p-1.5">
                            <button
                                onClick={() => setSelectedPlatform('vrc')}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedPlatform === 'vrc'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${selectedPlatform === 'vrc' ? 'bg-white' : 'bg-primary'}`} />
                                    VRC Push Back
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedPlatform('iq')}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedPlatform === 'iq'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${selectedPlatform === 'iq' ? 'bg-white' : 'bg-purple-600'}`} />
                                    VEX IQ Rapid Relay
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Game Overview */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Field Image */}
                        <motion.div
                            key={`field-${selectedPlatform}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className={`aspect-square bg-gradient-to-br ${selectedPlatform === 'vrc' ? 'from-red-50 to-red-100' : 'from-purple-50 to-purple-100'
                                } rounded-3xl overflow-hidden border border-gray-300 flex items-center justify-center relative`}>
                                {/* Placeholder for field image */}
                                <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className={`w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center ${selectedPlatform === 'vrc' ? 'bg-primary/10' : 'bg-purple-100'
                                            }`}>
                                            <Target className={`w-12 h-12 ${theme.accent}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                                            {theme.seasonName.toUpperCase()}
                                        </h3>
                                        <p className="text-gray-500 text-sm">2025-2026 Yarışma Sahası</p>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className={`absolute top-4 left-4 w-8 h-8 rounded-full opacity-50 ${selectedPlatform === 'vrc' ? 'bg-red-500' : 'bg-purple-500'
                                    }`} />
                                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full opacity-50 ${selectedPlatform === 'vrc' ? 'bg-blue-500' : 'bg-purple-400'
                                    }`} />
                                <div className={`absolute bottom-4 left-4 w-8 h-8 rounded-full opacity-50 ${selectedPlatform === 'vrc' ? 'bg-blue-500' : 'bg-purple-400'
                                    }`} />
                                <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full opacity-50 ${selectedPlatform === 'vrc' ? 'bg-red-500' : 'bg-purple-500'
                                    }`} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6">
                                <Button className={`flex-1 ${selectedPlatform === 'vrc' ? 'bg-primary hover:bg-primary/90' : 'bg-purple-600 hover:bg-purple-700'}`}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Oyun Kuralları (PDF)
                                </Button>
                                <Button variant="outline" className="flex-1 border-gray-300">
                                    <Info className="w-4 h-4 mr-2" />
                                    Saha Detayları
                                </Button>
                            </div>
                        </motion.div>

                        {/* Game Info */}
                        <motion.div
                            key={`info-${selectedPlatform}`}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${selectedPlatform === 'vrc' ? 'bg-primary/10' : 'bg-purple-100'
                                }`}>
                                <Zap className={`w-4 h-4 ${theme.accent}`} />
                                <span className={`text-sm font-medium ${theme.accent}`}>
                                    {selectedPlatform === 'vrc' ? 'VRC 2025-2026' : 'VEX IQ 2025-2026'}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {theme.seasonName}
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {currentRules?.description || (
                                    selectedPlatform === 'vrc'
                                        ? 'Push Back, iki takımın ittifak olarak birlikte çalıştığı, heyecan verici bir robotik yarışma oyunudur. Takımlar, blokları kalelere yerleştirerek ve maçın sonunda park ederek puan kazanır.'
                                        : 'Rapid Relay, takımların hızla topları pas vererek ve kalelere atarak puan topladığı dinamik bir oyundur. İşbirliği ve hız kritik önem taşır.'
                                )}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {gameFeatures.map((feature, index) => (
                                    <motion.div
                                        key={`${selectedPlatform}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 rounded-xl border ${selectedPlatform === 'vrc' ? 'bg-red-50/50 border-red-100' : 'bg-purple-50/50 border-purple-100'
                                            }`}
                                    >
                                        <feature.icon className={`w-6 h-6 mb-2 ${theme.accent}`} />
                                        <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <Link href="/yarismalar/oduller">
                                <Button variant="outline" className="border-gray-300">
                                    Ödül Kategorilerini İncele
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Score Calculator Section */}
            <section className={`py-16 md:py-20 border-y border-gray-200 ${selectedPlatform === 'vrc' ? 'bg-red-50/30' : 'bg-purple-50/30'
                }`}>
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${selectedPlatform === 'vrc' ? 'bg-primary/10' : 'bg-purple-100'
                            }`}>
                            <Calculator className={`w-4 h-4 ${theme.accent}`} />
                            <span className={`text-sm font-medium ${theme.accent}`}>İnteraktif Araç</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Puan Hesaplayıcı
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Maç stratejinizi planlamak için puanlarınızı hesaplayın
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <ScoreCalculator platform={selectedPlatform} rules={currentRules} />
                    </div>
                </div>
            </section>

            {/* Game Phases */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Maç Aşamaları</h2>
                    </div>

                    <GamePhases platform={selectedPlatform} rules={currentRules} />
                </div>
            </section>



            {/* Resources */}
            <section className="py-16 md:py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">İndirilebilir Kaynaklar</h2>
                        <p className="text-gray-600">
                            {theme.label} için resmi dökümanlar
                        </p>
                    </div>

                    <ResourcesSection platform={selectedPlatform} resources={currentResources} />
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
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sezon-temasi" className="text-gray-400 hover:text-primary transition-colors">Sezon Teması</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Turnuva Sonuçları</a></li>
                                <li><a href="/yarismalar/oduller" className="text-gray-400 hover:text-primary transition-colors">Ödüller</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/vex-nedir/vex-iq" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="/vex-nedir/vex-v5" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="/vex-nedir/vex-u" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
                                <li><a href="/vex-nedir/vex-ai" className="text-gray-400 hover:text-primary transition-colors">VEX AI</a></li>
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
