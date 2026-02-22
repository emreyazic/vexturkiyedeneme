'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import { SanityWorldQualifier, getCurrentSeasonQualifiers } from '@/lib/sanity-queries'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trophy, Globe, Users, Calendar, MapPin, CheckCircle2,
    ArrowRight, Star, Plane, Flag, Medal, Target, Award
} from 'lucide-react'

// Timeline steps
const timelineSteps = [
    {
        id: 1,
        title: 'Takım Kaydı',
        date: 'Eylül - Ekim',
        description: 'robotevents.com üzerinden takımınızı kaydedin ve sezon için hazırlanın.',
        icon: Users,
        color: '#00A651',
        details: ['REC Foundation hesabı oluşturma', 'Takım numarası alma', 'Mentor ve öğrenci kaydı']
    },
    {
        id: 2,
        title: 'Bölgesel Turnuvalar',
        date: 'Kasım - Şubat',
        description: 'Türkiye genelindeki bölgesel turnuvalara katılarak deneyim kazanın.',
        icon: Flag,
        color: '#00AEEF',
        details: ['Minimum 2 turnuvaya katılım', 'Robot Skills puanları toplama', 'Mühendislik defteri geliştirme']
    },
    {
        id: 3,
        title: 'Robot Skills Sıralaması',
        date: 'Sezon Boyunca',
        description: 'Driver ve Programming Skills turnuvalarında yüksek puanlar toplayın.',
        icon: Target,
        color: '#F7941D',
        details: ['Driver Skills (60 saniye)', 'Programming Skills (60 saniye)', 'Türkiye ve dünya sıralaması']
    },
    {
        id: 4,
        title: 'Türkiye Şampiyonası',
        date: '28 Şubat 2026',
        description: 'Ulusal şampiyonada En üst düzey ödülleri kazanarak Worlds\'e hak kazanın.',
        icon: Trophy,
        color: '#E31837',
        details: ['Excellence Award', 'Tournament Champion', 'Skills Champion', 'Design Award']
    },
    {
        id: 5,
        title: 'Worlds Daveti',
        date: 'Mart',
        description: 'Resmi davet mektubunuzu alın ve vize/seyahat hazırlıklarına başlayın.',
        icon: Star,
        color: '#6B21A8',
        details: ['Davet mektubunun alınması', 'ABD vizesi başvurusu', 'Konaklama ve uçuş planlaması']
    },
    {
        id: 6,
        title: 'VEX Worlds 2026',
        date: '25-30 Nisan 2026',
        description: 'Dallas, Texas\'ta dünyanın en büyük robotik yarışmasına katılın!',
        icon: Globe,
        color: '#1E3A8A',
        details: ['3000+ takım', '50+ ülke', '6 günlük etkinlik', 'Ömürlük deneyim']
    }
]

// VEX Worlds stats
const worldsStats = [
    { value: '3000+', label: 'Katılan Takım' },
    { value: '50+', label: 'Ülke' },
    { value: '30K+', label: 'Öğrenci' },
    { value: '$1M+', label: 'Burs Fırsatı' }
]



