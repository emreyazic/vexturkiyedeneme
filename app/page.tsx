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
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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

  // Countdown timer effect
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime()
      const championshipDate = new Date('2026-02-28T00:00:00').getTime()
      const distance = championshipDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

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
        headline: 'Geleceğin Mühendislerini Yetiştiriyoruz',
        subheadline: 'VEX Robotik ile STEM eğitiminde dünya standartlarında bir ekosistem oluşturuyoruz',
        cta: 'Ekosisteme Katıl',
        learn: 'Daha Fazla Bilgi'
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
      stats: {
        cities: 'Şehir',
        schools: 'Okul',
        students: 'Öğrenci',
        mentors: 'Mentor'
      },
      news: {
        title: 'Duyurular & Haberler',
        subtitle: 'VEX Türkiye ekosisteminden son gelişmeler ve duyurular',
        readMore: 'Devamını Oku'
      },
      countdown: {
        title: 'VEX Türkiye Şampiyonası',
        days: 'Gün',
        hours: 'Saat',
        minutes: 'Dakika',
        seconds: 'Saniye'
      },

      teamOfMonth: {
        title: 'Ayın Takımı',
        subtitle: 'Bu ayın öne çıkan takımını kutluyoruz',
        featured: 'Öne Çıkan',
        story: 'Başarı Hikayesi'
      },
      cta: {
        title: 'Ekosisteme Katılın',
        subtitle: 'VEX Türkiye ailesinin bir parçası olun ve geleceği birlikte inşa edelim',
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
        label: 'NEDEN VEX?',
        title: 'Geleceği Şekillendiren Robotik Deneyimi',
        subtitle: 'VEX Robotics, öğrencilere gerçek dünya mühendislik becerileri kazandırarak, onları geleceğin liderleri, yenilikçileri ve problem çözücüleri olarak yetiştiriyor.',
        cta: 'VEX Etkisini Keşfedin',
        cards: [
          {
            title: 'Temel Beceri Gelişimi',
            description: 'Mühendislik, matematik ve eleştirel düşünme becerilerini geliştiren uygulamalı projeler. Öğrenciler gerçek robotlar inşa ederek problem çözme yeteneklerini keskinleştiriyor.',
            link: 'VEX Hakkında',
            linkHref: '/vex-hakkinda'
          },
          {
            title: 'Kariyer Keşfi',
            description: 'Sektör profesyonelleri ve deneyimli mentorlarla çalışarak öğrenciler, STEM kariyerlerini keşfediyor ve geleceğin iş dünyasına hazırlanıyor.',
            link: 'Daha Fazla Bilgi',
            linkHref: '/kariyer'
          },
          {
            title: 'Küresel Topluluk',
            description: '80+ ülkeden milyonlarca öğrenci ve mentordan oluşan devasa bir ağın parçası olun. Uluslararası yarışmalarda Türkiye\'yi temsil edin.',
            link: 'Ekosisteme Katıl',
            linkHref: '/katil'
          }
        ]
      },
      footer: {
        quickLinks: 'Hızlı Bağlantılar',
        programs: 'Programlar',
        resources: 'Kaynaklar',
        partners: 'Partnerlerimiz',
        copyright: '© 2024 VEX Türkiye. Tüm hakları saklıdır.'
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
        headline: 'Building Future Engineers',
        subheadline: 'Creating a world-class STEM education ecosystem with VEX Robotics',
        cta: 'Join Ecosystem',
        learn: 'Learn More'
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
      stats: {
        cities: 'Cities',
        schools: 'Schools',
        students: 'Students',
        mentors: 'Mentors'
      },
      news: {
        title: 'News & Announcements',
        subtitle: 'Latest updates and announcements from VEX Turkey ecosystem',
        readMore: 'Read More'
      },
      countdown: {
        title: 'VEX Turkey Championship',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds'
      },

      teamOfMonth: {
        title: 'Team of the Month',
        subtitle: 'Celebrating this month\'s outstanding team',
        featured: 'Featured',
        story: 'Success Story'
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
      id: 'vex-go',
      name: 'VEX GO',
      description: language === 'TR'
        ? 'İlkokul öğrencileri için tasarlanmış, eğlenceli ve eğitici robotik başlangıç programı. STEM becerilerini oyun ile geliştirin.'
        : 'Fun and educational robotics starter program designed for elementary students. Develop STEM skills through play.',
      ageGroup: language === 'TR' ? '6-11 Yaş' : 'Ages 6-11',
      level: language === 'TR' ? 'İlkokul' : 'Elementary',
      image: '/vex-go.jpg'
    },
    {
      id: 'vex-iq',
      name: 'VEX IQ',
      description: language === 'TR'
        ? 'Ortaokul seviyesi için yarışma odaklı robotik program. Takım çalışması ve problem çözme becerilerini geliştirin.'
        : 'Competition-focused robotics program for middle school level. Develop teamwork and problem-solving skills.',
      ageGroup: language === 'TR' ? '8-14 Yaş' : 'Ages 8-14',
      level: language === 'TR' ? 'Ortaokul' : 'Middle School',
      image: '/vex-iq.jpg'
    },
    {
      id: 'vex-v5',
      name: 'VEX V5',
      description: language === 'TR'
        ? 'Lise seviyesi için profesyonel robotik platform. Gerçek mühendislik deneyimi kazanın ve yarışmalarda yerinizi alın.'
        : 'Professional robotics platform for high school level. Gain real engineering experience and compete.',
      ageGroup: language === 'TR' ? '14-18 Yaş' : 'Ages 14-18',
      level: language === 'TR' ? 'Lise' : 'High School',
      image: '/vex-v5.jpg'
    },
    {
      id: 'vex-u',
      name: 'VEX U',
      description: language === 'TR'
        ? 'Üniversite seviyesi için en gelişmiş robotik yarışma platformu. Karmaşık mühendislik projelerinde uzmanlaşın.'
        : 'The most advanced robotics competition platform for university level. Specialize in complex engineering projects.',
      ageGroup: language === 'TR' ? '18+ Yaş' : 'Ages 18+',
      level: language === 'TR' ? 'Üniversite' : 'University',
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

  // Stats data
  const stats = [
    {
      id: 'cities',
      value: 42,
      label: language === 'TR' ? 'Şehir' : 'Cities',
      icon: Building2
    },
    {
      id: 'schools',
      value: 250,
      label: language === 'TR' ? 'Okul' : 'Schools',
      icon: School
    },
    {
      id: 'students',
      value: 5000,
      label: language === 'TR' ? 'Öğrenci' : 'Students',
      icon: GraduationCap
    },
    {
      id: 'mentors',
      value: 380,
      label: language === 'TR' ? 'Mentor' : 'Mentors',
      icon: Users
    }
  ]

  // News/Announcements data
  const newsItems = [
    {
      id: 1,
      title: language === 'TR'
        ? 'VEX Türkiye 2024 Ulusal Finalleri Açıklandı'
        : 'VEX Turkey 2024 National Finals Announced',
      excerpt: language === 'TR'
        ? 'Bu yılın en büyük robotik etkinliği 5 Nisan\'da İzmir\'de gerçekleşecek. Kayıtlar devam ediyor.'
        : 'This year\'s biggest robotics event will take place on April 5th in Izmir. Registrations are ongoing.',
      date: '15 Şubat 2024',
      image: '/news-1.jpg',
      category: language === 'TR' ? 'Yarışmalar' : 'Competitions'
    },
    {
      id: 2,
      title: language === 'TR'
        ? 'Yeni VEX GO Eğitim Programı Başlıyor'
        : 'New VEX GO Education Program Launching',
      excerpt: language === 'TR'
        ? 'İlkokul öğrencileri için özel tasarlanmış robotik eğitim programı Mart ayında başlıyor.'
        : 'Specially designed robotics education program for elementary students starts in March.',
      date: '10 Şubat 2024',
      image: '/news-2.jpg',
      category: language === 'TR' ? 'Eğitim' : 'Education'
    },
    {
      id: 3,
      title: language === 'TR'
        ? 'Mentor Eğitim Seminerleri Kayıtları Açıldı'
        : 'Mentor Training Seminar Registrations Open',
      excerpt: language === 'TR'
        ? 'Geleceğin mentorlarını yetiştireceğimiz eğitim programı için başvurular başladı.'
        : 'Applications have started for the training program where we will train future mentors.',
      date: '5 Şubat 2024',
      image: '/news-3.jpg',
      category: language === 'TR' ? 'Eğitim' : 'Education'
    }
  ]

  // Partner logos data (for marquee)
  const partners = [
    'TÜBİTAK',
    'MEB',
    'TÜSİAD',
    'ODTÜ Teknokent',
    'İTÜ',
    'Boğaziçi Üniversitesi',
    'Sabancı Üniversitesi',
    'TEKNOFEST'
  ]

  // Turkey provinces data with accurate geographic SVG paths
  const turkeyProvinces = [
    {
      id: 'istanbul',
      name: 'İstanbul',
      teams: 150,
      path: 'M 295,145 L 310,140 L 320,145 L 325,155 L 320,165 L 305,170 L 295,165 L 290,155 Z'
    },
    {
      id: 'ankara',
      name: 'Ankara',
      teams: 95,
      path: 'M 430,185 L 460,180 L 485,190 L 495,210 L 485,230 L 460,240 L 435,230 L 425,210 Z'
    },
    {
      id: 'izmir',
      name: 'İzmir',
      teams: 78,
      path: 'M 220,220 L 245,215 L 265,225 L 270,245 L 260,260 L 235,265 L 215,255 L 210,235 Z'
    },
    {
      id: 'bursa',
      name: 'Bursa',
      teams: 45,
      path: 'M 280,175 L 305,170 L 320,180 L 320,200 L 305,210 L 280,205 L 270,190 Z'
    },
    {
      id: 'antalya',
      name: 'Antalya',
      teams: 38,
      path: 'M 360,310 L 390,305 L 415,320 L 420,345 L 405,365 L 375,370 L 355,355 L 350,330 Z'
    },
    {
      id: 'adana',
      name: 'Adana',
      teams: 42,
      path: 'M 490,285 L 520,280 L 540,295 L 545,320 L 530,335 L 505,340 L 485,325 L 480,305 Z'
    },
    {
      id: 'konya',
      name: 'Konya',
      teams: 32,
      path: 'M 395,250 L 435,240 L 470,255 L 480,285 L 465,310 L 430,320 L 390,305 L 380,275 Z'
    },
    {
      id: 'gaziantep',
      name: 'Gaziantep',
      teams: 28,
      path: 'M 580,285 L 610,280 L 630,295 L 635,315 L 620,330 L 595,335 L 575,320 L 570,300 Z'
    },
    {
      id: 'sanliurfa',
      name: 'Şanlıurfa',
      teams: 25,
      path: 'M 640,300 L 670,295 L 690,310 L 695,330 L 680,345 L 655,350 L 635,335 L 630,315 Z'
    },
    {
      id: 'kocaeli',
      name: 'Kocaeli',
      teams: 48,
      path: 'M 315,155 L 335,150 L 350,160 L 350,175 L 335,185 L 315,180 L 305,170 Z'
    },
    {
      id: 'mersin',
      name: 'Mersin',
      teams: 35,
      path: 'M 455,315 L 485,310 L 510,325 L 515,345 L 500,360 L 470,365 L 450,350 L 445,330 Z'
    },
    {
      id: 'eskisehir',
      name: 'Eskişehir',
      teams: 30,
      path: 'M 340,210 L 365,205 L 385,215 L 390,235 L 375,245 L 350,250 L 335,240 L 330,225 Z'
    },
    {
      id: 'diyarbakir',
      name: 'Diyarbakır',
      teams: 26,
      path: 'M 700,250 L 730,245 L 750,260 L 755,280 L 740,295 L 715,300 L 695,285 L 690,265 Z'
    },
    {
      id: 'kayseri',
      name: 'Kayseri',
      teams: 33,
      path: 'M 520,210 L 550,205 L 575,220 L 580,240 L 565,255 L 540,260 L 515,245 L 510,225 Z'
    },
    {
      id: 'samsun',
      name: 'Samsun',
      teams: 29,
      path: 'M 505,100 L 540,95 L 565,110 L 570,130 L 555,145 L 525,150 L 500,135 L 495,115 Z'
    }
  ]

  // Turkish cities for dropdown
  const turkishCities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya',
    'Gaziantep', 'Kayseri', 'Eskişehir', 'Mersin', 'Diyarbakır', 'Samsun'
  ].sort()

  // Team of the Month data
  const teamOfMonth = {
    number: '12345A',
    name: 'Robotik Yıldızlar',
    school: 'İstanbul Teknik Lisesi',
    story: language === 'TR'
      ? 'Ulusal finallerde birinci olan takımımız, yenilikçi tasarımı ve mükemmel takım çalışması ile dikkat çekti. Otonom görevlerde %98 başarı oranına ulaşarak rekor kırdılar.'
      : 'Our first-place national finals team stood out with their innovative design and excellent teamwork. They broke records by achieving a 98% success rate in autonomous tasks.',
    image: '/team-of-month.jpg',
    achievements: ['1. Ulusal Final', 'En İyi Tasarım Ödülü', 'Takım Ruhu Ödülü']
  }

  // Countdown target date
  const championshipDate = new Date('2026-02-28T00:00:00')

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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-900">VEX Robotics Turkey</span>
              </div>

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

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-gray-500 font-medium">Takım</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2000+</div>
                  <div className="text-sm text-gray-500 font-medium">Öğrenci</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-gray-500 font-medium">Yarışma</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">81</div>
                  <div className="text-sm text-gray-500 font-medium">İl</div>
                </div>
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

        {/* Championship Countdown Section */}
        <section className="relative py-12 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                {t.countdown.title}
              </h2>
            </div>

            {/* Countdown Timer */}
            <div className="relative bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-12 max-w-5xl mx-auto shadow-lg">
              {/* Tech Pattern Border */}
              <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(227,24,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(227,24,55,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {/* Days */}
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-bold text-primary mb-2 tabular-nums">
                    {countdown.days.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wide">
                    {t.countdown.days}
                  </div>
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-bold text-primary mb-2 tabular-nums">
                    {countdown.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wide">
                    {t.countdown.hours}
                  </div>
                </div>

                {/* Minutes */}
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-bold text-primary mb-2 tabular-nums">
                    {countdown.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wide">
                    {t.countdown.minutes}
                  </div>
                </div>

                {/* Seconds */}
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-bold text-primary mb-2 tabular-nums">
                    {countdown.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wide">
                    {t.countdown.seconds}
                  </div>
                </div>
              </div>
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

        {/* Partners Section */}
        < section className="relative py-12 bg-white border-b border-gray-100/50" >
          <div className="container mx-auto px-6 max-w-7xl">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
              {t.cta.partnersTitle}
            </h3>
            <div className="relative overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center px-8 py-6 bg-white border border-gray-200 rounded-xl min-w-[200px] hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <span className="text-gray-700 font-semibold text-lg">
                      {partner}
                    </span>
                  </div>
                ))}
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

        {/* Stats Counter Section */}
        <section className="relative py-24 bg-secondary overflow-hidden overflow-x-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.id}
                    className="group relative"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Stat Card */}
                    <div className="relative bg-white rounded-2xl p-2 md:p-8 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl text-center">
                      {/* Background Icon */}
                      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon className="h-20 w-20 text-primary" />
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>

                        {/* Number with count-up effect */}
                        <div className="text-2xl md:text-6xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-primary transition-colors">
                          {stat.value.toLocaleString('tr-TR')}+
                        </div>

                        {/* Label */}
                        <div className="text-lg text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-300 pointer-events-none" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <CommunitySection language={language} />

        {/* Testimonials Section */}








        {/* Team of the Month Section */}
        < section className="relative py-24 bg-white overflow-hidden" >
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {t.teamOfMonth.title}
              </h2>
              <p className="text-lg text-gray-600">
                {t.teamOfMonth.subtitle}
              </p>
            </div>

            {/* Team Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Featured Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-lg">
                    {t.teamOfMonth.featured}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Team Photo */}
                  <div className="relative h-80 md:h-auto rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={teamOfMonth.image || "/placeholder.svg"}
                      alt={teamOfMonth.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Team Info */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="text-primary font-bold text-lg mb-2">
                        {language === 'TR' ? 'Takım No:' : 'Team No:'} {teamOfMonth.number}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {teamOfMonth.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {teamOfMonth.school}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                        {t.teamOfMonth.story}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {teamOfMonth.story}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {teamOfMonth.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >




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
                  <Image
                    src="/VEX-Robotics_Full-Color-1.png"
                    alt="VEX Türkiye"
                    width={200}
                    height={60}
                    className="h-16 md:h-20 lg:h-24 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                  VEX Türkiye: Geleceğin mühendislerini ve problem çözenlerini bugünden yetiştiriyoruz.
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
                    <Link href="/vex-nedir/vex-go" className="hover:text-primary transition-colors">VEX GO</Link>
                  </li>
                  <li>
                    <Link href="/vex-nedir/vex-iq" className="hover:text-primary transition-colors">VEX IQ</Link>
                  </li>
                  <li>
                    <Link href="/vex-nedir/vex-v5" className="hover:text-primary transition-colors">VEX V5 (VRC)</Link>
                  </li>
                  <li>
                    <Link href="/vex-nedir/vex-u" className="hover:text-primary transition-colors">VEX U</Link>
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
                    <Link href="/takimlar/nasil-kurulur" className="hover:text-primary transition-colors">Nasıl Takım Kurulur?</Link>
                  </li>
                  <li>
                    <Link href="/takimlar/kayit" className="hover:text-primary transition-colors">Takım Kaydı</Link>
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
                    <Link href="/kurumsal/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
                  </li>
                  <li>
                    <Link href="/kurumsal/sponsorlar-ve-partnerler" className="hover:text-primary transition-colors">Sponsorlar & Partnerler</Link>
                  </li>
                  <li>
                    <Link href="/kurumsal/gonullu-olun" className="hover:text-primary transition-colors">Gönüllü Olun</Link>
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
              <p>© 2026 VEX Türkiye. Tüm Hakları Saklıdır.</p>
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


