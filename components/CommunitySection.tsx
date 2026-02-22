'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, GraduationCap, Heart, BookOpen, CheckCircle2, Trophy, Award } from 'lucide-react'

interface CommunitySectionProps {
    language: 'TR' | 'EN'
}

type TabKey = 'competitor' | 'volunteer' | 'mentor' | 'sponsor' | 'educator'

import Link from 'next/link'

export function CommunitySection({ language }: CommunitySectionProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('competitor')

    const content = {
        TR: {
            label: 'TOPLULUĞUMUZA KATIL',
            title: 'Küresel Bir Ağ,',
            titleHighlight: 'STEM ile Birleşik',
            subtitle: 'Her öğrenci, veli, gönüllü, eğitimci ve destekçi VEX Türkiye ailesinin bir parçasıdır. Topluluk olarak inovasyonu, iş birliğini ve dönüşümü nasıl güçlendirdiğimizi keşfedin.',
            tabs: {
                competitor: {
                    title: 'Yarışmacı',
                    icon: Trophy,
                    heading: 'Yarışmacılar',
                    description: 'VEX yarışmacıları, liderlik, takım çalışması ve problem çözme becerilerini geliştirdikleri heyecan dolu bir STEM yolculuğuna çıkıyor. Bir takımın parçası ol ve geleceğini şekillendir!',
                    benefits: [
                        'Takım Deneyimi: Akranlarınla birlikte robotlar tasarla, inşa et ve programla',
                        'Liderlik Becerileri: Proje yönetimi ve takım koordinasyonu deneyimi kazan',
                        'Problem Çözme: Gerçek mühendislik zorluklarıyla yüzleş ve çözümler üret',
                        'Küresel Yarışmalar: Dünya Şampiyonası\'na kadar uzanan bir yolculuğa çık'
                    ],
                    cta: 'Takımını Kur / Kaydol',
                    href: '/takimlar/nasil-kurulur'
                },
                volunteer: {
                    title: 'Gönüllü',
                    icon: Users,
                    heading: 'Gönüllüler',
                    description: 'VEX gönüllüleri, STEM\'i hayata geçirir — etkinlik kurulumundan takımları desteklemeye kadar. Deneyim gerekmez, sadece öğrencilerin başarılı olmasına yardım etme tutkusu yeterlidir.',
                    benefits: [
                        'Turnuva Deneyimi: Operasyonlar, hakemlik ve saha kurulumu rollerinde aktif görev alın',
                        'Gönüllülük Sertifikası: Resmi sertifika ile deneyiminizi belgelendirin',
                        'İlham Verin: Öğrencilere uygulamalı destek sunarak onlara ilham olun',
                        'Esnek Roller: Her ilgi alanına ve programa uygun görevler'
                    ],
                    cta: 'Gönüllü Başvurusu',
                    href: '/kurumsal/gonullu-olun'
                },
                mentor: {
                    title: 'Mentor',
                    icon: GraduationCap,
                    heading: 'Mentorlar',
                    description: 'Mentorlar, takımlara teknik rehberlik eder, mühendislik sürecini yönetir ve öğrencilere alan bilgisi ve deneyimleriyle ilham verir. Geleceğin mühendislerini şekillendirin.',
                    benefits: [
                        'Teknik Rehberlik: Takımlara robot tasarımı ve kodlama konularında destek olun',
                        'Mühendislik Süreci: Öğrencilere sistematik problem çözme yaklaşımını öğretin',
                        'Kariyer Mentorluğu: STEM alanındaki deneyimlerinizi paylaşın',
                        'Profesyonel Ağ: Diğer mentorlar ve sektör profesyonelleriyle bağlantı kurun'
                    ],
                    cta: 'Mentor Kaynakları',
                    href: '/takimlar/mentor'
                },
                sponsor: {
                    title: 'Sponsor & Bağışçı',
                    icon: Heart,
                    heading: 'Sponsorlar & Bağışçılar',
                    description: 'Ekosisteme finansal veya donanım desteği sağlayarak geleceğin mühendislerine yatırım yapın. Kurumsal sosyal sorumluluk hedeflerinizi VEX Türkiye ile buluşturun.',
                    benefits: [
                        'Stratejik Ortaklık: Marka görünürlüğünüzü ulusal ve uluslararası yarışmalarda artırın',
                        'Yetenek Havuzu: Geleceğin mühendisleriyle erken dönemde tanışma fırsatı',
                        'KSS Etkinliği: Ölçülebilir sosyal etki raporlarıyla projenizi belgeleyin',
                        'Özelleştirilmiş Paketler: Bütçenize ve hedeflerinize uygun sponsorluk seçenekleri'
                    ],
                    cta: 'Sponsorluk Dosyası',
                    href: '/kurumsal/sponsorlar-ve-partnerler'
                },
                educator: {
                    title: 'Eğitmen',
                    icon: BookOpen,
                    heading: 'Eğitmenler',
                    description: 'VEX\'i okul müfredatınıza entegre edin, sertifikalı eğitmen eğitimlerine katılın ve sınıf içi uygulamalar için kapsamlı kaynaklara erişin.',
                    benefits: [
                        'Müfredat Entegrasyonu: VEX platformlarını mevcut STEM derslerinize entegre edin',
                        'Sertifikalı Eğitimler: Resmi VEX eğitmen sertifikası alın',
                        'Ders Kaynakları: Hazır ders planları ve aktivite rehberleri',
                        'Teknik Destek: Sınıf içi uygulamalar için sürekli teknik destek'
                    ],
                    cta: 'Eğitmen Eğitimleri',
                    href: 'https://educathub.com/mufredatlarimiz/'
                }
            }
        },
        EN: {
            label: 'JOIN OUR COMMUNITY',
            title: 'A Global Network,',
            titleHighlight: 'United by STEM',
            subtitle: 'Every student, parent, volunteer, educator, and supporter is part of the VEX Turkey family. Discover how we fuel innovation, collaboration, and transformation as a community.',
            tabs: {
                competitor: {
                    title: 'Competitor',
                    icon: Trophy,
                    heading: 'Competitors',
                    description: 'VEX competitors embark on an exciting STEM journey where they develop leadership, teamwork, and problem-solving skills. Be part of a team and shape your future!',
                    benefits: [
                        'Team Experience: Design, build, and program robots with your peers',
                        'Leadership Skills: Gain project management and team coordination experience',
                        'Problem Solving: Face real engineering challenges and create solutions',
                        'Global Competitions: Embark on a journey that leads to the World Championship'
                    ],
                    cta: 'Build Your Team / Register',
                    href: '/takimlar/nasil-kurulur'
                },
                volunteer: {
                    title: 'Volunteer',
                    icon: Users,
                    heading: 'Volunteers',
                    description: 'VEX volunteers make STEM come to life — from setting up events to cheering on teams. No experience is required, just a passion for helping students succeed.',
                    benefits: [
                        'Tournament Experience: Take active roles in operations, refereeing, and field setup',
                        'Volunteer Certificate: Document your experience with an official certificate',
                        'Inspire Students: Be an inspiration through hands-on support',
                        'Flexible Roles: Tasks suitable for every interest and schedule'
                    ],
                    cta: 'Apply as Volunteer',
                    href: '/kurumsal/gonullu-olun'
                },
                mentor: {
                    title: 'Mentor',
                    icon: GraduationCap,
                    heading: 'Mentors',
                    description: 'Mentors provide technical guidance to teams, manage the engineering process, and inspire students with their field knowledge and experience. Shape the engineers of the future.',
                    benefits: [
                        'Technical Guidance: Support teams in robot design and coding',
                        'Engineering Process: Teach students systematic problem-solving approaches',
                        'Career Mentorship: Share your STEM field experiences',
                        'Professional Network: Connect with other mentors and industry professionals'
                    ],
                    cta: 'Mentor Resources',
                    href: '/takimlar/mentor'
                },
                sponsor: {
                    title: 'Sponsor & Donor',
                    icon: Heart,
                    heading: 'Sponsors & Donors',
                    description: 'Invest in future engineers by providing financial or equipment support to the ecosystem. Align your corporate social responsibility goals with VEX Turkey.',
                    benefits: [
                        'Strategic Partnership: Increase your brand visibility at national and international competitions',
                        'Talent Pool: Early access to future engineers',
                        'CSR Impact: Document your project with measurable social impact reports',
                        'Customized Packages: Sponsorship options tailored to your budget and goals'
                    ],
                    cta: 'Sponsorship Package',
                    href: '/kurumsal/sponsorlar-ve-partnerler'
                },
                educator: {
                    title: 'Educator',
                    icon: BookOpen,
                    heading: 'Educators',
                    description: 'Integrate VEX into your school curriculum, participate in certified educator training, and access comprehensive resources for classroom applications.',
                    benefits: [
                        'Curriculum Integration: Integrate VEX platforms into your existing STEM courses',
                        'Certified Training: Obtain official VEX educator certification',
                        'Lesson Resources: Ready-made lesson plans and activity guides',
                        'Technical Support: Ongoing technical support for classroom applications'
                    ],
                    cta: 'Educator Training',
                    href: 'https://educathub.com/mufredatlarimiz/'
                }
            }
        }
    }

    const t = content[language]
    const tabs: TabKey[] = ['competitor', 'volunteer', 'mentor', 'sponsor', 'educator']

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