// Boarding Pass Card Component
function BoardingPassCard({ qualifier }: { qualifier: SanityWorldQualifier }) {
    const [isHovered, setIsHovered] = useState(false)
    const isVRC = qualifier.team?.platform === 'vex-v5'
    const accentColor = isVRC ? '#E31837' : '#6B21A8'
    const accentBg = isVRC ? 'bg-red-500' : 'bg-purple-600'
    const accentLight = isVRC ? 'bg-red-50' : 'bg-purple-50'
    const platformLabel = isVRC ? 'V5 Push Back' : 'IQ Rapid Relay'

    // Get photo: prefer teamPhoto, fallback to team logo
    const photoSource = qualifier.teamPhoto || qualifier.team?.logo

    return (
        <motion.div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Hover Stamp */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: -12, scale: 1 }}
                        exit={{ opacity: 0, rotate: -20, scale: 0.5 }}
                        className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border-2 border-white"
                    >
                        VEX Worlds 2026 ✓
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-shadow duration-300 ${isHovered ? 'shadow-2xl' : ''}`}
                style={isHovered ? { boxShadow: `0 0 0 2px ${accentColor}` } : {}}>

                {/* Top Color Bar */}
                <div className={`h-2 ${accentBg}`} />

                <div className="flex flex-col md:flex-row">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 p-5 md:p-6">
                        <div className="flex items-start gap-4">
                            {/* Team Photo */}
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl ${accentLight} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                                {photoSource ? (
                                    <Image
                                        src={urlFor(photoSource).width(200).height(200).url()}
                                        alt={qualifier.team?.name || 'Team'}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Users className="w-10 h-10" style={{ color: accentColor }} />
                                )}
                            </div>

                            {/* Team Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                                    {qualifier.team?.name}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base truncate">
                                    {qualifier.team?.schoolOrOrganization}
                                </p>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{qualifier.team?.city}</span>
                                </div>
                                <div className="mt-2">
                                    <span
                                        className="inline-block text-xs font-medium px-2 py-1 rounded-full"
                                        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                                    >
                                        {platformLabel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Perforated Divider */}
                    <div className="relative hidden md:flex items-center">
                        <div className="w-px h-full border-l-2 border-dashed border-gray-300" />
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-100 rounded-full" />
                        <div className="absolute -left-3 bottom-0 w-6 h-6 bg-gray-100 rounded-full" />
                    </div>

                    {/* Mobile Divider */}
                    <div className="md:hidden px-5 py-2">
                        <div className="border-t-2 border-dashed border-gray-300 relative">
                            <div className="absolute -left-5 -top-3 w-6 h-6 bg-gray-100 rounded-full" />
                            <div className="absolute -right-5 -top-3 w-6 h-6 bg-gray-100 rounded-full" />
                        </div>
                    </div>

                    {/* Right Section - Stub */}
                    <div className="md:w-48 p-5 md:p-6 flex flex-col justify-center">
                        <div className="space-y-3">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Destination</div>
                                <div className="font-bold text-gray-900 flex items-center gap-1">
                                    <Plane className="w-4 h-4" style={{ color: accentColor }} />
                                    DFW (Dallas)
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Gate</div>
                                <div className="font-semibold text-sm" style={{ color: accentColor }}>
                                    {qualifier.qualificationMethod}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Team No</div>
                                <div className="font-mono font-bold text-lg text-gray-900">
                                    {qualifier.team?.teamNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Dallas Ambassadors Section Component
function DallasAmbassadorsSection() {
    const [filter, setFilter] = useState<'all' | 'vex-v5' | 'vex-iq'>('all')
    const [qualifiers, setQualifiers] = useState<SanityWorldQualifier[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchQualifiers() {
            try {
                const data = await getCurrentSeasonQualifiers()
                setQualifiers(data)
            } catch (error) {
                console.error('Error fetching qualifiers:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchQualifiers()
    }, [])

    const filteredQualifiers = qualifiers.filter(q => {
        if (filter === 'all') return true
        return q.team?.platform === filter
    })

    const vrcCount = qualifiers.filter(q => q.team?.platform === 'vex-v5').length
    const iqCount = qualifiers.filter(q => q.team?.platform === 'vex-iq').length


    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                        <Plane className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Dallas 2026</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Türkiye'nin Dallas Elçileri
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        2025-2026 Sezonunda VEX Worlds'e giden yolculuğumuzda bizi temsil eden yıldız takımlarımız.
                    </p>
                </div>

                {/* Platform Filter */}
                <div className="flex justify-center gap-2 mb-10">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === 'all'
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        Hepsi ({qualifiers.length})
                    </button>
                    <button
                        onClick={() => setFilter('vex-v5')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === 'vex-v5'
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300'
                            }`}
                    >
                        V5 Push Back ({vrcCount})
                    </button>
                    <button
                        onClick={() => setFilter('vex-iq')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === 'vex-iq'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
                            }`}
                    >
                        IQ Rapid Relay ({iqCount})
                    </button>
                </div>

                {/* Teams Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <AnimatePresence mode="wait">
                        {filteredQualifiers.map((qualifier, index) => (
                            <motion.div
                                key={qualifier._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BoardingPassCard qualifier={qualifier} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2].map(i => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && qualifiers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plane className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Henüz bu sezon için kalifiye olan bir takım bulunmuyor.
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Türkiye Şampiyonası sonrası kalifiye takımlar burada görüntülenecektir.
                        </p>
                    </div>
                )}

                {/* No Results in Filter */}
                {!isLoading && qualifiers.length > 0 && filteredQualifiers.length === 0 && (
                    <div className="text-center py-12">
                        <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Bu kategoride kalifiye takım bulunmuyor.</p>
                    </div>
                )}
            </div>
        </section>
    )
}


export default function DunyaSampiyonasiPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="VEX Worlds"
                subtitle="Türkiye'den Dünya Şampiyonasına uzanan yolculuk"
            />

            {/* Hero Stats */}
            <section className="py-12 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        {worldsStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-blue-200">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Yolculuğunuz</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Worlds&apos;e Giden Yol
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            VEX Türkiye takımlarının Dünya Şampiyonasına katılmak için izlemesi gereken adımlar
                        </p>
                    </div>

                    {/* Vertical Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

                        {timelineSteps.map((step, index) => {
                            const Icon = step.icon
                            const isEven = index % 2 === 0

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-start gap-8 mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ml-20 md:ml-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                        <div
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2`}
                                            style={{ backgroundColor: `${step.color}15`, color: step.color }}
                                        >
                                            {step.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600 mb-4">{step.description}</p>

                                        <ul className={`space-y-2 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                                            {step.details.map((detail, i) => (
                                                <li key={i} className={`flex items-center gap-2 text-sm text-gray-500 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: step.color }} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Icon Node */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                                            style={{ backgroundColor: step.color }}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Empty space for other side */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Qualification Methods */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Worlds&apos;e Nasıl Katılınır?
                        </h2>
                        <p className="text-gray-600">Dünya Şampiyonasına katılım hakkı kazanma yolları</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                <Trophy className="w-7 h-7 text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Excellence Award</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Türkiye Şampiyonasında Excellence Award kazanan takımlar otomatik olarak Worlds&apos;e davet edilir.
                            </p>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                En Prestijli Yol
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                <Medal className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Tournament Champion</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Ulusal şampiyonada turnuva şampiyonu olan ittifak takımları Worlds daveti alır.
                            </p>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                Yarışma Performansı
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Target className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Skills Sıralaması</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Dünya Skills sıralamasında üst sıralarda yer alan takımlar bölgelerine göre davet alabilir.
                            </p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                Global Sıralama
                            </span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Dallas Ambassadors Section */}
            <DallasAmbassadorsSection />

            {/* VEX Worlds Info */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                                <Globe className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">VEX Worlds 2026</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Dünyanın En Büyük Robotik Etkinliği
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                VEX Worlds, her yıl Dallas, Texas&apos;ta düzenlenen ve dünyanın her yerinden
                                binlerce takımı bir araya getiren devasa bir robotik festivalidir. Yarışmalar,
                                sergiler, workshoplar ve networking etkinlikleriyle dolu 6 gün boyunca genç
                                mühendisler hayatlarının en büyük deneyimini yaşar.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <Calendar className="w-6 h-6 text-primary mb-2" />
                                    <div className="font-semibold text-gray-900">25-30 Nisan 2026</div>
                                    <div className="text-sm text-gray-500">6 Gün</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <MapPin className="w-6 h-6 text-primary mb-2" />
                                    <div className="font-semibold text-gray-900">Dallas, Texas</div>
                                    <div className="text-sm text-gray-500">Kay Bailey Hutchison CC</div>
                                </div>
                            </div>

                            <Link href="/yarismalar/etkinlik-takvimi">
                                <Button className="bg-primary hover:bg-primary/90">
                                    2026 Takvimini İncele
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="relative text-center text-white p-8">
                                    <Globe className="w-20 h-20 mx-auto mb-4 opacity-80" />
                                    <h3 className="text-3xl font-bold mb-2">VEX WORLDS</h3>
                                    <p className="text-xl text-blue-200">Dallas, Texas</p>
                                    <p className="text-sm text-blue-300 mt-2">25-30 Nisan 2026</p>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Plane className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-gray-900">Türkiye → ABD</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700">
                <div className="container mx-auto px-6 max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Dünya Sahnesine Çıkmaya Hazır mısınız?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        VEX Türkiye ile yolculuğunuza başlayın
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/takimlar/kayit">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                                Takım Kayıt
                                <Users className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/iletisim/form">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold transition-colors">
                                İletişime Geç
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
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sezon-temasi" className="text-gray-400 hover:text-primary transition-colors">Sezon Teması</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Turnuva Sonuçları</a></li>
                                <li><a href="/yarismalar/dunya-sampiyonasi" className="text-gray-400 hover:text-primary transition-colors">Dünya Şampiyonası</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/vex-nedir/vex-iq" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="/vex-nedir/vex-v5" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="/vex-nedir/vex-u" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
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
