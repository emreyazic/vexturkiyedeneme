'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { CorporateHero } from '@/components/CorporateHero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Users, Award, Clock, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { getTranslation } from '@/lib/utils'

const content = {
    TR: {
        hero: {
            title: "RECF Türkiye Gönüllülük",
            subtitle: "RECF Türkiye etkinliklerinde gönüllü olun; öğrencilerin yarışma deneyimine katkı sağlayın."
        },
        rolesBadge: "Resmi RECF Roller",
        title: "Öğrencilerin Mühendislik Yolculuğunda Rehber Olun",
        desc1: "RECF (Robotics Education & Competition Foundation) Türkiye etkinliklerinde görev almak, yarışan öğrencilere ilham vermek ve onlara adil, profesyonel bir ortam sunmak anlamına gelir.",
        desc2: "İster teknoloji ve robotik uzmanı olun, ister bu alana ilgi duyan bir eğitimci; RECF ekosisteminde yeteneklerinize uygun bir görev her zaman vardır. Etkinlik Partneri, Baş Hakem, Jüri Danışmanı veya Saha Yöneticisi gibi rolleri üstlenerek uluslararası standartlarda bir turnuva ortamı oluşturabilirsiniz.",
        eduTitle: "Gönüllü Eğitimi ve Sertifikasyon",
        eduDesc: "Birçok RECF gönüllü rolü için ücretsiz ve online sertifikasyon programları mevcuttur. Head Referee veya Judge Advisor rollerini üstlenebilmek için resmi sertifikasyon sistemini tamamlamanız gerekmektedir.",
        eduBtn: "Eğitim Portalına Git",
        whyVolunteer: [
            { "title": "Fark Yaratın", "description": "Gençlerin STEM kariyerlerine ilk adımlarını atmalarına yardımcı olun." },
            { "title": "Topluluk Olun", "description": "Aynı vizyonu paylaşan eğitimciler ve mentorlarla tanışın." },
            { "title": "Deneyim Kazanın", "description": "Uluslararası standartlarda etkinlik organizasyonu tecrübesi edinin." },
            { "title": "Esnek Katılım", "description": "Müsaitliğinize göre yerel veya ulusal etkinliklere katılın." }
        ],
        form: {
            title: "Gönüllü Başvuru Formu",
            subtitle: "Aşağıdaki formu doldurarak ekibimize katılabilirsiniz. Bilgileriniz Intechne Teknoloji tarafından değerlendirilecektir.",
            name: "Ad Soyad",
            namePlaceholder: "Adınız Soyadınız",
            email: "E-posta",
            emailPlaceholder: "ornek@email.com",
            phone: "Telefon",
            phonePlaceholder: "05XX XXX XX XX",
            city: "Şehir",
            cityPlaceholder: "Yaşadığınız Şehir",
            profession: "Meslek / Kurum",
            professionPlaceholder: "Örn: Bilişim Öğretmeni, Mühendis vb.",
            roleLabel: "İlgilendiğiniz Rol",
            rolePlaceholder: "Bir rol seçin",
            messageLabel: "Kendinizden ve Deneyimlerinizden Bahsedin",
            messagePlaceholder: "Varsa daha önceki gönüllülük deneyimleriniz, yetkinlikleriniz...",
            kvkkConfirm: "Kişisel verilerimin Intechne Teknoloji tarafından kapsamında işlenmesini ve Gönüllülük faaliyetleri doğrultusunda saklanmasını onaylıyorum.",
            kvkkLink: "KVKK Aydınlatma Metni",
            submit: "Başvuruyu Gönder",
            kvkkAlert: "Lütfen KVKK Aydınlatma Metni'ni onaylayın.",
            successAlert: "Gönüllülük başvurunuz başarıyla alındı! İlgili birimimiz en kısa sürede sizinle iletişime geçecektir."
        },
        volunteerRoles: [
            { "value": "event-partner", "label": "Event Partner (Etkinlik Partneri)" },
            { "value": "head-referee", "label": "Head Referee (Baş Hakem)" },
            { "value": "scorekeeper-referee", "label": "Scorekeeper Referee (Skor Hakemi)" },
            { "value": "judge-advisor", "label": "Judge Advisor (Jüri Danışmanı)" },
            { "value": "judge", "label": "Judge (Jüri Üyesi)" },
            { "value": "robot-inspector", "label": "Robot Inspector (Robot Denetmeni)" },
            { "value": "field-manager", "label": "Field Manager (Saha Yöneticisi)" },
            { "value": "emcee", "label": "Emcee (Sunucu)" },
            { "value": "media", "label": "Medya ve İletişim" }
        ]
    },
    EN: {
        hero: {
            title: "RECF Turkey Volunteering",
            subtitle: "Volunteer at RECF Turkey events; contribute to students' competition experience."
        },
        rolesBadge: "Official RECF Roles",
        title: "Be a Guide on Students' Engineering Journey",
        desc1: "Volunteering at RECF (Robotics Education & Competition Foundation) Turkey events means inspiring student competitors and providing them with a fair, professional environment.",
        desc2: "Whether you are a technology and robotics expert or an educator interested in this field, there is always a role in the RECF ecosystem that matches your skills. You can create an international standard tournament atmosphere by taking on roles such as Event Partner, Head Referee, Judge Advisor, or Field Manager.",
        eduTitle: "Volunteer Training and Certification",
        eduDesc: "Free online certification programs are available for many RECF volunteer roles. To assume Head Referee or Judge Advisor roles, you must complete the official certification system.",
        eduBtn: "To the Training Portal",
        whyVolunteer: [
            { "title": "Make a Difference", "description": "Help young people take their first steps into STEM careers." },
            { "title": "Become a Community", "description": "Meet educators and mentors who share the same vision." },
            { "title": "Gain Experience", "description": "Acquire experience in organizing international standard events." },
            { "title": "Flexible Participation", "description": "Join local or national events according to your availability." }
        ],
        form: {
            title: "Volunteer Application Form",
            subtitle: "You can join our team by filling out the form below. Your information will be evaluated by Intechne Teknoloji.",
            name: "Name Surname",
            namePlaceholder: "Your Name Surname",
            email: "Email",
            emailPlaceholder: "E-mail Address",
            phone: "Phone",
            phonePlaceholder: "05XX XXX XX XX",
            city: "City",
            cityPlaceholder: "Your City",
            profession: "Profession / Institution",
            professionPlaceholder: "e.g., IT Teacher, Engineer, etc.",
            roleLabel: "Interested Role",
            rolePlaceholder: "Select a role",
            messageLabel: "Tell us about yourself and your experience",
            messagePlaceholder: "If you have previous volunteer experience, your qualifications...",
            kvkkConfirm: "I consent to the processing and storage of my personal data by Intechne Teknoloji within the scope of Volunteer activities.",
            kvkkLink: "KVKK Clarification Text",
            submit: "Submit Application",
            kvkkAlert: "Please confirm the KVKK Clarification Text.",
            successAlert: "Your volunteer application has been successfully received! Our relevant department will contact you as soon as possible."
        },
        volunteerRoles: [
            { "value": "event-partner", "label": "Event Partner" },
            { "value": "head-referee", "label": "Head Referee" },
            { "value": "scorekeeper-referee", "label": "Scorekeeper Referee" },
            { "value": "judge-advisor", "label": "Judge Advisor" },
            { "value": "judge", "label": "Judge" },
            { "value": "robot-inspector", "label": "Robot Inspector" },
            { "value": "field-manager", "label": "Field Manager" },
            { "value": "emcee", "label": "Emcee" },
            { "value": "media", "label": "Media and Communication" }
        ]
    }
}

