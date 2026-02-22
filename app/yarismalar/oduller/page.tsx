'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trophy, Award, Star, Lightbulb, Users, Heart,
    GraduationCap, Wrench, BookOpen, Sparkles, Target, Medal,
    ChevronLeft, ChevronRight
} from 'lucide-react'

// Award categories data
const awards = [
    {
        id: 'excellence',
        name: 'Excellence Award',
        icon: Trophy,
        color: '#FFD700',
        bgGradient: 'from-yellow-400 to-amber-500',
        tagline: 'En Prestijli Ödül',
        description: 'Excellence Award, VEX Robotics Competition\'ın en prestijli ödülüdür. Bu ödülü kazanan takım, tüm yarışma boyunca üstün performans sergileyerek VEX Worlds\'e otomatik katılım hakkı kazanır.',
        highlights: [
            'Dünya Şampiyonasına otomatik davet',
            'Global tanınırlık',
            'Sponsorluk fırsatları'
        ],
        criteria: [
            'Robot tasarımında üstün performans',
            'Yarışma sıralamasında yüksek başarı',
            'Mühendislik defterinin kalitesi',
            'Takım çalışması ve sportmenlik',
            'Jüri mülakatında etkileyici sunum'
        ]
    },
    {
        id: 'design',
        name: 'Design Award',
        icon: Wrench,
        color: '#E31837',
        bgGradient: 'from-red-500 to-red-700',
        tagline: 'Tasarım Mükemmelliği',
        description: 'Robotik tasarımda mükemmelliği ödüllendirir. Mekanik ve yazılım tasarımı değerlendirilir.',
        highlights: [
            'Mühendislik profesyonelliği onayı',
            'Tasarım sürecinde mükemmeliyet',
            'Jüri özel takdiri'
        ],
        criteria: [
            'Robotun özgün ve etkili tasarımı',
            'Mühendislik tasarım sürecinin uygulanması',
            'İterasyon ve iyileştirme kanıtları',
            'Kodun kalitesi ve organizasyonu',
            'Mühendislik defterinde detaylı dökümantasyon'
        ]
    },
    {
        id: 'innovate',
        name: 'Innovate Award',
        icon: Lightbulb,
        color: '#00AEEF',
        bgGradient: 'from-cyan-400 to-blue-500',
        tagline: 'Yenilikçi Çözümler',
        description: 'Yenilikçi ve yaratıcı çözümler üreten takımlara verilir.',
        highlights: [
            'Yaratıcı çözüm tescili',
            'Yenilikçi mühendislik prestiji',
            'Teknik farkındalık'
        ],
        criteria: [
            'Özgün problem çözme yaklaşımı',
            'Yeni mekanizma veya strateji geliştirme',
            'Yaratıcı mühendislik çözümleri',
            'Prototipleme ve test süreçleri',
            'Innovasyonun uygulamalı etkisi'
        ]
    },
    {
        id: 'think',
        name: 'Think Award',
        icon: BookOpen,
        color: '#00A651',
        bgGradient: 'from-green-500 to-emerald-600',
        tagline: 'Programlama Yetkinliği',
        description: 'En kapsamlı ve kaliteli mühendislik defteri hazırlayan takıma verilir.',
        highlights: [
            'Programlama yetkinliği onayı',
            'Algoritmik düşünce başarısı',
            'Yazılımda uzmanlık göstergesi'
        ],
        criteria: [
            'Mühendislik defterinin eksiksizliği',
            'Tasarım sürecinin detaylı dökümantasyonu',
            'Problem ve çözümlerin açık anlatımı',
            'Görsel ve yazılı içerik kalitesi',
            'Takım organizasyonunun yansıtılması'
        ]
    },
    {
        id: 'build',
        name: 'Build Award',
        icon: Sparkles,
        color: '#F7941D',
        bgGradient: 'from-orange-400 to-orange-600',
        tagline: 'Yapısal Mükemmellik',
        description: 'Yapısal kalite ve işçilikte mükemmellik gösteren robota verilir.',
        highlights: [
            'Dayanıklılık ve işçilik ödülü',
            'Robotik inşaat uzmanlığı',
            'Kalite standartları onayı'
        ],
        criteria: [
            'Robot yapımında işçilik kalitesi',
            'Sağlam ve dayanıklı yapı tasarımı',
            'Temiz kablo yönetimi ve düzen',
            'Parça kullanımında verimlilik',
            'Estetik ve fonksiyonellik dengesi'
        ]
    },
    {
        id: 'judges',
        name: 'Judges Award',
        icon: Star,
        color: '#6B21A8',
        bgGradient: 'from-purple-500 to-purple-700',
        tagline: 'Jüri Özel Takdiri',
        description: 'Jürilerin takdirini kazanan, özel durumlar için verilen ödül.',
        highlights: [
            'Olağanüstü karakter ve çaba takdiri',
            'Jüri özel motivasyonu',
            'Ekip ruhu onayı'
        ],
        criteria: [
            'Jürinin dikkatini çeken özel nitelikler',
            'Diğer kategorilere sığmayan üstün başarı',
            'Olağanüstü özveri veya çaba',
            'Topluluk etkisi veya ilham verici hikaye',
            'Beklenmedik ama etkileyici performans'
        ]
    },
    {
        id: 'teamwork',
        name: 'Teamwork Champion',
        icon: Users,
        color: '#1E3A8A',
        bgGradient: 'from-blue-600 to-blue-800',
        tagline: 'Takım Çalışması Şampiyonu',
        description: 'Takım çalışması turnuvasında en başarılı ittifaka verilir.',
        highlights: [
            'Stratejik iş birliği başarısı',
            'Turnuva birinciliği prestiji',
            'Sosyal beceri onayı'
        ],
        criteria: [
            'Yarışma maçlarında yüksek performans',
            'İttifak partnerleriyle koordinasyon',
            'Stratejik karar alma yeteneği',
            'Maç boyunca tutarlı başarı',
            'Qualifying ve elimination maçlarında başarı'
        ]
    },
    {
        id: 'skills',
        name: 'Skills Champion',
        icon: Target,
        color: '#059669',
        bgGradient: 'from-emerald-500 to-teal-600',
        tagline: 'Beceri Şampiyonu',
        description: 'Robot Skills turnuvasında en yüksek puanı alan takıma verilir.',
        highlights: [
            'Teknik performans zirvesi',
            'Bireysel robotik yetkinliği',
            'Skor liderliği onayı'
        ],
        criteria: [
            'Driver Skills yüksek performans',
            'Programming Skills başarısı',
            'Toplam kombine puanda liderlik',
            'Tutarlı ve tekrarlanabilir performans',
            'Zor görevleri tamamlama becerisi'
        ]
    },
    {
        id: 'sportsmanship',
        name: 'Sportsmanship Award',
        icon: Heart,
        color: '#EC4899',
        bgGradient: 'from-pink-500 to-rose-600',
        tagline: 'Sportmenlik Ruhu',
        description: 'Fair play ve sportmenlik ruhunu en iyi yansıtan takıma verilir.',
        highlights: [
            'Etik davranış onayı',
            'Topluluk rol modelliği',
            'Pozitif tutum prestiji'
        ],
        criteria: [
            'Rakip takımlara saygılı davranış',
            'Diğer takımlara yardım etme',
            'Pozitif tutum ve enerji',
            'Başarı ve başarısızlıkta dürüstlük',
            'Yarışma ortamına olumlu katkı'
        ]
    }
]

