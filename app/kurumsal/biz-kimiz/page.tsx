'use client'

import React from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react'

export default function BizKimizPage() {
    const [language, setLanguage] = React.useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            {/* Spacer for fixed nav */}
            <div className="h-20" />

            {/* Hero Section */}
            <CorporateHero
                title="Biz Kimiz?"
                subtitle="VEX Türkiye olarak geleceğin mühendislerini yetiştiriyoruz"
            />

            {/* Main Content Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm font-medium text-primary">VEX Türkiye</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Global Robotik Eğitiminin Türkiye Temsilcisi
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    VEX Türkiye, dünya genelinde 80'den fazla ülkede faaliyet gösteren <strong className="text-gray-900">REC Foundation</strong> (Robotics Education & Competition Foundation) ağının Türkiye ayağını temsil etmektedir. Amacımız, STEM eğitimini robotik yarışmalar aracılığıyla ülkemize yaymak ve geleceğin mühendislerini, bilim insanlarını ve liderlerini yetiştirmektir.
                                </p>
                                <p>
                                    Türkiye'de VEX GO, VEX IQ, VEX V5 ve VEX U programlarımız ile ilkokuldan üniversiteye kadar her yaş grubundaki öğrencilere dünya standartlarında robotik eğitimi sunuyoruz. Öğrencilerimiz, tasarım, kodlama, mühendislik ve takım çalışması becerilerini geliştirirken, ulusal ve uluslararası yarışmalarda Türkiye'yi başarıyla temsil etmektedir.
                                </p>
                                <p>
                                    VEX Robotik yarışmaları, öğrencilerin gerçek dünya problemlerini çözmelerine, inovatif düşünmelerine ve 21. yüzyıl becerilerini kazanmalarına olanak tanır. Her yıl düzenlediğimiz bölgesel turnuvalar ve ulusal şampiyonalarla, Türkiye'nin dört bir yanından takımları bir araya getiriyor ve onlara <strong className="text-gray-900">VEX Worlds</strong> dünya şampiyonasına katılma fırsatı sunuyoruz.
                                </p>
                                <p>
                                    Eğitimciler, mentorlar ve ailelerle birlikte oluşturduğumuz güçlü ekosistemimiz, Türkiye'nin STEM alanında küresel rekabet gücünü artırmayı hedeflemektedir. Okullar, üniversiteler ve teknoloji şirketleriyle kurduğumuz iş birlikleri sayesinde, öğrencilerimize en güncel teknolojilere erişim ve profesyonel rehberlik sağlıyoruz.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button className="bg-primary hover:bg-primary/90 text-white">
                                    Ekosisteme Katıl
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                    Programları İncele
                                </Button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-xl">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 text-sm">Robotik Atölye Görseli</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-100 rounded-2xl -z-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">42+</div>
                            <div className="text-gray-600">Şehir</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">250+</div>
                            <div className="text-gray-600">Okul</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
                            <div className="text-gray-600">Öğrenci</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">380+</div>
                            <div className="text-gray-600">Mentor</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">VEX</div>
                                <div>
                                    <div className="text-lg font-bold">VEX TÜRKİYE</div>
                                    <div className="text-xs text-gray-400">Robotics Competition</div>
                                </div>
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
