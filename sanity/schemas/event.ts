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

export const event = defineType({
    name: 'event',
    title: 'Turnuvalar',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Turnuva Adı',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(150),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eventType',
            title: 'Etkinlik Türü',
            type: 'string',
            options: {
                list: [
                    { title: 'Bölge Turnuvası', value: 'regional' },
                    { title: 'Ulusal Şampiyona', value: 'national' },
                    { title: 'Dünya Şampiyonası', value: 'world' },
                    { title: 'Signature Event', value: 'signature' },
                    { title: 'Skills Challenge', value: 'skills' },
                    { title: 'Scrimmage', value: 'scrimmage' },
                ],
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
                    { title: 'Tüm Platformlar', value: 'all' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Başlangıç Tarihi',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'Bitiş Tarihi',
            type: 'datetime',
            description: 'Çok günlük etkinlikler için',
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
            name: 'venue',
            title: 'Mekan',
            type: 'string',
            description: 'Örn: İTÜ Stadyumu, ODTÜ Kültür Merkezi',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'address',
            title: 'Adres',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'registrationOpen',
            title: 'Kayıt Açık mı?',
            type: 'boolean',
            initialValue: false,
            description: 'Kayıtlar aktif olarak açık mı?',
        }),
        defineField({
            name: 'registrationDeadline',
            title: 'Kayıt Son Tarihi',
            type: 'datetime',
        }),
        defineField({
            name: 'registrationUrl',
            title: 'Kayıt Linki',
            type: 'url',
            description: 'Robot Events veya harici kayıt sayfası',
        }),
        defineField({
            name: 'maxTeams',
            title: 'Maksimum Takım Sayısı',
            type: 'number',
            validation: (Rule) => Rule.min(4).max(200),
        }),
        defineField({
            name: 'registeredTeams',
            title: 'Kayıtlı Takım Sayısı',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'coverImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'liveStreamUrl',
            title: 'Canlı Yayın Linki',
            type: 'url',
            description: 'YouTube veya Twitch canlı yayın linki',
        }),
        defineField({
            name: 'resultsPublished',
            title: 'Sonuçlar Yayınlandı mı?',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            city: 'city',
            date: 'startDate',
            registrationOpen: 'registrationOpen',
            media: 'coverImage',
        },
        prepare({ title, city, date, registrationOpen, media }) {
            const dateStr = date ? new Date(date).toLocaleDateString('tr-TR') : 'Tarih belirtilmedi'
            const status = registrationOpen ? '🟢 Kayıt Açık' : '🔴 Kayıt Kapalı'
            return {
                title,
                subtitle: `${city} • ${dateStr} • ${status}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Tarih (Yaklaşan)',
            name: 'startDateAsc',
            by: [{ field: 'startDate', direction: 'asc' }],
        },
        {
            title: 'Tarih (Geçmiş)',
            name: 'startDateDesc',
            by: [{ field: 'startDate', direction: 'desc' }],
        },
    ],
})
