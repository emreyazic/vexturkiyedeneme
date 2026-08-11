'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'

const content = {
    TR: {
        hero: {
            title: 'Teknik Belgeler',
            subtitle: 'RECF resmi dökümanları ve kaynakları',
        },

        stats: {
            title: 'Resmi Kaynaklar',
            description: 'PDF dokümanları ve rehberler',
            document: 'Belge',
            new: 'Yeni',
        },
    },

    EN: {
        hero: {
            title: 'Technical Documents',
            subtitle: 'Official RECF documents and resources',
        },

        stats: {
            title: 'Official Resources',
            description: 'PDF documents and guides',
            document: 'Documents',
            new: 'New',
        },
    },
} as const

interface TeknikBelgelerHeaderProps {
    resourceCount: number
    newResourceCount: number
}

export function TeknikBelgelerHeader({
    resourceCount,
    newResourceCount,
}: TeknikBelgelerHeaderProps) {
    const { language, setLanguage } = useLanguage()
    const t = content[language]

    return (
        <>
            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l =>
                        l === 'TR' ? 'EN' : 'TR'
                    )
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            <CorporateHero
                title={t.hero.title}
                subtitle={t.hero.subtitle}
            />

            {/* Stats Bar */}
            <section className="py-6 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    {t.stats.title}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    {t.stats.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {resourceCount}
                                </div>

                                <div className="text-sm text-gray-400">
                                    {t.stats.document}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-500">
                                    {newResourceCount}
                                </div>

                                <div className="text-sm text-gray-400">
                                    {t.stats.new}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}