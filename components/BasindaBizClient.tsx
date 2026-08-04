'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { BasindaBizTvSection } from '@/components/BasindaBizTvSection'
import type, { SanityTvNews } from '@/lib/sanity-queries'
import {
    Newspaper,
    Tv,
    ExternalLink,
    Download,
    FileText,
    Copy,
    Check,
    Palette,
    FileCode2,
    BookOpen
} from 'lucide-react'

// Press clippings (Yazılı Basın Haberleri)
const pressClippings = [
    {
        id: 1,
        outlet: 'Hürriyet',
        title: 'Türk Öğrenciler Dünya Şampiyonasına Gidiyor',
        excerpt: 'VEX Robotics Türkiye Şampiyonasını kazanan 8 takım, Nisan ayında Dallas\'ta düzenlenecek Dünya Şampiyonası\'nda ülkemizi temsil edecek.',
        date: '1 Mart 2026',
        link: 'https://www.hurriyet.com.tr/'
    },
    {
        id: 2,
        outlet: 'Milliyet',
        title: 'Robotik Eğitimde Türkiye Atağı',
        excerpt: 'Türkiye\'deki VEX takımlarının sayısı son 2 yılda 3 katına çıktı. Eğitimciler STEM eğitiminin önemini vurguluyor.',
        date: '28 Şubat 2026',
        link: 'https://www.milliyet.com.tr/'
    },
    {
        id: 3,
        outlet: 'Sabah',
        title: 'Genç Mühendisler Sahneye Çıktı',
        excerpt: 'İstanbul\'da düzenlenen VEX Robotics turnuvasında 142 takım yarıştı. En genç katılımcı 8 yaşında.',
        date: '28 Şubat 2026',
        link: 'https://www.sabah.com.tr/'
    },
    {
        id: 4,
        outlet: 'Sözcü',
        title: 'STEM Eğitiminde Devrim',
        excerpt: 'Robotik yarışmalar öğrencileri nasıl etkiliyor? Uzmanlar anlatıyor.',
        date: '25 Şubat 2026',
        link: 'https://www.sozcu.com.tr/'
    },
    {
        id: 5,
        outlet: 'Cumhuriyet',
        title: 'Mühendislik Hayalleri Gerçek Oldu',
        excerpt: 'VEX yarışmalarında ilk kez yer alan okul, bölgesel şampiyonluğu kazandı.',
        date: '20 Şubat 2026',
        link: 'https://www.cumhuriyet.com.tr/'
    }
]

// Basın Bültenleri Data
const pressReleases = [
    {
        id: 'pr-1',
        title: {
            TR: 'RECF Türkiye 2026-2027 Sezonu Basın Duyurusu',
            EN: 'RECF Turkey 2026-2027 Season Press Announcement'
        },
        excerpt: {
            TR: 'RECF Türkiye, yeni sezonda ilkokuldan üniversiteye kadar binlerce genci robotik ve drone yarışmalarıyla geleceğin teknolojilerine hazırlıyor.',
            EN: 'RECF Turkey prepares thousands of youth from elementary school to university for the technologies of the future through robotics and drone competitions in the new season.'
        },
        date: '15 Eylül 2026',
        pdfUrl: '#'
    },
    {
        id: 'pr-2',
        title: {
            TR: 'Intechne Teknoloji ve RECF Türkiye Güçlerini Birleştiriyor',
            EN: 'Intechne Technology and RECF Turkey Join Forces'
        },
        excerpt: {
            TR: 'Türkiye geneline yayılacak teknoloji eğitimleri ve robotik laboratuvarları için stratejik iş birliği protokolü imzalandı.',
            EN: 'A strategic cooperation protocol was signed for technology training and robotics laboratories to be expanded across Turkey.'
        },
        date: '12 Ağustos 2026',
        pdfUrl: '#'
    },
    {
        id: 'pr-3',
        title: {
            TR: 'Uluslararası Drone Yarışması Türkiye\'de Başlıyor',
            EN: 'International Drone Competition Starts in Turkey'
        },
        excerpt: {
            TR: 'Öğrencilerin otonom sürüş ve havacılık yeteneklerini ölçen Aerial Drone Competition (ADC) ilk kez Türkiye etaplarıyla başlıyor.',
            EN: 'The Aerial Drone Competition (ADC), which evaluates students autonomous flight and aviation skills, begins with its first stages in Turkey.'
        },
        date: '30 Haziran 2026',
        pdfUrl: '#'
    }
]

// Renk Paleti Data
const colorPalette = [
    { name: 'RECF Green', hex: '#00A651', desc: 'Engage & GO programları kurumsal rengi.' },
    { name: 'RECF Orange', hex: '#F7941D', desc: 'Achieve programı ana rengi.' },
    { name: 'RECF Red', hex: '#E31837', desc: 'Inspire programı ana rengi.' },
    { name: 'RECF Blue', hex: '#00AEEF', desc: 'Aerial Drone Competition ana rengi.' },
    { name: 'RECF Purple', hex: '#6B21A8', desc: 'ADC Pro programı kurumsal rengi.' }
]

