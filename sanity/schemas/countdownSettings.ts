// sanity/schemas/countdownSettings.ts
// Geri sayım kartı ayarları şeması

import { defineField, defineType } from 'sanity'

export const countdownSettings = defineType({
    name: 'countdownSettings',
    title: 'Geri Sayım Ayarları',
    type: 'document',
    icon: () => '⏱️',
    fields: [
        defineField({
            name: 'title',
            title: 'Ayar Adı',
            type: 'string',
            description: 'Bu ayar setinin adı (örn: Ana Sayfa Geri Sayımı)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mode',
            title: 'Mod Seçici',
            type: 'string',
            description: 'Geri sayım turnuvasının nasıl seçileceği',
            options: {
                list: [
                    { title: 'Manuel Seç', value: 'manual' },
                    { title: 'Otomatik En Yakın', value: 'auto' },
                ],
                layout: 'radio',
            },
            initialValue: 'auto',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'manualEvent',
            title: 'Turnuva Referansı',
            type: 'reference',
            to: [{ type: 'event' }],
            description: 'Manuel modda geri sayım yapılacak turnuva',
            hidden: ({ parent }) => parent?.mode !== 'manual',
        }),
        defineField({
            name: 'cardTitle',
            title: 'Kart Başlığı',
            type: 'string',
            description: 'Geri sayım kartının başlığı (Örn: "Büyük Final Yaklaşıyor!")',
            initialValue: 'Türkiye Şampiyonası',
        }),
        defineField({
            name: 'theme',
            title: 'Tema Rengi',
            type: 'string',
            description: 'Kartın arka plan renk teması',
            options: {
                list: [
                    { title: 'Kırmızı (Ulusal)', value: 'red' },
                    { title: 'Mavi (Bölge)', value: 'blue' },
                    { title: 'Mor (Dünya)', value: 'purple' },
                    { title: 'Turuncu (Signature)', value: 'orange' },
                    { title: 'Yeşil (Skills)', value: 'green' },
                ],
                layout: 'dropdown',
            },
            initialValue: 'red',
        }),
        defineField({
            name: 'liveStreamUrl',
            title: 'Canlı Yayın URL',
            type: 'url',
            description: 'Yarışma günü gösterilecek canlı yayın linki',
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif',
            type: 'boolean',
            description: 'Bu geri sayım ayarı aktif mi?',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'cardTitle',
            mode: 'mode',
            isActive: 'isActive',
        },
        prepare({ title, mode, isActive }) {
            return {
                title: title || 'Geri Sayım',
                subtitle: `${mode === 'auto' ? '🔄 Otomatik' : '✏️ Manuel'} ${isActive ? '• Aktif' : '• Pasif'}`,
            }
        },
    },
})
