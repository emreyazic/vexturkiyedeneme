'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Users, FileText, Package, Code, Target, Flag, Zap, Compass, CheckCircle2, Share2, Sparkles, MonitorSmartphone } from 'lucide-react'

const questLevels = [
    {
        level: 1,
        title: 'PROGRAMINI SEÇ',
        subtitle: 'Doğru Ligi Belirle',
        icon: Compass,
        color: '#00A651',
        description: 'Öğrencilerinin yaş grubuna ve ilgi alanlarına göre en uygun RECF programını seç.',
        tasks: [
            'Programını seç: Engage, Achieve, Inspire, ADC veya ADC Pro.',
            'Seçilen ligin yaş sınırlarını kontrol et',
            'Oyun yapısını ve kurallarını incele'
        ],
        reward: '🎯 Hedef Program Belirlendi',
        duration: '1-2 Gün'
    },
    {
        level: 2,
        title: 'TAKIMINI OLUŞTUR',
        subtitle: 'Ekibi Bir Araya Getir',
        icon: Users,
        color: '#00AEEF',
        description: 'Okulunuzda, kurumunuzda veya bağımsız olarak öğrencileri ve mentorları bir araya getirerek takımın temellerini atın.',
        tasks: [
            'En az 1 yetişkin Mentor / Danışman belirle',
            'Öğrencileri takıma davet et',
            'Görev dağılımı yap (Sürücü, Yazılımcı, Tasarımcı, Kaptan)'
        ],
        reward: '👥 Takım Çekirdeği Kuruldu',
        duration: '1 Hafta'
    },
    {
        level: 3,
        title: 'RECFEVENTS HESABINI AÇ',
        subtitle: 'Resmi Kayıt İşlemleri',
        icon: FileText,
        color: '#F7941D',
        description: 'Küresel ekosisteme dahil olmak için takımının resmi kaydını tamamla ve takım numaranı al.',
        tasks: [
            'RECFevents hesabını oluştur',
            'Takım kaydını tamamla ve sezonluk takım numarasını al (Örn: 12345A)',
            'Yetişkin mentorun arka plan (Background) doğrulamasını yap'
        ],
        reward: '🎖️ Resmi RECF Takım Kimliği',
        duration: '1-2 Gün'
    },
    {
        level: 4,
        title: 'DONANIM VE KAYNAK PLANINI HAZIRLA',
        subtitle: 'Malzeme ve Araç Tedariki',
        icon: Package,
        color: '#E31837',
        description: 'Seçtiğin programın oyun kılavuzuna göre uygun donanım ve yazılım planını hazırla.',
        tasks: [
            'Sezonun resmi oyun kılavuzunu (Game Manual) oku',
            'Kayıt olduğun lige uygun resmi robot/drone kitini veya bileşenleri planla',
            'Gerekli araç gereçleri, donanım bileşenlerini ve eğitim alanını (saha) organize et'
        ],
        reward: '🔧 Hazırlıklar Tamam',
        duration: '1-2 Hafta'
    },
    {
        level: 5,
        title: 'SİSTEMİNİ GELİŞTİR',
        subtitle: 'Tasarla, Kodla, Sür',
        icon: MonitorSmartphone,
        color: '#6B21A8',
        description: 'Oyun stratejinize göre mühendislik sürecini işleterek sisteminizi tasarlayın ve yazılımlarınızı geliştirin.',
        tasks: [
            'Robot veya drone sisteminizi oyun görevlerine göre inşa et',
            'Resmi platform yazılımları ile otonom kodlarınızı yazın',
            'Mühendislik Defterinizi (Engineering Notebook) tutmaya başlayın',
            'Bol bol deneme sürüşü ve otonom testleri yapın'
        ],
        reward: '🚀 Sistem Yarışmaya Hazır',
        duration: 'Sürekli'
    },
    {
        level: 6,
        title: 'ETKİNLİĞE KATIL',
        subtitle: 'Arenaya Çık',
        icon: Flag,
        color: '#EAB308',
        description: 'Bölgesel ve ulusal turnuvalara kayıt olarak tüm emeklerinizi arenada sergileyin.',
        tasks: [
            'RECFevents üzerinden yerel etkinliklere kayıt ol',
            'Denetim (Inspection) kurallarını son kez kontrol et',
            'Takım ruhu ve sportmenlik (Student-Centered) ilkesiyle yarış',
            'Diğer takımlarla dostluklar kur ve deneyim kazan'
        ],
        reward: '🏆 Turnuva Deneyimi',
        duration: 'Etkinlik Günü'
    }
]

