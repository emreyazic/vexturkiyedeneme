'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'TR' | 'EN'

interface LanguageContextProps {
    language: Language
    setLanguage: (lang: Language | ((prev: Language) => Language)) => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('TR')

    // Read initial state from localStorage on client-side mount
    useEffect(() => {
        const stored = localStorage.getItem('language') as Language
        if (stored === 'TR' || stored === 'EN') {
            setLanguageState(stored)
        }
    }, [])

    const setLanguage = (lang: Language | ((prev: Language) => Language)) => {
        setLanguageState((prev) => {
            const next = typeof lang === 'function' ? lang(prev) : lang
            localStorage.setItem('language', next)
            return next
        })
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
