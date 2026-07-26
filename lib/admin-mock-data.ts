// RECF Türkiye Command Center - Data Interfaces
// Admin Dashboard için tip tanımlamaları (Mock veriler temizlendi)

export interface StatCard {
    id: string
    title: string
    value: string | number
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon: string
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    date: string
    isRead: boolean
    priority: 'low' | 'medium' | 'high'
}

export interface NewsItem {
    id: string
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    status: 'draft' | 'published' | 'scheduled'
    featured: boolean
    teamOfTheDay?: string
}

export interface Tournament {
    id: string
    name: string
    date: string
    location: string
    city: string
    registrationStatus: 'open' | 'closed' | 'coming_soon'
    teamsRegistered: number
    maxTeams: number
    type: string
}

export interface TeamStats {
    city: string
    cityCode: string
    total: number
}

export interface FAQ {
    id: string
    question: string
    answer: string
    category: string
    order: number
}

export interface Resource {
    id: string
    title: string
    description: string
    type: 'pdf' | 'video' | 'link'
    url: string
    category: string
    downloads: number
}

// Dashboard Stats (Boş dizi)
export const dashboardStats: StatCard[] = []

// Son Mesajlar (Boş dizi)
export const recentMessages: ContactMessage[] = []

// Son Haberler (Boş dizi)
export const recentNews: NewsItem[] = []

// Turnuvalar (Boş dizi)
export const tournaments: Tournament[] = []

// Şehir Bazlı Takım İstatistikleri (Boş dizi)
export const cityTeamStats: TeamStats[] = []

// SSS (Boş dizi)
export const faqItems: FAQ[] = []

// Kaynaklar (Boş dizi)
export const resources: Resource[] = []

// Admin Ayarları
export const adminSettings = {
    emergencyBannerEnabled: false,
    emergencyBannerText: '',
    currentSeason: '2025-2026',
    maintenanceMode: false,
    registrationOpen: true
}

// Sidebar Menü Yapısı
export const sidebarMenuItems = [
    {
        title: 'Ana Panel',
        items: [
            { title: 'Dashboard', url: '/admin', icon: 'LayoutDashboard' },
            { title: 'Bildirimler', url: '/admin/notifications', icon: 'Bell', badge: '0' }
        ]
    },
    {
        title: 'İçerik Yönetimi',
        items: [
            { title: 'Haberler', url: '/admin/news', icon: 'Newspaper' },
            { title: 'Blog Yazıları', url: '/admin/blog', icon: 'FileText' },
            { title: 'Galeri', url: '/admin/gallery', icon: 'Image' },
            { title: 'Basın Haberleri', url: '/admin/press', icon: 'Tv' }
        ]
    },
    {
        title: 'Yarışma Kontrolü',
        items: [
            { title: 'Turnuvalar', url: '/admin/tournaments', icon: 'Trophy' },
            { title: 'Kayıt Yönetimi', url: '/admin/registrations', icon: 'ClipboardList' },
            { title: 'Sonuçlar', url: '/admin/results', icon: 'Award' }
        ]
    },
    {
        title: 'Takım Veritabanı',
        items: [
            { title: 'Tüm Takımlar', url: '/admin/teams', icon: 'Users' },
            { title: 'Şehir İstatistikleri', url: '/admin/cities', icon: 'MapPin' },
            { title: 'Mentörler', url: '/admin/mentors', icon: 'UserCheck' }
        ]
    },
    {
        title: 'Bilgi Bankası',
        items: [
            { title: 'SSS Yönetimi', url: '/admin/faq', icon: 'HelpCircle' },
            { title: 'Kaynaklar', url: '/admin/resources', icon: 'FolderOpen' },
            { title: 'Dökümanlar', url: '/admin/documents', icon: 'FileArchive' }
        ]
    },
    {
        title: 'İletişim',
        items: [
            { title: 'Mesajlar', url: '/admin/messages', icon: 'Mail', badge: '0' },
            { title: 'Gönüllü Başvuruları', url: '/admin/volunteers', icon: 'Heart' }
        ]
    },
    {
        title: 'Komut Merkezi',
        items: [
            { title: 'Acil Durum Modu', url: '/admin/emergency', icon: 'AlertTriangle' },
            { title: 'Sezon Ayarları', url: '/admin/season', icon: 'Settings' },
            { title: 'Site Ayarları', url: '/admin/settings', icon: 'Cog' }
        ]
    }
]