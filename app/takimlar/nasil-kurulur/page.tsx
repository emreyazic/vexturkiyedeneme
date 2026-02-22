'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Users, FileText, Package, Code, Trophy, Rocket,
    CheckCircle2, Star, Zap, Target, Flag, ChevronRight,
    ArrowRight, Sparkles
} from 'lucide-react'

// Quest Levels
const questLevels = [
    {
        level: 1,
        title: 'KAYIT',
        subtitle: 'Maceraya Başlangıç',
        icon: FileText,
        color: '#00A651',
        description: 'REC Foundation üzerinden takım kaydınızı yapın ve resmi takım numaranızı alın.',
        tasks: [
            'robotevents.com hesabı oluşturun',
            'Takım bilgilerini girin (okul, mentor)',
            'Takım numarası edinin (örn: 12345A)',
            'Katılım ücretini ödeyin'
        ],
        reward: '🎖️ Resmi VEX Takımı Kimliği',
        duration: '1-2 Gün'
    },
    {
        level: 2,
        title: 'ROBOT KİTİ',
        subtitle: 'Ekipmanı Topla',
        icon: Package,
        color: '#00AEEF',
        description: 'Programınıza uygun robot kitini ve gerekli parçaları temin edin.',
        tasks: [
            'Program seçimi (VEX IQ, V5, VEX U)',
            'Starter kit siparişi',
            'Ek parça ve sensör listesi hazırlama',
            'Çalışma alanı düzenleme'
        ],
        reward: '🤖 Komple Robot Kiti',
        duration: '1-2 Hafta'
    },
    {
        level: 3,
        title: 'İLK KOD',
        subtitle: 'Robotu Uyandır',
        icon: Code,
        color: '#F7941D',
        description: 'VEXcode ile ilk programınızı yazın ve robotunuzu hareket ettirin.',
        tasks: [
            'VEXcode programını indirin',
            'Motor ve sensör bağlantılarını yapın',
            'Basit bir hareket kodu yazın',
            '"Hello World" testini geçin'
        ],
        reward: '💻 İlk Çalışan Program',
        duration: '1 Hafta'
    },
    {
        level: 4,
        title: 'TASARIM',
        subtitle: 'Geliştir & İyileştir',
        icon: Target,
        color: '#E31837',
        description: 'Mühendislik tasarım sürecini kullanarak robotunuzu geliştirin.',
        tasks: [
            'Oyun kurallarını analiz edin',
            'Strateji belirleyin',
            'Prototip oluşturun ve test edin',
            'Mühendislik defteri tutun'
        ],
        reward: '📓 Mühendislik Defteri',
        duration: '2-4 Hafta'
    },
    {
        level: 5,
        title: 'ANTİRENMAN',
        subtitle: 'Pratik Yap',
        icon: Zap,
        color: '#6B21A8',
        description: 'Yarışma simülasyonları yapın, driver skills ve autonomous geliştirin.',
        tasks: [
            'Driver Skills pratikleri',
            'Autonomous rutinler programlayın',
            'Takım rollerini belirleyin',
            'Zaman yönetimi geliştirin'
        ],
        reward: '⚡ Yarışma Hazırlığı',
        duration: 'Sürekli'
    },
    {
        level: 6,
        title: 'TURNUVA',
        subtitle: 'Sahneye Çık',
        icon: Trophy,
        color: '#1E3A8A',
        description: 'İlk turnuvanıza katılın ve gerçek yarışma deneyimi kazanın!',
        tasks: [
            'Turnuvaya kayıt olun',
            'Robot check-in hazırlığı',
            'Pit alanı düzenleme',
            'İlk maçınızı yapın!'
        ],
        reward: '🏆 Yarışma Deneyimi',
        duration: '1 Gün'
    }
]