// Logo Dosyaları Data
const logoFiles = [
    {
        name: 'RECF Türkiye Logo (Vektörel SVG)',
        format: 'SVG',
        fileSize: '3.5 KB',
        fileUrl: '/RECF_LargerFiles.svg',
        preview: '/RECF_LargerFiles.svg'
    },
    {
        name: 'RECF Türkiye Logo (Yüksek Çözünürlük PNG)',
        format: 'PNG',
        fileSize: '44 KB',
        fileUrl: '/recf-turkiye-logo.png',
        preview: '/recf-turkiye-logo.png'
    }
]

interface BasindaBizClientProps {
    tvNews: SanityTvNews[]
}

type TabType = 'news' | 'releases' | 'mediakit'

export default function BasindaBizClient({ tvNews }: BasindaBizClientProps) {
    const { language, setLanguage } = useLanguage()
    const [activeTab, setActiveTab] = useState<TabType>('news')
    const [copiedColor, setCopiedColor] = useState<string | null>(null)

    const handleCopyColor = (hex: string) => {
        navigator.clipboard.writeText(hex)
        setCopiedColor(hex)
        setTimeout(() => setCopiedColor(null), 2000)
    }

    const content = {
        TR: {
            title: "Basın Odası & Basında Biz",
            subtitle: "RECF Türkiye hakkındaki haberler, basın bültenleri, medya kitleri ve başarı hikayelerimiz.",
            tabs: {
                news: "Haberler & TV",
                releases: "Basın Bültenleri",
                mediakit: "Medya Kiti"
            },
            newsSection: {
                tvTitle: "TV Haberleri",
                pressTitle: "Yazılı Basın",
                readNews: "Habere Git / Oku",
                badgeText: "Basın"
            },
            releasesSection: {
                title: "Resmi Basın Bültenleri",
                download: "Bülteni İndir (PDF)",
                readText: "Açıklamayı Oku"
            },
            mediaKitSection: {
                title: "Kurumsal Medya Kiti",
                subtitle: "Logolar, renk kodları ve kurumsal kimlik yönergelerimiz.",
                logosTitle: "RECF Türkiye Logoları",
                logosDesc: "Kurumsal kullanımlar için yüksek çözünürlüklü ve vektörel logo dosyaları.",
                downloadBtn: "Logoyu İndir",
                colorsTitle: "Kurumsal Renk Paleti",
                colorsDesc: "Programlarımıza ait kurumsal renk kodları (Hex). Üzerine tıklayarak kodu kopyalayabilirsiniz.",
                copyText: "Kopyala",
                copiedText: "Kopyalandı!",
                guidelinesTitle: "Kurumsal Kimlik Kılavuzu",
                guidelinesDesc: "RECF Türkiye marka kimliğinin, logo varyasyonlarının ve renklerinin doğru ve tutarlı kullanımı için rehber doküman.",
                downloadGuidelines: "Kılavuzu İndir (PDF)"
            }
        },
        EN: {
            title: "Press Room & Coverage",
            subtitle: "News, press releases, media kits, and success stories about RECF Turkey.",
            tabs: {
                news: "News & TV",
                releases: "Press Releases",
                mediakit: "Media Kit"
            },
            newsSection: {
                tvTitle: "TV News",
                pressTitle: "Written Press",
                readNews: "Go to News / Read",
                badgeText: "Press"
            },
            releasesSection: {
                title: "Official Press Releases",
                download: "Download Release (PDF)",
                readText: "Read Release"
            },
            mediaKitSection: {
                title: "Corporate Media Kit",
                subtitle: "Logos, color codes, and our corporate identity guidelines.",
                logosTitle: "RECF Turkey Logos",
                logosDesc: "High resolution and vector logo files for corporate use.",
                downloadBtn: "Download Logo",
                colorsTitle: "Corporate Color Palette",
                colorsDesc: "Corporate color codes (Hex) of our programs. Click to copy the color code.",
                copyText: "Copy",
                copiedText: "Copied!",
                guidelinesTitle: "Brand Identity Guide",
                guidelinesDesc: "Reference manual for the correct and consistent use of the RECF Turkey brand identity, logo variations, and color schemes.",
                downloadGuidelines: "Download Manual (PDF)"
            }
        }
    }

    const t = content[language]

    return (
        <div className="min-h-screen bg-white text-foreground font-sans">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero
                title={t.title}
                subtitle={t.subtitle}
            />

            {/* Tab Navigation */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-20 z-30 shadow-sm">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-center md:justify-start gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {(['news', 'releases', 'mediakit'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                }`}
                            >
                                {t.tabs[tab]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Area with AnimatePresence */}
            <main className="py-12 md:py-20 min-h-[500px] bg-gray-50/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {/* TAB 1: NEWS & TV */}
                            {activeTab === 'news' && (
                                <div className="space-y-16">
                                    {/* TV News component */}
                                    {tvNews && tvNews.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <Tv className="w-5 h-5 text-primary" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-gray-900">{t.newsSection.tvTitle}</h2>
                                            </div>
                                            <BasindaBizTvSection tvNews={tvNews} />
                                        </div>
                                    )}

                                    {/* Written Press */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <Newspaper className="w-5 h-5 text-primary" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">{t.newsSection.pressTitle}</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {pressClippings.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="group relative bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full shadow-sm"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">
                                                            {item.outlet}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                                                    </div>
                                                    
                                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                    
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                                        {item.excerpt}
                                                    </p>

                                                    <div className="mt-auto">
                                                        <a
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full block"
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                className="w-full border-gray-200 hover:bg-primary hover:text-white hover:border-primary bg-white shadow-sm transition-all duration-300 py-5 rounded-xl font-semibold flex items-center justify-center gap-2 group/btn"
                                                            >
                                                                {t.newsSection.readNews}
                                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-white group-hover:translate-x-0.5 transition-all" />
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: PRESS RELEASES */}
                            {activeTab === 'releases' && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">{t.releasesSection.title}</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {pressReleases.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group bg-white rounded-3xl p-8 border border-gray-200/85 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full shadow-sm"
                                            >
                                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 block">
                                                    {item.date}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                                                    {language === 'TR' ? item.title.TR : item.title.EN}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                                                    {language === 'TR' ? item.excerpt.TR : item.excerpt.EN}
                                                </p>
                                                <div className="mt-auto">
                                                    <a href={item.pdfUrl} className="w-full block">
                                                        <Button
                                                            variant="outline"
                                                            className="w-full border-gray-200 hover:bg-primary hover:text-white hover:border-primary bg-white shadow-sm transition-all duration-300 py-5 rounded-xl font-semibold flex items-center justify-center gap-2 group/btn"
                                                        >
                                                            <Download className="w-4 h-4 text-gray-400 group-hover/btn:text-white" />
                                                            {t.releasesSection.download}
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: MEDIA KIT */}
                            {activeTab === 'mediakit' && (
                                <div className="space-y-16">
                                    {/* Section Intro */}
                                    <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.mediaKitSection.title}</h3>
                                        <p className="text-gray-600">{t.mediaKitSection.subtitle}</p>
                                    </div>

                                    {/* Logos grid */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <FileCode2 className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">{t.mediaKitSection.logosTitle}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-6">{t.mediaKitSection.logosDesc}</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {logoFiles.map((logo, idx) => (
                                                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                                                    <div className="aspect-[4/2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-gray-50 rounded-2xl flex items-center justify-center p-8 border border-gray-100 mb-5 relative overflow-hidden">
                                                        <Image
                                                            src={logo.preview}
                                                            alt={logo.name}
                                                            width={220}
                                                            height={80}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 mb-1 text-base">{logo.name}</h4>
                                                        <div className="flex items-center gap-2 mb-6">
                                                            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-md">{logo.format}</span>
                                                            <span className="text-xs text-gray-500 font-medium">{logo.fileSize}</span>
                                                        </div>
                                                        <a href={logo.fileUrl} download className="w-full block">
                                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 rounded-xl py-5 shadow-sm">
                                                                <Download className="w-4 h-4" />
                                                                {t.mediaKitSection.downloadBtn}
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Colors Section */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <Palette className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">{t.mediaKitSection.colorsTitle}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-8">{t.mediaKitSection.colorsDesc}</p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                            {colorPalette.map((color, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all duration-300"
                                                >
                                                    <div 
                                                        className="w-16 h-16 rounded-2xl shadow-inner mb-4 transition-transform group-hover:scale-105 duration-300"
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{color.name}</h4>
                                                    <code className="text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono mb-2">{color.hex}</code>
                                                    <p className="text-[11px] text-gray-500 mb-4 h-8 flex items-center justify-center leading-normal">{color.desc}</p>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleCopyColor(color.hex)}
                                                        className="w-full text-xs py-1.5 rounded-lg flex items-center justify-center gap-1.5"
                                                    >
                                                        {copiedColor === color.hex ? (
                                                            <>
                                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                                                <span className="text-green-600">{t.mediaKitSection.copiedText}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="w-3 h-3 text-gray-400" />
                                                                <span>{t.mediaKitSection.copyText}</span>
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Identity Guidelines */}
                                    <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <BookOpen className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-1">{t.mediaKitSection.guidelinesTitle}</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{t.mediaKitSection.guidelinesDesc}</p>
                                            </div>
                                        </div>
                                        <a href="/RECF_LargerFiles.svg" download className="w-full md:w-auto">
                                            <Button className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2 rounded-xl py-6 px-6 font-semibold shadow-md">
                                                <Download className="w-4 h-4" />
                                                {t.mediaKitSection.downloadGuidelines}
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}