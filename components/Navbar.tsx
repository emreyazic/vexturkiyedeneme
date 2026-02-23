'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Search, Menu, Globe, ChevronRight } from 'lucide-react'

// Menu structure data
const menuItems = {
    kurumsal: {
        title: 'Kurumsal',
        items: [
            { title: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
            { title: 'Ekibimiz', href: '/kurumsal/ekibimiz' },
            { title: 'Sponsorlarımız & Partnerler', href: '/kurumsal/sponsorlar-ve-partnerler' },
            { title: 'Gönüllü Olun', href: '/kurumsal/gonullu-olun' }
        ]
    },
    vexNedir: {
        title: 'VEX Nedir?',
        items: [
            { title: 'Genel Bakış', href: '/vex-nedir' },
            { title: 'VEX 123', href: '/vex-nedir/vex-123' },
            { title: 'VEX GO', href: '/vex-nedir/vex-go' },
            { title: 'VEX IQ', href: '/vex-nedir/vex-iq' },
            { title: 'VEX V5 (VRC)', href: '/vex-nedir/vex-v5' },
            { title: 'VEX U', href: '/vex-nedir/vex-u' },
            { title: 'VEX AI', href: '/vex-nedir/vex-ai' }
        ]
    },
    yarismalar: {
        title: 'Yarışmalar',
        items: [
            { title: 'Tüm Etkinlikler', href: '/yarismalar/etkinlik-takvimi/tum-etkinlikler' },
            { title: 'Etkinlik Takvimi', href: '/yarismalar/etkinlik-takvimi' },
            { title: 'Sezon Teması', href: '/yarismalar/sezon-temasi' },
            { title: 'Turnuva Sonuçları', href: '/yarismalar/sonuclar' },
            { title: 'Ödüller', href: '/yarismalar/oduller' },
            { title: 'Robot Skills', href: '/yarismalar/skills' },
            { title: 'Dünya Şampiyonası', href: '/yarismalar/dunya-sampiyonasi' }
        ]
    },
    takimlar: {
        title: 'Takımlar',
        items: [
            { title: 'Tüm Takımlar', href: '/takimlar/tum-takimlar' },
            { title: 'Nasıl Takım Kurulur?', href: '/takimlar/nasil-kurulur' },
            { title: 'Takım Kaydı', href: '/takimlar/kayit' },
            { title: 'Takım Haritası / Listesi', href: '/takimlar/harita' },
            { title: 'Mentor Desteği', href: '/takimlar/mentor' }
        ]
    },
    egitim: {
        title: 'Eğitim & Kaynaklar',
        items: [
            { title: 'Oyun Kılavuzları', href: '/kaynaklar/oyun-kilavuzlari' },
            { title: 'VEXcode (Yazılım)', href: '/kaynaklar/yazilim' },
            { title: 'Müfredatlar', href: '/kaynaklar/mufredat' },
            { title: 'Teknik Belgeler', href: '/kaynaklar/teknik-belgeler' },
            { title: 'Jüri ve Değerlendirme', href: '/kaynaklar/juri' }
        ]
    },
    duyurular: {
        title: 'Duyurular',
        items: [
            { title: 'Haberler', href: '/duyurular/haberler' },
            { title: 'Blog', href: '/duyurular/blog' },
            { title: 'Basında Biz', href: '/duyurular/basinda-biz' },
            { title: 'Galeri', href: '/duyurular/galeri' }
        ]
    },
    iletisim: {
        title: 'İletişim',
        items: [
            { title: 'Bilgiler & Adres', href: '/iletisim/bilgiler' },
            { title: 'Bize Ulaşın', href: '/iletisim/form' },
            { title: 'SSS', href: '/iletisim/sss' }
        ]
    }
}

interface NavbarProps {
    language?: 'TR' | 'EN'
    onLanguageToggle?: () => void
}

export function Navbar({ language = 'TR', onLanguageToggle }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/VEX-Robotics_Full-Color-1.png"
                            alt="VEX Türkiye"
                            width={120}
                            height={48}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                        <div className="hidden md:block">
                            <div className="text-lg font-bold tracking-tight text-gray-900">VEX TÜRKİYE</div>
                            <div className="text-xs text-muted-foreground">Robotics Competition</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <NavigationMenu viewport={false}>
                            <NavigationMenuList className="gap-0">
                                {/* Ana Sayfa */}
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="/"
                                        className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                                    >
                                        Ana Sayfa
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* Kurumsal */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.kurumsal.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[280px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.kurumsal.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* VEX Nedir? */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.vexNedir.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[320px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.vexNedir.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Yarışmalar */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.yarismalar.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[280px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.yarismalar.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Takımlar */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.takimlar.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[260px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.takimlar.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Eğitim & Kaynaklar */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.egitim.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[280px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.egitim.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Duyurular */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.duyurular.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[220px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.duyurular.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* İletişim */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-primary text-sm px-3">
                                        {menuItems.iletisim.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[220px] gap-1 p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                                            {menuItems.iletisim.items.map((item) => (
                                                <NavItem key={item.href} href={item.href} title={item.title} />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-700 hover:text-primary hover:bg-gray-100"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onLanguageToggle}
                            className="hidden md:flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary bg-transparent"
                        >
                            <Globe className="h-4 w-4" />
                            {language}
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-gray-700" aria-label="Menüyü aç">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[85vw] max-w-[300px] bg-white border-gray-200 overflow-y-auto px-6">
                                <div className="flex flex-col mt-6">
                                    {/* Mobile Logo */}
                                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                                        <Image
                                            src="/VEX-Robotics_Full-Color-1.png"
                                            alt="VEX Türkiye"
                                            width={100}
                                            height={40}
                                            className="h-10 w-auto object-contain"
                                        />
                                        <div>
                                            <div className="font-bold text-gray-900">VEX TÜRKİYE</div>
                                            <div className="text-xs text-gray-500">Robotics Competition</div>
                                        </div>
                                    </div>

                                    {/* Ana Sayfa Link */}
                                    <Link
                                        href="/"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-3 text-lg font-medium text-gray-900 hover:text-primary transition-colors border-b border-gray-100"
                                    >
                                        Ana Sayfa
                                    </Link>

                                    {/* Accordion Menu */}
                                    <Accordion type="single" collapsible className="w-full">
                                        {Object.entries(menuItems).map(([key, menu]) => (
                                            <AccordionItem key={key} value={key} className="border-b border-gray-100">
                                                <AccordionTrigger className="py-3 text-lg font-medium text-gray-900 hover:text-primary hover:no-underline">
                                                    {menu.title}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-col pl-4 pb-2">
                                                        {menu.items.map((item) => (
                                                            <Link
                                                                key={item.href}
                                                                href={item.href}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="py-2.5 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                                                            >
                                                                <ChevronRight className="w-3 h-3 text-gray-400" />
                                                                {item.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>

                                    {/* Language Toggle (Mobile) */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onLanguageToggle}
                                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary bg-transparent"
                                        >
                                            <Globe className="h-4 w-4 mr-2" />
                                            {language === 'TR' ? 'English' : 'Türkçe'}
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// Helper component for navigation items
function NavItem({ href, title }: { href: string; title: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={href}
                    className="block select-none rounded-md px-3 py-2.5 text-sm leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-primary text-gray-700"
                >
                    {title}
                </a>
            </NavigationMenuLink>
        </li>
    )
}

export default Navbar
