'use client'

import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    BookOpen, Cpu, Code2, Compass, Navigation, GraduationCap,
    ExternalLink, CheckCircle2, ChevronRight, Award, Shield,
    FileText, Lightbulb, Users, ArrowRight
} from 'lucide-react'

// Resource Categories Data
const resourceCategories = [
    {
        id: 'robotics',
        title: 'Robotik Temelleri',
        subtitle: 'Mekanik, dişliler, şasi tasarımları ve donanım seçim ilkeleri',
        icon: <Cpu className="w-8 h-8 text-blue-600" />,
        color: 'bg-blue-50 border-blue-200 text-blue-900',
        items: [
            {
                title: 'Basit Makineler & Dişli Oranları',
                desc: 'Tork ve hız dengesi, dişli aktarım sistemleri ve tork hesaplama temelleri.',
                tag: 'Mekanik'
            },
            {
                title: 'Şasi ve Sürüş Sistemleri (Drivetrain)',
                desc: 'Tank sürüşü, omni tekerlek konfigürasyonları ve holonomik hareket mekanizmaları.',
                tag: 'Tasarım'
            },
            {
                title: 'Kaldıraç ve Asansör Mekanizmaları',
                desc: '4-bar, 6-bar ve kaskad doğrusal asansör sistemlerinin geometrik analizleri.',
                tag: 'İleri Seviye'
            }
        ]
    },
    {
        id: 'programming',
        title: 'Programlama Kaynakları',
        subtitle: 'Blok tabanlı kodlamadan Python, C++ ve otonom algoritmalara geçiş',
        icon: <Code2 className="w-8 h-8 text-indigo-600" />,
        color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
        items: [
            {
                title: 'Blok Tabanlı Algoritma Mantığı',
                desc: 'Döngüler, karar mekanizmaları ve sensör girdileriyle kontrol mantığı.',
                tag: 'Başlangıç'
            },
            {
                title: 'Python ve C++ ile Robot Kontrolü',
                desc: 'Nesne yönelimli kodlama, kütüphane kullanımı ve gerçek zamanlı veri işleme.',
                tag: 'Metin Tabanlı'
            },
            {
                title: 'PID ve Otonom Kontrol Algoritmaları',
                desc: 'Hassas konumlandırma, çizgi takip ve jiroskop destekli otonom rotalar.',
                tag: 'Otonom Sistemler'
            }
        ]
    },
    {
        id: 'design-process',
        title: 'Mühendislik Tasarım Süreci & Defter Rehberi',
        subtitle: 'Problem tanımlamadan prototiplemeye, Mühendislik Defteri standartları',
        icon: <Compass className="w-8 h-8 text-emerald-600" />,
        color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        items: [
            {
                title: 'Mühendislik Tasarım Döngüsü (EDP)',
                desc: 'Problem analizi, araştırma, beyin fırtınası, prototip ve test aşamaları.',
                tag: 'Metodoloji'
            },
            {
                title: 'Resmi Mühendislik Defteri Rehberi',
                desc: 'Jüri değerlendirme kriterlerine (Rubric) uygun kronolojik belgeleme ve tarihli kayıtlar.',
                tag: 'Belgeleme'
            },
            {
                title: 'CAD ve 3D Modelleme Giriş',
                desc: 'Özel parça tasarımı, simülasyon ve 3D baskı imalat standartları.',
                tag: 'Dijital Tasarım'
            }
        ]
    },
    {
        id: 'drones',
        title: 'Drone Pilotluğu ve Otonom Sistemler',
        subtitle: 'Hava robotiği, emniyet protokolleri, manuel uçuş ve otonom görevler',
        icon: <Navigation className="w-8 h-8 text-amber-600" />,
        color: 'bg-amber-50 border-amber-200 text-amber-900',
        items: [
            {
                title: 'Uçuş Güvenliği & Muayene Protokolleri',
                desc: 'Pervane emniyeti, batarya yönetimi ve saha güvenlik standartları.',
                tag: 'Güvenlik'
            },
            {
                title: 'Hassas Pilotaj ve Engel Parkurları',
                desc: 'Manuel uçuş teknikleri, 3D uzamsal algılama ve parkur tamamlama stratejileri.',
                tag: 'Pilotluk'
            },
            {
                title: 'Otonom Görsel Kodlama ve Uçuş',
                desc: 'Optik akış sensörleri, görsel matrisler ve otonom rota planlaması.',
                tag: 'Otonom Uçuş'
            }
        ]
    },
    {
        id: 'coaching',
        title: 'Koç Eğitimleri ve Takım Yönetimi',
        subtitle: 'Öğrenci merkezli yaklaşım, mentorluk ilkeleri ve kulüp yönetimi',
        icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
        color: 'bg-purple-50 border-purple-200 text-purple-900',
        items: [
            {
                title: 'Student-Centered (Öğrenci Merkezli) Politika',
                desc: 'Öğrencilerin tasarladığı, kodladığı ve sürdürdüğü etik takım yapısı rehberi.',
                tag: 'Etik & Politika'
            },
            {
                title: 'RECF Coach Academy Sertifikasyon',
                desc: 'Sezon hazırlığı, turnuva prosedürleri ve resmi koç eğitim modülleri.',
                tag: 'Sertifika'
            },
            {
                title: 'Takım Bütçesi ve Kulüp Organizasyonu',
                desc: 'Sponsorluk dosyası hazırlığı, görev dağılımı ve sezonsal takvim planlaması.',
                tag: 'Yönetim'
            }
        ]
    }
]

