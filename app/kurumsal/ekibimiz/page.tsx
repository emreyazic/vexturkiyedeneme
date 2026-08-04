'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Linkedin, ArrowRight, UserCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'

const teamMembers = [
    {
        id: 'omer-akbulut',
        name: 'Ömer Akbulut',
        title: 'RECF Türkiye Bölge Destek Yöneticisi',
        category: 'Yönetim ve Organizasyon',
        bio: 'Türkiye\'deki RECF organizasyonlarının genel yönetimi, stratejik planlama ve Intechne Teknoloji temsil faaliyetlerini yürütür.',
        responsibilities: ['Program Yönetimi', 'Etkinlik ve Turnuva Planlama', 'Takım Desteği', 'Genel İletişim'],
        linkedinUrl: 'https://linkedin.com/in/omerakbulut',
    }
    // Gelecekte onaylı diğer ekip üyeleri buraya eklenebilir.
]

export default function EkibimizPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero 
                title="RECF Türkiye Ekibi" 
                subtitle="RECF Türkiye ve yerel operasyon yürütücümüz Intechne Teknoloji ekibimizle tanışın. Takımlarımıza ve etkinliklerimize destek veren profesyonel kadromuz." 
            />

            {/* Team Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                            >
                                {/* Profile Photo Placeholder */}
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg" />
                                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                                        <UserCircle className="w-16 h-16 text-primary/40" />
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                                <p className="text-md font-semibold text-primary mb-2">{member.title}</p>
                                
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-4 w-fit">
                                    <Briefcase className="w-4 h-4 text-gray-600" />
                                    <span className="text-xs font-medium text-gray-700">{member.category}</span>
                                </div>

                                <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                                    {member.bio}
                                </p>

                                {/* Sorumluluklar */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Sorumluluk Alanları</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {member.responsibilities.map((resp, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100">
                                                {resp}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-100 flex gap-3">
                                    {member.linkedinUrl && (
                                        <a
                                            href={member.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center flex-1 py-2.5 rounded-xl bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-200 font-medium text-sm gap-2"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            LinkedIn Profili
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Team CTA */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Siz de Katkıda Bulunun</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        RECF Türkiye ekosisteminin büyümesinde gönüllülerin, mentorların ve eğitimcilerin payı çok büyük. Siz de etkinliklerimizde görev alarak gençlerin mühendislik vizyonuna yön verebilirsiniz.
                    </p>
                    <Link href="/kurumsal/gonulluluk">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                            Gönüllü Başvurusu Yap
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}