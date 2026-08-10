'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
    Phone, Mail, MapPin, Clock, Copy, Check, ExternalLink, ShieldCheck, Globe
} from 'lucide-react'

interface ContactItem {
    icon: React.ElementType
    label: string
    value: string
    action?: string
    copyable: boolean
}

function ContactCard({ item, language }: { item: ContactItem; language: 'TR' | 'EN' }) {
    const [copied, setCopied] = useState(false)
    const Icon = item.icon

    const handleCopy = async () => {
        await navigator.clipboard.writeText(item.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{item.label}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{item.value}</h3>
            </div>
            {item.copyable && (
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    {item.action && (
                        <a href={item.action} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                            {language === 'TR' ? 'Bağlantıyı Aç' : 'Open Link'}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="text-xs text-gray-500 hover:text-gray-900 ml-auto"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                                {language === 'TR' ? 'Kopyalandı' : 'Copied'}
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5 mr-1" />
                                {language === 'TR' ? 'Kopyala' : 'Copy'}
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default function BilgilerPage() {
    const { language, setLanguage } = useLanguage()

    const content = {
        TR: {
            hero: {
                title: "RECF Türkiye İletişim Bilgileri",
                subtitle:
                    "Resmi iletişim kanalları, temsilcilik adresi ve destek saatleri",
            },

            contactInfo: [
                {
                    icon: Phone,
                    label: "Telefon Destek Hattı",
                    value: "+90 (212) 909 23 10",
                    action: "tel:+902129092310",
                    copyable: true,
                },
                {
                    icon: Mail,
                    label: "E-Posta Adresi",
                    value: "info@recfturkiye.org",
                    action: "mailto:info@recfturkiye.org",
                    copyable: true,
                },
                {
                    icon: MapPin,
                    label: "Temsilcilik Adresi",
                    value: "Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul",
                    action:
                        "https://maps.google.com/?q=Maslak+Mahallesi+Büyükdere+Caddesi+Sarıyer+İstanbul",
                    copyable: true,
                },
                {
                    icon: Clock,
                    label: "Çalışma Saatleri",
                    value: "Pazartesi - Cuma: 09:00 - 18:00",
                    copyable: false,
                },
            ],

            representative: {
                badge: "Resmi Temsilcilik",
                title: "Intechne Teknoloji - RECF Türkiye Temsilciliği",
                text:
                    "RECF programları, takım kayıtları ve turnuva organizasyonları Türkiye resmi temsilcisi Intechne Teknoloji tarafından yürütülmektedir.",
            },

            buttons: {
                openLink: "Bağlantıyı Aç",
                copy: "Kopyala",
                copied: "Kopyalandı",
                contact: "İletişim Formuna Git",
            },
        },

        EN: {
            hero: {
                title: "RECF Turkey Contact Information",
                subtitle: "Official communication channels, representative office address, and support hours",
            },

            contactInfo: [
                {
                    icon: Phone,
                    label: "Phone Support Line",
                    value: "+90 (212) 909 23 10",
                    action: "tel:+902129092310",
                    copyable: true,
                },
                {
                    icon: Mail,
                    label: "Email Address",
                    value: "info@recfturkiye.org",
                    action: "mailto:info@recfturkiye.org",
                    copyable: true,
                },
                {
                    icon: MapPin,
                    label: "Representative Office Address",
                    value: "Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul",
                    action:
                        "https://maps.google.com/?q=Maslak+Mahallesi+Büyükdere+Caddesi+Sarıyer+İstanbul",
                    copyable: true,
                },
                {
                    icon: Clock,
                    label: "Working Hours",
                    value: "Monday - Friday: 09:00 - 18:00",
                    copyable: false,
                },
            ],


            representative: {
                badge: "Official Representative",
                title: "Intechne Technology - RECF Turkey Representative",
                text: "RECF programs, team registrations, and tournament organizations are carried out by the official representative of Turkey, Intechne Technology.",
            },

            buttons: {
                openLink: "Open Link",
                copy: "Copy",
                copied: "Copied",
                contact: "Go to Contact Form",
            },
        },
    } as const

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground flex flex-col justify-between">
            <div>
                <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                    showTranslationWarning={language === 'EN'} />
                <div className="h-20" />

                <CorporateHero
                    title={t.hero.title}
                    subtitle={t.hero.subtitle}
                />

                <section className="py-16 bg-white min-h-[50vh]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {t.contactInfo.map((item, idx) => (
                                <ContactCard key={idx} item={item} language={language} />
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
                                    <ShieldCheck className="w-4 h-4" />
                                    {t.representative.badge}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {t.representative.title}
                                </h3>
                                <p className="text-slate-300 text-sm max-w-2xl">
                                    {t.representative.text}
                                </p>
                            </div>
                            <Link href="/iletisim/form">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-2xl shadow-lg shadow-primary/20 text-base">
                                    {t.buttons.contact}
                                </Button>
                            </Link>
                        </div>

                    </div>
                </section>
            </div>
            <Footer language={language} />
        </div>
    )
}
