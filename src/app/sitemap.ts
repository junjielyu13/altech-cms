import type { MetadataRoute } from 'next'
import { siteUrl, sitemapRoutes } from '@/lib/siteConfig'
import { locales, localizeHref } from '@/content/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizeHref(route, locale)}`,
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}${localizeHref(route, l)}`]),
        ),
      },
    })),
  )
}
