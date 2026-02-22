import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    BookOpen, Award, ChevronRight, CheckCircle2
} from 'lucide-react'
import { QuestionSimulator, AllQuestionsGrid } from '@/components/JuryQuestionSimulator'
import { getAllJuryQuestions } from '@/lib/sanity-queries'
import { JuriClientWrapper } from './JuriClientWrapper'

// Notebook standards (statik içerik)
const notebookStandards = [
    {
        title: 'Kapak ve İçindekiler',
        description: 'Takım logosu, numara ve üye listesi ile başlayın. Sayfa numaraları ekleyin.',
        color: '#E31837'
    },
    {
        title: 'Tarihli Kayıtlar',
        description: 'Her toplantı tarihi, katılımcılar ve süre bilgisiyle başlamalı.',
        color: '#00AEEF'
    },
    {
        title: 'Tasarım Süreci',
        description: 'Sorunu tanımlayın, alternatifler listeleyin, seçim gerekçenizi açıklayın.',
        color: '#00A651'
    },
    {
        title: 'Eskizler & Görseller',
        description: 'El çizimleri, CAD görüntüleri ve fotoğraflarla destekleyin.',
        color: '#F7941D'
    },
    {
        title: 'Test & Veriler',
        description: 'Ölçümler, zamanlama verileri ve karşılaştırma tabloları ekleyin.',
        color: '#6B21A8'
    },
    {
        title: 'Yansıma & Öğrenmeler',
        description: 'Her oturumun sonunda neler öğrenildiğini ve sonraki adımları yazın.',
        color: '#1E3A8A'
    }
]

