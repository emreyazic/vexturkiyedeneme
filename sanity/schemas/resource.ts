import { defineField, defineType } from 'sanity'

export const resource = defineType({
    name: 'resource',
    title: 'Kaynaklar',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Belge Adı',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(150),
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
            name: 'categories',
            title: 'Kategoriler',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Oyun Kuralları', value: 'game-rules' },
                    { title: 'Saha Kurulum', value: 'field-setup' },
                ],
                layout: 'grid',
            },
            validation: (Rule) => Rule.required().min(1),
            description: 'Bir veya daha fazla kategori seçebilirsiniz',
        }),
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(500),
        }),
        defineField({
            name: 'resourceType',
            title: 'Kaynak Türü',
            type: 'string',
            options: {
                list: [
                    { title: 'PDF Dosyası', value: 'pdf' },
                    { title: 'Video', value: 'video' },
                    { title: 'Harici Link', value: 'link' },
                    { title: 'Zip Arşivi', value: 'zip' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'file',
            title: 'Dosya Yükle',
            type: 'file',
            options: {
                accept: '.pdf,.zip,.doc,.docx,.ppt,.pptx',
            },
            hidden: ({ parent }) => parent?.resourceType === 'video' || parent?.resourceType === 'link',
        }),
        defineField({
            name: 'externalUrl',
            title: 'Harici Link',
            type: 'url',
            hidden: ({ parent }) => parent?.resourceType !== 'link' && parent?.resourceType !== 'video',
            description: 'Video veya harici kaynak linki',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Önizleme Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
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
            name: 'downloadCount',
            title: 'İndirme Sayısı',
            type: 'number',
            initialValue: 0,
            readOnly: true,
        }),
        defineField({
            name: 'featured',
            title: 'Öne Çıkan',
            type: 'boolean',
            initialValue: false,
            description: 'Kaynaklar sayfasında öne çıkarılsın mı?',
        }),
        defineField({
            name: 'isNew',
            title: 'YENİ Rozeti',
            type: 'boolean',
            initialValue: false,
            description: 'Belgenin üzerinde "YENİ" rozeti gösterilsin mi?',
        }),
        defineField({
            name: 'version',
            title: 'Sürüm',
            type: 'string',
            description: 'Belge sürümü (Örn: v2.1)',
        }),
        defineField({
            name: 'pageCount',
            title: 'Sayfa Sayısı',
            type: 'number',
            description: 'PDF için sayfa sayısı (opsiyonel)',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Yayın Tarihi',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            platform: 'platform',
            category: 'category',
            resourceType: 'resourceType',
            media: 'thumbnail',
        },
        prepare({ title, platform, category, resourceType, media }) {
            const platformLabels: Record<string, string> = {
                'vex-123': 'VEX 123',
                'vex-go': 'VEX GO',
                'vex-iq': 'VEX IQ',
                'vex-v5': 'VEX V5',
                'vex-u': 'VEX U',
                'vex-ai': 'VEX AI',
                'general': 'Genel',
            }
            const typeIcons: Record<string, string> = {
                pdf: '📄',
                video: '🎬',
                link: '🔗',
                zip: '📦',
            }
            return {
                title,
                subtitle: `${typeIcons[resourceType] || '📁'} ${platformLabels[platform] || platform}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Yayın Tarihi',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Platform',
            name: 'platformAsc',
            by: [{ field: 'platform', direction: 'asc' }],
        },
    ],
})
