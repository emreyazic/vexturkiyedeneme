'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Send, User, Mail, Phone, Building, MessageSquare, ChevronDown,
    CheckCircle2, Bot, Sparkles, HelpCircle, MapPin, ExternalLink,
    ShieldCheck, AlertCircle
} from 'lucide-react'

// Subject options specified in requirement
const subjectOptions = [
    'Takım Kurma',
    'Takım Kaydı',
    'Etkinlik',
    'Event Partner',
    'Gönüllülük',
    'Sponsorluk',
    'Basın',
    'Teknik Destek'
]

export default function IletisimFormPage() {
    const { language, setLanguage } = useLanguage()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        subject: 'Takım Kurma',
        message: '',
        kvkkConsent: false
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        if (!formData.fullName || !formData.email || !formData.message) {
            setErrorMessage('Lütfen zorunlu alanları (Ad Soyad, E-Posta, Mesaj) doldurunuz.')
            return
        }

        if (!formData.kvkkConsent) {
            setErrorMessage('Devam etmek için KVKK Aydınlatma Metni onayını kabul etmeniz gerekmektedir.')
            return
        }

        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Türkiye İletişim"
                subtitle="Takım, etkinlik, gönüllülük, sponsorluk ve teknik destek talepleriniz için bize ulaşın."
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Form Section (7 cols) */}
                        <div className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">İletişim Formu</h2>
                            <p className="text-gray-600 text-sm mb-8">
                                Aşağıdaki formu doldurarak talebinizi RECF Türkiye ekibine doğrudan iletebilirsiniz.
                            </p>

                            {isSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Mesajınız Alındı!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Talebiniz ilgili birimimize iletilmiştir. En kısa sürede belirttiğiniz e-posta veya telefon üzerinden dönüş yapılacaktır.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setIsSubmitted(false)
                                            setFormData({ fullName: '', email: '', phone: '', organization: '', subject: 'Takım Kurma', message: '', kvkkConsent: false })
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                                    >
                                        Yeni Mesaj Gönder
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {errorMessage && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                Ad Soyad *
                                            </label>
                                            <div className="relative">
                                                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="Adınız ve Soyadınız"
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                E-Posta Adresi *
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="ornek@domain.com"
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                Telefon Numarası
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+90 (5XX) XXX XX XX"
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                Kurum / Okul / Takım Adı
                                            </label>
                                            <div className="relative">
                                                <Building className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={formData.organization}
                                                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                                    placeholder="Okul veya Takım İsmi"
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject Select Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                            İletişim Konusu *
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.subject}
                                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 h-13 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary appearance-none transition-colors"
                                            >
                                                {subjectOptions.map(opt => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Message Box */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                            Mesajınız *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Talebinizi detaylı olarak buraya yazabilirsiniz..."
                                            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none"
                                        />
                                    </div>

                                    {/* KVKK Consent Checkbox */}
                                    <div className="pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.kvkkConsent}
                                                onChange={e => setFormData({ ...formData, kvkkConsent: e.target.checked })}
                                                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                                            />
                                            <span className="text-xs text-gray-600 leading-relaxed">
                                                6698 sayılı KVKK kapsamında kişisel verilerimin RECF Türkiye yetkili temsilcisi Intechne Teknoloji tarafından iletişim ve bilgilendirme amacıyla işlenmesini ve
                                                <Link href="/hukuki/kvkk" className="text-primary font-bold hover:underline mx-1">
                                                    KVKK Aydınlatma Metni
                                                </Link>
                                                koşullarını kabul ediyorum. *
                                            </span>
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-base shadow-lg shadow-primary/20">
                                        <Send className="w-5 h-5 mr-2" />
                                        Mesajı Gönder
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Official Contact Info Sidebar (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resmi İletişim Kanalları</h2>

                                <div className="space-y-6 mb-10">
                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">Resmi E-Posta</h4>
                                            <a href="mailto:info@recfturkiye.org" className="text-gray-600 text-sm hover:text-primary font-medium block">
                                                info@recfturkiye.org
                                            </a>
                                            <a href="mailto:turkiye@recf.org" className="text-gray-600 text-sm hover:text-primary font-medium block">
                                                turkiye@recf.org
                                            </a>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">Telefon Destek Hattı</h4>
                                            <a href="tel:+902129092310" className="text-gray-600 text-sm hover:text-primary font-medium">
                                                +90 (212) 909 23 10
                                            </a>
                                            <p className="text-xs text-gray-500 mt-1">Hafta içi: 09:00 - 18:00 (Intechne Teknoloji)</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">RECF Türkiye Temsilciliği Adresi</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Intechne Teknoloji - RECF Türkiye Temsilciliği<br />
                                                Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                        <h4 className="font-bold text-lg">Resmi İş Ortaklığı Bilgisi</h4>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        RECF Türkiye organizasyonları, küresel Robotics Education & Competition Foundation (RECF) yetkilendirmesiyle Intechne Teknoloji tarafından yürütülmektedir.
                                    </p>
                                    <div className="text-xs text-slate-400 border-t border-slate-800 pt-4">
                                        Sosyal Medya: @recfturkiye | @intechne
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
