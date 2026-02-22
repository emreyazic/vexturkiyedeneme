'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    BookOpen, Code, Wrench, Trophy, ChevronRight, Clock,
    User, MessageSquare, ArrowRight, Sparkles, Quote
} from 'lucide-react'

// Blog posts
const blogPosts = [
    {
        id: 1,
        title: 'Şampiyonun Sırrı: 12345A Takımının Excellence Yolculuğu',
        excerpt: 'Türkiye Şampiyonası\'nda Excellence Award kazanan takımın teknik kararları, robot tasarımı ve strateji detayları.',
        author: 'Ahmet Yılmaz',
        date: '1 Mart 2026',
        readTime: '8 dk',
        category: 'Şampiyonun Sırrı',
        featured: true,
        tags: ['Excellence', 'Robot Tasarımı', 'Strateji'],
        comments: 24
    },
    {
        id: 2,
        title: 'PID Kontrol: Başlangıçtan Uzmanlığa',
        excerpt: 'Robot hareketlerinde hassasiyet için PID kontrolün temellerinden ileri seviye uygulamalarına.',
        author: 'Dr. Elif Kaya',
        date: '25 Şubat 2026',
        readTime: '12 dk',
        category: 'Lab Notları',
        tags: ['Programlama', 'PID', 'Otonom'],
        comments: 18
    },
    {
        id: 3,
        title: 'High Stakes: Ring Scoring Mekanizması Analizi',
        excerpt: 'Bu sezonun oyununda ring yerleştirme mekanizmaları için farklı yaklaşımların karşılaştırması.',
        author: 'Mehmet Demir',
        date: '20 Şubat 2026',
        readTime: '10 dk',
        category: 'Lab Notları',
        tags: ['Mekanik', 'High Stakes', 'Tasarım'],
        comments: 31,
        hasCode: true
    },
    {
        id: 4,
        title: 'Mühendislik Defteri: Jürileri Etkileyen Detaylar',
        excerpt: 'Excellence Award için mühendislik defterinizi nasıl hazırlamalısınız? Kazanan takımlardan ipuçları.',
        author: 'Zeynep Arslan',
        date: '15 Şubat 2026',
        readTime: '7 dk',
        category: 'Rehber',
        tags: ['Defter', 'Jüri', 'Excellence'],
        comments: 42
    },
    {
        id: 5,
        title: 'Şampiyonun Sırrı: VEX IQ Lideri 98765X',
        excerpt: 'VEX IQ kategorisinde zirvede yer alan takımın basit ama etkili tasarım felsefesi.',
        author: 'Can Öztürk',
        date: '10 Şubat 2026',
        readTime: '6 dk',
        category: 'Şampiyonun Sırrı',
        tags: ['VEX IQ', 'Tasarım', 'Strateji'],
        comments: 15
    },
    {
        id: 6,
        title: 'Otonom Programlama: Odometry Temelleri',
        excerpt: 'Robotunuzun pozisyonunu hassas takip etmek için odometry sisteminin kurulumu.',
        author: 'Dr. Elif Kaya',
        date: '5 Şubat 2026',
        readTime: '15 dk',
        category: 'Lab Notları',
        tags: ['Programlama', 'Odometry', 'Sensörler'],
        comments: 27,
        hasCode: true
    }
]

// Categories
const categories = ['Tümü', 'Şampiyonun Sırrı', 'Lab Notları', 'Rehber']

// Code block example
const codeExample = `def pid_control(target, current, kp, ki, kd):
    error = target - current
    integral += error
    derivative = error - prev_error
    output = kp*error + ki*integral + kd*derivative
    prev_error = error
    return output`

