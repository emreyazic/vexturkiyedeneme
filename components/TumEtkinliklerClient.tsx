'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    ArrowLeft, Calendar, MapPin, Users, Filter, X,
    CalendarDays, Trophy, CheckCircle, XCircle, CalendarPlus,
    Download, ExternalLink, Clock, BarChart3
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
    TURKISH_CITIES,
} from '@/lib/sanity-queries'

interface TumEtkinliklerClientProps {
    allEvents: SanityEvent[]
    upcomingEvents: SanityEvent[]
    pastEvents: SanityEvent[]
}

// Add to Calendar Button
function AddToCalendarButton({ event }: { event: SanityEvent }) {
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
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-xs gap-1"
                >
                    <CalendarPlus className="w-3 h-3" />
                    Takvime Ekle
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] z-[100]">
                <DropdownMenuItem asChild>
                    <a
                        href={generateGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Google Calendar
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadICS} className="flex items-center gap-2 cursor-pointer">
                    <Download className="w-4 h-4" />
                    ICS İndir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// Event Card
function EventCard({ event, index, isPast = false }: { event: SanityEvent; index: number; isPast?: boolean }) {
    const typeColors = getEventTypeColor(event.eventType)
    const platformColors = getPlatformColor(event.platform)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all ${isPast ? 'opacity-70' : ''}`}
            style={{ borderColor: typeColors.dot }}
        >
            {/* Header */}
            <div className={`px-4 py-2 flex items-center justify-between`} style={{ backgroundColor: `${typeColors.dot}15` }}>
                <span className={`text-xs font-semibold ${typeColors.text}`}>
                    {getEventTypeLabel(event.eventType)}
                </span>
                {event.platform !== 'all' && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${platformColors.bg}`}>
                        {getPlatformLabel(event.platform)}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <Link href={`/yarismalar/etkinlik-takvimi/tum-etkinlikler/${event.slug.current}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                        {event.name}
                    </h3>
                </Link>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        {formatEventDate(event.startDate)}
                        {event.endDate && ` - ${formatEventDate(event.endDate, { day: 'numeric', month: 'short' })}`}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {event.venue}, {event.city}
                    </div>
                    {event.maxTeams && (
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            {event.registeredTeams || 0} / {event.maxTeams} takım
                        </div>
                    )}
                </div>

                {/* Registration Status */}
                {!isPast && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className={`flex items-center gap-1 text-sm font-medium ${event.registrationOpen ? 'text-green-600' : 'text-red-500'}`}>
                            {event.registrationOpen ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {event.registrationOpen ? 'Kayıt Açık' : 'Kayıt Kapalı'}
                        </span>
                        <AddToCalendarButton event={event} />
                    </div>
                )}

                {isPast && event.resultsPublished && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1 text-sm font-medium text-blue-600">
                            <Trophy className="w-4 h-4" />
                            Sonuçlar Yayınlandı
                        </span>
                        <Button variant="outline" size="sm" className="text-xs">
                            Sonuçları Gör
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export function TumEtkinliklerClient({ allEvents, upcomingEvents, pastEvents }: TumEtkinliklerClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState<string>('all')
    const [selectedEventType, setSelectedEventType] = useState<string>('all')
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [showPast, setShowPast] = useState(false)

    // Filtered events
    const filteredEvents = useMemo(() => {
        const eventsToFilter = showPast ? pastEvents : upcomingEvents

        return eventsToFilter.filter(event => {
            const searchMatch = searchQuery === '' ||
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchQuery.toLowerCase())

            const cityMatch = selectedCity === 'all' || event.city === selectedCity
            const typeMatch = selectedEventType === 'all' || event.eventType === selectedEventType
            const platformMatch = selectedPlatform === 'all' || event.platform === selectedPlatform || event.platform === 'all'

            // Date Range Check
            const eventStart = new Date(event.startDate)
            const eventEnd = event.endDate ? new Date(event.endDate) : new Date(event.startDate)

            let dateMatch = true
            if (startDate) {
                // Event should happen after or during start date
                // We check if event ends on or after the selected start date
                dateMatch = dateMatch && eventEnd >= new Date(startDate)
            }
            if (endDate) {
                // Event should happen before or during end date
                // We check if event starts on or before the selected end date
                dateMatch = dateMatch && eventStart <= new Date(endDate)
            }

            return searchMatch && cityMatch && typeMatch && platformMatch && dateMatch
        })
    }, [upcomingEvents, pastEvents, showPast, searchQuery, selectedCity, selectedEventType, selectedPlatform, startDate, endDate])

    // Cities with events
    const citiesWithEvents = useMemo(() => {
        return [...new Set(allEvents.map(e => e.city))].sort()
    }, [allEvents])

    // Stats
    const stats = useMemo(() => ({
        total: filteredEvents.length,
        regional: filteredEvents.filter(e => e.eventType === 'regional').length,
        national: filteredEvents.filter(e => e.eventType === 'national').length,
        cities: [...new Set(filteredEvents.map(e => e.city))].length,
    }), [filteredEvents])

    // Reset filters
    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCity('all')
        setSelectedEventType('all')
        setSelectedPlatform('all')
        setStartDate('')
        setEndDate('')
    }

    const hasActiveFilters = searchQuery !== '' || selectedCity !== 'all' || selectedEventType !== 'all' || selectedPlatform !== 'all' || startDate !== '' || endDate !== ''

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Hero Header */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Back Button */}
                        <div className="flex justify-start mb-6">
                            <Link href="/yarismalar/etkinlik-takvimi">
                                <Button variant="ghost" className="text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Takvime Dön
                                </Button>
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                                    <Calendar className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                {showPast ? 'Geçmiş Etkinlikler' : 'Tüm Etkinlikler'}
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                VEX Türkiye turnuva arşivi
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats & Filters */}
            <section className="py-6 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Live Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-8 mb-6"
                    >
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <span className="text-gray-600">Şu an</span>
                            <span className="text-2xl font-bold text-primary">{stats.total}</span>
                            <span className="text-gray-600">etkinlik listeleniyor</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                Bölge: {stats.regional}
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                Ulusal: {stats.national}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {stats.cities} şehir
                            </span>
                        </div>
                    </motion.div>

                    {/* Toggle Past/Upcoming */}
                    <div className="flex justify-center mb-4">
                        <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50">
                            <button
                                onClick={() => setShowPast(false)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!showPast ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Clock className="w-4 h-4 inline mr-1" />
                                Yaklaşan ({upcomingEvents.length})
                            </button>
                            <button
                                onClick={() => setShowPast(true)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showPast ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Trophy className="w-4 h-4 inline mr-1" />
                                Geçmiş ({pastEvents.length})
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Input
                                placeholder="Turnuva adı, şehir veya mekan ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-4 h-11 border-gray-300"
                            />
                        </div>

                        {/* City Filter */}
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger className="w-full md:w-48 h-11 border-gray-300">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                <SelectValue placeholder="Şehir" />
                            </SelectTrigger>
                            <SelectContent className="max-h-80">
                                <SelectItem value="all">Tüm Şehirler</SelectItem>
                                {citiesWithEvents.map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Event Type Filter */}
                        <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                            <SelectTrigger className="w-full md:w-48 h-11 border-gray-300">
                                <Trophy className="w-4 h-4 mr-2 text-gray-400" />
                                <SelectValue placeholder="Tür" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Türler</SelectItem>
                                <SelectItem value="regional">Bölge Turnuvası</SelectItem>
                                <SelectItem value="national">Ulusal Şampiyona</SelectItem>
                                <SelectItem value="world">Dünya Şampiyonası</SelectItem>
                                <SelectItem value="signature">Signature Event</SelectItem>
                                <SelectItem value="skills">Skills Challenge</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Platform Filter */}
                        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                            <SelectTrigger className="w-full md:w-40 h-11 border-gray-300">
                                <SelectValue placeholder="Platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Platformlar</SelectItem>
                                <SelectItem value="vex-iq">VEX IQ</SelectItem>
                                <SelectItem value="vex-v5">VEX V5</SelectItem>
                                <SelectItem value="vex-u">VEX U</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Date Range Inputs */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <Input
                                type="date"
                                placeholder="Başlangıç"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-11 border-gray-300 w-full md:w-40"
                            />
                            <Input
                                type="date"
                                placeholder="Bitiş"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-11 border-gray-300 w-full md:w-40"
                            />
                        </div>

                        {/* Reset Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetFilters}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    {filteredEvents.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event, index) => (
                                <EventCard key={event._id} event={event} index={index} isPast={showPast} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-4">
                                {hasActiveFilters ? 'Filtrelere uygun etkinlik bulunamadı.' : 'Henüz etkinlik bulunmuyor.'}
                            </p>
                            {hasActiveFilters && (
                                <Button variant="outline" onClick={resetFilters}>
                                    Filtreleri Temizle
                                </Button>
                            )}
                        </motion.div>
                    )}

                    {/* Back to top */}
                    {filteredEvents.length > 6 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Button
                                variant="outline"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="border-gray-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 rotate-90" />
                                Sayfa Başına Dön
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white">VEX</div>
                            <span className="text-gray-600">VEX Türkiye Etkinlik Arşivi</span>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/yarismalar/etkinlik-takvimi">
                                <Button variant="ghost" className="text-primary">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Takvim Görünümü
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
