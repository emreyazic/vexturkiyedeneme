'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder, type ListItemBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// VEX Türkiye renk teması
const vexTheme = {
    '--brand-primary': '#E31837',
    '--brand-primary--inverted': '#FFFFFF',
}

export default defineConfig({
    name: 'vex-turkiye-studio',
    title: 'VEX Türkiye CMS',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pg180y4e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S: StructureBuilder) =>
                S.list()
                    .title('VEX Türkiye İçerik Yönetimi')
                    .items([
                        // Haberler
                        S.listItem()
                            .title('📰 Haberler')
                            .child(
                                S.documentTypeList('news')
                                    .title('Tüm Haberler')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                            ),

                        // Takımlar
                        S.listItem()
                            .title('👥 Takımlar')
                            .child(
                                S.list()
                                    .title('Takım Yönetimi')
                                    .items([
                                        S.listItem()
                                            .title('Tüm Takımlar')
                                            .child(
                                                S.documentTypeList('team')
                                                    .title('Takımlar')
                                                    .defaultOrdering([{ field: 'city', direction: 'asc' }])
                                            ),
                                        S.divider(),
                                        S.listItem()
                                            .title('VEX IQ Takımları')
                                            .child(
                                                S.documentList()
                                                    .title('VEX IQ Takımları')
                                                    .filter('_type == "team" && platform == "vex-iq"')
                                            ),
                                        S.listItem()
                                            .title('VEX V5 Takımları')
                                            .child(
                                                S.documentList()
                                                    .title('VEX V5 Takımları')
                                                    .filter('_type == "team" && platform == "vex-v5"')
                                            ),
                                        S.listItem()
                                            .title('VEX U Takımları')
                                            .child(
                                                S.documentList()
                                                    .title('VEX U Takımları')
                                                    .filter('_type == "team" && platform == "vex-u"')
                                            ),
                                    ])
                            ),

                        // Turnuvalar
                        S.listItem()
                            .title('🏆 Turnuvalar')
                            .child(
                                S.list()
                                    .title('Turnuva Yönetimi')
                                    .items([
                                        S.listItem()
                                            .title('Tüm Turnuvalar')
                                            .child(
                                                S.documentTypeList('event')
                                                    .title('Turnuvalar')
                                                    .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                            ),
                                        S.divider(),
                                        S.listItem()
                                            .title('Kayıt Açık Turnuvalar')
                                            .child(
                                                S.documentList()
                                                    .title('Kayıt Açık')
                                                    .filter('_type == "event" && registrationOpen == true')
                                            ),
                                        S.listItem()
                                            .title('Yaklaşan Turnuvalar')
                                            .child(
                                                S.documentList()
                                                    .title('Yaklaşan')
                                                    .filter('_type == "event" && startDate >= now()')
                                                    .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                            ),
                                    ])
                            ),

                        // Kaynaklar
                        S.listItem()
                            .title('📚 Kaynaklar')
                            .child(
                                S.list()
                                    .title('Kaynak Yönetimi')
                                    .items([
                                        // Global görünüm
                                        S.listItem()
                                            .title('📋 Tüm Kaynaklar')
                                            .child(
                                                S.documentTypeList('resource')
                                                    .title('Tüm Kaynaklar')
                                            ),
                                        S.divider(),

                                        // Platform Klasörleri
                                        S.listItem()
                                            .title('🔴 VEX 123')
                                            .child(
                                                S.documentList()
                                                    .title('VEX 123 Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-123"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🟡 VEX GO')
                                            .child(
                                                S.documentList()
                                                    .title('VEX GO Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-go"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🟣 VEX IQ')
                                            .child(
                                                S.documentList()
                                                    .title('VEX IQ Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-iq"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🔴 VEX V5 (VRC)')
                                            .child(
                                                S.documentList()
                                                    .title('VEX V5 Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-v5"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🔵 VEX U')
                                            .child(
                                                S.documentList()
                                                    .title('VEX U Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-u"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🤖 VEX AI')
                                            .child(
                                                S.documentList()
                                                    .title('VEX AI Kaynakları')
                                                    .filter('_type == "resource" && platform == "vex-ai"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🌍 Genel Kaynaklar')
                                            .child(
                                                S.documentList()
                                                    .title('Genel Kaynaklar')
                                                    .filter('_type == "resource" && platform == "general"')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),

                                        S.divider(),

                                        // Kategori Kısayolları
                                        S.listItem()
                                            .title('📜 Oyun Kuralları')
                                            .child(
                                                S.documentList()
                                                    .title('Oyun Kuralları')
                                                    .filter('_type == "resource" && "game-rules" in categories')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                        S.listItem()
                                            .title('🏟️ Saha Kurulum')
                                            .child(
                                                S.documentList()
                                                    .title('Saha Kurulum')
                                                    .filter('_type == "resource" && "field-setup" in categories')
                                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                            ),
                                    ])
                            ),

                        S.divider(),

                        // Filtrelenmemiş tüm içerik türleri
                        ...S.documentTypeListItems().filter(
                            (listItem: ListItemBuilder) => !['news', 'team', 'event', 'resource'].includes(listItem.getId() as string)
                        ),
                    ]),
        }),
        visionTool({
            defaultApiVersion: '2024-01-01',
        }),
    ],

    schema: {
        types: schemaTypes,
    },

    // Tema özelleştirmesi
    theme: {
        ...vexTheme,
    } as any,
})