// Featured Post Component
function FeaturedPost({ post }: { post: typeof blogPosts[0] }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden"
        >
            <div className="grid md:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary to-red-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Trophy className="w-24 h-24 text-white/20" />
                    </div>
                    <div className="absolute top-6 left-6">
                        <span className="px-3 py-1.5 bg-yellow-500 text-gray-900 text-sm font-bold rounded-full flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content side */}
                <div className="p-8 text-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded">{tag}</span>
                        ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-300 mb-6">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium">{post.author}</div>
                                <div className="text-sm text-gray-400">{post.date} • {post.readTime}</div>
                            </div>
                        </div>
                        <Link href={`/duyurular/blog/${post.id}`}>
                            <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                Oku
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

// Blog Card Component
function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
    const categoryColors: Record<string, string> = {
        'Şampiyonun Sırrı': 'text-yellow-600 bg-yellow-50',
        'Lab Notları': 'text-blue-600 bg-blue-50',
        'Rehber': 'text-green-600 bg-green-50'
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
        >
            {/* Header */}
            <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${categoryColors[post.category] || 'text-gray-600 bg-gray-100'}`}>
                        {post.category}
                    </span>
                    {post.hasCode && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            Kod İçerir
                        </span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
            </div>

            {/* Code preview if exists */}
            {post.hasCode && (
                <div className="mx-6 mt-4 p-3 bg-gray-900 rounded-lg">
                    <pre className="text-xs text-green-400 font-mono overflow-hidden">
                        <code>{codeExample.slice(0, 80)}...</code>
                    </pre>
                </div>
            )}

            {/* Footer */}
            <div className="p-6 pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                        <span className="mx-1">•</span>
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                    </div>
                    <Link href={`/duyurular/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-red-700 hover:bg-red-50 transition-colors p-0 font-medium">
                            Oku
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-sm">
                        <span className="text-gray-900 font-medium">{post.author}</span>
                        <span className="text-gray-400 ml-2">{post.date}</span>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

export default function BlogPage() {
    const [language, setLanguage] = useState<'TR' | 'EN'>('TR')
    const [selectedCategory, setSelectedCategory] = useState('Tümü')

    const featuredPost = blogPosts.find(p => p.featured)
    const filteredPosts = blogPosts.filter(p => {
        if (selectedCategory === 'Tümü') return !p.featured
        return p.category === selectedCategory && !p.featured
    })

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language={language} onLanguageToggle={() => setLanguage(l => l === 'TR' ? 'EN' : 'TR')} />

            <div className="h-20" />
            <CorporateHero
                title="Mühendislik Günlükleri"
                subtitle="Lab notları, şampiyon röportajları ve teknik içerikler"
            />

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-8 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <FeaturedPost post={featuredPost} />
                    </div>
                </section>
            )}

            {/* Category Filter */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-20 z-30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                    <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                        &quot;Sporsuz yaşam, yaşanmamış bir yaşamdır.&quot;
                    </blockquote>
                    <cite className="text-gray-500">— Seha Salim, Intechne, 2025</cite>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">VEX</div>
                                <div><div className="text-lg font-bold">VEX TÜRKİYE</div><div className="text-xs text-gray-400">Robotics Competition</div></div>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Duyurular</h3>
                            <ul className="space-y-3">
                                <li><a href="/duyurular/haberler" className="text-gray-400 hover:text-primary transition-colors">Haberler</a></li>
                                <li><a href="/duyurular/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                                <li><a href="/duyurular/basinda-biz" className="text-gray-400 hover:text-primary transition-colors">Basında Biz</a></li>
                                <li><a href="/duyurular/galeri" className="text-gray-400 hover:text-primary transition-colors">Galeri</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Kaynaklar</h3>
                            <ul className="space-y-3">
                                <li><a href="/kaynaklar/oyun-kilavuzlari" className="text-gray-400 hover:text-primary transition-colors">Oyun Kılavuzları</a></li>
                                <li><a href="/kaynaklar/yazilim" className="text-gray-400 hover:text-primary transition-colors">VEXcode</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>info@vexturkiye.com</li>
                                <li>+90 (212) 000 00 00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 mt-12 border-t border-gray-800">
                        <p className="text-sm text-gray-500 text-center">© 2024 VEX Türkiye. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
