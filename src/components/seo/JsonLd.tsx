import { siteUrl, org } from '@/lib/siteConfig'

/** Organization + WebSite structured data for the homepage. Note: the Google
 *  "knowledge panel" / map comes from a Google Business Profile, not this — but
 *  this structured data helps search engines associate the site with Altech. */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: org.legalName,
        alternateName: org.name,
        url: siteUrl,
        email: org.email,
        telephone: org.phone,
        logo: `${siteUrl}/figma/logo-icon-red.svg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: org.street,
          postalCode: org.postalCode,
          addressLocality: org.city,
          addressCountry: org.country,
        },
        sameAs: org.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: org.name,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'es-ES',
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
