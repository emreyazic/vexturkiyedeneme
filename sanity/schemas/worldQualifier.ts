import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'worldQualifier',
    title: 'World Championship Qualifier',
    type: 'document',
    fields: [
        defineField({
            name: 'team',
            title: 'Takım',
            type: 'reference',
            to: [{ type: 'team' }],
            description: 'Kalifiye olan takımı seçin',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'season',
            title: 'Season',
            type: 'string',
            description: 'Season year (e.g., 2025-2026)',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'qualificationMethod',
            title: 'Qualification Method',
            type: 'string',
            description: 'Award or method that qualified team (e.g., Excellence Award)',
            options: {
                list: [
                    { title: 'Excellence Award', value: 'Excellence Award' },
                    { title: 'Tournament Champion', value: 'Tournament Champion' },
                    { title: 'Skills Champion', value: 'Skills Champion' },
                    { title: 'Design Award', value: 'Design Award' },
                    { title: 'Think Award', value: 'Think Award' },
                    { title: 'Innovate Award', value: 'Innovate Award' },
                    { title: 'Build Award', value: 'Build Award' },
                    { title: 'Judges Award', value: 'Judges Award' },
                    { title: 'Robot Skills', value: 'Robot Skills' }
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'teamPhoto',
            title: 'Team Photo',
            type: 'image',
            description: 'Özel fotoğraf (yoksa takımın logosu kullanılır)',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'qualificationDate',
            title: 'Qualification Date',
            type: 'date',
            description: 'Date when team qualified'
        }),
        defineField({
            name: 'qualifyingEvent',
            title: 'Qualifying Event',
            type: 'string',
            description: 'Name of the event where team qualified'
        })
    ],
    preview: {
        select: {
            teamName: 'team.name',
            teamNumber: 'team.teamNumber',
            platform: 'team.platform',
            method: 'qualificationMethod',
            teamLogo: 'team.logo',
            customPhoto: 'teamPhoto'
        },
        prepare({ teamName, teamNumber, platform, method, teamLogo, customPhoto }) {
            const platformLabels: Record<string, string> = {
                'vex-iq': 'VEX IQ',
                'vex-v5': 'VEX V5',
                'vex-u': 'VEX U'
            }
            return {
                title: `${teamName || 'Takım Seçilmedi'} (${teamNumber || '---'})`,
                subtitle: `${platformLabels[platform] || platform || ''} - ${method || ''}`,
                media: customPhoto || teamLogo
            }
        }
    },
    orderings: [
        {
            title: 'Team Number',
            name: 'teamNumberAsc',
            by: [{ field: 'team.teamNumber', direction: 'asc' }]
        },
        {
            title: 'Recent Qualification',
            name: 'qualificationDateDesc',
            by: [{ field: 'qualificationDate', direction: 'desc' }]
        }
    ]
})
