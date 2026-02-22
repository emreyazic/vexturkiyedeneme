// sanity/schemas/juryQuestion.ts
// Jüri mülakat soruları şeması

import { defineField, defineType } from 'sanity'

export const juryQuestion = defineType({
    name: 'juryQuestion',
    title: 'Jüri Soruları',
    type: 'document',
    icon: () => '❓',
    fields: [
        defineField({
            name: 'question',
            title: 'Soru Metni',
            type: 'string',
            description: 'Jüri mülakatında sorulacak soru',
            validation: (Rule) => Rule.required().min(10).max(500),
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            description: 'Sorunun ait olduğu kategori',
            options: {
                list: [
                    { title: 'Takım', value: 'Takım' },
                    { title: 'Defter', value: 'Defter' },
                    { title: 'Tasarım', value: 'Tasarım' },
                    { title: 'Strateji', value: 'Strateji' },
                    { title: 'Genel', value: 'Genel' },
                    { title: 'Gelecek', value: 'Gelecek' },
                    { title: 'Kod', value: 'Kod' },
                    { title: 'Topluluk', value: 'Topluluk' },
                    { title: 'STEM', value: 'STEM' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'hint',
            title: 'İpucu',
            type: 'text',
            description: 'Soruyu cevaplarken dikkat edilmesi gereken noktalar',
            rows: 3,
            validation: (Rule) => Rule.required().min(10).max(1000),
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Soruların listelenme sırası (küçükten büyüğe)',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Sıraya Göre',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Kategoriye Göre',
            name: 'categoryAsc',
            by: [{ field: 'category', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'question',
            subtitle: 'category',
        },
        prepare({ title, subtitle }) {
            // Kategori ikonları
            const categoryIcons: Record<string, string> = {
                'Takım': '👥',
                'Defter': '📓',
                'Tasarım': '⭐',
                'Strateji': '💡',
                'Genel': '👤',
                'Gelecek': '🎯',
                'Kod': '✨',
                'Topluluk': '🤝',
                'STEM': '🏆',
            }
            return {
                title: title,
                subtitle: `${categoryIcons[subtitle] || '❓'} ${subtitle}`,
            }
        },
    },
})
