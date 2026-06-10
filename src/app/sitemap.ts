import type { MetadataRoute } from 'next'
import { siteUrl, sitemapRoutes } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
