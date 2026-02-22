'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Tv, X, Play, Loader2 } from 'lucide-react'
import type { SanityTvNews } from '@/lib/sanity-queries'
import { formatTvNewsDate } from '@/lib/sanity-queries'

// Dynamic import for react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player').then((mod) => mod.default), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-black flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    )
}) as any

interface BasindaBizTvSectionProps {
    tvNews: SanityTvNews[]
}

// Video Card Component
function VideoCard({ item, onClick }: { item: SanityTvNews; onClick: () => void }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className="relative rounded-2xl overflow-hidden cursor-pointer group bg-gray-900"
        >
            {/* Thumbnail - siyah placeholder arka plan */}
            <div className="relative aspect-video bg-black">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary/90 transition-colors"
                    >
                        <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                    </motion.div>
                </div>

                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Info - border-gray-700 korundu */}
            <div className="p-4 border border-gray-700 rounded-b-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <Tv className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{item.outlet}</span>
                </div>
                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                {item.excerpt && <p className="text-gray-400 text-sm">{item.excerpt}</p>}
                <div className="mt-3 text-xs text-gray-500">{formatTvNewsDate(item.publishedAt)}</div>
            </div>
        </motion.article>
    )
}

// Video Player Modal with hydration protection
function VideoPlayerModal({ item, onClose }: { item: SanityTvNews; onClose: () => void }) {
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Hydration protection - only render player on client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // URL validation - ensure string
    const videoUrl = typeof item.videoUrl === 'string' ? item.videoUrl : ''

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                onClick={onClose}
            >
                <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-4xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
                {/* Video Player Container - aspect-video with proper sizing */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
                        {/* Loading placeholder */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            </div>
                        )}

                        {/* ReactPlayer - only render when mounted (client-side) */}
                        {isMounted && videoUrl && (
                            <ReactPlayer
                                url={videoUrl}
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={true}
                                onReady={() => setIsLoading(false)}
                                onError={() => setIsLoading(false)}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            showinfo: 1,
                                            modestbranding: 1
                                        }
                                    },
                                    vimeo: {
                                        playerOptions: {
                                            byline: false,
                                            portrait: false
                                        }
                                    }
                                }}
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            />
                        )}

                        {/* Error state - invalid URL */}
                        {isMounted && !videoUrl && (
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                <p className="text-gray-400">Video URL bulunamadı</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-4 flex items-center justify-between text-white">
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Tv className="w-4 h-4" />
                            {item.outlet}
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{formatTvNewsDate(item.publishedAt)}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Main TV Section Component
export function BasindaBizTvSection({ tvNews }: BasindaBizTvSectionProps) {
    const [selectedVideo, setSelectedVideo] = useState<SanityTvNews | null>(null)

    if (tvNews.length === 0) {
        return null
    }

    return (
        <>
            <section className="py-12 md:py-16 bg-gray-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-3 mb-8">
                        <Tv className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-white">TV Haberleri</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tvNews.map((item) => (
                            <VideoCard
                                key={item._id}
                                item={item}
                                onClick={() => setSelectedVideo(item)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayerModal
                        item={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
