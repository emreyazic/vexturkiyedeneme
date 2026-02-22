'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CorporateHeroProps {
    title: string
    subtitle?: string
    backgroundImage?: string
}

export function CorporateHero({ title, subtitle, backgroundImage }: CorporateHeroProps) {
    return (
        <section className="relative min-h-[320px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0">
                {backgroundImage ? (
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 max-w-7xl text-center">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Ana Sayfa</span>
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}

                {/* Decorative line */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="w-12 h-1 bg-primary rounded-full" />
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div className="w-12 h-1 bg-primary rounded-full" />
                </div>
            </div>
        </section>
    )
}
