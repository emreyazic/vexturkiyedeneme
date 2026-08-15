'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Trophy,
    Star,
    Medal,
    Target,
    ExternalLink,
    BookOpen,
    AlertCircle,
    Info,
    Lightbulb,
    HeartHandshake
} from 'lucide-react'

const recfAwards = [
    {
        name: {
            TR: 'Excellence Award',
            EN: 'Excellence Award'
        },
        program: {
            TR: 'Tüm RECF Programları',
            EN: 'All RECF Programs'
        },
        type: {
            TR: 'Jürili Ödül (En Prestijli)',
            EN: 'Judged Award (Most Prestigious)'
        },
        criteria: {
            TR: 'Genel etkinlik performansında en üstün takım. Mühendislik defteri, mülakat kalitesi, takım çalışması, robot performansı (Alliance & Solo) ve sportmenlik kriterlerinin tümünde en yüksek standartları sağlayan takıma verilir.',
            EN: 'Awarded to the team demonstrating the highest overall event performance. The team must meet the highest standards in engineering documentation, interview quality, teamwork, robot performance (Alliance & Solo), and sportsmanship.'
        },
        qualification: {
            TR: 'Bölgesel şampiyonalarda veya seçili etkinliklerde Ulusal/Uluslararası bir üst kademeye yeterlilik sağlayabilir.',
            EN: 'May provide qualification to the next national or international level at regional championships or selected events.'
        },
        icon: <Trophy className="w-8 h-8 text-yellow-600" />,
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
    },
    {
        name: {
            TR: 'Tournament / Teamwork Champion',
            EN: 'Tournament / Teamwork Champion'
        },
        program: {
            TR: 'Engage (Teamwork) / Achieve & Inspire (Tournament)',
            EN: 'Engage (Teamwork) / Achieve & Inspire (Tournament)'
        },
        type: {
            TR: 'Performans Ödülü',
            EN: 'Performance Award'
        },
        criteria: {
            TR: 'Eleme veya finaller sonucunda etkinlikte en yüksek ittifak maç skorunu elde eden veya finalleri kazanan takımlara verilir.',
            EN: 'Awarded to teams that achieve the highest alliance match score or win the final rounds of an event.'
        },
        qualification: {
            TR: 'Çoğu onaylı bölgesel etkinlikte bir üst şampiyonaya katılım hakkı tanıyabilir.',
            EN: 'May provide qualification to the next championship level at most approved regional events.'
        },
        icon: <Medal className="w-8 h-8 text-blue-600" />,
        bg: 'bg-blue-50',
        border: 'border-blue-200'
    },
    {
        name: {
            TR: 'Design Award',
            EN: 'Design Award'
        },
        program: {
            TR: 'Tüm RECF Programları',
            EN: 'All RECF Programs'
        },
        type: {
            TR: 'Jürili Ödül',
            EN: 'Judged Award'
        },
        criteria: {
            TR: 'En etkili ve profesyonel tasarım sürecini yürüten, mühendislik defterinde tasarım kararlarını mükemmel belgeleyen takıma verilir.',
            EN: 'Awarded to the team that demonstrates the most effective and professional design process and excellently documents its design decisions in the Engineering Notebook.'
        },
        qualification: {
            TR: 'Büyük çaplı turnuvalarda (Signature Events vb.) yeterlilik şansı sunabilir.',
            EN: 'May provide a qualification opportunity at major tournaments such as Signature Events.'
        },
        icon: <Target className="w-8 h-8 text-green-600" />,
        bg: 'bg-green-50',
        border: 'border-green-200'
    },
    {
        name: {
            TR: 'Robot Skills Champion',
            EN: 'Robot Skills Champion'
        },
        program: {
            TR: 'Tüm RECF Programları',
            EN: 'All RECF Programs'
        },
        type: {
            TR: 'Performans Ödülü',
            EN: 'Performance Award'
        },
        criteria: {
            TR: 'Solo Driving ve Solo Coding beceri maçlarında elde edilen en yüksek "Combined Solo Ranking" (Birleşik Skor) sahibine verilir.',
            EN: 'Awarded to the team with the highest "Combined Solo Ranking" score achieved through Solo Driving and Solo Coding skills matches.'
        },
        qualification: {
            TR: 'Etkinliğe atanan yeterlilik slot sayısına bağlı olarak bir üst seviyeye katılım şansı sunar.',
            EN: 'May provide an opportunity to qualify for the next level depending on the number of qualification slots assigned to the event.'
        },
        icon: <Star className="w-8 h-8 text-purple-600" />,
        bg: 'bg-purple-50',
        border: 'border-purple-200'
    },
    {
        name: {
            TR: 'Innovate Award',
            EN: 'Innovate Award'
        },
        program: {
            TR: 'Tüm RECF Programları',
            EN: 'All RECF Programs'
        },
        type: {
            TR: 'Jürili Ödül',
            EN: 'Judged Award'
        },
        criteria: {
            TR: 'En etkili ve özel tasarım sürecine, eşsiz bir mühendislik çözümüne imza atan takımlara verilir. Yaratıcı mekanizmalar değerlendirilir.',
            EN: 'Awarded to teams that demonstrate an effective and distinctive design process and develop a unique engineering solution. Creative mechanisms are evaluated.'
        },
        qualification: {
            TR: 'Doğrudan bir üst aşama katılım hakkı (yeterlilik) taşımaz.',
            EN: 'Does not directly provide qualification to the next level.'
        },
        icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
        bg: 'bg-indigo-50',
        border: 'border-indigo-200'
    },
    {
        name: {
            TR: 'Judges Award',
            EN: 'Judges Award'
        },
        program: {
            TR: 'Tüm RECF Programları',
            EN: 'All RECF Programs'
        },
        type: {
            TR: 'Jürili Ödül',
            EN: 'Judged Award'
        },
        criteria: {
            TR: 'Jürilerin özel takdirini kazanan; azim, dayanışma, ilham veren bir hikâye veya benzersiz çaba sergileyen takımlara verilir.',
            EN: 'Awarded to teams that earn special recognition from the judges by demonstrating perseverance, teamwork, an inspiring story, or exceptional effort.'
        },
        qualification: {
            TR: 'Doğrudan bir üst aşama katılım hakkı (yeterlilik) taşımaz.',
            EN: 'Does not directly provide qualification to the next level.'
        },
        icon: <HeartHandshake className="w-8 h-8 text-orange-600" />,
        bg: 'bg-orange-50',
        border: 'border-orange-200'
    }
]

