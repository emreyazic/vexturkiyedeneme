'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Award, BookOpen, Users, ShieldCheck, HeartHandshake,
    ExternalLink, CheckCircle2, AlertCircle, FileText,
    Sparkles, HelpCircle, MessageSquare, Lightbulb, Scale
} from 'lucide-react'

const content = {
    TR: {
        hero: {
            title: "RECF Jüri ve Değerlendirme Süreci",
            subtitle:
                "RECF jüri süreci, mühendislik defteri kriterleri, mülakat standartları ve etik ilkeler",
        },

        policy: {
            title: "Öğrenci Merkezli Politika (Student-Centered Policy)",
            description:
                "RECF etkinliklerinde değerlendirmenin en temel kuralı öğrenci merkezliliktir. Robotun tasarımı, inşası, kodlanması, sürücülüğü ve mülakat sunumları tamamen öğrenciler tarafından gerçekleştirilmelidir. Mentorlar ve öğretmenler doğrudan müdahalede bulunmaz; yol gösterici ve emniyet sağlayıcı rol üstlenirler.",
            link: "Resmi Student-Centered Politika Dokümanı",
        },

        notebook: {
            title: "Mühendislik Defteri Değerlendirme Kriterleri",
            subtitle:
                "Excellence ve Design Ödülleri için temel değerlendirme standartları",

            items: [
                {
                    title: "Tasarım Süreci Dokümantasyonu (EDP)",
                    desc:
                        "Problemin tanımlanması, saha analizi, beyin fırtınası, prototipleme ve test adımlarının eksiksiz kaydı.",
                    score: "Rubric: 5 Puan",
                },
                {
                    title: "Kronolojik ve Tarihli Kayıtlar",
                    desc:
                        "Her toplantının tarihi, katılan üyeler, alınan kararlar ve harcanan süre bilgilerinin düzenli işlenmesi.",
                    score: "Rubric: 5 Puan",
                },
                {
                    title: "Mekanik & Yazılım Şemaları",
                    desc:
                        "El çizimleri, CAD çıktıları, kod blokları/akış şemaları ve matematiksel hesaplama detayları.",
                    score: "Rubric: 5 Puan",
                },
                {
                    title: "Test Verileri & Geliştirme Yinelemeleri (Iteration)",
                    desc:
                        "Başarısız denemelerden çıkarılan dersler, veri grafiklerindeki iyileştirmeler ve tasarım revizyonları.",
                    score: "Rubric: 5 Puan",
                },
            ],
        },

        interview: {
            title: "Takım Mülakatı Süreci ve Beklentiler",
            subtitle:
                "Jüri odasında veya pit alanında gerçekleşen mülakatların yapısı",

            items: [
                {
                    title: "Öğrenci Liderliğinde Sunum",
                    desc:
                        "Mülakatın ilk 3-5 dakikasında takımların robotlarını, tasarım süreçlerini ve sezondaki yolculuklarını kendi cümleleriyle aktarmaları beklenir.",
                },
                {
                    title: "Tüm Üyelerin Dengeli Katılımı",
                    desc:
                        "Jüriler sadece takım kaptanını değil; mekanik, yazılım, sürücü ve defter sorumlusu tüm öğrencilerin sürece katılımını gözlemler.",
                },
                {
                    title: "Teknik Bilgi ve Özgüven",
                    desc:
                        "Robot üzerindeki mekanizmaların neden seçildiği ve yazılımdaki algoritmaların mantığı sorulara verilen açık yanıtlarla değerlendirilir.",
                },
                {
                    title: "Sportmenlik ve İletişim",
                    desc:
                        "Diğer takımlarla yardımlaşma, sahada sergilenen nezaket (Code of Conduct) ve dürüstlük mülakat puanını doğrudan etkiler.",
                },
            ],
        },

        simulator: {
            title: "Takımlar için Mülakat Örnek Soru Simülatörü",
            description:
                "Mülakata hazırlanırken takımınızla birlikte aşağıdaki tipik jüri sorularını yanıtlayarak pratik yapabilirsiniz.",
            category: "Kategori",
            nextQuestion: "Sonraki Soruyu Getir",
            questionLabel: "Soru",

            questions: [
                {
                    category: "Tasarım & Mekanik",
                    q:
                        "Robotunuzun mevcut şasi ve mekanizma tasarımına nasıl karar verdiniz? Denediğiniz alternatif tasarımlar nelerdi?",
                },
                {
                    category: "Yazılım & Otonom",
                    q:
                        "Solo Coding (Otonom) maçlarında hangi sensörleri kullandınız ve kodlamadaki en büyük zorluğu nasıl aştınız?",
                },
                {
                    category: "Takım Çalışması & İletişim",
                    q:
                        "Sezon boyunca takım içinde fikir ayrılığı yaşadığınızda bu durumu nasıl çözüme kavuşturdunuz?",
                },
                {
                    category: "Öğrenci Merkezli Süreç",
                    q:
                        "Bu robotta tamamen öğrencilere ait olan en gurur duyduğunuz yenilikçi fikir veya parça hangisidir?",
                },
            ],
        },

        ethics: {
            title: "Jüri Etik Kuralları ve Çıkar Çatışması",
            description:
                "RECF jürileri tamamen tarafsızlık ve gizlilik ilkesiyle hareket eder. Jüri üyeleri, kendi okullarından veya yakın akrabalık bağı bulunan takımların mülakatlarında ve puanlamalarında çekimser kalır (Conflict of Interest Disclosure).",

            rules: [
                "Gizlilik ilkesi (Mülakat detayları dışarıya aktarılamaz)",
                "Tüm takımlara eşit zaman ve önyargısız yaklaşım",
            ],
        },

        certification: {
            title: "Jüri Eğitimi ve Sertifikasyon",
            description:
                "Etkinliklerde jüri veya Judge Advisor olarak görev alacak tüm gönüllüler, RECF'nin çevrim içi Jüri Eğitimi ve Sertifikasyon portalını tamamlayarak resmi sertifika alırlar.",
            portal: "Jüri Eğitim Portalı",
            officialGuide: "Official Judges Guide (PDF)",
        },
    },

    EN: {
        hero: {
            title: "RECF Judging and Evaluation Process",
            subtitle:
                "RECF judging process, engineering notebook criteria, interview standards, and ethical principles",
        },

        policy: {
            title: "Student-Centered Policy",
            description:
                "The fundamental principle of evaluation at RECF events is that the process must be student-centered. Robot design, construction, programming, driving, and interview presentations must be carried out entirely by students. Mentors and teachers should not directly intervene; they serve as guides and ensure safety.",
            link: "Official Student-Centered Policy Document",
        },

        notebook: {
            title: "Engineering Notebook Evaluation Criteria",
            subtitle:
                "Core evaluation standards for the Excellence and Design Awards",

            items: [
                {
                    title: "Design Process Documentation (EDP)",
                    desc:
                        "Complete documentation of problem definition, field analysis, brainstorming, prototyping, and testing steps.",
                    score: "Rubric: 5 Points",
                },
                {
                    title: "Chronological and Dated Records",
                    desc:
                        "Regular documentation of meeting dates, participating members, decisions made, and time spent.",
                    score: "Rubric: 5 Points",
                },
                {
                    title: "Mechanical & Software Diagrams",
                    desc:
                        "Hand sketches, CAD outputs, code blocks/flowcharts, and mathematical calculation details.",
                    score: "Rubric: 5 Points",
                },
                {
                    title: "Test Data & Design Iterations",
                    desc:
                        "Lessons learned from unsuccessful attempts, improvements shown in data graphs, and design revisions.",
                    score: "Rubric: 5 Points",
                },
            ],
        },

        interview: {
            title: "Team Interview Process and Expectations",
            subtitle:
                "Structure of interviews conducted in the judging room or pit area",

            items: [
                {
                    title: "Student-Led Presentation",
                    desc:
                        "During the first 3-5 minutes of the interview, teams are expected to explain their robot, design process, and season journey in their own words.",
                },
                {
                    title: "Balanced Participation of All Members",
                    desc:
                        "Judges observe not only the team captain, but also the participation of all students responsible for mechanics, software, driving, and the notebook.",
                },
                {
                    title: "Technical Knowledge and Confidence",
                    desc:
                        "The reasons behind the mechanisms selected for the robot and the logic of the software algorithms are evaluated through clear answers.",
                },
                {
                    title: "Sportsmanship and Communication",
                    desc:
                        "Helping other teams, demonstrating good conduct on the field, and honesty directly affect the interview evaluation.",
                },
            ],
        },

        simulator: {
            title: "Sample Interview Question Simulator for Teams",
            description:
                "Practice with your team by answering the following typical judging questions while preparing for your interview.",
            category: "Category",
            nextQuestion: "Next Question",
            questionLabel: "Question",

            questions: [
                {
                    category: "Design & Mechanics",
                    q:
                        "How did you decide on your robot's current chassis and mechanism design? What alternative designs did you try?",
                },
                {
                    category: "Software & Autonomous",
                    q:
                        "Which sensors did you use during Solo Coding (Autonomous) matches, and how did you overcome your biggest programming challenge?",
                },
                {
                    category: "Teamwork & Communication",
                    q:
                        "How did you resolve disagreements within your team during the season?",
                },
                {
                    category: "Student-Centered Process",
                    q:
                        "What innovative idea or component in this robot are you most proud of that was entirely created by the students?",
                },
            ],
        },

        ethics: {
            title: "Judging Ethics and Conflict of Interest",
            description:
                "RECF judges operate under principles of complete impartiality and confidentiality. Judges abstain from interviewing and scoring teams from their own schools or teams with whom they have close family relationships (Conflict of Interest Disclosure).",

            rules: [
                "Confidentiality principle (Interview details must not be disclosed externally)",
                "Equal time and unbiased treatment for all teams",
            ],
        },

        certification: {
            title: "Judge Training and Certification",
            description:
                "All volunteers serving as judges or Judge Advisors at events must complete RECF's online Judge Training and Certification portal to receive official certification.",
            portal: "Judge Training Portal",
            officialGuide: "Official Judges Guide (PDF)",
        },
    },
} as const

