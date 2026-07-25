// lib/sanity-queries.ts
// Sanity GROQ sorguları ve fetch fonksiyonları

import { client, urlFor } from './sanity'

// Hero Types
export interface SanityHero {
    _id: string
    title: string
    subtitle: string
    backgroundImage: {
        asset: {
            _ref: string
        }
        alt?: string
    }
    order: number
    duration: number
}

// News Types
export interface SanityNews {
    _id: string
    title: string
    slug: { current: string }
    category: string
    publishedAt: string
    mainImage?: {
        asset: {
            _ref: string
        }
        alt?: string
    }
    excerpt?: string
    body?: any[]
    featured?: boolean
    teamOfTheDay?: string
    author?: string
}

// GROQ Queries
export const NEWS_QUERIES = {
    // Son haberler (en yeni üstte)
    latestNews: `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    featured,
    teamOfTheDay,
    author
  }`,

    // Öne çıkan haberler
    featuredNews: `*[_type == "news" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    teamOfTheDay
  }`,

    // Belirli sayıda son haber
    latestNewsLimit: (limit: number) => `*[_type == "news"] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    featured,
    teamOfTheDay,
    author
  }`,

    // Tek haber detayı (slug ile)
    newsBySlug: `*[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    body,
    featured,
    teamOfTheDay,
    author
  }`,

    // Kategoriye göre haberler
    newsByCategory: `*[_type == "news" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    featured
  }`,
}

// Fetch fonksiyonları
export async function getLatestNews(limit?: number): Promise<SanityNews[]> {
    try {
        const query = limit ? NEWS_QUERIES.latestNewsLimit(limit) : NEWS_QUERIES.latestNews
        const news = await client.fetch<SanityNews[]>(query, {}, {
            next: { revalidate: 60 } // 60 saniyede bir yeniden doğrula
        })
        return news
    } catch (error) {
        console.error('Error fetching news:', error)
        return []
    }
}

// Hero Fetcher
export async function getHeroSlides(): Promise<SanityHero[]> {
    try {
        const query = `*[_type == "hero"] | order(order asc) {
            _id,
            title,
            subtitle,
            backgroundImage,
            order,
            duration
        }`
        return await client.fetch<SanityHero[]>(query, {}, { next: { revalidate: 60 } })
    } catch (error) {
        console.error('Error fetching hero slides:', error)
        return []
    }
}

export async function getFeaturedNews(): Promise<SanityNews[]> {
    try {
        const news = await client.fetch<SanityNews[]>(NEWS_QUERIES.featuredNews, {}, {
            next: { revalidate: 60 }
        })
        return news
    } catch (error) {
        console.error('Error fetching featured news:', error)
        return []
    }
}

// Tek öne çıkan haber (vitrin için)
export async function getSingleFeaturedNews(): Promise<SanityNews | null> {
    try {
        const query = `*[_type == "news" && featured == true] | order(publishedAt desc)[0] {
            _id,
            title,
            slug,
            category,
            publishedAt,
            mainImage,
            excerpt,
            teamOfTheDay,
            author
        }`
        const news = await client.fetch<SanityNews>(query, {}, {
            next: { revalidate: 60 }
        })
        return news
    } catch (error) {
        console.error('Error fetching single featured news:', error)
        return null
    }
}

// Tüm haberler (arşiv için - sınırsız)
export async function getAllNews(): Promise<SanityNews[]> {
    try {
        const news = await client.fetch<SanityNews[]>(NEWS_QUERIES.latestNews, {}, {
            next: { revalidate: 60 }
        })
        return news
    } catch (error) {
        console.error('Error fetching all news:', error)
        return []
    }
}

export async function getNewsBySlug(slug: string): Promise<SanityNews | null> {
    try {
        const news = await client.fetch<SanityNews>(
            NEWS_QUERIES.newsBySlug,
            { slug },
            { next: { revalidate: 60 } }
        )
        return news
    } catch (error) {
        console.error('Error fetching news by slug:', error)
        return null
    }
}

export async function getNewsByCategory(category: string): Promise<SanityNews[]> {
    try {
        const news = await client.fetch<SanityNews[]>(
            NEWS_QUERIES.newsByCategory,
            { category },
            { next: { revalidate: 60 } }
        )
        return news
    } catch (error) {
        console.error('Error fetching news by category:', error)
        return []
    }
}

// Image URL helper
export function getImageUrl(image: SanityNews['mainImage'], width?: number, height?: number): string {
    if (!image?.asset?._ref) {
        return '/placeholder-news.jpg'
    }

    let builder = urlFor(image)

    if (width) builder = builder.width(width)
    if (height) builder = builder.height(height)

    return builder.auto('format').url()
}

