<<<<<<< HEAD
'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { ExternalLink, BookOpen, ShieldCheck, GraduationCap, AlertTriangle, UserCheck, ChevronRight } from 'lucide-react'

const mentorResources = [
    {
        icon: UserCheck,
        title: "Koçun Rolü ve Sorumlulukları",
        description: "Takımın bir yetişkin lideri olarak, öğrencilerin mühendislik sürecine rehberlik etmek, güvenliği sağlamak ve RECF kurallarına uyulmasını kolaylaştırmak sizin görevinizdir.",
        points: [
            "Etkinlik kayıtları ve lojistik süreçlerin yönetimi",
            "Güvenli ve denetimli bir çalışma ortamı sağlama",
            "Doğrudan robot yapmadan mentorluk (öğrenci merkezli kalma)"
        ]
    },
    {
        icon: GraduationCap,
        title: "Öğrenci Merkezli Politika (Student-Centered)",
        description: "RECF programlarının temel taşı. Robotlar, programlar ve stratejiler tamamen öğrencilerin ürünü olmalıdır. Yetişkinler sadece kolaylaştırıcıdır.",
        points: [
            "Koçlar kod yazmaz veya robot parçası monte etmez",
            "Tüm soruların cevaplarını vermek yerine sorular sorarak yönlendirme",
            "Hata yapmanın öğrenme sürecinin değerli bir parçası olduğunu benimsetme"
        ]
    },
    {
        icon: BookOpen,
        title: "Sezon Planı ve Mühendislik Defteri",
        description: "Takımın mühendislik tasarım döngüsünü belgelediği Engineering Notebook (Mühendislik Defteri) başarı için kritik öneme sahiptir.",
        points: [
            "Düzenli takım toplantıları ve hedeflerin belirlenmesi",
            "Tüm fikirlerin, hataların ve çözümlerin deftere tarihli olarak işlenmesi",
            "Jüri değerlendirmelerinde (Judging) defterin referans olarak kullanılması"
        ]
    },
    {
        icon: ShieldCheck,
        title: "Güvenlik ve Etkinliğe Hazırlık",
        description: "Çalışma alanında ve etkinlik gününde alınması gereken güvenlik önlemleri ve robot denetim (Inspection) kuralları.",
        points: [
            "Akülerin güvenli şarj edilmesi ve güvenlik gözlüklerinin (Safety Glasses) kullanımı",
            "Etkinlik öncesi Robot Inspection (Denetim) kontrol listesinin uygulanması",
            "Turnuva kurallarına (Game Manual) takımca hakim olunması"
        ]
    }
]

