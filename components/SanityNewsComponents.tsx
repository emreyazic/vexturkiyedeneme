'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Play, Calendar, Trophy, Star, Flame,
    ChevronRight, Clock, ArrowRight, Sparkles, Award
} from 'lucide-react'
import { SanityNews, getImageUrl, formatNewsDate, getCategoryLabel } from '@/lib/sanity-queries'

// Badge Component
function NewsBadge({ type, label }: { type: string; label: string }) {
    const styles = {
        hot: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
        star: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900',
        new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        team: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white'
    }

    const icons = {
        hot: Flame,
        star: Star,
        new: Sparkles,
        team: Trophy
    }

    const Icon = icons[type as keyof typeof icons] || Sparkles

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${styles[type as keyof typeof styles]}`}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    )
}

// News Card Component (Sanity verisi ile)
interface NewsCardProps {
    news: SanityNews
    index: number
    featured?: boolean
}

export function SanityNewsCard({ news, index, featured = false }: NewsCardProps) {
    const imageUrl = getImageUrl(news.mainImage, 800, 600)
    const formattedDate = formatNewsDate(news.publishedAt)
    const categoryLabel = getCategoryLabel(news.category)

    // Badge belirleme
    const getBadge = () => {
        if (news.teamOfTheDay) return { type: 'team', label: '⭐ Günün Takımı' }
        if (news.featured) return { type: 'star', label: 'Öne Çıkan' }
        // Yeni haberse (son 24 saat)
        const isNew = new Date(news.publishedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        if (isNew) return { type: 'new', label: 'Yeni' }
        return null
    }

    const badge = getBadge()

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group ${featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
        >
            {/* Image */}
            <div className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${featured ? 'h-64 md:h-80' : 'h-48'
                }`}>
                {news.mainImage && (
                    <Image
                        src={imageUrl}
                        alt={news.mainImage.alt || news.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-4 left-4">
                        <NewsBadge type={badge.type} label={badge.label} />
                    </div>
                )}

                {/* Category */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded">
                        {categoryLabel}
                    </span>
                </div>

                {/* Play button for featured videos */}
                {featured && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                        >
                            <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </div>
                <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'
                    }`}>
                    {news.title}
                </h3>
                {news.excerpt && (
                    <p className={`text-gray-600 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
                        {news.excerpt}
                    </p>
                )}

                {/* Team of the Day */}
                {news.teamOfTheDay && (
                    <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-center gap-2 text-sm text-amber-700">
                            <Trophy className="w-4 h-4" />
                            <span className="font-medium">Günün Takımı: {news.teamOfTheDay}</span>
                        </div>
                    </div>
                )}

                <Link href={`/duyurular/haberler/${news.slug.current}`}>
                    <Button variant="ghost" size="sm" className="mt-3 text-primary hover:text-red-700 hover:bg-red-50 transition-colors p-0 font-medium">
                        Devamını Oku
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            </div>
        </motion.article>
    )
}

// News Grid Component
interface NewsGridProps {
    news: SanityNews[]
    showFeatured?: boolean
}

export function SanityNewsGrid({ news, showFeatured = true }: NewsGridProps) {
    if (!news || news.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Henüz haber bulunmuyor.</p>
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
                <SanityNewsCard
                    key={item._id}
                    news={item}
                    index={index}
                    featured={showFeatured && index === 0 && item.featured}
                />
            ))}
        </div>
    )
}

// Compact News List (Sidebar veya küçük alanlar için)
interface CompactNewsListProps {
    news: SanityNews[]
    limit?: number
}

export function CompactNewsList({ news, limit = 5 }: CompactNewsListProps) {
    const displayNews = news.slice(0, limit)

    return (
        <div className="space-y-4">
            {displayNews.map((item, index) => (
                <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3 group"
                >
                    {item.mainImage && (
                        <div className="w-20 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={getImageUrl(item.mainImage, 200, 150)}
                                alt={item.mainImage.alt || item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <Link href={`/duyurular/haberler/${item.slug.current}`}>
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatNewsDate(item.publishedAt)}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
