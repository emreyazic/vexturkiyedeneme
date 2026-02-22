'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    SanityResource,
    getResourceCategoryLabel,
    getResourceCategoryColor,
    getResourcePlatformLabel,
    getResourcePlatformColor
} from '@/lib/sanity-queries'

interface ResourceCardProps {
    resource: SanityResource & { fileUrl?: string }
    index?: number
}

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
    // Get platform info
    const platformColors = getResourcePlatformColor(resource.platform)
    const platformLabel = getResourcePlatformLabel(resource.platform)

    // Get file URL
    const fileUrl = resource.fileUrl || resource.externalUrl || null

    // Format season for display (e.g., "2025-2026" -> "'25-'26")
    const getSeasonLabel = (season?: string) => {
        if (!season || season === 'all') return null
        const parts = season.split('-')
        if (parts.length === 2) {
            return `'${parts[0].slice(-2)}-'${parts[1].slice(-2)}`
        }
        return season
    }

    const seasonLabel = getSeasonLabel(resource.season)

    // Handle view (open in new tab)
    const handleView = () => {
        if (fileUrl) {
            window.open(fileUrl, '_blank', 'noopener,noreferrer')
        }
    }

    // Handle download
    const handleDownload = () => {
        if (fileUrl) {
            const link = document.createElement('a')
            // Add ?dl= parameter for Sanity assets to force download
            const isSanityAsset = fileUrl.includes('cdn.sanity.io')
            const downloadUrl = isSanityAsset
                ? `${fileUrl}?dl=${encodeURIComponent(resource.title || 'belge')}`
                : fileUrl

            link.href = downloadUrl
            // Use title as filename, fallback to 'document'
            link.download = resource.title || 'document'
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 w-full"
        >
            {/* Top Badges Row */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">

                {/* YENİ Badge */}
                {resource.isNew && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-sm">
                        YENİ
                    </span>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5">
                {/* Icon & Platform + Categories */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        {/* Platform badge + Category badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {/* Platform badge (primary) */}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${platformColors.bg} ${platformColors.text}`}>
                                {platformLabel}
                            </span>
                            {/* Category badges */}
                            {resource.categories?.map((cat, idx) => {
                                const colors = getResourceCategoryColor(cat)
                                const label = getResourceCategoryLabel(cat)
                                return (
                                    <span
                                        key={idx}
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}
                                    >
                                        {label}
                                    </span>
                                )
                            })}
                            {/* Season Badge */}
                            {seasonLabel && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-100">
                                    {seasonLabel}
                                </span>
                            )}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                            {resource.title}
                        </h3>
                    </div>
                </div>

                {/* Description */}
                {resource.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {resource.description}
                    </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    {resource.resourceType === 'pdf' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium">
                            <FileText className="w-3 h-3" />
                            PDF
                        </span>
                    )}
                    {resource.version && (
                        <span className="text-gray-400">{resource.version}</span>
                    )}
                    {resource.pageCount && (
                        <span className="text-gray-400">{resource.pageCount} sayfa</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={handleView}
                        disabled={!fileUrl}
                    >
                        <Eye className="w-4 h-4" />
                        Göz At
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={handleDownload}
                        disabled={!fileUrl}
                    >
                        <Download className="w-4 h-4" />
                        İndir
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
