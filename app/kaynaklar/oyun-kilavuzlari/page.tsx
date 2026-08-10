'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Book, MessageCircleQuestion, ClipboardCheck, Wrench, ExternalLink, Download, FileText, AlertCircle, FileStack } from 'lucide-react'


const content = {
    TR: {
        hero: {
            title: 'RECF Oyun Kılavuzları',
            subtitle:
                'RECF Engage, Achieve, Inspire, ADC ve ADC Pro resmi oyun dokümanları ve kuralları'
        },

        disclaimer: {
            title: 'Önemli Uyarı: Resmi Kaynaklar',
            text:
                'Aşağıda sunulan kılavuzlar, 2026-2027 sezonu yarışmaları için resmi kuralları içerir. Bu kurallar sezon içerisinde "Version" güncellemeleri alabilir.',
            important:
                'Yerel çeviriler veya kurallar arasında uyuşmazlık çıkması durumunda her zaman İngilizce Orijinal (Global) Oyun Kılavuzu (Game Manual) geçerlidir.'
        },

        updated: 'Son Güncelleme'
    },

    EN: {
        hero: {
            title: 'RECF Game Manuals',
            subtitle:
                'Official game documents and rules for RECF Engage, Achieve, Inspire, ADC, and ADC Pro'
        },

        disclaimer: {
            title: 'Important Notice: Official Sources',
            text:
                'The manuals provided below contain the official rules for the 2026-2027 season competitions. These rules may receive "Version" updates throughout the season.',
            important:
                'In case of any conflict between local translations or rules, the original English (Global) Game Manual always takes precedence.'
        },

        updated: 'Last Updated'
    }
} as const

const manualSections = [
    {
        id: 'engage',
        program: {
            TR: 'RECF Engage (Tier Takeover)',
            EN: 'RECF Engage (Tier Takeover)'
        },
        version: 'Versiyon 1.0',
        versionEN: 'Version 1.0',
        date: {
            TR: '1 Mayıs 2026',
            EN: 'May 1, 2026'
        },
        theme: 'red',
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconColor: 'text-red-600',
        links: [
            {
                title: {
                    TR: 'Oyun Kılavuzu (Game Manual)',
                    EN: 'Game Manual'
                },
                url: 'https://recf.org/documents',
                icon: <Book className="w-5 h-5" />,
                primary: true
            },
            {
                title: {
                    TR: 'Resmi Soru-Cevap (Q&A)',
                    EN: 'Official Q&A'
                },
                url: 'https://www.robotevents.com/',
                icon: <MessageCircleQuestion className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'Saha Muayene Formu (Inspection Checklist)',
                    EN: 'Inspection Checklist'
                },
                url: 'https://recf.org/documents',
                icon: <ClipboardCheck className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'İzin Verilen Parçalar (Legal Parts)',
                    EN: 'Legal Parts'
                },
                url: 'https://recf.org/documents',
                icon: <Wrench className="w-5 h-5" />,
                primary: false
            }
        ]
    },

    {
        id: 'achieve',
        program: {
            TR: 'RECF Achieve & Inspire (Pinnacle)',
            EN: 'RECF Achieve & Inspire (Pinnacle)'
        },
        version: 'Versiyon 1.0',
        versionEN: 'Version 1.0',
        date: {
            TR: '5 Mayıs 2026',
            EN: 'May 5, 2026'
        },
        theme: 'blue',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconColor: 'text-blue-600',
        links: [
            {
                title: {
                    TR: 'Oyun Kılavuzu (Game Manual)',
                    EN: 'Game Manual'
                },
                url: 'https://recf.org/documents',
                icon: <Book className="w-5 h-5" />,
                primary: true
            },
            {
                title: {
                    TR: 'Resmi Soru-Cevap (Q&A)',
                    EN: 'Official Q&A'
                },
                url: 'https://www.robotevents.com/',
                icon: <MessageCircleQuestion className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'Saha Muayene Formu (Inspection Checklist)',
                    EN: 'Inspection Checklist'
                },
                url: 'https://recf.org/documents',
                icon: <ClipboardCheck className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'İzin Verilen Parçalar (Legal Parts)',
                    EN: 'Legal Parts'
                },
                url: 'https://recf.org/documents',
                icon: <Wrench className="w-5 h-5" />,
                primary: false
            }
        ]
    },

    {
        id: 'adc',
        program: {
            TR: 'Aerial Drone Competition (ADC / ADC Pro)',
            EN: 'Aerial Drone Competition (ADC / ADC Pro)'
        },
        version: 'Versiyon 1.0',
        versionEN: 'Version 1.0',
        date: {
            TR: '15 Mayıs 2026',
            EN: 'May 15, 2026'
        },
        theme: 'emerald',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        iconColor: 'text-emerald-600',
        links: [
            {
                title: {
                    TR: 'Oyun Kılavuzu (Game Manual)',
                    EN: 'Game Manual'
                },
                url: 'https://recf.org/documents',
                icon: <Book className="w-5 h-5" />,
                primary: true
            },
            {
                title: {
                    TR: 'Resmi Soru-Cevap (Q&A)',
                    EN: 'Official Q&A'
                },
                url: 'https://www.robotevents.com/',
                icon: <MessageCircleQuestion className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'Saha Muayene Formu (Inspection Checklist)',
                    EN: 'Inspection Checklist'
                },
                url: 'https://recf.org/documents',
                icon: <ClipboardCheck className="w-5 h-5" />,
                primary: false
            },
            {
                title: {
                    TR: 'Drone ve Parça Standartları',
                    EN: 'Drone and Part Standards'
                },
                url: 'https://recf.org/documents',
                icon: <Wrench className="w-5 h-5" />,
                primary: false
            }
        ]
    }
]