// Tarih formatlama helper
export function formatNewsDate(dateString: string, lang: 'TR' | 'EN' = 'TR'): string {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'TR' ? 'tr-TR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

// Kategori çevirisi
export function getCategoryLabel(category: string, lang: 'TR' | 'EN' = 'TR'): string {
    const labels: Record<string, Record<string, string>> = {
        TR: {
            'sezon': 'Sezon Haberleri',
            'turnuva': 'Turnuva',
            'teknik': 'Teknik',
            'duyuru': 'Duyuru',
            'basari': 'Başarılar',
            'egitim': 'Eğitim'
        },
        EN: {
            'sezon': 'Season News',
            'turnuva': 'Tournament',
            'teknik': 'Technical',
            'duyuru': 'Announcement',
            'basari': 'Achievements',
            'egitim': 'Education'
        }
    }
    return labels[lang]?.[category] || labels['TR']?.[category] || category
}

// ============================================
// SITE SETTINGS TYPES & QUERIES
// ============================================

export interface SanitySiteSettings {
    title: string
    logo: {
        asset: {
            _ref: string
        }
        alt?: string
    }
    favicon: {
        asset: {
            url: string
        }
    }
}

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
    title,
    logo,
    "favicon": favicon.asset->{url}
}`

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
    try {
        const settings = await client.fetch<SanitySiteSettings>(
            SITE_SETTINGS_QUERY,
            {},
            { next: { revalidate: 60 } }
        )
        return settings
    } catch (error) {
        console.error('Error fetching site settings:', error)
        return null
    }
}

// ============================================
// TEAM TYPES & QUERIES
// ============================================

// Team Types
export interface TeamAchievement {
    _key?: string
    awardName: string
    customAwardName?: string
    year?: number
    eventName?: string
}

export interface SanityTeam {
    _id: string
    name: string
    slug?: { current: string }
    teamNumber: string
    city: string
    platform: 'vex-iq' | 'vex-v5' | 'vex-u'
    logo?: {
        asset: { _ref: string }
        alt?: string
    }
    schoolOrOrganization?: string
    mentorName?: string
    memberCount?: number
    foundedYear?: number
    isActive?: boolean
    teamMembers?: { name: string; role: string }[]
    attendedEvents?: string[]
    achievements?: TeamAchievement[]
    awards?: string[]
    socialMedia?: {
        instagram?: string
        x?: string
        youtube?: string
        website?: string
    }
}

// GROQ Queries for Teams
export const TEAM_QUERIES = {
    // Tüm takımlar (aktif olanlar)
    allTeams: `*[_type == "team" && isActive == true] | order(teamNumber asc) {
        _id,
        name,
        teamNumber,
        city,
        platform,
        logo,
        schoolOrOrganization,
        mentorName,
        memberCount,
        foundedYear,
        isActive,
        achievements,
        awards,
        socialMedia
    }`,

    // Platforma göre takımlar
    teamsByPlatform: `*[_type == "team" && isActive == true && platform == $platform] | order(teamNumber asc) {
        _id,
        name,
        teamNumber,
        city,
        platform,
        logo,
        schoolOrOrganization,
        foundedYear,
        achievements,
        awards
    }`,

    // Şehre göre takımlar
    teamsByCity: `*[_type == "team" && isActive == true && city == $city] | order(teamNumber asc) {
        _id,
        name,
        teamNumber,
        city,
        platform,
        logo,
        schoolOrOrganization,
        foundedYear,
        achievements,
        awards
    }`,

    // Takım Detayı (Slug veya Takım Numarası ile - Case Insensitive)
    teamBySlug: `*[_type == "team" && (slug.current == $slug || teamNumber match $slug)][0] {
        _id,
        name,
        slug,
        teamNumber,
        city,
        platform,
        logo,
        schoolOrOrganization,
        mentorName,
        teamMembers,
        memberCount,
        foundedYear,
        isActive,
        attendedEvents,
        awards,
        achievements,
        socialMedia
    }`,
}

// Fetch fonksiyonları - Teams
export async function getAllTeams(): Promise<SanityTeam[]> {
    try {
        const teams = await client.fetch<SanityTeam[]>(TEAM_QUERIES.allTeams, {}, {
            next: { revalidate: 60 }
        })
        return teams
    } catch (error) {
        console.error('Error fetching all teams:', error)
        return []
    }
}

export async function getTeamsByPlatform(platform: string): Promise<SanityTeam[]> {
    try {
        const teams = await client.fetch<SanityTeam[]>(
            TEAM_QUERIES.teamsByPlatform,
            { platform },
            { next: { revalidate: 60 } }
        )
        return teams
    } catch (error) {
        console.error('Error fetching teams by platform:', error)
        return []
    }
}

export async function getTeamsByCity(city: string): Promise<SanityTeam[]> {
    try {
        const teams = await client.fetch<SanityTeam[]>(
            TEAM_QUERIES.teamsByCity,
            { city },
            { next: { revalidate: 60 } }
        )
        return teams
    } catch (error) {
        console.error('Error fetching teams by city:', error)
        return []
    }
}

export async function getTeamBySlug(slug: string): Promise<SanityTeam | null> {
    try {
        const team = await client.fetch<SanityTeam>(
            TEAM_QUERIES.teamBySlug,
            { slug },
            { next: { revalidate: 60 } }
        )
        return team
    } catch (error) {
        console.error('Error fetching team by slug:', error)
        return null
    }
}

// Ödül etiketleri çevirisi
export function getAwardLabel(awardName: string, customAwardName?: string): string {
    const labels: Record<string, string> = {
        'excellence': 'Excellence Award',
        'tournament-champion': 'Tournament Champion',
        'skills-champion': 'Robot Skills Champion',
        'design': 'Design Award',
        'judges': 'Judges Award',
        'innovate': 'Innovate Award',
        'think': 'Think Award',
        'build': 'Build Award',
        'teamwork-champion': 'Teamwork Champion',
        'sportsmanship': 'Sportsmanship Award',
        'amaze': 'Amaze Award',
        'create': 'Create Award',
        'other': customAwardName || 'Diğer Ödül',
    }
    return labels[awardName] || awardName
}

// Platform renkleri
export function getPlatformColor(platform: string): { bg: string; text: string; border: string } {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
        'vex-iq': { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500' },
        'vex-v5': { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500' },
        'vex-u': { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500' },
    }
    return colors[platform] || { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-500' }
}

// Platform etiketi
export function getPlatformLabel(platform: string): string {
    const labels: Record<string, string> = {
        'vex-iq': 'VEX IQ',
        'vex-v5': 'VEX V5',
        'vex-u': 'VEX U',
    }
    return labels[platform] || platform
}

// Türkiye şehirleri (filtreleme için)
export const TURKISH_CITIES = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
    'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
    'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta',
    'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla',
    'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt',
    'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
    'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman',
    'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
]

// ============================================
// EVENT TYPES & QUERIES
// ============================================

// Event Types
export interface SanityEvent {
    _id: string
    name: string
    slug: { current: string }
    eventType: 'regional' | 'national' | 'world' | 'signature' | 'skills' | 'scrimmage'
    platform: 'vex-iq' | 'vex-v5' | 'vex-u' | 'all'
    startDate: string
    endDate?: string
    city: string
    venue: string
    address?: string
    registrationOpen?: boolean
    registrationDeadline?: string
    registrationUrl?: string
    maxTeams?: number
    registeredTeams?: number
    description?: any[]
    coverImage?: {
        asset: { _ref: string }
        alt?: string
    }
    liveStreamUrl?: string
    resultsPublished?: boolean
}

// GROQ Queries for Events
export const EVENT_QUERIES = {
    // Tüm etkinlikler (tarihe göre sıralı)
    allEvents: `*[_type == "event"] | order(startDate asc) {
        _id,
        name,
        slug,
        eventType,
        platform,
        startDate,
        endDate,
        city,
        venue,
        address,
        registrationOpen,
        registrationDeadline,
        registrationUrl,
        maxTeams,
        registeredTeams,
        coverImage,
        liveStreamUrl,
        resultsPublished
    }`,

    // Yaklaşan etkinlikler (bugünden sonra, tarihe göre yakın olanlar önce)
    upcomingEvents: `*[_type == "event" && startDate >= $today] | order(startDate asc) {
        _id,
        name,
        slug,
        eventType,
        platform,
        startDate,
        endDate,
        city,
        venue,
        registrationOpen,
        registrationDeadline,
        registrationUrl,
        maxTeams,
        registeredTeams,
        coverImage
    }`,

    // Geçmiş etkinlikler (bugünden önce, en yeni önce)
    pastEvents: `*[_type == "event" && startDate < $today] | order(startDate desc) {
        _id,
        name,
        slug,
        eventType,
        platform,
        startDate,
        endDate,
        city,
        venue,
        resultsPublished,
        coverImage
    }`,

    // Tek etkinlik (slug ile)
    eventBySlug: `*[_type == "event" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        eventType,
        platform,
        startDate,
        endDate,
        city,
        venue,
        address,
        registrationOpen,
        registrationDeadline,
        registrationUrl,
        maxTeams,
        registeredTeams,
        description,
        coverImage,
        liveStreamUrl,
        resultsPublished
    }`,
}

// Fetch fonksiyonları - Events
export async function getAllEvents(): Promise<SanityEvent[]> {
    try {
        const events = await client.fetch<SanityEvent[]>(EVENT_QUERIES.allEvents, {}, {
            next: { revalidate: 60 }
        })
        return events
    } catch (error) {
        console.error('Error fetching all events:', error)
        return []
    }
}

export async function getUpcomingEvents(): Promise<SanityEvent[]> {
    try {
        const today = new Date().toISOString().split('T')[0]
        const events = await client.fetch<SanityEvent[]>(
            EVENT_QUERIES.upcomingEvents,
            { today },
            { next: { revalidate: 60 } }
        )
        return events
    } catch (error) {
        console.error('Error fetching upcoming events:', error)
        return []
    }
}

export async function getPastEvents(): Promise<SanityEvent[]> {
    try {
        const today = new Date().toISOString().split('T')[0]
        const events = await client.fetch<SanityEvent[]>(
            EVENT_QUERIES.pastEvents,
            { today },
            { next: { revalidate: 60 } }
        )
        return events
    } catch (error) {
        console.error('Error fetching past events:', error)
        return []
    }
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
    try {
        const event = await client.fetch<SanityEvent>(
            EVENT_QUERIES.eventBySlug,
            { slug },
            { next: { revalidate: 60 } }
        )
        return event
    } catch (error) {
        console.error('Error fetching event by slug:', error)
        return null
    }
}

// Event türü renkleri (takvim için)
export function getEventTypeColor(eventType: string): { bg: string; dot: string; text: string; border: string } {
    const colors: Record<string, { bg: string; dot: string; text: string; border: string }> = {
        'regional': { bg: 'bg-blue-100', dot: '#3B82F6', text: 'text-blue-700', border: 'border-blue-500' },
        'national': { bg: 'bg-red-100', dot: '#E31837', text: 'text-red-700', border: 'border-red-500' },
        'world': { bg: 'bg-purple-100', dot: '#7C3AED', text: 'text-purple-700', border: 'border-purple-500' },
        'signature': { bg: 'bg-amber-100', dot: '#F59E0B', text: 'text-amber-700', border: 'border-amber-500' },
        'skills': { bg: 'bg-green-100', dot: '#10B981', text: 'text-green-700', border: 'border-green-500' },
        'scrimmage': { bg: 'bg-gray-100', dot: '#6B7280', text: 'text-gray-700', border: 'border-gray-500' },
    }
    return colors[eventType] || { bg: 'bg-gray-100', dot: '#6B7280', text: 'text-gray-700', border: 'border-gray-500' }
}

// Event türü etiketi
export function getEventTypeLabel(eventType: string): string {
    const labels: Record<string, string> = {
        'regional': 'Bölge Turnuvası',
        'national': 'Ulusal Şampiyona',
        'world': 'Dünya Şampiyonası',
        'signature': 'Signature Event',
        'skills': 'Skills Challenge',
        'scrimmage': 'Scrimmage',
    }
    return labels[eventType] || eventType
}

// Google Calendar URL oluşturucu
export function generateGoogleCalendarUrl(event: SanityEvent): string {
    const startDate = new Date(event.startDate)
    const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 8 * 60 * 60 * 1000) // 8 saat varsayılan

    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.name,
        dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
        details: `VEX Türkiye Turnuvası\nMekan: ${event.venue}\n${event.registrationUrl ? 'Kayıt: ' + event.registrationUrl : ''}`,
        location: `${event.venue}, ${event.city}`,
    })

    return `https://www.google.com/calendar/render?${params.toString()}`
}

