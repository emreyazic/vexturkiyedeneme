'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Code2, Cpu, GitBranch, LineChart, Box, Terminal,
    ExternalLink, Layers, CheckCircle2, Monitor, Shield,
    Compass, Laptop, FileCode, Wrench, Info
} from 'lucide-react'

// Programs & Software Mapping Data
const programSoftware = [
    {
        id: 'engage',
        program: 'RECF Engage',
        subtitle: 'İlkokul ve Ortaokul Düzeyi',
        options: [
            {
                name: 'Blok Tabanlı Kodlama (Blocks)',
                desc: 'Sürükle-bırak mantığı ile sıfır yazım hatası odaklı mantıksal algoritma geliştirme.',
                type: 'Resmi & Başlangıç'
            },
            {
                name: 'Python (Giriş Seviyesi)',
                desc: 'Metin tabanlı kodlamaya geçiş yapmak isteyen takımlar için basitleştirilmiş Python syntax yapısı.',
                type: 'Orta Seviye'
            }
        ]
    },
    {
        id: 'achieve',
        program: 'RECF Achieve',
        subtitle: 'Ortaokul ve Lise Düzeyi',
        options: [
            {
                name: 'VEXcode (Python / C++)',
                desc: 'Resmi API entegrasyonuna sahip, blok ve metin tabanlı geliştirme ortamı.',
                type: 'Resmi Ortam'
            },
            {
                name: 'PROS (Açık Kaynak C/C++ OS)',
                desc: 'GCC araç zinciri ve FreeRTOS tabanlı, bağımsız ve yüksek hızlı açık kaynak işletim sistemi.',
                type: 'Açık Kaynak / İleri Seviye'
            },
            {
                name: 'VS Code Eklentileri',
                desc: 'Profesyonel IDE deneyimi sunan VEX ve PROS geliştirme eklentileri.',
                type: 'Geliştirici Araçları'
            }
        ]
    },
    {
        id: 'inspire',
        program: 'RECF Inspire',
        subtitle: 'Üniversite ve Yükseköğretim Düzeyi',
        options: [
            {
                name: 'PROS & C++ Özel Kütüphaneler',
                desc: 'İki robotlu kompleks sistemler için çoklu izlek (multi-threading) ve özel sürücü mimarileri.',
                type: 'İleri Mühendislik'
            },
            {
                name: 'ROS / ROS2 (Robot Operating System)',
                desc: 'Üniversite seviyesi otonom navigasyon, haritalama (SLAM) ve sensör füzyonu mimarileri.',
                type: 'Gelişmiş Otonom'
            }
        ]
    },
    {
        id: 'adc',
        program: 'Aerial Drone Competition (ADC / ADC Pro)',
        subtitle: 'Hava Robotiği & Dron Sistemleri',
        options: [
            {
                name: 'DroneBlocks & Görsel Kodlama',
                desc: 'Dron uçuş rotalarını görsel bloklarla kodlama ve 3D uzamsal simülasyon ortamı.',
                type: 'Uçuş Kodlama'
            },
            {
                name: 'Python SDK & Otonom Uçuş',
                desc: 'Görsel matrisler, optik akış sensörleri ve Python Tello/PX4 komut modülleri.',
                type: 'Otonom Navigasyon'
            }
        ]
    }
]

// CAD & Simulation Tools
const cadSimTools = [
    {
        name: 'Autodesk Fusion 360',
        category: '3D CAD & Montaj',
        desc: 'Takımlar için ücretsiz öğrenci lisansı sunan, doğrudan montaj ve statik stres analizi yapabilen profesyonel CAD yazılımı.',
        url: 'https://www.autodesk.com'
    },
    {
        name: 'Onshape',
        category: 'Bulut Tabanlı CAD',
        desc: 'Tarayıcı üzerinden çalışan, takımların eş zamanlı (collaborative) robot montajı yapmasını sağlayan bulut CAD platformu.',
        url: 'https://www.onshape.com'
    },
    {
        name: 'Tinkercad',
        category: 'Başlangıç Seviyesi 3D',
        desc: 'Yeni başlayan takımlar ve küçük yaş grupları için temel 3D modelleme ve 3D baskı hazırlık aracı.',
        url: 'https://www.tinkercad.com'
    },
    {
        name: 'VEXcode VR & Gazebo Simülatörleri',
        category: 'Robotik Simülasyon',
        desc: 'Fiziksel saha olmadan otonom kod ve algoritma testleri gerçekleştirmeye olanak tanıyan dijital simülasyon ortamları.',
        url: 'https://vr.vex.com'
    }
]