export default function MentorPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="Koç ve Mentor Merkezi"
                subtitle="RECF koç ve mentor kaynakları: 2026–2027 RECF sezonuna hazırlık"
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Öğrencilerin Liderleri</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            RECF programlarında takım koçları ve mentorlar, öğrencilerin STEM (Bilim, Teknoloji, Mühendislik ve Matematik) alanındaki potansiyellerini ortaya çıkarmaları için onlara ilham veren, güvenli bir çalışma ortamı sağlayan ve "öğrenci merkezli" (Student-Centered) felsefeyi koruyan en önemli yapı taşlarıdır.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {mentorResources.map((resource, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                        <resource.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-snug">{resource.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {resource.description}
                                </p>
                                <ul className="space-y-3">
                                    {resource.points.map((point, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                            <span className="text-sm text-gray-700 leading-snug">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Official Resources & Coach Academy CTA */}
                    <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-4">RECF Coach Academy</h3>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    Takımınızı en iyi şekilde yönetmek, etkinlik kurallarını anlamak ve RECF ekosistemine tam hakim olmak için resmi Eğitim ve Sertifikasyon programlarına katılın.
                                </p>
                                <div className="space-y-4">
                                    <a
                                        href="https://kb.roboticseducation.org/hc/en-us/articles/41299901846167-Coach-Academy-for-RECF-Drone-Robotics-Programs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 w-full bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-4 rounded-xl transition-colors"
                                    >
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                        Coach Academy Sertifikasyonunu Alın
                                        <ExternalLink className="w-4 h-4 ml-auto text-gray-400" />
                                    </a>
                                    <a
                                        href="https://recf.org/documents"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 w-full bg-gray-800 text-white hover:bg-gray-700 font-bold px-6 py-4 rounded-xl transition-colors"
                                    >
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                        Resmi RECF Kütüphanesi (Documents)
                                        <ExternalLink className="w-4 h-4 ml-auto text-gray-500" />
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                                <h4 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                                    <AlertTriangle className="w-6 h-6" />
                                    Önemli Hatırlatma
                                </h4>
                                <p className="text-gray-200 leading-relaxed mb-6">
                                    Tüm takımların yarışmalarda değerlendirmeye alınabilmesi için yetişkin bir "Event Partner" veya takım yetkilisi (Mentor/Koç) tarafından onaylanmış bir <strong>Background Check (Arka Plan Taraması)</strong> statüsüne sahip olması zorunludur. Bu işlem RECFevents sistemi üzerinden yürütülür.
                                </p>
                                <a href="https://www.recfevents.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-white hover:text-primary transition-colors">
                                    RECFevents Profiline Git <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
=======
'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import {
    ExternalLink,
    BookOpen,
    Users,
    ShieldCheck,
    GraduationCap,
    AlertTriangle,
    UserCheck,
    ChevronRight
} from 'lucide-react'

const mentorResources = [
    {
        icon: UserCheck,
        title: {
            TR: 'Koçun Rolü ve Sorumlulukları',
            EN: 'Coach Roles and Responsibilities'
        },
        description: {
            TR: 'Takımın bir yetişkin lideri olarak, öğrencilerin mühendislik sürecine rehberlik etmek, güvenliği sağlamak ve RECF kurallarına uyulmasını kolaylaştırmak sizin görevinizdir.',
            EN: 'As an adult leader of the team, your role is to guide students through the engineering process, ensure safety, and help facilitate compliance with RECF rules.'
        },
        points: {
            TR: [
                'Etkinlik kayıtları ve lojistik süreçlerin yönetimi',
                'Güvenli ve denetimli bir çalışma ortamı sağlama',
                'Doğrudan robot yapmadan mentorluk (öğrenci merkezli kalma)'
            ],
            EN: [
                'Managing event registrations and logistics',
                'Providing a safe and supervised working environment',
                'Mentoring without directly building the robot (remaining student-centered)'
            ]
        }
    },
    {
        icon: GraduationCap,
        title: {
            TR: 'Öğrenci Merkezli Politika (Student-Centered)',
            EN: 'Student-Centered Policy'
        },
        description: {
            TR: 'RECF programlarının temel taşı. Robotlar, programlar ve stratejiler tamamen öğrencilerin ürünü olmalıdır. Yetişkinler sadece kolaylaştırıcıdır.',
            EN: 'The foundation of RECF programs. Robots, programs, and strategies should be entirely the work of students. Adults serve only as facilitators.'
        },
        points: {
            TR: [
                'Koçlar kod yazmaz veya robot parçası monte etmez',
                'Tüm soruların cevaplarını vermek yerine sorular sorarak yönlendirme',
                'Hata yapmanın öğrenme sürecinin değerli bir parçası olduğunu benimsetme'
            ],
            EN: [
                'Coaches do not write code or assemble robot components',
                'Guide students by asking questions instead of simply providing answers',
                'Encourage students to understand that making mistakes is a valuable part of learning'
            ]
        }
    },
    {
        icon: BookOpen,
        title: {
            TR: 'Sezon Planı ve Mühendislik Defteri',
            EN: 'Season Planning and Engineering Notebook'
        },
        description: {
            TR: 'Takımın mühendislik tasarım döngüsünü belgelediği Engineering Notebook (Mühendislik Defteri) başarı için kritik öneme sahiptir.',
            EN: 'The Engineering Notebook, which documents the team’s engineering design process, is critical to success.'
        },
        points: {
            TR: [
                'Düzenli takım toplantıları ve hedeflerin belirlenmesi',
                'Tüm fikirlerin, hataların ve çözümlerin deftere tarihli olarak işlenmesi',
                'Jüri değerlendirmelerinde (Judging) defterin referans olarak kullanılması'
            ],
            EN: [
                'Holding regular team meetings and setting goals',
                'Documenting all ideas, mistakes, and solutions in the notebook with dates',
                'Using the notebook as a reference during judging'
            ]
        }
    },
    {
        icon: ShieldCheck,
        title: {
            TR: 'Güvenlik ve Etkinliğe Hazırlık',
            EN: 'Safety and Event Preparation'
        },
        description: {
            TR: 'Çalışma alanında ve etkinlik gününde alınması gereken güvenlik önlemleri ve robot denetim (Inspection) kuralları.',
            EN: 'Safety measures and robot inspection requirements that must be followed in the workspace and during events.'
        },
        points: {
            TR: [
                'Akülerin güvenli şarj edilmesi ve güvenlik gözlüklerinin (Safety Glasses) kullanımı',
                'Etkinlik öncesi Robot Inspection (Denetim) kontrol listesinin uygulanması',
                'Turnuva kurallarına (Game Manual) takımca hakim olunması'
            ],
            EN: [
                'Charging batteries safely and using safety glasses',
                'Completing the Robot Inspection checklist before the event',
                'Ensuring the entire team understands the tournament rules (Game Manual)'
            ]
        }
    }
]

const content = {
    TR: {
        hero: {
            title: 'Koç ve Mentor Merkezi',
            subtitle:
                'RECF koç ve mentor kaynakları: 2026–2027 RECF sezonuna hazırlık'
        },

        intro: {
            title: 'Öğrencilerin Liderleri',
            description:
                'RECF programlarında takım koçları ve mentorlar, öğrencilerin STEM (Bilim, Teknoloji, Mühendislik ve Matematik) alanındaki potansiyellerini ortaya çıkarmaları için onlara ilham veren, güvenli bir çalışma ortamı sağlayan ve "öğrenci merkezli" (Student-Centered) felsefeyi koruyan en önemli yapı taşlarıdır.'
        },

        academy: {
            title: 'RECF Coach Academy',
            description:
                'Takımınızı en iyi şekilde yönetmek, etkinlik kurallarını anlamak ve RECF ekosistemine tam hakim olmak için resmi Eğitim ve Sertifikasyon programlarına katılın.',
            certification: 'Coach Academy Sertifikasyonunu Alın',
            library: 'Resmi RECF Kütüphanesi (Documents)'
        },

        reminder: {
            title: 'Önemli Hatırlatma',
            description:
                'Tüm takımların yarışmalarda değerlendirmeye alınabilmesi için yetişkin bir "Event Partner" veya takım yetkilisi (Mentor/Koç) tarafından onaylanmış bir Background Check (Arka Plan Taraması) statüsüne sahip olması zorunludur. Bu işlem RECFevents sistemi üzerinden yürütülür.',
            profile: 'RECFevents Profiline Git'
        }
    },

    EN: {
        hero: {
            title: 'Coach and Mentor Center',
            subtitle:
                'RECF coach and mentor resources: Preparing for the 2026–2027 RECF season'
        },

        intro: {
            title: 'Leaders of Students',
            description:
                'In RECF programs, team coaches and mentors are essential in inspiring students to reach their potential in STEM (Science, Technology, Engineering, and Mathematics), providing a safe working environment, and maintaining the student-centered philosophy.'
        },

        academy: {
            title: 'RECF Coach Academy',
            description:
                'Join official Training and Certification programs to manage your team effectively, understand event rules, and gain a complete understanding of the RECF ecosystem.',
            certification: 'Get Coach Academy Certification',
            library: 'Official RECF Library (Documents)'
        },

        reminder: {
            title: 'Important Reminder',
            description:
                'For teams to be eligible for consideration at competitions, they must have a Background Check status approved by an adult "Event Partner" or team representative (Mentor/Coach). This process is managed through the RECFevents system.',
            profile: 'Go to RECFevents Profile'
        }
    }
} as const

export default function MentorPage() {
    const { language, setLanguage } = useLanguage()

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">

            {/* Navbar */}
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

            {/* Hero */}
            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Intro */}
                    <div className="text-center max-w-3xl mx-auto mb-16">

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {t.intro.title}
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            {t.intro.description}
                        </p>

                    </div>

                    {/* Mentor Resources */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">

                        {mentorResources.map((resource, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >

                                <div className="flex items-center gap-4 mb-6">

                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                        <resource.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                        {resource.title[language]}
                                    </h3>

                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {resource.description[language]}
                                </p>

                                <ul className="space-y-3">

                                    {resource.points[language].map(
                                        (point, pIdx) => (
                                            <li
                                                key={pIdx}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />

                                                <span className="text-sm text-gray-700 leading-snug">
                                                    {point}
                                                </span>
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>
                        ))}

                    </div>

                    {/* Official Resources & Coach Academy CTA */}
                    <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">

                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />

                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                            {/* Coach Academy */}
                            <div>

                                <h3 className="text-3xl font-bold mb-4">
                                    {t.academy.title}
                                </h3>

                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    {t.academy.description}
                                </p>

                                <div className="space-y-4">

                                    <a
                                        href="https://kb.roboticseducation.org/hc/en-us/articles/41299901846167-Coach-Academy-for-RECF-Drone-Robotics-Programs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 w-full bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-4 rounded-xl transition-colors"
                                    >
                                        <GraduationCap className="w-5 h-5 text-primary" />

                                        {t.academy.certification}

                                        <ExternalLink className="w-4 h-4 ml-auto text-gray-400" />
                                    </a>

                                    <a
                                        href="https://recf.org/documents"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 w-full bg-gray-800 text-white hover:bg-gray-700 font-bold px-6 py-4 rounded-xl transition-colors"
                                    >
                                        <BookOpen className="w-5 h-5 text-gray-400" />

                                        {t.academy.library}

                                        <ExternalLink className="w-4 h-4 ml-auto text-gray-500" />
                                    </a>

                                </div>

                            </div>

                            {/* Reminder */}
                            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">

                                <h4 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">

                                    <AlertTriangle className="w-6 h-6" />

                                    {t.reminder.title}

                                </h4>

                                <p className="text-gray-200 leading-relaxed mb-6">
                                    {t.reminder.description}
                                </p>

                                <a
                                    href="https://www.recfevents.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-bold text-white hover:text-primary transition-colors"
                                >
                                    {t.reminder.profile}

                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </a>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
>>>>>>> d9a88c48bf01268ab2d176e8873256c6f4f8ed35
