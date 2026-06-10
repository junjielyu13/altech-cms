import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { Solutions } from '@/components/home/Solutions'
import { Band } from '@/components/home/Band'
import { News } from '@/components/home/News'
import { ContactCta } from '@/components/home/ContactCta'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import {
  getClients,
  getHomeContent,
  getNews,
  getSiteSettings,
  getSolutions,
} from '@/lib/data'

// Render on each request so CMS edits show up immediately.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const locale = 'es'
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
      <Header />
      <main>
        <Hero hero={home.hero} clients={clients} />
        <Solutions intro={home.solutionsIntro} solutions={solutions} />
        <Band />
        <News news={news} />
        <ContactCta cta={home.contactCta} />
      </main>
      <Footer contact={site.contact} social={site.social} />
    </>
  )
}
