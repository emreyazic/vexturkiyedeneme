'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
    GraduationCap,
    Building2,
    Globe2,
    Handshake,
    ArrowRight,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function IsBirlikleriPage() {
    const { language, setLanguage } = useLanguage()

    const categories = [
        {
            title: language === 'TR' ? 'Eğitim & Akademi İş Birlikleri' : 'Education & Academy Partnerships',
            description: language === 'TR' 
                ? 'Okullar, üniversiteler ve akademilerle müfredat entegrasyonu ve eğitmen eğitimleri.'
                : 'Curriculum integration and educator training with schools, universities, and academies.',
            icon: GraduationCap,
            colorClass: 'bg-blue-50 text-blue-600'
        },
        {
            title: language === 'TR' ? 'Kurumsal & Sponsorluk İş Birlikleri' : 'Corporate & Sponsorship Partnerships',
            description: language === 'TR'
                ? 'Teknoloji şirketleri ve markalarla yarışma, donanım ve ödül destekleri.'
                : 'Competition, equipment, and award support with technology companies and brands.',
            icon: Building2,
            colorClass: 'bg-green-50 text-green-600'
        },
        {
            title: language === 'TR' ? 'Kamu & Stratejik Ortaklıklar' : 'Public & Strategic Partnerships',
            description: language === 'TR'
                ? 'Bakanlıklar, belediyeler ve kamu kurumlarıyla bölgesel ve ulusal proje ortaklıkları.'
                : 'Regional and national project partnerships with ministries, municipalities, and public institutions.',
            icon: Globe2,
            colorClass: 'bg-purple-50 text-purple-600'
        },
        {
            title: language === 'TR' ? 'Etkinlik & Medya İş Birlikleri' : 'Event & Media Partnerships',
            description: language === 'TR'
                ? 'Organizasyon, sahalar, basın ve iletişim destekleri.'
                : 'Organization, fields, press, and communication supports.',
            icon: Handshake,
            colorClass: 'bg-orange-50 text-orange-600'
        }
    ]

    const partners = [
        {
            id: 'recf',
            name: 'Robotics Education & Competition Foundation (RECF)',
            role: language === 'TR' ? 'Global Organizatör' : 'Global Organizer',
            description: language === 'TR'
                ? 'Dünya çapında STEM ve robotik yarışmalarını yöneten resmi sivil toplum kuruluşudur.'
                : 'The official non-profit organization managing STEM and robotics competitions worldwide.',
            url: 'https://recf.org'
        },
        {
            id: 'intechne',
            name: 'Intechne Teknoloji',
            role: language === 'TR' ? 'Türkiye Resmi Temsilcisi' : 'Turkey Official Representative',
            description: language === 'TR'
                ? 'RECF programlarının Türkiye operasyonlarını, eğitimlerini ve turnuva yönetimini üstlenen yetkili mercidir.'
                : 'The authorized body undertaking Turkey operations, training, and tournament management of RECF programs.',
            url: 'https://intechne.com.tr'
        },
        {
            id: 'vex',
            name: 'VEX Robotics',
            role: language === 'TR' ? 'Donanım Sponsoru' : 'Hardware Sponsor',
            description: language === 'TR'
                ? 'Dünya standartlarında STEM ve robotik yarışma setleri sağlayan resmi donanım üreticisidir.'
                : 'Official hardware manufacturer providing world-class STEM and robotics competition sets.',
            url: 'https://vexrobotics.com'
        }
    ]

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero
                title={language === 'TR' ? 'İş Birliklerimiz ve Partnerlerimiz' : 'Our Partnerships & Sponsors'}
                subtitle={language === 'TR' 
                    ? 'RECF Türkiye ekosistemini büyütmek, genç yetenekleri desteklemek ve STEM eğitimini yaygınlaştırmak için kamu kurumları, üniversiteler, özel sektör ve sivil toplum kuruluşlarıyla stratejik ortaklıklar kuruyoruz.'
                    : 'We build strategic partnerships with public institutions, universities, private sector, and NGOs to expand the RECF Turkey ecosystem, support young talents, and generalize STEM education.'
                }
            />

            {/* 1. İş Birliği Kategorileri */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">
                                {language === 'TR' ? 'Nasıl Birlikte Çalışıyoruz?' : 'How We Work Together'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                            {language === 'TR' ? 'İş Birliği Modellerimiz' : 'Partnership Models'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon
                            return (
                                <div
                                    key={idx}
                                    className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-12 h-12 mb-6 rounded-xl flex items-center justify-center shrink-0 ${cat.colorClass}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{cat.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 2. Partner & Sponsor Logo ve Kart Alanı */}
            <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">
                                {language === 'TR' ? 'Ekosistem Ortaklarımız' : 'Our Ecosystem Partners'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {language === 'TR' ? 'Partnerlerimiz ve Kurumsal Destekçilerimiz' : 'Partners & Corporate Supporters'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partners.map((partner) => (
                            <a
                                key={partner.id}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-full flex flex-col shadow-sm"
                            >
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 transition-colors group-hover:bg-primary/10">
                                    <span className="text-2xl font-bold text-gray-400 group-hover:text-primary transition-colors">
                                        {partner.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {partner.name}
                                </h3>
                                <p className="text-sm font-semibold text-primary mb-4">{partner.role}</p>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{partner.description}</p>
                                
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors mt-auto">
                                    <span>{language === 'TR' ? 'Ziyaret Et' : 'Visit Website'}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Çağrı (CTA) Bölümü */}
            <section className="py-16 md:py-24 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {language === 'TR' ? 'RECF Türkiye Partneri Olun' : 'Become a RECF Turkey Partner'}
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        {language === 'TR' 
                            ? 'Geleceğin teknoloji üreticilerini desteklemek ve ekosistemimize katkı sağlamak için bizimle iletişime geçin.'
                            : 'Contact us to support the technology producers of the future and contribute to our ecosystem.'
                        }
                    </p>
                    <Link href="/iletisim/form">
                        <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 h-12 shadow-lg shadow-primary/20">
                            {language === 'TR' ? 'İş Birliği Talebi Gönder' : 'Submit Partnership Request'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
