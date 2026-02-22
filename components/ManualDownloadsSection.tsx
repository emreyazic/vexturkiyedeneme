'use client'

import React from 'react'
import { Download } from 'lucide-react'
import {
    SanityManualDownload,
    getManualDownloadPlatformStyle,
    getResourcePlatformLabel
} from '@/lib/sanity-queries'

interface ManualDownloadsSectionProps {
    downloads: SanityManualDownload[]
}

export function ManualDownloadsSection({ downloads }: ManualDownloadsSectionProps) {
    if (downloads.length === 0) {
        // Fallback UI when no data in Sanity
        return (
            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tam Kılavuzları İndirin</h2>
                    <p className="text-gray-600 mb-8">Resmi oyun kılavuzlarının PDF versiyonları yakında eklenecek</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Placeholder cards */}
                        {['VEX 123', 'VEX GO', 'VEX IQ', 'VEX V5', 'VEX U', 'VEX AI', 'Genel'].map((platform) => (
                            <div
                                key={platform}
                                className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-center"
                            >
                                <div className="text-gray-400 text-sm font-medium">{platform}</div>
                                <div className="text-gray-300 text-xs mt-1">Yakında</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-12 bg-white border-t border-gray-200">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tam Kılavuzları İndirin</h2>
                    <p className="text-gray-600">Resmi oyun kılavuzlarının PDF versiyonlarını indirin</p>
                </div>

                {/* Grid: 4 columns on desktop, 3 on tablet, 1 on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {downloads.map((download) => {
                        const style = getManualDownloadPlatformStyle(download.platform)
                        const downloadUrl = download.fileUrl || download.externalUrl || '#'

                        return (
                            <a
                                key={download._id}
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                    group flex items-center gap-3 p-4 rounded-xl
                                    ${style.bg} ${style.hoverBg} ${style.text}
                                    transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg
                                `}
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">
                                        {getResourcePlatformLabel(download.platform)}
                                    </div>
                                    <div className="text-xs opacity-80 truncate">
                                        {download.seasonName}
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>

                {/* Language note */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    📄 PDF dosyaları orijinal İngilizce versiyonlarıdır
                </p>
            </div>
        </section>
    )
}
