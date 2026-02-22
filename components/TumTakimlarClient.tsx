'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { TeamGrid } from '@/components/TeamCard'
import {
    SanityTeam,
    TURKISH_CITIES,
    getPlatformLabel,
} from '@/lib/sanity-queries'
import {
    Search, ArrowLeft, Users, Filter, X, MapPin,
    Cpu, Trophy, BarChart3
} from 'lucide-react'

interface TumTakimlarClientProps {
    teams: SanityTeam[]
}

export function TumTakimlarClient({ teams }: TumTakimlarClientProps) {
    // Filter states
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState<string>('all')
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

    // Filtered teams
    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            // Search filter (team number or name)
            const searchMatch = searchQuery === '' ||
                team.teamNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (team.schoolOrOrganization && team.schoolOrOrganization.toLowerCase().includes(searchQuery.toLowerCase()))

            // City filter
            const cityMatch = selectedCity === 'all' || team.city === selectedCity

            // Platform filter
            const platformMatch = selectedPlatform === 'all' || team.platform === selectedPlatform

            return searchMatch && cityMatch && platformMatch
        })
    }, [teams, searchQuery, selectedCity, selectedPlatform])

    // Get unique cities that have teams
    const citiesWithTeams = useMemo(() => {
        const cities = [...new Set(teams.map(t => t.city))].sort()
        return cities
    }, [teams])

    // Stats
    const stats = useMemo(() => ({
        total: filteredTeams.length,
        vexIq: filteredTeams.filter(t => t.platform === 'vex-iq').length,
        vexV5: filteredTeams.filter(t => t.platform === 'vex-v5').length,
        vexU: filteredTeams.filter(t => t.platform === 'vex-u').length,
        cities: [...new Set(filteredTeams.map(t => t.city))].length,
    }), [filteredTeams])

    // Reset filters
    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCity('all')
        setSelectedPlatform('all')
    }

    const hasActiveFilters = searchQuery !== '' || selectedCity !== 'all' || selectedPlatform !== 'all'

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Hero Header */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Back Button */}
                        <div className="flex justify-start mb-6">
                            <Link href="/takimlar">
                                <Button variant="ghost" className="text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Haritaya Dön
                                </Button>
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                                    <Users className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                Tüm Takımlar
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                VEX Türkiye'nin kayıtlı tüm robotik takımları
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats & Filters */}
            <section className="py-6 bg-white border-b border-gray-200 relative md:sticky md:top-20 z-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Live Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-8 mb-6"
                    >
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <span className="text-gray-600">Şu an</span>
                            <span className="text-2xl font-bold text-primary">{stats.total}</span>
                            <span className="text-gray-600">takım listeleniyor</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                                VEX IQ: {stats.vexIq}
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                V5: {stats.vexV5}
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                U: {stats.vexU}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {stats.cities} şehir
                            </span>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Takım no, isim veya okul ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-11 border-gray-300"
                            />
                        </div>

                        {/* City Filter */}
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger className="w-full md:w-48 h-11 border-gray-300">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                <SelectValue placeholder="Şehir seçin" />
                            </SelectTrigger>
                            <SelectContent className="max-h-80">
                                <SelectItem value="all">Tüm Şehirler</SelectItem>
                                {citiesWithTeams.map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Platform Filter Buttons */}
                        <div className="flex gap-2">
                            <Button
                                variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedPlatform('all')}
                                className={selectedPlatform === 'all' ? 'bg-gray-900' : 'border-gray-300'}
                            >
                                Tümü
                            </Button>
                            <Button
                                variant={selectedPlatform === 'vex-iq' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedPlatform('vex-iq')}
                                className={selectedPlatform === 'vex-iq' ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}
                            >
                                VEX IQ
                            </Button>
                            <Button
                                variant={selectedPlatform === 'vex-v5' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedPlatform('vex-v5')}
                                className={selectedPlatform === 'vex-v5' ? 'bg-red-500 hover:bg-red-600' : 'border-red-300 text-red-600 hover:bg-red-50'}
                            >
                                VEX V5
                            </Button>
                            <Button
                                variant={selectedPlatform === 'vex-u' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedPlatform('vex-u')}
                                className={selectedPlatform === 'vex-u' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}
                            >
                                VEX U
                            </Button>
                        </div>

                        {/* Reset Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetFilters}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <TeamGrid teams={filteredTeams} />

                    {/* No results */}
                    {filteredTeams.length === 0 && teams.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-4">
                                Filtrelere uygun takım bulunamadı.
                            </p>
                            <Button variant="outline" onClick={resetFilters}>
                                Filtreleri Temizle
                            </Button>
                        </motion.div>
                    )}

                    {/* Back to top */}
                    {filteredTeams.length > 8 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Button
                                variant="outline"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="border-gray-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 rotate-90" />
                                Sayfa Başına Dön
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white">VEX</div>
                            <span className="text-gray-600">VEX Türkiye Takımlar</span>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/takimlar">
                                <Button variant="ghost" className="text-primary">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Harita Görünümü
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
