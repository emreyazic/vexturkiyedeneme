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
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

                <CorporateHero
                    title={t.hero.title}
                    subtitle={t.hero.subtitle}
                />

                <section className="py-16 bg-white min-h-[50vh]">
                    <div className="container mx-auto px-6 max-w-7xl">

                        {/* Top Language Toggle Switch */}
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-primary/50 rounded-full text-xs font-bold text-gray-700 transition-all shadow-sm cursor-pointer group"
                            >
                                <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                                <span>{t.switch.button}</span>
                                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold tracking-wider uppercase">
                                    {t.switch.short}
                                </span>
                            </button>
                        </div>

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
            <Footer />
        </div >
    )
}


