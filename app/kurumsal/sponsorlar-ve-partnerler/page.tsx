'use client'

import React from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react'

const globalPartners = [
    { id: 1, name: 'VEX Robotics', description: 'Global robotik eğitim ve yarışma platformu', url: 'https://vexrobotics.com' },
    { id: 2, name: 'REC Foundation', description: 'Robotics Education & Competition Foundation', url: 'https://recf.org' },
]

const strategicPartners = [
    { id: 1, name: 'Milli Eğitim Bakanlığı', description: 'Eğitim politikaları ve okul ortaklıkları' },
    { id: 2, name: 'TÜBİTAK', description: 'Bilimsel ve teknolojik araştırma desteği' },
    { id: 3, name: 'Türkiye Teknoloji Takımı Vakfı', description: 'Teknoloji eğitimi ve yarışma organizasyonları' },
    { id: 4, name: 'STEM Türkiye', description: 'STEM eğitimi yaygınlaştırma çalışmaları' },
]

const goldSponsors = [
    { id: 1, name: 'Altın Sponsor 1' },
    { id: 2, name: 'Altın Sponsor 2' },
]

const silverSponsors = [
    { id: 1, name: 'Gümüş Sponsor 1' },
    { id: 2, name: 'Gümüş Sponsor 2' },
    { id: 3, name: 'Gümüş Sponsor 3' },
]

const bronzeSponsors = [
    { id: 1, name: 'Bronz Sponsor 1' },
    { id: 2, name: 'Bronz Sponsor 2' },
    { id: 3, name: 'Bronz Sponsor 3' },
    { id: 4, name: 'Bronz Sponsor 4' },
]

export default function SponsorlarPage() {
    const [language, setLanguage] = React.useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Sponsorlarımız & Partnerler"
                subtitle="Geleceği Birlikte İnşa Ediyoruz"
            />

            {/* Global Partners */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">Global Ortaklar</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Global Partnerlerimiz</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Dünya çapında robotik eğitim ve yarışma ekosisteminin temel taşları</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {globalPartners.map((partner) => (
                            <a
                                key={partner.id}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-gray-400 group-hover:text-primary transition-colors">{partner.name.charAt(0)}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2 group-hover:text-primary transition-colors">{partner.name}</h3>
                                <p className="text-gray-600 text-center text-sm mb-4">{partner.description}</p>
                                <div className="flex items-center justify-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Ziyaret Et</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Partners */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stratejik Partnerler</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Türkiye'de STEM eğitimini birlikte güçlendirdiğimiz kurumlar</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {strategicPartners.map((partner) => (
                            <div
                                key={partner.id}
                                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                    <span className="text-xl font-bold text-gray-400 group-hover:text-primary transition-colors">{partner.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-center mb-1 group-hover:text-primary transition-colors text-sm">{partner.name}</h3>
                                <p className="text-gray-500 text-center text-xs">{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Sponsors */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kurumsal Sponsorlarımız</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">VEX Türkiye'nin büyümesine katkıda bulunan değerli sponsorlarımız</p>
                    </div>

                    {/* Gold Sponsors */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32" />
                            <h3 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
                                <span className="text-2xl"></span> Altın Sponsorlar
                            </h3>
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {goldSponsors.map((sponsor) => (
                                <div
                                    key={sponsor.id}
                                    className="group bg-gradient-to-br from-yellow-50 to-white rounded-2xl border-2 border-yellow-200 p-8 hover:shadow-xl transition-all duration-300 hover:border-yellow-400"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white border border-yellow-200 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 shadow-sm">
                                        <span className="text-xl font-bold text-gray-400 group-hover:text-yellow-600 transition-colors">{sponsor.name.charAt(0)}</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-center group-hover:text-yellow-700 transition-colors">{sponsor.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Silver Sponsors */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent flex-1 max-w-32" />
                            <h3 className="text-lg font-semibold text-gray-500 flex items-center gap-2">
                                <span className="text-2xl"></span> Gümüş Sponsorlar
                            </h3>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent flex-1 max-w-32" />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
                            {silverSponsors.map((sponsor) => (
                                <div
                                    key={sponsor.id}
                                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-400"
                                >
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-white border border-gray-200 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <span className="text-lg font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{sponsor.name.charAt(0)}</span>
                                    </div>
                                    <h4 className="font-medium text-gray-900 text-center text-sm group-hover:text-gray-700 transition-colors">{sponsor.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bronze Sponsors */}
                    <div>
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent flex-1 max-w-32" />
                            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                                <span className="text-2xl"></span> Bronz Sponsorlar
                            </h3>
                            <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent flex-1 max-w-32" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {bronzeSponsors.map((sponsor) => (
                                <div
                                    key={sponsor.id}
                                    className="group bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-100 p-4 hover:shadow-md transition-all duration-300 hover:border-orange-300"
                                >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white border border-orange-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-orange-600 transition-colors">{sponsor.name.charAt(0)}</span>
                                    </div>
                                    <h4 className="font-medium text-gray-700 text-center text-xs group-hover:text-orange-700 transition-colors">{sponsor.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Become a Sponsor CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Sponsor Olmak İster misiniz?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        VEX Türkiye ekosistemini destekleyerek geleceğin mühendislerinin yetişmesine katkıda bulunun.
                    </p>
                    <a
                        href="/iletisim/form"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                    >
                        İletişime Geçin
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
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
                                <li><a href="/kurumsal/biz-kimiz" className="text-gray-400 hover:text-primary transition-colors">Biz Kimiz?</a></li>
                                <li><a href="/kurumsal/ekibimiz" className="text-gray-400 hover:text-primary transition-colors">Ekibimiz</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX GO</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
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
