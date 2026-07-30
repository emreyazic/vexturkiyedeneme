'use client'

import React, { useState } from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ExternalLink, ShieldCheck, Globe2, MapPin, Handshake, Building2, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const recfGlobal = [
    { id: 'recf', name: 'Robotics Education & Competition (REC) Foundation', role: 'Küresel Kuruluş', description: 'Uluslararası robotik turnuvalarını düzenleyen, STEM müfredatları sunan ve global yarışma kurallarını belirleyen ana sivil toplum kuruluşudur.', url: 'https://recf.org' },
]

const intechneTurkey = [
    { id: 'intechne', name: 'Intechne Teknoloji', role: 'Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü', description: 'RECF Türkiye ekosisteminin tüm operasyonlarını, turnuvalarını, resmi kayıtlarını ve eğitim materyallerini yöneten onaylı ve tek yetkili temsilcidir.', url: 'https://intechne.com' },
]

const strategicPartners = [
    // Henüz onaylı veri yok
]

const eventHosts = [
    // Henüz onaylı veri yok
]

const techSponsors = [
    { id: 'vex', name: 'VEX Robotics', role: 'Resmi Donanım Sağlayıcısı', description: 'RECF yarışmalarında (Engage, Achieve vb.) kullanılan temel onaylı yarışma kitlerini ve donanım teknolojilerini sağlayan küresel firmadır.', url: 'https://vexrobotics.com' },
]

function PartnerCard({ partner }: { partner: any }) {
    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-full flex flex-col"
        >
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gray-50 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 border border-gray-100">
                <span className="text-2xl font-bold text-gray-400 group-hover:text-primary transition-colors">{partner.name.charAt(0)}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{partner.name}</h3>
            <p className="text-sm font-semibold text-primary mb-4">{partner.role}</p>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{partner.description}</p>
            
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors mt-auto">
                <span>Web Sitesini Ziyaret Et</span>
                <ExternalLink className="w-4 h-4" />
            </div>
        </a>
    )
}

function EmptyStateCard({ message }: { message: string }) {
    return (
        <div className="bg-gray-50 rounded-3xl border border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center h-full min-h-[250px]">
            <Handshake className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-gray-500 font-medium">{message}</p>
        </div>
    )
}

export default function IsBirlikleriPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="İş Birlikleri ve Destekleyen Kurumlar"
                subtitle="RECF Türkiye ekosistemine katkı sağlayan onaylı iş ortakları ve destekleyen kurumlar"
            />

            {/* Core Entities */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">Onaylı Kurumsal Yapı</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {recfGlobal.map(partner => (
                            <PartnerCard key={partner.id} partner={partner} />
                        ))}
                        {intechneTurkey.map(partner => (
                            <PartnerCard key={partner.id} partner={partner} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Categories */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Stratejik İş Ortakları */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Globe2 className="w-8 h-8 text-blue-600" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Stratejik İş Ortakları</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {strategicPartners.length > 0 ? (
                                strategicPartners.map(partner => <PartnerCard key={partner.id as any} partner={partner} />)
                            ) : (
                                <div className="md:col-span-3">
                                    <EmptyStateCard message="Yeni stratejik iş ortaklıkları yakında duyurulacaktır." />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Etkinlik Ev Sahipleri */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Building2 className="w-8 h-8 text-green-600" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Etkinlik Ev Sahipleri</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {eventHosts.length > 0 ? (
                                eventHosts.map(partner => <PartnerCard key={partner.id as any} partner={partner} />)
                            ) : (
                                <div className="md:col-span-3">
                                    <EmptyStateCard message="Sezon etkinliklerimize ev sahipliği yapacak kurumlar yakında açıklanacaktır." />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Teknoloji Sağlayıcıları */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Cpu className="w-8 h-8 text-orange-600" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sponsorlar ve Teknoloji Sağlayıcıları</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {techSponsors.length > 0 ? (
                                techSponsors.map(partner => <PartnerCard key={partner.id} partner={partner} />)
                            ) : (
                                <div className="md:col-span-3">
                                    <EmptyStateCard message="Teknoloji sağlayıcıları listesi güncellenmektedir." />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Become a Partner CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Kurumsal Destekçimiz Olun</h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        RECF Türkiye ekosistemini destekleyerek gençlerin STEM gelişimine katkıda bulunmak, etkinliklerimize ev sahipliği yapmak veya stratejik iş birliği görüşmeleri için Türkiye temsilcimiz Intechne Teknoloji ile iletişime geçebilirsiniz.
                    </p>
                    <Link href="/iletisim/form">
                        <Button size="lg" className="bg-primary text-white font-semibold px-8 h-12">
                            İletişime Geçin
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
