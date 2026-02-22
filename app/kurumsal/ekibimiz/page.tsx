'use client'

import React from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react'

const teamMembers = [
    { id: 1, name: 'Ahmet Yılmaz', title: 'Türkiye Koordinatörü', linkedinUrl: 'https://linkedin.com/in/', },
    { id: 2, name: 'Ayşe Kaya', title: 'Eğitim Direktörü', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 3, name: 'Mehmet Demir', title: 'Yarışmalar Müdürü', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 4, name: 'Zeynep Öztürk', title: 'İş Geliştirme Yöneticisi', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 5, name: 'Can Arslan', title: 'Teknik Eğitmen', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 6, name: 'Elif Yıldız', title: 'İletişim Koordinatörü', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 7, name: 'Burak Şahin', title: 'Bölge Temsilcisi', linkedinUrl: 'https://linkedin.com/in/' },
    { id: 8, name: 'Selin Koç', title: 'Gönüllü Koordinatörü', linkedinUrl: 'https://linkedin.com/in/' },
]

export default function EkibimizPage() {
    const [language, setLanguage] = React.useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero title="Ekibimiz" subtitle="VEX Türkiye'yi ileriye taşıyan tutkulu ekibimizle tanışın" />

            {/* Team Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Profile Photo Placeholder */}
                                <div className="relative w-28 h-28 mx-auto mb-5">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg" />
                                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                        <span className="text-3xl text-primary/50 font-bold">{member.name.charAt(0)}</span>
                                    </div>
                                    <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{member.title}</p>
                                <a
                                    href={member.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-all duration-200"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Team CTA */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ekibimize Katılın</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        VEX Türkiye ailesinin bir parçası olun. Gönüllü, mentor veya eğitmen olarak katkıda bulunun.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        Başvur
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
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
                                <li><a href="/kurumsal/vizyon-misyon" className="text-gray-400 hover:text-primary transition-colors">Vizyon & Misyon</a></li>
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
