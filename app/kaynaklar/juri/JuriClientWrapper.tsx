'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'

interface JuriClientWrapperProps {
    children: React.ReactNode
}

export function JuriClientWrapper({ children }: JuriClientWrapperProps) {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />
            <div className="h-20" />
            {children}
        </div>
    )
}