export default function OyunKilavuzlariPage() {
    const { language, setLanguage } = useLanguage()
    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Disclaimer Panel */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-16 flex gap-4 items-start shadow-sm max-w-4xl mx-auto">
                        <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 mb-2 text-lg">{t.disclaimer.title}</h4>
                            <p className="text-amber-800 leading-relaxed text-sm md:text-base">
                                {t.disclaimer.text}
                                <strong className="block mt-2 font-bold text-amber-900 underline decoration-amber-300 decoration-2 underline-offset-2">
                                    {t.disclaimer.important}
                                </strong>
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
                        {manualSections.map((section) => (
                            <div key={section.id} className={`rounded-3xl border flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white ${section.border}`}>

                                {/* Header */}
                                <div className={`p-8 pb-6 border-b ${section.bg} ${section.border}`}>
                                    <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm ${section.iconColor}`}>
                                        <FileStack className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{language === 'TR' ? section.program.TR : section.program.EN}</h3>
                                    <div className="flex items-center gap-4 text-sm font-medium text-gray-700 bg-white/60 p-3 rounded-xl inline-flex">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            {language === 'TR' ? section.version : section.versionEN}
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                                        <div className="flex items-center gap-2">
                                            {t.updated}: {language === 'TR' ? section.date.TR : section.date.EN}
                                        </div>
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="p-8 flex-grow flex flex-col gap-4">
                                    {section.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-between p-4 rounded-xl transition-all ${link.primary
                                                ? `bg-${section.theme}-600 text-white hover:bg-${section.theme}-700 shadow-md`
                                                : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 font-semibold">
                                                <div className={`${link.primary ? 'text-white/90' : 'text-gray-500'}`}>
                                                    {link.icon}
                                                </div>
                                                {language === 'TR' ? link.title.TR : link.title.EN}
                                            </div>
                                            <ExternalLink className={`w-4 h-4 ${link.primary ? 'text-white/70' : 'text-gray-400'}`} />
                                        </a>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    )
}
