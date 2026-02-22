'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Search,
    Bell,
    ChevronDown,
    Menu,
    X,
    Settings,
    User,
    LogOut,
    Moon,
    Sun,
    HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
    sidebarCollapsed: boolean
    onToggleSidebar: () => void
}

export function AdminHeader({ sidebarCollapsed, onToggleSidebar }: AdminHeaderProps) {
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
                'fixed top-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-300',
                sidebarCollapsed ? 'left-20' : 'left-[280px]'
            )}
        >
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleSidebar}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                    {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </Button>

                {/* Search Bar */}
                <div className={cn(
                    'relative transition-all duration-300',
                    searchFocused ? 'w-96' : 'w-72'
                )}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Ara... (Ctrl+K)"
                        className={cn(
                            'pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all',
                            searchFocused && 'ring-2 ring-primary/20'
                        )}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded">
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                    <Sun className="w-5 h-5" />
                </Button>

                {/* Help */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                    <HelpCircle className="w-5 h-5" />
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
                                3
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Bildirimler</span>
                            <Badge variant="secondary" className="text-xs">3 yeni</Badge>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-72 overflow-y-auto">
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium flex-1">Yeni takım kaydı</span>
                                    <span className="text-xs text-gray-400">5 dk</span>
                                </div>
                                <p className="text-xs text-gray-500 ml-4">Robo-Tigers ekibi başarıyla kayıt oldu.</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium flex-1">Yeni mesaj</span>
                                    <span className="text-xs text-gray-400">15 dk</span>
                                </div>
                                <p className="text-xs text-gray-500 ml-4">Sponsor başvurusu: Teknoloji A.Ş.</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    <span className="text-sm font-medium flex-1">Turnuva hatırlatma</span>
                                    <span className="text-xs text-gray-400">1 saat</span>
                                </div>
                                <p className="text-xs text-gray-500 ml-4">İstanbul turnuvasına 15 gün kaldı.</p>
                            </DropdownMenuItem>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-center text-primary text-sm cursor-pointer justify-center">
                            Tüm bildirimleri görüntüle
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Separator */}
                <div className="w-px h-8 bg-gray-200" />

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/admin-avatar.jpg" />
                                <AvatarFallback className="bg-gradient-to-br from-primary to-red-700 text-white text-sm">
                                    VX
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-900">Admin</span>
                                <span className="text-xs text-gray-500">Yönetici</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col">
                                <span className="font-medium">Admin User</span>
                                <span className="text-xs text-gray-500 font-normal">admin@vexturkiye.org</span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" />
                            Ayarlar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Çıkış Yap
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.header>
    )
}

export default AdminHeader
