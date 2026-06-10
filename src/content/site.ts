/**
 * Site-wide chrome content (header nav + footer), transcribed from Figma.
 * Maps to the Payload `site-settings` global later.
 */

export const solutionsMenu = [
  {
    title: 'Trasporte y logística',
    description: 'Telemática, ticketing, apartcamiento.',
    href: '/soluciones/transporte-y-logistica',
  },
  {
    title: 'Emergencias',
    description: 'Gestión de incidentes, geolocalización.',
    href: '/soluciones/emergencias',
  },
  {
    title: 'Defensa y seguridad',
    description: 'Vigilancia, analítica de vídeo, comunicaciones.',
    href: '/soluciones/defensa-y-seguridad',
  },
  {
    title: 'Servicios urbanos',
    description: 'IoT urbano, residuos, movilidad.',
    href: '/soluciones/servicios-urbanos',
  },
]

export const aboutMenu = [
  { label: 'El equipo', href: '/sobre-nosotros/equipo' },
  { label: 'Historia', href: '/sobre-nosotros/historia' },
  { label: 'Política de calidad', href: '/politica-de-calidad' },
]

export const mainNav = [
  { label: 'Soluciones', href: '/soluciones', children: solutionsMenu },
  { label: 'Sobre nosotros', href: '/sobre-nosotros', children: aboutMenu },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
]

export const contact = {
  address: 'C/ Àlaba 140, Planta 7ª, 08018 Barcelona (España)',
  email: 'altech@altech.es',
  phone: 'T. +34 935 019 844',
}

export const footerColumns = {
  soluciones: {
    title: 'Soluciones',
    links: [
      { label: 'Transporte y logística', href: '/soluciones/transporte-y-logistica' },
      { label: 'Defensa y seguridad', href: '/soluciones/defensa-y-seguridad' },
      { label: 'Emergencias', href: '/soluciones/emergencias' },
      { label: 'Servicios urbanos', href: '/soluciones/servicios-urbanos' },
    ],
  },
  sobreNosotros: {
    title: 'Sobre nosotros',
    links: [
      { label: 'El equipo', href: '/sobre-nosotros/equipo' },
      { label: 'Política de calidad', href: '/politica-de-calidad' },
      { label: 'Historia', href: '/sobre-nosotros/historia' },
    ],
  },
  trabaja: {
    title: 'Trabaja con nosotros',
    links: [
      { label: 'Clientes', href: '/clientes' },
      { label: 'Noticias', href: '/noticias' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
}

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: '/figma/social-linkedin.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: '/figma/social-youtube.svg' },
]

export const legalLinks = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de cookies', href: '/politica-de-cookies' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
  { label: 'Política de privacidad RRSS', href: '/politica-de-privacidad-rrss' },
  { label: 'Política de Seguridad de la Información', href: '/politica-seguridad-informacion' },
]

export const certBadges = [
  '/figma/cert-1.png',
  '/figma/cert-2.png',
  '/figma/cert-3.png',
]

export const copyright = '© 2026 ALTECH Solutions and Consulting S.L.'
