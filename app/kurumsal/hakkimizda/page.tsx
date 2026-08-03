'use client'

import React, { useState } from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/utils'
import {
    Globe2,
    MapPin, ArrowRight, CheckCircle2, ExternalLink,
    Heart, ShieldCheck, Award, UserCheck,
    Users
} from 'lucide-react'
import Link from 'next/link'

const content = {
    TR: {
        hero: {
            title: "Geleceğin Mühendislik Ekosistemini Birlikte Kuruyoruz",
            subtitle: "RECF Türkiye; öğrencileri, eğitimcileri, mentorları, gönüllüleri ve kurumları robotik, drone ve mühendislik yarışmaları etrafında buluşturan öğrenci merkezli bir teknoloji ekosistemidir."
        },
        sec1: {
            recfTitle: "RECF Hakkında",
            recfDesc1: "Robotics Education & Competition Foundation (RECF), öğrencilerin bilim, teknoloji, mühendislik ve matematik alanlarına ilgisini artırmayı amaçlayan, kâr amacı gütmeyen uluslararası bir kuruluştur.",
            recfDesc2: "RECF programları; öğrencilerin teorik bilgilerini gerçek görevler, mühendislik projeleri ve takım temelli yarışma deneyimleriyle uygulamaya dönüştürmesini sağlar. Katılımcılar yalnızca teknik becerilerini değil; liderlik, iletişim, problem çözme ve proje yönetimi yetkinliklerini de geliştir.",
            recfTrTitle: "RECF Türkiye Hakkında",
            recfTrDesc1: "RECF Türkiye, RECF programlarının Türkiye’de yaygınlaştırılması, takımların desteklenmesi ve sürdürülebilir bir yarışma ekosisteminin oluşturulması için çalışır.",
            recfTrDesc2: "Öğrencilerden eğitimcilere, gönüllülerden kurumlara kadar tüm paydaşları aynı hedef etrafında buluşturur. Amacı gençlerin teknoloji üreten, çözüm geliştiren ve sorumluluk alan bireyler olarak yetişmesine katkı sağlamaktır."
        },
        sec2: {
            title: "Değerlerimiz",
            subtitle: "RECF Türkiye ekosistemini yönlendiren, paydaşlarımızla ilişkilerimizi ve çalışmalarimizi şekillendiren temel ilkelerimiz.",
            passionTitle: "Tutku",
            passionDesc: "Merakı destekleyen, keşfetmenin heyecanını yaşatan ve yeni fırsatlar oluşturan programlarla gelecek nesillere ilham vermek için tutkuyla çalışıyoruz.",
            integrityTitle: "Dürüstlük",
            integrityDesc: "Dürüstlük, şeffaflık ve etik ilkelere bağlılık tüm çalışmalarımızın temelini oluşturur. Kararlarımızda adaleti, güveni ve sorumluluğu esas alırız.",
            excellenceTitle: "Mükemmellik",
            excellenceDesc: "Programlarımızı, etkinliklerimizi ve paydaş deneyimini sürekli geliştirerek yüksek kalite standartlarına ulaşmayı hedefleriz.",
            studentCentricTitle: "Öğrenci Merkezlilik",
            studentCentricDesc: "Öğrencilerin kendi fikirlerini geliştirmesini, kararlarını vermesini, sistemlerini üretmesini ve çalışmalarını kendi ifadeleriyle anlatmasını destekleriz.",
            inclusivityTitle: "Kapsayıcılık",
            inclusivityDesc: "Farklı geçmişlere, beceri seviyelerine ve deneyimlere sahip öğrencilerin kendilerini güvende ve değerli hissettikleri bir ekosistem oluştururuz."
        },
        sec3: {
            title: "RECF Türkiye Ekibi",
            subtitle: "RECF Türkiye ekibi; program yönetimi, takım desteği, etkinlik operasyonu, gönüllü koordinasyonu, eğitim, iletişim ve kurumsal işbirlikleri alanlarında çalışan profesyonellerden oluşur. Ekibimiz, takımların ilk kayıt adımından yarışma deneyimine kadar ihtiyaç duyduğu yönlendirme ve desteği sağlamak için birlikte çalışır.",
            role1: "Program Direktörü",
            desc1: "Takım Desteği ve Operasyon",
            role2: "Etkinlik Koordinatörü",
            desc2: "Operasyon ve Gönüllü Yönetimi",
            role3: "Eğitim ve Okul Destek Uzmanı",
            desc3: "Eğitmen Eğitimleri ve Kaynaklar",
            role4: "İletişim ve Partner İlişkileri",
            desc4: "Kurumsal İşbirlikleri ve Sponsorluk"
        },
        sec4: {
            title: "Planlama Komitesi",
            subtitle1: "RECF Türkiye Planlama Komitesi; sezonun etkinlik takvimi, yarışma standartları, gönüllü yapısı, eğitim ihtiyaçları ve ekosistem gelişimi üzerine çalışan danışma ve koordinasyon grubudur.",
            subtitle2: "Komite; eğitimciler, mentorlar, mühendisler, sektör profesyonelleri, etkinlik yöneticileri ve ilgili uzmanların katkısıyla çalışmalarını yürütür.",
            btnJoin: "Planlama Komitesine Katıl",
            areasTitle: "Planlama Komitesinin Çalışma Alanları",
            areas: [
                "Sezon ve etkinlik planlaması",
                "Yarışma operasyon standartları",
                "Eğitim ve mentor ihtiyaçları",
                "Gönüllü ve görevli gelişimi",
                "Takım deneyiminin iyileştirilmesi",
                "Bölgesel yaygınlaşma",
                "Kurumsal ve akademik işbirlikleri",
                "Güvenlik, etik ve kapsayıcılık"
            ]
        },
        sec5: {
            title: "Intechne Teknoloji Hakkında",
            desc1: "Intechne Teknoloji; robotik yarışmalar, teknoloji eğitimleri, etkinlik sistemleri ve genç yetenek gelişimi alanlarında faaliyet gösteren bir teknoloji şirketidir.",
            desc2: "RECF’in, Türkiye koordinasyon ve operasyon çalışmaları Intechne Teknoloji tarafından yürütülür. Intechne; takım desteği, etkinlik planlama, gönüllü koordinasyonu, eğitim, iletişim ve ekosistem geliştirme süreçlerine katkı sağlar.",
            btnDiscover: "Intechne’yi Tanıyın"
        }
    },
    EN: {
        hero: {
            title: "About RECF Türkiye",
            subtitle: "Robotics Education & Competition Foundation (RECF) Türkiye is a student-centered technology ecosystem that brings together students, educators, mentors, volunteers, and institutions around robotics, drone, and engineering competitions."
        },
        sec1: {
            recfTitle: "About RECF",
            recfDesc1: "Robotics Education & Competition Foundation (RECF) is an international non-profit organization aimed at increasing students' interest in science, technology, engineering, and mathematics (STEM).",
            recfDesc2: "RECF programs enable students to apply their theoretical knowledge through real tasks, engineering projects, and team-based competition experiences. Participants develop not only their technical skills but also their leadership, communication, problem-solving, and project management competencies.",
            recfTrTitle: "About RECF Turkey",
            recfTrDesc1: "RECF Türkiye works to expand RECF programs in Turkey, support teams, and create a sustainable competition ecosystem.",
            recfTrDesc2: "It brings together all stakeholders, from students to educators, volunteers to institutions, around the same goal. Its aim is to contribute to the development of young people as individuals who produce technology, develop solutions, and take responsibility."
        },
        sec2: {
            title: "Values",
            subtitle: "The core principles that guide the RECF Turkey ecosystem, shape our relationships with stakeholders, and guide our work.",
            passionTitle: "Passion",
            passionDesc: "We work with passion to inspire future generations through programs that support curiosity, foster the excitement of discovery, and create new opportunities.",
            integrityTitle: "Integrity",
            integrityDesc: "Integrity, transparency, and adherence to ethical principles form the foundation of all our work. We base our decisions on justice, trust, and responsibility.",
            excellenceTitle: "Excellence",
            excellenceDesc: "We strive to achieve high standards of quality in our programs, events, and stakeholder experiences, continuously improving them.",
            studentCentricTitle: "Student-Centered",
            studentCentricDesc: "We support students in developing their own ideas, making their own decisions, creating their own systems, and expressing their work in their own words.",
            inclusivityTitle: "Inclusivity",
            inclusivityDesc: "We create an ecosystem where students from different backgrounds, skill levels, and experiences feel safe and valued."
        },
        sec3: {
            title: "The RECF Turkey Team",
            subtitle: "The RECF Turkey team consists of professionals working in program management, team support, event operations, volunteer coordination, education, communication, and corporate partnerships. Our team works together to provide the guidance and support teams need from their first registration step to their competition experience.",
            role1: "Program Director",
            desc1: "Team Support and Operations",
            role2: "Event Coordinator",
            desc2: "Operations and Volunteer Management",
            role3: "Education and School Support Specialist",
            desc3: "Trainer Education and Resources",
            role4: "Communication and Partner Relations",
            desc4: "Corporate Partnerships and Sponsorship"
        },
        sec4: {
            title: "Planning Committee",
            subtitle1: "The RECF Turkey Planning Committee is an advisory and coordination group working on the season's event calendar, competition standards, volunteer structure, education needs, and ecosystem development.",
            subtitle2: "The committee carries out its work with the contributions of educators, mentors, engineers, industry professionals, event managers, and relevant experts.",
            btnJoin: "Join the Planning Committee",
            areasTitle: "Planning Committee Working Areas",
            areas: [
                "Season and event planning",
                "Competition operation standards",
                "Education and mentor needs",
                "Volunteer and staff development",
                "Team experience improvement",
                "Regional expansion",
                "Corporate and academic partnerships",
                "Safety, ethics, and inclusivity"
            ]
        },
        sec5: {
            title: "About Intechne Technology",
            desc1: "Intechne Technology is a technology company operating in the fields of robotics competitions, technology education, event systems, and youth talent development.",
            desc2: "RECF's coordination and operation activities in Turkey are carried out by Intechne Technology. Intechne contributes to team support, event planning, volunteer coordination, education, communication, and ecosystem development processes.",
            btnDiscover: "Discover Intechne"
        }
    }
}

