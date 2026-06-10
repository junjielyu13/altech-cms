/** Canonical site URL + organisation data, used for metadata, sitemap,
 *  robots and JSON-LD. Override the URL per environment with
 *  NEXT_PUBLIC_SERVER_URL (e.g. https://altech.es once the domain is live). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL || 'https://altech-cms.vercel.app'
).replace(/\/$/, '')

export const org = {
  legalName: 'ALTECH Solutions and Consulting S.L.',
  name: 'Altech',
  email: 'altech@altech.es',
  phone: '+34935019844',
  street: 'C/ Àlaba 140, Planta 7ª',
  postalCode: '08018',
  city: 'Barcelona',
  country: 'ES',
  sameAs: ['https://altech.es', 'https://www.linkedin.com', 'https://www.youtube.com'],
}

/** Public routes for the sitemap. Extend as pages are built. */
export const sitemapRoutes = ['/', '/soluciones/transporte-y-logistica']
