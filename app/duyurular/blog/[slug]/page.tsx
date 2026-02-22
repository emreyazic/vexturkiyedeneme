'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CorporateHero } from '@/components/CorporateHero'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin, Timer } from 'lucide-react'

// Dummy data generator based on slug (since we don't have a backend for this yet)
const getPostData = (slug: string) => {
    return {
        title: 'VEX Robotik: Geleceğin Mühendislerini Şekillendiren Güç',
        category: 'Eğitim & Teknoloji',
        date: '1 Mart 2026',
        author: 'VEX Türkiye Ekibi',
        readTime: '5 dk',
        content: `
            <p class="mb-6 text-lg text-gray-700">
                Teknolojinin hızla geliştiği günümüzde, STEM (Bilim, Teknoloji, Mühendislik ve Matematik) eğitimi her zamankinden daha büyük bir önem taşıyor. VEX Robotik yarışmaları, öğrencilere sadece robot yapmayı değil, aynı zamanda problem çözmeyi, eleştirel düşünmeyi ve en önemlisi takım halinde çalışmayı öğretiyor.
            </p>
            
            <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Takım Çalışmasının Önemi</h3>
            <p class="mb-6 text-gray-600 leading-relaxed">
                VEX turnuvalarında başarıya ulaşmanın en önemli anahtarı, iyi bir mühendislik ürünü ortaya koymak kadar, bu ürünü geliştiren ekibin uyum içerisinde çalışmasıdır. Bir robotun tasarımı, yazılımı ve sürüş stratejisi, birbirinden bağımsız düşünülemez. Bu süreçte öğrenciler, görev paylaşımı yapmayı, zamanı yönetmeyi ve kriz anlarında soğukkanlı kalmayı deneyimlerler.
            </p>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Mühendislik Süreci ve İterasyon</h3>
            <p class="mb-6 text-gray-600 leading-relaxed">
                Robotik projelerinde "ilk denemede mükemmel sonuç" efsanesi gerçekçi değildir. VEX platformu, öğrencilere iteratif tasarım sürecini öğretir. Bir mekanizmayı tasarlamak, test etmek, hataları analiz etmek ve geliştirmek; gerçek dünyadaki mühendislik projelerinin temel döngüsüdür. Bu süreçte karşılaşılan her hata, aslında öğrenme yolculuğunun en değerli adımıdır.
            </p>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">VEX ile Geleceğe Hazırlık</h3>
            <p class="mb-6 text-gray-600 leading-relaxed">
                VEX yarışmalarına katılan öğrenciler, sadece teknik beceriler kazanmakla kalmaz, aynı zamanda 21. yüzyıl yetkinliklerini de geliştirirler. İletişim, liderlik ve analitik düşünme becerileri, onları geleceğin teknoloji liderleri olmaya hazırlar. VEX Türkiye olarak, bu yolculukta gençlerimizin yanında olmaktan gurur duyuyoruz.
            </p>
        `
    }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    const post = getPostData(params.slug)

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language="TR" onLanguageToggle={() => { }} />

            <div className="h-20" />

            {/* Minimal Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-12 md:py-20">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-gray-900">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4" />
                            <span>{post.readTime} okuma</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Sidebar Layout */}
            <div className="container mx-auto px-6 max-w-7xl py-12 md:py-20">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Share & Navigation (Sidebar Left) */}
                    <div className="lg:col-span-2 hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
                        <Link href="/duyurular/blog">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 -ml-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Geri Dön
                            </Button>
                        </Link>

                        <div className="border-t border-gray-100 pt-6">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-4">Paylaş</p>
                            <div className="flex flex-col gap-2">
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1877F2] hover:bg-blue-50">
                                    <Facebook className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1DA1F2] hover:bg-blue-50">
                                    <Twitter className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0A66C2] hover:bg-blue-50">
                                    <Linkedin className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content (Center) */}
                    <article className="lg:col-span-8">
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-a:text-primary hover:prose-a:text-red-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>

                    {/* Related (Sidebar Right - Placeholder) */}
                    <div className="lg:col-span-2 hidden lg:block">
                        {/* Space for TOC or specific CTAs */}
                    </div>
                </div>
            </div>

            {/* Footer Button for Mobile */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <Link href="/duyurular/blog">
                    <Button className="bg-gray-900 text-white shadow-lg rounded-full h-12 px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Listeye Dön
                    </Button>
                </Link>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-2xl font-bold mb-2">VEX TÜRKİYE</div>
                    <p className="text-gray-400 text-sm">© 2026 Tüm Hakları Saklıdır.</p>
                </div>
            </footer>
        </div>
    )
}
