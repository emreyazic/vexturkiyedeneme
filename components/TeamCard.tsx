'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Trophy, MapPin, Calendar, Users, Building2,
    X, Award, ChevronRight, Instagram, Youtube, Globe
} from 'lucide-react'
import {
    SanityTeam,
    getImageUrl,
    getPlatformColor,
    getPlatformLabel,
    getAwardLabel,
} from '@/lib/sanity-queries'

interface TeamCardProps {
    team: SanityTeam
    index: number
}

export function TeamCard({ team, index }: TeamCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isAwardsOpen, setIsAwardsOpen] = useState(false)
    const platformColors = getPlatformColor(team.platform)
    const platformLabel = getPlatformLabel(team.platform)

    // En son ödül
    const latestAward = team.achievements && team.achievements.length > 0
        ? team.achievements.sort((a, b) => (b.year || 0) - (a.year || 0))[0]
        : null

    // Logo URL
    const logoUrl = team.logo?.asset?._ref
        ? getImageUrl(team.logo as any, 200, 200)
        : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{
                    y: isHovered ? -8 : 0,
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(0,0,0,0.15)'
                        : '0 4px 6px rgba(0,0,0,0.05)'
                }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl border-2 ${platformColors.border} overflow-hidden`}
            >
                {/* Platform Badge */}
                <div className={`${platformColors.bg} text-white text-xs font-bold px-3 py-1 text-center`}>
                    {platformLabel}
                </div>

                {/* Card Content */}
                <div className="p-5">
                    {/* Header with Logo and Number */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Logo */}
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={team.logo?.alt || team.name}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                />
                            ) : (
                                <span className={`text-2xl font-bold ${platformColors.text}`}>
                                    {team.teamNumber.slice(0, 2)}
                                </span>
                            )}
                        </div>

                        {/* Team Info */}
                        <div className="flex-1 min-w-0">
                            <Link href={`/takimlar/tum-takimlar/${team.slug?.current || team.teamNumber.toLowerCase()}`} className="hover:text-primary transition-colors block">
                                <h3 className="font-bold text-gray-900 text-lg truncate hover:underline decoration-2 underline-offset-2 decoration-primary/30">
                                    #{team.teamNumber}
                                </h3>
                                <p className="text-gray-600 text-sm truncate">{team.name}</p>
                            </Link>
                            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                <MapPin className="w-3 h-3" />
                                {team.city}
                            </div>
                        </div>

                        {/* Awards Badge/Button - Always show if awards exist */}
                        {team.awards && team.awards.length > 0 && (
                            <Dialog open={isAwardsOpen} onOpenChange={setIsAwardsOpen}>
                                <DialogTrigger asChild>
                                    <button className="p-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                                        <Trophy className="w-5 h-5 text-white" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-amber-500" />
                                            Kazanılan Ödüller
                                        </DialogTitle>
                                        <DialogDescription>
                                            {team.name} #{team.teamNumber}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 mt-4 max-h-80 overflow-y-auto">
                                        {team.awards.length > 0 ? (
                                            team.awards.map((award, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="p-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex-shrink-0">
                                                        <Award className="w-4 h-4 text-white" />
                                                    </div>
                                                    <p className="font-medium text-gray-900">
                                                        {award}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">
                                                Henüz ödül bilgisi bulunmuyor.
                                            </p>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>

                    {/* School/Organization */}
                    {team.schoolOrOrganization && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                            <Building2 className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{team.schoolOrOrganization}</span>
                        </div>
                    )}

                    {/* Hover Details */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-3 border-t border-gray-100 space-y-2">
                                    {team.foundedYear && (
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>Kuruluş: {team.foundedYear}</span>
                                        </div>
                                    )}
                                    {team.memberCount && (
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Users className="w-4 h-4" />
                                            <span>{team.memberCount} üye</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <Award className="w-4 h-4" />
                                        <span>Toplam Ödül: {team.awards?.length || 0}</span>
                                    </div>
                                    {latestAward && (
                                        <div className="flex items-center gap-2 text-amber-600 text-sm">
                                            <Trophy className="w-4 h-4" />
                                            <span className="truncate">
                                                {getAwardLabel(latestAward.awardName, latestAward.customAwardName)}
                                                {latestAward.year && ` (${latestAward.year})`}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Social Media */}
                                {team.socialMedia && (
                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                        {team.socialMedia.instagram && (
                                            <a
                                                href={team.socialMedia.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:scale-110 transition-transform"
                                            >
                                                <Instagram className="w-4 h-4" />
                                            </a>
                                        )}
                                        {team.socialMedia.youtube && (
                                            <a
                                                href={team.socialMedia.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform"
                                            >
                                                <Youtube className="w-4 h-4" />
                                            </a>
                                        )}
                                        {team.socialMedia.website && (
                                            <a
                                                href={team.socialMedia.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gray-700 text-white rounded-lg hover:scale-110 transition-transform"
                                            >
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Team Grid
interface TeamGridProps {
    teams: SanityTeam[]
}

export function TeamGrid({ teams }: TeamGridProps) {
    if (!teams || teams.length === 0) {
        return (
            <div className="text-center py-16">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Henüz takım bulunmuyor.</p>
            </div>
        )
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teams.map((team, index) => (
                <TeamCard key={team._id} team={team} index={index} />
            ))}
        </div>
    )
}
