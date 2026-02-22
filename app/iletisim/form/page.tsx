'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Send, User, Mail, MessageSquare, ChevronDown,
    CheckCircle2, Bot, Sparkles, GraduationCap, Briefcase,
    Heart, HelpCircle, Wrench, FileText
} from 'lucide-react'

// Subject options with routing info
const subjectOptions = [
    {
        id: 'student',
        label: 'Öğrenci / Takım Üyesi',
        icon: GraduationCap,
        department: 'Eğitim Birimi',
        color: '#00A651'
    },
    {
        id: 'sponsor',
        label: 'Sponsor Adayı',
        icon: Briefcase,
        department: 'Sponsorluk Birimi',
        color: '#1E3A8A'
    },
    {
        id: 'volunteer',
        label: 'Gönüllü Olmak İstiyorum',
        icon: Heart,
        department: 'Gönüllü Koordinasyonu',
        color: '#E31837'
    },
    {
        id: 'technical',
        label: 'Teknik Destek',
        icon: Wrench,
        department: 'Teknik Ekip',
        color: '#F7941D'
    },
    {
        id: 'press',
        label: 'Basın / Medya',
        icon: FileText,
        department: 'İletişim Birimi',
        color: '#7C3AED'
    },
    {
        id: 'other',
        label: 'Diğer',
        icon: HelpCircle,
        department: 'Genel Destek',
        color: '#6B7280'
    }
]

// Success Animation Component
function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 max-w-md mx-6 text-center shadow-2xl"
            >
                {/* Robot Animation */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    className="w-24 h-24 bg-gradient-to-br from-primary to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                >
                    <Bot className="w-12 h-12 text-white" />
                </motion.div>

                {/* Sparkles */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center gap-2 mb-4"
                >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <Sparkles className="w-6 h-6 text-primary" />
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                >
                    Robotumuz Mesajınızı Ulaştırdı!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 mb-6"
                >
                    En kısa sürede size dönüş yapacağız. Teşekkürler!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button onClick={onComplete} className="bg-primary hover:bg-primary/90">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Tamam
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

// Form Component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isSubjectOpen, setIsSubjectOpen] = useState(false)

    const selectedSubject = subjectOptions.find(s => s.id === formData.subject)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setShowSuccess(true)
    }

    const resetForm = () => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setShowSuccess(false)
    }

    return (
        <>
            <AnimatePresence>
                {showSuccess && <SuccessAnimation onComplete={resetForm} />}
            </AnimatePresence>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
            >
                {/* Name */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adınız Soyadınız
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Ahmet Yılmaz"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresiniz
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="ornek@email.com"
                        />
                    </div>
                </div>

                {/* Subject Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Konu
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        >
                            {selectedSubject ? (
                                <span className="flex items-center gap-3">
                                    <selectedSubject.icon className="w-5 h-5" style={{ color: selectedSubject.color }} />
                                    {selectedSubject.label}
                                </span>
                            ) : (
                                <span className="text-gray-400">Konu Seçiniz</span>
                            )}
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isSubjectOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20"
                                >
                                    {subjectOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, subject: option.id })
                                                setIsSubjectOpen(false)
                                            }}
                                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                                        >
                                            <option.icon className="w-5 h-5" style={{ color: option.color }} />
                                            <div>
                                                <div className="font-medium text-gray-900">{option.label}</div>
                                                <div className="text-xs text-gray-500">→ {option.department}</div>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Department routing info */}
                    {selectedSubject && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 px-3 py-2 bg-gray-50 rounded-lg text-sm"
                        >
                            <span className="text-gray-500">Mesajınız </span>
                            <span className="font-medium" style={{ color: selectedSubject.color }}>
                                {selectedSubject.department}
                            </span>
                            <span className="text-gray-500">&apos;ne iletilecektir.</span>
                        </motion.div>
                    )}
                </div>

                {/* Message */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajınız
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={5}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                            placeholder="Mesajınızı buraya yazın..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isSubmitting || !formData.subject}
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                >
                    {isSubmitting ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2" />
                            Mesajı Gönder
                        </>
                    )}
                </Button>
            </motion.form>
        </>
    )
}

export default function FormPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Bize Ulaşın"
                subtitle="Sorularınız için doğru birime yönlendirelim"
            />

            {/* Form Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-2xl">
                    <ContactForm />
                </div>
            </section>

            {/* Alternative Contact */}
            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acil mi?</h2>
                        <p className="text-gray-600">Aşağıdaki kanallardan da bize ulaşabilirsiniz</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: Mail, label: 'E-posta', value: 'info@vexturkiye.com' },
                            { icon: Instagram, label: 'Instagram DM', value: '@vexturkiye' },
                            { icon: Twitter, label: 'Twitter DM', value: '@vexturkiye' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
                            >
                                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-sm text-gray-500">{item.label}</div>
                                <div className="font-medium text-gray-900">{item.value}</div>
                            </motion.div>
                        ))}
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
