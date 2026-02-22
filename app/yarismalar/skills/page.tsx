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
    Search, Medal, MapPin, X, ArrowUpDown, Trophy,
    Gamepad2, Bot, TrendingUp
} from 'lucide-react'

// Robot Skills data
const skillsData = [
    { id: 1, rank: 1, team: '1234A', teamName: 'Phoenix Robotics', city: 'Ankara', program: 'VRC', driverSkills: 85, progSkills: 92, combined: 177 },
    { id: 2, rank: 2, team: '5678B', teamName: 'Robo Eagles', city: 'İstanbul', program: 'VRC', driverSkills: 78, progSkills: 95, combined: 173 },
    { id: 3, rank: 3, team: '9012C', teamName: 'Tech Titans', city: 'Ankara', program: 'VRC', driverSkills: 88, progSkills: 82, combined: 170 },
    { id: 4, rank: 4, team: '3456D', teamName: 'Iron Giants', city: 'İzmir', program: 'VRC', driverSkills: 82, progSkills: 85, combined: 167 },
    { id: 5, rank: 5, team: '7890E', teamName: 'Cyber Wolves', city: 'İstanbul', program: 'VRC', driverSkills: 79, progSkills: 86, combined: 165 },
    { id: 6, rank: 6, team: '2345F', teamName: 'Storm Breakers', city: 'İstanbul', program: 'VRC', driverSkills: 75, progSkills: 88, combined: 163 },
    { id: 7, rank: 7, team: '6789G', teamName: 'Quantum Leap', city: 'Ankara', program: 'VRC', driverSkills: 80, progSkills: 78, combined: 158 },
    { id: 8, rank: 8, team: '1357H', teamName: 'Binary Builders', city: 'Bursa', program: 'VRC', driverSkills: 76, progSkills: 80, combined: 156 },
    { id: 9, rank: 1, team: '2468A', teamName: 'Mini Makers', city: 'İstanbul', program: 'IQ', driverSkills: 65, progSkills: 72, combined: 137 },
    { id: 10, rank: 2, team: '1359B', teamName: 'Young Engineers', city: 'İstanbul', program: 'IQ', driverSkills: 62, progSkills: 70, combined: 132 },
    { id: 11, rank: 3, team: '2460C', teamName: 'Future Stars', city: 'Ankara', program: 'IQ', driverSkills: 58, progSkills: 68, combined: 126 },
    { id: 12, rank: 4, team: '3571D', teamName: 'Bright Minds', city: 'İzmir', program: 'IQ', driverSkills: 55, progSkills: 65, combined: 120 },
]

const cities = ['Tümü', 'Ankara', 'İstanbul', 'İzmir', 'Bursa']
const programs = ['Tümü', 'VRC', 'IQ']

export default function SkillsPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState('Tümü')
    const [selectedProgram, setSelectedProgram] = useState('Tümü')
    const [sortField, setSortField] = useState<'combined' | 'driverSkills' | 'progSkills'>('combined')
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

    const filteredResults = useMemo(() => {
        let results = [...skillsData]

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            results = results.filter(r =>
                r.team.toLowerCase().includes(query) ||
                r.teamName.toLowerCase().includes(query)
            )
        }

        if (selectedCity !== 'Tümü') {
            results = results.filter(r => r.city === selectedCity)
        }

        if (selectedProgram !== 'Tümü') {
            results = results.filter(r => r.program === selectedProgram)
        }

        results.sort((a, b) => {
            const comparison = a[sortField] - b[sortField]
            return sortOrder === 'asc' ? comparison : -comparison
        })

        return results.map((r, i) => ({ ...r, displayRank: i + 1 }))
    }, [searchQuery, selectedCity, selectedProgram, sortField, sortOrder])

    const toggleSort = (field: 'combined' | 'driverSkills' | 'progSkills') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('desc')
        }
    }

    const hasActiveFilters = searchQuery || selectedCity !== 'Tümü' || selectedProgram !== 'Tümü'

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Robot Skills Sıralaması"
                subtitle="Türkiye geneli Driver ve Programming Skills sıralaması"
            />

            {/* Hero Stats */}
            <section className="py-8 bg-gradient-to-r from-primary to-red-700">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-3 gap-6 text-center text-white">
                        <div>
                            <Gamepad2 className="w-8 h-8 mx-auto mb-2 opacity-80" />
                            <div className="text-2xl md:text-3xl font-bold">Driver Skills</div>
                            <p className="text-sm text-white/70">60 saniye sürücü kontrolü</p>
                        </div>
                        <div>
                            <Bot className="w-8 h-8 mx-auto mb-2 opacity-80" />
                            <div className="text-2xl md:text-3xl font-bold">Programming</div>
                            <p className="text-sm text-white/70">60 saniye tam otonom</p>
                        </div>
                        <div>
                            <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                            <div className="text-2xl md:text-3xl font-bold">Combined</div>
                            <p className="text-sm text-white/70">Toplam dünya sıralaması</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Search and Filters */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Takım numarası veya ismi ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 border-gray-300"
                                />
                            </div>
                            <div className="flex gap-2">
                                {programs.map(program => (
                                    <button
                                        key={program}
                                        onClick={() => setSelectedProgram(program)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProgram === program
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {program}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* City filter */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {cities.map(city => (
                                <button
                                    key={city}
                                    onClick={() => setSelectedCity(city)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedCity === city
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}
                            {hasActiveFilters && (
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCity('Tümü'); setSelectedProgram('Tümü'); }}
                                    className="text-sm text-primary hover:underline ml-2"
                                >
                                    Filtreleri Temizle
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Skills Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sıra</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Takım</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Şehir</th>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('driverSkills')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                <Gamepad2 className="w-4 h-4" />
                                                Driver
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('progSkills')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                <Bot className="w-4 h-4" />
                                                Programming
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <button onClick={() => toggleSort('combined')} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary">
                                                <Medal className="w-4 h-4" />
                                                Toplam
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredResults.map((result, index) => (
                                            <motion.tr
                                                key={result.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${result.displayRank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                            result.displayRank === 2 ? 'bg-gray-200 text-gray-600' :
                                                                result.displayRank === 3 ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {result.displayRank}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <span className="font-mono font-bold text-primary">{result.team}</span>
                                                            <span className="text-gray-600 ml-2">{result.teamName}</span>
                                                        </div>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${result.program === 'VRC' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                            {result.program}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                                                        <MapPin className="w-3 h-3" />
                                                        {result.city}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-500 rounded-full"
                                                                style={{ width: `${(result.driverSkills / 100) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-mono text-sm font-medium text-gray-900">{result.driverSkills}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className="h-full bg-green-500 rounded-full"
                                                                style={{ width: `${(result.progSkills / 100) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-mono text-sm font-medium text-gray-900">{result.progSkills}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary font-mono font-bold rounded-lg">
                                                        {result.combined}
                                                    </span>
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

                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">{filteredResults.length} takım listelendi</span>
                        <Link href="/yarismalar/sonuclar">
                            <Button variant="outline" className="border-gray-300">
                                Turnuva Sonuçları
                                <Trophy className="w-4 h-4 ml-2" />
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
                                <li><a href="/yarismalar/skills" className="text-gray-400 hover:text-primary transition-colors">Robot Skills</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/vex-nedir/vex-iq" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="/vex-nedir/vex-v5" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="/vex-nedir/vex-u" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
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
