'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
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
    gameSummary?: { title: string; description: string }
    extraLinks?: { title: string; url: string }[]
}> = {
    'vex-123': {
        id: 'vex-123',
        name: 'VEX 123',
        fullName: 'Eğitime Hazırlık Araçları: VEX 123',
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
        competitionRules: [] // VEX 123 is not a competition program
    },
    'vex-go': {
        id: 'vex-go',
        name: 'VEX GO',
        fullName: 'Uyumlu Eğitim Araçları: VEX GO',
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
            { name: 'Şarj İstasyonu', description: 'Kablosuz şarj ünitesi' }
        ],
        competitionRules: [] // VEX GO is not a competition program
    },
    'engage': {
        id: 'engage',
        name: 'RECF Engage',
        fullName: 'RECF Engage 2026–2027 Oyunu: Tier Takeover',
        tagline: 'İlkokul ve ortaokul öğrencileri için yaratıcılık, takım çalışması ve mühendislik odaklı robotik yarışma programı.',
        ageRange: 'U12 ve U15',
        color: '#F7941D',
        secondaryColor: '#2196F3',
        icon: Puzzle,
        description: 'RECF Engage, ilkokul ve ortaokul seviyesindeki öğrenciler için tasarlanmış, plastik yapı sistemine sahip yarışma robotik platformudur. Her yıl değişen oyun teması ile takım çalışması ve stratejik düşünmeyi teşvik eder.',
        purpose: 'RECF Engage, öğrencileri resmi yarışma ortamına hazırlar. Robotik mühendislik, programlama ve takım dinamikleri konularında derinlemesine deneyim sunar. Ulusal ve uluslararası yarışmalara katılım imkanı sağlar.',
        achievements: [
            'Kapsamlı robotik mühendislik bilgisi',
            'Python ve blok tabanlı kodlama',
            'Stratejik düşünme ve oyun analizi',
            'Profesyonel takım yönetimi',
            'Mühendislik defteri tutma alışkanlığı',
            'Jüri önünde sunum yapabilme'
        ],
        kitContents: [
            { name: 'Engage Robot Brain', description: 'Gelişmiş kontrol ünitesi' },
            { name: 'Yapı Seti', description: '800+ plastik yapı parçası' },
            { name: 'Akıllı Motorlar', description: '4 adet feedback motorları' },
            { name: 'Sensör Paketi', description: 'Mesafe, dokunma, renk sensörleri' },
            { name: 'Kontroller', description: 'Kablosuz kumanda sistemi' },
            { name: 'Yarışma Alanı', description: 'Resmi yarışma sahası elemanları' }
        ],
        competitionRules: [
            { title: 'Alliance Matches', description: 'İki takım ittifak kurarak ortak hedeflere ulaşmaya ve maksimum puanı toplamaya çalışır.' },
            { title: 'Solo Driving', description: 'Bireysel sürücü becerilerinin değerlendirildiği 60 saniyelik beceri maçları.' },
            { title: 'Solo Coding', description: 'Otonom kodlama becerilerinin test edildiği bireysel görevler ve sıralamalar.' }
        ],
        gameSummary: {
            title: 'RECF Engage 2026–2027 Oyunu: Tier Takeover',
            description: 'Tier Takeover oyununda, takımlar robotlarını stratejik olarak yönlendirerek halkaları direklere yerleştirmeye ve bölge kontrolü sağlamaya çalışırlar. Maksimum puan için ittifak ortaklarıyla koordineli çalışmak esastır.'
        },
        extraLinks: [
            { title: 'Mühendislik Defteri', url: '/kaynaklar/teknik-belgeler' },
            { title: 'Takım Kaydı', url: '/takimlar/kayit' },
            { title: 'Etkinlikler', url: '/yarismalar/etkinlik-takvimi' }
        ]
    },
    'achieve': {
        id: 'achieve',
        name: 'RECF Achieve',
        fullName: 'RECF Achieve 2026–2027 Oyunu: Pinnacle',
        tagline: 'Ortaokul ve lise öğrencileri için farklı yapı sistemleri ve özel üretim imkânları sunan ileri robotik programı.',
        ageRange: 'U15 ve U19',
        color: '#E31837',
        secondaryColor: '#1A1A1A',
        icon: Bot,
        description: 'RECF Achieve, lise ve ortaokul seviyesinde profesyonel metal robot yapımı ve ileri düzey programlama sunan robotik yarışma platformudur. Başarılı takımlar, RECF’nin güncel yeterlilik kurallarına göre RECF etkinlik yolunda ilerler.',
        purpose: 'RECF Achieve, öğrencileri gerçek mühendislik kariyerlerine hazırlar. Endüstriyel standartlarda metal işleme, ileri programlama dilleri ve profesyonel yarışma deneyimi sunar. Üniversite başvurularında güçlü bir portföy oluşturur.',
        achievements: [
            'Metal işleme ve endüstriyel tasarım',
            'C++ ve Python ile ileri programlama',
            'Otonom robot sistemleri geliştirme',
            'PID kontrol ve sensör füzyonu',
            'Proje yönetimi ve liderlik',
            'Kapsamlı yarışma deneyimi'
        ],
        kitContents: [
            { name: 'V5 Robot Brain', description: 'ARM Cortex işlemcili ana ünite' },
            { name: 'V5 Smart Motors', description: '11W akıllı motorlar' },
            { name: 'Metal Yapı Seti', description: 'Alüminyum C-channel ve plakalar' },
            { name: 'Elektronik Sistemler', description: 'İzin verilen tüm V5 elektronik donanımları' },
            { name: 'Özel Üretim (Custom Parça)', description: 'Belirli kurallar çerçevesinde 3D baskı ve CNC özel plastik parça kullanımı' },
            { name: 'V5 Sensörler', description: 'Vision, GPS, IMU sensörleri' }
        ],
        competitionRules: [
            { title: 'Alliance Matches', description: 'İkişer takımdan oluşan ittifakların karşılıklı veya işbirliği içinde mücadele ettiği karşılaşmalar.' },
            { title: 'Solo Driving', description: 'Takımların bireysel sürücü yeteneklerini sergilediği beceri maçları.' },
            { title: 'Solo Coding', description: 'Otonom programlama yetkinliğinin ölçüldüğü bağımsız beceri mücadeleleri.' }
        ],
        gameSummary: {
            title: 'RECF Achieve 2026–2027 Oyunu: Pinnacle',
            description: 'Pinnacle oyunu, takımların çok katmanlı alanlarda hedef yapıları tamamlamasını, kritik noktalara tırmanmasını ve oyun süresi bitmeden maksimum zirve kontrolünü sağlamasını hedefler.'
        },
        extraLinks: [
            { title: 'Mühendislik Defteri', url: '/kaynaklar/teknik-belgeler' },
            { title: 'Takım Kaydı', url: '/takimlar/kayit' },
            { title: 'Etkinlikler', url: '/yarismalar/etkinlik-takvimi' }
        ]
    },
    'vex-ai': {
        id: 'vex-ai',
        name: 'VEX AI / Workcell',
        fullName: 'Yapay Zekâ ve Endüstriyel Robotik Eğitim Çözümleri',
        tagline: 'Teknoloji Eğitimleri ve Laboratuvar Çözümleri',
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
        competitionRules: []
    },
    'inspire': {
        id: 'inspire',
        name: 'RECF Inspire',
        fullName: 'RECF Inspire 2026–2027 Oyunu: Pinnacle',
        tagline: 'Üniversite ve yükseköğretim öğrencileri için açık sistemler, özel tasarım ve iki robotlu takım yapısına sahip ileri mühendislik yarışması.',
        ageRange: '18+ yaş / Üniversite',
        color: '#1E3A8A',
        secondaryColor: '#3B82F6',
        icon: GraduationCap,
        description: 'RECF Inspire, üniversite öğrencileri için tasarlanmış, sınırsız tasarım özgürlüğü sunan elit robotik yarışma platformudur. Açık donanım (open hardware) ve özel üretim (custom manufacturing) seçenekleriyle ileri düzey mühendislik becerilerini test eder.',
        purpose: 'RECF Inspire, üniversite öğrencilerine gerçek mühendislik projelerinde çalışma fırsatı sunar. 3D baskı, CNC işleme ve endüstriyel sensör entegrasyonu gibi serbest üretim imkanlarıyla takımları profesyonel hayata hazırlar.',
        achievements: [
            'Sınırsız tasarım ve özel parça üretimi',
            'İleri robot kinematiği ve dinamiği',
            'Profesyonel yazılım geliştirme pratikleri',
            'Akademik araştırma ve takım yönetimi',
            'Endüstri bağlantıları ve staj fırsatları',
            'Uluslararası networking'
        ],
        kitContents: [
            { name: 'Açık Sistemler', description: 'Genişletilebilir elektronik ve sensör ekosistemi' },
            { name: 'Özel Üretim (Custom)', description: 'Sınırsız 3D baskı ve işlenmiş parça özgürlüğü' },
            { name: 'Endüstriyel Sensörler', description: 'LiDAR, Intel RealSense ve özel sensör entegrasyonu' },
            { name: 'Gelişmiş İşlemciler', description: 'Raspberry Pi, Jetson Nano gibi yardımcı işlemci desteği' }
        ],
        competitionRules: [
            { title: 'İki Robotlu Sistem', description: 'Her takım, maçlara koordineli çalışan biri büyük diğeri küçük olmak üzere 2 farklı robotla katılır.' },
            { title: 'Design Freedom', description: 'Sınırsız tasarım özgürlüğü, açık donanım ve özel parça kullanımı serbesttir.' },
            { title: 'Head-to-Head Matches', description: 'İki üniversite takımı karşılıklı olarak yarışır (1v1 takım formatı).' }
        ],
        gameSummary: {
            title: 'RECF Inspire 2026–2027 Oyunu: Pinnacle',
            description: 'Pinnacle oyunu, takımların çok katmanlı alanlarda hedef yapıları tamamlamasını, kritik noktalara tırmanmasını ve oyun süresi bitmeden maksimum zirve kontrolünü sağlamasını hedefler.'
        },
        extraLinks: [
            { title: 'Mühendislik Defteri', url: '/kaynaklar/teknik-belgeler' },
            { title: 'Üniversite Takım Kaydı', url: '/takimlar/kayit' },
            { title: 'Etkinlikler', url: '/yarismalar/etkinlik-takvimi' }
        ]
    },
    'adc': {
        id: 'adc',
        name: 'Aerial Drone Competition',
        fullName: 'RECF Aerial Drone Competition (ADC)',
        tagline: 'Ortaokul ve lise öğrencileri için havacılık ve drone yarışmaları.',
        ageRange: 'Ortaokul ve Lise',
        color: '#00AEEF',
        secondaryColor: '#4FC3F7',
        icon: Gamepad2,
        description: 'Drone teknolojisi ve programlamayı birleştiren yenilikçi uçuş yarışmaları. Öğrenciler kendi drone\'larını tasarlar, kodlar ve uçurur.',
        purpose: 'Aerial Drone Competition, öğrencileri havacılık, uçuş dinamikleri ve otonom kodlama alanlarında geliştirmek için tasarlanmıştır. Gerçek dünya drone teknolojilerine zemin hazırlar.',
        achievements: [
            'Havacılık ve uçuş mekaniği temelleri',
            'Otonom drone programlama',
            'Pilotaj ve manuel uçuş becerileri',
            'Problem çözme ve hızlı karar verme',
            'Mühendislik tasarımı ve dökümantasyon',
            'Ekip içi uyum ve koordinasyon'
        ],
        kitContents: [
            { name: 'Yarışma Drone Seti', description: 'İzin verilen hafif eğitim drone kiti' },
            { name: 'Kumanda', description: 'Kablosuz kontrolör ünitesi' },
            { name: 'Engeller ve Kapılar', description: 'Resmi parkur saha elemanları' },
            { name: 'Yazılım', description: 'Drone kodlama arayüzü' }
        ],
        competitionRules: [
            { title: 'Piloted Matches', description: 'Pilotlar engelli parkurda drone\'larını manuel olarak kontrol ederek puan toplamaya çalışır.' },
            { title: 'Autonomous Flight', description: 'Drone\'un otonom kodlama ile parkuru kendi kendine tamamladığı süre sınırı olan mücadeleler.' },
            { title: 'Team Alliance', description: 'Takımların ittifak halinde ortak uçuş stratejileri geliştirdiği maçlar.' }
        ]
    },
    'adc-pro': {
        id: 'adc-pro',
        name: 'ADC Pro',
        fullName: 'RECF ADC Pro Drone Competition',
        tagline: 'Üniversite öğrencilerine yönelik yapay zeka ve tamamen otonom drone görevleri.',
        ageRange: 'Üniversite',
        color: '#6B21A8',
        secondaryColor: '#A855F7',
        icon: Cpu,
        description: 'Üniversite düzeyinde, tamamen otonom uçuş, yapay zeka entegrasyonu ve gelişmiş bilgisayarlı görü görevlerine odaklanan ileri düzey drone ligi.',
        purpose: 'ADC Pro, öğrencileri otonom havacılık mühendisliği ve yapay zeka tabanlı uçuş sistemlerine hazırlar. Çevre haritalama ve engel algılama gibi ileri algoritmalar test edilir.',
        achievements: [
            'Yapay zeka ve makine öğrenmesi uygulamaları',
            'Bilgisayarlı görü ve engel algılama',
            'ROS (Robot Operating System) ile otonom uçuş',
            'Yörünge planlaması ve kontrol teorisi',
            'Sistem entegrasyonu ve donanım tasarımı',
            'Akademik araştırma ve mühendislik sunumları'
        ],
        kitContents: [
            { name: 'Otonom Geliştirme Drone Kit', description: 'Jetson Nano veya Raspberry Pi takılabilir drone donanımı' },
            { name: 'Stereo Kamera', description: 'Bilgisayarlı görü ve derinlik algılayıcı kamera' },
            { name: 'Lidar Sensör Paketi', description: 'Otonom SLAM haritalama ünitesi' },
            { name: 'ROS Uyumlu Kontrol Kartı', description: 'İleri düzey uçuş kontrolörü' }
        ],
        competitionRules: [
            { title: 'Fully Autonomous Flights', description: 'Drone\'ların hiçbir manuel müdahale olmadan sadece kendi yazılımlarıyla uçtuğu maçlar.' },
            { title: 'Obstacle Avoidance', description: 'Karmaşık engelleri ve dinamik hedefleri yapay zeka yardımıyla algılayıp kaçındığı görevler.' },
            { title: 'AI Tasks', description: 'Renk, şekil ve işaretleri tanıyarak karar alma ve görev tamamlama testleri.' }
        ]
    },
    'online-challenges': {
        id: 'online-challenges',
        name: 'Online Challenges',
        fullName: 'RECF Online Challenges',
        tagline: 'Çevrimiçi mühendislik, tasarım, CAD ve medya yarışmaları.',
        ageRange: 'Tüm Seviyeler',
        color: '#1E3A8A',
        secondaryColor: '#3B82F6',
        icon: Factory,
        description: 'Öğrencilerin fiziksel robot yapımının ötesinde, tasarım, CAD çizimi, topluluk projeleri, video prodüksiyonu ve yazılım geliştirme gibi alanlarda projeler gönderdiği küresel yarışmalar.',
        purpose: 'Online Challenges, ekosistemdeki her öğrencinin kendi uzmanlık alanında (tasarım, yazılım, video, CAD vb.) küresel olarak rekabet etmesini ve portföy oluşturmasını amaçlar.',
        achievements: [
            'CAD ve 3D modelleme becerileri',
            'Multimedya, video kurgu ve iletişim',
            'Bilimsel araştırma ve makale yazımı',
            'Toplumsal fayda ve STEM yaygınlaştırma projeleri',
            'Web ve mobil uygulama geliştirme pratikleri',
            'Uluslararası değerlendirme ve geribildirim alma'
        ],
        kitContents: [
            { name: 'CAD Yazılım Lisansları', description: 'Autodesk Fusion 360, SolidWorks gibi yazılımlara erişim' },
            { name: 'Çevrimiçi Gönderim Portalı', description: 'Projelerin yüklenip oylandığı resmi RECF platformu' }
        ],
        competitionRules: [
            { title: 'Digital Submissions', description: 'Projeler tamamen dijital formatta hazırlanır ve belirlenen tarihlerde sisteme yüklenir.' },
            { title: 'Peer & Expert Review', description: 'Hem halk oylaması hem de RECF uzman jürisi tarafından çift aşamalı değerlendirme yapılır.' },
            { title: 'Global Awards', description: 'Dünya genelinde dereceye giren projelere doğrudan ödüller ve ödül puanları verilir.' }
        ]
    }
}

