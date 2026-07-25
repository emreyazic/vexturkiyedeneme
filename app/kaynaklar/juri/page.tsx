'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Award, BookOpen, Users, ShieldCheck, HeartHandshake,
    ExternalLink, CheckCircle2, AlertCircle, FileText,
    Sparkles, HelpCircle, MessageSquare, Lightbulb, Scale
} from 'lucide-react'

// Engineering Notebook Rubric Criteria
const notebookRubric = [
    {
        title: 'Tasarım Süreci Dokümantasyonu (EDP)',
        desc: 'Problemin tanımlanması, saha analizi, beyin fırtınası, prototipleme ve test adımlarının eksiksiz kaydı.',
        score: 'Rubric: 5 Puan'
    },
    {
        title: 'Kronolojik ve Tarihli Kayıtlar',
        desc: 'Her toplantının tarihi, katılan üyeler, alınan kararlar ve harcanan süre bilgilerinin düzenli işlenmesi.',
        score: 'Rubric: 5 Puan'
    },
    {
        title: 'Mekanik & Yazılım Şemaları',
        desc: 'El çizimleri, CAD çıktıları, kod blokları/akış şemaları ve matematiksel hesaplama detayları.',
        score: 'Rubric: 5 Puan'
    },
    {
        title: 'Test Verileri & Geliştirme Yinelemeleri (Iteration)',
        desc: 'Başarısız denemelerden çıkarılan dersler, veri grafiklerindeki iyileştirmeler ve tasarım revizyonları.',
        score: 'Rubric: 5 Puan'
    }
]

// Team Interview Expectations
const interviewExpectations = [
    {
        title: 'Öğrenci Liderliğinde Sunum',
        desc: 'Mülakatın ilk 3-5 dakikasında takımların robotlarını, tasarım süreçlerini ve sezondaki yolculuklarını kendi cümleleriyle aktarmaları beklenir.'
    },
    {
        title: 'Tüm Üyelerin Dengeli Katılımı',
        desc: 'Jüriler sadece takım kaptanını değil; mekanik, yazılım, sürücü ve defter sorumlusu tüm öğrencilerin sürece katılımını gözlemler.'
    },
    {
        title: 'Teknik Bilgi ve Özgüven',
        desc: 'Robot üzerindeki mekanizmaların neden seçildiği ve yazılımdaki algoritmaların mantığı sorulara verilen açık yanıtlarla değerlendirilir.'
    },
    {
        title: 'Sportmenlik ve İletişim',
        desc: 'Diğer takımlarla yardımlaşma, sahada sergilenen nezaket (Code of Conduct) ve dürüstlük mülakat puanını doğrudan etkiler.'
    }
]

// Sample Interview Questions for Simulation
const sampleQuestions = [
    {
        category: 'Tasarım & Mekanik',
        q: 'Robotunuzun mevcut şasi ve mekanizma tasarımına nasıl karar verdiniz? Denediğiniz alternatif tasarımlar nelerdi?'
    },
    {
        category: 'Yazılım & Otonom',
        q: 'Solo Coding (Otonom) maçlarında hangi sensörleri kullandınız ve kodlamadaki en büyük zorluğu nasıl aştınız?'
    },
    {
        category: 'Takım Çalışması & İletişim',
        q: 'Sezon boyunca takım içinde fikir ayrılığı yaşadığınızda bu durumu nasıl çözüme kavuşturdunuz?'
    },
    {
        category: 'Öğrenci Merkezli Süreç',
        q: 'Bu robotta tamamen öğrencilere ait olan en gurur duyduğunuz yenilikçi fikir veya parça hangisidir?'
    }
]

