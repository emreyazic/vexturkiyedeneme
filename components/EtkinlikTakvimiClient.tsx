'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    MapPin, Clock, Users, ArrowRight, CalendarDays, Trophy,
    CalendarPlus, Download, ExternalLink, CheckCircle, XCircle, List
} from 'lucide-react'
import {
    SanityEvent,
    SanityCountdownSettings,
    getEventTypeColor,
    getEventTypeLabel,
    formatEventDate,
    generateGoogleCalendarUrl,
    generateICSContent,
    getPlatformColor,
    getPlatformLabel,
    getCountdownThemeColors,
    findNextPriorityEvent,
} from '@/lib/sanity-queries'

interface EtkinlikTakvimiClientProps {
    upcomingEvents: SanityEvent[]
    allEvents: SanityEvent[]
    countdownSettings?: SanityCountdownSettings | null
}

// Countdown component with status-based UI
interface CountdownProps {
    targetDate: Date
    label: string
    theme?: string
    liveStreamUrl?: string
    registrationOpen?: boolean
    onEventEnd?: () => void
}

function Countdown({ targetDate, label, theme = 'red', liveStreamUrl, registrationOpen, onEventEnd }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [status, setStatus] = useState<'upcoming' | 'soon' | 'live' | 'ended'>('upcoming')

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const difference = targetDate.getTime() - now

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                setStatus('ended')
                onEventEnd?.()
                return
            }

            // 1 günden az kaldıysa "live" (yarışma günü)
            if (difference < 1000 * 60 * 60 * 24) {
                setStatus('live')
            }
            // 7 günden az kaldıysa "soon"
            else if (difference < 1000 * 60 * 60 * 24 * 7) {
                setStatus('soon')
            } else {
                setStatus('upcoming')
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            })
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [targetDate, onEventEnd])

    const isLive = status === 'live'

    return (
        <div className={`relative ${isLive ? 'animate-pulse' : ''}`}>
            {/* Glow effect for live state */}
            {isLive && (
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl animate-pulse" />
            )}

            <div className="grid grid-cols-4 gap-2 relative">
                <div className="text-center">
                    <div className={`bg-gray-900 text-white rounded-lg p-2 md:p-3 font-mono text-xl md:text-2xl font-bold ${isLive ? 'ring-2 ring-white/50' : ''}`}>
                        {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white mt-1">Gün</div>
                </div>
                <div className="text-center">
                    <div className={`bg-gray-900 text-white rounded-lg p-2 md:p-3 font-mono text-xl md:text-2xl font-bold ${isLive ? 'ring-2 ring-white/50' : ''}`}>
                        {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white mt-1">Saat</div>
                </div>
                <div className="text-center">
                    <div className={`bg-gray-900 text-white rounded-lg p-2 md:p-3 font-mono text-xl md:text-2xl font-bold ${isLive ? 'ring-2 ring-white/50' : ''}`}>
                        {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white mt-1">Dakika</div>
                </div>
                <div className="text-center">
                    <div className={`bg-gray-900 text-white rounded-lg p-2 md:p-3 font-mono text-xl md:text-2xl font-bold animate-pulse ${isLive ? 'ring-2 ring-white/50' : ''}`}>
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white mt-1">Saniye</div>
                </div>
            </div>

            {/* Status-based button */}
            <div className="mt-4">
                {status === 'live' && liveStreamUrl ? (
                    <a href={liveStreamUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100 animate-pulse">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            Canlı Yayını İzle
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                ) : status === 'soon' ? (
                    <Link href="/takimlar/kayit">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">
                            Son Kayıt Fırsatı!
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : registrationOpen !== false ? (
                    <Link href="/takimlar/kayit">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">
                            Takım Kaydı Yap
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <Button className="w-full bg-white/50 text-white cursor-not-allowed" disabled>
                        Kayıtlar Kapandı
                    </Button>
                )}
            </div>
        </div>
    )
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
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="border-gray-300 text-xs"
            >
                <CalendarPlus className="w-3 h-3 mr-1" />
                Takvime Ekle
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden min-w-[160px]"
                    >
                        <a
                            href={generateGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Google Calendar
                        </a>
                        <button
                            onClick={handleDownloadICS}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm w-full text-left"
                        >
                            <Download className="w-4 h-4" />
                            ICS İndir
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Event Card
function EventCard({ event, index }: { event: SanityEvent; index: number }) {
    const typeColors = getEventTypeColor(event.eventType)
    const platformColors = getPlatformColor(event.platform)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors`}
            style={{ borderLeftColor: typeColors.dot }}
        >
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-1 min-w-0 w-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2 md:mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/yarismalar/etkinlik-takvimi/tum-etkinlikler/${event.slug.current}`} className="font-medium text-gray-900 hover:text-primary hover:underline transition-colors">
                                {event.name}
                            </Link>
                            {event.platform !== 'all' && (
                                <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${platformColors.bg}`}>
                                    {getPlatformLabel(event.platform)}
                                </span>
                            )}
                        </div>
                        {/* Mobile Type Label */}
                        <span className={`md:hidden px-2 py-1 rounded text-xs font-medium ${typeColors.bg} ${typeColors.text}`}>
                            {getEventTypeLabel(event.eventType)}
                        </span>
                    </div>

                    {/* Desktop Details (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {formatEventDate(event.startDate, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.city}
                        </span>
                        {event.registrationOpen !== undefined && (
                            <span className={`flex items-center gap-1 ${event.registrationOpen ? 'text-green-600' : 'text-red-500'}`}>
                                {event.registrationOpen ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {event.registrationOpen ? 'Kayıt Açık' : 'Kayıt Kapalı'}
                            </span>
                        )}
                    </div>

                    {/* Mobile Footer Details (Visible Only on Mobile) */}
                    <div className="flex flex-col gap-3 mt-4 md:hidden">
                        {/* Date & Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {formatEventDate(event.startDate, { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="text-gray-300 mx-1">|</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.city}
                            </span>
                        </div>

                        {/* Registration Status & Button */}
                        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                            {event.registrationOpen !== undefined && (
                                <span className={`flex items-center gap-1 text-sm font-medium ${event.registrationOpen ? 'text-green-600' : 'text-red-500'}`}>
                                    {event.registrationOpen ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                    {event.registrationOpen ? 'Kayıt Açık' : 'Kayıt Kapalı'}
                                </span>
                            )}
                            <div className="flex-shrink-0">
                                <AddToCalendarButton event={event} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Right Column (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium ${typeColors.bg} ${typeColors.text}`}
                    >
                        {getEventTypeLabel(event.eventType)}
                    </span>
                    <AddToCalendarButton event={event} />
                </div>
            </div>
        </motion.div>
    )
}

// Compact Event Card for sidebar
function CompactEventCard({ event, index }: { event: SanityEvent; index: number }) {
    const typeColors = getEventTypeColor(event.eventType)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative"
        >
            <div
                className="p-4 rounded-xl border"
                style={{ borderColor: `${typeColors.dot}40`, backgroundColor: `${typeColors.dot}08` }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: typeColors.dot }}
                    />
                    <Link href={`/yarismalar/etkinlik-takvimi/tum-etkinlikler/${event.slug.current}`} className="font-medium text-gray-900 text-sm truncate hover:text-primary hover:underline transition-colors">
                        {event.name}
                    </Link>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {formatEventDate(event.startDate, { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.city}
                    </span>
                </div>
                <div className="mt-2">
                    <AddToCalendarButton event={event} />
                </div>
            </div>
        </motion.div>
    )
}

export function EtkinlikTakvimiClient({ upcomingEvents, allEvents, countdownSettings }: EtkinlikTakvimiClientProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [month, setMonth] = useState<Date>(new Date('2026-02-01'))
    const [countdownEventEnded, setCountdownEventEnded] = useState(false)
    const [hoveredEvent, setHoveredEvent] = useState<SanityEvent | null>(null)

    // Convert events to Date objects for calendar - grouped by event type
    const eventDatesByType = useMemo(() => {
        const regional: Date[] = []
        const national: Date[] = []
        const world: Date[] = []
        const signature: Date[] = []
        const skills: Date[] = []
        const scrimmage: Date[] = []

        allEvents.forEach(e => {
            const eventDate = new Date(e.startDate)
            switch (e.eventType) {
                case 'regional':
                    regional.push(eventDate)
                    break
                case 'national':
                    national.push(eventDate)
                    break
                case 'world':
                    world.push(eventDate)
                    break
                case 'signature':
                    signature.push(eventDate)
                    break
                case 'skills':
                    skills.push(eventDate)
                    break
                case 'scrimmage':
                    scrimmage.push(eventDate)
                    break
            }
        })

        return { regional, national, world, signature, skills, scrimmage }
    }, [allEvents])

    // Get events for selected date
    const getEventsForDate = (date: Date | undefined) => {
        if (!date) return []
        return allEvents.filter(e => {
            const eventDate = new Date(e.startDate)
            return eventDate.toDateString() === date.toDateString()
        })
    }

    const selectedDateEvents = getEventsForDate(selectedDate)

    // Dinamik geri sayım turnuvası belirleme
    const countdownEvent = useMemo(() => {
        // Eğer etkinlik bittiyse veya ayarlar yoksa bir sonrakini bul
        if (countdownEventEnded || !countdownSettings) {
            return findNextPriorityEvent(allEvents)
        }

        // Manuel mod: seçili turnuvayı kullan
        if (countdownSettings.mode === 'manual' && countdownSettings.manualEvent) {
            return countdownSettings.manualEvent
        }

        // Otomatik mod: en yakın ulusal/signature turnuvayı bul
        return findNextPriorityEvent(allEvents)
    }, [countdownSettings, allEvents, countdownEventEnded])

    const countdownTheme = getCountdownThemeColors(countdownSettings?.theme)
    const countdownTitle = countdownSettings?.cardTitle || countdownEvent?.name || 'Yaklaşan Turnuva'

    // Custom day content with colored dots and tooltip
    const renderDayContent = (day: Date) => {
        const dayEvents = allEvents.filter(e => {
            const eventDate = new Date(e.startDate)
            return eventDate.toDateString() === day.toDateString()
        })

        if (dayEvents.length === 0) return null

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event, idx) => {
                                const colors = getEventTypeColor(event.eventType)
                                return (
                                    <div
                                        key={idx}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: colors.dot }}
                                    />
                                )
                            })}
                            {dayEvents.length > 3 && (
                                <span className="text-[8px] text-gray-500">+{dayEvents.length - 3}</span>
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-2">
                            {dayEvents.map((event, idx) => {
                                const colors = getEventTypeColor(event.eventType)
                                return (
                                    <div key={idx} className="flex items-start gap-2">
                                        <div
                                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                            style={{ backgroundColor: colors.dot }}
                                        />
                                        <div>
                                            <p className="font-medium text-sm">{event.name}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                                <span>{event.city}</span>
                                                <span className={event.registrationOpen ? 'text-green-600' : 'text-red-500'}>
                                                    {event.registrationOpen ? '● Kayıt Açık' : '● Kayıt Kapalı'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Etkinlik Takvimi"
                subtitle="VEX Türkiye turnuvalarını takip edin ve takımınızı kaydedin"
            />

            {/* Main Content */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Calendar */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                {/* Header with button */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-primary" />
                                        Turnuva Takvimi
                                    </h2>
                                    <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler">
                                        <Button variant="outline" size="sm" className="border-gray-300">
                                            <List className="w-4 h-4 mr-2" />
                                            Tüm Etkinlikler
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Legend */}
                                <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                                    {[
                                        { type: 'regional', label: 'Bölge' },
                                        { type: 'national', label: 'Ulusal' },
                                        { type: 'world', label: 'Dünya' },
                                        { type: 'signature', label: 'Signature' },
                                        { type: 'skills', label: 'Skills' },
                                    ].map(item => {
                                        const colors = getEventTypeColor(item.type)
                                        return (
                                            <div key={item.type} className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.dot }} />
                                                {item.label}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="-ml-6 w-[calc(100%+1.5rem)] pl-0 overflow-x-auto md:ml-0 md:w-full md:pl-0 md:overflow-visible">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        month={month}
                                        onMonthChange={setMonth}
                                        className="rounded-md border-0 w-full"
                                        classNames={{
                                            table: "w-full border-collapse table-fixed",
                                            weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] min-w-0",
                                        }}
                                        modifiers={{
                                            regional: eventDatesByType.regional,
                                            national: eventDatesByType.national,
                                            world: eventDatesByType.world,
                                            signature: eventDatesByType.signature,
                                            skills: eventDatesByType.skills,
                                            scrimmage: eventDatesByType.scrimmage,
                                        }}
                                        modifiersStyles={{
                                            regional: {
                                                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                                border: '2px solid #3B82F6',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            },
                                            national: {
                                                backgroundColor: 'rgba(227, 24, 55, 0.15)',
                                                border: '2px solid #E31837',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            },
                                            world: {
                                                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                                                border: '2px solid #A855F7',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            },
                                            signature: {
                                                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                                                border: '2px solid #F97316',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            },
                                            skills: {
                                                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                                border: '2px solid #22C55E',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            },
                                            scrimmage: {
                                                backgroundColor: 'rgba(107, 114, 128, 0.15)',
                                                border: '2px solid #6B7280',
                                                fontWeight: 'bold',
                                                borderRadius: '50%'
                                            }
                                        }}
                                    />
                                </div>

                                {/* Selected date info */}
                                {selectedDate && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-500 mb-2">
                                            {selectedDate.toLocaleDateString('tr-TR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        {selectedDateEvents.length > 0 ? (
                                            <div className="space-y-2">
                                                {selectedDateEvents.map((event, i) => {
                                                    const colors = getEventTypeColor(event.eventType)
                                                    return (
                                                        <div key={i} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dot }} />
                                                                <Link href={`/yarismalar/etkinlik-takvimi/tum-etkinlikler/${event.slug.current}`} className="font-medium text-gray-900 hover:text-primary hover:underline transition-colors">
                                                                    {event.name}
                                                                </Link>
                                                                <span className="text-xs text-gray-500">• {event.city}</span>
                                                            </div>
                                                            <AddToCalendarButton event={event} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm">Bu tarihte etkinlik bulunmuyor.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Upcoming Events List */}
                            <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Tüm Turnuvalar</h3>
                                    <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler">
                                        <Button variant="ghost" size="sm" className="text-primary">
                                            Tümünü Gör
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {upcomingEvents.slice(0, 5).map((event, index) => (
                                        <EventCard key={event._id} event={event} index={index} />
                                    ))}
                                    {upcomingEvents.length === 0 && (
                                        <p className="text-gray-500 text-center py-8">Yaklaşan turnuva bulunmuyor.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Countdown Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Dynamic Countdown from Sanity */}
                            {countdownEvent && (
                                <div className={`bg-gradient-to-br ${countdownTheme.gradient} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Trophy className="w-6 h-6" />
                                        <h3 className="font-bold text-lg">{countdownTitle}</h3>
                                    </div>
                                    <p className="text-white text-sm mb-4">
                                        {formatEventDate(countdownEvent.startDate, { day: 'numeric', month: 'long', year: 'numeric' })} • {countdownEvent.city}
                                    </p>
                                    <Countdown
                                        targetDate={new Date(countdownEvent.startDate)}
                                        label={countdownEvent.name}
                                        theme={countdownSettings?.theme}
                                        liveStreamUrl={countdownSettings?.liveStreamUrl}
                                        registrationOpen={countdownEvent.registrationOpen}
                                        onEventEnd={() => setCountdownEventEnded(true)}
                                    />
                                </div>
                            )}

                            {/* Upcoming 3 Events */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Yaklaşan Turnuvalar
                                </h3>

                                <div className="space-y-4">
                                    {upcomingEvents.slice(0, 3).map((event, index) => (
                                        <CompactEventCard key={event._id} event={event} index={index} />
                                    ))}
                                </div>

                                <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler" className="block mt-4">
                                    <Button variant="outline" className="w-full border-gray-300">
                                        Tüm Turnuvaları Gör
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">2025-2026 Sezonu</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                                        <div className="text-2xl font-bold text-primary">{allEvents.length}</div>
                                        <div className="text-xs text-gray-500">Turnuva</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                                        <div className="text-2xl font-bold text-primary">
                                            {[...new Set(allEvents.map(e => e.city))].length}
                                        </div>
                                        <div className="text-xs text-gray-500">Şehir</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                                        <div className="text-2xl font-bold text-primary">500+</div>
                                        <div className="text-xs text-gray-500">Takım</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                                        <div className="text-2xl font-bold text-primary">5000+</div>
                                        <div className="text-xs text-gray-500">Öğrenci</div>
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
