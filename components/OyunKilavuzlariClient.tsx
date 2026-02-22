'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, BookOpen, X, ChevronRight, Download, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlatformSwitcher } from '@/components/PlatformSwitcher'
import { RuleShareButton } from '@/components/RuleShareButton'
import {
    SanityGameRule,
    GAME_RULE_CATEGORIES,
    getGameRuleImportanceColor,
    getGameRuleCategoryIcon,
    getResourcePlatformLabel
} from '@/lib/sanity-queries'

interface OyunKilavuzlariClientProps {
    initialRules: SanityGameRule[]
}

// Rule Detail Panel
function RuleDetailPanel({
    rule,
    onClose
}: {
    rule: SanityGameRule | null
    onClose: () => void
}) {
    if (!rule) return null

    const importance = getGameRuleImportanceColor(rule.importance)
    const categoryIcon = getGameRuleCategoryIcon(rule.category)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        >
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-primary text-white font-mono font-bold rounded-lg text-lg">
                            &lt;{rule.ruleNumber}&gt;
                        </span>
                        <span className={`px-2 py-1 ${importance.bg} ${importance.text} text-xs font-medium rounded-full`}>
                            {importance.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RuleShareButton ruleNumber={rule.ruleNumber} ruleTitle={rule.titleTR} />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{categoryIcon}</span>
                    <span className="uppercase tracking-wider">{rule.category}</span>
                    <span className="text-gray-300">•</span>
                    <span>{getResourcePlatformLabel(rule.platform)}</span>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Turkish */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-4 bg-red-600 rounded text-white text-[10px] flex items-center justify-center font-bold">TR</span>
                        <span className="text-sm font-medium text-gray-500">Türkçe</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{rule.titleTR}</h3>
                    <p className="text-gray-600">{rule.descriptionTR}</p>
                </div>

                {/* English */}
                <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-4 bg-blue-600 rounded text-white text-[10px] flex items-center justify-center font-bold">EN</span>
                        <span className="text-sm font-medium text-gray-500">English</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">{rule.titleEN}</h3>
                    <p className="text-gray-500 italic">{rule.descriptionEN}</p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 flex gap-3">
                    <Button variant="outline" size="sm" className="border-gray-300">
                        <Download className="w-4 h-4 mr-2" />
                        PDF İndir
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Resmi Kaynak
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default function OyunKilavuzlariClient({ initialRules }: OyunKilavuzlariClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPlatform, setSelectedPlatform] = useState('all')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedRule, setSelectedRule] = useState<SanityGameRule | null>(null)

    // Handle URL parameters for deep linking
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const ruleParam = params.get('rule')
            if (ruleParam) {
                const rule = initialRules.find(r => r.ruleNumber === ruleParam)
                if (rule) setSelectedRule(rule)
            }
        }
    }, [initialRules])

    // Hybrid filtering: Platform + Category + Search (AND logic)
    const filteredRules = useMemo(() => {
        let results = [...initialRules]

        // Platform filter
        if (selectedPlatform !== 'all') {
            results = results.filter(rule => rule.platform === selectedPlatform)
        }

        // Category filter
        if (selectedCategory !== 'all') {
            results = results.filter(rule => rule.category === selectedCategory)
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase().replace(/[<>]/g, '')
            results = results.filter(rule =>
                rule.ruleNumber.toLowerCase().includes(query) ||
                rule.titleTR.toLowerCase().includes(query) ||
                rule.titleEN.toLowerCase().includes(query) ||
                rule.descriptionTR.toLowerCase().includes(query)
            )
        }

        return results
    }, [initialRules, selectedPlatform, selectedCategory, searchQuery])

    return (
        <>
            {/* Platform Switcher Section */}
            <section className="py-4 bg-white border-b border-gray-200 sticky top-20 z-30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <PlatformSwitcher
                        selectedPlatform={selectedPlatform}
                        onPlatformChange={setSelectedPlatform}
                    />
                </div>
            </section>

            {/* Search Section */}
            <section className="py-8 bg-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-white mb-2">Akıllı Kural Arama</h2>
                        <p className="text-gray-400 text-sm">Kural numarası (örn: G1, SG2) veya anahtar kelime yazın</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="<G1>, <SG2>, motor, ring..."
                            className="h-14 pl-14 pr-4 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-5 h-5 text-gray-400 hover:text-white" />
                            </button>
                        )}
                    </div>

                    {/* Category Filters with Icons */}
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {GAME_RULE_CATEGORIES.map(category => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${selectedCategory === category.value
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-600">{filteredRules.length} kural bulundu</span>
                        {(selectedPlatform !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                            <button
                                onClick={() => {
                                    setSelectedPlatform('all')
                                    setSelectedCategory('all')
                                    setSearchQuery('')
                                }}
                                className="text-sm text-primary hover:underline"
                            >
                                Filtreleri Temizle
                            </button>
                        )}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Rules List */}
                        <div className="lg:col-span-2 space-y-3">
                            <AnimatePresence>
                                {filteredRules.map((rule, index) => {
                                    const importance = getGameRuleImportanceColor(rule.importance)
                                    const categoryIcon = getGameRuleCategoryIcon(rule.category)

                                    return (
                                        <motion.div
                                            key={rule._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.03 }}
                                            onClick={() => setSelectedRule(rule)}
                                            className={`bg-white rounded-xl border-l-4 border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-all ${importance.borderColor} ${selectedRule?._id === rule._id ? 'ring-2 ring-primary' : ''
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 font-mono font-bold rounded text-sm">
                                                        &lt;{rule.ruleNumber}&gt;
                                                    </span>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{rule.titleTR}</h3>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{rule.descriptionTR}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            </div>
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded flex items-center gap-1">
                                                    {categoryIcon} {rule.category}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded ${importance.bg} ${importance.text}`}>
                                                    {getResourcePlatformLabel(rule.platform)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>

                            {filteredRules.length === 0 && (
                                <div className="text-center py-12">
                                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">Aramanıza uygun kural bulunamadı.</p>
                                    <p className="text-sm text-gray-400 mt-1">Farklı filtreler deneyin veya aramayı genişletin.</p>
                                </div>
                            )}
                        </div>

                        {/* Detail Panel */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-44">
                                <AnimatePresence mode="wait">
                                    {selectedRule ? (
                                        <RuleDetailPanel rule={selectedRule} onClose={() => setSelectedRule(null)} />
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center"
                                        >
                                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="font-semibold text-gray-700 mb-2">Hızlı Bakış</h3>
                                            <p className="text-sm text-gray-500">
                                                Detaylı açıklama görmek için sol taraftan bir kural seçin
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
