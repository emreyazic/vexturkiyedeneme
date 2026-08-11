import React from 'react'
import { Footer } from '@/components/Footer'
import { TeknikBelgelerHeader } from '@/components/TeknikBelgelerHeader'
import { TeknikBelgelerClient } from '@/components/TeknikBelgelerClient'
import { getAllResources } from '@/lib/sanity-queries'

export const revalidate = 60

export default async function TeknikBelgelerPage() {
    const resources = await getAllResources()

    return (
        <div className="min-h-screen bg-white text-foreground">

            <TeknikBelgelerHeader
                resourceCount={resources.length}
                newResourceCount={
                    resources.filter(r => r.isNew).length
                }
            />

            {/* Resources Section */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <TeknikBelgelerClient
                        resources={resources}
                    />
                </div>
            </section>

            <Footer />
        </div>
    )
}