export default function YazilimPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Programlama ve Yazılım Kaynakları"
                subtitle="Seçtiğiniz RECF programına ve kullandığınız donanıma uygun programlama araçlarını keşfedin"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Neutral Statement Banner */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 mb-16 shadow-lg flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-400/30">
                            <Code2 className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white">Çeşitlilik ve Esnek Yazılım Ekosistemi</h3>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                RECF programlarında kodlama, tek bir zorunlu platforma bağımlı değildir. Takımlar yaş grubu, deneyim seviyesi ve hedeflerine göre resmi veya üçüncü taraf (3rd-party) desteklenen dilleri (Blok, Python, C++, ROS) ve IDE ortamlarını serbestçe tercih edebilirler.
                            </p>
                        </div>
                    </div>

                    {/* Section 1: Software Options by Program */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Layers className="w-7 h-7 text-primary" />
                            <h2 className="text-3xl font-bold text-gray-900">RECF Programlarına Göre Yazılım Seçenekleri</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {programSoftware.map((prog) => (
                                <div key={prog.id} className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{prog.program}</h3>
                                                <p className="text-sm font-medium text-gray-500">{prog.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            {prog.options.map((opt, i) => (
                                                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-bold text-gray-900 text-base">{opt.name}</h4>
                                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                                            {opt.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{opt.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: CAD & Simulation */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Box className="w-7 h-7 text-emerald-600" />
                            <h2 className="text-3xl font-bold text-gray-900">Simülasyon ve CAD (Tasarım) Araçları</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cadSimTools.map((tool, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-sm">
                                    <div>
                                        <span className="inline-block bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-xl text-xs mb-4">
                                            {tool.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{tool.desc}</p>
                                    </div>
                                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-emerald-700 font-bold text-sm hover:underline mt-auto">
                                        Resmi Sayfayı İncele
                                        <ExternalLink className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Git & Telemetry & 3rd Party */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        
                        {/* Git & Version Control */}
                        <div className="bg-orange-50/70 border border-orange-200 rounded-3xl p-8 flex flex-col">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                                <GitBranch className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Git & Sürüm Yönetimi</h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                                Takım içi kod çakışmalarını önlemek, otonom yazılım versiyonlarını güvenle saklamak ve GitHub / GitLab üzerinde Mühendislik Defteri entegrasyonu sağlamak için Git araçları önerilir.
                            </p>
                            <div className="bg-white/80 p-4 rounded-xl text-xs font-semibold text-gray-700">
                                Takımlar için önerilen: GitHub Classroom & Git LFS
                            </div>
                        </div>

                        {/* Telemetry & Data Logging */}
                        <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-8 flex flex-col">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <LineChart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Telemetri ve Veri Analizi</h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                                Maç esnasında motor sıcaklıkları, batarya voltajı ve sensör verilerini canlı grafiklemek veya SD karta veri kaydetmek (Data Logging) için telemetri kütüphaneleri kullanılır.
                            </p>
                            <div className="bg-white/80 p-4 rounded-xl text-xs font-semibold text-gray-700">
                                Takımlar için önerilen: Live PID Plotter & SD Logging
                            </div>
                        </div>

                        {/* 3rd Party Software Support */}
                        <div className="bg-purple-50/70 border border-purple-200 rounded-3xl p-8 flex flex-col">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Üçüncü Taraf Araçlar</h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                                Bağımsız geliştiriciler ve topluluk tarafından geliştirilen açık kaynaklı yazılımlar (PROS CLI, LemLib, OkapiLib vb.) RECF kuralları dahilinde serbestçe kullanılabilir.
                            </p>
                            <div className="bg-white/80 p-4 rounded-xl text-xs font-semibold text-gray-700">
                                Standart: Açık kaynaklı ve belgelenmiş kütüphaneler
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
