'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { SanityNewsGrid } from '@/components/SanityNewsComponents'
import type { SanityNews } from '@/lib/sanity-queries'
import { ArrowLeft, Newspaper, Calendar, Filter } from 'lucide-react'

interface TumHaberlerClientProps {
    news: SanityNews[]
}

export function TumHaberlerClient({ news }: TumHaberlerClientProps) {
    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Hero Header */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {/* Back Button */}
                        <div className="flex justify-start mb-8">
                            <Link href="/duyurular/haberler">
                                <Button variant="ghost" className="text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Haber Merkezi'ne Dön
                                </Button>
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <Newspaper className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Haber Arşivi
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            VEX Türkiye'nin tüm haberleri, duyuruları ve gelişmeleri
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Calendar className="w-5 h-5" />
                                <span className="text-white font-semibold">{news.length}</span>
                                <span>haber</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Tüm Haberler</h2>
                            <p className="text-gray-600 text-sm">En yeniden en eskiye sıralı</p>
                        </div>
                        {/* Filter placeholder - gelecekte kategoriye göre filtreleme */}
                        <Button variant="outline" className="border-gray-300" disabled>
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrele (Yakında)
                        </Button>
                    </motion.div>

                    {/* News Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SanityNewsGrid news={news} showFeatured={false} />
                    </motion.div>

                    {/* Back to top */}
                    {news.length > 6 && (
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

            {/* Simple Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white">VEX</div>
                            <span className="text-gray-600">VEX Türkiye Haber Arşivi</span>
                        </div>
                        <Link href="/duyurular/haberler">
                            <Button variant="ghost" className="text-primary">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Haber Merkezi
                            </Button>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
