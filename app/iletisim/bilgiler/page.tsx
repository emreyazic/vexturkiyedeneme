'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Phone, Mail, MapPin, Clock, Download, Coffee,
    Train, Bus, Car, Navigation, ExternalLink, Copy, Check
} from 'lucide-react'

// Contact info
const contactInfo = [
    {
        icon: Phone,
        label: 'Telefon',
        value: '+90 (534) 634 90 58',
        action: 'tel:+905346349058',
        copyable: true
    },
    {
        icon: Mail,
        label: 'E-Posta',
        value: 'info@vexturkiye.com',
        action: 'mailto:info@vexturkiye.com',
        copyable: true
    },
    {
        icon: MapPin,
        label: 'Adres',
        value: 'Ünalan, Ünalan Cd., 34500 Üsküdar/İstanbul',
        action: 'https://maps.google.com/?q=Ünalan+Mahallesi+Üsküdar+İstanbul',
        copyable: true
    },
    {
        icon: Clock,
        label: 'Çalışma Saatleri',
        value: 'Pazartesi - Cuma: 09:00 - 18:00',
        copyable: false
    }
]

// Transportation options
const transportOptions = [
    {
        icon: Train,
        title: 'Metro',
        description: 'M4 Kadıköy-Sabiha Gökçen Havalimanı hattı, Göztepe durağında inin. Ofisimize 5 dakika yürüme mesafesinde.'
    },
    {
        icon: Bus,
        title: 'Otobüs',
        description: 'Göztepe Köprüsü Durağı'
    },
    {
        icon: Car,
        title: 'Araç ile',
        description: 'E-5 üzerinde Medeniyet Üniversitesi yönlendirmelerini takip edin.'
    }
]

// vCard download function
const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:VEX Türkiye
ORG:VEX Robotics Türkiye
TEL;TYPE=WORK,VOICE:+90 212 000 00 00
EMAIL:info@vexturkiye.com
ADR;TYPE=WORK:;;Büyükdere Cad. No:123;Şişli;İstanbul;34394;Türkiye
URL:https://vexturkiye.com
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'VEX_Turkiye.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

// Contact Card Component
function ContactCard({ item, index }: { item: typeof contactInfo[0]; index: number }) {
    const [copied, setCopied] = useState(false)
    const Icon = item.icon

    const handleCopy = async () => {
        await navigator.clipboard.writeText(item.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="font-medium text-gray-900">{item.value}</div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                        {item.action && (
                            <a href={item.action} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary hover:text-white transition-colors h-8">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Aç
                                </Button>
                            </a>
                        )}
                        {item.copyable && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3 h-3 mr-1 text-green-500" />
                                        <span className="text-green-500">Kopyalandı</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3 mr-1" />
                                        Kopyala
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function BilgilerPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [activeTab, setActiveTab] = useState<'info' | 'directions'>('info')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Dijital İletişim Kartı"
                subtitle="Bize kahve içmeye gelin ☕"
            />

            {/* Tabs */}
            <section className="py-4 bg-gray-100 sticky top-20 z-30">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === 'info'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:bg-white/50'
                                }`}
                        >
                            İletişim Bilgileri
                        </button>
                        <button
                            onClick={() => setActiveTab('directions')}
                            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${activeTab === 'directions'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:bg-white/50'
                                }`}
                        >
                            <Navigation className="w-4 h-4" />
                            Nasıl Gelirim?
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    {activeTab === 'info' ? (
                        <>
                            {/* Contact Cards */}
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {contactInfo.map((item, index) => (
                                    <ContactCard key={index} item={item} index={index} />
                                ))}
                            </div>

                            {/* vCard Download */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-r from-primary to-red-600 rounded-2xl p-8 text-white text-center"
                            >
                                <Coffee className="w-12 h-12 mx-auto mb-4 opacity-80" />
                                <h2 className="text-2xl font-bold mb-2">Tek Tıkla Kaydet</h2>
                                <p className="text-white/80 mb-6">
                                    Tüm iletişim bilgilerimizi telefonunuza ekleyin
                                </p>
                                <Button
                                    onClick={downloadVCard}
                                    className="bg-white text-primary hover:bg-gray-100"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    vCard İndir
                                </Button>
                            </motion.div>

                            {/* Map Embed */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-8 rounded-2xl overflow-hidden border border-gray-200 bg-gray-200 h-80"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12041.123456789012!2d29.056!3d40.998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zw5xuYWxhbiwgw5xza8O8ZGFyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1706803200000!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </>
                    ) : (
                        <>
                            {/* Directions */}
                            <div className="space-y-4">
                                {transportOptions.map((option, index) => {
                                    const Icon = option.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-7 h-7 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
                                                    <p className="text-gray-600">{option.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Navigation Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-8 grid sm:grid-cols-2 gap-4"
                            >
                                <a
                                    href="https://maps.google.com/?q=Levent+Istanbul"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white rounded-2xl p-6 flex items-center justify-between hover:bg-blue-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Google Maps</span>
                                    </div>
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.apple.com/maps/?q=Levent+Istanbul"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 text-white rounded-2xl p-6 flex items-center justify-between hover:bg-gray-900 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <Navigation className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Apple Maps</span>
                                    </div>
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </motion.div>

                            {/* Parking Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
                            >
                                <div className="flex items-start gap-3">
                                    <Car className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-yellow-800 mb-1">Otopark Bilgisi</h4>
                                        <p className="text-yellow-700 text-sm">
                                            Bina altında misafir otoparkı mevcuttur. İlk 2 saat ücretsizdir.
                                            Danışmadan park kartınızı alınız.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Hızlı Erişim</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/iletisim/form">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-primary/5 rounded-2xl p-6 text-center hover:bg-primary/10 transition-colors cursor-pointer"
                            >
                                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h3 className="font-medium text-gray-900">Mesaj Gönderin</h3>
                                <p className="text-sm text-gray-500 mt-1">İletişim formu</p>
                            </motion.div>
                        </Link>
                        <Link href="/iletisim/sss">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-blue-50 rounded-2xl p-6 text-center hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                                <Coffee className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <h3 className="font-medium text-gray-900">SSS</h3>
                                <p className="text-sm text-gray-500 mt-1">Sık sorulan sorular</p>
                            </motion.div>
                        </Link>
                        <a href="https://instagram.com/vexturkiye" target="_blank" rel="noopener noreferrer">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer"
                            >
                                <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                                <h3 className="font-medium text-gray-900">Instagram</h3>
                                <p className="text-sm text-gray-500 mt-1">@vexroboticsturkiye</p>
                            </motion.div>
                        </a>
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
                                <div><div className="text-lg font-bold">VEX TÜRKİYE</div><div className="text-xs text-gray-400">Robotics Competition</div></div>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3">
                                <li><a href="/iletisim/bilgiler" className="text-gray-400 hover:text-primary transition-colors">Bilgiler & Adres</a></li>
                                <li><a href="/iletisim/form" className="text-gray-400 hover:text-primary transition-colors">Bize Ulaşın</a></li>
                                <li><a href="/iletisim/sss" className="text-gray-400 hover:text-primary transition-colors">SSS</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Adres</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <p className="text-sm text-gray-500 text-center">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
