'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Search, Filter, Trophy, Medal, MapPin, ChevronDown,
    ArrowUpDown, Users, Calendar, X
} from 'lucide-react'

// Tournament results data
const tournamentResults = [
    { id: 1, rank: 1, team: '1234A', teamName: 'Phoenix Robotics', school: 'ODTÜ GV Özel Lisesi', city: 'Ankara', program: 'VRC', score: 248, awards: ['Excellence', 'Design'] },
    { id: 2, rank: 2, team: '5678B', teamName: 'Robo Eagles', school: 'Hisar Okulları', city: 'İstanbul', program: 'VRC', score: 235, awards: ['Skills Champion'] },
    { id: 3, rank: 3, team: '9012C', teamName: 'Tech Titans', school: 'TED Ankara Koleji', city: 'Ankara', program: 'VRC', score: 228, awards: ['Robot Skills'] },
    { id: 4, rank: 4, team: '3456D', teamName: 'Iron Giants', school: 'İzmir Amerikan Koleji', city: 'İzmir', program: 'VRC', score: 215, awards: [] },
    { id: 5, rank: 5, team: '7890E', teamName: 'Cyber Wolves', school: 'Koç Okulu', city: 'İstanbul', program: 'VRC', score: 210, awards: ['Innovate'] },
    { id: 6, rank: 6, team: '2345F', teamName: 'Storm Breakers', school: 'Bahçeşehir Koleji', city: 'İstanbul', program: 'VRC', score: 198, awards: [] },
    { id: 7, rank: 7, team: '6789G', teamName: 'Quantum Leap', school: 'Ankara Fen Lisesi', city: 'Ankara', program: 'VRC', score: 192, awards: [] },
    { id: 8, rank: 8, team: '1357H', teamName: 'Binary Builders', school: 'Bursa Fen Lisesi', city: 'Bursa', program: 'VRC', score: 185, awards: ['Judges Award'] },
    { id: 9, rank: 1, team: '2468A', teamName: 'Mini Makers', school: 'Özel Eğitim Kurumu', city: 'İstanbul', program: 'IQ', score: 156, awards: ['Excellence'] },
    { id: 10, rank: 2, team: '1359B', teamName: 'Young Engineers', school: 'TEV İnanç Türkeş', city: 'İstanbul', program: 'IQ', score: 148, awards: ['Teamwork'] },
    { id: 11, rank: 3, team: '2460C', teamName: 'Future Stars', school: 'Ankara Koleji', city: 'Ankara', program: 'IQ', score: 142, awards: [] },
    { id: 12, rank: 4, team: '3571D', teamName: 'Bright Minds', school: 'İzmir SEV Koleji', city: 'İzmir', program: 'IQ', score: 135, awards: [] },
]

// Cities for filter
const cities = ['Tümü', 'Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya']
const programs = ['Tümü', 'VRC', 'IQ']

export default function SonuclarPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState('Tümü')
    const [selectedProgram, setSelectedProgram] = useState('Tümü')
    const [sortField, setSortField] = useState<'rank' | 'score' | 'team'>('rank')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [showFilters, setShowFilters] = useState(false)

    // Filtered and sorted results
    const filteredResults = useMemo(() => {
        let results = [...tournamentResults]

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            results = results.filter(r =>
                r.team.toLowerCase().includes(query) ||
                r.teamName.toLowerCase().includes(query) ||
                r.school.toLowerCase().includes(query)
            )
        }

        // Filter by city
        if (selectedCity !== 'Tümü') {
            results = results.filter(r => r.city === selectedCity)
        }

        // Filter by program
        if (selectedProgram !== 'Tümü') {
            results = results.filter(r => r.program === selectedProgram)
        }

        // Sort
        results.sort((a, b) => {
            let comparison = 0
            if (sortField === 'rank') comparison = a.rank - b.rank
            else if (sortField === 'score') comparison = a.score - b.score
            else if (sortField === 'team') comparison = a.team.localeCompare(b.team)

            return sortOrder === 'asc' ? comparison : -comparison
        })

        return results
    }, [searchQuery, selectedCity, selectedProgram, sortField, sortOrder])

    const toggleSort = (field: 'rank' | 'score' | 'team') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCity('Tümü')
        setSelectedProgram('Tümü')
    }

    const hasActiveFilters = searchQuery || selectedCity !== 'Tümü' || selectedProgram !== 'Tümü'

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Turnuva Sonuçları"
                subtitle="2025-2026 sezonu turnuva sonuçlarını inceleyin"
            />

            {/* Results Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Search and Filters */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Takım numarası, ismi veya okul ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 border-gray-300"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`h-12 border-gray-300 ${showFilters ? 'bg-gray-100' : ''}`}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filtrele
                                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </Button>
                        </div>

                        {/* Filter Options */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-wrap gap-4 mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Şehir</label>
                                            <div className="flex flex-wrap gap-2">
                                                {cities.map(city => (
                                                    <button
                                                        key={city}
                                                        onClick={() => setSelectedCity(city)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedCity === city
                                                                ? 'bg-primary text-white'
                                                                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {city}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Program</label>
                                            <div className="flex gap-2">
                                                {programs.map(program => (
                                                    <button
                                                        key={program}
                                                        onClick={() => setSelectedProgram(program)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedProgram === program
                                                                ? 'bg-primary text-white'
                                                                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {program}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Active filters */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-sm text-gray-500">Aktif filtreler:</span>
                                {searchQuery && (
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-lg flex items-center gap-1">
                                        &quot;{searchQuery}&quot;
                                        <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedCity !== 'Tümü' && (
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-lg flex items-center gap-1">
                                        {selectedCity}
                                        <button onClick={() => setSelectedCity('Tümü')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedProgram !== 'Tümü' && (
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-lg flex items-center gap-1">
                                        {selectedProgram}
                                        <button onClick={() => setSelectedProgram('Tümü')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-primary ml-2">
                                    Temizle
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('rank')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                Sıra
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('team')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                Takım
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Okul</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Şehir</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Program</th>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('score')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                Puan
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ödüller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredResults.map((result, index) => (
                                            <motion.tr
                                                key={result.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${result.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                            result.rank === 2 ? 'bg-gray-200 text-gray-600' :
                                                                result.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {result.rank}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-primary">{result.team}</span>
                                                        <span className="text-gray-600">{result.teamName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 text-sm">{result.school}</td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                                                        <MapPin className="w-3 h-3" />
                                                        {result.city}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${result.program === 'VRC' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {result.program}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono font-bold text-gray-900">{result.score}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {result.awards.map((award, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1">
                                                                <Trophy className="w-3 h-3" />
                                                                {award}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {filteredResults.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Sonuç bulunamadı.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
                        <span>{filteredResults.length} sonuç gösteriliyor</span>
                        <Link href="/yarismalar/skills">
                            <Button variant="outline" className="border-gray-300">
                                Robot Skills Sıralaması
                                <Medal className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
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
                        <p className="text-sm text-gray-500 text-center">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