// ICS dosyası içeriği oluşturucu
export function generateICSContent(event: SanityEvent): string {
    const startDate = new Date(event.startDate)
    const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 8 * 60 * 60 * 1000)

    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VEX Türkiye//Events//TR
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.name}
DESCRIPTION:VEX Türkiye Turnuvası - ${event.venue}
LOCATION:${event.venue}, ${event.city}
END:VEVENT
END:VCALENDAR`
}

// Event tarih formatlama
export function formatEventDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', options || {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

// ============================================
// RESOURCE TYPES & QUERIES
// ============================================

// Resource Types
export interface SanityResource {
    _id: string
    title: string
    slug: { current: string }
    platform: 'vex-123' | 'vex-go' | 'vex-iq' | 'vex-v5' | 'vex-u' | 'vex-ai' | 'general'
    categories: ('game-rules' | 'field-setup')[]
    description?: string
    resourceType: 'pdf' | 'video' | 'link' | 'zip'
    file?: {
        asset: {
            _ref: string
            url?: string
        }
    }
    externalUrl?: string
    thumbnail?: {
        asset: { _ref: string }
        alt?: string
    }
    season?: string
    language?: 'tr' | 'en'
    downloadCount?: number
    featured?: boolean
    isNew?: boolean
    version?: string
    pageCount?: number
    publishedAt?: string
}

// GROQ Queries for Resources
export const RESOURCE_QUERIES = {
    // Tüm kaynaklar (yayın tarihine göre sıralı)
    allResources: `*[_type == "resource"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        platform,
        categories,
        description,
        resourceType,
        "fileUrl": file.asset->url,
        externalUrl,
        thumbnail,
        season,
        language,
        downloadCount,
        featured,
        isNew,
        version,
        pageCount,
        publishedAt
    }`,

    // Kategoriye göre kaynaklar (array içinde arama)
    resourcesByCategory: `*[_type == "resource" && $category in categories] | order(publishedAt desc) {
        _id,
        title,
        slug,
        platform,
        categories,
        description,
        resourceType,
        "fileUrl": file.asset->url,
        externalUrl,
        thumbnail,
        season,
        isNew,
        version,
        pageCount,
        publishedAt
    }`,

    // Öne çıkan kaynaklar
    featuredResources: `*[_type == "resource" && featured == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        platform,
        categories,
        description,
        resourceType,
        "fileUrl": file.asset->url,
        externalUrl,
        thumbnail,
        season,
        isNew,
        version,
        pageCount,
        publishedAt
    }`,
}

// Fetch fonksiyonları - Resources
export async function getAllResources(): Promise<SanityResource[]> {
    try {
        const resources = await client.fetch<SanityResource[]>(RESOURCE_QUERIES.allResources, {}, {
            next: { revalidate: 60 }
        })
        return resources
    } catch (error) {
        console.error('Error fetching all resources:', error)
        return []
    }
}

export async function getResourcesByCategory(category: string): Promise<SanityResource[]> {
    try {
        const resources = await client.fetch<SanityResource[]>(
            RESOURCE_QUERIES.resourcesByCategory,
            { category },
            { next: { revalidate: 60 } }
        )
        return resources
    } catch (error) {
        console.error('Error fetching resources by category:', error)
        return []
    }
}

export async function getFeaturedResources(): Promise<SanityResource[]> {
    try {
        const resources = await client.fetch<SanityResource[]>(RESOURCE_QUERIES.featuredResources, {}, {
            next: { revalidate: 60 }
        })
        return resources
    } catch (error) {
        console.error('Error fetching featured resources:', error)
        return []
    }
}

// Resource kategori etiketi
export function getResourceCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        'game-rules': 'Oyun Kuralları',
        'field-setup': 'Saha Kurulum',
    }
    return labels[category] || category
}

// Resource kategori renkleri
export function getResourceCategoryColor(category: string): { bg: string; text: string; border: string } {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
        'game-rules': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
        'field-setup': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
    }
    return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
}

// Platform etiketi
export function getResourcePlatformLabel(platform: string): string {
    const labels: Record<string, string> = {
        'vex-123': 'VEX 123',
        'vex-go': 'VEX GO',
        'vex-iq': 'VEX IQ',
        'vex-v5': 'VEX V5',
        'vex-u': 'VEX U',
        'vex-ai': 'VEX AI',
        'general': 'Genel',
    }
    return labels[platform] || platform
}

// Platform renkleri
export function getResourcePlatformColor(platform: string): { bg: string; text: string; border: string } {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
        'vex-123': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
        'vex-go': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
        'vex-iq': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
        'vex-v5': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
        'vex-u': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
        'vex-ai': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
        'general': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
    }
    return colors[platform] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
}

// ============================================
// GAME RULE TYPES & QUERIES
// ============================================

// Game Rule Types
export interface SanityGameRule {
    _id: string
    ruleNumber: string
    platform: 'vex-123' | 'vex-go' | 'vex-iq' | 'vex-v5' | 'vex-u' | 'vex-ai' | 'general'
    category: 'scoring' | 'robot' | 'general' | 'game' | 'field'
    titleTR: string
    titleEN: string
    descriptionTR: string
    descriptionEN: string
    season?: string
    importance: 'critical' | 'high' | 'medium'
    order?: number
}

// GROQ Queries for Game Rules
export const GAME_RULE_QUERIES = {
    // Tüm kurallar (sıralı)
    allGameRules: `*[_type == "gameRule"] | order(order asc, ruleNumber asc) {
        _id,
        ruleNumber,
        platform,
        category,
        titleTR,
        titleEN,
        descriptionTR,
        descriptionEN,
        season,
        importance,
        order
    }`,

    // Platforma göre kurallar
    gameRulesByPlatform: `*[_type == "gameRule" && platform == $platform] | order(order asc, ruleNumber asc) {
        _id,
        ruleNumber,
        platform,
        category,
        titleTR,
        titleEN,
        descriptionTR,
        descriptionEN,
        season,
        importance,
        order
    }`,

    // Kategoriye göre kurallar
    gameRulesByCategory: `*[_type == "gameRule" && category == $category] | order(order asc, ruleNumber asc) {
        _id,
        ruleNumber,
        platform,
        category,
        titleTR,
        titleEN,
        descriptionTR,
        descriptionEN,
        season,
        importance,
        order
    }`,

    // Platform ve kategoriye göre kurallar
    gameRulesByPlatformAndCategory: `*[_type == "gameRule" && platform == $platform && category == $category] | order(order asc, ruleNumber asc) {
        _id,
        ruleNumber,
        platform,
        category,
        titleTR,
        titleEN,
        descriptionTR,
        descriptionEN,
        season,
        importance,
        order
    }`,
}

// Fetch fonksiyonları - Game Rules
export async function getAllGameRules(): Promise<SanityGameRule[]> {
    try {
        const rules = await client.fetch<SanityGameRule[]>(GAME_RULE_QUERIES.allGameRules, {}, {
            next: { revalidate: 60 }
        })
        return rules
    } catch (error) {
        console.error('Error fetching all game rules:', error)
        return []
    }
}

export async function getGameRulesByPlatform(platform: string): Promise<SanityGameRule[]> {
    try {
        const rules = await client.fetch<SanityGameRule[]>(
            GAME_RULE_QUERIES.gameRulesByPlatform,
            { platform },
            { next: { revalidate: 60 } }
        )
        return rules
    } catch (error) {
        console.error('Error fetching game rules by platform:', error)
        return []
    }
}

export async function getGameRulesByCategory(category: string): Promise<SanityGameRule[]> {
    try {
        const rules = await client.fetch<SanityGameRule[]>(
            GAME_RULE_QUERIES.gameRulesByCategory,
            { category },
            { next: { revalidate: 60 } }
        )
        return rules
    } catch (error) {
        console.error('Error fetching game rules by category:', error)
        return []
    }
}

// Game Rule kategori ikonları
export function getGameRuleCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
        'scoring': '🎯',
        'robot': '⚙️',
        'general': '📋',
        'game': '🎮',
        'field': '🏟️',
    }
    return icons[category] || '📄'
}

// Game Rule kategori etiketi
export function getGameRuleCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        'scoring': 'Scoring',
        'robot': 'Robot',
        'general': 'General',
        'game': 'Game',
        'field': 'Field',
    }
    return labels[category] || category
}

// Game Rule önem derecesi renkleri
export function getGameRuleImportanceColor(importance: string): { bg: string; text: string; label: string; borderColor: string } {
    const colors: Record<string, { bg: string; text: string; label: string; borderColor: string }> = {
        'critical': { bg: 'bg-red-100', text: 'text-red-700', label: 'Kritik', borderColor: 'border-l-red-500' },
        'high': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Yüksek', borderColor: 'border-l-orange-500' },
        'medium': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Orta', borderColor: 'border-l-blue-500' },
    }
    return colors[importance] || { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Normal', borderColor: 'border-l-gray-500' }
}

// Platform listesi (UI için)
export const GAME_RULE_PLATFORMS = [
    { value: 'all', label: 'Tümü', shortLabel: 'Tümü' },
    { value: 'vex-123', label: 'VEX 123', shortLabel: '123' },
    { value: 'vex-go', label: 'VEX GO', shortLabel: 'GO' },
    { value: 'vex-iq', label: 'VEX IQ', shortLabel: 'IQ' },
    { value: 'vex-v5', label: 'VEX V5', shortLabel: 'V5' },
    { value: 'vex-u', label: 'VEX U', shortLabel: 'U' },
    { value: 'vex-ai', label: 'VEX AI', shortLabel: 'AI' },
    { value: 'general', label: 'Genel', shortLabel: 'Genel' },
]

// Kategori listesi (UI için)
export const GAME_RULE_CATEGORIES = [
    { value: 'all', label: 'Tümü', icon: '📚' },
    { value: 'scoring', label: 'Scoring', icon: '🎯' },
    { value: 'robot', label: 'Robot', icon: '⚙️' },
    { value: 'general', label: 'General', icon: '📋' },
    { value: 'game', label: 'Game', icon: '🎮' },
    { value: 'field', label: 'Field', icon: '🏟️' },
]

// ============================================
// MANUAL DOWNLOAD TYPES & QUERIES
// ============================================

// Manual Download Types
export interface SanityManualDownload {
    _id: string
    platform: 'vex-123' | 'vex-go' | 'vex-iq' | 'vex-v5' | 'vex-u' | 'vex-ai' | 'general'
    seasonName: string
    fileUrl?: string
    externalUrl?: string
    language?: 'tr' | 'en'
    order?: number
    isActive?: boolean
}

// GROQ Queries for Manual Downloads
export const MANUAL_DOWNLOAD_QUERIES = {
    // Tüm aktif indirmeler (platform sırasına göre)
    allManualDownloads: `*[_type == "manualDownload" && isActive == true] | order(order asc, platform asc) {
        _id,
        platform,
        seasonName,
        "fileUrl": pdfFile.asset->url,
        externalUrl,
        language,
        order,
        isActive
    }`,
}

// Fetch fonksiyonları - Manual Downloads
export async function getAllManualDownloads(): Promise<SanityManualDownload[]> {
    try {
        const downloads = await client.fetch<SanityManualDownload[]>(
            MANUAL_DOWNLOAD_QUERIES.allManualDownloads,
            {},
            { next: { revalidate: 60 } }
        )
        return downloads
    } catch (error) {
        console.error('Error fetching manual downloads:', error)
        return []
    }
}

// Platform renkleri (indirme butonları için)
export function getManualDownloadPlatformStyle(platform: string): { bg: string; hoverBg: string; text: string; icon: string } {
    const styles: Record<string, { bg: string; hoverBg: string; text: string; icon: string }> = {
        'vex-123': { bg: 'bg-pink-500', hoverBg: 'hover:bg-pink-600', text: 'text-white', icon: '🎀' },
        'vex-go': { bg: 'bg-orange-500', hoverBg: 'hover:bg-orange-600', text: 'text-white', icon: '🚀' },
        'vex-iq': { bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-600', text: 'text-white', icon: '🧩' },
        'vex-v5': { bg: 'bg-red-600', hoverBg: 'hover:bg-red-700', text: 'text-white', icon: '🔧' },
        'vex-u': { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-700', text: 'text-white', icon: '🎓' },
        'vex-ai': { bg: 'bg-cyan-500', hoverBg: 'hover:bg-cyan-600', text: 'text-white', icon: '🤖' },
        'general': { bg: 'bg-gray-600', hoverBg: 'hover:bg-gray-700', text: 'text-white', icon: '📄' },
    }
    return styles[platform] || { bg: 'bg-gray-500', hoverBg: 'hover:bg-gray-600', text: 'text-white', icon: '📄' }
}

// ============================================
// JURY QUESTION TYPES & QUERIES
// ============================================

// Jury Question Types
export interface SanityJuryQuestion {
    _id: string
    question: string
    category: 'Takım' | 'Defter' | 'Tasarım' | 'Strateji' | 'Genel' | 'Gelecek' | 'Kod' | 'Topluluk' | 'STEM'
    hint: string
    order?: number
}

// GROQ Queries for Jury Questions
export const JURY_QUESTION_QUERIES = {
    // Tüm jüri soruları (sıraya göre)
    allJuryQuestions: `*[_type == "juryQuestion"] | order(order asc) {
        _id,
        question,
        category,
        hint,
        order
    }`,

    // Kategoriye göre sorular
    juryQuestionsByCategory: `*[_type == "juryQuestion" && category == $category] | order(order asc) {
        _id,
        question,
        category,
        hint,
        order
    }`,
}

// Fetch fonksiyonları - Jury Questions
export async function getAllJuryQuestions(): Promise<SanityJuryQuestion[]> {
    try {
        const questions = await client.fetch<SanityJuryQuestion[]>(
            JURY_QUESTION_QUERIES.allJuryQuestions,
            {},
            { next: { revalidate: 60 } }
        )
        return questions
    } catch (error) {
        console.error('Error fetching jury questions:', error)
        return []
    }
}

export async function getJuryQuestionsByCategory(category: string): Promise<SanityJuryQuestion[]> {
    try {
        const questions = await client.fetch<SanityJuryQuestion[]>(
            JURY_QUESTION_QUERIES.juryQuestionsByCategory,
            { category },
            { next: { revalidate: 60 } }
        )
        return questions
    } catch (error) {
        console.error('Error fetching jury questions by category:', error)
        return []
    }
}

// Kategori ikonu helper (lucide-react icon adları)
export function getJuryCategoryIconName(category: string): string {
    const iconMap: Record<string, string> = {
        'Takım': 'Users',
        'Defter': 'BookOpen',
        'Tasarım': 'Star',
        'Strateji': 'Lightbulb',
        'Genel': 'Users',
        'Gelecek': 'Target',
        'Kod': 'Sparkles',
        'Topluluk': 'Users',
        'STEM': 'Award',
    }
    return iconMap[category] || 'MessageCircle'
}

// ============================================
// COUNTDOWN SETTINGS TYPES & QUERIES
// ============================================

export interface SanityCountdownSettings {
    _id: string
    title: string
    mode: 'manual' | 'auto'
    manualEvent?: SanityEvent
    cardTitle?: string
    theme?: 'red' | 'blue' | 'purple' | 'orange' | 'green'
    liveStreamUrl?: string
    isActive?: boolean
}

// GROQ Queries - Countdown Settings
export const COUNTDOWN_QUERIES = {
    // Aktif geri sayım ayarları (referans çözülmüş)
    activeCountdownSettings: `*[_type == "countdownSettings" && isActive == true][0] {
        _id,
        title,
        mode,
        manualEvent->{
            _id,
            name,
            slug,
            startDate,
            endDate,
            city,
            eventType,
            platform,
            registrationOpen
        },
        cardTitle,
        theme,
        liveStreamUrl,
        isActive
    }`,
}

// Fetch fonksiyonları - Countdown Settings
export async function getActiveCountdownSettings(): Promise<SanityCountdownSettings | null> {
    try {
        const settings = await client.fetch<SanityCountdownSettings>(
            COUNTDOWN_QUERIES.activeCountdownSettings,
            {},
            { next: { revalidate: 60 } }
        )
        return settings
    } catch (error) {
        console.error('Error fetching countdown settings:', error)
        return null
    }
}

// Countdown için tema renkleri helper
export function getCountdownThemeColors(theme?: string): { gradient: string; border: string } {
    const themes: Record<string, { gradient: string; border: string }> = {
        'red': { gradient: 'from-primary to-red-700', border: 'border-red-300' },
        'blue': { gradient: 'from-blue-500 to-blue-700', border: 'border-blue-300' },
        'purple': { gradient: 'from-purple-500 to-purple-700', border: 'border-purple-300' },
        'orange': { gradient: 'from-orange-500 to-orange-700', border: 'border-orange-300' },
        'green': { gradient: 'from-green-500 to-green-700', border: 'border-green-300' },
    }
    return themes[theme || 'red'] || themes['red']
}

// Otomatik turnuva seçimi için helper (ulusal/signature en yakın)
export function findNextPriorityEvent(events: SanityEvent[]): SanityEvent | null {
    const now = new Date()

    // Öncelikli tipleri filtrele (national veya signature)
    const priorityEvents = events.filter(e =>
        (e.eventType === 'national' || e.eventType === 'signature') &&
        new Date(e.startDate) > now
    )

    if (priorityEvents.length > 0) {
        // En yakın olanı döndür
        return priorityEvents.sort((a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )[0]
    }

    // Hiç priority event yoksa en yakın herhangi birini döndür
    const upcomingEvents = events.filter(e => new Date(e.startDate) > now)
    if (upcomingEvents.length > 0) {
        return upcomingEvents.sort((a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )[0]
    }

    return null
}

// ============================================
// SCORING RULES TYPES & QUERIES
// ============================================

export interface SanityScoringElement {
    _key?: string
    elementId: string
    name: string
    points: number
    maxCount?: number
    category?: 'basic' | 'bonus' | 'endgame'
}

export interface SanityGamePhase {
    _key?: string
    name: string
    duration: number
    displayDuration?: string
    description?: string
    colorFrom?: string
    colorTo?: string
}

export interface SanityFieldElement {
    _key?: string
    name: string
    count?: number
    positionX?: number
    positionY?: number
    ruleDetails?: string
}

export interface SanityScoringRules {
    _id: string
    platform: 'vrc' | 'iq'
    seasonName: string
    seasonYear?: string
    description?: string
    scoringElements?: SanityScoringElement[]
    gamePhases?: SanityGamePhase[]
    fieldElements?: SanityFieldElement[]
    isActive?: boolean
}

export interface SanitySeasonGameResource {
    _id: string
    title: string
    description?: string
    platform: 'vrc' | 'iq' | 'both'
    file?: {
        asset: { _ref: string; url?: string }
    }
    externalUrl?: string
    fileSize?: string
    category?: 'game-manual' | 'field-appendix' | 'scoring-guide' | 'inspection' | 'other'
    lastUpdated?: string
    order?: number
    isActive?: boolean
}

// GROQ Queries - Scoring Rules
export const SCORING_RULES_QUERIES = {
    // Platforma göre aktif kurallar
    scoringRulesByPlatform: `*[_type == "scoringRules" && platform == $platform && isActive == true][0] {
        _id,
        platform,
        seasonName,
        seasonYear,
        description,
        scoringElements,
        gamePhases,
        fieldElements,
        isActive
    }`,

    // Tüm aktif kurallar
    allActiveScoringRules: `*[_type == "scoringRules" && isActive == true] {
        _id,
        platform,
        seasonName,
        seasonYear,
        description,
        scoringElements,
        gamePhases,
        fieldElements,
        isActive
    }`,
}

// GROQ Queries - Season Game Resources
export const SEASON_RESOURCE_QUERIES = {
    // Platforma göre kaynaklar
    resourcesByPlatform: `*[_type == "seasonGameResource" && (platform == $platform || platform == "both") && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        platform,
        "fileUrl": file.asset->url,
        externalUrl,
        fileSize,
        category,
        lastUpdated,
        order,
        isActive
    }`,

    // Tüm aktif kaynaklar
    allActiveResources: `*[_type == "seasonGameResource" && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        platform,
        "fileUrl": file.asset->url,
        externalUrl,
        fileSize,
        category,
        lastUpdated,
        order,
        isActive
    }`,
}

// Fetch fonksiyonları - Scoring Rules
export async function getScoringRulesByPlatform(platform: 'vrc' | 'iq'): Promise<SanityScoringRules | null> {
    try {
        const rules = await client.fetch<SanityScoringRules>(
            SCORING_RULES_QUERIES.scoringRulesByPlatform,
            { platform },
            { next: { revalidate: 60 } }
        )
        return rules
    } catch (error) {
        console.error('Error fetching scoring rules:', error)
        return null
    }
}

export async function getAllScoringRules(): Promise<SanityScoringRules[]> {
    try {
        const rules = await client.fetch<SanityScoringRules[]>(
            SCORING_RULES_QUERIES.allActiveScoringRules,
            {},
            { next: { revalidate: 60 } }
        )
        return rules
    } catch (error) {
        console.error('Error fetching all scoring rules:', error)
        return []
    }
}

// Fetch fonksiyonları - Season Game Resources
export async function getSeasonResourcesByPlatform(platform: 'vrc' | 'iq'): Promise<SanitySeasonGameResource[]> {
    try {
        const resources = await client.fetch<SanitySeasonGameResource[]>(
            SEASON_RESOURCE_QUERIES.resourcesByPlatform,
            { platform },
            { next: { revalidate: 60 } }
        )
        return resources
    } catch (error) {
        console.error('Error fetching season resources:', error)
        return []
    }
}

export async function getAllSeasonResources(): Promise<SanitySeasonGameResource[]> {
    try {
        const resources = await client.fetch<SanitySeasonGameResource[]>(
            SEASON_RESOURCE_QUERIES.allActiveResources,
            {},
            { next: { revalidate: 60 } }
        )
        return resources
    } catch (error) {
        console.error('Error fetching all season resources:', error)
        return []
    }
}

// Helper: Kaynak yeni mi? (7 gün içinde güncellendi mi)
export function isResourceNew(lastUpdated?: string): boolean {
    if (!lastUpdated) return false
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return new Date(lastUpdated) > sevenDaysAgo
}

// Helper: Platform renk paleti
export function getPlatformTheme(platform: 'vrc' | 'iq'): {
    gradient: string
    gradientReverse: string
    accent: string
    accentBg: string
    label: string
    seasonName: string
} {
    if (platform === 'vrc') {
        return {
            gradient: 'from-primary to-red-700',
            gradientReverse: 'from-red-700 to-primary',
            accent: 'text-primary',
            accentBg: 'bg-primary',
            label: 'VRC Push Back',
            seasonName: 'Push Back'
        }
    }
    return {
        gradient: 'from-purple-500 to-purple-700',
        gradientReverse: 'from-purple-700 to-purple-500',
        accent: 'text-purple-600',
        accentBg: 'bg-purple-600',
        label: 'VEX IQ Rapid Relay',
        seasonName: 'Rapid Relay'
    }
}

// ==================== WORLD QUALIFIER ====================

// World Qualifier Interface (with expanded team reference)
export interface SanityWorldQualifier {
    _id: string
    team: {
        _id: string
        name: string
        teamNumber: string
        city: string
        platform: 'vex-iq' | 'vex-v5' | 'vex-u'
        schoolOrOrganization?: string
        logo?: {
            asset: {
                _ref: string
            }
        }
    }
    season: string
    qualificationMethod: string
    teamPhoto?: {
        asset: {
            _ref: string
        }
    }
    qualificationDate?: string
    qualifyingEvent?: string
}

// World Qualifier GROQ Queries (with team reference expansion)
export const WORLD_QUALIFIER_QUERIES = {
    // Tüm qualifier takımları (sezona göre)
    qualifiersBySeason: `*[_type == "worldQualifier" && season == $season] | order(qualificationDate desc) {
        _id,
        team->{
            _id,
            name,
            teamNumber,
            city,
            platform,
            schoolOrOrganization,
            logo
        },
        season,
        qualificationMethod,
        teamPhoto,
        qualificationDate,
        qualifyingEvent
    }`,

    // Platform ve sezona göre (team.platform üzerinden filtreleme)
    qualifiersByPlatformAndSeason: `*[_type == "worldQualifier" && season == $season] | order(qualificationDate desc) {
        _id,
        team->{
            _id,
            name,
            teamNumber,
            city,
            platform,
            schoolOrOrganization,
            logo
        },
        season,
        qualificationMethod,
        teamPhoto,
        qualificationDate,
        qualifyingEvent
    }`,

    // Tüm aktif sezon qualifier'ları
    currentSeasonQualifiers: `*[_type == "worldQualifier" && season == "2025-2026"] | order(qualificationDate desc) {
        _id,
        team->{
            _id,
            name,
            teamNumber,
            city,
            platform,
            schoolOrOrganization,
            logo
        },
        season,
        qualificationMethod,
        teamPhoto,
        qualificationDate,
        qualifyingEvent
    }`
}

// World Qualifier Fetch Functions
export async function getWorldQualifiersBySeason(season: string): Promise<SanityWorldQualifier[]> {
    try {
        const qualifiers = await client.fetch<SanityWorldQualifier[]>(
            WORLD_QUALIFIER_QUERIES.qualifiersBySeason,
            { season },
            { next: { revalidate: 60 } }
        )
        return qualifiers
    } catch (error) {
        console.error('Error fetching world qualifiers by season:', error)
        return []
    }
}

export async function getWorldQualifiersByPlatformAndSeason(
    platform: 'vex-iq' | 'vex-v5',
    season: string
): Promise<SanityWorldQualifier[]> {
    try {
        const qualifiers = await client.fetch<SanityWorldQualifier[]>(
            WORLD_QUALIFIER_QUERIES.qualifiersByPlatformAndSeason,
            { season },
            { next: { revalidate: 60 } }
        )
        // Client-side filtering since team reference doesn't support direct GROQ filtering
        return qualifiers.filter(q => q.team?.platform === platform)
    } catch (error) {
        console.error('Error fetching world qualifiers by platform and season:', error)
        return []
    }
}

export async function getCurrentSeasonQualifiers(): Promise<SanityWorldQualifier[]> {
    try {
        const qualifiers = await client.fetch<SanityWorldQualifier[]>(
            WORLD_QUALIFIER_QUERIES.currentSeasonQualifiers,
            {},
            { next: { revalidate: 60 } }
        )
        return qualifiers
    } catch (error) {
        console.error('Error fetching current season qualifiers:', error)
        return []
    }
}

// ============================================
// TV NEWS TYPES & QUERIES
// ============================================

// TV News Types
export interface SanityTvNews {
    _id: string
    outlet: string
    title: string
    excerpt?: string
    publishedAt: string
    videoUrl: string
}

// GROQ Queries for TV News
export const TV_NEWS_QUERIES = {
    // Tüm TV haberleri (en yeni üstte)
    allTvNews: `*[_type == "tvNews"] | order(publishedAt desc) {
        _id,
        outlet,
        title,
        excerpt,
        publishedAt,
        videoUrl
    }`,
}

// Fetch fonksiyonları - TV News
export async function getAllTvNews(): Promise<SanityTvNews[]> {
    try {
        const tvNews = await client.fetch<SanityTvNews[]>(TV_NEWS_QUERIES.allTvNews, {}, {
            next: { revalidate: 60 }
        })
        return tvNews
    } catch (error) {
        console.error('Error fetching TV news:', error)
        return []
    }
}

// TV Haber tarih formatlama
export function formatTvNewsDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
