import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

// Sanity project configuration
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pg180y4e'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Sanity client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // CDN for production, fresh data for development
})

// Image URL builder
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function for fetching with revalidation
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60, // Default: 60 seconds
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: revalidate === false ? false : revalidate,
      tags,
    },
  })
}

// Common GROQ queries
export const queries = {
  // News queries
  allNews: `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    featured,
    teamOfTheDay,
    author
  }`,

  featuredNews: `*[_type == "news" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    teamOfTheDay
  }`,

  newsBySlug: `*[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage,
    excerpt,
    body,
    featured,
    teamOfTheDay,
    author
  }`,

  // Team queries
  allTeams: `*[_type == "team" && isActive == true] | order(city asc, name asc) {
    _id,
    name,
    teamNumber,
    city,
    platform,
    logo,
    schoolOrOrganization,
    memberCount
  }`,

  teamsByCity: `*[_type == "team" && city == $city && isActive == true] | order(name asc) {
    _id,
    name,
    teamNumber,
    platform,
    logo,
    schoolOrOrganization
  }`,

  teamByNumber: `*[_type == "team" && teamNumber == $teamNumber][0]`,

  // Event queries
  upcomingEvents: `*[_type == "event" && startDate >= now()] | order(startDate asc) {
    _id,
    name,
    slug,
    eventType,
    platform,
    startDate,
    endDate,
    city,
    venue,
    registrationOpen,
    registrationDeadline,
    maxTeams,
    registeredTeams,
    coverImage
  }`,

  pastEvents: `*[_type == "event" && startDate < now()] | order(startDate desc) {
    _id,
    name,
    slug,
    startDate,
    city,
    resultsPublished
  }`,

  eventBySlug: `*[_type == "event" && slug.current == $slug][0]`,

  // Resource queries
  allResources: `*[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    platform,
    category,
    description,
    resourceType,
    file,
    externalUrl,
    thumbnail,
    season,
    language,
    featured,
    downloadCount
  }`,

  resourcesByPlatform: `*[_type == "resource" && platform == $platform] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    resourceType,
    file,
    externalUrl,
    thumbnail,
    downloadCount
  }`,
}

// City statistics helper (for team map)
export async function getCityStats() {
  const query = `{
    "cities": *[_type == "team" && isActive == true] {
      city,
      platform
    }
  }`

  const result = await client.fetch<{ cities: { city: string; platform: string }[] }>(query)

  // Aggregate by city
  const cityMap = new Map<string, { vexIQ: number; vexV5: number; vexU: number; total: number }>()

  result.cities.forEach(({ city, platform }) => {
    if (!cityMap.has(city)) {
      cityMap.set(city, { vexIQ: 0, vexV5: 0, vexU: 0, total: 0 })
    }
    const stats = cityMap.get(city)!
    if (platform === 'vex-iq') stats.vexIQ++
    else if (platform === 'vex-v5') stats.vexV5++
    else if (platform === 'vex-u') stats.vexU++
    stats.total++
  })

  return Array.from(cityMap.entries()).map(([city, stats]) => ({
    city,
    ...stats,
  }))
}
