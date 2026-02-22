'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    ArrowRight, ArrowLeft, Target, Award, Package, Trophy,
    Sparkles, Gamepad2, Puzzle, Bot, Cpu, Factory, GraduationCap,
    CheckCircle2, Book, Code, Users, Zap
} from 'lucide-react'

// Program data with full details
const programsData: Record<string, {
    id: string
    name: string
    fullName: string
    tagline: string
    ageRange: string
    color: string
    secondaryColor: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    purpose: string
    achievements: string[]
    kitContents: { name: string; description: string }[]
    competitionRules: { title: string; description: string }[]
}> = {
    'vex-123': {
        id: 'vex-123',
        name: 'VEX 123',
        fullName: 'VEX 123 Robotics',
        tagline: 'Kodlamaya ilk adım',
        ageRange: '4-7 yaş',
        color: '#00A651',
        secondaryColor: '#7ED321',
        icon: Sparkles,
        description: 'VEX 123, okul öncesi ve ilkokul başlangıcındaki çocuklar için tasarlanmış, ekransız kodlama deneyimi sunan robotik platformudur. Oyun temelli öğrenme yaklaşımıyla çocukların problem çözme ve mantıksal düşünme becerilerini geliştirir.',
        purpose: 'VEX 123, çocukların teknolojiyle ilk tanışmasını güvenli ve eğlenceli bir şekilde gerçekleştirmek için tasarlanmıştır. Ekran kullanmadan, fiziksel kodlama kartlarıyla robotik kavramlarını öğretir ve erken yaşta STEM merakını ateşler.',
        achievements: [
            'Temel kodlama ve algoritma mantığını kavrama',
            'Problem çözme ve eleştirel düşünme',
            'Sebep-sonuç ilişkisi kurma',
            'El göz koordinasyonu geliştirme',
            'Takım çalışması ve iletişim becerileri',
            'Yaratıcı düşünme ve hayal gücü'
        ],
        kitContents: [
            { name: 'VEX 123 Robot', description: 'Şarj edilebilir, dayanıklı plastik robot' },
            { name: 'Coder Kartları', description: '40+ farklı komut kartı' },
            { name: 'Coder', description: 'Fiziksel programlama ünitesi' },
            { name: 'Aktivite Alanı', description: 'Oyun ve görev haritaları' },
            { name: 'Öğretmen Kılavuzu', description: 'Ders planları ve aktiviteler' }
        ],
        competitionRules: [
            { title: 'Yarışma Formatı', description: 'VEX 123 yarışmaları, görev tabanlı aktiviteler ve takım çalışması etkinlikleri şeklinde düzenlenir.' },
            { title: 'Takım Yapısı', description: 'Her takım 2-4 öğrenci ve 1 mentor/öğretmenden oluşur.' },
            { title: 'Değerlendirme', description: 'Problem çözme, takım çalışması ve yaratıcılık kriterleri üzerinden puanlama yapılır.' }
        ]
    },
    'vex-go': {
        id: 'vex-go',
        name: 'VEX GO',
        fullName: 'VEX GO Robotics',
        tagline: 'STEM keşfinin başlangıcı',
        ageRange: '6-11 yaş',
        color: '#00AEEF',
        secondaryColor: '#4FC3F7',
        icon: Gamepad2,
        description: 'VEX GO, ilkokul öğrencileri için tasarlanmış, snap-together yapı sistemi ve sezgisel kodlama platformudur. STEM kavramlarını somut deneyimlerle öğretir ve mühendislik tasarım sürecini tanıtır.',
        purpose: 'VEX GO, öğrencilerin fen, teknoloji, mühendislik ve matematik kavramlarını hands-on aktivitelerle keşfetmesini sağlar. Modüler yapısı sayesinde öğrenciler kendi robotlarını tasarlar, inşa eder ve programlar.',
        achievements: [
            'Temel mühendislik prensiplerini anlama',
            'Blok tabanlı programlama becerileri',
            'Yapısal tasarım ve mekanik kavramlar',
            'Bilimsel düşünme ve deney yapma',
            'Takım içi işbirliği ve proje yönetimi',
            'Sunum ve iletişim yetenekleri'
        ],
        kitContents: [
            { name: 'GO Brain', description: 'Merkezi kontrol ünitesi' },
            { name: 'GO Yapı Parçaları', description: '250+ snap-together parça' },
            { name: 'Motorlar', description: '2 adet akıllı motor' },
            { name: 'Sensörler', description: 'Göz sensörü ve LED ışıklar' },
            { name: 'Şarj İstasyonu', description: 'Kablosuz şarj ünitesi' },
            { name: 'VEXcode GO', description: 'Blok tabanlı programlama yazılımı' }
        ],
        competitionRules: [
            { title: 'Yarışma Formatı', description: 'STEM laboratuvarı formatında tasarım meydan okumaları ve robot görevleri.' },
            { title: 'Takım Yapısı', description: '2-6 öğrenci ve en az 1 mentor.' },
            { title: 'Değerlendirme', description: 'Mühendislik defteri, takım sunumu ve robot performansı değerlendirilir.' }
        ]
    },
    'vex-iq': {
        id: 'vex-iq',
        name: 'VEX IQ',
        fullName: 'VEX IQ Competition',
        tagline: 'Ortaokul robotik ligi',
        ageRange: '8-14 yaş',
        color: '#F7941D',
        secondaryColor: '#2196F3',
        icon: Puzzle,
        description: 'VEX IQ, ortaokul seviyesindeki öğrenciler için tasarlanmış, plastik yapı sistemine sahip yarışma robotik platformudur. Her yıl değişen oyun teması ile takım çalışması ve stratejik düşünmeyi teşvik eder.',
        purpose: 'VEX IQ, öğrencileri resmi yarışma ortamına hazırlar. Robotik mühendislik, programlama ve takım dinamikleri konularında derinlemesine deneyim sunar. Ulusal ve uluslararası yarışmalara katılım imkanı sağlar.',
        achievements: [
            'Kapsamlı robotik mühendislik bilgisi',
            'Python ve blok tabanlı kodlama',
            'Stratejik düşünme ve oyun analizi',
            'Profesyonel takım yönetimi',
            'Mühendislik defteri tutma alışkanlığı',
            'Jüri önünde sunum yapabilme'
        ],
        kitContents: [
            { name: 'IQ Robot Brain', description: 'Gelişmiş kontrol ünitesi' },
            { name: 'IQ Yapı Seti', description: '800+ plastik yapı parçası' },
            { name: 'Akıllı Motorlar', description: '4 adet feedback motorları' },
            { name: 'Sensör Paketi', description: 'Mesafe, dokunma, renk sensörleri' },
            { name: 'Kontroller', description: 'Kablosuz kumanda sistemi' },
            { name: 'Yarışma Alanı', description: 'Resmi yarışma sahası elemanları' }
        ],
        competitionRules: [
            { title: 'Teamwork Challenge', description: 'İki takım birlikte, 60 saniyede maksimum puan toplamaya çalışır.' },
            { title: 'Robot Skills', description: 'Sürücü ve otonom beceri turnuvaları ile dünya sıralaması.' },
            { title: 'Design Award', description: 'Mühendislik defteri ve robot tasarımı jüri tarafından değerlendirilir.' }
        ]
    },
    'vex-v5': {
        id: 'vex-v5',
        name: 'VEX V5 (VRC)',
        fullName: 'VEX Robotics Competition',
        tagline: 'Profesyonel metal robotik',
        ageRange: '11-18 yaş',
        color: '#E31837',
        secondaryColor: '#1A1A1A',
        icon: Bot,
        description: 'VEX V5, lise seviyesinde profesyonel metal robot yapımı ve ileri düzey programlama sunan, dünyanın en büyük robotik yarışma platformudur. VEX Worlds şampiyonasına giden resmi yoldur.',
        purpose: 'VEX V5 (VRC), öğrencileri gerçek mühendislik kariyerlerine hazırlar. Endüstriyel standartlarda metal işleme, ileri programlama dilleri ve profesyonel yarışma deneyimi sunar. Üniversite başvurularında güçlü bir portföy oluşturur.',
        achievements: [
            'Metal işleme ve endüstriyel tasarım',
            'C++ ve Python ile ileri programlama',
            'Otonom robot sistemleri geliştirme',
            'PID kontrol ve sensör füzyonu',
            'Proje yönetimi ve liderlik',
            'Uluslararası yarışma deneyimi'
        ],
        kitContents: [
            { name: 'V5 Robot Brain', description: 'ARM Cortex işlemcili ana ünite' },
            { name: 'V5 Smart Motors', description: '11W akıllı motorlar' },
            { name: 'Metal Yapı Seti', description: 'Alüminyum C-channel ve plakalar' },
            { name: 'V5 Sensörler', description: 'Vision, GPS, IMU sensörleri' },
            { name: 'V5 Controller', description: 'Ergonomik kablosuz kumanda' },
            { name: 'Şarj Sistemi', description: 'V5 batarya ve şarj ünitesi' }
        ],
        competitionRules: [
            { title: 'Qualification Matches', description: 'Rastgele eşleşmelerle sıralama maçları.' },
            { title: 'Alliance Selection', description: 'Üst sıradaki takımlar ittifak seçer.' },
            { title: 'Elimination Rounds', description: 'Bo3 eleme maçlarıyla şampiyonluk.' },
            { title: 'Judged Awards', description: 'Excellence, Design, Innovate ve diğer ödüller.' }
        ]
    },
    'vex-ai': {
        id: 'vex-ai',
        name: 'VEX AI / Workcell',
        fullName: 'VEX AI & V5 Workcell',
        tagline: 'Yapay zeka ve endüstriyel otomasyon',
        ageRange: '14-18 yaş',
        color: '#6B21A8',
        secondaryColor: '#A855F7',
        icon: Cpu,
        description: 'VEX AI ve V5 Workcell, yapay zeka, makine öğrenmesi ve endüstriyel otomasyon konularında uzmanlaşmak isteyen ileri düzey öğrenciler için tasarlanmış platformlardır.',
        purpose: 'Bu platformlar, öğrencileri Endüstri 4.0 ve yapay zeka çağına hazırlar. Gerçek dünya otomasyon problemlerini çözme, AI algoritmaları geliştirme ve endüstriyel robot programlama deneyimi sunar.',
        achievements: [
            'Yapay zeka ve makine öğrenmesi temelleri',
            'Bilgisayarlı görü (Computer Vision)',
            'Endüstriyel robot kol programlama',
            'Otomasyon hattı tasarımı',
            'Veri analizi ve optimizasyon',
            'Profesyonel mühendislik yazılımları'
        ],
        kitContents: [
            { name: 'AI Jetson Nano', description: 'NVIDIA AI işlemci kartı' },
            { name: 'AI Kamera', description: 'Stereo görüntü sistemi' },
            { name: 'GPS Sensör', description: 'Hassas konum belirleme' },
            { name: 'Workcell Arm', description: '5 eksenli robot kol' },
            { name: 'Konveyör Sistemi', description: 'Malzeme taşıma bandı' },
            { name: 'AI Yazılım Paketi', description: 'Python AI kütüphaneleri' }
        ],
        competitionRules: [
            { title: 'VAIC Format', description: 'İki otonom robot, koordineli çalışarak görevleri tamamlar.' },
            { title: 'Workcell Challenge', description: 'Endüstriyel otomasyon görevleri ve optimizasyon.' },
            { title: 'AI Innovation', description: 'Yenilikçi AI çözümleri jüri tarafından değerlendirilir.' }
        ]
    },
    'vex-u': {
        id: 'vex-u',
        name: 'VEX U',
        fullName: 'VEX University',
        tagline: 'Üniversite robotik ligi',
        ageRange: '18+ yaş',
        color: '#1E3A8A',
        secondaryColor: '#3B82F6',
        icon: GraduationCap,
        description: 'VEX U, üniversite öğrencileri için tasarlanmış, sınırsız tasarım özgürlüğü sunan elit robotik yarışma platformudur. Akademik araştırma ve endüstri iş birlikleri için ideal bir ortam sağlar.',
        purpose: 'VEX U, üniversite öğrencilerine gerçek mühendislik projelerinde çalışma fırsatı sunar. Custom parça üretimi, ileri robot kinematiği ve profesyonel takım yönetimi deneyimi ile kariyere hazırlar.',
        achievements: [
            'Sınırsız tasarım ve custom parça üretimi',
            'İleri robot kinematiği ve dinamiği',
            'Profesyonel yazılım geliştirme pratikleri',
            'Akademik araştırma ve yayın deneyimi',
            'Endüstri bağlantıları ve staj fırsatları',
            'Uluslararası networking'
        ],
        kitContents: [
            { name: 'VEX V5 Sistem', description: 'Temel V5 elektronik ve motor seti' },
            { name: 'Sınırsız Parça', description: 'Kendi tasarımlarınızı üretebilirsiniz' },
            { name: '3D Yazıcı Parçalar', description: 'Custom plastik bileşenler' },
            { name: 'CNC Parçalar', description: 'Özel metal işleme' },
            { name: 'Gelişmiş Sensörler', description: 'Endüstriyel sensör entegrasyonu' }
        ],
        competitionRules: [
            { title: 'İki Robot Sistemi', description: 'Her takım büyük ve küçük olmak üzere 2 robot yapar.' },
            { title: 'Design Freedom', description: 'VEX dışı parçalar ve 3D baskı serbesttir.' },
            { title: 'Alliance Matches', description: 'İki üniversite takımı ittifak olarak yarışır.' },
            { title: 'Graduate Division', description: 'Yüksek lisans ve doktora öğrencileri için ayrı kategori.' }
        ]
    }
}

