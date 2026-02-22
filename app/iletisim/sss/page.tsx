'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
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
        answer: 'robotevents.com adresine giderek VEX hesabı oluşturun. "Register a Team" seçeneğinden takımınızı kaydedin. Okul veya kurum bilgilerinizi ekleyin. Kayıt ücretini online olarak ödeyin. Takım numaranız otomatik olarak atanacaktır.'
    },
    {
        id: 6,
        category: 'registration',
        question: 'Kayıt ücreti ne kadar?',
        answer: 'VEX V5 RC takım kaydı yıllık $150, VEX IQ Challenge kaydı yıllık $100\'dır. Bu ücret tüm sezon boyunca geçerlidir ve sınırsız sayıda etkinliğe kayıt imkanı sağlar. Türkiye\'deki etkinliklerin katılım ücretleri ayrıca belirlenir.'
    },
    {
        id: 7,
        category: 'registration',
        question: 'Bir etkinliğe nasıl kayıt olurum?',
        answer: 'robotevents.com\'da etkinlik sayfasına gidin. "Register" butonuna tıklayın. Takımınızı seçin ve gerekli bilgileri doldurun. Giriş ücreti varsa ödemeyi tamamlayın. Kayıt onayı e-posta ile gelecektir.'
    },
    {
        id: 8,
        category: 'registration',
        question: 'Takım numaramı nasıl öğrenebilirim?',
        answer: 'robotevents.com hesabınıza giriş yaptığınızda Dashboard\'da takımlarınızı görebilirsiniz. Takım numarası genellikle "12345A" formatındadır. Kayıt sonrası gelen onay e-postasında da bu bilgi yer alır.'
    },
    // Championship
    {
        id: 9,
        category: 'championship',
        question: 'Türkiye Şampiyonası\'na nasıl katılabilirim?',
        answer: '28 Şubat 2026 Türkiye Şampiyonası\'na katılmak için sezon içinde en az bir bölgesel turnuvaya katılmış olmanız gerekir. Bölgesel turnuvalarda kazanılan ödüller veya skills sıralaması üzerinden davet alabilirsiniz. Açık kayıt döneminde doğrudan başvuru da yapabilirsiniz.'
    },
    {
        id: 10,
        category: 'championship',
        question: 'Şampiyona mekanı neresi?',
        answer: '28 Şubat 2026 Türkiye Şampiyonası İstanbul\'da düzenlenecektir. Kesin mekan ve adres bilgisi yakın tarihte duyurulacaktır. Etkinlik öncesi tüm takımlara detaylı bilgi e-posta ile gönderilecektir.'
    },
    {
        id: 11,
        category: 'championship',
        question: 'Şampiyonada kaç takım yarışacak?',
        answer: 'Bu yıl hem VEX V5 RC hem de VEX IQ kategorilerinde toplam 150+ takımın katılması bekleniyor. Her kategori için ayrı sahalar ve programlar hazırlanmaktadır.'
    },
    {
        id: 12,
        category: 'championship',
        question: 'Dünya Şampiyonası\'na nasıl gidilir?',
        answer: 'Türkiye Şampiyonası\'nda Excellence Award, Tournament Champion veya diğer ödülleri kazanan takımlar VEX Worlds\'e davet alır. Skills sıralamasında üst sıralarda yer alan takımlar da davet edilebilir. Dünya Şampiyonası Nisan ayında Dallas, Texas\'ta düzenlenir.'
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
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
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
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

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
                            <Button className="bg-white text-primary hover:bg-gray-100">
                                Form ile Ulaşın
                            </Button>
                        </Link>
                        <a href="mailto:info@vexturkiye.com">
                            <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                E-posta Gönderin
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
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
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3">
                                <li><a href="/iletisim/bilgiler" className="text-gray-400 hover:text-primary transition-colors">Bilgiler & Adres</a></li>
                                <li><a href="/iletisim/form" className="text-gray-400 hover:text-primary transition-colors">Bize Ulaşın</a></li>
                                <li><a href="/iletisim/sss" className="text-gray-400 hover:text-primary transition-colors">SSS</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Adres</h3>
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
        </div>
    )
}
