import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { Solutions } from '@/components/home/Solutions'
import { Band } from '@/components/home/Band'
import { News } from '@/components/home/News'
import { ContactCta } from '@/components/home/ContactCta'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Band />
        <News />
        <ContactCta />
      </main>
      <Footer />
    </>
  )
}
