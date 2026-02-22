'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Bell,
    Newspaper,
    FileText,
    Image,
    Tv,
    Trophy,
    ClipboardList,
    Award,
    Users,
    MapPin,
    UserCheck,
    HelpCircle,
    FolderOpen,
    FileArchive,
    Mail,
    Heart,
    AlertTriangle,
    Settings,
    Cog,
    ChevronRight,
    LogOut,
    User,
    Command,
    Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Bell,
    Newspaper,
    FileText,
    Image,
    Tv,
    Trophy,
    ClipboardList,
    Award,
    Users,
    MapPin,
    UserCheck,
    HelpCircle,
    FolderOpen,
    FileArchive,
    Mail,
    Heart,
    AlertTriangle,
    Settings,
    Cog
}

// Sidebar menu structure
const sidebarMenuItems = [
    {
        title: 'Ana Panel',
        items: [
            { title: 'Dashboard', url: '/admin', icon: 'LayoutDashboard' },
            { title: 'Bildirimler', url: '/admin/notifications', icon: 'Bell', badge: '3' }
        ]
    },
    {
        title: 'İçerik Yönetimi',
        items: [
            { title: 'Haberler', url: '/admin/news', icon: 'Newspaper' },
            { title: 'Blog Yazıları', url: '/admin/blog', icon: 'FileText' },
            { title: 'Galeri', url: '/admin/gallery', icon: 'Image' },
            { title: 'Basın Haberleri', url: '/admin/press', icon: 'Tv' }
        ]
    },
    {
        title: 'Yarışma Kontrolü',
        items: [
            { title: 'Turnuvalar', url: '/admin/tournaments', icon: 'Trophy' },
            { title: 'Kayıt Yönetimi', url: '/admin/registrations', icon: 'ClipboardList' },
            { title: 'Sonuçlar', url: '/admin/results', icon: 'Award' }
        ]
    },
    {
        title: 'Takım Veritabanı',
        items: [
            { title: 'Tüm Takımlar', url: '/admin/teams', icon: 'Users' },
            { title: 'Şehir İstatistikleri', url: '/admin/cities', icon: 'MapPin' },
            { title: 'Mentörler', url: '/admin/mentors', icon: 'UserCheck' }
        ]
    },
    {
        title: 'Bilgi Bankası',
        items: [
            { title: 'SSS Yönetimi', url: '/admin/faq', icon: 'HelpCircle' },
            { title: 'Kaynaklar', url: '/admin/resources', icon: 'FolderOpen' },
            { title: 'Dökümanlar', url: '/admin/documents', icon: 'FileArchive' }
        ]
    },
    {
        title: 'İletişim',
        items: [
            { title: 'Mesajlar', url: '/admin/messages', icon: 'Mail', badge: '2' },
            { title: 'Gönüllü Başvuruları', url: '/admin/volunteers', icon: 'Heart' }
        ]
    },
    {
        title: 'Komut Merkezi',
        items: [
            { title: 'Acil Durum Modu', url: '/admin/emergency', icon: 'AlertTriangle' },
            { title: 'Sezon Ayarları', url: '/admin/season', icon: 'Settings' },
            { title: 'Site Ayarları', url: '/admin/settings', icon: 'Cog' }
        ]
    }
]

interface AdminSidebarProps {
    collapsed?: boolean
    onToggle?: () => void
}

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <TooltipProvider delayDuration={0}>
            <motion.aside
                initial={{ width: collapsed ? 80 : 280 }}
                animate={{ width: collapsed ? 80 : 280 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col"
            >
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
                        >
                            <Command className="w-5 h-5 text-white" />
                        </motion.div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="font-bold text-gray-900 text-sm">VEX Command</div>
                                    <div className="text-xs text-gray-500">Center</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4">
                    <nav className="px-3 space-y-6">
                        {sidebarMenuItems.map((section, sectionIndex) => (
                            <div key={section.title}>
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.h4
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                        >
                                            {section.title}
                                        </motion.h4>
                                    )}
                                </AnimatePresence>
                                <ul className="space-y-1">
                                    {section.items.map((item, itemIndex) => {
                                        const Icon = iconMap[item.icon] || LayoutDashboard
                                        const isActive = pathname === item.url

                                        const linkContent = (
                                            <motion.li
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: sectionIndex * 0.05 + itemIndex * 0.02 }}
                                            >
                                                <Link
                                                    href={item.url}
                                                    className={cn(
                                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                                                        isActive
                                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    )}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="activeIndicator"
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
                                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                        />
                                                    )}
                                                    <Icon className={cn(
                                                        'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                                                        !isActive && 'group-hover:scale-110'
                                                    )} />
                                                    <AnimatePresence>
                                                        {!collapsed && (
                                                            <motion.span
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex-1 text-sm font-medium"
                                                            >
                                                                {item.title}
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                    {!collapsed && item.badge && (
                                                        <Badge
                                                            variant={isActive ? 'secondary' : 'default'}
                                                            className={cn(
                                                                'text-xs px-2 py-0.5',
                                                                isActive
                                                                    ? 'bg-white/20 text-white'
                                                                    : 'bg-primary text-white'
                                                            )}
                                                        >
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                    {!collapsed && !isActive && (
                                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </Link>
                                            </motion.li>
                                        )

                                        if (collapsed) {
                                            return (
                                                <Tooltip key={item.url}>
                                                    <TooltipTrigger asChild>
                                                        {linkContent}
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right" className="flex items-center gap-2">
                                                        {item.title}
                                                        {item.badge && (
                                                            <Badge className="bg-primary text-white text-xs">
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </TooltipContent>
                                                </Tooltip>
                                            )
                                        }

                                        return <React.Fragment key={item.url}>{linkContent}</React.Fragment>
                                    })}
                                </ul>
                                {sectionIndex < sidebarMenuItems.length - 1 && !collapsed && (
                                    <Separator className="mt-4" />
                                )}
                            </div>
                        ))}
                    </nav>
                </ScrollArea>

                {/* User Section */}
                <div className="border-t border-gray-200 p-4">
                    <div className={cn(
                        'flex items-center gap-3',
                        collapsed ? 'justify-center' : ''
                    )}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex-1 min-w-0"
                                >
                                    <div className="text-sm font-medium text-gray-900 truncate">Admin User</div>
                                    <div className="text-xs text-gray-500 truncate">admin@vexturkiye.org</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!collapsed && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <LogOut className="w-4 h-4 text-gray-500" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>Çıkış Yap</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Quick Actions - Only when not collapsed */}
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-200 p-4"
                        >
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors"
                            >
                                <Zap className="w-4 h-4" />
                                Siteyi Görüntüle
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </TooltipProvider>
    )
}

export default AdminSidebar
