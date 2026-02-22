'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Camera, ArrowLeft, Instagram } from 'lucide-react'

export default function GaleriPage() {
    return (
        <div className="min-h-screen bg-white text-foreground flex flex-col">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl text-center relative z-10"
                >
                    {/* Icon */}
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
                        <Camera className="w-10 h-10 text-primary" />
                    </div>

                    {/* Text */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Çok Yakında
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                        VEX Türkiye anıları ve en özel kareler burada sergilenecek.
                        Gelişmeler için bizi takipte kalın.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button variant="outline" size="lg" className="min-w-[160px] h-12 border-gray-300 hover:bg-gray-50 text-gray-700">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Ana Sayfa
                            </Button>
                        </Link>

                        <a href="https://instagram.com/vexturkiye" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="min-w-[160px] h-12 bg-primary hover:bg-red-700 text-white shadow-lg shadow-red-600/20">
                                <Instagram className="w-4 h-4 mr-2" />
                                Bizi Takip Edin
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-gray-100 py-6">
                <div className="container mx-auto px-6 text-center text-sm text-gray-400">
                    © 2026 VEX Türkiye. Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    )
}
