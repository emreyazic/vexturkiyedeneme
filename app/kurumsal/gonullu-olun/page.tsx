'use client'

import React from 'react'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, Users, Award, Clock, CheckCircle2 } from 'lucide-react'

const volunteerRoles = [
    { value: 'hakem', label: 'Hakem' },
    { value: 'juri', label: 'Jüri Üyesi' },
    { value: 'teknik', label: 'Teknik Destek' },
    { value: 'genel', label: 'Genel Gönüllü' },
    { value: 'saha', label: 'Saha Personeli' },
    { value: 'kayit', label: 'Kayıt Görevlisi' },
]

const whyVolunteer = [
    { icon: Heart, title: 'Fark Yaratın', description: 'Gençlerin STEM kariyerlerine ilk adımlarını atmalarına yardımcı olun.' },
    { icon: Users, title: 'Topluluk Olun', description: 'Aynı vizyonu paylaşan eğitimciler ve mentorlarla tanışın.' },
    { icon: Award, title: 'Deneyim Kazanın', description: 'Uluslararası standartlarda etkinlik organizasyonu tecrübesi edinin.' },
    { icon: Clock, title: 'Esnek Katılım', description: 'Müsaitliğinize göre yerel veya ulusal etkinliklere katılın.' },
]

export default function GonulluOlunPage() {
    const [language, setLanguage] = React.useState<'TR' | 'EN'>('TR')
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        profession: '',
        role: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Form submission logic would go here
        console.log('Form submitted:', formData)
        alert('Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.')
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Gönüllü Olun"
                subtitle="VEX Türkiye ailesine katılın, geleceği birlikte şekillendirelim"
            />

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Info */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <Heart className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Gönüllülük</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Gençlerin Hayatına Dokunun
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                                <p>
                                    VEX Türkiye turnuvalarında gönüllü olarak yer almak, sadece bir etkinliğe katkı sağlamak değil,
                                    <strong className="text-gray-900"> geleceğin mühendislerinin, bilim insanlarının ve liderlerinin yetişmesine</strong>
                                    doğrudan katkıda bulunmak demektir.
                                </p>
                                <p>
                                    Hakemlik, jüri üyeliği, teknik destek veya saha personeli olarak katılabileceğiniz
                                    turnuvalarımızda, öğrencilerin yaratıcılıklarını sergilemelerine ve rekabet ruhunu
                                    deneyimlemelerine tanıklık edeceksiniz.
                                </p>
                                <p>
                                    Tüm gönüllülerimize kapsamlı eğitim ve sürekli destek sağlıyoruz. Önceki deneyiminiz
                                    ne olursa olsun, size uygun bir rol mutlaka vardır!
                                </p>
                            </div>

                            {/* Why Volunteer */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Neden Gönüllü Olmalısınız?</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {whyVolunteer.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                                                <p className="text-xs text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="text-2xl font-bold text-primary">380+</div>
                                    <div className="text-xs text-gray-500">Aktif Gönüllü</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="text-2xl font-bold text-primary">50+</div>
                                    <div className="text-xs text-gray-500">Yıllık Etkinlik</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="text-2xl font-bold text-primary">42</div>
                                    <div className="text-xs text-gray-500">Şehir</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:pl-8">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Gönüllü Başvuru Formu</h3>
                                <p className="text-gray-500 text-sm mb-6">Bilgilerinizi doldurun, sizinle iletişime geçelim.</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Ad Soyad *</Label>
                                            <Input
                                                id="name"
                                                placeholder="Adınız Soyadınız"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                required
                                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-posta *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="ornek@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                required
                                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefon *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="05XX XXX XX XX"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                required
                                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">Şehir *</Label>
                                            <Input
                                                id="city"
                                                placeholder="İstanbul"
                                                value={formData.city}
                                                onChange={(e) => handleChange('city', e.target.value)}
                                                required
                                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="profession" className="text-sm font-medium text-gray-700">Uzmanlık Alanı / Meslek</Label>
                                        <Input
                                            id="profession"
                                            placeholder="Örn: Makine Mühendisi, Öğretmen, Yazılım Geliştirici"
                                            value={formData.profession}
                                            onChange={(e) => handleChange('profession', e.target.value)}
                                            className="border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role" className="text-sm font-medium text-gray-700">Tercih Edilen Rol *</Label>
                                        <Select value={formData.role} onValueChange={(value) => handleChange('role', value)} required>
                                            <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                                                <SelectValue placeholder="Bir rol seçin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {volunteerRoles.map((role) => (
                                                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">Ek Notlar</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Deneyimleriniz, müsaitliğiniz veya eklemek istediğiniz bilgiler..."
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            rows={4}
                                            className="border-gray-300 focus:border-primary focus:ring-primary resize-none"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Başvuruyu Gönder
                                    </Button>

                                    <p className="text-xs text-gray-400 text-center">
                                        Başvurunuz değerlendirildikten sonra 5 iş günü içinde sizinle iletişime geçilecektir.
                                    </p>
                                </form>
                            </div>
                        </div>
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
                            <p className="text-gray-400 text-sm mb-6">Geleceğin mühendislerini yetiştiriyoruz.</p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h3>
                            <ul className="space-y-3">
                                <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Ana Sayfa</a></li>
                                <li><a href="/kurumsal/biz-kimiz" className="text-gray-400 hover:text-primary transition-colors">Biz Kimiz?</a></li>
                                <li><a href="/kurumsal/vizyon-misyon" className="text-gray-400 hover:text-primary transition-colors">Vizyon & Misyon</a></li>
                                <li><a href="/kurumsal/ekibimiz" className="text-gray-400 hover:text-primary transition-colors">Ekibimiz</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Programlar</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX GO</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX IQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX V5</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VEX U</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                                <li>İstanbul, Türkiye</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Gizlilik Politikası</a>
                                <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Kullanım Koşulları</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
