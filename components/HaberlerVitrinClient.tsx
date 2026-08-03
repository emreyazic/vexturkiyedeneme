'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { SanityNewsCard } from '@/components/SanityNewsComponents'
import type { SanityNews } from '@/lib/sanity-queries'
import { getImageUrl, formatNewsDate, getCategoryLabel } from '@/lib/sanity-queries'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Play, Trophy, Award, Clock, ArrowRight, Sparkles,
    Calendar, ChevronRight, Star
} from 'lucide-react'

interface HaberlerVitrinClientProps {
    featuredNews: SanityNews | null
    latestNews: SanityNews[]
}

export function HaberlerVitrinClient({ featuredNews, latestNews }: HaberlerVitrinClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero
                title="Haber Merkezi"
                subtitle="RECF Türkiye ve Intechne Teknoloji'den en güncel haberler ve duyurular"
            />

            {/* Öne Çıkan Haber - Hero Section */}
            {featuredNews && (
                <section className="py-12 bg-gradient-to-b from-gray-900 to-gray-800">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            {/* Featured Badge */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                                    <Star className="w-4 h-4 text-primary" fill="currentColor" />
                                    <span className="text-primary font-semibold text-sm">Öne Çıkan Haber</span>
                                </div>
                            </div>

                            {/* Hero Card */}
                            <Link href={`/duyurular/haberler/${featuredNews.slug.current}`}>
                                <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
                                    {/* Background Image */}
                                    <div className="relative h-[400px] md:h-[500px]">
                                        {featuredNews.mainImage && (
                                            <Image
                                                src={getImageUrl(featuredNews.mainImage, 1400, 700)}
                                                alt={featuredNews.mainImage.alt || featuredNews.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                priority
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <div className="max-w-3xl">
                                            {/* Category & Date */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                                                    {getCategoryLabel(featuredNews.category)}
                                                </span>
                                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatNewsDate(featuredNews.publishedAt)}
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                                {featuredNews.title}
                                            </h2>

                                            {/* Excerpt */}
                                            {featuredNews.excerpt && (
                                                <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                                                    {featuredNews.excerpt}
                                                </p>
                                            )}

                                            {/* Team of the Day */}
                                            {featuredNews.teamOfTheDay && (
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-6">
                                                    <Trophy className="w-4 h-4 text-white" />
                                                    <span className="text-white font-medium text-sm">
                                                        Günün Takımı: {featuredNews.teamOfTheDay}
                                                    </span>
                                                </div>
                                            )}

                                            {/* CTA */}
                                            <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                                                Haberi Oku
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Play Button for Video (if applicable) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        >
                                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Son Gelişmeler */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-10"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Son Gelişmeler</h2>
                            <p className="text-gray-600">En güncel turnuva haberleri ve duyurular</p>
                        </div>
                    </motion.div>

                    {/* News Grid - 3 veya 4 haber */}
                    {latestNews.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {latestNews.map((news, index) => (
                                <SanityNewsCard
                                    key={news._id}
                                    news={news}
                                    index={index}
                                    featured={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Henüz haber bulunmuyor.</p>
                        </div>
                    )}

                    {/* Tüm Haberleri Gör Butonu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link href="/duyurular/haberler/tum-haberler">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                <span>Tüm Haberleri Gör</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <p className="text-sm text-gray-500 mt-3">
                            Haber arşivimize göz atın
                        </p>
                    </motion.div>
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
                            className="flex-1 px-4 h-14 rounded-lg text-gray-900 border-2 border-white placeholder:text-red-500 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white"
                        />
                        <Button className="bg-white text-primary hover:bg-gray-100 px-6 h-14 rounded-lg shrink-0">
                            Abone Ol
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer language={language} />
        </div>
    )
}