export default function ProgramDetailPage() {
    const params = useParams()
    const programSlug = params['program-adi'] as string
    const { language, setLanguage } = useLanguage()

    const program = programsData[programSlug]

    if (!program) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Bulunamadı</h1>
                    <p className="text-gray-600 mb-8">Aradığınız program mevcut değil.</p>
                    <Link href="/recf-programlari">
                        <Button className="bg-primary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            RECF Programları sayfasına dön
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const Icon = program.icon

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />

            {program.id === 'vex-123' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    VEX 123, RECF Türkiye yarışma programları arasında yer almaz.
                </div>
            )}
            
            {program.id === 'vex-go' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    VEX GO, eğitim amaçlı kullanılabilen bir ürün grubudur; RECF Türkiye ana yarışma programı değildir.
                </div>
            )}
            
            {program.id === 'vex-ai' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    VEX AI ve Workcell platformları, RECF yarışma programlarından ayrı, bağımsız eğitim ve laboratuvar çözümleridir.
                </div>
            )}

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
                            href="/recf-programlari"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            RECF Programları
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

            {/* Game Summary */}
            {program.gameSummary && (
                <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{ backgroundColor: `${program.color}15`, color: program.color }}
                        >
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Sezon Oyunu</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {program.gameSummary.title}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {program.gameSummary.description}
                        </p>
                    </div>
                </section>
            )}

            {/* 4. Yarışma Kuralları Özeti */}
            {program.competitionRules.length > 0 && (
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-12">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                                style={{ backgroundColor: `${program.color}15`, color: program.color }}
                            >
                                <Target className="w-4 h-4" />
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
            )}

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
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
                        {program.extraLinks ? (
                            program.extraLinks.map((link, idx) => (
                                <Link key={idx} href={link.url}>
                                    <Button size="lg" className="bg-white hover:bg-gray-100 font-semibold px-8" style={{ color: program.color }}>
                                        {link.title}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            ))
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
