'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Target, Eye, Flag, GraduationCap, Handshake, Globe2,
    Gamepad2, Users, Cpu, Microscope,
    MapPin, TrendingUp, Lightbulb, Link2,
    UserCircle, School, Building2, Briefcase,
    ArrowRight, Calendar, Mail, Sparkles, Rocket
} from 'lucide-react'

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(!startOnView)

    useEffect(() => {
        if (!hasStarted) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration, hasStarted])

    return { count, setHasStarted }
}

function AnimatedStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
    const { count, setHasStarted } = useCountUp(value, 2000, true)
    const ref = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [setHasStarted])

    return (
        <div ref={ref} className="text-center p-4 md:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow bg-opacity-95 md:bg-opacity-100">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">
                {count}{suffix}
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{label}</div>
        </div>
    )
}

export default function HakkimizdaPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Hakkımızda"
                subtitle="VEX Türkiye olarak geleceğin mühendislerini yetiştiriyoruz"
            />

            {/* 1. Misyon & Vizyon Combined */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Vision Card */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Eye className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">Türkiye'yi, robotik ve STEM eğitiminde dünya çapında lider ülkeler arasına taşımak. Her çocuğun teknolojiye erişebildiği, yaratıcılığını geliştirebildiği ve geleceğin mesleklerine hazırlandığı bir eğitim ekosistemi oluşturmak.</p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-3 h-3 text-primary" /></div><p className="text-gray-600 text-sm">2030 yılına kadar 81 ilde aktif VEX ekosistemi</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-3 h-3 text-primary" /></div><p className="text-gray-600 text-sm">Uluslararası yarışmalarda Türkiye'nin sürekli temsili</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-3 h-3 text-primary" /></div><p className="text-gray-600 text-sm">100.000+ öğrenciye robotik eğitim fırsatı</p></div>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <Target className="w-8 h-8 text-gray-800" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">Öğrencilere dünya standartlarında robotik eğitim ve yarışma deneyimi sunarak, onları 21. yüzyılın gerektirdiği bilgi, beceri ve yetkinliklerle donatmak. Takım çalışması, problem çözme ve inovatif düşünme kültürünü yaygınlaştırmak.</p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5"><Rocket className="w-3 h-3 text-gray-700" /></div><p className="text-gray-600 text-sm">Kaliteli ve erişilebilir robotik eğitim materyalleri</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5"><Rocket className="w-3 h-3 text-gray-700" /></div><p className="text-gray-600 text-sm">Profesyonel mentor ve eğitmen yetiştirme programları</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5"><Rocket className="w-3 h-3 text-gray-700" /></div><p className="text-gray-600 text-sm">Sürdürülebilir ve kapsayıcı yarışma ekosistemi</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">VEX Türkiye olarak her adımımızda bizi yönlendiren temel değerler</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-2xl">🎯</span></div>
                            <h3 className="font-semibold text-gray-900 mb-2">Mükemmellik</h3>
                            <p className="text-sm text-gray-600">Her projede en yüksek kalite standartlarını hedefliyoruz.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-2xl">🤝</span></div>
                            <h3 className="font-semibold text-gray-900 mb-2">İş Birliği</h3>
                            <p className="text-sm text-gray-600">Takım çalışması ve ortaklıklarla daha güçlü sonuçlar elde ediyoruz.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-2xl">💡</span></div>
                            <h3 className="font-semibold text-gray-900 mb-2">İnovasyon</h3>
                            <p className="text-sm text-gray-600">Yaratıcı çözümler ve yenilikçi yaklaşımları teşvik ediyoruz.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-2xl">🌍</span></div>
                            <h3 className="font-semibold text-gray-900 mb-2">Kapsayıcılık</h3>
                            <p className="text-sm text-gray-600">Her öğrenciye eşit fırsatlar sunmayı hedefliyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. VEX Türkiye Ne Yapar? */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">VEX Türkiye Ne Yapar?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Türkiye'nin robotik geleceğini şekillendiren dört temel alanda faaliyet gösteriyoruz</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <Flag className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yarışmalar</h3>
                            <p className="text-gray-600 text-sm">Bölgesel ve ulusal çapta, her yaş grubuna hitap eden resmi turnuvalar organize ediyoruz.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <GraduationCap className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eğitim ve Atölyeler</h3>
                            <p className="text-gray-600 text-sm">Mentorlar ve öğrenciler için teknik atölyeler ve pedagojik eğitimler düzenliyoruz.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <Handshake className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">İş Birlikleri</h3>
                            <p className="text-gray-600 text-sm">Bakanlıklar, okullar ve teknoloji şirketleriyle stratejik paydaşlıklar kuruyoruz.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <Globe2 className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Uluslararası Temsil</h3>
                            <p className="text-gray-600 text-sm">Başarılı takımlarımızı VEX Worlds (ABD) başta olmak üzere dünya arenalarına taşıyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Programlarımız */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Programlarımız</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Her yaş grubu için özel olarak tasarlanmış robotik programları</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-green-100 flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">VEX 123 & GO</h3>
                            <p className="text-xs text-primary font-medium mb-2">İlkokul Seviyesi</p>
                            <p className="text-gray-600 text-sm">Oyunla öğrenme temelli ilk kodlama ve mekanik deneyimi.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">VEX IQ</h3>
                            <p className="text-xs text-primary font-medium mb-2">Ortaokul Seviyesi</p>
                            <p className="text-gray-600 text-sm">Takım çalışması ve plastik yapı taşlı robotik ekosistemi.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-red-100 flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">VEX V5</h3>
                            <p className="text-xs text-primary font-medium mb-2">Lise Seviyesi</p>
                            <p className="text-gray-600 text-sm">Profesyonel metal robotik, mühendislik ve ileri seviye yazılım.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Microscope className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">VEX U</h3>
                            <p className="text-xs text-primary font-medium mb-2">Üniversite Ligi</p>
                            <p className="text-gray-600 text-sm">Özgün tasarımlar ve akademik Ar-Ge platformu.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Türkiye'de VEX Ekosistemi - Animated Stats */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-white">Türkiye'de VEX Ekosistemi</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Türkiye'nin 81 İlinde İlham Veriyoruz</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Her yıl binlerce öğrenci, VEX Türkiye platformunda sınırlarını zorluyor ve mühendislik becerilerini geliştiriyor.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <AnimatedStat value={81} label="İl" />
                        <AnimatedStat value={500} suffix="+" label="Aktif Takım" />
                        <AnimatedStat value={20000} suffix="+" label="Öğrenci" />
                        <AnimatedStat value={1000} suffix="+" label="Mentor" />
                    </div>
                </div>
            </section>

            {/* 6. Neden VEX? */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <Lightbulb className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Neden VEX?</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Ürün Değil, Süreç Eğitimi
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                VEX, bir ürün değil bir <strong className="text-gray-900">"süreç" eğitimidir</strong>. Mühendislik Tasarım Süreci (EDP) sayesinde öğrencilerimiz:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <TrendingUp className="w-3 h-3 text-green-600" />
                                    </div>
                                    <p className="text-gray-600">Hata yapmaktan korkmamayı öğrenirler</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <TrendingUp className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <p className="text-gray-600">Analitik düşünme becerisi kazanırlar</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <TrendingUp className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <p className="text-gray-600">Gerçek dünya problemlerini prototipler üzerinden çözmeyi öğrenirler</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative hidden md:block">
                            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <Lightbulb className="w-20 h-20 text-primary mx-auto mb-4 hidden md:block" />
                                    <p className="text-2xl font-bold text-gray-900">EDP</p>
                                    <p className="text-gray-500 text-sm hidden md:block">Engineering Design Process</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Uluslararası Bağlantımız */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <Link2 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Uluslararası Bağlantımız</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            REC Foundation Resmi Partneri
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            VEX Türkiye, <strong className="text-gray-900">REC Foundation</strong> ağının resmi partneridir.
                            <strong className="text-gray-900"> 80'den fazla ülkede</strong> eş zamanlı yürütülen bu devasa ağın bir parçası olarak,
                            takımlarımız dünya standartlarında bir müfredat ve yarışma ortamıyla buluşur.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
                                <span className="font-semibold text-primary">80+</span>
                                <span className="text-gray-600 ml-2">Ülke</span>
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
                                <span className="font-semibold text-primary">50K+</span>
                                <span className="text-gray-600 ml-2">Takım</span>
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
                                <span className="font-semibold text-primary">1M+</span>
                                <span className="text-gray-600 ml-2">Öğrenci</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Kimler İçin? */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kimler İçin?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">VEX ekosistemi, eğitimin tüm paydaşlarına hitap eder</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <UserCircle className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Öğrenciler</h3>
                            <p className="text-gray-600 text-sm">Kendini keşfetmek ve eğlenerek öğrenmek isteyenler için.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <GraduationCap className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eğitmenler</h3>
                            <p className="text-gray-600 text-sm">Öğrencilerine ilham verecek modern bir eğitim aracı arayanlar için.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <School className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Okullar</h3>
                            <p className="text-gray-600 text-sm">STEM odaklı vizyoner bir eğitim kurumu olmak isteyenler için.</p>
                        </div>

                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                            <div className="w-14 h-14 mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <Briefcase className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sponsorlar</h3>
                            <p className="text-gray-600 text-sm">Geleceğin nitelikli insan kaynağına bugün yatırım yapmak isteyenler için.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Güçlü Kapanış CTA */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-red-600 to-red-700 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Geleceği Tasarlamak İçin Bugün Harekete Geçin
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-10">
                        VEX Türkiye ailesine katılın!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/yarismalar/etkinlik-takvimi">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <Calendar className="w-5 h-5 mr-2" />
                                Yarışma Takvimini İncele
                            </Button>
                        </Link>
                        <Link href="/iletisim/form">
                            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 font-semibold px-8 py-6 text-lg rounded-xl border border-gray-700">
                                <Mail className="w-5 h-5 mr-2" />
                                Bizimle İletişime Geç
                                <ArrowRight className="w-5 h-5 ml-2" />
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
                            <p className="text-gray-400 text-sm mb-6">Geleceğin mühendislerini yetiştiriyoruz.</p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h3>
                            <ul className="space-y-3">
                                <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Ana Sayfa</a></li>
                                <li><a href="/kurumsal/hakkimizda" className="text-gray-400 hover:text-primary transition-colors">Hakkımızda</a></li>
                                <li><a href="/kurumsal/ekibimiz" className="text-gray-400 hover:text-primary transition-colors">Ekibimiz</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX GO</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                                <li>İstanbul, Türkiye</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Gizlilik Politikası</a>
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Kullanım Koşulları</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