// Flip Card Component
function FlipCard({ award }: { award: typeof awards[0] }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const Icon = award.icon

    return (
        <motion.div
            className="h-80 perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.02 }}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${award.bgGradient} p-6 flex flex-col items-center justify-center text-white shadow-lg`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{award.name}</h3>
                    <p className="text-sm text-center text-white/80 line-clamp-3">{award.description}</p>
                    <p className="mt-4 text-xs text-white/60 flex items-center gap-1">
                        <span>Kriterleri görmek için tıklayın</span>
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                    </p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl bg-white border border-gray-200 p-6 shadow-lg"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${award.color}20` }}
                        >
                            <Icon className="w-5 h-5" style={{ color: award.color }} />
                        </div>
                        <h3 className="font-bold text-gray-900">{award.name}</h3>
                    </div>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Jüri Değerlendirme Kriterleri:</h4>
                    <ul className="space-y-2">
                        {award.criteria.map((criterion, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: award.color }} />
                                {criterion}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Award Gallery Carousel Component
function AwardGallery({ awardsData }: { awardsData: typeof awards }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const currentAward = awardsData[currentIndex]
    const Icon = currentAward.icon

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % awardsData.length)
    }, [awardsData.length])

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + awardsData.length) % awardsData.length)
    }, [awardsData.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goToNext()
            if (e.key === 'ArrowLeft') goToPrev()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [goToNext, goToPrev])

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) goToNext()
        if (touchStart - touchEnd < -75) goToPrev()
    }

    // Background color based on award
    const getBgColor = (color: string) => {
        const colorMap: Record<string, string> = {
            '#FFD700': 'from-yellow-50 to-amber-100',
            '#E31837': 'from-red-50 to-red-100',
            '#00AEEF': 'from-cyan-50 to-blue-100',
            '#00A651': 'from-green-50 to-emerald-100',
            '#F7941D': 'from-orange-50 to-orange-100',
            '#6B21A8': 'from-purple-50 to-purple-100',
            '#1E3A8A': 'from-blue-50 to-blue-100',
            '#059669': 'from-emerald-50 to-teal-100',
            '#EC4899': 'from-pink-50 to-rose-100',
        }
        return colorMap[color] || 'from-gray-50 to-gray-100'
    }

    return (
        <section
            className={`py-16 md:py-24 transition-all duration-700 ease-in-out bg-gradient-to-br ${getBgColor(currentAward.color)}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 transition-colors duration-500"
                        style={{ backgroundColor: `${currentAward.color}20` }}
                    >
                        <Medal className="w-4 h-4" style={{ color: currentAward.color }} />
                        <span className="text-sm font-medium" style={{ color: currentAward.color }}>Ödül Galerisi</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tüm Ödülleri Keşfedin
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ok tuşlarıyla veya ekrandaki butonlarla ödüller arasında gezinin
                    </p>
                </div>

                {/* Gallery Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentAward.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="grid lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Text Content - Left */}
                            <div className="order-2 lg:order-1">
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                    style={{ backgroundColor: `${currentAward.color}20` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: currentAward.color }} />
                                    <span className="text-sm font-medium" style={{ color: currentAward.color }}>
                                        {currentAward.tagline || `${currentIndex + 1} / ${awardsData.length}`}
                                    </span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {currentAward.name}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {currentAward.description}
                                </p>

                                {/* Highlights with Star Icons */}
                                <div className="space-y-4">
                                    {currentAward.highlights?.map((highlight, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.15 }}
                                            className="flex items-center gap-3"
                                        >
                                            <Star
                                                className="w-5 h-5 flex-shrink-0"
                                                style={{ color: currentAward.color }}
                                            />
                                            <span className="text-gray-700 font-medium">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual - Right */}
                            <div className="order-1 lg:order-2">
                                <motion.div
                                    className={`aspect-square max-w-md mx-auto bg-gradient-to-br ${currentAward.bgGradient} rounded-3xl flex items-center justify-center shadow-2xl`}
                                    initial={{ scale: 0.9, rotate: -5 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Icon className="w-32 h-32 text-white" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center items-center gap-6 mt-12">
                        <button
                            onClick={goToPrev}
                            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 border border-gray-200"
                            aria-label="Önceki"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-2">
                            {awardsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-8'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    style={index === currentIndex ? { backgroundColor: currentAward.color } : {}}
                                    aria-label={`Ödül ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNext}
                            className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 border border-gray-200"
                            aria-label="Sonraki"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 max-w-md mx-auto">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: currentAward.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + 1) / awardsData.length) * 100}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-2">
                            {currentIndex + 1} / {awardsData.length} ödül
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function OdullerPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Ödül Kategorileri"
                subtitle="VEX yarışmalarında kazanılabilecek ödülleri keşfedin"
            />

            {/* Awards Grid */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Kartları çevirmek için tıklayın</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            VEX Ödül Kategorileri
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Her ödül, takımların farklı alanlardaki başarılarını ödüllendirir.
                            Kartlara tıklayarak jüri değerlendirme kriterlerini görebilirsiniz.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award, index) => (
                            <motion.div
                                key={award.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FlipCard award={award} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Award Gallery Carousel */}
            <AwardGallery awardsData={awards} />

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Gelecek Şampiyonlar Arasında Olun
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        VEX yarışmalarına katılarak takımınızı gösterin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/yarismalar/etkinlik-takvimi">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Yaklaşan Turnuvalar
                                <Trophy className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/takimlar/kayit">
                            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                                Takım Kaydı
                            </Button>
                        </Link>
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
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/sezon-temasi" className="text-gray-400 hover:text-primary transition-colors">Sezon Teması</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Turnuva Sonuçları</a></li>
                                <li><a href="/yarismalar/oduller" className="text-gray-400 hover:text-primary transition-colors">Ödüller</a></li>
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
