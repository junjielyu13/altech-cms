import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (f: string) => path.resolve(dirname, '../public/figma', f)

const run = async () => {
  const payload = await getPayload({ config })

  // 1. Admin user --------------------------------------------------------------
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@altech.es', password: 'Altech2026!' },
    })
    console.log('✅ Admin: admin@altech.es / Altech2026!')
  }

  // 2. Reset content collections (idempotent re-seed) --------------------------
  for (const collection of ['solutions', 'news', 'clients', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }

  // 3. Media uploads -----------------------------------------------------------
  const newsThumb = await payload.create({
    collection: 'media',
    filePath: asset('news-thumb.png'),
    data: { alt: 'Noticia Altech' },
  })

  const clientDefs = [
    { name: 'AENA', file: 'client-1.png' },
    { name: 'Silence', file: 'client-2.png' },
    { name: 'B:SM', file: 'client-3.png' },
    { name: 'SEUR', file: 'client-4.png' },
    { name: 'Ajuntament de Sabadell', file: 'client-5.png' },
    { name: 'Telefónica', file: 'client-6.png' },
  ]

  // 4. Clients -----------------------------------------------------------------
  for (const c of clientDefs) {
    const logo = await payload.create({
      collection: 'media',
      filePath: asset(c.file),
      data: { alt: c.name },
    })
    await payload.create({
      collection: 'clients',
      data: { name: c.name, logo: logo.id, featured: true },
    })
  }

  // 5. Solutions (es + en; ca falls back to es) --------------------------------
  const solutions = [
    {
      slug: 'transporte-y-logistica',
      area: 'transport-logistics',
      order: 1,
      es: {
        title: 'Transporte y logística',
        excerpt: 'Sistemas de telemática y gestión de flotas para operadores de transporte',
      },
      en: { title: 'Transport & Logistics', excerpt: 'Telematics and fleet management systems for transport operators' },
    },
    {
      slug: 'emergencias',
      area: 'emergency-management',
      order: 2,
      es: {
        title: 'Emergencias',
        excerpt:
          'Plataforma integradas de despacho, geolocalización y gestión de incidencias para servicios de emergencia.',
      },
      en: { title: 'Emergency Management', excerpt: 'Integrated dispatch, geolocation and incident management for emergency services.' },
    },
    {
      slug: 'defensa-y-seguridad',
      area: 'defense-security',
      order: 3,
      es: {
        title: 'Defensa y seguridad',
        excerpt: 'Vigilancia perimetral y comunicaciones para infraestructuras críticas',
      },
      en: { title: 'Defense & Security', excerpt: 'Perimeter surveillance and communications for critical infrastructure' },
    },
    {
      slug: 'servicios-urbanos',
      area: 'urban-services',
      order: 4,
      es: {
        title: 'Servicios urbanos',
        excerpt:
          'Telemetría IoT, gestión de residuos y movilidad sostenible para municipios y empresas de servicios.',
      },
      en: { title: 'Urban Services', excerpt: 'IoT telemetry, waste management and sustainable mobility for municipalities and utilities.' },
    },
  ] as const

  for (const s of solutions) {
    const doc = await payload.create({
      collection: 'solutions',
      locale: 'es',
      data: { slug: s.slug, area: s.area, order: s.order, title: s.es.title, excerpt: s.es.excerpt },
    })
    await payload.update({
      collection: 'solutions',
      id: doc.id,
      locale: 'en',
      data: { title: s.en.title, excerpt: s.en.excerpt },
    })
  }

  // 6. News (es) ---------------------------------------------------------------
  const news = [
    { slug: 'its-grua-municipal-malaga', title: 'ALTECH implanta un sistema ITS para la gestión operativa de la grúa municipal en Málaga' },
    { slug: 'reconocimiento-future-fast-forward', title: 'ALTECH recibe un reconocimiento en el encuentro de Future: Fast Forward' },
    { slug: 'plataforma-dum-municipios-catalanes', title: 'Llega la nueva plataforma DUM para transformar la movilidad y la logística de los municipios catalanes' },
    { slug: 'sgsi', title: 'ALTECH implementa con éxito un Sistema de Gestión de Seguridad de la Información (SGSI)' },
  ]
  for (const n of news) {
    await payload.create({
      collection: 'news',
      locale: 'es',
      data: { slug: n.slug, title: n.title, date: '2023-01-28T00:00:00.000Z', coverImage: newsThumb.id },
    })
  }

  // 7. Globals: Home (es) ------------------------------------------------------
  await payload.updateGlobal({
    slug: 'home',
    locale: 'es',
    data: {
      hero: {
        headline: 'Ayudamos a construir\nla movilidad del mañana',
        subtitle:
          'Ingeniería tecnológica de alta especialización en el desarrollo e integración de soluciones TIC',
        stats: [
          { value: '+15 años', label: 'experiencia y trabajo' },
          { value: '+50 proyectos', label: 'en sectores críticos' },
          { value: '99.9% uptime', label: 'en operaciones activas' },
          { value: '+40 clientes', label: 'institucionales y privados' },
        ],
      },
      solutionsSection: {
        eyebrow: 'Nuestras soluciones',
        title: 'Ayudamos a construir la movilidad',
        subtitle:
          'Soluciones tecnológicas inteligentes para la gestión de movilidad, seguridad y servicios críticos.',
      },
      contactCta: {
        title: 'Contacta con nosotros',
        subtitle:
          '¿Quieres conocer más a fondo lo que hacemos? Dinos algo y nos pondremos en contacto contigo.',
        buttonLabel: 'Contactar',
        link: '/contacto',
      },
    },
  })

  // 8. Globals: Site settings --------------------------------------------------
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'es',
    data: {
      companyName: 'Altech',
      email: 'altech@altech.es',
      phone: 'T. +34 935 019 844',
      address: 'C/ Àlaba 140, Planta 7ª, 08018 Barcelona (España)',
      social: [
        { platform: 'linkedin', url: 'https://www.linkedin.com' },
        { platform: 'youtube', url: 'https://www.youtube.com' },
      ],
    },
  })

  console.log('✅ Seed completo: home, site-settings, 4 soluciones, 4 noticias, 6 clientes')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
