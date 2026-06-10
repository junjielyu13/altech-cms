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
  // Upload the Transporte y logística detail-page imagery (hero + 3 sections).
  const uploadImg = async (file: string, alt: string) =>
    (await payload.create({ collection: 'media', filePath: asset(file), data: { alt } })).id
  const tHero = await uploadImg('sol-hero-transporte.png', 'Transporte y logística')
  const tImg1 = await uploadImg('sol-transporte-1.png', 'Camión equipado con sistemas embarcados Altech')
  const tImg2 = await uploadImg('sol-transporte-2.png', 'Flota de vehículos gestionada desde el Centro de Control')
  const tImg3 = await uploadImg('sol-transporte-3.png', 'Buque de carga integrado en la cadena de suministro')

  const list = (...items: string[]) => items.map((text) => ({ text }))

  const solutions = [
    {
      slug: 'transporte-y-logistica',
      area: 'transport-logistics',
      order: 1,
      es: {
        title: 'Transporte y logística',
        excerpt: 'Sistemas de telemática y gestión de flotas para operadores de transporte',
        heroHeadline: 'Sistemas y soluciones para transporte, logística y movilidad',
        heroSubtitle:
          'Altech diseña, fabrica e integra hardware y software a medida para los tres grandes verticales del sector: transporte público de viajeros, logística de mercancías e infraestructura viaria.',
        heroImage: tHero,
        sections: [
          {
            title: 'Sistemas embarcados de localización y telemetría',
            body: 'Amplio abanico de equipos multifabricante que cubre cualquier flota — desde localización y sensorización básica hasta sistemas complejos de comunicaciones e informática embarcada que dotan al vehículo de capacidades diferenciales.',
            features: list(
              'Posicionamiento y sensorización de alta precisión',
              'Multicomunicaciones GPRS, 3G/LTE, NB-IoT, Tetra, Tetrapol y satélite',
              'ECO-Drive, navegación asistida y análisis de estilos de conducción',
              'Gestión de vídeo embarcado y sistemas LPR',
            ),
            advantages: list(
              'Mayor control de la actividad diaria',
              'Monitorización del mantenimiento de la flota',
              'Mayor seguridad en el transporte',
            ),
            image: tImg1,
          },
          {
            title: 'Soluciones para la gestión y control de flotas',
            body: 'Plataforma tecnológica propia para implementar Centros de Control a medida. Arquitectura modular con análisis en tiempo real y diferido de toda la información operativa del sistema.',
            features: list(
              'Geolocalización y monitorización de vehículos en tiempo real',
              'Gestión dinámica de rutas, servicios y estados operativos',
              'Gestión de fotografías y vídeo embarcado',
              'Cuadros de mando, gráficos dinámicos e informes a medida',
            ),
            advantages: list(
              'Optimización de rutas y de recursos',
              'Información disponible en tiempo real',
              'Obtención de métricas e indicadores',
            ),
            image: tImg2,
          },
          {
            title: 'Soluciones altamente integrables',
            body: 'Gran capacidad de integración con equipos embarcados de múltiples tecnologías. APIs e interfaces que permiten coexistir con plataformas corporativas, organismos públicos y cualquier actor de la cadena de suministro.',
            features: list(
              'Compatible con trackers, GPS, tacógrafos digitales, termógrafos y sensores',
              'APIs e interfaces hacia plataformas corporativas y organismos públicos',
              'Despliegues en la nube o sobre infraestructura propia',
              'Solución modular totalmente personalizable a cada entorno',
            ),
            advantages: list(
              'Sistema embarcado adaptado a cada entorno',
              'Solución modular totalmente personalizable',
              'Soluciones flexibles y configurables',
            ),
            image: tImg3,
          },
        ],
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
      data: { slug: s.slug, area: s.area, order: s.order, ...s.es } as any,
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
