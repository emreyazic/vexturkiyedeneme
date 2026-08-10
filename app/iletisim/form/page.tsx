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

    const content = {
        TR: {
            hero: {
                title: "RECF Türkiye İletişim",
                subtitle:
                    "Takım, etkinlik, gönüllülük, sponsorluk ve teknik destek talepleriniz için bize ulaşın.",
            },

            form: {
                title: "İletişim Formu",
                description:
                    "Aşağıdaki formu doldurarak talebinizi RECF Türkiye ekibine doğrudan iletebilirsiniz.",

                labels: {
                    fullName: "Ad Soyad *",
                    email: "E-Posta Adresi *",
                    phone: "Telefon Numarası",
                    organization: "Kurum / Okul / Takım Adı",
                    subject: "İletişim Konusu *",
                    message: "Mesajınız *",
                },

                placeholders: {
                    fullName: "Adınız ve Soyadınız",
                    email: "ornek@domain.com",
                    phone: "+90 (5XX) XXX XX XX",
                    organization: "Okul veya Takım İsmi",
                    message: "Talebinizi detaylı olarak buraya yazabilirsiniz...",
                },

                subjectOptions: [
                    "Takım Kurma",
                    "Takım Kaydı",
                    "Etkinlik",
                    "Event Partner",
                    "Gönüllülük",
                    "Sponsorluk",
                    "Basın",
                    "Teknik Destek",
                ],

                submit: "Mesajı Gönder",
                sendButton: "Mesajı Gönder",
            },

            success: {
                title: "Mesajınız Alındı!",
                description:
                    "Talebiniz ilgili birimimize iletilmiştir. En kısa sürede belirttiğiniz e-posta veya telefon üzerinden dönüş yapılacaktır.",
                button: "Yeni Mesaj Gönder",
            },

            errors: {
                required:
                    "Lütfen zorunlu alanları (Ad Soyad, E-Posta, Mesaj) doldurunuz.",
                kvkk:
                    "Devam etmek için KVKK Aydınlatma Metni onayını kabul etmeniz gerekmektedir.",
            },

            kvkk: {
                text1:
                    "6698 sayılı KVKK kapsamında kişisel verilerimin RECF Türkiye yetkili temsilcisi Intechne Teknoloji tarafından iletişim ve bilgilendirme amacıyla işlenmesini ve",
                link: "KVKK Aydınlatma Metni",
                text2: "koşullarını kabul ediyorum. *",
            },

            sidebar: {
                title: "Resmi İletişim Kanalları",

                email: {
                    title: "Resmi E-Posta",
                },

                phone: {
                    title: "Telefon Destek Hattı",
                    hours: "Hafta içi: 09:00 - 18:00 (Intechne Teknoloji)",
                },

                address: {
                    title: "RECF Türkiye Temsilciliği Adresi",
                    company: "Intechne Teknoloji - RECF Türkiye Temsilciliği",
                    location:
                        "Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul",
                },

                partnership: {
                    title: "Resmi İş Ortaklığı Bilgisi",
                    description:
                        "RECF Türkiye organizasyonları, küresel Robotics Education & Competition Foundation (RECF) yetkilendirmesiyle Intechne Teknoloji tarafından yürütülmektedir.",
                    social: "Sosyal Medya: @recfturkiye | @intechne",
                },
            },
        },

        EN: {
            hero: {
                title: "Contact RECF Turkey",
                subtitle:
                    "Reach out to us for team registration, events, volunteering, sponsorship, and technical support.",
            },

            form: {
                title: "Contact Form",
                description:
                    "Complete the form below to send your request directly to the RECF Turkey team.",

                labels: {
                    fullName: "Full Name *",
                    email: "Email Address *",
                    phone: "Phone Number",
                    organization: "Organization / School / Team",
                    subject: "Subject *",
                    message: "Your Message *",
                },

                placeholders: {
                    fullName: "Your full name",
                    email: "example@domain.com",
                    phone: "+90 (5XX) XXX XX XX",
                    organization: "School or Team Name",
                    message: "Please describe your request in detail...",
                },

                subjectOptions: [
                    "Team Formation",
                    "Team Registration",
                    "Event",
                    "Event Partner",
                    "Volunteering",
                    "Sponsorship",
                    "Press",
                    "Technical Support",
                ],

                submit: "Send Message",
                sendButton: "Send Message",
            },

            success: {
                title: "Message Received!",
                description:
                    "Your request has been forwarded to the relevant department. We will contact you as soon as possible via the email address or phone number you provided.",
                button: "Send New Message",
            },

            errors: {
                required:
                    "Please fill in all required fields (Full Name, Email, Message).",
                kvkk:
                    "You must accept the KVKK Clarification Text to proceed.",
            },

            kvkk: {
                text1:
                    "I accept the terms and processing of my personal data by Intechne Technology, the authorized representative of RECF Turkey, within the scope of KVKK Law No. 6698 for communication and information purposes, and the ",
                link: "KVKK Clarification Text",
                text2: ". *",
            },

            sidebar: {
                title: "Official Contact Channels",

                email: {
                    title: "Official Email",
                },

                phone: {
                    title: "Phone Support Line",
                    hours: "Weekdays: 09:00 - 18:00 (Intechne Technology)",
                },

                address: {
                    title: "RECF Turkey Representative Address",
                    company: "Intechne Technology - RECF Turkey Representative",
                    location:
                        "Maslak Mah. Buyukdere Cad. No:237, Sariyer / Istanbul",
                },

                partnership: {
                    title: "Official Partnership Information",
                    description:
                        "RECF Turkey organizations are carried out by Intechne Technology under authorization from the global Robotics Education & Competition Foundation (RECF).",
                    social: "Social Media: @recfturkiye | @intechne",
                },
            },
        },
    } as const;

    const t = content[language] || content.TR

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        if (!formData.fullName || !formData.email || !formData.message) {
            setErrorMessage(t.errors.required)
            return
        }

        if (!formData.kvkkConsent) {
            setErrorMessage(t.errors.kvkk)
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
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Form Section (7 cols) */}
                        <div className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.form.title}</h2>
                            <p className="text-gray-600 text-sm mb-8">
                                {t.form.description}
                            </p>

                            {isSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.success.title}</h3>
                                    <p className="text-gray-600 mb-6">
                                        {t.success.description}
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setIsSubmitted(false)
                                            setFormData({ fullName: '', email: '', phone: '', organization: '', subject: 'Takım Kurma', message: '', kvkkConsent: false })
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                                    >
                                        {t.success.button}
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
                                                {t.form.labels.fullName}
                                            </label>
                                            <div className="relative">
                                                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder={t.form.placeholders.fullName}
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                {t.form.labels.email}
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={t.form.placeholders.email}
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                                {t.form.labels.phone}
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
                                                {t.form.labels.organization}
                                            </label>
                                            <div className="relative">
                                                <Building className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={formData.organization}
                                                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                                    placeholder={t.form.placeholders.organization}
                                                    className="w-full pl-12 pr-4 h-13 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject Select Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                            {t.form.labels.subject}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.subject}
                                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 h-13 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary appearance-none transition-colors"
                                            >
                                                {t.form.subjectOptions.map(opt => (
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
                                            {t.form.labels.message}
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder={t.form.placeholders.message}
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
                                                {t.kvkk.text1}
                                                <Link href="/hukuki/kvkk" className="text-primary font-bold hover:underline mx-1">
                                                    {t.kvkk.link}
                                                </Link>
                                                {t.kvkk.text2}
                                            </span>
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-base shadow-lg shadow-primary/20">
                                        <Send className="w-5 h-5 mr-2" />
                                        {t.form.sendButton}
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Official Contact Info Sidebar (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.sidebar.title}</h2>

                                <div className="space-y-6 mb-10">
                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{t.sidebar.email.title}</h4>
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
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{t.sidebar.phone.title}</h4>
                                            <a href="tel:+902129092310" className="text-gray-600 text-sm hover:text-primary font-medium">
                                                +90 (212) 909 23 10
                                            </a>
                                            <p className="text-xs text-gray-500 mt-1">{t.sidebar.phone.hours}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{t.sidebar.address.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {t.sidebar.address.company}<br />
                                                {t.sidebar.address.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                        <h4 className="font-bold text-lg">{t.sidebar.partnership.title}</h4>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        {t.sidebar.partnership.description}
                                    </p>
                                    <div className="text-xs text-slate-400 border-t border-slate-800 pt-4">
                                        {t.sidebar.partnership.social}
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