// Level Card Component
function LevelCard({ quest, index, isUnlocked }: { quest: typeof questLevels[0]; index: number; isUnlocked: boolean }) {
    const Icon = quest.icon
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex gap-6 flex-col items-center md:items-stretch ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Timeline Node */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-10 relative left-0 translate-x-0 order-1 md:order-none mb-4 md:mb-0">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-colors ${isUnlocked ? '' : 'grayscale opacity-50'
                        }`}
                    style={{ backgroundColor: quest.color }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded">
                        LEVEL {quest.level}
                    </span>
                </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-5/12 order-2 md:order-none ${index % 2 === 0 ? 'text-center md:text-right md:pr-12' : 'text-center md:text-left md:pl-12'}`}>
                <motion.div
                    className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer ${isExpanded ? 'ring-2 ring-offset-2 ring-primary' : ''
                        }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className={`flex items-center gap-2 mb-2 justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <h3 className="text-xl font-bold text-gray-900 whitespace-normal">{quest.title}</h3>
                        <Star className="w-5 h-5 flex-shrink-0" style={{ color: quest.color }} />
                    </div>
                    <p className="text-sm text-gray-500 mb-3 whitespace-normal">{quest.subtitle}</p>
                    <p className="text-gray-600 text-sm whitespace-normal">{quest.description}</p>

                    {/* Expanded Content */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <div className={`mt-4 pt-4 border-t border-gray-200 ${index % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Görevler:</h4>
                            <ul className={`space-y-1.5 inline-block text-left w-full ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                {quest.tasks.map((task, i) => (
                                    <li
                                        key={i}
                                        className={`flex items-center gap-2 text-sm text-gray-600 ${index % 2 === 0 ? 'flex-row md:flex-row-reverse' : ''
                                            }`}
                                    >
                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: quest.color }} />
                                        <span className="whitespace-normal">{task}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={`flex gap-4 mt-4 justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                                    <span className="text-xs text-gray-500 block">Süre</span>
                                    <div className="text-sm font-medium text-gray-900">{quest.duration}</div>
                                </div>
                                <div className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${quest.color}15` }}>
                                    <span className="text-xs text-gray-500 block">Ödül</span>
                                    <div className="text-sm font-medium">{quest.reward}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className={`flex items-center gap-1 mt-3 text-xs justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`} style={{ color: quest.color }}>
                        {isExpanded ? 'Detayları gizle' : 'Detayları göster'}
                        <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                </motion.div>
            </div>

            {/* Empty Space for other side */}
            <div className="hidden md:block md:w-5/12" />
        </motion.div>
    )
}

export default function NasilKurulurPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="VEX Quest: Takım Kurulum Rehberi"
                subtitle="Maceraya başlamak için aşamaları tamamla!"
            />

            {/* Quest Intro */}
            <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                                <Rocket className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Yeni Macera Başlıyor!</h2>
                                <p className="text-gray-400">6 level tamamlayarak VEX takımınızı kurun</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">6</div>
                                <div className="text-sm text-gray-400">Level</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-500">24</div>
                                <div className="text-sm text-gray-400">Görev</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-500">6</div>
                                <div className="text-sm text-gray-400">Ödül</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quest Timeline */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    {/* Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-orange-500 to-blue-900 rounded-full" />

                        {/* Quest Levels */}
                        <div className="space-y-16">
                            {questLevels.map((quest, index) => (
                                <LevelCard
                                    key={quest.level}
                                    quest={quest}
                                    index={index}
                                    isUnlocked={true}
                                />
                            ))}
                        </div>

                        {/* End Flag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative flex justify-center mt-12"
                        >
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center shadow-lg">
                                <Flag className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -bottom-8 whitespace-nowrap">
                                <span className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-full">
                                    🎉 MACERA TAMAMLANDI!
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="py-16 md:py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Hızlı Başlangıç</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Bugün Harekete Geç
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">1. Kayıt Ol</h3>
                            <p className="text-gray-600 text-sm mb-4">robotevents.com&apos;da takımınızı kaydedin</p>
                            <Link href="/takimlar/kayit">
                                <Button className="bg-green-600 hover:bg-green-700 w-full">
                                    Kayıt Rehberi
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Package className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">2. Programını Seç</h3>
                            <p className="text-gray-600 text-sm mb-4">Programınıza uygun robot kitini edinin</p>
                            <Link href="/vex-nedir">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                                    Programları İncele
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">3. Yarışmaya Başla</h3>
                            <p className="text-gray-600 text-sm mb-4">Takvimde yerini al!</p>
                            <Link href="/yarismalar/etkinlik-takvimi">
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">
                                    Etkinlik Takvimi
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Macerana Hazır mısın?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Şimdi ilk adımı at, VEX ailesine katıl!
                    </p>
                    <a href="https://www.robotevents.com" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                            Macerayı Başlat
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
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
                            <h3 className="text-lg font-semibold mb-6">Takımlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/takimlar/harita" className="text-gray-400 hover:text-primary transition-colors">Takım Haritası</a></li>
                                <li><a href="/takimlar/nasil-kurulur" className="text-gray-400 hover:text-primary transition-colors">Nasıl Kurulur?</a></li>
                                <li><a href="/takimlar/kayit" className="text-gray-400 hover:text-primary transition-colors">Takım Kaydı</a></li>
                                <li><a href="/takimlar/mentor" className="text-gray-400 hover:text-primary transition-colors">Mentor Desteği</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Sonuçlar</a></li>
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
