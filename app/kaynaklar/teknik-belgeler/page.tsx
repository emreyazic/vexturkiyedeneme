<<<<<<< HEAD
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CorporateHero } from '@/components/CorporateHero'
import { TeknikBelgelerClient } from '@/components/TeknikBelgelerClient'
import { getAllResources } from '@/lib/sanity-queries'
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react'

export const revalidate = 60

export default async function TeknikBelgelerPage() {
    // Fetch resources from Sanity
    const resources = await getAllResources()

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar />

            <div className="h-20" />
            <CorporateHero
                title="Teknik Belgeler"
                subtitle="VEX Robotics resmi dökümanları ve kaynakları"
            />

            {/* Stats Bar */}
            <section className="py-6 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Resmi Kaynaklar</h2>
                                <p className="text-gray-400 text-sm">PDF dokümanları ve rehberler</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{resources.length}</div>
                                <div className="text-sm text-gray-400">Belge</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-500">
                                    {resources.filter(r => r.isNew).length}
                                </div>
                                <div className="text-sm text-gray-400">Yeni</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <TeknikBelgelerClient resources={resources} />
                </div>
            </section>

            <Footer />
        </div>
    )
}
=======
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
>>>>>>> d9a88c48bf01268ab2d176e8873256c6f4f8ed35
