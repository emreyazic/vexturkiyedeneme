'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Trophy, Calendar, Users } from 'lucide-react'

interface V5SeasonSectionProps {
    language: 'TR' | 'EN'
}

export function V5SeasonSection({ language }: V5SeasonSectionProps) {
    const content = {
        TR: {
            label: '2025-2026 ROBOTİK SEZONU',
            title: 'VEX ile Geleceği Keşfedin',
            description: 'Öğrenciler için hazırlanan bu sezonun temasını, kurallarını ve mühendislik zorluklarını keşfedin. Takımınızı kurun ve küresel rekabete hazırlanın.',
            cta: 'Detayları Gör',
            features: [
                { icon: Trophy, text: 'Dünya Şampiyonası Yolu' },
                { icon: Calendar, text: '2025-2026 Sezonu' },
                { icon: Users, text: 'Her Yaş Grubu' }
            ]
        },
        EN: {
            label: '2025-2026 ROBOTICS SEASON',
            title: 'Discover the Future with VEX V5',
            description: 'Explore this season\'s theme, rules, and engineering challenges designed for high school students. Build your team and prepare for global competition.',
            cta: 'View Details',
            features: [
                { icon: Trophy, text: 'World Championship Path' },
                { icon: Calendar, text: '2025-2026 Season' },
                { icon: Users, text: 'Ages 14-18' }
            ]
        }
    }

    const t = content[language]

    return (
        <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Side - Visual/Image Area */}
                    <div className="relative order-2 lg:order-1 hidden md:block">
                        <div className="relative group">
                            {/* Main Image Container */}
                            <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src="/maxresdefault.jpg"
                                    alt="VEX Robotics Season"
                                    fill
                                    className="object-cover"
                                />
                                {/* Removed old overlay */}

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-primary/50 rounded-tl-3xl z-20" />
                                <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-primary/50 rounded-br-3xl z-20" />
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100 hidden md:block z-30">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                        <Trophy className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">30+</div>
                                        <div className="text-sm font-bold text-slate-900">
                                            {language === 'TR' ? 'Ülke Katılıyor' : 'Countries Competing'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="order-1 lg:order-2">
                        {/* Label */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm font-bold tracking-widest text-primary uppercase">
                                {t.label}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-gray-900 leading-tight">
                            {t.title}
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                            {t.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            {t.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
                                >
                                    <feature.icon className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center lg:justify-start w-full">
                            <Link href="/yarismalar/sezon-temasi" className="w-full max-w-[350px] lg:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 group"
                                >
                                    {t.cta}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