export default function MufredatPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Eğitim ve Öğrenme Kaynakları"
                subtitle="Robotik, programlama, mühendislik tasarımı, drone ve koç eğitimleri için kaynaklar"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Intro Note */}
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-16 flex flex-col md:flex-row gap-6 items-start shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Esnek ve Kapsayıcı Öğrenme Yaklaşımı</h3>
                            <p className="text-gray-600 leading-relaxed">
                                RECF Türkiye ekosisteminde eğitim kaynakları tek bir markaya veya hazır ders paketine bağımlı değildir. Okullar, öğretmenler ve koçlar kendi müfredat disiplinlerine uygun açık kaynaklı materyalleri, modüler ders içeriklerini ve uygulama rehberlerini serbestçe entegre edebilirler.
                            </p>
                        </div>
                    </div>

                    {/* Main Categories Grid */}
                    <div className="space-y-12 mb-20">
                        {resourceCategories.map((cat) => (
                            <div key={cat.id} className="rounded-3xl border border-gray-200 p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl border ${cat.color}`}>
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{cat.title}</h3>
                                            <p className="text-gray-500 text-sm md:text-base">{cat.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {cat.items.map((item, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:bg-gray-100/70 transition-colors">
                                            <div>
                                                <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600 mb-3 border border-gray-200">
                                                    {item.tag}
                                                </span>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Intechne Akademi Section */}
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl mb-16">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-4 py-1.5 rounded-full text-indigo-300 text-sm font-semibold mb-6">
                                    <GraduationCap className="w-4 h-4" />
                                    Intechne Akademi Öğretmen ve Koç Programları
                                </div>
                                <h3 className="text-3xl font-extrabold mb-4 text-white">Intechne Akademi Eğitim Kaynakları</h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    RECF Türkiye temsilcisi Intechne Teknoloji bünyesinde düzenlenen Intechne Akademi; öğretmen eğitimi atölyeleri, koçluk uzmanlık modülleri ve okullara özel STEM laboratuvarı kurulum rehberleri sunar.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 mb-2" />
                                        <h5 className="font-bold text-sm">Yüz Yüze Atölyeler</h5>
                                        <p className="text-xs text-slate-300 mt-1">Uygulamalı robotik ve otonom kodlama eğitimleri.</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                        <Shield className="w-5 h-5 text-indigo-400 mb-2" />
                                        <h5 className="font-bold text-sm">Akademi Sertifikası</h5>
                                        <p className="text-xs text-slate-300 mt-1">Katılım sağlayan eğitmenlere onaylı sertifika.</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                        <Lightbulb className="w-5 h-5 text-indigo-400 mb-2" />
                                        <h5 className="font-bold text-sm">Okul & Kulüp Desteği</h5>
                                        <p className="text-xs text-slate-300 mt-1">Robotik kulübü kurulum ve müfredat desteği.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 flex flex-col gap-4 w-full sm:w-auto">
                                <a href="https://www.intechne.com.tr" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-14 px-8 rounded-2xl shadow-lg shadow-indigo-600/30 text-base">
                                        Intechne Akademi Portalı
                                        <ExternalLink className="w-5 h-5 ml-2" />
                                    </Button>
                                </a>
                                <Link href="/takimlar/koc-ve-mentor-merkezi">
                                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 font-bold h-14 px-8 rounded-2xl text-base">
                                        Koç ve Mentor Merkezine Git
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}