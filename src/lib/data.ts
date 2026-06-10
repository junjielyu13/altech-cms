import { getPayload } from 'payload'
import config from '@payload-config'
import * as fallback from '@/content/home'
import * as siteFallback from '@/content/site'
import type {
  ClientLogo,
  NewsCardContent,
  SolutionArea,
  SolutionCardContent,
  StatContent,
} from '@/content/home'

export type Locale = 'es' | 'en' | 'ca'

// Decorative, design-owned assets that are NOT editable content: each solution
// area keeps a fixed icon, and the "Emergencias" card is the highlighted one.
const ICON_BY_AREA: Record<SolutionArea, string> = {
  'transport-logistics': '/figma/icon-transporte.svg',
  'emergency-management': '/figma/icon-emergencias.svg',
  'defense-security': '/figma/icon-defensa.svg',
  'urban-services': '/figma/icon-servicios.svg',
}

const SOCIAL_ICON: Record<string, string> = {
  linkedin: '/figma/social-linkedin.svg',
  youtube: '/figma/social-youtube.svg',
}

async function payload() {
  return getPayload({ config })
}

function mediaUrl(media: unknown): string | undefined {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: string | null }).url
    return url || undefined
  }
  return undefined
}

function formatDate(value: string | null | undefined, locale: Locale): string | undefined {
  if (!value) return undefined
  try {
    const d = new Date(value)
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' })
      .format(d)
      .toUpperCase()
  } catch {
    return undefined
  }
}

export interface HomeContent {
  hero: { titleLines: string[]; subtitle: string; stats: StatContent[] }
  solutionsIntro: { eyebrow: string; title: string; subtitle: string }
  contactCta: { title: string; subtitle: string; buttonLabel: string; href: string }
}

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  try {
    const p = await payload()
    const home = (await p.findGlobal({ slug: 'home', locale, fallbackLocale: 'es' })) as any
    const lines = (home?.hero?.headline as string | undefined)
      ?.split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const stats = (home?.hero?.stats as Array<{ value?: string; label?: string }> | undefined)
      ?.filter((s) => s?.value)
      .map((s) => ({ value: s.value || '', label: s.label || '' }))
    return {
      hero: {
        titleLines: lines?.length ? lines : fallback.hero.titleLines,
        subtitle: home?.hero?.subtitle || fallback.hero.subtitle,
        stats: stats?.length ? stats : fallback.hero.stats,
      },
      solutionsIntro: {
        eyebrow: home?.solutionsSection?.eyebrow || fallback.solutionsIntro.eyebrow,
        title: home?.solutionsSection?.title || fallback.solutionsIntro.title,
        subtitle: home?.solutionsSection?.subtitle || fallback.solutionsIntro.subtitle,
      },
      contactCta: {
        title: home?.contactCta?.title || fallback.contactCta.title,
        subtitle: home?.contactCta?.subtitle || fallback.contactCta.subtitle,
        buttonLabel: home?.contactCta?.buttonLabel || fallback.contactCta.buttonLabel,
        href: home?.contactCta?.link || fallback.contactCta.href,
      },
    }
  } catch {
    return {
      hero: fallback.hero,
      solutionsIntro: fallback.solutionsIntro,
      contactCta: fallback.contactCta,
    }
  }
}

export async function getSolutions(locale: Locale): Promise<SolutionCardContent[]> {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'solutions',
      locale,
      fallbackLocale: 'es',
      limit: 8,
      sort: 'order',
    })
    if (!res.docs.length) return fallback.solutions
    return res.docs.map((s: any) => ({
      area: s.area as SolutionArea,
      icon: ICON_BY_AREA[s.area as SolutionArea] || '/figma/icon-transporte.svg',
      title: s.title,
      description: s.excerpt || '',
      href: `/soluciones/${s.slug}`,
      featured: s.area === 'emergency-management',
    }))
  } catch {
    return fallback.solutions
  }
}

export async function getNews(locale: Locale): Promise<NewsCardContent[]> {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'news',
      locale,
      fallbackLocale: 'es',
      limit: 4,
      sort: '-date',
    })
    if (!res.docs.length) return fallback.news
    return res.docs.map((n: any) => ({
      title: n.title,
      date: formatDate(n.date, locale) || '',
      image: mediaUrl(n.coverImage) || '/figma/news-thumb.png',
      href: `/noticias/${n.slug}`,
    }))
  } catch {
    return fallback.news
  }
}

export async function getClients(locale: Locale): Promise<ClientLogo[]> {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'clients', locale, fallbackLocale: 'es', limit: 12 })
    const mapped = res.docs
      .map((c: any) => ({ src: mediaUrl(c.logo), alt: c.name as string }))
      .filter((c): c is ClientLogo => Boolean(c.src))
    return mapped.length ? mapped : fallback.clients
  } catch {
    return fallback.clients
  }
}

export interface SiteSettingsContent {
  contact: { address: string; email: string; phone: string }
  social: Array<{ label: string; href: string; icon: string }>
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettingsContent> {
  try {
    const p = await payload()
    const s = (await p.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'es' })) as any
    const social = (s?.social as Array<{ platform?: string; url?: string }> | undefined)
      ?.filter((x) => x?.url && x?.platform)
      .map((x) => ({
        label: x.platform || '',
        href: x.url || '#',
        icon: SOCIAL_ICON[(x.platform || '').toLowerCase()] || '/figma/social-linkedin.svg',
      }))
    return {
      contact: {
        address: s?.address || siteFallback.contact.address,
        email: s?.email || siteFallback.contact.email,
        phone: s?.phone || siteFallback.contact.phone,
      },
      social: social?.length ? social : siteFallback.social,
    }
  } catch {
    return { contact: siteFallback.contact, social: siteFallback.social }
  }
}
