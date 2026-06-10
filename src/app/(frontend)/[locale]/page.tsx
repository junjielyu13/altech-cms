import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { Solutions } from '@/components/home/Solutions'
import { Band } from '@/components/home/Band'
import { News } from '@/components/home/News'
import { ContactCta } from '@/components/home/ContactCta'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import { isLocale, type Locale } from '@/content/i18n'
import {
  getClients,
  getHomeContent,
  getNews,
  getSiteSettings,
  getSolutions,
} from '@/lib/data'

// Render on each request so CMS edits show up immediately.
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    alternates: {
      canonical: locale === 'es' ? '/' : `/${locale}`,
      languages: { es: '/', en: '/en', ca: '/ca', 'x-default': '/' },
    },
  }
}

export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  const [home, solutions, news, clients, site] = await Promise.all([
    getHomeContent(locale),
    getSolutions(locale),
    getNews(locale),
    getClients(locale),
    getSiteSettings(locale),
  ])

  return (
    <>
      <OrganizationJsonLd />
      <Header locale={locale} />
      <main>
        <Hero hero={home.hero} clients={clients} />
        <Solutions locale={locale} intro={home.solutionsIntro} solutions={solutions} />
        <Band />
        <News locale={locale} news={news} />
        <ContactCta locale={locale} cta={home.contactCta} />
      </main>
      <Footer locale={locale} contact={site.contact} social={site.social} />
    </>
  )
}
