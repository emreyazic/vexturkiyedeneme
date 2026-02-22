'use client'

/**
 * This route is responsible for the built-in Sanity Studio.
 * All routes under /studio will be handled by this file.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
    return (
        <NextStudio
            config={config}
            // VEX branded loading screen
            unstable_globalStyles
        />
    )
}
