'use client'

import React, { useState } from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Users, Award, Clock, ArrowRight, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const volunteerRoles = [
    { value: 'event-partner', label: 'Event Partner (Etkinlik Partneri)' },
    { value: 'head-referee', label: 'Head Referee (Baş Hakem)' },
    { value: 'scorekeeper-referee', label: 'Scorekeeper Referee (Skor Hakemi)' },
    { value: 'judge-advisor', label: 'Judge Advisor (Jüri Danışmanı)' },
    { value: 'judge', label: 'Judge (Jüri Üyesi)' },
    { value: 'robot-inspector', label: 'Robot Inspector (Robot Denetmeni)' },
    { value: 'field-manager', label: 'Field Manager (Saha Yöneticisi)' },
    { value: 'emcee', label: 'Emcee (Sunucu)' },
    { value: 'media', label: 'Medya ve İletişim' },
]

const whyVolunteer = [
    { icon: Heart, title: 'Fark Yaratın', description: 'Gençlerin STEM kariyerlerine ilk adımlarını atmalarına yardımcı olun.' },
    { icon: Users, title: 'Topluluk Olun', description: 'Aynı vizyonu paylaşan eğitimciler ve mentorlarla tanışın.' },
    { icon: Award, title: 'Deneyim Kazanın', description: 'Uluslararası standartlarda etkinlik organizasyonu tecrübesi edinin.' },
    { icon: Clock, title: 'Esnek Katılım', description: 'Müsaitliğinize göre yerel veya ulusal etkinliklere katılın.' },
]

export default function GonulluOlunPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        profession: '',
        role: '',
        message: ''
    })
    const [kvkkApproved, setKvkkApproved] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!kvkkApproved) {
            alert('Lütfen KVKK Aydınlatma Metni\'ni onaylayın.')
            return
        }
        // Form submission logic would go here
        console.log('Form submitted:', formData)
        alert('Gönüllülük başvurunuz başarıyla alındı! İlgili birimimiz en kısa sürede sizinle iletişime geçecektir.')
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="RECF Türkiye Gönüllülük"
                subtitle="RECF Türkiye etkinliklerinde gönüllü olun; öğrencilerin yarışma deneyimine katkı sağlayın."
            />

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Info */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Resmi RECF Roller</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Öğrencilerin Mühendislik Yolculuğunda Rehber Olun
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                                <p>
                                    RECF (Robotics Education & Competition Foundation) Türkiye etkinliklerinde görev almak, yarışan öğrencilere ilham vermek ve onlara adil, profesyonel bir ortam sunmak anlamına gelir.
                                </p>
                                <p>
                                    İster teknoloji ve robotik uzmanı olun, ister bu alana ilgi duyan bir eğitimci; RECF ekosisteminde yeteneklerinize uygun bir görev her zaman vardır. Etkinlik Partneri, Baş Hakem, Jüri Danışmanı veya Saha Yöneticisi gibi rolleri üstlenerek uluslararası standartlarda bir turnuva ortamı oluşturabilirsiniz.
                                </p>
                            </div>

                            {/* Sertifikasyon */}
                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-10">
                                <div className="flex items-start gap-4">
                                    <BookOpen className="w-8 h-8 text-blue-600 shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gönüllü Eğitimi ve Sertifikasyon</h3>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                            Birçok RECF gönüllü rolü için ücretsiz ve online sertifikasyon programları mevcuttur. Head Referee veya Judge Advisor rollerini üstlenebilmek için resmi sertifikasyon sistemini tamamlamanız gerekmektedir.
                                        </p>
                                        <a href="https://certifications.vex.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                            Eğitim Portalına Git
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Why Volunteer */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                {whyVolunteer.map((item, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h4 className="text-md font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div>
                            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl shadow-gray-200/40">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gönüllü Başvuru Formu</h3>
                                <p className="text-gray-500 mb-8 text-sm">Aşağıdaki formu doldurarak ekibimize katılabilirsiniz. Bilgileriniz Intechne Teknoloji tarafından değerlendirilecektir.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Ad Soyad</Label>
                                            <Input
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                placeholder="Adınız Soyadınız"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">E-posta</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Telefon</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                placeholder="05XX XXX XX XX"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">Şehir</Label>
                                            <Input
                                                id="city"
                                                required
                                                value={formData.city}
                                                onChange={(e) => handleChange('city', e.target.value)}
                                                placeholder="Yaşadığınız Şehir"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="profession">Meslek / Kurum</Label>
                                        <Input
                                            id="profession"
                                            required
                                            value={formData.profession}
                                            onChange={(e) => handleChange('profession', e.target.value)}
                                            placeholder="Örn: Bilişim Öğretmeni, Mühendis vb."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>İlgilendiğiniz Rol</Label>
                                        <Select required value={formData.role} onValueChange={(val) => handleChange('role', val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Bir rol seçin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {volunteerRoles.map(role => (
                                                    <SelectItem key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Kendinizden ve Deneyimlerinizden Bahsedin</Label>
                                        <Textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            placeholder="Varsa daha önceki gönüllülük deneyimleriniz, yetkinlikleriniz..."
                                            className="min-h-[120px]"
                                        />
                                    </div>

                                    <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <Checkbox 
                                            id="kvkk" 
                                            checked={kvkkApproved}
                                            onCheckedChange={(checked) => setKvkkApproved(checked as boolean)}
                                        />
                                        <label
                                            htmlFor="kvkk"
                                            className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                                        >
                                            Kişisel verilerimin Intechne Teknoloji tarafından <a href="#" className="text-primary hover:underline">KVKK Aydınlatma Metni</a> kapsamında işlenmesini ve gönüllülük faaliyetleri doğrultusunda saklanmasını onaylıyorum.
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                                        Başvuruyu Gönder
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">RECF</div>
                            <div>
                                <div className="text-lg font-bold">RECF TÜRKİYE</div>
                                <div className="text-xs text-gray-400">Türkiye Temsilcisi: Intechne Teknoloji</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">© 2026 RECF Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
