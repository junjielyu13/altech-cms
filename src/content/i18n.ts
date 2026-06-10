/**
 * Frontend i18n: locale list, UI string dictionaries and URL helpers.
 *
 * URL strategy ("as-needed" prefix): Spanish is the default and lives at the
 * root (`/soluciones/...`); English and Catalan are prefixed (`/en/...`,
 * `/ca/...`). The middleware rewrites unprefixed paths to the `es` route
 * internally, so existing Spanish URLs keep working unchanged.
 *
 * This module is client-safe (no server-only imports) so the language switcher
 * can use it too. CMS-driven copy is localized in Payload; these dictionaries
 * cover only the static chrome (nav, footer, button labels).
 */

export const locales = ['es', 'en', 'ca'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

/** Locales that carry a URL prefix (everything except the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale)

export function isLocale(value: string | undefined): value is Locale {
  return value === 'es' || value === 'en' || value === 'ca'
}

/** Prefix a site-internal href for the given locale. External links pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href
  if (locale === defaultLocale) return href
  if (href === '/') return `/${locale}`
  return `/${locale}${href}`
}

/** Split a pathname into its locale + the unprefixed ("bare") path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split('/')[1]
  if (seg === 'en' || seg === 'ca') {
    return { locale: seg, path: pathname.slice(3) || '/' }
  }
  return { locale: defaultLocale, path: pathname || '/' }
}

export const localeNames: Record<Locale, string> = { es: 'ES', en: 'EN', ca: 'CA' }
/** BCP-47 codes for the <html lang> attribute and OG locale. */
export const htmlLang: Record<Locale, string> = { es: 'es-ES', en: 'en', ca: 'ca-ES' }

interface NavLink {
  label: string
  href: string
}
interface MenuEntry {
  title: string
  description: string
  href: string
}
interface FooterColumn {
  title: string
  links: NavLink[]
}

export interface Dictionary {
  nav: {
    soluciones: string
    sobreNosotros: string
    noticias: string
    clientes: string
    trabaja: string
    contacto: string
  }
  solutionsMenu: MenuEntry[]
  aboutMenu: NavLink[]
  ui: {
    verMas: string
    descargarPdf: string
    ventajas: string
    newsTitle: string
    newsCta: string
  }
  footer: {
    direccion: string
    telefono: string
    email: string
    redes: string
    columns: FooterColumn[]
    legal: NavLink[]
    copyright: string
  }
}

const SOLUTION_HREFS = {
  transporte: '/soluciones/transporte-y-logistica',
  defensa: '/soluciones/defensa-y-seguridad',
  emergencias: '/soluciones/emergencias',
  servicios: '/soluciones/servicios-urbanos',
}

const es: Dictionary = {
  nav: {
    soluciones: 'Soluciones',
    sobreNosotros: 'Sobre nosotros',
    noticias: 'Noticias',
    clientes: 'Clientes',
    trabaja: 'Trabaja con nosotros',
    contacto: 'Contacto',
  },
  solutionsMenu: [
    { title: 'Transporte y logística', description: 'Telemática, ticketing, aparcamiento.', href: SOLUTION_HREFS.transporte },
    { title: 'Emergencias', description: 'Gestión de incidentes, geolocalización.', href: SOLUTION_HREFS.emergencias },
    { title: 'Defensa y seguridad', description: 'Vigilancia, analítica de vídeo, comunicaciones.', href: SOLUTION_HREFS.defensa },
    { title: 'Servicios urbanos', description: 'IoT urbano, residuos, movilidad.', href: SOLUTION_HREFS.servicios },
  ],
  aboutMenu: [
    { label: 'El equipo', href: '/sobre-nosotros/equipo' },
    { label: 'Historia', href: '/sobre-nosotros/historia' },
    { label: 'Política de calidad', href: '/politica-de-calidad' },
  ],
  ui: {
    verMas: 'Ver más',
    descargarPdf: 'Descargar PDF',
    ventajas: 'Ventajas',
    newsTitle: 'Noticias',
    newsCta: 'Ver más noticias',
  },
  footer: {
    direccion: 'Dirección',
    telefono: 'Teléfono',
    email: 'Email',
    redes: 'Redes sociales',
    columns: [
      {
        title: 'Soluciones',
        links: [
          { label: 'Transporte y logística', href: SOLUTION_HREFS.transporte },
          { label: 'Defensa y seguridad', href: SOLUTION_HREFS.defensa },
          { label: 'Emergencias', href: SOLUTION_HREFS.emergencias },
          { label: 'Servicios urbanos', href: SOLUTION_HREFS.servicios },
        ],
      },
      {
        title: 'Sobre nosotros',
        links: [
          { label: 'El equipo', href: '/sobre-nosotros/equipo' },
          { label: 'Política de calidad', href: '/politica-de-calidad' },
          { label: 'Historia', href: '/sobre-nosotros/historia' },
        ],
      },
      {
        title: 'Trabaja con nosotros',
        links: [
          { label: 'Clientes', href: '/clientes' },
          { label: 'Noticias', href: '/noticias' },
          { label: 'Contacto', href: '/contacto' },
        ],
      },
    ],
    legal: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Política de cookies', href: '/politica-de-cookies' },
      { label: 'Política de privacidad', href: '/politica-de-privacidad' },
      { label: 'Política de privacidad RRSS', href: '/politica-de-privacidad-rrss' },
      { label: 'Política de Seguridad de la Información', href: '/politica-seguridad-informacion' },
    ],
    copyright: '© 2026 ALTECH Solutions and Consulting S.L.',
  },
}

