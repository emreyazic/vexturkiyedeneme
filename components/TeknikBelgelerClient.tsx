'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Calendar, Layers, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ResourceCard } from '@/components/ResourceCard'
import { SanityResource } from '@/lib/sanity-queries'

interface TeknikBelgelerClientProps {
    resources: (SanityResource & { fileUrl?: string })[]
}

// Platform filters (all 7 platforms)
const PLATFORMS = [
    { value: 'vex-123', label: 'VEX 123' },
    { value: 'vex-go', label: 'VEX GO' },
    { value: 'vex-iq', label: 'VEX IQ' },
    { value: 'vex-v5', label: 'VEX V5 (VRC)' },
    { value: 'vex-u', label: 'VEX U' },
    { value: 'vex-ai', label: 'VEX AI' },
    { value: 'general', label: 'Genel' },
]

// Category filters (Oyun Kuralları, Saha Kurulum)
const CATEGORIES = [
    { value: 'game-rules', label: 'Oyun Kuralları' },
    { value: 'field-setup', label: 'Saha Kurulum' },
]

// Season filters
const SEASONS = [
    { value: '2025-2026', label: '2025-2026' },
    { value: '2024-2025', label: '2024-2025' },
    { value: '2023-2024', label: '2023-2024' },
]

export function TeknikBelgelerClient({ resources }: TeknikBelgelerClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSeasons, setSelectedSeasons] = useState<string[]>([])

    // Toggle platform selection (multi-select)
    const togglePlatform = (platformValue: string) => {
        setSelectedPlatforms(prev => {
            if (prev.includes(platformValue)) {
                return prev.filter(p => p !== platformValue)
            } else {
                return [...prev, platformValue]
            }
        })
    }

    // Toggle category selection (multi-select)
    const toggleCategory = (categoryValue: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryValue)) {
                return prev.filter(c => c !== categoryValue)
            } else {
                return [...prev, categoryValue]
            }
        })
    }

    // Toggle season selection (multi-select)
    const toggleSeason = (seasonValue: string) => {
        setSelectedSeasons(prev => {
            if (prev.includes(seasonValue)) {
                return prev.filter(s => s !== seasonValue)
            } else {
                return [...prev, seasonValue]
            }
        })
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('')
        setSelectedPlatforms([])
        setSelectedCategories([])
        setSelectedSeasons([])
    }

    // Check if any filter is active
    const hasActiveFilters = searchQuery || selectedPlatforms.length > 0 || selectedCategories.length > 0 || selectedSeasons.length > 0

    // Filter resources based on search, platforms, categories, and season (AND logic)
    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            // Platform filter - filter by platform field
            const matchesPlatform = selectedPlatforms.length === 0 ||
                selectedPlatforms.includes(resource.platform)

            // Category filter - filter by categories array
            const matchesCategory = selectedCategories.length === 0 ||
                resource.categories?.some(cat => selectedCategories.includes(cat))

            // Season filter
            const matchesSeason = selectedSeasons.length === 0 ||
                (resource.season && selectedSeasons.includes(resource.season)) ||
                resource.season === 'all'

            // Search filter
            const searchLower = searchQuery.toLowerCase()
            const matchesSearch = searchQuery === '' ||
                resource.title.toLowerCase().includes(searchLower) ||
                resource.description?.toLowerCase().includes(searchLower)

            // AND logic: all conditions must match
            return matchesPlatform && matchesCategory && matchesSeason && matchesSearch
        })
    }, [resources, searchQuery, selectedPlatforms, selectedCategories, selectedSeasons])

    // Count active filters for display
    const activeFilterCount = selectedPlatforms.length + selectedCategories.length + selectedSeasons.length

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Belge ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-10 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Platform Filters */}
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            Platform
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PLATFORMS.map((platform) => {
                                const isSelected = selectedPlatforms.includes(platform.value)
                                return (
                                    <button
                                        key={platform.value}
                                        onClick={() => togglePlatform(platform.value)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isSelected
                                            ? 'bg-primary text-white shadow-md ring-2 ring-primary ring-offset-1'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {platform.label}
                                        {isSelected && <span className="ml-1">✓</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Kategori
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => {
                                const isSelected = selectedCategories.includes(category.value)
                                return (
                                    <button
                                        key={category.value}
                                        onClick={() => toggleCategory(category.value)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isSelected
                                            ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-500 ring-offset-1'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category.label}
                                        {isSelected && <span className="ml-1">✓</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Season Selector */}
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Sezon
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SEASONS.map((season) => {
                                const isSelected = selectedSeasons.includes(season.value)
                                return (
                                    <button
                                        key={season.value}
                                        onClick={() => toggleSeason(season.value)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${isSelected
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {season.label}
                                        {isSelected && <span className="ml-1">✓</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredResources.length}</span> belge bulundu
                    {activeFilterCount > 0 && (
                        <span className="ml-2 text-gray-400">
                            ({activeFilterCount} filtre aktif)
                        </span>
                    )}
                </p>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:underline"
                    >
                        Filtreleri temizle
                    </button>
                )}
            </div>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredResources.map((resource, index) => (
                        <ResourceCard
                            key={resource._id}
                            resource={resource}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Belge bulunamadı
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Arama kriterlerinize uygun belge bulunamadı. Farklı bir platform, kategori veya sezon deneyin.
                    </p>
                </motion.div>
            )}
        </div>
    )
}
