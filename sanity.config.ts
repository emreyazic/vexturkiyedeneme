'use client'

/**
 * This configuration is used for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder, type ListItemBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// RECF Türkiye renk teması
const recfTheme = {
    '--brand-primary': '#E31837',
    '--brand-primary--inverted': '#FFFFFF',
}

export default defineConfig({
    name: 'recf-turkiye-studio',
    title: 'RECF Türkiye CMS',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd6h0g8h8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S: StructureBuilder) =>
                S.list()
                    .title('RECF Türkiye İçerik Yönetimi')
                    .items([
                        // Haberler
                        S.listItem()
                            .title('📰 Haberler & Duyurular')
                            .child(
                                S.documentTypeList('news')
                                    .title('Tüm Haberler')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                            ),

                        // Takımlar
                        S.listItem()
                            .title('👥 Takımlar')
                            .child(
                                S.documentTypeList('team')
                                    .title('Tüm Takımlar')
                                    .defaultOrdering([{ field: 'city', direction: 'asc' }])
                            ),

                        // Turnuvalar / Etkinlikler
                        S.listItem()
                            .title('🏆 Turnuvalar ve Etkinlikler')
                            .child(
                                S.list()
                                    .title('Etkinlik Yönetimi')
                                    .items([
                                        S.listItem()
                                            .title('Tüm Etkinlikler')
                                            .child(
                                                S.documentTypeList('event')
                                                    .title('Etkinlikler')
                                                    .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                            ),
                                        S.divider(),
                                        S.listItem()
                                            .title('Kayıt Açık Etkinlikler')
                                            .child(
                                                S.documentList()
                                                    .title('Kayıt Açık')
                                                    .filter('_type == "event" && registrationOpen == true')
                                            ),
                                        S.listItem()
                                            .title('Yaklaşan Etkinlikler')
                                            .child(
                                                S.documentList()
                                                    .title('Yaklaşan')
                                                    .filter('_type == "event" && startDate >= now()')
                                                    .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                            ),
                                    ])
                            ),

                        // Kaynaklar & Dokümanlar
                        S.listItem()
                            .title('📚 Kaynaklar ve Dokümanlar')
                            .child(
                                S.documentTypeList('resource')
                                    .title('Tüm Kaynaklar')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                            ),

                        S.divider(),

                        // Filtrelenmemiş tüm diğer içerik türleri
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
        ...recfTheme,
    } as any,
})