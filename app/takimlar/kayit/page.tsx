<<<<<<< HEAD
'use client'

import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Users, FileText, Globe, Building2, ArrowRight, ExternalLink, LifeBuoy, MapPin, Compass } from 'lucide-react'

const registerSteps = [
    {
        id: 1,
        title: 'Programını Seç',
        description: 'Engage (İlkokul/Ortaokul), Achieve (Ortaokul/Lise), Inspire (Üniversite), ADC veya ADC Pro arasından hedefine uygun programı belirle.',
        icon: Compass,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100'
    },
    {
        id: 2,
        title: 'RECFevents Hesabı Aç',
        description: 'Takım mentorun veya kurum yetkilin adına recfevents.org platformunda resmi bir hesap oluştur ve doğrulamayı tamamla.',
        icon: Users,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100'
    },
    {
        id: 3,
        title: 'Takım ve Kurum Bilgilerini Gir',
        description: 'Okulun/Kurumun adı, adresi, yaş kategorisi ve iletişim bilgileriyle takımının detaylı profilini oluştur.',
        icon: Building2,
        color: 'text-green-500',
        bgColor: 'bg-green-100'
    },
    {
        id: 4,
        title: 'Sezonluk Kaydını Tamamla',
        description: 'Yıllık takım kaydını (Season Registration) tamamla ve resmi RECF takım numaranı (Örn: 12345A) alarak küresel ekosisteme katıl.',
        icon: FileText,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100'
    },
    {
        id: 5,
        title: 'Türkiye Etkinliklerine Başvur',
        description: 'RECFevents üzerinden Türkiye (Turkey) filtresini kullanarak Intechne Teknoloji tarafından düzenlenen resmi etkinliklere kaydol.',
        icon: MapPin,
        color: 'text-red-500',
        bgColor: 'bg-red-100'
    }
]

const programsList = [
    { name: 'RECF Engage', age: 'İlkokul / Ortaokul' },
    { name: 'RECF Achieve', age: 'Ortaokul / Lise' },
    { name: 'RECF Inspire', age: 'Üniversite' },
    { name: 'Aerial Drone Competition (ADC)', age: 'Ortaokul / Lise' },
    { name: 'ADC Pro', age: 'Lise / Üniversite' },
]

