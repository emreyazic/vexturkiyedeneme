// sanity/schemas/scoringRules.ts
// Platform bazlı puanlama kuralları şeması

import { defineField, defineType } from 'sanity'

export const scoringRules = defineType({
    name: 'scoringRules',
    title: 'Puanlama Kuralları',
    type: 'document',
    icon: () => '🎯',
    fields: [
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'VRC (V5)', value: 'vrc' },
                    { title: 'VEX IQ', value: 'iq' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seasonName',
            title: 'Sezon Adı',
            type: 'string',
            description: 'Örn: Push Back, Rapid Relay, High Stakes',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seasonYear',
            title: 'Sezon Yılı',
            type: 'string',
            description: 'Örn: 2025-2026',
            initialValue: '2025-2026',
        }),
        defineField({
            name: 'description',
            title: 'Oyun Açıklaması',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'scoringElements',
            title: 'Puanlama Elementleri',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'scoringElement',
                    fields: [
                        defineField({
                            name: 'elementId',
                            title: 'Element ID',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'name',
                            title: 'Element Adı',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'points',
                            title: 'Puan Değeri',
                            type: 'number',
                            validation: (Rule) => Rule.required().min(0),
                        }),
                        defineField({
                            name: 'maxCount',
                            title: 'Maksimum Sayı',
                            type: 'number',
                            description: 'Sınırsız için 0 veya boş bırakın',
                        }),
                        defineField({
                            name: 'category',
                            title: 'Kategori',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Temel Puanlama', value: 'basic' },
                                    { title: 'Bonus', value: 'bonus' },
                                    { title: 'Park/Tırmanma', value: 'endgame' },
                                ],
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            points: 'points',
                            max: 'maxCount',
                        },
                        prepare({ title, points, max }) {
                            return {
                                title: title || 'Element',
                                subtitle: `${points} puan${max ? ` (max: ${max})` : ''}`,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'gamePhases',
            title: 'Maç Aşamaları',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'gamePhase',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Aşama Adı',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'duration',
                            title: 'Süre (saniye)',
                            type: 'number',
                            validation: (Rule) => Rule.required().min(0),
                        }),
                        defineField({
                            name: 'displayDuration',
                            title: 'Görüntülenecek Süre',
                            type: 'string',
                            description: 'Örn: 15s, 1:45, 60s',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Açıklama',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'colorFrom',
                            title: 'Gradient Başlangıç Rengi',
                            type: 'string',
                            description: 'Tailwind renk ismi (örn: blue-500)',
                        }),
                        defineField({
                            name: 'colorTo',
                            title: 'Gradient Bitiş Rengi',
                            type: 'string',
                            description: 'Tailwind renk ismi (örn: blue-600)',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            duration: 'displayDuration',
                        },
                        prepare({ title, duration }) {
                            return {
                                title: title || 'Aşama',
                                subtitle: duration || '',
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'fieldElements',
            title: 'Saha Elementleri (Hotspots)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'fieldElement',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Element Adı',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'count',
                            title: 'Adet',
                            type: 'number',
                        }),
                        defineField({
                            name: 'positionX',
                            title: 'X Pozisyonu (%)',
                            type: 'number',
                            description: '0-100 arası yüzde değeri',
                        }),
                        defineField({
                            name: 'positionY',
                            title: 'Y Pozisyonu (%)',
                            type: 'number',
                            description: '0-100 arası yüzde değeri',
                        }),
                        defineField({
                            name: 'ruleDetails',
                            title: 'Kural Detayları',
                            type: 'text',
                            rows: 3,
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif Sezon',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            platform: 'platform',
            seasonName: 'seasonName',
            year: 'seasonYear',
            isActive: 'isActive',
        },
        prepare({ platform, seasonName, year, isActive }) {
            return {
                title: `${platform?.toUpperCase() || 'Platform'}: ${seasonName || 'Sezon'}`,
                subtitle: `${year || ''} ${isActive ? '• Aktif' : '• Pasif'}`,
            }
        },
    },
})
