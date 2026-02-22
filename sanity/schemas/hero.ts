
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Slider',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Slide başlığı (Örn: Geleceğin Mühendislerini Yetiştiriyoruz)'
        }),
        defineField({
            name: 'subtitle',
            title: 'Alt Başlık / Açıklama',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
            description: 'Slide altındaki açıklama metni'
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Arka Plan Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            initialValue: 0,
            description: 'Slider gösterim sırası (Düşük sayı önce gösterilir)'
        }),
        defineField({
            name: 'duration',
            title: 'Geçiş Süresi (Saniye)',
            type: 'number',
            initialValue: 5,
            validation: (Rule) => Rule.min(3).max(20),
            description: 'Bu slaytın ekranda kalacağı süre (Varsayılan: 5)'
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'backgroundImage',
            subtitle: 'subtitle',
        },
        prepare(selection) {
            return {
                ...selection
            }
        },
    },
})
