'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Users,
    FileText,
    Package,
    Flag,
    Compass,
    CheckCircle2,
    Sparkles,
    MonitorSmartphone
} from 'lucide-react'

const questLevels = [
    {
        level: 1,
        title: {
            TR: 'PROGRAMINI SEÇ',
            EN: 'CHOOSE YOUR PROGRAM'
        },
        subtitle: {
            TR: 'Doğru Ligi Belirle',
            EN: 'Choose the Right League'
        },
        icon: Compass,
        color: '#00A651',
        description: {
            TR: 'Öğrencilerinin yaş grubuna ve ilgi alanlarına göre en uygun RECF programını seç.',
            EN: 'Choose the most suitable RECF program based on your students’ age group and interests.'
        },
        tasks: {
            TR: [
                'Programını seç: Engage, Achieve, Inspire, ADC veya ADC Pro.',
                'Seçilen ligin yaş sınırlarını kontrol et',
                'Oyun yapısını ve kurallarını incele'
            ],
            EN: [
                'Choose your program: Engage, Achieve, Inspire, ADC, or ADC Pro.',
                'Check the age requirements of the selected league',
                'Review the game structure and rules'
            ]
        },
        reward: {
            TR: '🎯 Hedef Program Belirlendi',
            EN: '🎯 Target Program Selected'
        },
        duration: {
            TR: '1-2 Gün',
            EN: '1-2 Days'
        }
    },

    {
        level: 2,
        title: {
            TR: 'TAKIMINI OLUŞTUR',
            EN: 'BUILD YOUR TEAM'
        },
        subtitle: {
            TR: 'Ekibi Bir Araya Getir',
            EN: 'Bring Your Team Together'
        },
        icon: Users,
        color: '#00AEEF',
        description: {
            TR: 'Okulunuzda, kurumunuzda veya bağımsız olarak öğrencileri ve mentorları bir araya getirerek takımın temellerini atın.',
            EN: 'Bring students and mentors together at your school, organization, or independently to build the foundation of your team.'
        },
        tasks: {
            TR: [
                'En az 1 yetişkin Mentor / Danışman belirle',
                'Öğrencileri takıma davet et',
                'Görev dağılımı yap (Sürücü, Yazılımcı, Tasarımcı, Kaptan)'
            ],
            EN: [
                'Appoint at least 1 adult Mentor / Advisor',
                'Invite students to join the team',
                'Assign roles (Driver, Programmer, Designer, Captain)'
            ]
        },
        reward: {
            TR: '👥 Takım Çekirdeği Kuruldu',
            EN: '👥 Team Core Established'
        },
        duration: {
            TR: '1 Hafta',
            EN: '1 Week'
        }
    },

    {
        level: 3,
        title: {
            TR: 'RECFEVENTS HESABINI AÇ',
            EN: 'CREATE YOUR RECFEVENTS ACCOUNT'
        },
        subtitle: {
            TR: 'Resmi Kayıt İşlemleri',
            EN: 'Official Registration'
        },
        icon: FileText,
        color: '#F7941D',
        description: {
            TR: 'Küresel ekosisteme dahil olmak için takımının resmi kaydını tamamla ve takım numaranı al.',
            EN: 'Complete your team’s official registration and receive your team number to join the global ecosystem.'
        },
        tasks: {
            TR: [
                'RECFevents hesabını oluştur',
                'Takım kaydını tamamla ve sezonluk takım numarasını al (Örn: 12345A)',
                'Yetişkin mentorun arka plan (Background) doğrulamasını yap'
            ],
            EN: [
                'Create your RECFevents account',
                'Complete your team registration and receive your seasonal team number (e.g. 12345A)',
                'Complete the adult mentor’s Background Check verification'
            ]
        },
        reward: {
            TR: '🎖️ Resmi RECF Takım Kimliği',
            EN: '🎖️ Official RECF Team Identity'
        },
        duration: {
            TR: '1-2 Gün',
            EN: '1-2 Days'
        }
    },

    {
        level: 4,
        title: {
            TR: 'DONANIM VE KAYNAK PLANINI HAZIRLA',
            EN: 'PREPARE YOUR HARDWARE AND RESOURCE PLAN'
        },
        subtitle: {
            TR: 'Malzeme ve Araç Tedariki',
            EN: 'Materials and Equipment'
        },
        icon: Package,
        color: '#E31837',
        description: {
            TR: 'Seçtiğin programın oyun kılavuzuna göre uygun donanım ve yazılım planını hazırla.',
            EN: 'Prepare the appropriate hardware and software plan according to the game manual of your selected program.'
        },
        tasks: {
            TR: [
                'Sezonun resmi oyun kılavuzunu (Game Manual) oku',
                'Kayıt olduğun lige uygun resmi robot/drone kitini veya bileşenleri planla',
                'Gerekli araç gereçleri, donanım bileşenlerini ve eğitim alanını (saha) organize et'
            ],
            EN: [
                'Read the official Game Manual for the season',
                'Plan the official robot/drone kit or components suitable for your registered league',
                'Organize the necessary tools, hardware components, and practice area'
            ]
        },
        reward: {
            TR: '🔧 Hazırlıklar Tamam',
            EN: '🔧 Preparation Complete'
        },
        duration: {
            TR: '1-2 Hafta',
            EN: '1-2 Weeks'
        }
    },

    {
        level: 5,
        title: {
            TR: 'SİSTEMİNİ GELİŞTİR',
            EN: 'DEVELOP YOUR SYSTEM'
        },
        subtitle: {
            TR: 'Tasarla, Kodla, Sür',
            EN: 'Design, Code, Drive'
        },
        icon: MonitorSmartphone,
        color: '#6B21A8',
        description: {
            TR: 'Oyun stratejinize göre mühendislik sürecini işleterek sisteminizi tasarlayın ve yazılımlarınızı geliştirin.',
            EN: 'Design your system and develop your software by following the engineering process according to your game strategy.'
        },
        tasks: {
            TR: [
                'Robot veya drone sisteminizi oyun görevlerine göre inşa et',
                'Resmi platform yazılımları ile otonom kodlarınızı yazın',
                'Mühendislik Defterinizi (Engineering Notebook) tutmaya başlayın',
                'Bol bol deneme sürüşü ve otonom testleri yapın'
            ],
            EN: [
                'Build your robot or drone system according to the game tasks',
                'Write your autonomous code using official platform software',
                'Start maintaining your Engineering Notebook',
                'Perform plenty of driving and autonomous tests'
            ]
        },
        reward: {
            TR: '🚀 Sistem Yarışmaya Hazır',
            EN: '🚀 System Ready for Competition'
        },
        duration: {
            TR: 'Sürekli',
            EN: 'Ongoing'
        }
    },

    {
        level: 6,
        title: {
            TR: 'ETKİNLİĞE KATIL',
            EN: 'JOIN AN EVENT'
        },
        subtitle: {
            TR: 'Arenaya Çık',
            EN: 'Enter the Arena'
        },
        icon: Flag,
        color: '#EAB308',
        description: {
            TR: 'Bölgesel ve ulusal turnuvalara kayıt olarak tüm emeklerinizi arenada sergileyin.',
            EN: 'Register for regional and national tournaments and showcase all your hard work in the arena.'
        },
        tasks: {
            TR: [
                'RECFevents üzerinden yerel etkinliklere kayıt ol',
                'Denetim (Inspection) kurallarını son kez kontrol et',
                'Takım ruhu ve sportmenlik (Student-Centered) ilkesiyle yarış',
                'Diğer takımlarla dostluklar kur ve deneyim kazan'
            ],
            EN: [
                'Register for local events through RECFevents',
                'Perform a final check of the Inspection requirements',
                'Compete with team spirit and sportsmanship while following the Student-Centered principle',
                'Build friendships with other teams and gain experience'
            ]
        },
        reward: {
            TR: '🏆 Turnuva Deneyimi',
            EN: '🏆 Tournament Experience'
        },
        duration: {
            TR: 'Etkinlik Günü',
            EN: 'Event Day'
        }
    }
]

