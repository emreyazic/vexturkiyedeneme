// sanity/schemas/seasonGameResource.ts
// Sezon oyun kaynakları şeması (PDF indirmeler)

import { defineField, defineType } from 'sanity'

export const seasonGameResource = defineType({
    name: 'seasonGameResource',
    title: 'Sezon Oyun Kaynakları',
    type: 'document',
    icon: () => '📄',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'string',
        }),
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'VRC (V5)', value: 'vrc' },
                    { title: 'VEX IQ', value: 'iq' },
                    { title: 'Her İkisi', value: 'both' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'file',
            title: 'Dosya',
            type: 'file',
            options: {
                accept: '.pdf,.zip,.doc,.docx',
            },
        }),
        defineField({
            name: 'externalUrl',
            title: 'Harici URL',
            type: 'url',
            description: 'Dosya yerine harici link kullanmak için',
        }),
        defineField({
            name: 'fileSize',
            title: 'Dosya Boyutu',
            type: 'string',
            description: 'Örn: 4.2 MB',
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Oyun Kılavuzu', value: 'game-manual' },
                    { title: 'Saha Appendix', value: 'field-appendix' },
                    { title: 'Puanlama Rehberi', value: 'scoring-guide' },
                    { title: 'Robot İnspeksiyon', value: 'inspection' },
                    { title: 'Diğer', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Son Güncelleme',
            type: 'datetime',
            description: 'Son 7 gün içinde güncellendiyse "YENİ" rozeti görünür',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    orderings: [
        {
            title: 'Sıralama',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            platform: 'platform',
            lastUpdated: 'lastUpdated',
        },
        prepare({ title, platform, lastUpdated }) {
            const isNew = lastUpdated &&
                (new Date().getTime() - new Date(lastUpdated).getTime()) < 7 * 24 * 60 * 60 * 1000
            return {
                title: `${title || 'Kaynak'}${isNew ? ' 🆕' : ''}`,
                subtitle: platform?.toUpperCase() || '',
            }
        },
    },
})
