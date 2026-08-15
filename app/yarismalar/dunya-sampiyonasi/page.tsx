<<<<<<< HEAD
'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
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
        description: 'recfevents.org üzerinden takımınızı kaydedin ve sezon için hazırlanın.',
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
        description: 'Ulusal şampiyonada dereceye girerek uluslararası şampiyona sürecinde aday olun.',
        icon: Trophy,
        color: '#E31837',
        details: ['Excellence Award', 'Tournament Champion', 'Skills Champion', 'Design Award']
    },
    {
        id: 5,
        title: 'Dünya Şampiyonası Süreci',
        date: 'Mart',
        description: 'Resmi bilgilendirmeleri takip edin ve vize/seyahat hazırlıklarına başlayın.',
        icon: Star,
        color: '#6B21A8',
        details: ['Resmi bilgilendirme süreci', 'Vize ve seyahat koordinasyonu', 'Konaklama ve uçuş planlaması']
    },
    {
        id: 6,
        title: 'RECF STEM World Championship',
        date: '25-30 Nisan 2026',
        description: 'Dallas, Texas\'ta düzenlenen uluslararası robotik şampiyonasında yerinizi alın!',
        icon: Globe,
        color: '#1E3A8A',
        details: ['Global takımlar', 'Uluslararası katılım', 'Çok yönlü STEM etkinlikleri', 'Ömürlük deneyim']
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
                        RECF STEM World Championship 2026 ✓
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
                        2025-2026 Sezonunda RECF STEM World Championship'e giden yolculuğumuzda bizi temsil eden yıldız takımlarımız.
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
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />
            <CorporateHero
                title="RECF STEM World Championship"
                subtitle="RECF Türkiye ile Dünya Şampiyonasına uzanan süreç ve bilgilendirme rehberi"
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
                            Dünya Şampiyonasına Giden Yol
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            RECF Türkiye takımlarının uluslararası şampiyona sürecinde takip edebileceği adımlar
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
                            Uluslararası Derecelendirme Kriterleri
                        </h2>
                        <p className="text-gray-600">RECF tarafından tanımlanan resmi değerlendirme kulvarları</p>
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
                                Sezon boyunca mühendislik tasarımı, jüri mülakatı ve saha performansını bütünsel olarak sergileyen takımlara verilir.
                            </p>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                En Prestijli Ödül
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
                                Ulusal ve bölgesel turnuvalarda final eleme turlarını birincilikle tamamlayan ittifak takımlarıdır.
                            </p>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                Saha Başarısı
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
                                Bireysel sürücü ve otonom yazılım performansına dayalı küresel sıralama skorlarıdır.
                            </p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                Bireysel Skor
                            </span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Dallas Ambassadors Section */}
            <DallasAmbassadorsSection />

            {/* RECF STEM World Championship Info */}
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
                                <span className="text-sm font-medium text-blue-700">RECF STEM World Championship</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Dünyanın En Büyük Robotik & STEM Festivali
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                RECF tarafından düzenlenen uluslararası şampiyona, her yıl Dallas, Texas&apos;ta
                                dünya genelinden başarılı takımları bir araya getiren prestijli bir STEM etkinliğidir. Yarışmalar,
                                teknik sunumlar ve atölyelerle dolu süreç boyunca öğrenciler küresel ölçekte deneyim kazanır.
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
                                    <h3 className="text-2xl font-bold mb-2">RECF STEM WORLD CHAMPIONSHIP</h3>
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
                                    <span className="font-medium text-gray-900">RECF Türkiye → ABD</span>
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
                        RECF Türkiye ile yolculuğunuza başlayın
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/takimlar/kayit">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold">
                                Takım Kaydı
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

            <Footer language={language} />
        </div>
    )
}
=======
'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import {
    SanityWorldQualifier,
    getCurrentSeasonQualifiers
} from '@/lib/sanity-queries'
import {
    Trophy,
    Globe,
    Users,
    Calendar,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Star,
    Plane,
    Flag,
    Medal,
    Target,
    Award
} from 'lucide-react'