const content = {
    TR: {
        hero: {
            title: 'RECF Takımı Nasıl Kurulur?',
            subtitle: 'Sıfırdan başlayarak resmi bir RECF Türkiye takımı olmanın adımları'
        },

        step: 'ADIM',
        duration: 'SÜRE',
        rewardTitle: 'Kazanım',

        cta: {
            badge: 'Maceraya Başla',
            title: 'Ekibini Kur, Geleceği Kodla',
            description:
                'Binlerce takımın yer aldığı global RECF ekosistemine katıl. Türkiye temsilcisi Intechne Teknoloji güvencesiyle etkinliklerde yerini al.',
            register: 'Takım Kaydını Başlat',
            events: 'Etkinlikleri İncele'
        }
    },

    EN: {
        hero: {
            title: 'How to Start an RECF Team?',
            subtitle: 'The steps to becoming an official RECF Turkey team from scratch'
        },

        step: 'STEP',
        duration: 'DURATION',
        rewardTitle: 'Achievement',

        cta: {
            badge: 'Start Your Journey',
            title: 'Build Your Team, Code the Future',
            description:
                'Join the global RECF ecosystem with thousands of teams. Take your place at events with the support of Intechne Technology, the RECF Turkey representative.',
            register: 'Start Team Registration',
            events: 'Explore Events'
        }
    }
} as const

