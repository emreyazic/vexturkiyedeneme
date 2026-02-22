'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    MessageCircle, RefreshCcw, Lightbulb, Users, Target, Sparkles, Star, BookOpen, Award
} from 'lucide-react'
import { SanityJuryQuestion } from '@/lib/sanity-queries'
import { LucideIcon } from 'lucide-react'

// Kategori -> Icon eşleştirmesi
const categoryIconMap: Record<string, LucideIcon> = {
    'Takım': Users,
    'Defter': BookOpen,
    'Tasarım': Star,
    'Strateji': Lightbulb,
    'Genel': Users,
    'Gelecek': Target,
    'Kod': Sparkles,
    'Topluluk': Users,
    'STEM': Award,
}

interface QuestionSimulatorProps {
    questions: SanityJuryQuestion[]
}

export function QuestionSimulator({ questions }: QuestionSimulatorProps) {
    const [currentQuestion, setCurrentQuestion] = useState<SanityJuryQuestion | null>(null)
    const [isRevealed, setIsRevealed] = useState(false)
    const [usedQuestions, setUsedQuestions] = useState<string[]>([])

    const getRandomQuestion = () => {
        // Filter out used questions
        const availableQuestions = questions.filter(q => !usedQuestions.includes(q._id))

        // If all questions used, reset
        if (availableQuestions.length === 0) {
            setUsedQuestions([])
            const randomIndex = Math.floor(Math.random() * questions.length)
            setCurrentQuestion(questions[randomIndex])
            setUsedQuestions([questions[randomIndex]._id])
        } else {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length)
            setCurrentQuestion(availableQuestions[randomIndex])
            setUsedQuestions([...usedQuestions, availableQuestions[randomIndex]._id])
        }

        setIsRevealed(false)
    }

    // Kategori için icon al
    const getIcon = (category: string): LucideIcon => {
        return categoryIconMap[category] || MessageCircle
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Jüri Soru Simülatörü</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Sanal Jüri Odası</h2>
                <p className="text-gray-400">Rastgele sorularla mülakat pratiği yapın</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {currentQuestion ? (
                        <motion.div
                            key={currentQuestion._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    {React.createElement(getIcon(currentQuestion.category), { className: "w-6 h-6" })}
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                                        {currentQuestion.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-1">{currentQuestion.question}</h3>
                                </div>
                            </div>

                            {/* Tip reveal */}
                            <div className="mt-6">
                                {isRevealed ? (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                                    >
                                        <div className="flex items-start gap-2">
                                            <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-sm font-medium text-green-400">İpucu</span>
                                                <p className="text-green-100 mt-1">{currentQuestion.hint}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={() => setIsRevealed(true)}
                                        className="w-full py-3 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        İpucu Göster
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-400">Başlamak için butona tıklayın</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-center mt-6">
                    <Button
                        onClick={getRandomQuestion}
                        className="bg-primary hover:bg-primary/90 px-8"
                        disabled={questions.length === 0}
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        {currentQuestion ? 'Yeni Soru Getir' : 'Başla'}
                    </Button>
                </div>

                {usedQuestions.length > 0 && questions.length > 0 && (
                    <div className="mt-4 text-center text-sm text-gray-500">
                        {usedQuestions.length} / {questions.length} soru görüldü
                    </div>
                )}
            </div>
        </div>
    )
}

// Tüm sorular grid bileşeni
interface AllQuestionsGridProps {
    questions: SanityJuryQuestion[]
}

export function AllQuestionsGrid({ questions }: AllQuestionsGridProps) {
    // Kategori için icon al
    const getIcon = (category: string): LucideIcon => {
        return categoryIconMap[category] || MessageCircle
    }

    return (
        <>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {questions.map((question, index) => {
                    const Icon = getIcon(question.category)
                    return (
                        <motion.div
                            key={question._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{question.category}</span>
                                    <h3 className="font-medium text-gray-900 mt-1">{question.question}</h3>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Mobile Slider (Groups of 3) */}
            <div className="md:hidden -mx-6 px-6">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
                    {Array.from({ length: Math.ceil(questions.length / 3) }).map((_, groupIndex) => (
                        <div key={groupIndex} className="min-w-[85vw] snap-center grid gap-4">
                            {questions.slice(groupIndex * 3, (groupIndex + 1) * 3).map((question) => {
                                const Icon = getIcon(question.category)
                                return (
                                    <div
                                        key={question._id}
                                        className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase tracking-wider">{question.category}</span>
                                                <h3 className="font-medium text-gray-900 mt-1">{question.question}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
