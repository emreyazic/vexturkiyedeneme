'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Trophy, Star, Medal, Target, ExternalLink, BookOpen, AlertCircle, Info, Lightbulb, HeartHandshake } from 'lucide-react'

const recfAwards = [
    {
        name: 'Excellence Award',
        program: 'Tüm RECF Programları',
        type: 'Jürili Ödül (En Prestijli)',
        criteria: 'Genel etkinlik performansında en üstün takım. Mühendislik defteri, mülakat kalitesi, takım çalışması, robot performansı (Alliance & Solo) ve sportmenlik kriterlerinin tümünde en yüksek standartları sağlayan takıma verilir.',
        qualification: 'Bölgesel şampiyonalarda veya seçili etkinliklerde Ulusal/Uluslararası bir üst kademeye yeterlilik sağlayabilir.',
        icon: <Trophy className="w-8 h-8 text-yellow-600" />,
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
    },
    {
        name: 'Tournament / Teamwork Champion',
        program: 'Engage (Teamwork) / Achieve & Inspire (Tournament)',
        type: 'Performans Ödülü',
        criteria: 'Eleme veya finaller sonucunda etkinlikte en yüksek ittifak maç skorunu elde eden veya finalleri kazanan takımlara verilir.',
        qualification: 'Çoğu onaylı bölgesel etkinlikte bir üst şampiyonaya katılım hakkı tanıyabilir.',
        icon: <Medal className="w-8 h-8 text-blue-600" />,
        bg: 'bg-blue-50',
        border: 'border-blue-200'
    },
    {
        name: 'Design Award',
        program: 'Tüm RECF Programları',
        type: 'Jürili Ödül',
        criteria: 'En etkili ve profesyonel tasarım sürecini yürüten, mühendislik defterinde tasarım kararlarını mükemmel belgeleyen takıma verilir.',
        qualification: 'Büyük çaplı turnuvalarda (Signature Events vb.) yeterlilik şansı sunabilir.',
        icon: <Target className="w-8 h-8 text-green-600" />,
        bg: 'bg-green-50',
        border: 'border-green-200'
    },
    {
        name: 'Robot Skills Champion',
        program: 'Tüm RECF Programları',
        type: 'Performans Ödülü',
        criteria: 'Solo Driving ve Solo Coding beceri maçlarında elde edilen en yüksek "Combined Solo Ranking" (Birleşik Skor) sahibine verilir.',
        qualification: 'Etkinliğe atanan yeterlilik slot sayısına bağlı olarak bir üst seviyeye katılım şansı sunar.',
        icon: <Star className="w-8 h-8 text-purple-600" />,
        bg: 'bg-purple-50',
        border: 'border-purple-200'
    },
    {
        name: 'Innovate Award',
        program: 'Tüm RECF Programları',
        type: 'Jürili Ödül',
        criteria: 'En etkili ve özel tasarım sürecine, eşsiz bir mühendislik çözümüne imza atan takımlara verilir. Yaratıcı mekanizmalar değerlendirilir.',
        qualification: 'Doğrudan bir üst aşama katılım hakkı (yeterlilik) taşımaz.',
        icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
        bg: 'bg-indigo-50',
        border: 'border-indigo-200'
    },
    {
        name: 'Judges Award',
        program: 'Tüm RECF Programları',
        type: 'Jürili Ödül',
        criteria: 'Jürilerin özel takdirini kazanan; azim, dayanışma, ilham veren bir hikâye veya benzersiz çaba sergileyen takımlara verilir.',
        qualification: 'Doğrudan bir üst aşama katılım hakkı (yeterlilik) taşımaz.',
        icon: <HeartHandshake className="w-8 h-8 text-orange-600" />,
        bg: 'bg-orange-50',
        border: 'border-orange-200'
    }
]

export default function OdullerPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Ödülleri"
                subtitle="RECF etkinliklerinde takım ve robot performanslarını tescilleyen resmi ödül kategorileri."
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-8 mb-16 flex flex-col md:flex-row gap-6 items-center md:items-start shadow-sm">
                        <AlertCircle className="w-12 h-12 text-red-600 shrink-0 md:mt-2" />
                        <div>
                            <h3 className="text-2xl font-bold text-red-900 mb-3">Önemli Bilgilendirme: Yeterlilik (Qualification) Kuralları</h3>
                            <p className="text-red-800 text-lg leading-relaxed mb-6">
                                Ödüllerin yeterlilik etkisi, RECF’nin güncel yeterlilik kriterlerine ve etkinliğe ayrılan kontenjana (slot sayısına) göre belirlenir. Hiçbir ödül otomatik olarak (örn: doğrudan RECF STEM World Championship'e) üst tura katılım garantisi sunmaz. Etkinlik kapasitesi ve kalifikasyon akışı (Qualification Flowchart) etkinlik detay sayfasında açıklanır.
                            </p>
                            <a href="https://recf.org/documents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-red-700 font-bold hover:text-red-900 transition-colors bg-red-100/50 px-4 py-2 rounded-xl">
                                RECF Yeterlilik Dokümanlarını İncele
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Resmi Ödül Kategorileri</h2>
                            <p className="text-gray-600">Her program ve etkinlik türü tüm ödül kategorilerini içermeyebilir.</p>
                        </div>
                        <a href="https://recf.org/documents" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-gray-300 text-gray-700 font-bold hover:bg-gray-50 shadow-sm transition-all text-base">
                                <BookOpen className="w-5 h-5 mr-3 text-primary" />
                                Resmi Jüri Kılavuzu (Judges Guide)
                            </Button>
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {recfAwards.map((award, index) => (
                            <div key={index} className={`rounded-3xl border p-8 flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform duration-300 ${award.bg} ${award.border}`}>
                                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                    {award.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{award.name}</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                                        {award.program}
                                    </span>
                                    <span className="bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                                        {award.type}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-8 flex-grow leading-relaxed">
                                    {award.criteria}
                                </p>
                                <div className="bg-white/60 p-5 rounded-2xl flex items-start gap-4 mt-auto">
                                    <Info className="w-6 h-6 text-gray-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <span className="font-bold text-gray-900 block mb-1">Yeterlilik Durumu:</span>
                                        {award.qualification}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    )
}
