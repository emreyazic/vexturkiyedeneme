import { defineField, defineType } from 'sanity'

export const news = defineType({
    name: 'news',
    title: 'Haberler',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required().min(10).max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Sezon Haberleri', value: 'sezon' },
                    { title: 'Turnuva', value: 'turnuva' },
                    { title: 'Teknik', value: 'teknik' },
                    { title: 'Duyuru', value: 'duyuru' },
                    { title: 'Başarılar', value: 'basari' },
                    { title: 'Eğitim', value: 'egitim' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Yayın Tarihi',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Ana Görsel',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternatif Metin',
                    description: 'Görsel açıklaması (SEO için önemli)',
                },
            ],
        }),
        defineField({
            name: 'excerpt',
            title: 'Özet',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(250),
            description: 'Haber listelerinde gösterilecek kısa özet',
        }),
        defineField({
            name: 'body',
            title: 'İçerik',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Alıntı', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Kalın', value: 'strong' },
                            { title: 'İtalik', value: 'em' },
                            { title: 'Altı Çizili', value: 'underline' },
                            { title: 'Kod', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Başlık',
                        },
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternatif Metin',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'teamOfTheDay',
            title: 'Günün Takımı',
            type: 'string',
            description: 'Varsa, bu haber ile ilişkili günün takımı (örn: Robo-Tigers #12345A)',
        }),
        defineField({
            name: 'featured',
            title: 'Öne Çıkan',
            type: 'boolean',
            initialValue: false,
            description: 'Ana sayfada öne çıkarılsın mı?',
        }),
        defineField({
            name: 'author',
            title: 'Yazar',
            type: 'string',
            initialValue: 'VEX Türkiye',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            media: 'mainImage',
            date: 'publishedAt',
        },
        prepare({ title, category, media, date }) {
            const categoryLabels: Record<string, string> = {
                sezon: 'Sezon',
                turnuva: 'Turnuva',
                teknik: 'Teknik',
                duyuru: 'Duyuru',
                basari: 'Başarılar',
                egitim: 'Eğitim',
            }
            return {
                title,
                subtitle: `${categoryLabels[category] || category} • ${new Date(date).toLocaleDateString('tr-TR')}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Yayın Tarihi (Yeni)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
})