export default function ProgramDetailPage() {
    const params = useParams()
    const programSlug = params['program-adi'] as string
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    const program = programsData[programSlug]

    if (!program) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Bulunamadı</h1>
                    <p className="text-gray-600 mb-8">Aradığınız program mevcut değil.</p>
                    <Link href="/vex-nedir">
                        <Button className="bg-primary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            VEX Nedir&apos; sayfasına dön
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const Icon = program.icon

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />

            {/* Hero Section with Program Color */}
            <section
                className="relative py-20 md:py-28 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${program.color} 0%, ${program.secondaryColor} 100%)` }}
            >
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <Link
                            href="/vex-nedir"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            VEX Nedir?
                        </Link>

                        <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Icon className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{program.name}</h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-2">{program.tagline}</p>
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                            {program.ageRange}
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Description */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-600 leading-relaxed text-center"
                    >
                        {program.description}
                    </motion.p>
                </div>
            </section>

            {/* 1. Programın Amacı */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                style={{ backgroundColor: `${program.color}15`, color: program.color }}
                            >
                                <Target className="w-4 h-4" />
                                <span className="text-sm font-medium">Programın Amacı</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Neden {program.name}?
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {program.purpose}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div
                                className="aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center"
                                style={{ backgroundColor: `${program.color}10`, border: `2px solid ${program.color}30` }}
                            >
                                <Icon className="w-32 h-32 opacity-40" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Kazanımlar */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                            style={{ backgroundColor: `${program.color}15`, color: program.color }}
                        >
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">Kazanımlar</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Öğrenciler Ne Kazanır?
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {program.achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: program.color }} />
                                    <span className="text-gray-700">{achievement}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Kit İçeriği */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                            style={{ backgroundColor: `${program.color}15`, color: program.color }}
                        >
                            <Package className="w-4 h-4" />
                            <span className="text-sm font-medium">Kit İçeriği</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Neler Dahil?
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {program.kitContents.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${program.color}15` }}
                                >
                                    <Zap className="w-6 h-6" style={{ color: program.color }} />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Yarışma Kuralları Özeti */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                            style={{ backgroundColor: `${program.color}15`, color: program.color }}
                        >
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Yarışma Kuralları</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Yarışma Formatı
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {program.competitionRules.map((rule, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                style={{ borderLeftWidth: 4, borderLeftColor: program.color }}
                            >
                                <h3 className="font-semibold text-gray-900 mb-2">{rule.title}</h3>
                                <p className="text-gray-600">{rule.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                className="py-16 md:py-20"
                style={{ background: `linear-gradient(135deg, ${program.color} 0%, ${program.secondaryColor} 100%)` }}
            >
                <div className="container mx-auto px-6 max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {program.name} ile Başlamaya Hazır mısınız?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Takım kurma, kayıt ve eğitim programları hakkında bilgi alın.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/takimlar/nasil-kurulur">
                            <Button size="lg" className="bg-white hover:bg-gray-100 font-semibold px-8" style={{ color: program.color }}>
                                Takım Nasıl Kurulur?
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/iletisim/form">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/5 hover:bg-white/20 backdrop-blur-sm font-semibold px-8">
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
                                <li><a href="/vex-nedir" className="text-gray-400 hover:text-primary transition-colors">VEX Nedir?</a></li>
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/vex-nedir/vex-123" className="text-gray-400 hover:text-primary transition-colors">VEX 123</a></li>
                                <li><a href="/vex-nedir/vex-go" className="text-gray-400 hover:text-primary transition-colors">VEX GO</a></li>
                                <li><a href="/vex-nedir/vex-iq" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="/vex-nedir/vex-v5" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
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
