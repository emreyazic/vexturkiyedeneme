'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Download, Monitor, Smartphone, Tablet, Check, X,
    Code, Blocks, Cpu, ChevronRight, ExternalLink, Play
} from 'lucide-react'

// Programming languages
const languages = [
    {
        id: 'blocks',
        name: 'Blok Tabanlı',
        icon: Blocks,
        color: '#00A651',
        description: 'Kodlamanın En Görsel ve Eğlenceli Hali',
        ageRange: '8-12 yaş',
        pros: [
            'Sıfır yazım hatası ile %100 mantık odaklı öğrenme',
            'Hızlı prototipleme ile fikirleri saniyeler içinde teste dönüştürme',
            'Bloktan metne (Blocks to Text) özelliği ile Python/C++ kod karşılığını anlık görme',
            'Görsel arayüz sayesinde soyut kavramların somutlaşması'
        ]
    },
    {
        id: 'python',
        name: 'Python',
        icon: Code,
        color: '#3776AB',
        description: 'Geleceğin Diliyle Yapay Zekaya Hazırlık',
        ageRange: '12+ yaş',
        pros: [
            'Temiz ve anlaşılır kod yapısı ile hızlı öğrenme eğrisi',
            'Veri bilimi ve makine öğrenimi kütüphanelerine aşinalık',
            'Daha az satırla daha karmaşık otonom rotalar oluşturma gücü',
            'Akademik ve profesyonel kariyere doğrudan hazırlık'
        ]
    },
    {
        id: 'cpp',
        name: 'C++',
        icon: Cpu,
        color: '#00599C',
        description: 'Profesyonellerin Gücü ve Maksimum Performans',
        ageRange: '14+ yaş',
        pros: [
            'Donanım seviyesinde (Hardware Level) tam kontrol ve erişim',
            'Yarışma sahasında milisaniyelik hız avantajı',
            'Gömülü sistemler ve oyun motorlarında endüstri standardı deneyim',
            'Bellek yönetimi ve kaynak kullanımında sınırsız özgürlük'
        ]
    }
]

// Fix: Define Laptop icon (lucide doesn't have it, use a substitute)
const Laptop = Monitor

// Download platforms
const platforms = [
    { id: 'windows', name: 'Windows', icon: Monitor, versions: ['Windows 10+', 'Windows 11'] },
    { id: 'mac', name: 'macOS', icon: Monitor, versions: ['macOS 11+', 'Intel & Apple Silicon'] },
    { id: 'chromebook', name: 'Chromebook', icon: Laptop, versions: ['Chrome OS'] },
    { id: 'ios', name: 'iPad', icon: Tablet, versions: ['iPadOS 14+'] },
    { id: 'android', name: 'Android', icon: Tablet, versions: ['Android 8+'] }
]

// Language Selector Card
function LanguageCard({ lang, isSelected, onClick }: {
    lang: typeof languages[0];
    isSelected: boolean;
    onClick: () => void
}) {
    const Icon = lang.icon

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${isSelected
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
        >
            <div className="flex items-center gap-4 mb-4">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${lang.color}15` }}
                >
                    <Icon className="w-7 h-7" style={{ color: lang.color }} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{lang.name}</h3>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{lang.description}</p>
            <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{lang.ageRange}</span>
                {isSelected && (
                    <span className="text-xs px-2 py-1 bg-primary text-white rounded">Seçili</span>
                )}
            </div>
        </motion.div>
    )
}

// Comparison Table
function ComparisonTable({ selectedLang }: { selectedLang: string }) {
    const lang = languages.find(l => l.id === selectedLang)
    if (!lang) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: `${lang.color}10` }}>
                <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: lang.color }}>
                    <lang.icon className="w-6 h-6" />
                    {lang.name} Karşılaştırması
                </h3>
            </div>
            <div className="grid md:grid-cols-1">
                {/* Pros */}
                <div className="p-6">
                    <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Artılar
                    </h4>
                    <ul className="space-y-3">
                        {lang.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {pro}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

// Download Card
function DownloadCard({ platform }: { platform: typeof platforms[0] }) {
    const Icon = platform.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all group text-center"
        >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors mx-auto">
                <Icon className="w-7 h-7 text-gray-600 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{platform.name}</h3>
            <p className="text-sm text-gray-500">{platform.versions.join(' / ')}</p>
        </motion.div>
    )
}

export default function YazilimPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedLang, setSelectedLang] = useState('blocks')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="VEXcode Yazılım İstasyonu"
                subtitle="Robotunuzu hayata geçirin - hangi programlama dili size uygun?"
            />

            {/* Language Selector */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <Code className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Dil Seçici</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Hangi Dil Sana Uygun?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Deneyim seviyenize ve hedeflerinize göre ideal programlama dilini seçin
                        </p>
                    </div>

                    {/* Language Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {languages.map(lang => (
                            <LanguageCard
                                key={lang.id}
                                lang={lang}
                                isSelected={selectedLang === lang.id}
                                onClick={() => setSelectedLang(lang.id)}
                            />
                        ))}
                    </div>

                    {/* Comparison Table */}
                    <AnimatePresence mode="wait">
                        <ComparisonTable key={selectedLang} selectedLang={selectedLang} />
                    </AnimatePresence>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-16 md:py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                            <Download className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">İndirmeler</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Her Platformda VEXcode
                        </h2>
                        <p className="text-gray-600">Cihazınıza uygun versiyonu indirin</p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {platforms.map(platform => (
                            <DownloadCard key={platform.id} platform={platform} />
                        ))}
                    </div>

                    {/* Central Download Button */}
                    <div className="flex justify-center mt-10">
                        <a href="https://www.vexrobotics.com/vexcode" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                                <Download className="w-5 h-5 mr-2" />
                                VEXcode İndir
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
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
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                                <li><a href="/kaynaklar/mufredat" className="text-gray-400 hover:text-primary transition-colors">Müfredatlar</a></li>
                                <li><a href="/kaynaklar/juri" className="text-gray-400 hover:text-primary transition-colors">Jüri & Değerlendirme</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Takımlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/takimlar/harita" className="text-gray-400 hover:text-primary transition-colors">Takım Haritası</a></li>
                                <li><a href="/takimlar/nasil-kurulur" className="text-gray-400 hover:text-primary transition-colors">Nasıl Kurulur?</a></li>
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