const en: Dictionary = {
  nav: {
    soluciones: 'Solutions',
    sobreNosotros: 'About us',
    noticias: 'News',
    clientes: 'Clients',
    trabaja: 'Work with us',
    contacto: 'Contact',
  },
  solutionsMenu: [
    { title: 'Transport & logistics', description: 'Telematics, ticketing, parking.', href: SOLUTION_HREFS.transporte },
    { title: 'Emergencies', description: 'Incident management, geolocation.', href: SOLUTION_HREFS.emergencias },
    { title: 'Defense & security', description: 'Surveillance, video analytics, communications.', href: SOLUTION_HREFS.defensa },
    { title: 'Urban services', description: 'Urban IoT, waste, mobility.', href: SOLUTION_HREFS.servicios },
  ],
  aboutMenu: [
    { label: 'The team', href: '/sobre-nosotros/equipo' },
    { label: 'History', href: '/sobre-nosotros/historia' },
    { label: 'Quality policy', href: '/politica-de-calidad' },
  ],
  ui: {
    verMas: 'Learn more',
    descargarPdf: 'Download PDF',
    ventajas: 'Advantages',
    newsTitle: 'News',
    newsCta: 'More news',
  },
  footer: {
    direccion: 'Address',
    telefono: 'Phone',
    email: 'Email',
    redes: 'Social media',
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Transport & logistics', href: SOLUTION_HREFS.transporte },
          { label: 'Defense & security', href: SOLUTION_HREFS.defensa },
          { label: 'Emergencies', href: SOLUTION_HREFS.emergencias },
          { label: 'Urban services', href: SOLUTION_HREFS.servicios },
        ],
      },
      {
        title: 'About us',
        links: [
          { label: 'The team', href: '/sobre-nosotros/equipo' },
          { label: 'Quality policy', href: '/politica-de-calidad' },
          { label: 'History', href: '/sobre-nosotros/historia' },
        ],
      },
      {
        title: 'Work with us',
        links: [
          { label: 'Clients', href: '/clientes' },
          { label: 'News', href: '/noticias' },
          { label: 'Contact', href: '/contacto' },
        ],
      },
    ],
    legal: [
      { label: 'Legal notice', href: '/aviso-legal' },
      { label: 'Cookie policy', href: '/politica-de-cookies' },
      { label: 'Privacy policy', href: '/politica-de-privacidad' },
      { label: 'Social media privacy policy', href: '/politica-de-privacidad-rrss' },
      { label: 'Information security policy', href: '/politica-seguridad-informacion' },
    ],
    copyright: '© 2026 ALTECH Solutions and Consulting S.L.',
  },
}

const ca: Dictionary = {
  nav: {
    soluciones: 'Solucions',
    sobreNosotros: 'Sobre nosaltres',
    noticias: 'Notícies',
    clientes: 'Clients',
    trabaja: 'Treballa amb nosaltres',
    contacto: 'Contacte',
  },
  solutionsMenu: [
    { title: 'Transport i logística', description: 'Telemàtica, ticketing, aparcament.', href: SOLUTION_HREFS.transporte },
    { title: 'Emergències', description: "Gestió d'incidents, geolocalització.", href: SOLUTION_HREFS.emergencias },
    { title: 'Defensa i seguretat', description: 'Vigilància, analítica de vídeo, comunicacions.', href: SOLUTION_HREFS.defensa },
    { title: 'Serveis urbans', description: 'IoT urbà, residus, mobilitat.', href: SOLUTION_HREFS.servicios },
  ],
  aboutMenu: [
    { label: "L'equip", href: '/sobre-nosotros/equipo' },
    { label: 'Història', href: '/sobre-nosotros/historia' },
    { label: 'Política de qualitat', href: '/politica-de-calidad' },
  ],
  ui: {
    verMas: "Veure'n més",
    descargarPdf: 'Descarregar PDF',
    ventajas: 'Avantatges',
    newsTitle: 'Notícies',
    newsCta: 'Més notícies',
  },
  footer: {
    direccion: 'Adreça',
    telefono: 'Telèfon',
    email: 'Email',
    redes: 'Xarxes socials',
    columns: [
      {
        title: 'Solucions',
        links: [
          { label: 'Transport i logística', href: SOLUTION_HREFS.transporte },
          { label: 'Defensa i seguretat', href: SOLUTION_HREFS.defensa },
          { label: 'Emergències', href: SOLUTION_HREFS.emergencias },
          { label: 'Serveis urbans', href: SOLUTION_HREFS.servicios },
        ],
      },
      {
        title: 'Sobre nosaltres',
        links: [
          { label: "L'equip", href: '/sobre-nosotros/equipo' },
          { label: 'Política de qualitat', href: '/politica-de-calidad' },
          { label: 'Història', href: '/sobre-nosotros/historia' },
        ],
      },
      {
        title: 'Treballa amb nosaltres',
        links: [
          { label: 'Clients', href: '/clientes' },
          { label: 'Notícies', href: '/noticias' },
          { label: 'Contacte', href: '/contacto' },
        ],
      },
    ],
    legal: [
      { label: 'Avís legal', href: '/aviso-legal' },
      { label: 'Política de cookies', href: '/politica-de-cookies' },
      { label: 'Política de privacitat', href: '/politica-de-privacidad' },
      { label: 'Política de privacitat XXSS', href: '/politica-de-privacidad-rrss' },
      { label: 'Política de seguretat de la informació', href: '/politica-seguridad-informacion' },
    ],
    copyright: '© 2026 ALTECH Solutions and Consulting S.L.',
  },
}

const dictionaries: Record<Locale, Dictionary> = { es, en, ca }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}
