'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Filter, ShieldCheck, Database } from 'lucide-react'

// Veri tabanı hazır olana kadar ve KVKK onayları tamamlanana kadar liste boş tutulur.
const verifiedTeams: any[] = [] 

export default function TakimDiziniPage() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />

            <CorporateHero
                title="RECF Türkiye Takım Dizini"
                subtitle="Kayıtlı ve doğrulanmış RECF Türkiye takımları"
            />

            <section className="py-12 bg-white min-h-[50vh]">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Filters Placeholder - disabled since no data */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input 
                                placeholder="Takım Numarası veya Adı Ara..." 
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-xl text-lg"
                                disabled
                            />
                        </div>
                        <div className="w-full md:w-56 relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Program (Tümü)</option>
                            </select>
                        </div>
                        <div className="w-full md:w-56 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select disabled className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium appearance-none outline-none cursor-not-allowed text-gray-500">
                                <option>Şehir (Tümü)</option>
                            </select>
                        </div>
                    </div>

                    {/* Empty State / KVKK Status */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-12 text-center max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner">
                            <Database className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">2026-2027 Sezonu Kayıtları Güncelleniyor</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            RECF Türkiye Takım Dizini, doğrudan <strong>RECFevents</strong> sistemiyle senkronize edilmektedir. Ekiplerimizin kişisel veri ve gizlilik izinleri (KVKK) onay süreçleri tamamlandıktan sonra, sadece platformda görünürlüğe onay veren doğrulanmış takımlar burada listelenecektir.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Görünecek Veri</div>
                                <div className="text-sm font-medium text-gray-900">Takım Numarası ve Adı</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Görünecek Veri</div>
                                <div className="text-sm font-medium text-gray-900">Program ve Şehir</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm sm:col-span-2 md:col-span-1">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Görünecek Veri</div>
                                <div className="text-sm font-medium text-gray-900">Kurum ve Kuruluş Yılı</div>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-600/20">
                            <ShieldCheck className="w-5 h-5" />
                            KVKK Doğrulama Sürecinde
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}