export default async function JuriPage() {
    // Sanity'den jüri sorularını çek
    const juryQuestions = await getAllJuryQuestions()

    return (
        <JuriClientWrapper>
            <CorporateHero
                title="Jüri & Değerlendirme"
                subtitle="Mülakat hazırlığı ve mühendislik defteri standartları"
            />

            {/* Question Simulator */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <QuestionSimulator questions={juryQuestions} />
                </div>
            </section>

            {/* Notebook Standards */}
            <section className="py-16 md:py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Mühendislik Defteri</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Defter Standartları
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Excellence Award kazanmak için mühendislik defterinizin bu standartlara uyması önemlidir
                        </p>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notebookStandards.map((standard, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${standard.color}15` }}
                                >
                                    <CheckCircle2 className="w-6 h-6" style={{ color: standard.color }} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{standard.title}</h3>
                                <p className="text-gray-600 text-sm">{standard.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Slider (1 item per slide) */}
                    <div className="sm:hidden -mx-6 px-6">
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
                            {notebookStandards.map((standard, index) => (
                                <div
                                    key={index}
                                    className="min-w-full snap-center bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: `${standard.color}15` }}
                                    >
                                        <CheckCircle2 className="w-6 h-6" style={{ color: standard.color }} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{standard.title}</h3>
                                    <p className="text-gray-600 text-sm">{standard.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* All Questions Grid */}
            <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sık Sorulan Jüri Soruları</h2>
                        <p className="text-gray-600">Tüm soruları inceleyerek hazırlanın</p>
                    </div>

                    <AllQuestionsGrid questions={juryQuestions} />
                </div>
            </section>

            {/* Award Rubrics */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-50 to-amber-50 border-t border-yellow-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ödül Değerlendirme Kriterleri</h2>
                        <p className="text-gray-600">Her ödül kategorisinin değerlendirme kriterleri</p>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { title: 'Design Award', subtitle: 'Takımın mühendislik tasarım sürecini düzenli, tutarlı ve ayrıntılı bir mühendislik defteri ve mülakatla göstermesi.' },
                            { title: 'Excellence Award', subtitle: 'Hem jüri değerlendirmelerinde hem de yarışma performansında genel olarak en üst düzey başarıyı göstermesi.' },
                            { title: 'Innovation Award', subtitle: 'Robotta veya stratejide özgün ve yenilikçi bir fikrin iyi belgelenmiş bir tasarım süreciyle sunulması.' },
                            { title: 'Think Award', subtitle: 'Oyun zorluklarını çözmek için etkili, anlaşılır ve iyi yönetilmiş programlama kullanılması.' },
                            { title: 'Amaze Award', subtitle: 'Robotun yarışma boyunca yüksek, tutarlı ve rekabetçi bir performans sergilemesi.' },
                            { title: 'Build Award', subtitle: 'Robotun sağlam, güvenli, dayanıklı ve özenli bir şekilde inşa edilmiş olması.' },
                            { title: 'Create Award', subtitle: 'Yarışma problemlerine yaratıcı ve cesur mühendislik çözümleri geliştirilmesi.' },
                            { title: 'Jury Award', subtitle: 'Jürinin özel olarak takdir ettiği olağanüstü çaba, karakter veya başarı gösterilmesi.' },
                            { title: 'Inspiration Award', subtitle: 'Etkinlik boyunca motivasyon, pozitif tutum ve ilham verici bir duruş sergilenmesi.' },
                            { title: 'Sportsmanship Award', subtitle: 'Herkese karşı saygılı, yardımsever ve dürüst bir spor ruhu gösterilmesi.' },
                            { title: 'Energy Award', subtitle: 'Etkinlik boyunca olağanüstü coşku, enerji ve heyecan yayılması.' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl border border-yellow-200 p-5 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Slider (Groups of 3) */}
                    <div className="sm:hidden -mx-6 px-6">
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
                            {Array.from({ length: Math.ceil(11 / 3) }).map((_, groupIndex) => (
                                <div key={groupIndex} className="min-w-full snap-center grid gap-4">
                                    {[
                                        { title: 'Design Award', subtitle: 'Takımın mühendislik tasarım sürecini düzenli, tutarlı ve ayrıntılı bir mühendislik defteri ve mülakatla göstermesi.' },
                                        { title: 'Excellence Award', subtitle: 'Hem jüri değerlendirmelerinde hem de yarışma performansında genel olarak en üst düzey başarıyı göstermesi.' },
                                        { title: 'Innovation Award', subtitle: 'Robotta veya stratejide özgün ve yenilikçi bir fikrin iyi belgelenmiş bir tasarım süreciyle sunulması.' },
                                        { title: 'Think Award', subtitle: 'Oyun zorluklarını çözmek için etkili, anlaşılır ve iyi yönetilmiş programlama kullanılması.' },
                                        { title: 'Amaze Award', subtitle: 'Robotun yarışma boyunca yüksek, tutarlı ve rekabetçi bir performans sergilemesi.' },
                                        { title: 'Build Award', subtitle: 'Robotun sağlam, güvenli, dayanıklı ve özenli bir şekilde inşa edilmiş olması.' },
                                        { title: 'Create Award', subtitle: 'Yarışma problemlerine yaratıcı ve cesur mühendislik çözümleri geliştirilmesi.' },
                                        { title: 'Jury Award', subtitle: 'Jürinin özel olarak takdir ettiği olağanüstü çaba, karakter veya başarı gösterilmesi.' },
                                        { title: 'Inspiration Award', subtitle: 'Etkinlik boyunca motivasyon, pozitif tutum ve ilham verici bir duruş sergilenmesi.' },
                                        { title: 'Sportsmanship Award', subtitle: 'Herkese karşı saygılı, yardımsever ve dürüst bir spor ruhu gösterilmesi.' },
                                        { title: 'Energy Award', subtitle: 'Etkinlik boyunca olağanüstü coşku, enerji ve heyecan yayılması.' }
                                    ].slice(groupIndex * 3, (groupIndex + 1) * 3).map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl border border-yellow-200 p-5 shadow-sm"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Jüri Mülakatına Hazır mısınız?</h2>
                    <p className="text-xl text-gray-300 mb-8">Takımınızla birlikte pratik yapın</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/yarismalar/oduller">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Ödül Kategorileri
                                <Award className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/takimlar/mentor">
                            <Button size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20">
                                Mentor Kaynakları
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">VEX</div>
                                <div><div className="text-lg font-bold">VEX TÜRKİYE</div><div className="text-xs text-gray-400">Robotics Competition</div></div>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                                <li><a href="/kaynaklar/mufredat" className="text-gray-400 hover:text-primary transition-colors">Müfredatlar</a></li>
                                <li><a href="/kaynaklar/juri" className="text-gray-400 hover:text-primary transition-colors">Jüri & Değerlendirme</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Yarışmalar</h3>
                            <ul className="space-y-3">
                                <li><a href="/yarismalar/oduller" className="text-gray-400 hover:text-primary transition-colors">Ödüller</a></li>
                                <li><a href="/yarismalar/sonuclar" className="text-gray-400 hover:text-primary transition-colors">Sonuçlar</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <p className="text-sm text-gray-500 text-center">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </JuriClientWrapper>
    )
}