const timelineSteps = [
    {
        id: 1,
        title: {
            TR: 'Takım Kaydı',
            EN: 'Team Registration'
        },
        date: {
            TR: 'Eylül - Ekim',
            EN: 'September - October'
        },
        description: {
            TR: 'recfevents.org üzerinden takımınızı kaydedin ve sezon için hazırlanın.',
            EN: 'Register your team through recfevents.org and prepare for the season.'
        },
        icon: Users,
        color: '#00A651',
        details: {
            TR: [
                'REC Foundation hesabı oluşturma',
                'Takım numarası alma',
                'Mentor ve öğrenci kaydı'
            ],
            EN: [
                'Create a REC Foundation account',
                'Receive your team number',
                'Register mentors and students'
            ]
        }
    },

    {
        id: 2,
        title: {
            TR: 'Bölgesel Turnuvalar',
            EN: 'Regional Tournaments'
        },
        date: {
            TR: 'Kasım - Şubat',
            EN: 'November - February'
        },
        description: {
            TR: 'Türkiye genelindeki bölgesel turnuvalara katılarak deneyim kazanın.',
            EN: 'Gain experience by participating in regional tournaments across Türkiye.'
        },
        icon: Flag,
        color: '#00AEEF',
        details: {
            TR: [
                'Minimum 2 turnuvaya katılım',
                'Robot Skills puanları toplama',
                'Mühendislik defteri geliştirme'
            ],
            EN: [
                'Participate in at least 2 tournaments',
                'Earn Robot Skills scores',
                'Develop your Engineering Notebook'
            ]
        }
    },

    {
        id: 3,
        title: {
            TR: 'Robot Skills Sıralaması',
            EN: 'Robot Skills Ranking'
        },
        date: {
            TR: 'Sezon Boyunca',
            EN: 'Throughout the Season'
        },
        description: {
            TR: 'Driver ve Programming Skills turnuvalarında yüksek puanlar toplayın.',
            EN: 'Earn high scores in Driver and Programming Skills competitions.'
        },
        icon: Target,
        color: '#F7941D',
        details: {
            TR: [
                'Driver Skills (60 saniye)',
                'Programming Skills (60 saniye)',
                'Türkiye ve dünya sıralaması'
            ],
            EN: [
                'Driver Skills (60 seconds)',
                'Programming Skills (60 seconds)',
                'Türkiye and global rankings'
            ]
        }
    },

    {
        id: 4,
        title: {
            TR: 'Türkiye Şampiyonası',
            EN: 'Türkiye Championship'
        },
        date: {
            TR: '28 Şubat 2026',
            EN: 'February 28, 2026'
        },
        description: {
            TR: 'Ulusal şampiyonada dereceye girerek uluslararası şampiyona sürecinde aday olun.',
            EN: 'Place highly at the national championship to become eligible for the international championship process.'
        },
        icon: Trophy,
        color: '#E31837',
        details: {
            TR: [
                'Excellence Award',
                'Tournament Champion',
                'Skills Champion',
                'Design Award'
            ],
            EN: [
                'Excellence Award',
                'Tournament Champion',
                'Skills Champion',
                'Design Award'
            ]
        }
    },

    {
        id: 5,
        title: {
            TR: 'Dünya Şampiyonası Süreci',
            EN: 'World Championship Process'
        },
        date: {
            TR: 'Mart',
            EN: 'March'
        },
        description: {
            TR: 'Resmi bilgilendirmeleri takip edin ve vize/seyahat hazırlıklarına başlayın.',
            EN: 'Follow official announcements and begin visa and travel preparations.'
        },
        icon: Star,
        color: '#6B21A8',
        details: {
            TR: [
                'Resmi bilgilendirme süreci',
                'Vize ve seyahat koordinasyonu',
                'Konaklama ve uçuş planlaması'
            ],
            EN: [
                'Official information process',
                'Visa and travel coordination',
                'Accommodation and flight planning'
            ]
        }
    },

    {
        id: 6,
        title: {
            TR: 'RECF STEM Dünya Şampiyonası',
            EN: 'RECF STEM World Championship'
        },
        date: {
            TR: '25-30 Nisan 2026',
            EN: 'April 25-30, 2026'
        },
        description: {
            TR: "Dallas, Texas'ta düzenlenen uluslararası robotik şampiyonasında yerinizi alın!",
            EN: 'Take your place at the international robotics championship held in Dallas, Texas!'
        },
        icon: Globe,
        color: '#1E3A8A',
        details: {
            TR: [
                'Global takımlar',
                'Uluslararası katılım',
                'Çok yönlü STEM etkinlikleri',
                'Ömürlük deneyim'
            ],
            EN: [
                'Global teams',
                'International participation',
                'Multidisciplinary STEM activities',
                'A lifetime experience'
            ]
        }
    }
]

