'use client'

import React, { useState, useEffect } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Calendar, ArrowRight, Users, GraduationCap, School, Building2, Mail, Phone, User, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'

const V5SeasonSection = dynamic(() => import('@/components/V5SeasonSection').then(mod => ({ default: mod.V5SeasonSection })), {
  ssr: false,
  loading: () => <div className="w-full py-24 bg-gray-50 animate-pulse" />,
})
const CommunitySection = dynamic(() => import('@/components/CommunitySection').then(mod => ({ default: mod.CommunitySection })), {
  ssr: false,
  loading: () => <div className="w-full py-24 bg-white animate-pulse" />,
})
import { Navbar } from '@/components/Navbar'

// Sanity Imports
import {
  SanityEvent,
  SanityNews,
  SanityHero,
  getUpcomingEvents,
  getLatestNews,
  getHeroSlides,
  getImageUrl,
  formatNewsDate,
  formatEventDate,
  getEventTypeColor,
  getEventTypeLabel
} from '@/lib/sanity-queries'

export default function VEXTurkiyeLanding() {
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
  const [events, setEvents] = useState<SanityEvent[]>([])
  const [news, setNews] = useState<SanityNews[]>([])
  const [heroSlides, setHeroSlides] = useState<SanityHero[]>([])
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0)
  const [currentMobileNewsSlide, setCurrentMobileNewsSlide] = useState(0) // New State for Mobile

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const [fetchedEvents, fetchedNews, fetchedHeroSlides] = await Promise.all([
        getUpcomingEvents(),
        getLatestNews(5),
        getHeroSlides()
      ])
      setEvents(fetchedEvents.slice(0, 4))
      setNews(fetchedNews)
      setHeroSlides(fetchedHeroSlides)
    }
    fetchData()
  }, [])

  // Hero Slider Logic
  useEffect(() => {
    if (heroSlides.length === 0) return

    const duration = (heroSlides[currentHeroSlide]?.duration || 5) * 1000
    const timer = setTimeout(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length)
    }, duration)

    return () => clearTimeout(timer)
  }, [heroSlides, currentHeroSlide])

  // News Slider Logic
  const nextNewsSlide = () => {
    if (news.length === 0) return
    setCurrentNewsSlide((prev) => (prev + 1) % Math.ceil(news.length / 3))
  }

  const prevNewsSlide = () => {
    if (news.length === 0) return
    setCurrentNewsSlide((prev) => (prev - 1 + Math.ceil(news.length / 3)) % Math.ceil(news.length / 3))
  }

  // Mobile News Navigation
  const nextMobileNewsSlide = () => {
    if (news.length === 0) return
    setCurrentMobileNewsSlide((prev) => (prev + 1) % news.length)
  }

  const prevMobileNewsSlide = () => {
    if (news.length === 0) return
    setCurrentMobileNewsSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'TR' ? 'EN' : 'TR')
  }



  const content = {
    TR: {
      nav: {
        home: 'Ana Sayfa',
        corporate: 'Kurumsal',
        whatIsVex: 'VEX Nedir',
        competitions: 'Yarışmalar',
        teams: 'Takımlar',
        education: 'Eğitim & Kaynaklar',
        announcements: 'Duyurular',
        contact: 'İletişim'
      },
      hero: {
        headline: 'Geleceği Tasarla. Takımını Kur. Arenaya Çık.',
        subheadline: 'RECF Türkiye; robotik, drone, mühendislik ve teknoloji yarışmalarını Türkiye’de öğrenciler, eğitimciler ve kurumlarla buluşturuyor.',
        cta: 'Takımını Kaydet',
        learn: 'Programını Seç',
        eventsBtn: 'Etkinlikleri Gör'
      },
      programs: {
        title: 'Robotik Yarışmalarımız',
        subtitle: 'Her yaş ve seviye için tasarlanmış kapsamlı robotik yarışma programları',
        detailButton: 'Detaylı Bilgi'
      },
      competitions: {
        title: 'Yaklaşan Yarışmalar',
        subtitle: 'Takımınızı kaydedin ve heyecan verici robotik yarışmalarda yerinizi alın',
        viewAll: 'Tüm Yarışmaları Gör'
      },
      news: {
        title: 'Duyurular & Haberler',
        subtitle: 'RECF Türkiye ekosisteminden son gelişmeler ve duyurular',
        readMore: 'Devamını Oku'
      },
      cta: {
        title: 'Ekosisteme Katılın',
        subtitle: 'RECF Türkiye ailesinin bir parçası olun ve geleceği birlikte inşa edelim',
        formTitle: 'İletişim Formu',
        namePlaceholder: 'Adınız Soyadınız',
        emailPlaceholder: 'E-posta Adresiniz',
        phonePlaceholder: 'Telefon Numaranız',
        teamNoLabel: 'Takım No (Opsiyonel)',
        teamNoPlaceholder: 'Örn: 12345A',
        institutionLabel: 'Kurum/Okul Adı',
        institutionPlaceholder: 'Kurum veya okul adınız',
        cityLabel: 'Şehir',
        cityPlaceholder: 'Şehir seçiniz',
        roleLabel: 'Rolünüz',
        rolePlaceholder: 'Rol seçiniz',
        roleOptions: {
          mentor: 'Mentor',
          admin: 'Okul İdarecisi',
          parent: 'Veli',
          captain: 'Kaptan',
          member: 'Üye',
          sponsor: 'Potansiyel Sponsor'
        },
        purposeLabel: 'İletişim Amacı',
        purposePlaceholder: 'Seçiniz',
        purposeOptions: {
          team: 'Takım Başvurusu',
          mentor: 'Mentor Destek',
          feedback: 'Öneri/Şikayet'
        },
        messagePlaceholder: 'Mesajınız',
        submitButton: 'Gönder',
        partnersTitle: 'Güvenilen Partnerlerimiz'
      },
      whyVex: {
        label: 'NEDEN RECF?',
        title: 'Geleceği Şekillendiren Robotik Deneyimi',
        subtitle: 'REC Foundation, öğrencilere gerçek dünya mühendislik becerileri kazandırarak, onları geleceğin liderleri, yenilikçileri ve problem çözücüleri olarak yetiştiriyor.',
        cta: 'RECF Etkisini Keşfedin',
        cards: [
          {
            title: 'Temel Beceri Gelişimi',
            description: 'Mühendislik, matematik ve eleştirel düşünme becerilerini geliştiren uygulamalı projeler. Öğrenciler gerçek robotlar inşa ederek problem çözme yeteneklerini keskinleştiriyor.',
            link: 'RECF Hakkında',
            linkHref: '/kurumsal/hakkimizda'
          },
          {
            title: 'Kariyer Keşfi',
            description: 'Sektör profesyonelleri ve deneyimli mentorlarla çalışarak öğrenciler, STEM kariyerlerini keşfediyor ve geleceğin iş dünyasına hazırlanıyor.',
            link: 'Daha Fazla Bilgi',
            linkHref: '/kurumsal/biz-kimiz'
          },
          {
            title: 'Küresel Topluluk',
            description: 'Dünya çapında milyonlarca öğrenci ve mentordan oluşan devasa bir ağın parçası olun. Uluslararası şampiyona süreçlerinde Türkiye\'yi temsil edin.',
            link: 'Ekosisteme Katıl',
            linkHref: '/takimlar/nasil-kurulur'
          }
        ]
      },
      footer: {
        quickLinks: 'Hızlı Bağlantılar',
        programs: 'Programlar',
        resources: 'Kaynaklar',
        partners: 'Partnerlerimiz',
        copyright: '© 2026 RECF Türkiye. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji. Tüm hakları saklıdır.'
      }
    },
    EN: {
      nav: {
        home: 'Home',
        corporate: 'Corporate',
        whatIsVex: 'What is VEX',
        competitions: 'Competitions',
        teams: 'Teams',
        education: 'Education & Resources',
        announcements: 'Announcements',
        contact: 'Contact'
      },
      hero: {
        headline: 'Design the Future. Build Your Team. Step into the Arena.',
        subheadline: 'RECF Türkiye brings robotics, drone, engineering, and technology competitions to students, educators, and institutions in Turkey.',
        cta: 'Register Team',
        learn: 'Choose Program',
        eventsBtn: 'View Events'
      },
      programs: {
        title: 'Our Robotics Competitions',
        subtitle: 'Comprehensive robotics competition programs designed for all ages and skill levels',
        detailButton: 'Learn More'
      },
      competitions: {
        title: 'Upcoming Competitions',
        subtitle: 'Register your team and compete in exciting robotics challenges',
        viewAll: 'View All Competitions'
      },
      news: {
        title: 'News & Announcements',
        subtitle: 'Latest updates and announcements from RECF Turkey ecosystem',
        readMore: 'Read More'
      },
      cta: {
        title: 'Join Our Ecosystem',
        subtitle: 'Become part of the VEX Turkey family and build the future together',
        formTitle: 'Contact Form',
        namePlaceholder: 'Your Full Name',
        emailPlaceholder: 'Your Email Address',
        phonePlaceholder: 'Your Phone Number',
        teamNoLabel: 'Team No (Optional)',
        teamNoPlaceholder: 'e.g., 12345A',
        institutionLabel: 'Institution/School Name',
        institutionPlaceholder: 'Your institution or school name',
        cityLabel: 'City',
        cityPlaceholder: 'Select city',
        roleLabel: 'Your Role',
        rolePlaceholder: 'Select role',
        roleOptions: {
          mentor: 'Mentor',
          admin: 'School Administrator',
          parent: 'Parent',
          captain: 'Captain',
          member: 'Member',
          sponsor: 'Potential Sponsor'
        },
        purposeLabel: 'Contact Purpose',
        purposePlaceholder: 'Select',
        purposeOptions: {
          team: 'Team Application',
          mentor: 'Mentor Support',
          feedback: 'Suggestion/Complaint'
        },
        messagePlaceholder: 'Your Message',
        submitButton: 'Submit',
        partnersTitle: 'Our Trusted Partners'
      },
      whyVex: {
        label: 'WHY VEX?',
        title: 'Robotics Experience Shaping the Future',
        subtitle: 'VEX Robotics equips students with real-world engineering skills, nurturing them to become future leaders, innovators, and problem-solvers.',
        cta: 'Discover VEX Impact',
        cards: [
          {
            title: 'Core Skill Development',
            description: 'Hands-on projects that develop engineering, mathematics, and critical thinking skills. Students sharpen problem-solving abilities by building real robots.',
            link: 'About VEX',
            linkHref: '/about-vex'
          },
          {
            title: 'Career Exploration',
            description: 'By working with industry professionals and experienced mentors, students discover STEM careers and prepare for the future job market.',
            link: 'Learn More',
            linkHref: '/career'
          },
          {
            title: 'Global Community',
            description: 'Become part of a massive network of millions of students and mentors from 80+ countries. Represent Turkey in international competitions.',
            link: 'Join Ecosystem',
            linkHref: '/join'
          }
        ]
      },
      footer: {
        quickLinks: 'Quick Links',
        programs: 'Programs',
        resources: 'Resources',
        partners: 'Our Partners',
        copyright: '© 2024 VEX Turkey. All rights reserved.'
      }
    }
  }

  // Programs data
  const programs = [

    {
      id: 'engage',
      name: 'Engage',
      description: language === 'TR'
        ? 'İlkokul öğrencileri için tasarlanmış, eğlenceli ve eğitici robotik başlangıç programı.'
        : 'Fun and educational robotics starter program designed for elementary students.',
      ageGroup: language === 'TR' ? 'İlkokul' : 'Elementary',
      level: language === 'TR' ? 'Başlangıç' : 'Beginner',
      image: '/vex-go.jpg'
    },
    {
      id: 'achieve',
      name: 'Achieve',
      description: language === 'TR'
        ? 'Ortaokul ve lise seviyesi için takım çalışması ve problem çözme odaklı program.'
        : 'Teamwork and problem-solving focused program for middle and high school levels.',
      ageGroup: language === 'TR' ? 'Ortaokul/Lise' : 'Middle/High School',
      level: language === 'TR' ? 'Orta' : 'Intermediate',
      image: '/vex-iq.jpg'
    },
    {
      id: 'inspire',
      name: 'Inspire',
      description: language === 'TR'
        ? 'Gelişmiş robotik projeleriyle öğrencilere mühendislik becerileri kazandıran program.'
        : 'Program providing engineering skills to students through advanced robotics projects.',
      ageGroup: language === 'TR' ? 'Lise/Üniversite' : 'High School/University',
      level: language === 'TR' ? 'İleri' : 'Advanced',
      image: '/vex-v5.jpg'
    },
    {
      id: 'adc',
      name: 'Aerial Drone Competition (ADC)',
      description: language === 'TR'
        ? 'Öğrencileri drone teknolojisi ve programlama ile buluşturan heyecan verici yarışma.'
        : 'Exciting competition bringing students together with drone technology and programming.',
      ageGroup: language === 'TR' ? 'Ortaokul/Lise' : 'Middle/High School',
      level: language === 'TR' ? 'Tüm Seviyeler' : 'All Levels',
      image: '/vex-u.jpg'
    },
    {
      id: 'adc-pro',
      name: 'ADC Pro',
      description: language === 'TR'
        ? 'Üniversite öğrencileri için profesyonel seviye otonom drone yarışması.'
        : 'Professional level autonomous drone competition for university students.',
      ageGroup: language === 'TR' ? 'Üniversite' : 'University',
      level: language === 'TR' ? 'Profesyonel' : 'Professional',
      image: '/vex-u.jpg'
    }
  ]

  // Competitions data
  const upcomingCompetitions = [
    {
      id: 1,
      name: 'VEX IQ İstanbul Bölgesel Turnuvası',
      date: '15 Mart 2024',
      location: 'İstanbul Teknik Üniversitesi',
      status: language === 'TR' ? 'Kayıtlar Açık' : 'Registration Open',
      statusColor: 'success',
      category: 'VEX IQ',
      eventType: language === 'TR' ? 'Regional' : 'Regional'
    },
    {
      id: 2,
      name: 'VEX V5 Ankara Şampiyonası',
      date: '22 Mart 2024',
      location: 'ODTÜ Teknokent',
      status: language === 'TR' ? 'Yakında' : 'Coming Soon',
      statusColor: 'warning',
      category: 'VEX V5',
      eventType: language === 'TR' ? 'Offseason' : 'Offseason'
    },
    {
      id: 3,
      name: 'VEX Robotics Ulusal Finalleri',
      date: '5 Nisan 2024',
      location: 'İzmir Fuar Merkezi',
      status: language === 'TR' ? 'Kayıtlar Açık' : 'Registration Open',
      statusColor: 'success',
      category: 'VEX V5',
      eventType: language === 'TR' ? 'Regional' : 'Regional'
    },
    {
      id: 4,
      name: 'VEX GO İlkokul Şenliği',
      date: '12 Nisan 2024',
      location: 'Ankara - Bilkent',
      status: language === 'TR' ? 'Sınırlı Kontenjan' : 'Limited Spots',
      statusColor: 'info',
      category: 'VEX GO',
      eventType: language === 'TR' ? 'Offseason' : 'Offseason'
    }
  ]

  const turkishCities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
    'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
    'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
    'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
    'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye',
    'Düzce'
  ];

  const t = content[language]

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-white text-foreground">
        {/* Navigation */}
        <Navbar language={language} onLanguageToggle={toggleLanguage} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gray-50">
          {/* Dynamic Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/10 z-10" /> {/* Dark overlay for readability */}
            {heroSlides.length > 0 ? (
              <m.div
                key={currentHeroSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <m.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10 }} // Subtle zoom effect
                  className="w-full h-full"
                >
                  <Image
                    src={getImageUrl(heroSlides[currentHeroSlide].backgroundImage, 1920, 1080)}
                    alt={heroSlides[currentHeroSlide].title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    unoptimized
                  />
                </m.div>
              </m.div>
            ) : (
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage: 'url(/hero-vex.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white z-20" />
          </div>

          {/* Content */}
          <div className="relative z-30 container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-7xl">
            <div className="max-w-5xl mx-auto text-center">

              {/* Dynamic Headline & Subheadline */}
              <div className="min-h-[300px] flex flex-col items-center justify-center mb-8">
                {heroSlides.length > 0 ? (
                  <m.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-balance text-gray-900 drop-shadow-sm">
                      {heroSlides[currentHeroSlide].title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto text-pretty leading-relaxed font-medium">
                      {heroSlides[currentHeroSlide].subtitle}
                    </p>
                  </m.div>
                ) : (
                  <>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-balance text-gray-900">
                      {t.hero.headline}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
                      {t.hero.subheadline}
                    </p>
                  </>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/takimlar/nasil-kurulur">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    {t.hero.cta}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vex-nedir" aria-label="VEX Nedir - Daha fazla bilgi">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-lg bg-transparent backdrop-blur-sm"
                  >
                    {t.hero.learn}
                  </Button>
                </Link>
              </div>


            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gray-600 rounded-full" />
            </div>
          </div>
        </section>


        {/* News & Announcements Section */}
        <section className="relative py-12 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-gray-900">
                {t.news.title}
              </h2>
              <p className="text-lg text-gray-600 text-pretty leading-relaxed">
                {t.news.subtitle}
              </p>
            </div>

            {/* Dynamic Slider Container */}
            <div className="relative">
              {/* Nav Buttons */}
              {news.length > 3 && (
                <>
                  <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20 hidden md:block">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white shadow-lg border-gray-100 w-12 h-12 hover:bg-primary hover:text-white transition-all"
                      onClick={prevNewsSlide}
                      aria-label="Önceki haberler"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20 hidden md:block">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white shadow-lg border-gray-100 w-12 h-12 hover:bg-primary hover:text-white transition-all"
                      onClick={nextNewsSlide}
                      aria-label="Sonraki haberler"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>


                </>
              )}

              {/* Slider Content - Desktop */}
              <div className="hidden md:block overflow-hidden mt-8 md:mt-0">
                <m.div
                  className="flex"
                  animate={{ x: `-${currentNewsSlide * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {Array.from({ length: Math.ceil(news.length / 3) }).map((_, pageIndex) => (
                    <div key={pageIndex} className="min-w-full grid grid-cols-3 gap-8 px-4 py-2">
                      {news.slice(pageIndex * 3, (pageIndex + 1) * 3).map((item, index) => (
                        <div
                          key={item._id}
                          className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
                        >
                          {/* Image */}
                          <div className="relative h-56 bg-gray-100 overflow-hidden shrink-0">
                            <Image
                              src={getImageUrl(item.mainImage, 600, 400)}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                              <Calendar className="h-4 w-4" />
                              <span>{formatNewsDate(item.publishedAt)}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                              {item.excerpt}
                            </p>

                            {/* Read More Link */}
                            <div className="mt-auto pt-4">
                              <Link href={`/duyurular/haberler/${item.slug.current}`}>
                                <button className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold group/btn transition-colors">
                                  {t.news.readMore}
                                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </m.div>
              </div>

              {/* Slider Content - Mobile */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden">
                  <m.div
                    className="flex"
                    animate={{ x: `-${currentMobileNewsSlide * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {news.map((item) => (
                      <div key={item._id} className="min-w-full px-4">
                        <div
                          className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full flex flex-col"
                        >
                          {/* Image */}
                          <div className="relative h-56 bg-gray-100 overflow-hidden shrink-0">
                            <Image
                              src={getImageUrl(item.mainImage, 600, 400)}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                              <Calendar className="h-4 w-4" />
                              <span>{formatNewsDate(item.publishedAt)}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                              {item.excerpt}
                            </p>

                            {/* Read More Link */}
                            <div className="mt-auto pt-4">
                              <Link href={`/duyurular/haberler/${item.slug.current}`}>
                                <button className="inline-flex items-center text-primary text-sm font-semibold">
                                  {t.news.readMore}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </m.div>
                </div>

                {/* Mobile Nav Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white shadow-md border-gray-100 w-10 h-10"
                    onClick={prevMobileNewsSlide}
                    aria-label="Önceki haber"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white shadow-md border-gray-100 w-10 h-10"
                    onClick={nextMobileNewsSlide}
                    aria-label="Sonraki haber"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section >


        {/* VEX V5 Season Section */}
        < V5SeasonSection language={language} />

        <section className="relative py-12 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-gray-900">
                {t.programs.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 text-pretty leading-relaxed">
                {t.programs.subtitle}
              </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Program Name */}
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full border border-red-200">
                        {program.ageGroup}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                        {program.level}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {program.description}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Link href={`/vex-nedir/${program.id}`}>
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary bg-transparent transition-all"
                        >
                          {t.programs.detailButton}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Competitions Section */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-gray-900">
                  {t.competitions.title}
                </h2>
                <p className="text-lg text-gray-600 text-pretty leading-relaxed">
                  {t.competitions.subtitle}
                </p>
              </div>
              <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {t.competitions.viewAll}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Dynamic Competitions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.slice(0, 4).map((event) => {
                const colors = getEventTypeColor(event.eventType)
                const label = getEventTypeLabel(event.eventType)
                return (
                  <div
                    key={event._id}
                    className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded border border-primary/20">
                              {event.platform.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                              {label}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                            {event.name}
                          </h3>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{formatEventDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{event.city}, {event.venue}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <Link href={`/yarismalar/etkinlik-takvimi/tum-etkinlikler/${event.slug.current}`} className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-gray-700 hover:text-primary hover:bg-gray-50 group/btn"
                        >
                          <span>{language === 'TR' ? 'Detayları Görüntüle' : 'View Details'}</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why VEX Section */}
        <section className="relative py-24 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              {/* Label */}
              <div className="inline-block mb-4">
                <span className="text-sm font-bold tracking-widest text-primary uppercase">
                  {t.whyVex.label}
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-gray-900 leading-tight">
                {t.whyVex.title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 text-pretty leading-relaxed max-w-3xl mx-auto mb-10">
                {t.whyVex.subtitle}
              </p>

              {/* CTA Button */}
              <Link href="/vex-nedir">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {t.whyVex.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Three Column Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {/* Card 1 - Temel Beceri Gelişimi */}
              <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {t.whyVex.cards[0].title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.whyVex.cards[0].description}
                </p>

                {/* Link */}
                <Link
                  href="/vex-nedir"
                  className="inline-flex items-center text-primary font-semibold hover:underline group/link mt-auto"
                  aria-label="Temel beceri gelişimi hakkında bilgi"
                >
                  {t.whyVex.cards[0].link}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Card 2 - Kariyer Keşfi */}
              <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {t.whyVex.cards[1].title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.whyVex.cards[1].description}
                </p>

                {/* Link */}
                <Link
                  href="/kaynaklar/mufredat"
                  className="inline-flex items-center text-primary font-semibold hover:underline group/link mt-auto"
                  aria-label="Kariyer keşfi - Müfredatlar hakkında bilgi"
                >
                  {t.whyVex.cards[1].link}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Card 3 - Küresel Topluluk */}
              <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {t.whyVex.cards[2].title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.whyVex.cards[2].description}
                </p>

                {/* Link */}
                <Link
                  href="/takimlar/nasil-kurulur"
                  className="inline-flex items-center text-primary font-semibold hover:underline group/link mt-auto"
                  aria-label="Küresel topluluk - Nasıl takım kurulur"
                >
                  {t.whyVex.cards[2].link}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Takım Kurma Adımları Section */}
        <section className="relative py-24 bg-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {language === 'TR' ? 'Takım Kurma Adımları' : 'Team Building Steps'}
              </h2>
              <p className="text-lg text-gray-600">
                {language === 'TR' 
                  ? 'RECF Türkiye ekosistemine katılmak ve kendi takımınızı kurmak için izlemeniz gereken temel adımlar.' 
                  : 'Basic steps to follow to join the RECF Turkey ecosystem and build your own team.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: language === 'TR' ? 'Program Seçimi' : 'Program Selection',
                  desc: language === 'TR' ? 'Öğrencilerinizin yaş grubuna uygun (Engage, Achieve, vb.) programı belirleyin.' : 'Determine the appropriate program (Engage, Achieve, etc.) for your students age group.'
                },
                {
                  step: '02',
                  title: language === 'TR' ? 'Ekipman Temini' : 'Equipment Procurement',
                  desc: language === 'TR' ? 'Seçtiğiniz programa uygun eğitim ve yarışma setlerini edinin.' : 'Acquire the education and competition kits suitable for your chosen program.'
                },
                {
                  step: '03',
                  title: language === 'TR' ? 'Resmi Kayıt' : 'Official Registration',
                  desc: language === 'TR' ? 'RECFevents üzerinden takımınızı resmi olarak kaydedin.' : 'Officially register your team via RECFevents.'
                },
                {
                  step: '04',
                  title: language === 'TR' ? 'Hazırlık & Yarışma' : 'Preparation & Competition',
                  desc: language === 'TR' ? 'Robotunuzu inşa edin, kodlayın ve etkinliklerde yerinizi alın.' : 'Build your robot, code it, and take your place in events.'
                }
              ].map((item, i) => (
                <div key={i} className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group">
                  <div className="text-4xl font-black text-primary/10 mb-4 group-hover:text-primary/20 transition-colors">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/takimlar/nasil-kurulur">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg shadow-md">
                  {language === 'TR' ? 'Detaylı Rehberi İncele' : 'View Detailed Guide'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* RECF-VEX Ayrım Bildirimi Section */}
        <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-6 max-w-5xl text-center">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'TR' ? 'RECF ve VEX Robotics Hakkında Önemli Bilgilendirme' : 'Important Notice About RECF and VEX Robotics'}
             </h3>
             <p className="text-gray-600 leading-relaxed">
                {language === 'TR' 
                  ? 'Robotics Education & Competition Foundation (RECF), yarışmaları ve eğitim programlarını yöneten bağımsız bir kâr amacı gütmeyen kuruluştur. VEX Robotics ise bu yarışmalarda kullanılan donanım ve eğitim setlerinin üreticisidir. Türkiye\'deki tüm yarışma ve etkinlik operasyonları Intechne Teknoloji tarafından yürütülmektedir.'
                  : 'The Robotics Education & Competition Foundation (RECF) is an independent non-profit organization that manages competitions and educational programs. VEX Robotics is the manufacturer of the hardware and educational kits used in these competitions. All competition and event operations in Turkey are managed by Intechne Teknoloji.'}
             </p>
          </div>
        </section>


        {/* Community Section */}
        <CommunitySection language={language} />




        {/* CTA & Partners Section */}
        < section className="relative py-24 bg-secondary overflow-hidden" >

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-gray-900">
                  {t.cta.title}
                </h2>
                <p className="text-lg text-gray-600 text-pretty leading-relaxed max-w-2xl mx-auto">
                  {t.cta.subtitle}
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.cta.formTitle}</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">
                        {t.cta.namePlaceholder}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder={t.cta.namePlaceholder}
                          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        {t.cta.emailPlaceholder}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.cta.emailPlaceholder}
                          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        {t.cta.phonePlaceholder}
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder={t.cta.phonePlaceholder}
                          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Team No Field (Optional) */}
                    <div className="space-y-2">
                      <Label htmlFor="teamNo" className="text-gray-700">
                        {t.cta.teamNoLabel}
                      </Label>
                      <Input
                        id="teamNo"
                        placeholder={t.cta.teamNoPlaceholder}
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Institution Field */}
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-gray-700">
                      {t.cta.institutionLabel}
                    </Label>
                    <Input
                      id="institution"
                      placeholder={t.cta.institutionPlaceholder}
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City Field */}
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700">
                        {t.cta.cityLabel}
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-primary" aria-label="Şehir seçiniz">
                          <SelectValue placeholder={t.cta.cityPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {turkishCities.map((city) => (
                            <SelectItem key={city} value={city.toLowerCase()}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role Field */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-700">
                        {t.cta.roleLabel}
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-primary" aria-label="Rol seçiniz">
                          <SelectValue placeholder={t.cta.rolePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mentor">{t.cta.roleOptions.mentor}</SelectItem>
                          <SelectItem value="admin">{t.cta.roleOptions.admin}</SelectItem>
                          <SelectItem value="parent">{t.cta.roleOptions.parent}</SelectItem>
                          <SelectItem value="captain">{t.cta.roleOptions.captain}</SelectItem>
                          <SelectItem value="member">{t.cta.roleOptions.member}</SelectItem>
                          <SelectItem value="sponsor">{t.cta.roleOptions.sponsor}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Purpose Field */}
                  <div className="space-y-2">
                    <Label htmlFor="purpose" className="text-gray-700">
                      {t.cta.purposeLabel}
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-primary" aria-label="Amaç seçiniz">
                        <SelectValue placeholder={t.cta.purposePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team">{t.cta.purposeOptions.team}</SelectItem>
                        <SelectItem value="mentor">{t.cta.purposeOptions.mentor}</SelectItem>
                        <SelectItem value="feedback">{t.cta.purposeOptions.feedback}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      {t.cta.messagePlaceholder}
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="message"
                        placeholder={t.cta.messagePlaceholder}
                        rows={5}
                        className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-12 py-6 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {t.cta.submitButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>


            </div>
          </div>
        </section >

        {/* Footer */}
        {/* Footer */}
        {/* Footer */}
        <footer className="relative bg-[#0f172a] border-t border-gray-800 text-gray-300">
          <div className="container mx-auto px-6 max-w-7xl py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Column 1 - Brand Identity */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="text-2xl font-black tracking-tight text-white flex flex-col">
                    <span>RECF TÜRKİYE</span>
                    <span className="text-xs font-normal text-gray-400">Temsilci: Intechne Teknoloji</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                  RECF Türkiye: Robotics Education & Competition Foundation resmi platformu. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji.
                </p>
                <a
                  href="https://instagram.com/vexroboticsturkiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-sm font-medium">@vexroboticsturkiye</span>
                </a>
              </div>

              {/* Column 2 - VEX Ecosystem */}
              <div>
                <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">VEX NEDİR?</h3>
                <ul className="space-y-3 text-sm">

                  <li>
                    <Link href="/vex-nedir/vex-iq" className="hover:text-primary transition-colors">RECF Engage</Link>
                  </li>
                  <li>
                    <Link href="/vex-nedir/vex-v5" className="hover:text-primary transition-colors">RECF Achieve</Link>
                  </li>
                  <li>
                    <Link href="/vex-nedir/vex-u" className="hover:text-primary transition-colors">RECF Inspire</Link>
                  </li>
                  <li>
                    <Link href="/kaynaklar/mufredat" className="hover:text-primary transition-colors">Müfredatlar</Link>
                  </li>
                  <li>
                    <Link href="/kaynaklar/yazilim" className="hover:text-primary transition-colors">Yazılım (VEXcode)</Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Participation */}
              <div>
                <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">KATILIM</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/yarismalar/etkinlik-takvimi/tum-etkinlikler" className="hover:text-primary transition-colors">Tüm Etkinlikler</Link>
                  </li>
                  <li>
                    <Link href="/yarismalar/sezon-temasi" className="hover:text-primary transition-colors">Sezon Teması</Link>
                  </li>
                  <li>
                    <Link href="/takimlar/nasil-kurulur" className="hover:text-primary transition-colors">RECF Takımı Nasıl Kurulur?</Link>
                  </li>
                  <li>
                    <Link href="/takimlar/kayit" className="hover:text-primary transition-colors">RECF Takım Kaydı</Link>
                  </li>
                  <li>
                    <Link href="/takimlar/mentor" className="hover:text-primary transition-colors">Mentor Desteği</Link>
                  </li>
                </ul>
              </div>

              {/* Column 4 - Contact */}
              <div>
                <h3 className="text-red-400 font-bold mb-6 text-lg tracking-wide uppercase">BİZE ULAŞIN</h3>
                <ul className="space-y-3 text-sm mb-6">
                  <li>
                    <Link href="/kurumsal/hakkimizda" className="hover:text-primary transition-colors">RECF Türkiye Hakkında</Link>
                  </li>
                  <li>
                    <Link href="/kurumsal/sponsorlar-ve-partnerler" className="hover:text-primary transition-colors">İş Birlikleri ve Destekleyen Kurumlar</Link>
                  </li>
                  <li>
                    <Link href="/kurumsal/gonullu-olun" className="hover:text-primary transition-colors">RECF Türkiye Gönüllülük</Link>
                  </li>
                </ul>
                <div className="space-y-4 text-sm pt-4 border-t border-gray-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-400">Ünalan, Ünalan Cd., 34500 Üsküdar/İstanbul</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <a href="tel:+905346349058" className="text-gray-400 hover:text-white transition-colors">
                      +90 534 634 90 58
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright Bar */}
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <p>© 2026 RECF Türkiye. Türkiye Temsilcisi ve Yerel Operasyon Yürütücüsü: Intechne Teknoloji. Tüm Hakları Saklıdır.</p>
              <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-primary transition-colors">Kullanım Koşulları</Link>
                <Link href="#" className="hover:text-primary transition-colors">KVKK</Link>
              </div>
            </div>
          </div>
        </footer>
      </div >
    </LazyMotion>
  )
}


