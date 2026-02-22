'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortableText, type PortableTextReactComponents } from '@portabletext/react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    Calendar, ArrowLeft, User, Trophy, Share2,
    Facebook, Twitter, Linkedin, Clock
} from 'lucide-react'
import { SanityNews, getImageUrl, formatNewsDate, getCategoryLabel } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

// Portable Text Components
const portableTextComponents: PortableTextReactComponents = {
    types: {
        image: ({ value }: { value: any }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <figure className="my-8">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || 'Haber görseli'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-sm text-gray-500 text-center mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
    },
    block: {
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => (
            <code className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ children, value }) => {
            const href = value?.href || '#'
            const isExternal = href.startsWith('http')
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-primary hover:underline"
                >
                    {children}
                </a>
            )
        },
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 my-4 text-gray-700">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
}

interface NewsDetailClientProps {
    news: SanityNews
}

export function NewsDetailClient({ news }: NewsDetailClientProps) {
    const imageUrl = getImageUrl(news.mainImage, 1200, 630)
    const formattedDate = formatNewsDate(news.publishedAt)
    const categoryLabel = getCategoryLabel(news.category)

    // Okuma süresi tahmini (250 kelime/dakika)
    const estimateReadingTime = () => {
        if (!news.body) return 3
        const text = news.body
            .filter((block: any) => block._type === 'block')
            .map((block: any) => block.children?.map((child: any) => child.text).join(' '))
            .join(' ')
        const wordCount = text.split(/\s+/).length
        return Math.max(1, Math.ceil(wordCount / 250))
    }

    const readingTime = estimateReadingTime()

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-[40vh] md:h-[50vh] bg-gray-900"
            >
                {news.mainImage && (
                    <Image
                        src={imageUrl}
                        alt={news.mainImage.alt || news.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back button */}
                <div className="absolute top-6 left-6">
                    <Link href="/duyurular/haberler">
                        <Button variant="ghost" className="text-white hover:bg-white/20">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Tüm Haberler
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Content */}
            <article className="container mx-auto px-6 max-w-4xl -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            {categoryLabel}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {formattedDate}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            {readingTime} dk okuma
                        </div>
                        {news.author && (
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <User className="w-4 h-4" />
                                {news.author}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {news.title}
                    </h1>

                    {/* Team of the Day */}
                    {news.teamOfTheDay && (
                        <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-amber-600 font-semibold uppercase tracking-wider">
                                        Günün Takımı
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">
                                        {news.teamOfTheDay}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Excerpt */}
                    {news.excerpt && (
                        <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                            {news.excerpt}
                        </p>
                    )}

                    {/* Body - Portable Text */}
                    {news.body && (
                        <div className="prose prose-lg max-w-none">
                            <PortableText value={news.body} components={portableTextComponents} />
                        </div>
                    )}

                    {/* Share */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Bu haberi paylaş
                            </span>
                            <div className="flex gap-2">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(news.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(news.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Back to news */}
                    <div className="mt-8">
                        <Link href="/duyurular/haberler">
                            <Button variant="outline" className="w-full md:w-auto">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Tüm Haberlere Dön
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </article>

            {/* Footer spacer */}
            <div className="h-20" />
        </div>
    )
}