export default function NasilTakimKurulurPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Takımı Nasıl Kurulur?"
                subtitle="Sıfırdan başlayarak resmi bir RECF Türkiye takımı olmanın adımları"
            />

            <section className="py-20 max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative">
                    
                    {/* Central/Left Vertical Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block z-0" />

                    {questLevels.map((quest, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div 
                                key={quest.level} 
                                className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform duration-300 w-full relative flex flex-col ${
                                    isEven 
                                        ? 'md:text-right md:pr-12 md:col-start-1 md:items-end' 
                                        : 'md:text-left md:pl-12 md:col-start-2 md:items-start'
                                }`}
                                style={{ gridRowStart: index + 1 }}
                            >
                                {/* Center Node (Desktop) */}
                                <div 
                                    className={`hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 items-center justify-center z-20 shadow-lg ${
                                        isEven 
                                            ? 'right-0 translate-x-[calc(50%+24px)]' 
                                            : 'left-0 -translate-x-[calc(50%+24px)]'
                                    }`}
                                    style={{ borderColor: quest.color }}
                                >
                                    <quest.icon className="w-7 h-7" style={{ color: quest.color }} />
                                    <span 
                                        className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                                        style={{ backgroundColor: quest.color }}
                                    >
                                        {quest.level}
                                    </span>
                                </div>

                                {/* Mobile Header */}
                                <div className="flex items-center gap-3 mb-4 md:hidden">
                                    <div 
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                                        style={{ backgroundColor: quest.color }}
                                    >
                                        <quest.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: quest.color }}>ADIM {quest.level}</span>
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <div className={`flex flex-col mb-6 w-full text-left ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                    <div className="text-xs font-extrabold tracking-wider mb-1" style={{ color: quest.color }}>
                                        ADIM {quest.level} • SÜRE: {quest.duration}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{quest.title}</h3>
                                    <p className="text-gray-500 font-medium">{quest.subtitle}</p>
                                </div>

                                {/* Description */}
                                <p className={`text-gray-600 mb-6 leading-relaxed text-left w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                    {quest.description}
                                </p>

                                {/* Tasks Checklist */}
                                <div className={`space-y-3 mb-6 w-full flex flex-col items-start ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                    {quest.tasks.map((task, tIdx) => (
                                        <div key={tIdx} className={`flex items-start gap-3 w-full ${isEven ? 'md:flex-row-reverse md:text-right text-left' : 'text-left'}`}>
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700 leading-snug flex-1">{task}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Reward Footer */}
                                <div className={`pt-6 border-t border-gray-100 flex flex-col gap-2 w-full ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kazanım</div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700">
                                        {quest.reward}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Next Steps CTA */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
                </div>

                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-medium">Maceraya Başla</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Ekibini Kur, Geleceği Kodla
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Binlerce takımın yer aldığı global RECF ekosistemine katıl. Türkiye temsilcisi Intechne Teknoloji güvencesiyle etkinliklerde yerini al.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/takimlar/kayit">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg w-full sm:w-auto shadow-xl shadow-primary/20">
                                Takım Kaydını Başlat
                            </Button>
                        </Link>
                        <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler">
                            <Button size="lg" variant="outline" className="border-gray-600 text-gray-900 hover:bg-white hover:text-gray-900 px-8 h-14 text-lg w-full sm:w-auto">
                                Etkinlikleri İncele
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
