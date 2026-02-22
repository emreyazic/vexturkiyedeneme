'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    GraduationCap,
    MapPin,
    Trophy,
    TrendingUp,
    Mail,
    Clock,
    Eye,
    ChevronRight,
    Newspaper,
    AlertCircle,
    Zap,
    Calendar,
    ArrowUpRight,
    MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AdminLayout } from '@/components/admin'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Mock Data
const dashboardStats = [
    {
        id: 'teams',
        title: 'Toplam Takım',
        value: 547,
        change: '+23',
        changeLabel: 'bu ay',
        changeType: 'positive' as const,
        icon: Users,
        color: 'from-blue-500 to-blue-600'
    },
    {
        id: 'students',
        title: 'Öğrenci Sayısı',
        value: 2188,
        change: '+156',
        changeLabel: 'bu ay',
        changeType: 'positive' as const,
        icon: GraduationCap,
        color: 'from-emerald-500 to-emerald-600'
    },
    {
        id: 'cities',
        title: 'Aktif Şehir',
        value: 81,
        change: 'Tüm',
        changeLabel: 'Türkiye',
        changeType: 'neutral' as const,
        icon: MapPin,
        color: 'from-purple-500 to-purple-600'
    }
]

const recentMessages = [
    {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@okul.edu.tr',
        subject: 'Takım Kaydı Hakkında',
        message: 'Okulumuz adına VEX IQ takımı kurmak istiyoruz...',
        date: '14:30',
        isRead: false,
        priority: 'high' as const
    },
    {
        id: '2',
        name: 'Zeynep Kaya',
        email: 'zeynep@mentor.com',
        subject: 'Mentor Başvurusu',
        message: 'VEX V5 kategorisinde mentor olarak görev almak istiyorum.',
        date: '11:15',
        isRead: false,
        priority: 'medium' as const
    },
    {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@firma.com',
        subject: 'Sponsorluk Teklifi',
        message: 'Şirketimiz VEX Türkiye etkinliklerine sponsor olmak istiyor.',
        date: 'Dün',
        isRead: true,
        priority: 'high' as const
    },
    {
        id: '4',
        name: 'Ayşe Özkan',
        email: 'ayse@lise.edu.tr',
        subject: 'Turnuva Tarihi Değişikliği',
        message: 'İstanbul bölge turnuvasının tarihi hakkında soru.',
        date: 'Dün',
        isRead: true,
        priority: 'low' as const
    },
    {
        id: '5',
        name: 'Can Arslan',
        email: 'can@robotik.org',
        subject: 'Teknik Destek',
        message: 'VEXcode kurulumunda yaşadığımız sorun hakkında yardım.',
        date: '2 gün',
        isRead: true,
        priority: 'medium' as const
    }
]

const recentNews = [
    {
        id: '1',
        title: 'VEX V5 Rapid Relay Sezonu Resmen Başladı!',
        excerpt: '2025-2026 sezonu "Rapid Relay" temasıyla startını aldı.',
        category: 'Sezon Haberleri',
        date: '28 Ocak 2026',
        status: 'published' as const,
        views: 1250,
        teamOfTheDay: 'Robo-Tigers #12345A'
    },
    {
        id: '2',
        title: 'İstanbul Bölge Turnuvası Kayıtları Açıldı',
        excerpt: '15 Şubat 2026 tarihinde gerçekleşecek turnuva için kayıtlar başladı.',
        category: 'Turnuva',
        date: '27 Ocak 2026',
        status: 'published' as const,
        views: 890
    },
    {
        id: '3',
        title: 'Yeni VEXcode Güncellemesi Yayınlandı',
        excerpt: 'VEXcode V5 ve IQ için yeni özellikler içeren güncelleme.',
        category: 'Teknik',
        date: '26 Ocak 2026',
        status: 'published' as const,
        views: 567
    }
]

// Countdown hook
function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate.getTime() - now

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return timeLeft
}

// Stat Card Component
function StatCard({ stat, index }: { stat: typeof dashboardStats[0]; index: number }) {
    const Icon = stat.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={cn(
                    'absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20',
                    `bg-gradient-to-br ${stat.color}`
                )} />
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {typeof stat.value === 'number' ? stat.value.toLocaleString('tr-TR') : stat.value}
                            </h3>
                            <div className="flex items-center gap-1 mt-2">
                                {stat.changeType === 'positive' && (
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                )}
                                <span className={cn(
                                    'text-sm font-medium',
                                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-gray-500'
                                )}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-400">{stat.changeLabel}</span>
                            </div>
                        </div>
                        <div className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg',
                            stat.color
                        )}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Countdown Card Component
