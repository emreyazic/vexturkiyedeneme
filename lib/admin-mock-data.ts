// VEX Command Center - Mock Data
// Admin Dashboard için örnek veriler

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
    type: 'VEX IQ' | 'VEX V5' | 'VEX U'
}

export interface TeamStats {
    city: string
    cityCode: string
    vexIQ: number
    vexV5: number
    vexU: number
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

// Dashboard Stats
export const dashboardStats: StatCard[] = [
    {
        id: 'teams',
        title: 'Toplam Takım',
        value: '547',
        change: '+23 bu ay',
        changeType: 'positive',
        icon: 'Users'
    },
    {
        id: 'students',
        title: 'Öğrenci Sayısı',
        value: '2,188',
        change: '+156 bu ay',
        changeType: 'positive',
        icon: 'GraduationCap'
    },
    {
        id: 'cities',
        title: 'Aktif Şehir',
        value: '81',
        change: 'Tüm Türkiye',
        changeType: 'neutral',
        icon: 'MapPin'
    },
    {
        id: 'countdown',
        title: 'Türkiye Şampiyonası',
        value: '28 Şubat 2026',
        change: 'Kalan gün hesaplanıyor...',
        changeType: 'neutral',
        icon: 'Trophy'
    }
]

// Son Mesajlar
export const recentMessages: ContactMessage[] = [
    {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@okul.edu.tr',
        subject: 'Takım Kaydı Hakkında',
        message: 'Okulumuz adına VEX IQ takımı kurmak istiyoruz. Kayıt süreci hakkında bilgi alabilir miyiz?',
        date: '2026-01-30T14:30:00',
        isRead: false,
        priority: 'high'
    },
    {
        id: '2',
        name: 'Zeynep Kaya',
        email: 'zeynep@mentor.com',
        subject: 'Mentor Başvurusu',
        message: 'VEX V5 kategorisinde mentor olarak görev almak istiyorum.',
        date: '2026-01-30T11:15:00',
        isRead: false,
        priority: 'medium'
    },
    {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@firma.com',
        subject: 'Sponsorluk Teklifi',
        message: 'Şirketimiz VEX Türkiye etkinliklerine sponsor olmak istiyor.',
        date: '2026-01-29T16:45:00',
        isRead: true,
        priority: 'high'
    },
    {
        id: '4',
        name: 'Ayşe Özkan',
        email: 'ayse@lise.edu.tr',
        subject: 'Turnuva Tarihi Değişikliği',
        message: 'İstanbul bölge turnuvasının tarihi hakkında soru.',
        date: '2026-01-29T09:20:00',
        isRead: true,
        priority: 'low'
    },
    {
        id: '5',
        name: 'Can Arslan',
        email: 'can@robotik.org',
        subject: 'Teknik Destek',
        message: 'VEXcode kurulumunda yaşadığımız sorun hakkında yardım.',
        date: '2026-01-28T15:00:00',
        isRead: true,
        priority: 'medium'
    }
]

// Son Haberler
export const recentNews: NewsItem[] = [
    {
        id: '1',
        title: 'VEX V5 Rapid Relay Sezonu Resmen Başladı!',
        excerpt: '2025-2026 sezonu "Rapid Relay" temasıyla startını aldı. Takımlar hızlı teslimat yarışına hazırlanıyor.',
        category: 'Sezon Haberleri',
        author: 'VEX Türkiye',
        date: '2026-01-28',
        status: 'published',
        featured: true,
        teamOfTheDay: 'Robo-Tigers #12345A'
    },
    {
        id: '2',
        title: 'İstanbul Bölge Turnuvası Kayıtları Açıldı',
        excerpt: '15 Şubat 2026 tarihinde gerçekleşecek turnuva için kayıtlar başladı.',
        category: 'Turnuva',
        author: 'Admin',
        date: '2026-01-27',
        status: 'published',
        featured: false
    },
    {
        id: '3',
        title: 'Yeni VEXcode Güncellemesi Yayınlandı',
        excerpt: 'VEXcode V5 ve IQ için yeni özellikler içeren güncelleme kullanıma sunuldu.',
        category: 'Teknik',
        author: 'Teknik Ekip',
        date: '2026-01-26',
        status: 'published',
        featured: false
    }
]

// Turnuvalar
export const tournaments: Tournament[] = [
    {
        id: '1',
        name: 'İstanbul Bölge Turnuvası',
        date: '2026-02-15',
        location: 'İTÜ Stadyumu',
        city: 'İstanbul',
        registrationStatus: 'open',
        teamsRegistered: 24,
        maxTeams: 40,
        type: 'VEX V5'
    },
    {
        id: '2',
        name: 'Ankara VEX IQ Challenge',
        date: '2026-02-22',
        location: 'ODTÜ Kültür Merkezi',
        city: 'Ankara',
        registrationStatus: 'open',
        teamsRegistered: 18,
        maxTeams: 32,
        type: 'VEX IQ'
    },
    {
        id: '3',
        name: 'İzmir Robotik Festivali',
        date: '2026-03-01',
        location: 'Kültürpark',
        city: 'İzmir',
        registrationStatus: 'coming_soon',
        teamsRegistered: 0,
        maxTeams: 36,
        type: 'VEX V5'
    },
    {
        id: '4',
        name: 'Türkiye Şampiyonası 2026',
        date: '2026-02-28',
        location: 'Ankara Arena',
        city: 'Ankara',
        registrationStatus: 'closed',
        teamsRegistered: 64,
        maxTeams: 64,
        type: 'VEX V5'
    }
]

// Şehir Bazlı Takım İstatistikleri (Örnek)
export const cityTeamStats: TeamStats[] = [
    { city: 'İstanbul', cityCode: '34', vexIQ: 45, vexV5: 62, vexU: 8, total: 115 },
    { city: 'Ankara', cityCode: '06', vexIQ: 28, vexV5: 35, vexU: 5, total: 68 },
    { city: 'İzmir', cityCode: '35', vexIQ: 22, vexV5: 28, vexU: 3, total: 53 },
    { city: 'Bursa', cityCode: '16', vexIQ: 15, vexV5: 18, vexU: 2, total: 35 },
    { city: 'Antalya', cityCode: '07', vexIQ: 12, vexV5: 15, vexU: 1, total: 28 },
    { city: 'Konya', cityCode: '42', vexIQ: 10, vexV5: 12, vexU: 1, total: 23 },
    { city: 'Adana', cityCode: '01', vexIQ: 8, vexV5: 10, vexU: 0, total: 18 },
    { city: 'Gaziantep', cityCode: '27', vexIQ: 7, vexV5: 9, vexU: 1, total: 17 }
]

// SSS
export const faqItems: FAQ[] = [
    {
        id: '1',
        question: 'VEX Robotics yarışmasına nasıl katılabilirim?',
        answer: 'VEX Robotics yarışmalarına katılmak için önce bir takım kurmanız ve Robot Events platformuna kayıt olmanız gerekmektedir.',
        category: 'Genel',
        order: 1
    },
    {
        id: '2',
        question: 'Takım kayıt ücreti ne kadar?',
        answer: 'Takım kayıt ücretleri kategoriye göre değişmektedir. Güncel fiyatlar için iletişim sayfamızdan bize ulaşabilirsiniz.',
        category: 'Kayıt',
        order: 2
    },
    {
        id: '3',
        question: 'VEX IQ ve VEX V5 arasındaki fark nedir?',
        answer: 'VEX IQ ilkokul ve ortaokul öğrencileri için tasarlanmış plastik parçalı bir sistemdir. VEX V5 ise lise öğrencileri için metal parçalı, daha gelişmiş bir sistemdir.',
        category: 'Teknik',
        order: 3
    }
]

// Kaynaklar
export const resources: Resource[] = [
    {
        id: '1',
        title: 'VEX V5 Rapid Relay Oyun Kılavuzu',
        description: '2025-2026 sezonu resmi oyun kuralları',
        type: 'pdf',
        url: '/resources/rapid-relay-manual.pdf',
        category: 'Oyun Kılavuzları',
        downloads: 1250
    },
    {
        id: '2',
        title: 'VEXcode V5 Kurulum Rehberi',
        description: 'Adım adım VEXcode kurulum talimatları',
        type: 'pdf',
        url: '/resources/vexcode-setup.pdf',
        category: 'Yazılım',
        downloads: 890
    },
    {
        id: '3',
        title: 'Robot Tasarım İpuçları',
        description: 'Başarılı robot tasarımı için temel prensipler',
        type: 'pdf',
        url: '/resources/design-tips.pdf',
        category: 'Teknik',
        downloads: 567
    }
]

// Admin Ayarları
export const adminSettings = {
    emergencyBannerEnabled: false,
    emergencyBannerText: '',
    currentSeason: '2025-2026',
    seasonTheme: 'Rapid Relay',
    maintenanceMode: false,
    registrationOpen: true
}

// Sidebar Menü Yapısı
export const sidebarMenuItems = [
    {
        title: 'Ana Panel',
        items: [
            { title: 'Dashboard', url: '/admin', icon: 'LayoutDashboard' },
            { title: 'Bildirimler', url: '/admin/notifications', icon: 'Bell', badge: '3' }
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
            { title: 'Mesajlar', url: '/admin/messages', icon: 'Mail', badge: '2' },
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