export default function GonulluOlunPage() {
    const { language, setLanguage } = useLanguage()
    const { t, isFallback } = getTranslation(content, language)

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
            alert(t.form.kvkkAlert)
            return
        }
        console.log('Form submitted:', formData)
        alert(t.form.successAlert)
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const icons = [Heart, Users, Award, Clock]

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar
                language={language}
                onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={isFallback}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Info */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">{t.rolesBadge}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {t.title}
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                                <p>{t.desc1}</p>
                                <p>{t.desc2}</p>
                            </div>

                            {/* Sertifikasyon */}
                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-10">
                                <div className="flex items-start gap-4">
                                    <BookOpen className="w-8 h-8 text-blue-600 shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.eduTitle}</h3>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                            {t.eduDesc}
                                        </p>
                                        <a href="https://certifications.vex.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                            {t.eduBtn}
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Why Volunteer */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                {t.whyVolunteer.map((item: any, index: number) => {
                                    const IconComponent = icons[index] || Heart
                                    return (
                                        <div key={index} className="flex flex-col">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                                                <IconComponent className="w-6 h-6 text-primary" />
                                            </div>
                                            <h4 className="text-md font-bold text-gray-900 mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div>
                            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl shadow-gray-200/40">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.form.title}</h3>
                                <p className="text-gray-500 mb-8 text-sm">{t.form.subtitle}</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{t.form.name}</Label>
                                            <Input
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                placeholder={t.form.namePlaceholder}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t.form.email}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder={t.form.emailPlaceholder}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t.form.phone}</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                placeholder={t.form.phonePlaceholder}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">{t.form.city}</Label>
                                            <Input
                                                id="city"
                                                required
                                                value={formData.city}
                                                onChange={(e) => handleChange('city', e.target.value)}
                                                placeholder={t.form.cityPlaceholder}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="profession">{t.form.profession}</Label>
                                        <Input
                                            id="profession"
                                            required
                                            value={formData.profession}
                                            onChange={(e) => handleChange('profession', e.target.value)}
                                            placeholder={t.form.professionPlaceholder}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>{t.form.roleLabel}</Label>
                                        <Select required value={formData.role} onValueChange={(val) => handleChange('role', val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t.form.rolePlaceholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {t.volunteerRoles.map((role: any) => (
                                                    <SelectItem key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">{t.form.messageLabel}</Label>
                                        <Textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            placeholder={t.form.messagePlaceholder}
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
                                            className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none"
                                        >
                                            {t.form.kvkkConfirm.split('KVKK Aydınlatma Metni')[0]}
                                            <Link href="/hukuki/kvkk" className="text-primary hover:underline">{t.form.kvkkLink}</Link>
                                            {t.form.kvkkConfirm.split('KVKK Aydınlatma Metni')[1]}
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                                        {t.form.submit}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer language={language} />
        </div>
    )
}