const worldsStats = [
    {
        value: '3000+',
        label: {
            TR: 'Katılan Takım',
            EN: 'Participating Teams'
        }
    },
    {
        value: '50+',
        label: {
            TR: 'Ülke',
            EN: 'Countries'
        }
    },
    {
        value: '30K+',
        label: {
            TR: 'Öğrenci',
            EN: 'Students'
        }
    },
    {
        value: '$1M+',
        label: {
            TR: 'Burs Fırsatı',
            EN: 'Scholarship Opportunities'
        }
    }
]

const content = {
    TR: {
        hero: {
            title: 'RECF STEM Dünya Şampiyonası',
            subtitle:
                'RECF Türkiye ile Dünya Şampiyonasına uzanan süreç ve bilgilendirme rehberi'
        },

        ambassadors: {
            badge: 'Dallas 2026',
            title: "Türkiye'nin Dallas Elçileri",
            description:
                "2025-2026 Sezonunda RECF STEM World Championship'e giden yolculuğumuzda bizi temsil eden yıldız takımlarımız.",
            all: 'Hepsi',
            emptyTitle:
                'Henüz bu sezon için kalifiye olan bir takım bulunmuyor.',
            emptyDescription:
                'Türkiye Şampiyonası sonrası kalifiye takımlar burada görüntülenecektir.',
            noResults:
                'Bu kategoride kalifiye takım bulunmuyor.'
        },

        timeline: {
            badge: 'Yolculuğunuz',
            title: 'Dünya Şampiyonasına Giden Yol',
            description:
                'RECF Türkiye takımlarının uluslararası şampiyona sürecinde takip edebileceği adımlar'
        },

        qualification: {
            title: 'Uluslararası Derecelendirme Kriterleri',
            description:
                'RECF tarafından tanımlanan resmi değerlendirme kulvarları',

            excellence: {
                title: 'Excellence Award',
                description:
                    'Sezon boyunca mühendislik tasarımı, jüri mülakatı ve saha performansını bütünsel olarak sergileyen takımlara verilir.',
                badge: 'En Prestijli Ödül'
            },

            tournament: {
                title: 'Tournament Champion',
                description:
                    'Ulusal ve bölgesel turnuvalarda final eleme turlarını birincilikle tamamlayan ittifak takımlarıdır.',
                badge: 'Saha Başarısı'
            },

            skills: {
                title: 'Skills Sıralaması',
                description:
                    'Bireysel sürücü ve otonom yazılım performansına dayalı küresel sıralama skorlarıdır.',
                badge: 'Bireysel Skor'
            }
        },

        world: {
            badge: 'RECF STEM World Championship',
            title: 'Dünyanın En Büyük Robotik & STEM Festivali',
            description:
                "RECF tarafından düzenlenen uluslararası şampiyona, her yıl Dallas, Texas'ta dünya genelinden başarılı takımları bir araya getiren prestijli bir STEM etkinliğidir. Yarışmalar, teknik sunumlar ve atölyelerle dolu süreç boyunca öğrenciler küresel ölçekte deneyim kazanır.",
            date: '25-30 Nisan 2026',
            days: '6 Gün',
            location: 'Dallas, Texas',
            venue: 'Kay Bailey Hutchison CC',
            calendar: '2026 Takvimini İncele',
            travel: 'RECF Türkiye → ABD',
            imageDate: '25-30 Nisan 2026'
        },

        cta: {
            title: 'Dünya Sahnesine Çıkmaya Hazır mısınız?',
            description: 'RECF Türkiye ile yolculuğunuza başlayın',
            team: 'Takım Kaydı',
            contact: 'İletişime Geç'
        },

        boarding: {
            destination: 'Destination',
            gate: 'Gate',
            teamNo: 'Team No'
        }
    },

    EN: {
        hero: {
            title: 'RECF STEM World Championship',
            subtitle:
                'A guide to the journey from RECF Türkiye to the World Championship'
        },

        ambassadors: {
            badge: 'Dallas 2026',
            title: 'Türkiye’s Dallas Ambassadors',
            description:
                'Our star teams representing us on the journey to the RECF STEM World Championship during the 2025-2026 season.',
            all: 'All',
            emptyTitle:
                'No teams have qualified for this season yet.',
            emptyDescription:
                'Qualified teams will be displayed here after the Türkiye Championship.',
            noResults:
                'There are no qualified teams in this category.'
        },

        timeline: {
            badge: 'Your Journey',
            title: 'The Road to the World Championship',
            description:
                'Steps for RECF Türkiye teams to follow throughout the international championship process'
        },

        qualification: {
            title: 'International Qualification Criteria',
            description:
                'Official evaluation pathways defined by RECF',

            excellence: {
                title: 'Excellence Award',
                description:
                    'Awarded to teams that demonstrate excellence in engineering design, judging interviews, and field performance throughout the season.',
                badge: 'Most Prestigious Award'
            },

            tournament: {
                title: 'Tournament Champion',
                description:
                    'Alliance teams that finish the final elimination rounds as champions at national and regional tournaments.',
                badge: 'Field Achievement'
            },

            skills: {
                title: 'Skills Ranking',
                description:
                    'Global ranking scores based on individual driving and autonomous software performance.',
                badge: 'Individual Score'
            }
        },

        world: {
            badge: 'RECF STEM World Championship',
            title: 'The World’s Largest Robotics & STEM Festival',
            description:
                'Organized by RECF, the international championship is a prestigious STEM event held annually in Dallas, Texas, bringing together successful teams from around the world. Through competitions, technical presentations, and workshops, students gain experience on a global scale.',
            date: 'April 25-30, 2026',
            days: '6 Days',
            location: 'Dallas, Texas',
            venue: 'Kay Bailey Hutchison CC',
            calendar: 'View 2026 Calendar',
            travel: 'RECF Türkiye → USA',
            imageDate: 'April 25-30, 2026'
        },

        cta: {
            title: 'Are You Ready for the World Stage?',
            description: 'Start your journey with RECF Türkiye',
            team: 'Team Registration',
            contact: 'Contact Us'
        },

        boarding: {
            destination: 'Destination',
            gate: 'Gate',
            teamNo: 'Team No'
        }
    }
} as const

