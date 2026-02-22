'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    MapPin, Users, School, ChevronRight, X, Search, ArrowRight, List
} from 'lucide-react'
import { SanityTeam } from '@/lib/sanity-queries'

// Platform etiketleri ve renkleri
const platformConfig: Record<string, { label: string; bgClass: string; textClass: string }> = {
    'vex-v5': { label: 'VRC', bgClass: 'bg-red-100', textClass: 'text-red-700' },
    'vex-iq': { label: 'IQ', bgClass: 'bg-orange-100', textClass: 'text-orange-700' },
    'vex-u': { label: 'VEX U', bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
}

// Stats for counter
const stats = [
    { label: 'Kayıtlı Takım', value: 542, suffix: '+' },
    { label: 'Öğrenci', value: 5420, suffix: '+' },
    { label: 'Aktif İl', value: 42, suffix: '' },
    { label: 'Mentor', value: 380, suffix: '+' },
]

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    const startTimeRef = useRef<number | null>(null)

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

            countRef.current = Math.floor(progress * end)
            setCount(countRef.current)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration])

    return count
}

// Counter Component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const count = useCounter(value)
    return <span>{count.toLocaleString('tr-TR')}{suffix}</span>
}

interface TeamsMapClientProps {
    teams: SanityTeam[]
}

// TurkeyMap SVG Component moved to @/components/turkey-map

export function TeamsMapClient({ teams }: TeamsMapClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedCity, setSelectedCity] = useState<string | null>('İstanbul')
    const [searchQuery, setSearchQuery] = useState('')

    // Takımları şehre göre grupla
    const teamsByCity = useMemo(() => {
        const grouped: Record<string, SanityTeam[]> = {}
        teams.forEach(team => {
            if (team.city) {
                if (!grouped[team.city]) {
                    grouped[team.city] = []
                }
                grouped[team.city].push(team)
            }
        })
        return grouped
    }, [teams])

    const selectedTeams = selectedCity ? teamsByCity[selectedCity] || [] : []

    const allCities = Object.keys(teamsByCity).sort()
    const filteredCities = searchQuery
        ? allCities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
        : allCities

    // Platform rozeti için helper
    const getPlatformBadge = (platform: string) => {
        const config = platformConfig[platform] || { label: platform, bgClass: 'bg-gray-100', textClass: 'text-gray-700' }
        return config
    }

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />

            {/* Hero */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">VEX Türkiye Takımları</h1>
                    <p className="text-xl text-gray-600">Türkiye genelinde 500+ takımla büyüyen robotik topluluğumuz</p>
                </div>
            </section>

            {/* Counter Stats */}
            <section className="py-8 bg-gradient-to-r from-primary to-red-700">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold mb-1">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-white/80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Section Header with Button */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                <List className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Takım Listesi</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                İl Bazlı Takım Listesi
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Şehirleri seçerek o ildeki VEX takımlarını listeleyebilirsiniz
                            </p>
                        </div>
                        <Link href="/takimlar/tum-takimlar">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                            >
                                <List className="w-4 h-4 mr-2" />
                                Tüm Takımları Gör
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* City Teams Panel - Centered */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Şehir ara..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* City List or Selected City Teams */}
                            <div className="max-h-[600px] overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {selectedCity ? (
                                        <motion.div
                                            key="teams"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            {/* Selected City Header */}
                                            <div className="p-4 bg-primary/5 border-b border-gray-200 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-gray-900">{selectedCity}</span>
                                                    <span className="text-sm text-gray-500">({selectedTeams.length} takım)</span>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedCity(null)}
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-gray-500" />
                                                </button>
                                            </div>

                                            {/* Teams List */}
                                            {selectedTeams.length > 0 ? (
                                                <div className="divide-y divide-gray-100">
                                                    {selectedTeams.map((team, index) => {
                                                        const badge = getPlatformBadge(team.platform)
                                                        return (
                                                            <motion.div
                                                                key={team._id}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                className="p-4 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">
                                                                            {team.teamNumber} {team.name}
                                                                        </div>
                                                                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                                            <School className="w-3 h-3" />
                                                                            {team.schoolOrOrganization || 'Belirtilmemiş'}
                                                                        </div>
                                                                    </div>
                                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.bgClass} ${badge.textClass}`}>
                                                                        {badge.label}
                                                                    </span>
                                                                </div>
                                                            </motion.div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center text-gray-500">
                                                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                                    <p>Bu şehirde henüz kayıtlı takım yok.</p>
                                                    <Link href="/takimlar/kayit">
                                                        <Button size="sm" className="mt-4">
                                                            İlk Takımı Oluştur
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="cities"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="divide-y divide-gray-100"
                                        >
                                            {filteredCities.map((city, index) => (
                                                <motion.button
                                                    key={city}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.03 }}
                                                    onClick={() => setSelectedCity(city)}
                                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <MapPin className="w-4 h-4 text-primary" />
                                                        </div>
                                                        <span className="font-medium text-gray-900">{city}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">{teamsByCity[city]?.length || 0} takım</span>
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Haritadaki Yerinizi Alın
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        VEX Türkiye ailesine katılın ve şehrinizi haritada parlak bir nokta yapın
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/takimlar/nasil-kurulur">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Takım Nasıl Kurulur?
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/takimlar/kayit">
                            <Button size="lg" variant="outline" className="border-gray-300">
                                Takım Kaydı
                            </Button>
                        </Link>
                        <Link href="/takimlar/tum-takimlar">
                            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                <List className="w-4 h-4 mr-2" />
                                Tüm Takımlar
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
