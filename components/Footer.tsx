'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative bg-[#0f172a] border-t border-gray-800 text-gray-300">
            <div className="container mx-auto px-6 max-w-7xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1 - Brand Identity */}
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="text-2xl font-black tracking-tight text-white flex flex-col">
                                <span>RECF TÜRKİYE</span>
                                <span className="text-xs font-normal text-gray-400">Türkiye Temsilcisi: Intechne Teknoloji</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                            RECF Türkiye | Türkiye Temsilcisi: Intechne Teknoloji. Robotics Education & Competition Foundation (RECF) programlarının Türkiye organizasyonları Intechne Teknoloji tarafından yürütülmektedir.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/recfturkiye" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/company/intechne" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com/@recfturkiye" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="YouTube">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500">@recfturkiye · @intechnenet</p>
                    </div>

                    {/* Column 2 - RECF Programs */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">RECF Programları</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/recf-programlari/engage" className="hover:text-primary transition-colors">RECF Engage</Link>
                            </li>
                            <li>
                                <Link href="/recf-programlari/achieve" className="hover:text-primary transition-colors">RECF Achieve</Link>
                            </li>
                            <li>
                                <Link href="/recf-programlari/inspire" className="hover:text-primary transition-colors">RECF Inspire</Link>
                            </li>
                            <li>
                                <Link href="/kaynaklar/mufredat" className="hover:text-primary transition-colors">Eğitim ve Öğrenme Kaynakları</Link>
                            </li>
                            <li>
                                <Link href="/kaynaklar/yazilim" className="hover:text-primary transition-colors">Programlama ve Yazılım Kaynakları</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Participation */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">Katılım</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/yarismalar/etkinlik-takvimi" className="hover:text-primary transition-colors">RECF Türkiye Etkinlik Takvimi</Link>
                            </li>
                            <li>
                                <Link href="/yarismalar/sezon-oyunlari" className="hover:text-primary transition-colors">2026–2027 RECF Sezon Oyunları</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/nasil-kurulur" className="hover:text-primary transition-colors">RECF Takımı Nasıl Kurulur?</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/kayit" className="hover:text-primary transition-colors">RECF Takım Kaydı</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/koc-ve-mentor-merkezi" className="hover:text-primary transition-colors">Koç ve Mentor Merkezi</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact & Legal */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">İletişim</h3>
                        <ul className="space-y-3 text-sm mb-6">
                            <li>
                                <Link href="/iletisim/form" className="hover:text-primary transition-colors">RECF Türkiye İletişim Formu</Link>
                            </li>
                            <li>
                                <Link href="/kurumsal/hakkimizda" className="hover:text-primary transition-colors">RECF Türkiye Hakkında</Link>
                            </li>
                            <li>
                                <Link href="/kurumsal/gonulluluk" className="hover:text-primary transition-colors">RECF Türkiye Gönüllülük</Link>
                            </li>
                        </ul>
                        <div className="space-y-4 text-sm pt-4 border-t border-gray-800">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-gray-400">Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <a href="tel:+902129092310" className="text-gray-400 hover:text-white transition-colors">
                                    +90 (212) 909 23 10
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href="mailto:info@recfturkiye.org" className="text-gray-400 hover:text-white transition-colors">
                                    info@recfturkiye.org
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RECF-VEX Distinction Notice */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-xs text-gray-400 leading-relaxed">
                    <p className="font-bold text-gray-300 mb-2 font-semibold">RECF – VEX Ayrım Bildirimi</p>
                    <p>
                        Robotics Education & Competition Foundation (RECF), robotik yarışmaları düzenleyen bağımsız bir eğitim vakfıdır. VEX Robotics (Innovation First International, Inc.) ise yarışmalarda kullanılan donanım ve yazılımları üreten ayrı bir ticari kuruluştur. RECF Türkiye operasyonları Intechne Teknoloji tarafından yürütülmekte olup, VEX Robotics'in bir şubesi veya bayisi değildir.
                    </p>
                </div>

                {/* Legal Links & Copyright */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
                        <p>© 2026 RECF Türkiye | Türkiye Temsilcisi: Intechne Teknoloji. Tüm Hakları Saklıdır.</p>
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <Link href="/hukuki/kvkk" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</Link>
                            <Link href="/hukuki/gizlilik" className="hover:text-primary transition-colors">Gizlilik ve Çerez Politikası</Link>
                            <Link href="/hukuki/kullanim-kosullari" className="hover:text-primary transition-colors">Kullanım Koşulları</Link>
                            <Link href="/hukuki/fotograf-video-izin" className="hover:text-primary transition-colors">Fotoğraf ve Video İzin Metni</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