export default function HakkimizdaPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const { t, isFallback } = getTranslation(content, language)

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar
                language={language}
                onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={isFallback}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* 1. RECF ve RECF Türkiye Nedir? */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* RECF */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Globe2 className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.sec1.recfTitle}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {t.sec1.recfDesc1}
                            </p>
                            <br />
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {t.sec1.recfDesc2}
                            </p>
                        </div>

                        {/* RECF Türkiye */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-3xl" />
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.sec1.recfTrTitle}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {t.sec1.recfTrDesc1}
                            </p>
                            <br />
                            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                                {t.sec1.recfTrDesc2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Değerlerimiz */}
            <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-medium text-primary">İlkelerimiz</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t.sec2.title}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {t.sec2.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 1. Tutku */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <Heart className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sec2.passionTitle}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t.sec2.passionDesc}
                            </p>
                        </div>

                        {/* 2. Dürüstlük */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sec2.integrityTitle}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t.sec2.integrityDesc}
                            </p>
                        </div>

                        {/* 3. Mükemmellik */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                                <Award className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sec2.excellenceTitle}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t.sec2.excellenceDesc}
                            </p>
                        </div>

                        {/* 4. Öğrenci Merkezlilik */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <UserCheck className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sec2.studentCentricTitle}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t.sec2.studentCentricDesc}
                            </p>
                        </div>

                        {/* 5. Kapsayıcılık */}
                        <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 mb-6 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sec2.inclusivityTitle}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t.sec2.inclusivityDesc}
                            </p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mt-20 border-t border-gray-200/60 pt-20">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm font-medium text-primary">Ekibimiz</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {t.sec3.title}
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                {t.sec3.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {/* Card 1 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">{t.sec3.role1}</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">{t.sec3.desc1}</p>
                            </div>
                            {/* Card 2 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">{t.sec3.role2}</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">{t.sec3.desc2}</p>
                            </div>
                            {/* Card 3 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">{t.sec3.role3}</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">{t.sec3.desc3}</p>
                            </div>
                            {/* Card 4 */}
                            <div className="group bg-white rounded-3xl border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200/80 mx-auto mb-5 overflow-hidden flex items-center justify-center relative">
                                    <Users className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Ad Soyad</h3>
                                <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">{t.sec3.role4}</p>
                                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 text-xs leading-normal">{t.sec3.desc4}</p>
                            </div>
                        </div>
                    </div>

                    {/* Committee Section */}
                    <div className="mt-20 border-t border-gray-200/60 pt-20">
                        <div className="grid lg:grid-cols-12 gap-12 items-start text-left">
                            {/* Left Column: Heading and Paragraphs */}
                            <div className="lg:col-span-5">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium text-primary">Danışma & İşbirliği</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {t.sec4.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4 text-base">
                                    {t.sec4.subtitle1}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                    {t.sec4.subtitle2}
                                </p>

                                <Link href="/iletisim/form">
                                    <Button size="lg" className="bg-primary text-white font-semibold px-8 h-12 hover:bg-primary/90 shadow-lg shadow-primary/20">
                                        {t.sec4.btnJoin}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Right Column: Working Areas Grid */}
                            <div className="lg:col-span-7">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">
                                    {t.sec4.areasTitle}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {t.sec4.areas.map((area: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800 leading-tight">{area}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Intechne Teknoloji Hakkında */}
            <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-sm font-medium text-blue-600">Resmi Temsilci & Operasyon</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {t.sec5.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
                        {t.sec5.desc1}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                        {t.sec5.desc2}
                    </p>

                    <a href="https://intechne.com.tr" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 shadow-lg shadow-blue-600/20">
                            {t.sec5.btnDiscover}
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
