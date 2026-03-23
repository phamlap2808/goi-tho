import { getPayload } from 'payload'
import config from '@/payload.config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goitho.com'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/dich-vu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/dat-lich`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/anh-cong-trinh`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Dynamic: services
  let servicePages: MetadataRoute.Sitemap = []
  try {
    const services = await payload.find({ collection: 'services', limit: 50, where: { status: { equals: 'active' } } })
    servicePages = services.docs.map((s: any) => ({
      url: `${baseUrl}/dich-vu/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {}

  // Dynamic: blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = await payload.find({ collection: 'posts', limit: 100, where: { status: { equals: 'published' } } })
    blogPages = posts.docs.map((p: any) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  return [...staticPages, ...servicePages, ...blogPages]
}
