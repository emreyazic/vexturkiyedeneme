'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Search, ChevronDown, HelpCircle, Wrench, UserPlus,
    Calendar, MessageCircle, ExternalLink
} from 'lucide-react'

// FAQ Categories
const faqCategories = [
    { id: 'all', label: 'Tümü', icon: HelpCircle },
    { id: 'technical', label: 'Teknik Sorunlar', icon: Wrench },
    { id: 'registration', label: 'Kayıt Süreçleri', icon: UserPlus },
    { id: 'championship', label: '28 Şubat 2026 Türkiye Şampiyonası', icon: Calendar }
]

// FAQ Items
const faqItems = [
    // Technical
    {
        id: 1,
        category: 'technical',
        question: 'VEXcode programı açılmıyor, ne yapmalıyım?',
        answer: 'Öncelikle programın son sürümünü kullandığınızdan emin olun. VEXcode\'u tamamen kaldırıp yeniden yüklemeyi deneyin. Sorun devam ederse, antivirüs programınızı geçici olarak devre dışı bırakın ve tekrar deneyin. Daha fazla yardım için teknik destek ekibimize ulaşın.'
    },
    {
        id: 2,
        category: 'technical',
        question: 'V5 Brain\'e program yükleyemiyorum',
        answer: 'USB kablosunun düzgün bağlandığından emin olun. Brain\'in şarjlı olduğunu kontrol edin. VEXcode\'da doğru port seçili mi kontrol edin. Brain\'i yeniden başlatmayı deneyin. Farklı bir USB kablosu deneyebilirsiniz.'
    },
    {
        id: 3,
        category: 'technical',
        question: 'Motorlarım düzgün çalışmıyor',
        answer: 'Motor kablolarının sıkı bağlı olduğunu kontrol edin. VEXcode\'da motor portlarının doğru atandığından emin olun. Motorun yönünü (forward/reverse) kontrol edin. Farklı bir portta deneyerek port arızası olup olmadığını test edin.'
    },
    {
        id: 4,
        category: 'technical',
        question: 'İnertial Sensor kalibrasyon hatası veriyor',
        answer: 'Kalibrasyon sırasında robotu düz ve sabit bir zemine yerleştirin. Kalibrasyon bitmeden robotu hareket ettirmeyin (yaklaşık 5 saniye). Sensörün Brain\'e düzgün bağlandığını kontrol edin. Kalibrasyon kodunu program başında çağırdığınızdan emin olun.'
    },
    // Registration
    {
        id: 5,
        category: 'registration',
        question: 'Takım kaydı nasıl yapılır?',
        answer: 'recfevents.org adresine giderek REC Foundation hesabı oluşturun. "Register a Team" seçeneğinden takımınızı kaydedin. Okul veya kurum bilgilerinizi ekleyin. Kayıt sürecinizi online olarak tamamlayın. Takım numaranız sistem tarafından atanacaktır.'
    },
    {
        id: 6,
        category: 'registration',
        question: 'Kayıt ücreti ne kadar?',
        answer: 'Takım kayıt ücretleri RECF tarafından yıllık olarak belirlenir ve tüm sezon boyunca geçerlidir. Türkiye\'deki resmi etkinlik ve turnuva katılım koşulları temsilcimiz Intechne Teknoloji tarafından duyurulur.'
    },
    {
        id: 7,
        category: 'registration',
        question: 'Bir etkinliğe nasıl kayıt olurum?',
        answer: 'recfevents.org\'da ilgili etkinlik sayfasına giderek "Register" butonuna tıklayın. Takımınızı seçin ve gerekli kayıt adımlarını tamamlayın.'
    },
    {
        id: 8,
        category: 'registration',
        question: 'Takım numaramı nasıl öğrenebilirim?',
        answer: 'recfevents.org hesabınıza giriş yaptığınızda kullanıcı panelinizden takımlarınızı görebilirsiniz. Takım numarası genellikle "12345A" formatındadır.'
    },
    // Championship
    {
        id: 9,
        category: 'championship',
        question: 'Türkiye Şampiyonası\'na nasıl katılabilirim?',
        answer: 'Türkiye Şampiyonası\'na katılmak için sezon içinde resmi turnuvalarda derece veya sıralama elde etmiş olmak gerekir. Detaylı katılım kriterleri RECF Türkiye duyurularında yayınlanır.'
    },
    {
        id: 10,
        category: 'championship',
        question: 'Şampiyona mekanı neresi?',
        answer: '28 Şubat 2026 Türkiye Şampiyonası adresi ve salon detayları RECF Türkiye ve Intechne Teknoloji kanallarından resmi olarak açıklanacaktır.'
    },
    {
        id: 11,
        category: 'championship',
        question: 'Şampiyonada kaç takım yarışacak?',
        answer: 'Tüm yaş grupları ve kategoriler genelinde resmi kayıtlı takımların yer alacağı geniş katılımlı bir ulusal şampiyona organizasyonu planlanmaktadır.'
    },
    {
        id: 12,
        category: 'championship',
        question: 'Dünya Şampiyonası\'na nasıl gidilir?',
        answer: 'Türkiye Şampiyonası\'nda dereceye giren veya Skills sıralamasında üst sıralarda yer alan takımlar RECF STEM World Championship uluslararası şampiyona süreçlerine aday olur. Etkinlik Nisan ayında Dallas, Texas\'ta düzenlenir.'
    }
]

// Accordion Item Component
function AccordionItem({ item, isOpen, onToggle }: {
    item: typeof faqItems[0];
    isOpen: boolean;
    onToggle: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white"
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function SSSPage() {
    const { language, setLanguage } = useLanguage()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [openItems, setOpenItems] = useState<number[]>([])

    const filteredFAQs = useMemo(() => {
        let results = faqItems

        // Filter by category
        if (selectedCategory !== 'all') {
            results = results.filter(item => item.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            results = results.filter(
                item =>
                    item.question.toLowerCase().includes(query) ||
                    item.answer.toLowerCase().includes(query)
            )
        }

        return results
    }, [selectedCategory, searchQuery])

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />

            <div className="h-20" />
            <CorporateHero
                title="Hızlı Çözüm İstasyonu"
                subtitle="Sıkça sorulan sorular ve anında cevaplar"
            />

            {/* Search Bar */}
            <section className="py-8 bg-gray-900 sticky top-20 z-30">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Sorununuzu arayın... (örn: motor, kayıt, şampiyona)"
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-white/30 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-6 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {faqCategories.map(category => {
                            const Icon = category.icon
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${selectedCategory === category.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {category.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-3xl">
                    {/* Results count */}
                    <div className="mb-6 text-sm text-gray-500">
                        {filteredFAQs.length} sonuç bulundu
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {filteredFAQs.map(item => (
                            <AccordionItem
                                key={item.id}
                                item={item}
                                isOpen={openItems.includes(item.id)}
                                onToggle={() => toggleItem(item.id)}
                            />
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">Aramanızla eşleşen sonuç bulunamadı</p>
                            <Button
                                variant="outline"
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            >
                                Filtreleri Temizle
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Still Need Help CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-red-700 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Hâlâ Yardıma İhtiyacınız Var mı?</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Sorununuzun cevabını bulamadıysanız, size yardımcı olmaktan mutluluk duyarız
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim/form">
                            <Button className="bg-white text-primary hover:bg-gray-100 font-bold">
                                Form ile Ulaşın
                            </Button>
                        </Link>
                        <a href="mailto:info@recfturkiye.org">
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                                E-posta Gönderin
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
