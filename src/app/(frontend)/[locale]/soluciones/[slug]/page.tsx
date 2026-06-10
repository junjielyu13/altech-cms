import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactCta } from '@/components/home/ContactCta'
import { SolutionHero } from '@/components/solutions/SolutionHero'
import { SolutionFeatureSection } from '@/components/solutions/SolutionFeatureSection'
import { isLocale, type Locale } from '@/content/i18n'
import { getHomeContent, getSiteSettings, getSolutionDetail } from '@/lib/data'
import { siteUrl } from '@/lib/siteConfig'

// Render on each request so CMS edits (detail content, footer, CTA) show up.
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ locale: string; slug: string }> }

const path = (locale: Locale, slug: string) =>
  locale === 'es' ? `/soluciones/${slug}` : `/${locale}/soluciones/${slug}`

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const detail = await getSolutionDetail(slug, locale)
  if (!detail) return {}
  return {
    title: `${detail.title} | Altech`,
    description: detail.subtitle,
    alternates: {
      canonical: `${siteUrl}${path(locale, slug)}`,
      languages: {
        es: path('es', slug),
        en: path('en', slug),
        ca: path('ca', slug),
        'x-default': path('es', slug),
      },
    },
    openGraph: {
      title: `${detail.title} | Altech`,
      description: detail.subtitle,
      url: `${siteUrl}${path(locale, slug)}`,
      type: 'website',
    },
  }
}

export default async function SolutionPage({ params }: Params) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  const [detail, home, site] = await Promise.all([
    getSolutionDetail(slug, locale),
    getHomeContent(locale),
    getSiteSettings(locale),
  ])
  if (!detail) notFound()

  return (
    <>
      <Header locale={locale} />
      <main>
        <SolutionHero detail={detail} locale={locale} />
        {detail.sections.map((section, i) => (
          <SolutionFeatureSection key={i} section={section} locale={locale} />
        ))}
        <ContactCta locale={locale} cta={home.contactCta} />
      </main>
      <Footer locale={locale} contact={site.contact} social={site.social} />
    </>
  )
}