export default function JuriPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Jüri ve Değerlendirme Süreci"
                subtitle="RECF jüri süreci, mühendislik defteri kriterleri, mülakat standartları ve etik ilkeler"
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Student-Centered Policy Highlight Banner */}
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-8 mb-16 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0 border border-red-200">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-red-900 mb-3">Öğrenci Merkezli Politika (Student-Centered Policy)</h3>
                            <p className="text-red-800 text-base leading-relaxed mb-4">
                                RECF etkinliklerinde değerlendirmenin en temel kuralı öğrenci merkezliliktir. Robotun tasarımı, inşası, kodlanması, sürücülüğü ve mülakat sunumları tamamen öğrenciler tarafından gerçekleştirilmelidir. Mentorlar ve öğretmenler doğrudan müdahalede bulunmaz; yol gösterici ve emniyet sağlayıcı rol üstlenirler.
                            </p>
                            <a href="https://recf.org/documents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-red-700 font-bold hover:text-red-900 text-sm">
                                Resmi Student-Centered Politika Dokümanı
                                <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Section 1: Engineering Notebook Rubric */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-7 h-7 text-primary" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Mühendislik Defteri Değerlendirme Kriterleri</h2>
                                <p className="text-gray-500 text-sm">Excellence ve Design Ödülleri için temel değerlendirme standartları</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {notebookRubric.map((item, idx) => (
                                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-3xl p-6 hover:shadow-sm transition-shadow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                                {item.score}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Team Interview Expectations */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-7 h-7 text-indigo-600" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Takım Mülakatı Süreci ve Beklentiler</h2>
                                <p className="text-gray-500 text-sm">Jüri odasında veya pit alanında gerçekleşen mülakatların yapısı</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {interviewExpectations.map((exp, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:border-indigo-300 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{exp.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Interactive Interview Prep / Question Simulator */}
                    <div className="bg-slate-900 text-white rounded-3xl p-10 mb-20 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-amber-400" />
                            <h2 className="text-2xl font-bold text-white">Takımlar için Mülakat Örnek Soru Simülatörü</h2>
                        </div>
                        <p className="text-slate-300 text-sm mb-8 max-w-2xl">
                            Mülakata hazırlanırken takımınızla birlikte aşağıdaki tipik jüri sorularını yanıtlayarak pratik yapabilirsiniz.
                        </p>

                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
                            <span className="inline-block bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs mb-3">
                                Kategori: {sampleQuestions[activeQuestionIdx].category}
                            </span>
                            <h4 className="text-xl font-bold text-white mb-4">
                                "{sampleQuestions[activeQuestionIdx].q}"
                            </h4>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                {sampleQuestions.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveQuestionIdx(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeQuestionIdx === i ? 'bg-amber-400 w-8' : 'bg-slate-700'}`}
                                        aria-label={`Soru ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <Button 
                                onClick={() => setActiveQuestionIdx((prev) => (prev + 1) % sampleQuestions.length)} 
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl h-11 px-6"
                            >
                                Sonraki Soruyu Getir
                            </Button>
                        </div>
                    </div>

                    {/* Section 4: Ethics & Conflict of Interest & Certification */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        
                        {/* Ethics & Conflict of Interest */}
                        <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Scale className="w-7 h-7 text-blue-700" />
                                    <h3 className="text-2xl font-bold text-gray-900">Jüri Etik Kuralları ve Çıkar Çatışması</h3>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    RECF jürileri tamamen tarafsızlık ve gizlilik ilkesiyle hareket eder. Jüri üyeleri, kendi okullarından veya yakın akrabalık bağı bulunan takımların mülakatlarında ve puanlamalarında çekimser kalır (Conflict of Interest Disclosure).
                                </p>
                                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                        Gizlilik ilkesi (Mülakat detayları dışarıya aktarılamaz)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                        Tüm takımlara eşit zaman ve önyargısız yaklaşım
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Certification & Official Guides Link */}
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="w-7 h-7 text-emerald-700" />
                                    <h3 className="text-2xl font-bold text-gray-900">Jüri Eğitimi ve Sertifikasyon</h3>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                    Etkinliklerde jüri veya Judge Advisor olarak görev alacak tüm gönüllüler, RECF'nin çevrim içi Jüri Eğitimi ve Sertifikasyon portalını tamamlayarak resmi sertifika alırlar.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://certifications.vex.com" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6 rounded-xl text-sm">
                                        Jüri Sertifikasyon Portalı
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                                <a href="https://recf.org/documents" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="w-full sm:w-auto border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold h-12 px-6 rounded-xl text-sm">
                                        Official Judges Guide (PDF)
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
