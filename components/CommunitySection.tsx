'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, GraduationCap, Heart, BookOpen, CheckCircle2, Trophy, Home } from 'lucide-react'

interface CommunitySectionProps {
    language: 'TR' | 'EN'
}

type TabKey = 'competitor' | 'parent' | 'volunteer' | 'mentor' | 'sponsor' | 'educator'

import Link from 'next/link'

export function CommunitySection({ language }: CommunitySectionProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('competitor')

    const content = {
        TR: {
            label: 'TOPLULUĞUMUZA KATIL',
            title: 'Birlikte Üreten, Birlikte Gelişen Bir Ekosistem',
            titleHighlight: 'STEM ile Birleşik',
            subtitle: 'Öğrenciler, mentorlar, veliler, gönüllüler ve destekçiler aynı amaç etrafında buluşur: öğrenmek, üretmek ve geleceği birlikte şekillendirmek.',
            tabs: {
                competitor: {
                    title: 'Yarışmacı',
                    icon: Trophy,
                    heading: 'Yarışmacılar',
                    description: 'RECF yarışmacıları; tasarım, üretim, programlama ve takım çalışmasını gerçek görevler üzerinden deneyimler.',
                    benefits: [
                        'Takım Deneyimi: Takımınla birlikte robot veya drone sistemleri geliştir.',
                        'Liderlik: Görev paylaşımı, zaman yönetimi ve takım koordinasyonu deneyimi kazan.',
                        'Problem Çözme: Mühendislik zorluklarını analiz et, test et ve iyileştir.',
                        'Küresel Yolculuk: Yerel etkinliklerden uluslararası yarışma fırsatlarına uzanan bir deneyimin parçası ol.'
                    ],
                    cta: 'Takımını Kur',
                    href: 'https://recfevents.org/'
                },
                parent: {
                    title: 'Veli',
                    icon: Home,
                    heading: 'Veliler',
                    description: 'Çocuğunuzun teknolojiye olan ilgisini destekleyin; özgüven, sorumluluk ve takım çalışması becerilerinin gelişimine katkı sağlayın.',
                    benefits: [
                        'Gelişimi Destekleyin: Çocuğunuzun teknik ve sosyal becerilerini birlikte geliştirmesine yardımcı olun.',
                        'Süreci Takip Edin: Takım çalışmaları, etkinlikler ve sezon takvimi hakkında bilgi sahibi olun.',
                        'Güvenli Ortam: Öğrenci merkezli ve güvenli çalışma kültürünü destekleyin.',
                        'Geleceğe Hazırlık: STEM eğitimi ve kariyer alanlarını erken yaşta keşfetmesine katkı sağlayın.'
                    ],
                    cta: 'Aile Birliğine Katılın',
                    href: '/iletisim/form'
                },
                volunteer: {
                    title: 'Gönüllü',
                    icon: Users,
                    heading: 'Gönüllüler',
                    description: 'RECF etkinliklerinin güvenli, adil ve profesyonel biçimde gerçekleşmesine katkı sağlayın. Deneyiminize ve ilgi alanınıza uygun bir görev üstlenin.',
                    benefits: [
                        'Etkinlik Deneyimi: Saha kurulumu, operasyon, hakemlik, jüri ve takım desteği rollerinde görev alın.',
                        'Rol Bazlı Eğitim: Görevinize uygun güncel eğitim ve bilgilendirme içeriklerine erişin.',
                        'İlham Verin: Öğrencilerin unutamayacakları bir yarışma deneyimi yaşamasına destek olun.',
                        'Esnek Katılım: Yerel, bölgesel veya ulusal etkinliklerde uygunluğunuza göre görev alın.'
                    ],
                    cta: 'Gönüllü Olun',
                    href: '/kurumsal/gonullu-olun'
                },
                mentor: {
                    title: 'Mentor',
                    icon: GraduationCap,
                    heading: 'Mentorlar',
                    description: 'Mentorlar, öğrencilerin yerine çözüm üretmez; doğru soruları sorarak takımın kendi çözümünü geliştirmesine rehberlik eder.',
                    benefits: [
                        'Teknik Rehberlik: Tasarım, programlama ve test süreçlerinde öğrencilere yol gösterin.',
                        'Mühendislik Süreci: Problem tanımlama, prototipleme, test ve iyileştirme kültürünü destekleyin.',
                        'Takım Yönetimi: Sezon planı, güvenlik, görev dağılımı ve etkinlik hazırlığını koordine edin.',
                        'Kariyer İlhamı: Deneyimlerinizi paylaşarak öğrencilerin STEM alanlarını keşfetmesine katkı sağlayın.'
                    ],
                    cta: 'Mentor Olun',
                    href: '/takimlar/mentor'
                },
                sponsor: {
                    title: 'Sponsor & Bağışçı',
                    icon: Heart,
                    heading: 'Sponsorlar & Bağışçılar',
                    description: 'RECF Türkiye ekosistemine kaynak, uzmanlık veya etkinlik desteği sağlayarak geleceğin teknoloji üreticilerine yatırım yapın.',
                    benefits: [
                        'Stratejik İş Birliği: Eğitim, teknoloji ve gençlik odaklı projelerde uzun vadeli ortaklık geliştirin.',
                        'Yeteneklerle Buluşma: Geleceğin mühendisleri ve teknoloji profesyonelleriyle erken dönemde tanışın.',
                        'Ölçülebilir Sosyal Etki: Desteklenen öğrenci, takım ve etkinlikleri somut çıktılarla takip edin.',
                        'Esnek Destek Modelleri: Finansal destek, ekipman, mekân, eğitim veya uzmanlık katkısı sunun.',
                    ],
                    cta: 'Sponsorumuz Olun',
                    href: '/kurumsal/sponsorlar-ve-partnerler'
                },
                educator: {
                    title: 'Eğitmen',
                    icon: BookOpen,
                    heading: 'Eğitmenler',
                    description: 'RECF programlarını sınıf, kulüp ve laboratuvar çalışmalarınıza entegre ederek öğrencilerin uygulamalı STEM deneyimini güçlendirin.',
                    benefits: [
                        'Program Entegrasyonu: Robotik ve drone çalışmalarını mevcut ders ve kulüp yapılarına uyarlayın.',
                        'Eğitim Kaynakları: Güncel eğitim içeriklerine training.recf.org üzerinden erişin.',
                        'Uygulamalı Öğrenme: Dersleri gerçek görevler, tasarım süreçleri ve takım projeleriyle destekleyin.',
                        'Mentor Desteği: Takım yönetimi, sezon planlama ve etkinlik hazırlığı kaynaklarından yararlanın.'
                    ],
                    cta: 'Eğitmen Kaynakları',
                    href: 'https://training.recf.org'
                }
            }
        },
        EN: {
            label: 'JOIN OUR COMMUNITY',
            title: 'A Global Network,',
            titleHighlight: 'United by STEM',
            subtitle: 'Every student, parent, volunteer, educator, and supporter is part of the RECF Turkey family. Discover how we fuel innovation, collaboration, and transformation as a community.',
            tabs: {
                competitor: {
                    title: 'Competitor',
                    icon: Trophy,
                    heading: 'Competitors',
                    description: 'RECF contestants experience design, production, programming, and teamwork through real-world tasks.',
                    benefits: [
                        'Team Experience: Develop robot or drone systems with your team.',
                        'Leadership Skills: Gain experience in task sharing, time management, and team coordination.',
                        'Problem Solving: Analyze, test, and improve engineering challenges.',
                        'Global Competitions: Be part of an experience that spans from local events to international competition opportunities.'
                    ],
                    cta: 'Build Your Team',
                    href: '/takimlar/nasil-kurulur'
                },
                parent: {
                    title: 'Parent',
                    icon: Home,
                    heading: 'Parents',
                    description: "Support your child's interest in technology; contribute to the development of self-confidence, responsibility, and teamwork skills.",
                    benefits: [
                        'Support Development: Help your child develop technical and social skills together.',
                        'Follow the Process: Be informed about team activities, events, and the season calendar.',
                        'Safe Environment: Support a student-centered and safe working culture.',
                        'Prepare for Future: Contribute to their early discovery of STEM education and career paths.'
                    ],
                    cta: 'Join the Parent Union',
                    href: '/iletisim/form'
                },
                volunteer: {
                    title: 'Volunteer',
                    icon: Users,
                    heading: 'Volunteers',
                    description: 'Contribute to the safe, fair, and professional conduct of RECF events. Take on a role that aligns with your experience and interests.',
                    benefits: [
                        'Event Experience: Take on roles in field setup, operations, refereeing, judging, and team support.',
                        'Role-Based Training: Access up-to-date training and informational content tailored to your role.',
                        'Inspire: Help students have an unforgettable competition experience.',
                        'Flexible Participation: Take on roles at local, regional, or national events according to your availability.'
                    ],
                    cta: 'Volunteer',
                    href: '/kurumsal/gonullu-olun'
                },
                mentor: {
                    title: 'Mentor',
                    icon: GraduationCap,
                    heading: 'Mentors',
                    description: 'Mentors do not provide solutions on behalf of students; they guide the team to develop their own solution by asking the right questions.',
                    benefits: [
                        'Technical Guidance: Guide students through design, programming, and testing processes.',
                        'Engineering Process: Support a culture of problem definition, prototyping, testing, and improvement.',
                        'Team Management:  Coordinate the season plan, security, task allocation, and event preparation.',
                        'Career Inspiration: Contribute to students\' exploration of STEM fields by sharing your experiences.'
                    ],
                    cta: 'Become a Mentor',
                    href: '/takimlar/mentor'
                },
                sponsor: {
                    title: 'Sponsor & Donor',
                    icon: Heart,
                    heading: 'Sponsors & Donors',
                    description: 'Invest in future technology producers by providing resources, expertise, or event support to the RECF Turkey ecosystem.',
                    benefits: [
                        'Strategic Collaboration: Develop long-term partnerships in education, technology, and youth-focused projects.',
                        'Meeting Talents: Get to know future engineers and technology professionals early on.',
                        'Measurable Social Impact: Track supported students, teams, and activities with concrete outcomes.',
                        'Flexible Support Models: Offer financial support, equipment, space, training, or expertise contributions.'
                    ],
                    cta: 'Become a Sponsor',
                    href: '/kurumsal/sponsorlar-ve-partnerler'
                },
                educator: {
                    title: 'Educator',
                    icon: BookOpen,
                    heading: 'Educators',
                    description: 'nhance students\' hands-on STEM experience by integrating RECF programs into your classroom, club, and laboratory activities.',
                    benefits: [
                        'Program Integration: Adapt robotics and drone activities to existing course and club structures.',
                        'Educational Resources: Access up-to-date educational content.',
                        'Hands-On Learning: Supplement lessons with real tasks, design processes, and team projects.',
                        'Mentor Support: Benefit from resources for team management, season planning, and event preparation.'
                    ],
                    cta: 'Educator Resources',
                    href: 'https://educathub.com/mufredatlarimiz/'
                }
            }
        }
    }

    const t = content[language]
    const tabs: TabKey[] = ['competitor', 'parent', 'volunteer', 'mentor', 'sponsor', 'educator']

    return (
        <section className="relative py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="max-w-4xl mb-16">
                    {/* Label */}
                    <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                        {t.label}
                    </span>

                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        {t.title} <span className="text-gray-500 font-normal">{t.titleHighlight}</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                        {t.subtitle}
                    </p>
                </div>

                {/* Tabs Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Tab Menu - Left Side (Desktop) / Top (Mobile) */}
                    <div className="lg:col-span-4">
                        {/* Mobile: Horizontal Scrollable */}
                        <div className="flex lg:hidden overflow-x-auto gap-2 pb-4 -mx-6 px-6 scrollbar-hide">
                            {tabs.map((tabKey) => {
                                const tab = t.tabs[tabKey]
                                const isActive = activeTab === tabKey
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveTab(tabKey)}
                                        className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${isActive
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        {tab.title}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Desktop: Vertical Menu */}
                        <div className="hidden lg:flex flex-col gap-2">
                            {tabs.map((tabKey) => {
                                const tab = t.tabs[tabKey]
                                const isActive = activeTab === tabKey
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveTab(tabKey)}
                                        className={`relative flex items-center gap-4 px-6 py-4 text-left rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-white shadow-lg text-gray-900'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                                            }`}
                                    >
                                        {/* Active Indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}

                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-primary/10' : 'bg-gray-100'
                                            }`}>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                                        </div>

                                        <span className={`font-semibold text-lg ${isActive ? 'text-gray-900' : ''}`}>
                                            {tab.title}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tab Content - Right Side */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100"
                            >
                                {/* Content Heading */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    {t.tabs[activeTab].heading}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    {t.tabs[activeTab].description}
                                </p>

                                {/* Benefits List */}
                                <ul className="space-y-4 mb-8">
                                    {t.tabs[activeTab].benefits.map((benefit, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link href={t.tabs[activeTab].href} target={activeTab === 'educator' ? '_blank' : undefined}>
                                    <Button
                                        size="lg"
                                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                                    >
                                        {t.tabs[activeTab].cta}
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}