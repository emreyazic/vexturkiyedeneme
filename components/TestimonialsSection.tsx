'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface TestimonialsSectionProps {
    language: 'TR' | 'EN'
}

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    const content = {
        TR: {
            label: 'BAŞARI HİKAYELERİ',
            title: 'Topluluğumuzun Sesine Kulak Verin',
            subtitle: 'VEX Türkiye ailesinden ilham verici hikayeler',
            testimonials: [
                {
                    id: 1,
                    quote: 'VEX yarışmaları sayesinde hem mühendislik becerilerimi geliştirdim hem de hayat boyu sürecek arkadaşlıklar kurdum. Takım çalışması ve problem çözme yeteneklerim inanılmaz gelişti.',
                    name: 'Elif Yılmaz',
                    role: 'VEX V5 Takım Kaptanı',
                    team: 'Takım 12345A - İstanbul',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 2,
                    quote: 'Mentor olarak öğrencilerin gözlerindeki o ışıltıyı görmek, robotlarını ilk kez çalıştırdıklarındaki heyecanları... Bu deneyim kariyerimdeki en tatmin edici şeylerden biri.',
                    name: 'Ahmet Kaya',
                    role: 'VEX IQ Mentor',
                    team: 'ODTÜ Teknokent',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 3,
                    quote: 'Okulumuzda VEX programını başlattığımızda öğrencilerin STEM\'e olan ilgisinde muazzam bir artış gördük. Artık robotik kulübümüz en popüler aktivite!',
                    name: 'Zeynep Demir',
                    role: 'STEM Koordinatörü',
                    team: 'Özel Bilim Koleji - Ankara',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 4,
                    quote: 'VEX Dünya Şampiyonası\'nda Türkiye\'yi temsil etmek hayatımın en gurur verici anıydı. Bu yolculuk bana sadece mühendislik değil, azim ve liderlik de öğretti.',
                    name: 'Can Özkan',
                    role: 'VEX U Yarışmacısı',
                    team: 'Boğaziçi Üniversitesi Robotik',
                    videoId: 'dQw4w9WgXcQ'
                }
            ]
        },
        EN: {
            label: 'SUCCESS STORIES',
            title: 'Hear From Our Community',
            subtitle: 'Inspiring stories from the VEX Turkey family',
            testimonials: [
                {
                    id: 1,
                    quote: 'Through VEX competitions, I developed my engineering skills and formed lifelong friendships. My teamwork and problem-solving abilities improved incredibly.',
                    name: 'Elif Yılmaz',
                    role: 'VEX V5 Team Captain',
                    team: 'Team 12345A - Istanbul',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 2,
                    quote: 'As a mentor, seeing that spark in students\' eyes when their robots work for the first time... This experience is one of the most fulfilling things in my career.',
                    name: 'Ahmet Kaya',
                    role: 'VEX IQ Mentor',
                    team: 'METU Technopolis',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 3,
                    quote: 'When we started the VEX program at our school, we saw a tremendous increase in students\' interest in STEM. Now our robotics club is the most popular activity!',
                    name: 'Zeynep Demir',
                    role: 'STEM Coordinator',
                    team: 'Private Science College - Ankara',
                    videoId: 'dQw4w9WgXcQ'
                },
                {
                    id: 4,
                    quote: 'Representing Turkey at the VEX World Championship was the proudest moment of my life. This journey taught me not only engineering but also perseverance and leadership.',
                    name: 'Can Özkan',
                    role: 'VEX U Competitor',
                    team: 'Boğaziçi University Robotics',
                    videoId: 'dQw4w9WgXcQ'
                }
            ]
        }
    }

    const t = content[language]
    const currentTestimonial = t.testimonials[activeIndex]

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % t.testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length)
    }

    return (
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {/* Label */}
                    <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                        {t.label}
                    </span>

                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                        {t.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                {/* Testimonial Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Side - Video */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
                            >
                                {/* Video Placeholder with Play Button */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    {/* Decorative Grid */}
                                    <div
                                        className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '30px 30px'
                                        }}
                                    />

                                    {/* VEX Logo Watermark */}
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <span className="text-white font-bold">VEX</span>
                                        <span className="text-primary font-bold"> Türkiye</span>
                                    </div>

                                    {/* Play Button */}
                                    <button className="group relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform z-10">
                                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                                    </button>

                                    {/* Person Name Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3">
                                            <div className="text-white font-semibold">{currentTestimonial.name}</div>
                                            <div className="text-white/70 text-sm">{currentTestimonial.role}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-primary/50 rounded-tl-2xl" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-primary/50 rounded-br-2xl" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Side - Quote Card */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 relative"
                            >
                                {/* Decorative Quote Icon - Top */}
                                <div className="absolute -top-4 left-8">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                        <Quote className="w-6 h-6 text-white" fill="white" />
                                    </div>
                                </div>

                                {/* Quote Text */}
                                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 mt-4 italic">
                                    "{currentTestimonial.quote}"
                                </blockquote>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar Placeholder */}
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>

                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">
                                            {currentTestimonial.name}
                                        </div>
                                        <div className="text-primary font-medium">
                                            {currentTestimonial.role}
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            {currentTestimonial.team}
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Quote Icon - Bottom Right */}
                                <div className="absolute bottom-8 right-8 opacity-5">
                                    <Quote className="w-32 h-32 text-primary" fill="currentColor" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            {/* Previous Button */}
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {t.testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`transition-all duration-300 ${index === activeIndex
                                                ? 'w-8 h-3 bg-primary rounded-full'
                                                : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
