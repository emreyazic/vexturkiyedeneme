'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GAME_RULE_PLATFORMS } from '@/lib/sanity-queries'

interface PlatformSwitcherProps {
    selectedPlatform: string
    onPlatformChange: (platform: string) => void
}

export function PlatformSwitcher({ selectedPlatform, onPlatformChange }: PlatformSwitcherProps) {
    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl min-w-max">
                {GAME_RULE_PLATFORMS.map((platform) => (
                    <button
                        key={platform.value}
                        onClick={() => onPlatformChange(platform.value)}
                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${selectedPlatform === platform.value
                                ? 'text-white'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {selectedPlatform === platform.value && (
                            <motion.div
                                layoutId="platformIndicator"
                                className="absolute inset-0 bg-primary rounded-lg"
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="hidden sm:inline">{platform.label}</span>
                            <span className="sm:hidden">{platform.shortLabel}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

// Compact version for mobile
export function PlatformSwitcherCompact({ selectedPlatform, onPlatformChange }: PlatformSwitcherProps) {
    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto scrollbar-hide">
            {GAME_RULE_PLATFORMS.map((platform) => (
                <button
                    key={platform.value}
                    onClick={() => onPlatformChange(platform.value)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${selectedPlatform === platform.value
                            ? 'text-white bg-primary'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                        }`}
                >
                    {platform.shortLabel}
                </button>
            ))}
        </div>
    )
}