const content = {
    TR: {
        hero: {
            title: 'RECF Ödülleri',
            subtitle:
                'RECF etkinliklerinde takım ve robot performanslarını tescilleyen resmi ödül kategorileri.'
        },

        warning: {
            title: 'Önemli Bilgilendirme: Yeterlilik (Qualification) Kuralları',
            description:
                "Ödüllerin yeterlilik etkisi, RECF’nin güncel yeterlilik kriterlerine ve etkinliğe ayrılan kontenjana (slot sayısına) göre belirlenir. Hiçbir ödül otomatik olarak (örn: doğrudan RECF STEM World Championship'e) üst tura katılım garantisi sunmaz. Etkinlik kapasitesi ve kalifikasyon akışı (Qualification Flowchart) etkinlik detay sayfasında açıklanır.",
            link: 'RECF Yeterlilik Dokümanlarını İncele'
        },

        awards: {
            title: 'Resmi Ödül Kategorileri',
            description:
                'Her program ve etkinlik türü tüm ödül kategorilerini içermeyebilir.',
            guide: 'Resmi Jüri Kılavuzu (Judges Guide)',
            qualification: 'Yeterlilik Durumu:'
        }
    },

    EN: {
        hero: {
            title: 'RECF Awards',
            subtitle:
                'Official award categories recognizing team and robot performance at RECF events.'
        },

        warning: {
            title: 'Important Information: Qualification Rules',
            description:
                "The qualification impact of awards is determined according to RECF's current qualification criteria and the number of qualification slots allocated to the event. No award automatically guarantees advancement to the next level (for example, direct qualification to the RECF STEM World Championship). Event capacity and the qualification flow (Qualification Flowchart) are explained on the event detail page.",
            link: 'View RECF Qualification Documents'
        },

        awards: {
            title: 'Official Award Categories',
            description:
                'Not every program or event type may include all award categories.',
            guide: 'Official Judges Guide',
            qualification: 'Qualification Status:'
        }
    }
} as const

export default function OdullerPage() {
    const { language, setLanguage } = useLanguage()

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">

            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l =>
                        l === 'TR' ? 'EN' : 'TR'
                    )
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-16 bg-white min-h-[50vh]">

                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Qualification Warning */}
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-8 mb-16 flex flex-col md:flex-row gap-6 items-center md:items-start shadow-sm">

                        <AlertCircle className="w-12 h-12 text-red-600 shrink-0 md:mt-2" />

                        <div>

                            <h3 className="text-2xl font-bold text-red-900 mb-3">
                                {t.warning.title}
                            </h3>

                            <p className="text-red-800 text-lg leading-relaxed mb-6">
                                {t.warning.description}
                            </p>

                            <a
                                href="https://recf.org/documents"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-red-700 font-bold hover:text-red-900 transition-colors bg-red-100/50 px-4 py-2 rounded-xl"
                            >
                                {t.warning.link}

                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>

                        </div>

                    </div>

                    {/* Awards Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">

                        <div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {t.awards.title}
                            </h2>

                            <p className="text-gray-600">
                                {t.awards.description}
                            </p>

                        </div>

                        <a
                            href="https://recf.org/documents"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-gray-300 text-gray-700 font-bold hover:bg-gray-50 shadow-sm transition-all text-base"
                            >
                                <BookOpen className="w-5 h-5 mr-3 text-primary" />

                                {t.awards.guide}
                            </Button>
                        </a>

                    </div>

                    {/* Award Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

                        {recfAwards.map((award, index) => (

                            <div
                                key={index}
                                className={`rounded-3xl border p-8 flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform duration-300 ${award.bg} ${award.border}`}
                            >

                                {/* Icon */}
                                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                    {award.icon}
                                </div>

                                {/* Name */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {award.name[language]}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">

                                    <span className="bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                                        {award.program[language]}
                                    </span>

                                    <span className="bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                                        {award.type[language]}
                                    </span>

                                </div>

                                {/* Criteria */}
                                <p className="text-gray-700 mb-8 flex-grow leading-relaxed">
                                    {award.criteria[language]}
                                </p>

                                {/* Qualification */}
                                <div className="bg-white/60 p-5 rounded-2xl flex items-start gap-4 mt-auto">

                                    <Info className="w-6 h-6 text-gray-500 shrink-0 mt-0.5" />

                                    <p className="text-sm text-gray-700 leading-relaxed">

                                        <span className="font-bold text-gray-900 block mb-1">
                                            {t.awards.qualification}
                                        </span>

                                        {award.qualification[language]}

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
