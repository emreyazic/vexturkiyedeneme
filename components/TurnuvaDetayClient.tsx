'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    MapPin, Clock, CalendarDays, Trophy, Users,
    ArrowLeft, ArrowRight, ExternalLink, Download, CalendarPlus,
    CheckCircle, XCircle, Building2, Globe, Ticket
} from 'lucide-react'
import {
    SanityEvent,
    getEventTypeColor,
    getEventTypeLabel,
    formatEventDate,
    generateGoogleCalendarUrl,
    generateICSContent,
    getPlatformColor,
    getPlatformLabel,
} from '@/lib/sanity-queries'

interface TurnuvaDetayClientProps {
    event: SanityEvent
}

// Add to Calendar dropdown
function AddToCalendarButton({ event }: { event: SanityEvent }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleDownloadICS = () => {
        const content = generateICSContent(event)
        const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${event.slug.current}.ics`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                className="border-gray-300"
            >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Takvime Ekle
            </Button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden min-w-[180px]"
                >
                    <a
                        href={generateGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <ExternalLink className="w-4 h-4" />
                        Google Calendar
                    </a>
                    <button
                        onClick={handleDownloadICS}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm w-full text-left"
                    >
                        <Download className="w-4 h-4" />
                        ICS İndir
                    </button>
                </motion.div>
            )}
        </div>
    )
}

export function TurnuvaDetayClient({ event }: TurnuvaDetayClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const typeColors = getEventTypeColor(event.eventType)
    const platformColors = getPlatformColor(event.platform)

    // Format dates
    const startDate = new Date(event.startDate)
    const endDate = event.endDate ? new Date(event.endDate) : null

    const formattedStartDate = formatEventDate(event.startDate, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const formattedEndDate = endDate ? formatEventDate(event.endDate!, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : null

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title={event.name}
                subtitle={`${formatEventDate(event.startDate, { day: 'numeric', month: 'long', year: 'numeric' })} • ${event.city}`}
            />

            {/* Main Content */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    {/* Back Button */}
                    <Link href="/yarismalar/etkinlik-takvimi" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Etkinlik Takvimine Dön
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-2"
                        >
                            {/* Event Title & Badges */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${typeColors.bg} ${typeColors.text}`}
                                    >
                                        {getEventTypeLabel(event.eventType)}
                                    </span>
                                    {event.platform !== 'all' && (
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium text-white ${platformColors.bg}`}>
                                            {getPlatformLabel(event.platform)}
                                        </span>
                                    )}
                                    {event.registrationOpen !== undefined && (
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 ${event.registrationOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {event.registrationOpen ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                            {event.registrationOpen ? 'Kayıt Açık' : 'Kayıt Kapalı'}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{event.name}</h1>

                                {/* Info Grid */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Date */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <CalendarDays className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tarih</p>
                                            <p className="font-medium text-gray-900">{formattedStartDate}</p>
                                            {formattedEndDate && formattedEndDate !== formattedStartDate && (
                                                <p className="text-sm text-gray-600">- {formattedEndDate}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Konum</p>
                                            <p className="font-medium text-gray-900">{event.city}</p>
                                            <p className="text-sm text-gray-600">{event.venue}</p>
                                        </div>
                                    </div>

                                    {/* Venue */}
                                    {event.address && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Adres</p>
                                                <p className="font-medium text-gray-900">{event.address}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Team Capacity */}
                                    {event.maxTeams && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Takım Kapasitesi</p>
                                                <p className="font-medium text-gray-900">
                                                    {event.registeredTeams || 0} / {event.maxTeams} Takım
                                                </p>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                                                    <div
                                                        className="h-2 bg-primary rounded-full"
                                                        style={{ width: `${Math.min(((event.registeredTeams || 0) / event.maxTeams) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Registration Deadline */}
                                {event.registrationDeadline && (
                                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                        <div className="flex items-center gap-2 text-amber-700">
                                            <Clock className="w-5 h-5" />
                                            <span className="font-medium">Kayıt Son Tarihi:</span>
                                            <span>{formatEventDate(event.registrationDeadline, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {event.description && event.description.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Etkinlik Hakkında</h2>
                                    <div className="prose prose-gray max-w-none">
                                        {/* Portable text rendering - simplified for now */}
                                        {event.description.map((block: any, i: number) => (
                                            <p key={i} className="text-gray-600">
                                                {block.children?.map((child: any) => child.text).join('') || ''}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Action Card */}
                            <div className="bg-gradient-to-br from-primary to-red-700 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Trophy className="w-6 h-6" />
                                    <h3 className="font-bold text-lg">Turnuvaya Katıl</h3>
                                </div>
                                <p className="text-white/80 text-sm mb-6">
                                    Takımınızı bu turnuvaya kaydetmek için aşağıdaki butonu kullanın.
                                </p>

                                <div className="space-y-3">
                                    {event.registrationUrl && event.registrationOpen && (
                                        <a
                                            href={event.registrationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full"
                                        >
                                            <Button className="w-full bg-white text-primary hover:bg-gray-100">
                                                <Ticket className="w-5 h-5 mr-2" />
                                                Kayıt Ol
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    )}

                                    {!event.registrationOpen && (
                                        <Button disabled className="w-full bg-white/20 text-white cursor-not-allowed">
                                            <XCircle className="w-5 h-5 mr-2" />
                                            Kayıtlar Kapalı
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Calendar Actions */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5 text-primary" />
                                    Takvime Ekle
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href={generateGoogleCalendarUrl(event)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <Globe className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">Google Calendar</span>
                                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                                    </a>
                                    <button
                                        onClick={() => {
                                            const content = generateICSContent(event)
                                            const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
                                            const url = URL.createObjectURL(blob)
                                            const link = document.createElement('a')
                                            link.href = url
                                            link.download = `${event.slug.current}.ics`
                                            document.body.appendChild(link)
                                            link.click()
                                            document.body.removeChild(link)
                                            URL.revokeObjectURL(url)
                                        }}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors w-full"
                                    >
                                        <Download className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">ICS Dosyası İndir</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Hızlı Bilgiler</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Etkinlik Türü</span>
                                        <span className="font-medium text-gray-900">{getEventTypeLabel(event.eventType)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Platform</span>
                                        <span className="font-medium text-gray-900">{event.platform === 'all' ? 'Tüm Platformlar' : getPlatformLabel(event.platform)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Şehir</span>
                                        <span className="font-medium text-gray-900">{event.city}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Mekan</span>
                                        <span className="font-medium text-gray-900">{event.venue}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/etkinlik-takvimi" className="text-gray-400 hover:text-primary transition-colors">Etkinlik Takvimi</a></li>
                                <li><a href="/yarismalar/etkinlik-takvimi/tum-etkinlikler" className="text-gray-400 hover:text-primary transition-colors">Tüm Etkinlikler</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Turnuva Sonuçları</a></li>
                                <li><a href="/yarismalar/oduller" className="text-gray-400 hover:text-primary transition-colors">Ödüller</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="/vex-nedir/vex-iq" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="/vex-nedir/vex-v5" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="/vex-nedir/vex-u" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
                                <li><a href="/vex-nedir/vex-ai" className="text-gray-400 hover:text-primary transition-colors">VEX AI</a></li>
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
