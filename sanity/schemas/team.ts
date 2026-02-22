import { defineField, defineType } from 'sanity'

// Türkiye'nin 81 ili
const turkishCities = [
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

export const team = defineType({
    name: 'team',
    title: 'Takımlar',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Takım Adı',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(100),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'teamNumber',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'teamNumber',
            title: 'Takım Numarası',
            type: 'string',
            description: 'Örn: 12345A, 67890B',
            validation: (Rule) => Rule.required().regex(/^[0-9]{4,5}[A-Z]$/, {
                name: 'takım numarası',
                invert: false,
            }),
        }),
        defineField({
            name: 'city',
            title: 'Şehir',
            type: 'string',
            options: {
                list: turkishCities.map(city => ({ title: city, value: city })),
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'VEX IQ', value: 'vex-iq' },
                    { title: 'VEX V5 (VRC)', value: 'vex-v5' },
                    { title: 'VEX U', value: 'vex-u' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Takım Logosu',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternatif Metin',
                },
            ],
        }),
        defineField({
            name: 'schoolOrOrganization',
            title: 'Okul / Kurum',
            type: 'string',
            description: 'Takımın bağlı olduğu okul veya kurum adı',
        }),
        defineField({
            name: 'mentorName',
            title: 'Mentor Adı',
            type: 'string',
        }),
        defineField({
            name: 'mentorEmail',
            title: 'Mentor E-posta',
            type: 'email',
        }),
        defineField({
            name: 'memberCount',
            title: 'Üye Sayısı',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(20),
        }),
        defineField({
            name: 'foundedYear',
            title: 'Kuruluş Yılı',
            type: 'number',
            validation: (Rule) => Rule.min(2010).max(2030),
        }),
        defineField({
            name: 'teamMembers',
            title: 'Takım Üyeleri',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Ad Soyad', type: 'string' },
                        { name: 'role', title: 'Görev', type: 'string' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'attendedEvents',
            title: 'Katılınan Etkinlikler',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Takımın katıldığı turnuvların listesi'
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif mi?',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'achievements',
            title: 'Başarılar',
            type: 'array',
            description: 'Takımın kazandığı ödüller ve dereceler',
            of: [
                {
                    type: 'object',
                    name: 'achievement',
                    title: 'Ödül',
                    fields: [
                        {
                            name: 'awardName',
                            title: 'Ödül Adı',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Excellence Award', value: 'excellence' },
                                    { title: 'Tournament Champion', value: 'tournament-champion' },
                                    { title: 'Robot Skills Champion', value: 'skills-champion' },
                                    { title: 'Design Award', value: 'design' },
                                    { title: 'Judges Award', value: 'judges' },
                                    { title: 'Innovate Award', value: 'innovate' },
                                    { title: 'Think Award', value: 'think' },
                                    { title: 'Build Award', value: 'build' },
                                    { title: 'Teamwork Champion', value: 'teamwork-champion' },
                                    { title: 'Sportsmanship Award', value: 'sportsmanship' },
                                    { title: 'Amaze Award', value: 'amaze' },
                                    { title: 'Create Award', value: 'create' },
                                    { title: 'Other / Diğer', value: 'other' },
                                ],
                            },
                        },
                        {
                            name: 'customAwardName',
                            title: 'Özel Ödül Adı',
                            type: 'string',
                            description: 'Listede yoksa ödül adını yazın',
                            hidden: ({ parent }: { parent?: { awardName?: string } }) => parent?.awardName !== 'other',
                        },
                        {
                            name: 'year',
                            title: 'Yıl',
                            type: 'number',
                            validation: (Rule: any) => Rule.min(2015).max(2030),
                        },
                        {
                            name: 'eventName',
                            title: 'Turnuva Adı',
                            type: 'string',
                            description: 'Örn: Türkiye Şampiyonası, İstanbul Bölge',
                        },
                    ],
                    preview: {
                        select: {
                            awardName: 'awardName',
                            customAwardName: 'customAwardName',
                            year: 'year',
                            eventName: 'eventName',
                        },
                        prepare({ awardName, customAwardName, year, eventName }: any) {
                            const awardLabels: Record<string, string> = {
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
                                'other': customAwardName || 'Diğer',
                            }
                            return {
                                title: awardLabels[awardName] || awardName,
                                subtitle: `${year || ''} ${eventName ? '• ' + eventName : ''}`.trim(),
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'socialMedia',
            title: 'Sosyal Medya',
            type: 'object',
            fields: [
                { name: 'instagram', title: 'Instagram', type: 'url' },
                { name: 'x', title: 'X (Twitter)', type: 'url' },
                { name: 'youtube', title: 'YouTube', type: 'url' },
                { name: 'website', title: 'Web Sitesi', type: 'url' },
            ],
        }),
        defineField({
            name: 'awards',
            title: 'Kazanılan Ödüller (Liste)',
            type: 'array',
            description: 'Takımın kazandığı ödüllerin listesi (Örn: Design Award, Excellence Award)',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            teamNumber: 'teamNumber',
            city: 'city',
            platform: 'platform',
            media: 'logo',
        },
        prepare({ title, teamNumber, city, platform, media }) {
            const platformLabels: Record<string, string> = {
                'vex-iq': 'VEX IQ',
                'vex-v5': 'VEX V5',
                'vex-u': 'VEX U',
            }
            return {
                title: `${title} #${teamNumber}`,
                subtitle: `${city} • ${platformLabels[platform] || platform}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Şehir',
            name: 'cityAsc',
            by: [{ field: 'city', direction: 'asc' }],
        },
        {
            title: 'Takım Numarası',
            name: 'teamNumberAsc',
            by: [{ field: 'teamNumber', direction: 'asc' }],
        },
    ],
})
