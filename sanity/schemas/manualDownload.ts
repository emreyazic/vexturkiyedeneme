import { defineField, defineType } from 'sanity'

export const manualDownload = defineType({
    name: 'manualDownload',
    title: 'Kılavuz İndirmeleri',
    type: 'document',
    fields: [
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'VEX 123', value: 'vex-123' },
                    { title: 'VEX GO', value: 'vex-go' },
                    { title: 'VEX IQ', value: 'vex-iq' },
                    { title: 'VEX V5 (VRC)', value: 'vex-v5' },
                    { title: 'VEX U', value: 'vex-u' },
                    { title: 'VEX AI', value: 'vex-ai' },
                    { title: 'Genel', value: 'general' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seasonName',
            title: 'Sezon Adı',
            type: 'string',
            description: 'Örn: 2025-2026 High Stakes',
            validation: (Rule) => Rule.required().min(5).max(100),
        }),
        defineField({
            name: 'pdfFile',
            title: 'PDF Dosyası',
            type: 'file',
            options: {
                accept: '.pdf',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'externalUrl',
            title: 'Harici PDF Linki (Opsiyonel)',
            type: 'url',
            description: 'PDF dosyası yerine harici bir link kullanmak isterseniz',
        }),
        defineField({
            name: 'language',
            title: 'Dil',
            type: 'string',
            options: {
                list: [
                    { title: 'Türkçe', value: 'tr' },
                    { title: 'İngilizce', value: 'en' },
                ],
                layout: 'radio',
            },
            initialValue: 'tr',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Gösterim sırası (küçük numara önce)',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif',
            type: 'boolean',
            initialValue: true,
            description: 'İndirme bağlantısı aktif mi?',
        }),
    ],
    preview: {
        select: {
            platform: 'platform',
            seasonName: 'seasonName',
            language: 'language',
        },
        prepare({ platform, seasonName, language }) {
            const platformLabels: Record<string, string> = {
                'vex-123': 'VEX 123',
                'vex-go': 'VEX GO',
                'vex-iq': 'VEX IQ',
                'vex-v5': 'VEX V5',
                'vex-u': 'VEX U',
                'vex-ai': 'VEX AI',
                'general': 'Genel',
            }
            const langFlag = language === 'tr' ? '🇹🇷' : '🇬🇧'
            return {
                title: `${platformLabels[platform] || platform} - ${seasonName}`,
                subtitle: `${langFlag} PDF Kılavuz`,
            }
        },
    },
    orderings: [
        {
            title: 'Platform',
            name: 'platformAsc',
            by: [{ field: 'platform', direction: 'asc' }],
        },
        {
            title: 'Sıralama',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
