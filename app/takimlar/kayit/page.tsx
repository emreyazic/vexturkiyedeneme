'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    CheckCircle2, Circle, ExternalLink, FileText, Users,
    CreditCard, Mail, School, Globe, ChevronRight, ArrowRight,
    Sparkles, Shield, Award
} from 'lucide-react'

// Registration checklist
const checklistSteps = [
    {
        id: 1,
        title: 'REC Foundation Hesabı Oluştur',
        description: 'robotevents.com adresinde bir hesap oluşturun.',
        link: 'https://www.robotevents.com/auth/register',
        icon: Users,
        details: [
            'E-posta adresinizi girin',
            'Güçlü bir şifre oluşturun',
            'Hesap türü olarak "Team" seçin',
            'E-posta doğrulamasını tamamlayın'
        ]
    },
    {
        id: 2,
        title: 'Takım Bilgilerini Gir',
        description: 'Takımınızın okul, mentor ve iletişim bilgilerini ekleyin.',
        icon: School,
        details: [
            'Okul veya kurum adını girin',
            'Mentor bilgilerini ekleyin',
            'İletişim numarası ve adres',
            'Program seçimi (IQ, VRC, VEX U)'
        ]
    },
    {
        id: 3,
        title: 'Katılım Ücretini Öde',
        description: 'Yıllık takım kayıt ücretini ödeyin.',
        icon: CreditCard,
        details: [
            'Sistem Üzerinden Ödeme',
            'Sezonluk Takım Kaydı',
            'Uluslararası Kredi Kartı Geçerli',
            'Anında Sistem Aktivasyonu'
        ]
    },
    {
        id: 4,
        title: 'Takım Numaranı Al',
        description: 'Resmi takım numaranız atanacak (örn: 12345A).',
        icon: FileText,
        details: [
            'Otomatik numara atama',
            'Bölge kodu eklenir',
            'Takım rozeti indirilir',
            'Welcome kit gönderilir'
        ]
    },
    {
        id: 5,
        title: 'Turnuvalara Kayıt Ol',
        description: 'Yaklaşan turnuvalara katılım kaydı yapın.',
        icon: Globe,
        details: [
            'Bölgesel turnuvaları bulun',
            'Kayıt formunu doldurun',
            'Katılım ücretini ödeyin',
            'Takvime ekleyin'
        ]
    }
]

// Benefits
const benefits = [
    {
        icon: Globe,
        title: 'Uluslararası Tanınırlık',
        description: 'Resmi takım numaranızla dünya genelinde tanınırsınız.'
    },
    {
        icon: Award,
        title: 'Worlds Yolu',
        description: 'Dünya Şampiyonasına katılma hakkı kazanabilirsiniz.'
    },
    {
        icon: Shield,
        title: 'Resmi Yarışmalar',
        description: 'Yalnızca kayıtlı takımlar resmi turnuvalara katılabilir.'
    },
    {
        icon: Users,
        title: 'Topluluk',
        description: '90.000+ takımlık global VEX ailesinin parçası olun.'
    }
]

export default function TakimKayitPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    const toggleStep = (stepId: number) => {
        setCompletedSteps(prev =>
            prev.includes(stepId)
                ? prev.filter(id => id !== stepId)
                : [...prev, stepId]
        )
    }

    const progress = (completedSteps.length / checklistSteps.length) * 100

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Takım Kaydı"
                subtitle="RobotEvents.com üzerinden resmi VEX takımınızı oluşturun"
            />

            {/* Progress Bar */}
            <section className="py-8 bg-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Kayıt İlerlemesi</span>
                        <span className="text-primary font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-red-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-400">{completedSteps.length} / {checklistSteps.length} adım tamamlandı</span>
                        {completedSteps.length === checklistSteps.length && (
                            <span className="text-sm text-green-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Tamamlandı!
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Register */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-900">Neden Kayıt Olmalısınız?</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checklist Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Kayıt Rehberi</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Adım Adım Kayıt
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Aşağıdaki kontrol listesini takip ederek takımınızın resmi kaydını tamamlayın
                        </p>
                    </div>

                    <div className="space-y-4">
                        {checklistSteps.map((step, index) => {
                            const isCompleted = completedSteps.includes(step.id)
                            const Icon = step.icon

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-white rounded-2xl border-2 transition-all ${isCompleted
                                        ? 'border-green-500 bg-green-50/50'
                                        : 'border-gray-200 hover:border-primary/50'
                                        }`}
                                >
                                    <div
                                        onClick={() => toggleStep(step.id)}
                                        className="p-6 cursor-pointer"
                                    >
                                        <div className="flex items-start gap-4">
                                            <button className="mt-1 flex-shrink-0">
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                ) : (
                                                    <Circle className="w-6 h-6 text-gray-300" />
                                                )}
                                            </button>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-xs font-bold text-gray-400">ADIM {step.id}</span>
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Icon className="w-4 h-4 text-primary" />
                                                    </div>
                                                </div>
                                                <h3 className={`text-lg font-semibold mb-1 ${isCompleted ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3">{step.description}</p>

                                                <ul className="grid grid-cols-2 gap-2">
                                                    {step.details.map((detail, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                                            <ChevronRight className="w-3 h-3 text-primary" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {step.link && (
                                                    <a
                                                        href={step.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
                                                    >
                                                        Sayfaya Git <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Hemen Başlayın
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        robotevents.com&apos;a gidin ve takımınızı kaydedin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://www.robotevents.com" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                                robotevents.com
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </a>
                        <Link href="/iletisim/bize-ulasin">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white/20">
                                Yardım Gerekiyor mu?
                                <Mail className="w-4 h-4 ml-2" />
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
