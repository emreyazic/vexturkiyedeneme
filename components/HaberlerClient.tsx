'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { SanityNewsGrid } from '@/components/SanityNewsComponents'
import type { SanityNews } from '@/lib/sanity-queries'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Play, Trophy, Award, Clock, ArrowRight, Sparkles
} from 'lucide-react'

// Featured video (statik - henüz Sanity'de yok)
const featuredVideo = {
    title: 'Türkiye Şampiyonası 2026 Özet',
    thumbnail: '/video-thumb.jpg',
    duration: '4:32',
    views: '2.4K',
    date: '28 Şubat 2026'
}

// Team of the day
const teamOfDay = {
    number: '12345A',
    name: 'Robo Titans',
    city: 'İstanbul',
    achievement: 'Excellence Award Champion',
    stats: { wins: 24, skills: 187, awards: 5 }
}

// Match of the day
const matchOfDay = {
    red: { team: '12345A', score: 156 },
    blue: { team: '67890B', score: 148 },
    event: 'Türkiye Finali',
    round: 'Final Maçı'
}

interface HaberlerClientProps {
    news: SanityNews[]
}

export function HaberlerClient({ news }: HaberlerClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero
                title="Turnuva Ekspresi"
                subtitle="Haftalık bülten, sıcak haberler ve özel başarılar"
            />

            {/* Featured Video Section */}
            <section className="py-8 bg-gray-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full md:w-2/3 aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl"
                                >
                                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                </motion.div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-xl font-bold">{featuredVideo.title}</h3>
                                <div className="flex items-center gap-4 mt-2 text-gray-300 text-sm">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {featuredVideo.duration}
                                    </span>
                                    <span>{featuredVideo.views} görüntülenme</span>
                                    <span>{featuredVideo.date}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Highlights */}
                        <div className="w-full md:w-1/3 space-y-4">
                            {/* Team of the Day */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-5 text-white"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Trophy className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Günün Takımı</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                                        {teamOfDay.number.slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{teamOfDay.number}</div>
                                        <div className="text-sm text-white/80">{teamOfDay.name} • {teamOfDay.city}</div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/20 flex gap-4 text-sm">
                                    <span><strong>{teamOfDay.stats.wins}</strong> Galibiyet</span>
                                    <span><strong>{teamOfDay.stats.skills}</strong> Skills</span>
                                    <span><strong>{teamOfDay.stats.awards}</strong> Ödül</span>
                                </div>
                            </motion.div>

                            {/* Match of the Day */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-r from-primary to-red-600 rounded-2xl p-5 text-white"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Günün Maçı</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">{matchOfDay.red.score}</div>
                                        <div className="text-sm text-white/80">{matchOfDay.red.team}</div>
                                    </div>
                                    <div className="text-2xl font-bold text-white/50">VS</div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">{matchOfDay.blue.score}</div>
                                        <div className="text-sm text-white/80">{matchOfDay.blue.team}</div>
                                    </div>
                                </div>
                                <div className="text-center text-sm text-white/80 mt-2">
                                    {matchOfDay.event} • {matchOfDay.round}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grid - Sanity Verisi */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Son Haberler</h2>
                            <p className="text-gray-600 text-sm">En güncel turnuva haberleri ve duyurular</p>
                        </div>
                        <Button
                            variant="outline"
                            className="border-gray-300"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Sayfa Başı
                            <ArrowRight className="w-4 h-4 ml-2 rotate-[-90deg]" />
                        </Button>
                    </div>

                    {/* Sanity'den gelen haberler */}
                    <SanityNewsGrid news={news} showFeatured={true} />
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Haftalık Bülten</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Her Pazartesi en güncel VEX haberlerini e-postanıza alın
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <Button className="bg-white text-primary hover:bg-gray-100 px-6">
                            Abone Ol
                        </Button>
                    </div>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