function CountdownCard() {
    // Türkiye Şampiyonası: 28 Şubat 2026
    const targetDate = new Date('2026-02-28T10:00:00')
    const timeLeft = useCountdown(targetDate)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary to-red-700 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30 bg-white" />
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-white/80 mb-1">Türkiye Şampiyonası</p>
                            <h3 className="text-xl font-bold">28 Şubat 2026</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mt-4">
                        {[
                            { label: 'Gün', value: timeLeft.days },
                            { label: 'Saat', value: timeLeft.hours },
                            { label: 'Dakika', value: timeLeft.minutes },
                            { label: 'Saniye', value: timeLeft.seconds }
                        ].map((item, i) => (
                            <div key={item.label} className="text-center">
                                <motion.div
                                    key={`${item.label}-${item.value}`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl font-bold bg-white/20 backdrop-blur rounded-lg py-2"
                                >
                                    {item.value.toString().padStart(2, '0')}
                                </motion.div>
                                <div className="text-xs text-white/70 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Messages Card Component
function MessagesCard() {
    const priorityColors = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-gray-400'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <Card className="border-0 shadow-lg h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">Son Mesajlar</CardTitle>
                        <CardDescription>Bize Ulaşın formundan gelen mesajlar</CardDescription>
                    </div>
                    <Link href="/admin/messages">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Tümünü Gör
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="space-y-3">
                        {recentMessages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                                className={cn(
                                    'flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                                    message.isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/50 hover:bg-blue-50'
                                )}
                            >
                                <div className={cn(
                                    'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                                    priorityColors[message.priority]
                                )} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={cn(
                                            'text-sm truncate',
                                            message.isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'
                                        )}>
                                            {message.name}
                                        </span>
                                        <span className="text-xs text-gray-400 flex-shrink-0">{message.date}</span>
                                    </div>
                                    <p className={cn(
                                        'text-sm truncate',
                                        message.isRead ? 'text-gray-500' : 'text-gray-700 font-medium'
                                    )}>
                                        {message.subject}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">{message.message}</p>
                                </div>
                                {!message.isRead && (
                                    <Badge className="bg-primary text-white text-xs">Yeni</Badge>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// News Card Component
function NewsCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <Card className="border-0 shadow-lg h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">Son Haberler</CardTitle>
                        <CardDescription>Yayınlanan haberler ve duyurular</CardDescription>
                    </div>
                    <Link href="/admin/news">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Tümünü Gör
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="space-y-4">
                        {recentNews.map((news, index) => (
                            <motion.div
                                key={news.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                                                {news.category}
                                            </Badge>
                                            {news.teamOfTheDay && (
                                                <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs">
                                                    ⭐ Günün Takımı
                                                </Badge>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                                            {news.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{news.excerpt}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {news.date}
                                            </span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {news.views.toLocaleString('tr-TR')} görüntüleme
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Quick Actions Card
function QuickActionsCard() {
    const actions = [
        { title: 'Yeni Haber Ekle', icon: Newspaper, href: '/admin/news/new', color: 'bg-blue-500' },
        { title: 'Turnuva Oluştur', icon: Trophy, href: '/admin/tournaments/new', color: 'bg-emerald-500' },
        { title: 'Acil Duyuru', icon: AlertCircle, href: '/admin/emergency', color: 'bg-red-500' },
        { title: 'Sezon Ayarları', icon: Zap, href: '/admin/season', color: 'bg-purple-500' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">Hızlı İşlemler</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                        {actions.map((action, index) => (
                            <Link key={action.title} href={action.href}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                                >
                                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
                                        <action.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {action.title}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Activity Card
function ActivityCard() {
    const activities = [
        { action: 'Yeni takım kaydoldu', detail: 'Robo-Warriors #67890B', time: '5 dk önce', type: 'team' },
        { action: 'Haber yayınlandı', detail: 'Rapid Relay Sezonu Başladı', time: '1 saat önce', type: 'news' },
        { action: 'Turnuva güncellendi', detail: 'İstanbul Bölge - 24 takım', time: '2 saat önce', type: 'tournament' },
        { action: 'Mentor onaylandı', detail: 'Zeynep Kaya', time: '3 saat önce', type: 'mentor' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
        >
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">Son Aktiviteler</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.detail}</p>
                                </div>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Main Dashboard Page
export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">VEX Command Center</h1>
                        <p className="text-gray-500 mt-1">Hoş geldiniz! İşte bugünkü özet.</p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary">
                        Sezon 2025-2026: Rapid Relay
                    </Badge>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat, index) => (
                        <StatCard key={stat.id} stat={stat} index={index} />
                    ))}
                    <CountdownCard />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MessagesCard />
                    <NewsCard />
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <QuickActionsCard />
                    <ActivityCard />
                </div>
            </div>
        </AdminLayout>
    )
}
