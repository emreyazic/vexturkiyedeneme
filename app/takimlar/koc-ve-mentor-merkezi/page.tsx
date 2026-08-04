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