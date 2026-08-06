'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { Navbar } from '@/components/Navbar'

interface JuriClientWrapperProps {
    children: React.ReactNode
}

export function JuriClientWrapper({ children }: JuriClientWrapperProps) {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')}
                showTranslationWarning={language === 'EN'} />
            <div className="h-20" />
            {children}
        </div>
    )
}