export default function NasilTakimKurulurPage() {
    const { language, setLanguage } = useLanguage()

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">

            {/* Navbar */}
            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l => l === 'TR' ? 'EN' : 'TR')
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            {/* Hero */}
            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* Timeline */}
            <section className="py-20 max-w-5xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative">

                    {/* Central/Left Vertical Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block z-0" />

                    {questLevels.map((quest, index) => {

                        const isEven = index % 2 === 0

                        return (
                            <div
                                key={quest.level}
                                className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform duration-300 w-full relative flex flex-col ${isEven
                                        ? 'md:text-right md:pr-12 md:col-start-1 md:items-end'
                                        : 'md:text-left md:pl-12 md:col-start-2 md:items-start'
                                    }`}
                                style={{ gridRowStart: index + 1 }}
                            >

                                {/* Center Node - Desktop */}
                                <div
                                    className={`hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 items-center justify-center z-20 shadow-lg ${isEven
                                            ? 'right-0 translate-x-[calc(50%+24px)]'
                                            : 'left-0 -translate-x-[calc(50%+24px)]'
                                        }`}
                                    style={{ borderColor: quest.color }}
                                >
                                    <quest.icon
                                        className="w-7 h-7"
                                        style={{ color: quest.color }}
                                    />

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
                                        <span
                                            className="text-xs font-bold uppercase tracking-wider"
                                            style={{ color: quest.color }}
                                        >
                                            {t.step} {quest.level}
                                        </span>
                                    </div>

                                </div>

                                {/* Title & Subtitle */}
                                <div
                                    className={`flex flex-col mb-6 w-full text-left ${isEven
                                            ? 'md:items-end md:text-right'
                                            : 'md:items-start md:text-left'
                                        }`}
                                >

                                    <div
                                        className="text-xs font-extrabold tracking-wider mb-1"
                                        style={{ color: quest.color }}
                                    >
                                        {t.step} {quest.level} • {t.duration}:{' '}
                                        {quest.duration[language]}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                        {quest.title[language]}
                                    </h3>

                                    <p className="text-gray-500 font-medium">
                                        {quest.subtitle[language]}
                                    </p>

                                </div>

                                {/* Description */}
                                <p
                                    className={`text-gray-600 mb-6 leading-relaxed text-left w-full ${isEven
                                            ? 'md:text-right'
                                            : 'md:text-left'
                                        }`}
                                >
                                    {quest.description[language]}
                                </p>

                                {/* Tasks Checklist */}
                                <div
                                    className={`space-y-3 mb-6 w-full flex flex-col items-start ${isEven
                                            ? 'md:items-end md:text-right'
                                            : 'md:items-start md:text-left'
                                        }`}
                                >

                                    {quest.tasks[language].map(
                                        (task, tIdx) => (
                                            <div
                                                key={tIdx}
                                                className={`flex items-start gap-3 w-full ${isEven
                                                        ? 'md:flex-row-reverse md:text-right text-left'
                                                        : 'text-left'
                                                    }`}
                                            >

                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />

                                                <span className="text-sm text-gray-700 leading-snug flex-1">
                                                    {task}
                                                </span>

                                            </div>
                                        )
                                    )}

                                </div>

                                {/* Reward Footer */}
                                <div
                                    className={`pt-6 border-t border-gray-100 flex flex-col gap-2 w-full ${isEven
                                            ? 'md:items-end'
                                            : 'md:items-start'
                                        }`}
                                >

                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {t.rewardTitle}
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700">
                                        {quest.reward[language]}
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

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">

                        <Sparkles className="w-5 h-5 text-yellow-400" />

                        <span className="text-sm font-medium">
                            {t.cta.badge}
                        </span>

                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        {t.cta.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        {t.cta.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                        <Link href="/takimlar/kayit">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg w-full sm:w-auto shadow-xl shadow-primary/20"
                            >
                                {t.cta.register}
                            </Button>
                        </Link>

                        <Link href="/yarismalar/etkinlik-takvimi">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-600 text-gray-900 hover:bg-white hover:text-gray-900 px-8 h-14 text-lg w-full sm:w-auto"
                            >
                                {t.cta.events}
                            </Button>
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    )
}