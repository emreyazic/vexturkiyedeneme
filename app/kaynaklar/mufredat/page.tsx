'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Filter, Clock, BookOpen, GraduationCap, Download,
    ChevronRight, Blocks, Cog, Cpu, Star, CheckCircle2
} from 'lucide-react'

// Lesson plans database
const lessonPlans = [
    {
        id: 1,
        title: 'VEX GO ile Robotik Giriş',
        description: 'Küçük mühendisler için robotik temelleri',
        platform: 'GO',
        duration: 45,
        grade: '1-3. Sınıf',
        topics: ['Basit Makineler', 'Dişliler', 'Hareket'],
        stemLab: 'GO STEM Lab',
        featured: true
    },
    {
        id: 2,
        title: 'Dişli Oranları Keşfi',
        description: 'Dişli mekaniklerini uygulamalı öğrenin',
        platform: 'IQ',
        duration: 45,
        grade: '4-6. Sınıf',
        topics: ['Dişli Oranları', 'Hız vs Tork', 'Hesaplamalar'],
        stemLab: 'IQ STEM Lab'
    },
    {
        id: 3,
        title: 'Sensörler ve Otomasyon',
        description: 'Robotunuzu akıllı hale getirin',
        platform: 'IQ',
        duration: 90,
        grade: '5-7. Sınıf',
        topics: ['Mesafe Sensörü', 'Renk Sensörü', 'Koşullu Mantık'],
        stemLab: 'IQ STEM Lab'
    },
    {
        id: 4,
        title: 'Otonom Programlama Temelleri',
        description: 'İlk otonom rutininizi yazın',
        platform: 'V5',
        duration: 90,
        grade: '7-10. Sınıf',
        topics: ['VEXcode', 'Motor Kontrol', 'Timing'],
        stemLab: 'V5 STEM Lab',
        featured: true
    },
    {
        id: 5,
        title: 'PID Kontrol Sistemleri',
        description: 'Hassas robot hareketi için PID öğrenin',
        platform: 'V5',
        duration: 90,
        grade: '9-12. Sınıf',
        topics: ['PID Teorisi', 'Tuning', 'İmplementasyon'],
        stemLab: 'V5 STEM Lab'
    },
    {
        id: 6,
        title: 'Mühendislik Tasarım Süreci',
        description: 'EDP ile problem çözme',
        platform: 'V5',
        duration: 45,
        grade: '6-10. Sınıf',
        topics: ['Tanımlama', 'Prototipleme', 'Test'],
        stemLab: 'V5 STEM Lab'
    },
    {
        id: 7,
        title: 'Basit Taşıma Robotu',
        description: 'İlk çalışan robotunuzu yapın',
        platform: 'GO',
        duration: 45,
        grade: '2-4. Sınıf',
        topics: ['Montaj', 'Motorlar', 'Test'],
        stemLab: 'GO STEM Lab'
    },
    {
        id: 8,
        title: 'Kol Mekanizması Tasarımı',
        description: 'Esnek kol sistemleri geliştirin',
        platform: 'IQ',
        duration: 90,
        grade: '5-8. Sınıf',
        topics: ['Kaldıraç', 'Kol Oranları', 'Kavrama'],
        stemLab: 'IQ STEM Lab'
    },
    {
        id: 9,
        title: 'Veri Analizi ve Deneyler',
        description: 'Bilimsel yöntemle robot test',
        platform: 'V5',
        duration: 90,
        grade: '8-12. Sınıf',
        topics: ['Hipotez', 'Veri Toplama', 'Analiz'],
        stemLab: 'V5 STEM Lab'
    }
]

// Platform info
const platformInfo = {
    GO: { color: '#00A651', icon: Blocks, label: 'VEX GO' },
    IQ: { color: '#F7941D', icon: Cog, label: 'VEX IQ' },
    V5: { color: '#E31837', icon: Cpu, label: 'VEX V5' }
}

// Filter options
const platforms = ['Tümü', 'GO', 'IQ', 'V5']
const durations = ['Tümü', '45 dk', '90 dk']

// Lesson Card Component
function LessonCard({ lesson }: { lesson: typeof lessonPlans[0] }) {
    const platform = platformInfo[lesson.platform as keyof typeof platformInfo]
    const Icon = platform.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
        >
            {/* Header */}
            <div
                className="p-4 flex items-center justify-between"
                style={{ backgroundColor: `${platform.color}10` }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: platform.color }}
                    >
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: platform.color }}>{platform.label}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {lesson.duration} dk
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {lesson.featured && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded mb-2">
                        <Star className="w-3 h-3" />
                        Öne Çıkan
                    </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                    {lesson.topics.map((topic, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                            {topic}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{lesson.grade}</span>
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
                        Detaylar
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default function MufredatPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedPlatform, setSelectedPlatform] = useState('Tümü')
    const [selectedDuration, setSelectedDuration] = useState('Tümü')

    // Filtered lessons
    const filteredLessons = useMemo(() => {
        let results = [...lessonPlans]

        if (selectedPlatform !== 'Tümü') {
            results = results.filter(l => l.platform === selectedPlatform)
        }

        if (selectedDuration !== 'Tümü') {
            const duration = parseInt(selectedDuration)
            results = results.filter(l => l.duration === duration)
        }

        return results
    }, [selectedPlatform, selectedDuration])

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="STEM Labs Müfredatları"
                subtitle="Öğretmenler için hazır ders planları ve aktiviteler"
            />

            {/* STEM Labs Info */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">VEX STEM Labs</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Ücretsiz Eğitim Platformu
                            </h2>
                            <p className="text-gray-600 mb-6">
                                VEX Education STEM Labs, öğretmenler için tamamen ücretsiz ders planları,
                                aktiviteler ve değerlendirme materyalleri sunar.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {[
                                    'Her seviyeye uygun içerikler',
                                    'NGSS standartlarına uyumlu',
                                    'Hazır sunum ve çalışma kağıtları',
                                    'Video destekli anlatımlar'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-3">
                                <a href="https://education.vex.com/stemlabs" target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-primary hover:bg-primary/90">
                                        STEM Labs&apos;e Git
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                                <a href="https://educathub.com/mufredatlarimiz/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-red-800">
                                        Müfredatlar
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: 'VEX GO', count: '50+', desc: 'Ders Planı', color: '#00A651' },
                                { title: 'VEX IQ', count: '80+', desc: 'Ders Planı', color: '#F7941D' },
                                { title: 'VEX V5', count: '100+', desc: 'Ders Planı', color: '#E31837' },
                                { title: 'Video', count: '200+', desc: 'Eğitim Videosu', color: '#1E3A8A' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200"
                                >
                                    <div
                                        className="text-3xl font-bold mb-1"
                                        style={{ color: item.color }}
                                    >
                                        {item.count}
                                    </div>
                                    <div className="text-sm text-gray-600">{item.desc}</div>
                                    <div className="text-xs text-gray-400 mt-1">{item.title}</div>
                                </motion.div>
                            ))}
                        </div>
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
