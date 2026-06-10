import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactCta } from '@/components/home/ContactCta'
import { SolutionHero } from '@/components/solutions/SolutionHero'
import { SolutionFeatureSection } from '@/components/solutions/SolutionFeatureSection'
import { getHomeContent, getSiteSettings, getSolutionDetail } from '@/lib/data'
import { siteUrl } from '@/lib/siteConfig'

// Render on each request so CMS edits (detail content, footer, CTA) show up.
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const detail = await getSolutionDetail(slug, 'es')
  if (!detail) return {}
  const url = `${siteUrl}/soluciones/${slug}`
  return {
    title: `${detail.title} | Altech`,
    description: detail.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: `${detail.title} | Altech`,
      description: detail.subtitle,
      url,
      type: 'website',
    },
  }
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params
  const [detail, home, site] = await Promise.all([
    getSolutionDetail(slug, 'es'),
    getHomeContent('es'),
    getSiteSettings('es'),
  ])
  if (!detail) notFound()

  return (
    <>
      <Header />
      <main>
        <SolutionHero detail={detail} />
        {detail.sections.map((section, i) => (
          <SolutionFeatureSection key={i} section={section} />
        ))}
        <ContactCta cta={home.contactCta} />
      </main>
      <Footer contact={site.contact} social={site.social} />
    </>
  )
}
