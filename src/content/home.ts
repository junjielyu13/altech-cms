/**
 * Static homepage content, transcribed from the Figma "ALTECH - Home" board.
 * Kept in one typed module so it can later be swapped for Payload CMS data
 * (globals.home + solutions/news/clients collections) without touching the
 * presentation components.
 */

export type SolutionArea =
  | 'transport-logistics'
  | 'emergency-management'
  | 'defense-security'
  | 'urban-services'

export interface SolutionCardContent {
  area: SolutionArea
  icon: string
  title: string
  description: string
  href: string
  featured?: boolean
}

export interface StatContent {
  value: string
  label: string
}

export interface NewsCardContent {
  title: string
  date: string
  image: string
  href: string
}

export interface ClientLogo {
  src: string
  alt: string
}

export const hero = {
  titleLines: ['Ayudamos a construir', 'la movilidad del mañana'],
  subtitle:
    'Ingeniería tecnológica de alta especialización en el desarrollo e integración de soluciones TIC',
  stats: [
    { value: '+15 años', label: 'experiencia y trabajo' },
    { value: '+50 proyectos', label: 'en sectores críticos' },
    { value: '99.9% uptime', label: 'en operaciones activas' },
    { value: '+40 clientes', label: 'institucionales y privados' },
  ] satisfies StatContent[],
}

export const clients: ClientLogo[] = [
  { src: '/figma/client-1.png', alt: 'AENA' },
  { src: '/figma/client-2.png', alt: 'Silence' },
  { src: '/figma/client-3.png', alt: 'B:SM' },
  { src: '/figma/client-4.png', alt: 'SEUR' },
  { src: '/figma/client-5.png', alt: 'Ajuntament de Sabadell' },
  { src: '/figma/client-6.png', alt: 'Telefónica' },
]

export const solutionsIntro = {
  eyebrow: 'Nuestras soluciones',
  title: 'Ayudamos a construir la movilidad',
  subtitle:
    'Soluciones tecnológicas inteligentes para la gestión de movilidad, seguridad y servicios críticos.',
}

export const solutions: SolutionCardContent[] = [
  {
    area: 'transport-logistics',
    icon: '/figma/icon-transporte.svg',
    title: 'Transporte y logística',
    description: 'Sistemas de telemática y gestión de flotas para operadores de transporte',
    href: '/soluciones/transporte-y-logistica',
  },
  {
    area: 'emergency-management',
    icon: '/figma/icon-emergencias.svg',
    title: 'Emergencias',
    description:
      'Plataforma integradas de despacho, geolocalización y gestión de incidencias para servicios de emergencia.',
    href: '/soluciones/emergencias',
    featured: true,
  },
  {
    area: 'defense-security',
    icon: '/figma/icon-defensa.svg',
    title: 'Defensa y seguridad',
    description: 'Vigilancia perimetral y comunicaciones para infraestructuras críticas',
    href: '/soluciones/defensa-y-seguridad',
  },
  {
    area: 'urban-services',
    icon: '/figma/icon-servicios.svg',
    title: 'Servicios urbanos',
    description:
      'Telemetría IoT, gestión de residuos y movilidad sostenible para municipios y empresas de servicios.',
    href: '/soluciones/servicios-urbanos',
  },
]

export const band = {
  image: '/figma/band-city.png',
  caption: 'Hace más de 15 años',
}

export const news: NewsCardContent[] = [
  {
    title: 'ALTECH implanta un sistema ITS para la gestión operativa de la grúa municipal en Málaga',
    date: '28 ENERO 2023',
    image: '/figma/news-thumb.png',
    href: '/noticias/its-grua-municipal-malaga',
  },
  {
    title: 'ALTECH recibe un reconocimiento en el encuentro de Future: Fast Forward',
    date: '28 ENERO 2023',
    image: '/figma/news-thumb.png',
    href: '/noticias/reconocimiento-future-fast-forward',
  },
  {
    title:
      'Llega la nueva plataforma DUM para transformar la movilidad y la logística de los municipios catalanes',
    date: '28 ENERO 2023',
    image: '/figma/news-thumb.png',
    href: '/noticias/plataforma-dum-municipios-catalanes',
  },
  {
    title: 'ALTECH implementa con éxito un Sistema de Gestión de Seguridad de la Información (SGSI)',
    date: '28 ENERO 2023',
    image: '/figma/news-thumb.png',
    href: '/noticias/sgsi',
  },
]

export const contactCta = {
  title: 'Contacta con nosotros',
  subtitle:
    '¿Quieres conocer más a fondo lo que hacemos? Dinos algo y nos pondremos en contacto contigo.',
  buttonLabel: 'Contactar',
  href: '/contacto',
}
