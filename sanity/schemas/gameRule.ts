import { defineField, defineType } from 'sanity'

export const gameRule = defineType({
    name: 'gameRule',
    title: 'Oyun Kuralları',
    type: 'document',
    fields: [
        defineField({
            name: 'ruleNumber',
            title: 'Kural Numarası',
            type: 'string',
            description: 'Örn: G1, SG2, R1, IQ1',
            validation: (Rule) => Rule.required().min(1).max(10),
        }),
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
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: '🎯 Scoring (Puanlama)', value: 'scoring' },
                    { title: '⚙️ Robot', value: 'robot' },
                    { title: '📋 General (Genel)', value: 'general' },
                    { title: '🎮 Game (Oyun)', value: 'game' },
                    { title: '🏟️ Field (Saha)', value: 'field' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleTR',
            title: 'Başlık (Türkçe)',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(150),
        }),
        defineField({
            name: 'titleEN',
            title: 'Başlık (İngilizce)',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(150),
        }),
        defineField({
            name: 'descriptionTR',
            title: 'Açıklama (Türkçe)',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().min(10),
        }),
        defineField({
            name: 'descriptionEN',
            title: 'Açıklama (İngilizce)',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().min(10),
        }),
        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string',
            options: {
                list: [
                    { title: '2025-2026 (Rapid Relay)', value: '2025-2026' },
                    { title: '2024-2025 (High Stakes)', value: '2024-2025' },
                    { title: '2023-2024 (Over Under)', value: '2023-2024' },
                    { title: 'Tüm Sezonlar', value: 'all' },
                ],
                layout: 'dropdown',
            },
            initialValue: '2025-2026',
        }),
        defineField({
            name: 'importance',
            title: 'Önem Derecesi',
            type: 'string',
            options: {
                list: [
                    { title: '🔴 Kritik', value: 'critical' },
                    { title: '🟠 Yüksek', value: 'high' },
                    { title: '🔵 Orta', value: 'medium' },
                ],
                layout: 'radio',
            },
            initialValue: 'medium',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Kuralların gösterilme sırası (küçük numara önce)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            ruleNumber: 'ruleNumber',
            titleTR: 'titleTR',
            platform: 'platform',
            category: 'category',
            importance: 'importance',
        },
        prepare({ ruleNumber, titleTR, platform, category, importance }) {
            const platformLabels: Record<string, string> = {
                'vex-123': 'VEX 123',
                'vex-go': 'VEX GO',
                'vex-iq': 'VEX IQ',
                'vex-v5': 'VEX V5',
                'vex-u': 'VEX U',
                'vex-ai': 'VEX AI',
                'general': 'Genel',
            }
            const categoryIcons: Record<string, string> = {
                'scoring': '🎯',
                'robot': '⚙️',
                'general': '📋',
                'game': '🎮',
                'field': '🏟️',
            }
            const importanceEmoji: Record<string, string> = {
                'critical': '🔴',
                'high': '🟠',
                'medium': '🔵',
            }
            return {
                title: `<${ruleNumber}> ${titleTR}`,
                subtitle: `${importanceEmoji[importance] || ''} ${platformLabels[platform] || platform} • ${categoryIcons[category] || ''} ${category}`,
            }
        },
    },
    orderings: [
        {
            title: 'Kural Numarası',
            name: 'ruleNumberAsc',
            by: [{ field: 'ruleNumber', direction: 'asc' }],
        },
        {
            title: 'Platform',
            name: 'platformAsc',
            by: [{ field: 'platform', direction: 'asc' }],
        },
        {
            title: 'Önem Derecesi',
            name: 'importanceDesc',
            by: [{ field: 'importance', direction: 'desc' }],
        },
    ],
})