export default function TakimKayitPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Takım Kaydı"
                subtitle="Takım kayıtları RECFevents.org üzerinden gerçekleştirilir. RECF programınızı seçin, takım ve kurum bilgilerinizi girin ve takım kaydınızı tamamlayın."
            />

            {/* Main Action Section */}
            <section className="py-16 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Global Arenada Yerinizi Alın</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Tüm resmi kayıt işlemleri, RECF'nin küresel yönetim platformu olan <strong>RECFevents.org</strong> sistemi üzerinden yapılmaktadır. Türkiye'deki turnuvalara katılmak için takımınızın bu sistemde aktif bir kaydının bulunması zorunludur.
                    </p>
                    <a
                        href="https://recfevents.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
                    >
                        RECFevents Üzerinden Kayıt Ol
                        <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                </div>
            </section>

            {/* Programs and Steps */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Sidebar Programs */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-bold text-gray-900">RECF Programları</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    RECFevents sistemine kayıt olurken takımınızın mücadele edeceği doğru yaş kategorisini ve programı seçtiğinizden emin olun:
                                </p>
                                <ul className="space-y-4">
                                    {programsList.map((prog, idx) => (
                                        <li key={idx} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <span className="font-bold text-gray-900">{prog.name}</span>
                                            <span className="text-xs font-semibold text-primary mt-1">{prog.age}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support CTA */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl shadow-gray-900/20">
                                <LifeBuoy className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">Kayıt Desteği</h3>
                                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                    Kayıt adımlarında zorlanıyor musunuz? Intechne Teknoloji destek ekibi size yardımcı olmak için hazır.
                                </p>
                                <Link href="/iletisim/form" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors">
                                    Destek Talebi Oluştur
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Steps Sequence */}
                        <div className="lg:col-span-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nasıl Kayıt Olunur?</h2>
                            <div className="space-y-6 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 z-0 hidden sm:block" />

                                {registerSteps.map((step, idx) => (
                                    <div key={step.id} className="relative z-10 flex items-start gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${step.bgColor} ${step.color} shadow-inner`}>
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                        <div className="pt-2">
                                            <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Adım {step.id}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
=======
'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import {
    Users,
    FileText,
    Globe,
    Building2,
    ArrowRight,
    ExternalLink,
    LifeBuoy,
    MapPin,
    Compass
} from 'lucide-react'

const registerSteps = [
    {
        id: 1,
        title: {
            TR: 'Programını Seç',
            EN: 'Choose Your Program'
        },
        description: {
            TR: 'Engage (İlkokul/Ortaokul), Achieve (Ortaokul/Lise), Inspire (Üniversite), ADC veya ADC Pro arasından hedefine uygun programı belirle.',
            EN: 'Choose the program that best suits your goals from Engage (Elementary/Middle School), Achieve (Middle/High School), Inspire (University), ADC, or ADC Pro.'
        },
        icon: Compass,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100'
    },
    {
        id: 2,
        title: {
            TR: 'RECFevents Hesabı Aç',
            EN: 'Create a RECFevents Account'
        },
        description: {
            TR: 'Takım mentorun veya kurum yetkilin adına recfevents.org platformunda resmi bir hesap oluştur ve doğrulamayı tamamla.',
            EN: 'Create an official account on recfevents.org under your team mentor or institution representative and complete the verification process.'
        },
        icon: Users,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100'
    },
    {
        id: 3,
        title: {
            TR: 'Takım ve Kurum Bilgilerini Gir',
            EN: 'Enter Team and Institution Information'
        },
        description: {
            TR: 'Okulun/Kurumun adı, adresi, yaş kategorisi ve iletişim bilgileriyle takımının detaylı profilini oluştur.',
            EN: 'Create your team profile by entering your school/institution name, address, age category, and contact information.'
        },
        icon: Building2,
        color: 'text-green-500',
        bgColor: 'bg-green-100'
    },
    {
        id: 4,
        title: {
            TR: 'Sezonluk Kaydını Tamamla',
            EN: 'Complete Your Season Registration'
        },
        description: {
            TR: 'Yıllık takım kaydını (Season Registration) tamamla ve resmi RECF takım numaranı (Örn: 12345A) alarak küresel ekosisteme katıl.',
            EN: 'Complete your annual team registration (Season Registration) and receive your official RECF team number (e.g. 12345A) to join the global ecosystem.'
        },
        icon: FileText,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100'
    },
    {
        id: 5,
        title: {
            TR: 'Türkiye Etkinliklerine Başvur',
            EN: 'Register for Events in Türkiye'
        },
        description: {
            TR: 'RECFevents üzerinden Türkiye (Turkey) filtresini kullanarak Intechne Teknoloji tarafından düzenlenen resmi etkinliklere kaydol.',
            EN: 'Use the Türkiye (Turkey) filter on RECFevents to register for official events organized by Intechne Teknoloji.'
        },
        icon: MapPin,
        color: 'text-red-500',
        bgColor: 'bg-red-100'
    }
]

const programsList = [
    {
        name: 'RECF Engage',
        age: {
            TR: 'İlkokul / Ortaokul',
            EN: 'Elementary / Middle School'
        }
    },
    {
        name: 'RECF Achieve',
        age: {
            TR: 'Ortaokul / Lise',
            EN: 'Middle / High School'
        }
    },
    {
        name: 'RECF Inspire',
        age: {
            TR: 'Üniversite',
            EN: 'University'
        }
    },
    {
        name: 'Aerial Drone Competition (ADC)',
        age: {
            TR: 'Ortaokul / Lise',
            EN: 'Middle / High School'
        }
    },
    {
        name: 'ADC Pro',
        age: {
            TR: 'Lise / Üniversite',
            EN: 'High School / University'
        }
    }
]

const content = {
    TR: {
        hero: {
            title: 'RECF Takım Kaydı',
            subtitle:
                'Takım kayıtları RECFevents.org üzerinden gerçekleştirilir. RECF programınızı seçin, takım ve kurum bilgilerinizi girin ve takım kaydınızı tamamlayın.'
        },

        mainAction: {
            title: 'Global Arenada Yerinizi Alın',
            description:
                "Tüm resmi kayıt işlemleri, RECF'nin küresel yönetim platformu olan RECFevents.org sistemi üzerinden yapılmaktadır. Türkiye'deki turnuvalara katılmak için takımınızın bu sistemde aktif bir kaydının bulunması zorunludur.",
            button: 'RECFevents Üzerinden Kayıt Ol'
        },

        programs: {
            title: 'RECF Programları',
            description:
                'RECFevents sistemine kayıt olurken takımınızın mücadele edeceği doğru yaş kategorisini ve programı seçtiğinizden emin olun:'
        },

        support: {
            title: 'Kayıt Desteği',
            description:
                'Kayıt adımlarında zorlanıyor musunuz? Intechne Teknoloji destek ekibi size yardımcı olmak için hazır.',
            button: 'Destek Talebi Oluştur'
        },

        steps: {
            title: 'Nasıl Kayıt Olunur?',
            step: 'Adım'
        }
    },

    EN: {
        hero: {
            title: 'RECF Team Registration',
            subtitle:
                'Team registrations are completed through RECFevents.org. Choose your RECF program, enter your team and institution information, and complete your team registration.'
        },

        mainAction: {
            title: 'Take Your Place on the Global Stage',
            description:
                'All official registration procedures are carried out through RECFevents.org, RECF’s global management platform. To participate in tournaments in Türkiye, your team must have an active registration on this system.',
            button: 'Register Through RECFevents'
        },

        programs: {
            title: 'RECF Programs',
            description:
                'When registering your team through RECFevents, make sure you select the correct age category and program for your team:'
        },

        support: {
            title: 'Registration Support',
            description:
                'Having trouble with the registration process? The Intechne Teknoloji support team is ready to help.',
            button: 'Request Support'
        },

        steps: {
            title: 'How to Register',
            step: 'Step'
        }
    }
} as const

export default function TakimKayitPage() {
    const { language, setLanguage } = useLanguage()

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">

            {/* Navbar */}
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

            {/* Hero */}
            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* Main Action Section */}
            <section className="py-16 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-5xl text-center">

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {t.mainAction.title}
                    </h2>

                    <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        {t.mainAction.description}
                    </p>

                    <a
                        href="https://recfevents.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
                    >
                        {t.mainAction.button}

                        <ExternalLink className="w-5 h-5 ml-2" />
                    </a>

                </div>
            </section>

            {/* Programs and Steps */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Sidebar Programs */}
                        <div className="lg:col-span-4 space-y-8">

                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">

                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-6 h-6 text-primary" />

                                    <h3 className="text-xl font-bold text-gray-900">
                                        {t.programs.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-600 mb-6">
                                    {t.programs.description}
                                </p>

                                <ul className="space-y-4">

                                    {programsList.map((prog, idx) => (
                                        <li
                                            key={idx}
                                            className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100"
                                        >
                                            <span className="font-bold text-gray-900">
                                                {prog.name}
                                            </span>

                                            <span className="text-xs font-semibold text-primary mt-1">
                                                {prog.age[language]}
                                            </span>
                                        </li>
                                    ))}

                                </ul>

                            </div>

                            {/* Support CTA */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl shadow-gray-900/20">

                                <LifeBuoy className="w-8 h-8 text-primary mb-4" />

                                <h3 className="text-xl font-bold mb-3">
                                    {t.support.title}
                                </h3>

                                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                    {t.support.description}
                                </p>

                                <Link
                                    href="/iletisim/form"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors"
                                >
                                    {t.support.button}

                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                            </div>

                        </div>

                        {/* Steps Sequence */}
                        <div className="lg:col-span-8">

                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                {t.steps.title}
                            </h2>

                            <div className="space-y-6 relative">

                                {/* Connecting Line */}
                                <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 z-0 hidden sm:block" />

                                {registerSteps.map((step) => (
                                    <div
                                        key={step.id}
                                        className="relative z-10 flex items-start gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                    >

                                        <div
                                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${step.bgColor} ${step.color} shadow-inner`}
                                        >
                                            <step.icon className="w-8 h-8" />
                                        </div>

                                        <div className="pt-2">

                                            <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                                {t.steps.step} {step.id}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {step.title[language]}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {step.description[language]}
                                            </p>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </div>
    )
}
>>>>>>> d9a88c48bf01268ab2d176e8873256c6f4f8ed35
