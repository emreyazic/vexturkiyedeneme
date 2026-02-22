'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    BookOpen, FileText, Video, Download, ExternalLink,
    Users, Award, Target, Wrench, Code, Lightbulb,
    CheckCircle2, ChevronRight, Mail, Play
} from 'lucide-react'

// Resource categories
const resources = [
    {
        id: 'notebook',
        title: 'Mühendislik Defteri',
        icon: BookOpen,
        color: '#E31837',
        description: 'Jürileri etkileyen profesyonel defter örnekleri',
        items: [
            { name: 'Defter Şablonu (PDF)', type: 'PDF', size: '2.4 MB' },
            { name: 'Örnek Sayfa Düzenleri', type: 'PDF', size: '5.1 MB' },
            { name: 'Rubrik & Değerlendirme Kriterleri', type: 'PDF', size: '1.2 MB' },
            { name: 'Excellence Kazanan Defter Örneği', type: 'PDF', size: '8.7 MB' }
        ]
    },
    {
        id: 'judging',
        title: 'Jüri Değerlendirmesi',
        icon: Award,
        color: '#FFD700',
        description: 'Ödül kategorileri ve değerlendirme kriterleri',
        items: [
            { name: 'Jüri Mülakat Rehberi', type: 'PDF', size: '1.8 MB' },
            { name: 'Ödül Rubric (IQ)', type: 'PDF', size: '980 KB' },
            { name: 'Ödül Rubric (VRC)', type: 'PDF', size: '1.1 MB' },
            { name: 'Sunum İpuçları', type: 'Video', size: '12 dakika' }
        ]
    },
    {
        id: 'strategy',
        title: 'Strateji & Oyun Analizi',
        icon: Target,
        color: '#00AEEF',
        description: 'Sezon teması ve yarışma stratejileri',
        items: [
            { name: 'High Stakes Oyun Kuralları', type: 'PDF', size: '4.2 MB' },
            { name: 'Scouting Sheet Şablonu', type: 'Excel', size: '450 KB' },
            { name: 'Maç Stratejisi Planlayıcı', type: 'PDF', size: '1.5 MB' },
            { name: 'Autonomous Rota Planlama', type: 'PDF', size: '2.1 MB' }
        ]
    },
    {
        id: 'build',
        title: 'Robot Yapımı',
        icon: Wrench,
        color: '#00A651',
        description: 'Mekanik tasarım ve yapım teknikleri',
        items: [
            { name: 'Başlangıç Robot Planı', type: 'PDF', size: '3.5 MB' },
            { name: 'Dişli Oranları Hesaplayıcı', type: 'Excel', size: '320 KB' },
            { name: 'CAD Modelleri (V5)', type: 'ZIP', size: '45 MB' },
            { name: 'Montaj Video Serisi', type: 'Video', size: '8 video' }
        ]
    },
    {
        id: 'coding',
        title: 'Programlama',
        icon: Code,
        color: '#6B21A8',
        description: 'VEXcode ve otonom programlama kaynakları',
        items: [
            { name: 'VEXcode Başlangıç Rehberi', type: 'PDF', size: '2.8 MB' },
            { name: 'PID Kontrol Örnek Kodlar', type: 'GitHub', size: 'Repo' },
            { name: 'Autonomous Template', type: 'GitHub', size: 'Repo' },
            { name: 'Sensor Kullanım Kılavuzu', type: 'PDF', size: '1.9 MB' }
        ]
    },
    {
        id: 'mentoring',
        title: 'Mentorluk İpuçları',
        icon: Lightbulb,
        color: '#F7941D',
        description: 'Etkili mentorluk için pratik tavsiyeler',
        items: [
            { name: 'Mentor El Kitabı', type: 'PDF', size: '4.5 MB' },
            { name: 'Haftalık Pratik Planı', type: 'PDF', size: '1.2 MB' },
            { name: 'Takım Yönetimi Şablonları', type: 'Excel', size: '580 KB' },
            { name: 'Öğrenci Motivasyon Teknikleri', type: 'PDF', size: '890 KB' }
        ]
    }
]

// Mentor tips
const mentorTips = [
    'Öğrencilerin kendi kararlarını vermesine izin verin',
    'Hata yapmayı öğrenme fırsatı olarak değerlendirin',
    'Mühendislik tasarım sürecini (EDP) vurgulayın',
    'Jüri mülakatları için sunum pratiği yaptırın',
    'Takım içi iletişimi ve iş birliğini teşvik edin',
    'Yarışma stresini yönetme stratejileri geliştirin'
]

// Resource Card Component with hover details
function ResourceCard({ resource }: { resource: typeof resources[0] }) {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = resource.icon

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video': return <Play className="w-3 h-3" />
            case 'GitHub': return <ExternalLink className="w-3 h-3" />
            default: return <Download className="w-3 h-3" />
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            {/* Header */}
            <div
                className="p-6 relative overflow-hidden"
                style={{ backgroundColor: `${resource.color}10` }}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: resource.color }}
                        >
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{resource.title}</h3>
                            <p className="text-sm text-gray-600">{resource.items.length} kaynak</p>
                        </div>
                    </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{resource.description}</p>

                {/* Decorative element */}
                <div
                    className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10"
                    style={{ backgroundColor: resource.color }}
                />
            </div>

            {/* Items */}
            <div className="p-4 border-t border-gray-100">
                <motion.div
                    animate={{ height: isHovered ? 'auto' : '120px' }}
                    className="overflow-hidden"
                >
                    <div className="space-y-2">
                        {resource.items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isHovered || index < 2 ? 1 : 0.5, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${resource.color}20` }}
                                    >
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span className="px-1.5 py-0.5 bg-gray-200 rounded">{item.type}</span>
                                            <span>{item.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {!isHovered && resource.items.length > 2 && (
                    <p className="text-xs text-center text-gray-400 mt-2">
                        Daha fazlasını görmek için üzerine gelin
                    </p>
                )}
            </div>
        </motion.div>
    )
}

export default function MentorPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Mentor Köşesi"
                subtitle="Takımınızı zirveye taşıyacak kaynaklar ve araçlar"
            />

            {/* Toolbox Hero */}
            <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Wrench className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Mentor Alet Çantası</h2>
                                <p className="text-gray-400">Tüm kaynaklar tek bir yerde</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">{resources.length}</div>
                                <div className="text-sm text-gray-400">Kategori</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-500">
                                    {resources.reduce((acc, r) => acc + r.items.length, 0)}
                                </div>
                                <div className="text-sm text-gray-400">Kaynak</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-500">∞</div>
                                <div className="text-sm text-gray-400">Değer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Kaynaklar</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Kategorilere Göz Atın
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Her kategorinin üzerine gelerek detaylı kaynak listesini görüntüleyin
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mentor Tips */}
            <section className="py-16 md:py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
                            <Lightbulb className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-700">Altın Kurallar</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Etkili Mentorluk İpuçları
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {mentorTips.map((tip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                            >
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{tip}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Mentor Topluluğuna Katılın
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Deneyimlerinizi paylaşın, sorular sorun, birlikte büyüyün
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim/bize-ulasin">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                                İletişime Geç
                                <Mail className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/takimlar/nasil-kurulur">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white/20">
                                Takım Kurma Rehberi
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
                                <li><a href="/yarismalar/oduller" className="text-gray-400 hover:text-primary transition-colors">Ödüller</a></li>
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
