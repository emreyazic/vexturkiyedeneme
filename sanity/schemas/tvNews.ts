import { defineField, defineType } from 'sanity'

export const tvNews = defineType({
    name: 'tvNews',
    title: 'TV Haberleri',
    type: 'document',
    fields: [
        defineField({
            name: 'outlet',
            title: 'Kanal Adı',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Örn: TRT Haber, CNN Türk, NTV',
        }),
        defineField({
            name: 'title',
            title: 'Haber Başlığı',
            type: 'string',
            validation: (Rule) => Rule.required().min(10).max(150),
        }),
        defineField({
            name: 'excerpt',
            title: 'Özet Açıklama',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.max(200),
            description: 'Maksimum 2 cümle',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Haber Tarihi',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
            }),
            description: 'YouTube veya Vimeo video linki',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            outlet: 'outlet',
            date: 'publishedAt',
        },
        prepare({ title, outlet, date }) {
            return {
                title,
                subtitle: `${outlet} • ${new Date(date).toLocaleDateString('tr-TR')}`,
            }
        },
    },
    orderings: [
        {
            title: 'Tarih (Yeni)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
})