function BoardingPassCard({
    qualifier
}: {
    qualifier: SanityWorldQualifier
}) {
    const [isHovered, setIsHovered] = useState(false)
    const { language } = useLanguage()
    const t = content[language]

    const isVRC = qualifier.team?.platform === 'vex-v5'
    const accentColor = isVRC ? '#E31837' : '#6B21A8'
    const accentBg = isVRC ? 'bg-red-500' : 'bg-purple-600'
    const accentLight = isVRC ? 'bg-red-50' : 'bg-purple-50'
    const platformLabel = isVRC ? 'V5 Push Back' : 'IQ Rapid Relay'

    const photoSource =
        qualifier.teamPhoto || qualifier.team?.logo

    return (
        <motion.div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            rotate: -20,
                            scale: 0.5
                        }}
                        animate={{
                            opacity: 1,
                            rotate: -12,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            rotate: -20,
                            scale: 0.5
                        }}
                        className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border-2 border-white"
                    >
                        RECF STEM World Championship 2026 ✓
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-shadow duration-300 ${isHovered ? 'shadow-2xl' : ''
                    }`}
                style={
                    isHovered
                        ? { boxShadow: `0 0 0 2px ${accentColor}` }
                        : {}
                }
            >
                <div className={`h-2 ${accentBg}`} />

                <div className="flex flex-col md:flex-row">

                    <div className="flex-1 p-5 md:p-6">
                        <div className="flex items-start gap-4">

                            <div
                                className={`w-20 h-20 md:w-24 md:h-24 rounded-xl ${accentLight} flex items-center justify-center overflow-hidden flex-shrink-0`}
                            >
                                {photoSource ? (
                                    <Image
                                        src={urlFor(photoSource)
                                            .width(200)
                                            .height(200)
                                            .url()}
                                        alt={
                                            qualifier.team?.name ||
                                            'Team'
                                        }
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Users
                                        className="w-10 h-10"
                                        style={{
                                            color: accentColor
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">

                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                                    {qualifier.team?.name}
                                </h3>

                                <p className="text-gray-600 text-sm md:text-base truncate">
                                    {qualifier.team?.schoolOrOrganization}
                                </p>

                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>
                                        {qualifier.team?.city}
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <span
                                        className="inline-block text-xs font-medium px-2 py-1 rounded-full"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            color: accentColor
                                        }}
                                    >
                                        {platformLabel}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="relative hidden md:flex items-center">
                        <div className="w-px h-full border-l-2 border-dashed border-gray-300" />
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-100 rounded-full" />
                        <div className="absolute -left-3 bottom-0 w-6 h-6 bg-gray-100 rounded-full" />
                    </div>

                    <div className="md:hidden px-5 py-2">
                        <div className="border-t-2 border-dashed border-gray-300 relative">
                            <div className="absolute -left-5 -top-3 w-6 h-6 bg-gray-100 rounded-full" />
                            <div className="absolute -right-5 -top-3 w-6 h-6 bg-gray-100 rounded-full" />
                        </div>
                    </div>

                    <div className="md:w-48 p-5 md:p-6 flex flex-col justify-center">

                        <div className="space-y-3">

                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                    {t.boarding.destination}
                                </div>

                                <div className="font-bold text-gray-900 flex items-center gap-1">
                                    <Plane
                                        className="w-4 h-4"
                                        style={{
                                            color: accentColor
                                        }}
                                    />
                                    DFW (Dallas)
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                    {t.boarding.gate}
                                </div>

                                <div
                                    className="font-semibold text-sm"
                                    style={{
                                        color: accentColor
                                    }}
                                >
                                    {qualifier.qualificationMethod}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                    {t.boarding.teamNo}
                                </div>

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

function DallasAmbassadorsSection() {
    const { language } = useLanguage()
    const t = content[language]

    const [filter, setFilter] = useState<
        'all' | 'vex-v5' | 'vex-iq'
    >('all')

    const [qualifiers, setQualifiers] =
        useState<SanityWorldQualifier[]>([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchQualifiers() {
            try {
                const data =
                    await getCurrentSeasonQualifiers()

                setQualifiers(data)
            } catch (error) {
                console.error(
                    'Error fetching qualifiers:',
                    error
                )
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

    const vrcCount = qualifiers.filter(
        q => q.team?.platform === 'vex-v5'
    ).length

    const iqCount = qualifiers.filter(
        q => q.team?.platform === 'vex-iq'
    ).length

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="text-center mb-12">

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                        <Plane className="w-4 h-4 text-blue-600" />

                        <span className="text-sm font-medium text-blue-700">
                            {t.ambassadors.badge}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t.ambassadors.title}
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t.ambassadors.description}
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
                        {t.ambassadors.all} ({qualifiers.length})
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

                <div className="grid md:grid-cols-2 gap-6">

                    <AnimatePresence mode="wait">
                        {filteredQualifiers.map(
                            (qualifier, index) => (
                                <motion.div
                                    key={qualifier._id}
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -20
                                    }}
                                    transition={{
                                        delay: index * 0.1
                                    }}
                                >
                                    <BoardingPassCard
                                        qualifier={qualifier}
                                    />
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>

                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid md:grid-cols-2 gap-6">

                        {[1, 2].map(i => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse"
                            >
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
                            {t.ambassadors.emptyTitle}
                        </h3>

                        <p className="text-gray-500 max-w-md mx-auto">
                            {t.ambassadors.emptyDescription}
                        </p>

                    </div>
                )}

                {/* No Results */}
                {!isLoading &&
                    qualifiers.length > 0 &&
                    filteredQualifiers.length === 0 && (
                        <div className="text-center py-12">

                            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />

                            <p className="text-gray-500">
                                {t.ambassadors.noResults}
                            </p>

                        </div>
                    )}

            </div>
        </section>
    )
}

export default function DunyaSampiyonasiPage() {
    const { language, setLanguage } = useLanguage()
    const t = content[language]

    return (
        <div className="min-h-screen bg-white text-foreground">

            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l =>
                        l === 'TR' ? 'EN' : 'TR'
                    )
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* Hero Stats */}
            <section className="py-12 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">

                        {worldsStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                            >
                                <div className="text-3xl md:text-4xl font-bold mb-1">
                                    {stat.value}
                                </div>

                                <div className="text-sm text-blue-200">
                                    {stat.label[language]}
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 md:py-24 bg-white">

                <div className="container mx-auto px-6 max-w-5xl">

                    <div className="text-center mb-16">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">

                            <MapPin className="w-4 h-4 text-primary" />

                            <span className="text-sm font-medium text-primary">
                                {t.timeline.badge}
                            </span>

                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t.timeline.title}
                        </h2>

                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t.timeline.description}
                        </p>

                    </div>

                    <div className="relative">

                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

                        {timelineSteps.map((step, index) => {

                            const Icon = step.icon
                            const isEven = index % 2 === 0

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: '-50px'
                                    }}
                                    transition={{
                                        delay: index * 0.1
                                    }}
                                    className={`relative flex items-start gap-8 mb-12 ${isEven
                                        ? 'md:flex-row'
                                        : 'md:flex-row-reverse'
                                        }`}
                                >

                                    <div
                                        className={`flex-1 ml-20 md:ml-0 ${isEven
                                            ? 'md:text-right md:pr-12'
                                            : 'md:text-left md:pl-12'
                                            }`}
                                    >

                                        <div
                                            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                                            style={{
                                                backgroundColor: `${step.color}15`,
                                                color: step.color
                                            }}
                                        >
                                            {step.date[language]}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {step.title[language]}
                                        </h3>

                                        <p className="text-gray-600 mb-4">
                                            {step.description[language]}
                                        </p>

                                        <ul
                                            className={`space-y-2 ${isEven
                                                ? 'md:flex md:flex-col md:items-end'
                                                : ''
                                                }`}
                                        >
                                            {step.details[language].map(
                                                (detail, i) => (
                                                    <li
                                                        key={i}
                                                        className={`flex items-center gap-2 text-sm text-gray-500 ${isEven
                                                            ? 'md:flex-row-reverse'
                                                            : ''
                                                            }`}
                                                    >
                                                        <CheckCircle2
                                                            className="w-4 h-4 flex-shrink-0"
                                                            style={{
                                                                color: step.color
                                                            }}
                                                        />

                                                        {detail}
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                    </div>

                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">

                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                                            style={{
                                                backgroundColor: step.color
                                            }}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                    </div>

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
                            {t.qualification.title}
                        </h2>

                        <p className="text-gray-600">
                            {t.qualification.description}
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Excellence */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >

                            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                <Trophy className="w-7 h-7 text-yellow-600" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {t.qualification.excellence.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {t.qualification.excellence.description}
                            </p>

                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                {t.qualification.excellence.badge}
                            </span>

                        </motion.div>

                        {/* Tournament */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >

                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                <Medal className="w-7 h-7 text-red-600" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {t.qualification.tournament.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {t.qualification.tournament.description}
                            </p>

                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                {t.qualification.tournament.badge}
                            </span>

                        </motion.div>

                        {/* Skills */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >

                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Target className="w-7 h-7 text-green-600" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {t.qualification.skills.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {t.qualification.skills.description}
                            </p>

                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                {t.qualification.skills.badge}
                            </span>

                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Dallas Ambassadors */}
            <DallasAmbassadorsSection />

            {/* RECF STEM World Championship Info */}
            <section className="py-16 md:py-20 bg-white">

                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -30
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{ once: true }}
                        >

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">

                                <Globe className="w-4 h-4 text-blue-600" />

                                <span className="text-sm font-medium text-blue-700">
                                    {t.world.badge}
                                </span>

                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {t.world.title}
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {t.world.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">

                                <div className="p-4 bg-gray-50 rounded-xl">

                                    <Calendar className="w-6 h-6 text-primary mb-2" />

                                    <div className="font-semibold text-gray-900">
                                        {t.world.date}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {t.world.days}
                                    </div>

                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">

                                    <MapPin className="w-6 h-6 text-primary mb-2" />

                                    <div className="font-semibold text-gray-900">
                                        {t.world.location}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {t.world.venue}
                                    </div>

                                </div>

                            </div>

                            <Link href="/yarismalar/etkinlik-takvimi">

                                <Button className="bg-primary hover:bg-primary/90">

                                    {t.world.calendar}

                                    <ArrowRight className="w-4 h-4 ml-2" />

                                </Button>

                            </Link>

                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{ once: true }}
                            className="relative"
                        >

                            <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">

                                <div className="absolute inset-0 bg-black/20" />

                                <div className="relative text-center text-white p-8">

                                    <Globe className="w-20 h-20 mx-auto mb-4 opacity-80" />

                                    <h3 className="text-2xl font-bold mb-2">
                                        RECF STEM WORLD CHAMPIONSHIP
                                    </h3>

                                    <p className="text-xl text-blue-200">
                                        Dallas, Texas
                                    </p>

                                    <p className="text-sm text-blue-300 mt-2">
                                        {t.world.imageDate}
                                    </p>

                                </div>

                                <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />

                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />

                            </div>

                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200"
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3
                                }}
                            >

                                <div className="flex items-center gap-2">

                                    <Plane className="w-5 h-5 text-primary" />

                                    <span className="font-medium text-gray-900">
                                        {t.world.travel}
                                    </span>

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
                        {t.cta.title}
                    </h2>

                    <p className="text-xl text-white/90 mb-8">
                        {t.cta.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <Link href="/takimlar/kayit">

                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-gray-100 font-bold"
                            >
                                {t.cta.team}

                                <Users className="w-4 h-4 ml-2" />
                            </Button>

                        </Link>

                        <Link href="/iletisim/form">

                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-gray-100 font-semibold transition-colors"
                            >
                                {t.cta.contact}
                            </Button>

                        </Link>

                    </div>

                </div>
            </section>

            <Footer language={language} />

        </div>
    )
}
>>>>>>> d9a88c48bf01268ab2d176e8873256c6f4f8ed35
