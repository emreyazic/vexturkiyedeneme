import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
    MapPin, Building2, Calendar, Users, Trophy,
    Instagram, Twitter, Youtube, Globe, ArrowLeft,
    Medal, CalendarDays, CheckCircle2
} from 'lucide-react'
import {
    SanityTeam,
    getTeamBySlug,
    getImageUrl,
    getPlatformColor,
    getPlatformLabel,
} from '@/lib/sanity-queries'

export default async function TeamDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const slug = params.slug
    const team = await getTeamBySlug(slug)

    if (!team) {
        return notFound()
    }

    const platformColors = getPlatformColor(team.platform)
    const platformLabel = getPlatformLabel(team.platform)
    const logoUrl = team.logo ? getImageUrl(team.logo as any, 400, 400) : null

    return (
        <div className="min-h-screen bg-white text-foreground">
            <Navbar language="TR" />
            <div className="h-20" />

            {/* Header Section */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-12 max-w-7xl">
                    <div className="mb-8">
                        <Link href="/takimlar/tum-takimlar">
                            <Button variant="ghost" className="text-gray-500 hover:text-gray-900 -ml-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Takımlar Listesine Dön
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Huge Logo */}
                        <div className={`w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white shadow-xl flex items-center justify-center overflow-hidden border-4 ${platformColors.border} flex-shrink-0`}>
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={team.name}
                                    width={192}
                                    height={192}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className={`text-4xl font-bold ${platformColors.text}`}>
                                    {team.teamNumber}
                                </span>
                            )}
                        </div>

                        {/* Team Info */}
                        <div className="text-center md:text-left flex-1">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white mb-4 ${platformColors.bg}`}>
                                {platformLabel}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
                                {team.teamNumber}
                            </h1>
                            <h2 className="text-2xl text-gray-600 font-medium mb-6">
                                {team.name}
                            </h2>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    {team.city}
                                </div>
                                {team.schoolOrOrganization && (
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-gray-400" />
                                        {team.schoolOrOrganization}
                                    </div>
                                )}
                                {team.foundedYear && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        Kuruluş: {team.foundedYear}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Social Actions */}
                        <div className="flex gap-2">
                            {team.socialMedia?.instagram && (
                                <a href={team.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="outline" className="rounded-full hover:text-pink-600 hover:bg-pink-50 hover:border-pink-200">
                                        <Instagram className="w-5 h-5" />
                                    </Button>
                                </a>
                            )}
                            {team.socialMedia?.x && (
                                <a href={team.socialMedia.x} target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="outline" className="rounded-full hover:text-black hover:bg-gray-50 hover:border-gray-400">
                                        <Twitter className="w-5 h-5" />
                                    </Button>
                                </a>
                            )}
                            {team.socialMedia?.youtube && (
                                <a href={team.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="outline" className="rounded-full hover:text-red-600 hover:bg-red-50 hover:border-red-200">
                                        <Youtube className="w-5 h-5" />
                                    </Button>
                                </a>
                            )}
                            {team.socialMedia?.website && (
                                <a href={team.socialMedia.website.toLowerCase()} target="_blank" rel="noopener noreferrer">
                                    <Button size="icon" variant="outline" className="rounded-full hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200">
                                        <Globe className="w-5 h-5" />
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Team Details */}
                    <div className="space-y-8">
                        {/* Mentor & Members */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Ekip Kadrosu
                            </h3>

                            {team.mentorName && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Takım Mentoru</div>
                                    <div className="font-semibold text-gray-900">{team.mentorName}</div>
                                </div>
                            )}

                            {team.teamMembers && team.teamMembers.length > 0 ? (
                                <div className="space-y-4">
                                    {team.teamMembers.map((member, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="font-medium text-gray-900">{member.name}</div>
                                            <div className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{member.role}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Üye bilgisi girilmemiştir.</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Stats & Timeline */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Awards Timeline */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-amber-500" />
                                Başarılar & Ödüller
                            </h3>

                            {team.awards && team.awards.length > 0 ? (
                                <div className="grid gap-4">
                                    {team.awards.map((award, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                                                <Medal className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg">{award}</div>
                                                <div className="text-sm text-gray-500">Bu sezon kazanılan başarı</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">Henüz kayıtlı bir ödül bulunmuyor.</p>
                                </div>
                            )}
                        </section>

                        {/* Recent Events */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CalendarDays className="w-6 h-6 text-blue-500" />
                                Etkinlik Geçmişi
                            </h3>

                            {team.attendedEvents && team.attendedEvents.length > 0 ? (
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    {team.attendedEvents.map((event, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                                                <div className="font-bold text-gray-900">{event}</div>
                                                <div className="text-xs text-slate-500 mt-1">Katılım Sağlandı</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                    <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">Henüz kayıtlı bir etkinlik katılımı bulunmuyor.</p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