export default function JuriPage() {
    const { language, setLanguage } = useLanguage()
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0)

    const t = content[language]

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Student-Centered Policy Highlight Banner */}
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-8 mb-16 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0 border border-red-200">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-red-900 mb-3">{t.policy.title}</h3>
                            <p className="text-red-800 text-base leading-relaxed mb-4">
                                {t.policy.description}
                            </p>
                            <a href="https://recf.org/documents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-red-700 font-bold hover:text-red-900 text-sm">
                                {t.policy.link}
                                <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Section 1: Engineering Notebook Rubric */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-7 h-7 text-primary" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">{t.notebook.title}</h2>
                                <p className="text-gray-500 text-sm">{t.notebook.subtitle}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {t.notebook.items.map((item, idx) => (
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
                                <h2 className="text-3xl font-bold text-gray-900">{t.interview.title}</h2>
                                <p className="text-gray-500 text-sm">{t.interview.subtitle}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {t.interview.items.map((exp, idx) => (
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
                            <h2 className="text-2xl font-bold text-white">{t.simulator.title}</h2>
                        </div>
                        <p className="text-slate-300 text-sm mb-8 max-w-2xl">
                            {t.simulator.description}
                        </p>

                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
                            <span className="inline-block bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs mb-3">
                                Kategori: {t.simulator.questions[activeQuestionIdx].category}
                            </span>
                            <h4 className="text-xl font-bold text-white mb-4">
                                "{t.simulator.questions[activeQuestionIdx].q}"
                            </h4>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                {t.simulator.questions.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveQuestionIdx(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeQuestionIdx === i ? 'bg-amber-400 w-8' : 'bg-slate-700'}`}
                                        aria-label={`Soru ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <Button
                                onClick={() => setActiveQuestionIdx((prev) => (prev + 1) % t.simulator.questions.length)}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl h-11 px-6"
                            >
                                {t.simulator.nextQuestion}
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
                                    <h3 className="text-2xl font-bold text-gray-900">{t.ethics.title}</h3>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    {t.ethics.description}
                                </p>
                                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                        {t.ethics.rules[0]}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                        {t.ethics.rules[1]}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Certification & Official Guides Link */}
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="w-7 h-7 text-emerald-700" />
                                    <h3 className="text-2xl font-bold text-gray-900">{t.certification.title}</h3>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                    {t.certification.description}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://kb.roboticseducation.org/hc/en-us/categories/4421404969111" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6 rounded-xl text-sm">
                                        {t.certification.portal}
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
