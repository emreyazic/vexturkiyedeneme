'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react'

interface FooterProps {
    language?: 'TR' | 'EN'
}

const content = {
    TR: {
        brand: {
            title: "RECF TÜRKİYE",
            representative: "Türkiye Temsilcisi: Intechne Teknoloji",
            description: "RECF Türkiye | Türkiye Temsilcisi: Intechne Teknoloji. Robotics Education & Competition Foundation (RECF) programlarının Türkiye organizasyonları Intechne Teknoloji tarafından yürütülmektedir."
        },
        programs: {
            title: "RECF Programları",
            education: "Eğitim ve Öğrenme Kaynakları",
            programming: "Programlama ve Yazılım Kaynakları"
        },
        participation: {
            title: "Katılım",
            calendar: "RECF Türkiye Etkinlik Takvimi",
            seasonGames: "2026–2027 RECF Sezon Oyunları",
            howToStart: "RECF Takımı Nasıl Kurulur?",
            registration: "RECF Takım Kaydı",
            coachCenter: "Koç ve Mentor Merkezi"
        },
        contact: {
            title: "İletişim",
            form: "RECF Türkiye İletişim Formu",
            about: "RECF Türkiye Hakkında",
            volunteering: "RECF Türkiye Gönüllülük",
            address: "Maslak Mah. Büyükdere Cad. No:237, Sarıyer / İstanbul"
        },
        notice: {
            title: "RECF – VEX Ayrım Bildirimi",
            text: "Robotics Education & Competition Foundation (RECF), robotik yarışmaları düzenleyen bağımsız bir eğitim vakfıdır. VEX Robotics (Innovation First International, Inc.) ise yarışmalarda kullanılan donanım ve yazılımları üreten ayrı bir ticari kuruluştur. RECF Türkiye operasyonları Intechne Teknoloji tarafından yürütülmekte olup, VEX Robotics'in bir şubesi veya bayisi değildir."
        },
        legal: {
            copyright: "© 2026 RECF Türkiye | Türkiye Temsilcisi: Intechne Teknoloji. Tüm Hakları Saklıdır.",
            kvkk: "KVKK Aydınlatma Metni",
            privacy: "Gizlilik ve Çerez Politikası",
            terms: "Kullanım Koşulları",
            photoVideo: "Fotoğraf ve Video İzin Metni"
        }
    },
    EN: {
        brand: {
            title: "RECF TURKEY",
            representative: "Turkey Representative: Intechne Technology",
            description: "RECF Turkey | Turkey Representative: Intechne Technology. Robotics Education & Competition Foundation (RECF) program organizations in Turkey are conducted by Intechne Technology."
        },
        programs: {
            title: "RECF Programs",
            education: "Education & Learning Resources",
            programming: "Programming & Software Resources"
        },
        participation: {
            title: "PARTICIPATION",
            calendar: "RECF Turkey Events Calendar",
            seasonGames: "2026–2027 RECF Season Games",
            howToStart: "How to Start a RECF Team?",
            registration: "RECF Team Registration",
            coachCenter: "Coach & Mentor Center"
        },
        contact: {
            title: "Contact",
            form: "RECF Turkey Contact Form",
            about: "About RECF Turkey",
            volunteering: "RECF Turkey Volunteering",
            address: "Maslak Mah. Buyukdere Cad. No:237, Sariyer / Istanbul"
        },
        notice: {
            title: "RECF – VEX Distinction Notice",
            text: "The Robotics Education & Competition Foundation (RECF) is an independent educational foundation that organizes robotics competitions. VEX Robotics (Innovation First International, Inc.) is a separate commercial entity that manufactures the hardware and software used in the competitions. RECF Turkey operations are conducted by Intechne Technology and are not a branch or dealer of VEX Robotics."
        },
        legal: {
            copyright: "© 2026 RECF Turkey | Turkey Representative: Intechne Technology. All Rights Reserved.",
            kvkk: "GDPR Clarification Text",
            privacy: "Privacy and Cookie Policy",
            terms: "Terms of Use",
            photoVideo: "Photo and Video Release Form"
        }
    }
}

export function Footer({ language = 'TR' }: FooterProps) {
    const t = content[language]

    return (
        <footer className="relative bg-[#0f172a] border-t border-gray-800 text-gray-300">
            <div className="container mx-auto px-6 max-w-7xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1 - Brand Identity */}
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="text-2xl font-black tracking-tight text-white flex flex-col">
                                <span>{t.brand.title}</span>
                                <span className="text-xs font-normal text-gray-400">{t.brand.representative}</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                            {t.brand.description}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/recfturkiye" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/company/intechne-tech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com/@intechnetech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="YouTube">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500">@recfturkiye · @intechne</p>
                    </div>

                    {/* Column 2 - RECF Programs */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">{t.programs.title}</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/programlar/recf-engage" className="hover:text-primary transition-colors">RECF Engage</Link>
                            </li>
                            <li>
                                <Link href="/programlar/recf-achieve" className="hover:text-primary transition-colors">RECF Achieve</Link>
                            </li>
                            <li>
                                <Link href="/programlar/recf-inspire" className="hover:text-primary transition-colors">RECF Inspire</Link>
                            </li>
                            <li>
                                <Link href="/kaynaklar/mufredat" className="hover:text-primary transition-colors">{t.programs.education}</Link>
                            </li>
                            <li>
                                <Link href="/kaynaklar/yazilim" className="hover:text-primary transition-colors">{t.programs.programming}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Participation */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">{t.participation.title}</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/yarismalar/etkinlik-takvimi" className="hover:text-primary transition-colors">{t.participation.calendar}</Link>
                            </li>
                            <li>
                                <Link href="/yarismalar/sezon-oyunlari" className="hover:text-primary transition-colors">{t.participation.seasonGames}</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/nasil-kurulur" className="hover:text-primary transition-colors">{t.participation.howToStart}</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/kayit" className="hover:text-primary transition-colors">{t.participation.registration}</Link>
                            </li>
                            <li>
                                <Link href="/takimlar/koc-ve-mentor-merkezi" className="hover:text-primary transition-colors">{t.participation.coachCenter}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact & Legal */}
                    <div>
                        <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">{t.contact.title}</h3>
                        <ul className="space-y-3 text-sm mb-6">
                            <li>
                                <Link href="/iletisim/form" className="hover:text-primary transition-colors">{t.contact.form}</Link>
                            </li>
                            <li>
                                <Link href="/kurumsal/hakkimizda" className="hover:text-primary transition-colors">{t.contact.about}</Link>
                            </li>
                            <li>
                                <Link href="/kurumsal/gonulluluk" className="hover:text-primary transition-colors">{t.contact.volunteering}</Link>
                            </li>
                        </ul>
                        <div className="space-y-4 text-sm pt-4 border-t border-gray-800">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-gray-400">{t.contact.address}</span>
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
                    <p className="font-bold text-gray-300 mb-2 font-semibold">{t.notice.title}</p>
                    <p>
                        {t.notice.text}
                    </p>
                </div>

                {/* Legal Links & Copyright */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
                        <p>{t.legal.copyright}</p>
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <Link href="/hukuki/kvkk" className="hover:text-primary transition-colors">{t.legal.kvkk}</Link>
                            <Link href="/hukuki/gizlilik" className="hover:text-primary transition-colors">{t.legal.privacy}</Link>
                            <Link href="/hukuki/kullanim-kosullari" className="hover:text-primary transition-colors">{t.legal.terms}</Link>
                            <Link href="/hukuki/fotograf-video-izin" className="hover:text-primary transition-colors">{t.legal.photoVideo}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
