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
      ca: { title: 'Transport i logística', excerpt: 'Sistemes de telemàtica i gestió de flotes per a operadors de transport' },
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
      ca: { title: 'Emergències', excerpt: "Plataforma integrada de despatx, geolocalització i gestió d'incidències per a serveis d'emergència." },
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
      ca: { title: 'Defensa i seguretat', excerpt: 'Vigilància perimetral i comunicacions per a infraestructures crítiques' },
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
      ca: { title: 'Serveis urbans', excerpt: 'Telemetria IoT, gestió de residus i mobilitat sostenible per a municipis i empreses de serveis.' },
    },
  ] as const

  // Localized detail (hero + sections) for the Transporte y logística page.
  const tImages = [tImg1, tImg2, tImg3]
  const buildSections = (
    defs: { title: string; body: string; features: string[]; advantages: string[] }[],
  ) =>
    defs.map((d, i) => ({
      title: d.title,
      body: d.body,
      features: list(...d.features),
      advantages: list(...d.advantages),
      image: tImages[i],
    }))

  const transporteDetailI18n = {
    en: {
      heroHeadline: 'Systems and solutions for transport, logistics and mobility',
      heroSubtitle:
        "Altech designs, manufactures and integrates custom hardware and software for the sector's three major verticals: public passenger transport, freight logistics and road infrastructure.",
      sections: [
        {
          title: 'On-board location and telemetry systems',
          body: 'A wide range of multi-vendor equipment covering any fleet — from basic location and sensing to complex communications and on-board computing systems that give the vehicle distinctive capabilities.',
          features: [
            'High-precision positioning and sensing',
            'Multi-communications: GPRS, 3G/LTE, NB-IoT, Tetra, Tetrapol and satellite',
            'ECO-Drive, assisted navigation and driving-style analysis',
            'On-board video management and LPR systems',
          ],
          advantages: [
            'Greater control of daily activity',
            'Fleet maintenance monitoring',
            'Improved transport safety',
          ],
        },
        {
          title: 'Fleet management and control solutions',
          body: "Our own technology platform to build custom Control Centres. Modular architecture with real-time and historical analysis of all the system's operational data.",
          features: [
            'Real-time vehicle geolocation and monitoring',
            'Dynamic management of routes, services and operational states',
            'Photo and on-board video management',
            'Dashboards, dynamic charts and custom reports',
          ],
          advantages: [
            'Route and resource optimisation',
            'Information available in real time',
            'Metrics and indicators',
          ],
        },
        {
          title: 'Highly integrable solutions',
          body: 'Strong integration capability with on-board equipment across multiple technologies. APIs and interfaces that coexist with corporate platforms, public bodies and any actor in the supply chain.',
          features: [
            'Compatible with trackers, GPS, digital tachographs, temperature recorders and sensors',
            'APIs and interfaces to corporate platforms and public bodies',
            'Cloud or on-premise deployments',
            'Modular solution fully customisable to each environment',
          ],
          advantages: [
            'On-board system adapted to each environment',
            'Fully customisable modular solution',
            'Flexible and configurable solutions',
          ],
        },
      ],
    },
    ca: {
      heroHeadline: 'Sistemes i solucions per a transport, logística i mobilitat',
      heroSubtitle:
        'Altech dissenya, fabrica i integra maquinari i programari a mida per als tres grans verticals del sector: transport públic de viatgers, logística de mercaderies i infraestructura viària.',
      sections: [
        {
          title: 'Sistemes embarcats de localització i telemetria',
          body: "Un ampli ventall d'equips multifabricant que cobreix qualsevol flota — des de la localització i la sensorització bàsica fins a sistemes complexos de comunicacions i informàtica embarcada que doten el vehicle de capacitats diferencials.",
          features: [
            "Posicionament i sensorització d'alta precisió",
            'Multicomunicacions GPRS, 3G/LTE, NB-IoT, Tetra, Tetrapol i satèl·lit',
            "ECO-Drive, navegació assistida i anàlisi d'estils de conducció",
            'Gestió de vídeo embarcat i sistemes LPR',
          ],
          advantages: [
            "Major control de l'activitat diària",
            'Monitoratge del manteniment de la flota',
            'Major seguretat en el transport',
          ],
        },
        {
          title: 'Solucions per a la gestió i el control de flotes',
          body: 'Plataforma tecnològica pròpia per implementar Centres de Control a mida. Arquitectura modular amb anàlisi en temps real i diferit de tota la informació operativa del sistema.',
          features: [
            'Geolocalització i monitoratge de vehicles en temps real',
            'Gestió dinàmica de rutes, serveis i estats operatius',
            'Gestió de fotografies i vídeo embarcat',
            'Quadres de comandament, gràfics dinàmics i informes a mida',
          ],
          advantages: [
            'Optimització de rutes i de recursos',
            'Informació disponible en temps real',
            'Obtenció de mètriques i indicadors',
          ],
        },
        {
          title: 'Solucions altament integrables',
          body: "Gran capacitat d'integració amb equips embarcats de múltiples tecnologies. APIs i interfícies que permeten conviure amb plataformes corporatives, organismes públics i qualsevol actor de la cadena de subministrament.",
          features: [
            'Compatible amb trackers, GPS, tacògrafs digitals, termògrafs i sensors',
            'APIs i interfícies cap a plataformes corporatives i organismes públics',
            'Desplegaments al núvol o sobre infraestructura pròpia',
            'Solució modular totalment personalitzable a cada entorn',
          ],
          advantages: [
            'Sistema embarcat adaptat a cada entorn',
            'Solució modular totalment personalitzable',
            'Solucions flexibles i configurables',
          ],
        },
      ],
    },
  }

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
    await payload.update({
      collection: 'solutions',
      id: doc.id,
      locale: 'ca',
      data: { title: s.ca.title, excerpt: s.ca.excerpt },
    })
    // Localized detail for the Transporte page.
    if (s.slug === 'transporte-y-logistica') {
      for (const loc of ['en', 'ca'] as const) {
        const d = transporteDetailI18n[loc]
        await payload.update({
          collection: 'solutions',
          id: doc.id,
          locale: loc,
          data: {
            heroHeadline: d.heroHeadline,
            heroSubtitle: d.heroSubtitle,
            heroImage: tHero,
            sections: buildSections(d.sections),
          } as any,
        })
      }
    }
  }

  // 6. News (es + en + ca) -----------------------------------------------------
  const news = [
    {
      slug: 'its-grua-municipal-malaga',
      es: 'ALTECH implanta un sistema ITS para la gestión operativa de la grúa municipal en Málaga',
      en: 'ALTECH deploys an ITS system for the operational management of the municipal tow service in Málaga',
      ca: 'ALTECH implanta un sistema ITS per a la gestió operativa de la grua municipal a Màlaga',
    },
    {
      slug: 'reconocimiento-future-fast-forward',
      es: 'ALTECH recibe un reconocimiento en el encuentro de Future: Fast Forward',
      en: 'ALTECH receives recognition at the Future: Fast Forward event',
      ca: 'ALTECH rep un reconeixement a la trobada de Future: Fast Forward',
    },
    {
      slug: 'plataforma-dum-municipios-catalanes',
      es: 'Llega la nueva plataforma DUM para transformar la movilidad y la logística de los municipios catalanes',
      en: 'The new DUM platform arrives to transform mobility and logistics in Catalan municipalities',
      ca: 'Arriba la nova plataforma DUM per transformar la mobilitat i la logística dels municipis catalans',
    },
    {
      slug: 'sgsi',
      es: 'ALTECH implementa con éxito un Sistema de Gestión de Seguridad de la Información (SGSI)',
      en: 'ALTECH successfully implements an Information Security Management System (ISMS)',
      ca: 'ALTECH implementa amb èxit un Sistema de Gestió de Seguretat de la Informació (SGSI)',
    },
  ]
  for (const n of news) {
    const doc = await payload.create({
      collection: 'news',
      locale: 'es',
      data: { slug: n.slug, title: n.es, date: '2023-01-28T00:00:00.000Z', coverImage: newsThumb.id },
    })
    await payload.update({ collection: 'news', id: doc.id, locale: 'en', data: { title: n.en } })
    await payload.update({ collection: 'news', id: doc.id, locale: 'ca', data: { title: n.ca } })
  }

  // 7. Globals: Home (es + en + ca) --------------------------------------------
  // `hero.stats` is a NON-localized array with localized value/label subfields,
  // so per-locale values must target existing rows by `id`. We write es first
  // (creating the rows), read back their ids, then apply en/ca to those rows.
  const homeStats = {
    es: [
      ['+15 años', 'experiencia y trabajo'],
      ['+50 proyectos', 'en sectores críticos'],
      ['99.9% uptime', 'en operaciones activas'],
      ['+40 clientes', 'institucionales y privados'],
    ],
    en: [
      ['+15 years', 'of experience and work'],
      ['+50 projects', 'in critical sectors'],
      ['99.9% uptime', 'in active operations'],
      ['+40 clients', 'institutional and private'],
    ],
    ca: [
      ['+15 anys', 'experiència i treball'],
      ['+50 projectes', 'en sectors crítics'],
      ['99.9% uptime', 'en operacions actives'],
      ['+40 clients', 'institucionals i privats'],
    ],
  } as const

  const homeText = {
    es: {
      headline: 'Ayudamos a construir\nla movilidad del mañana',
      subtitle:
        'Ingeniería tecnológica de alta especialización en el desarrollo e integración de soluciones TIC',
      section: {
        eyebrow: 'Nuestras soluciones',
        title: 'Ayudamos a construir la movilidad',
        subtitle:
          'Soluciones tecnológicas inteligentes para la gestión de movilidad, seguridad y servicios críticos.',
      },
      cta: {
        title: 'Contacta con nosotros',
        subtitle:
          '¿Quieres conocer más a fondo lo que hacemos? Dinos algo y nos pondremos en contacto contigo.',
        buttonLabel: 'Contactar',
      },
    },
    en: {
      headline: 'We help build\nthe mobility of tomorrow',
      subtitle:
        'Highly specialised technology engineering for the development and integration of ICT solutions',
      section: {
        eyebrow: 'Our solutions',
        title: 'We help build mobility',
        subtitle: 'Smart technology solutions for managing mobility, security and critical services.',
      },
      cta: {
        title: 'Contact us',
        subtitle: "Want to know more about what we do? Drop us a line and we'll get in touch.",
        buttonLabel: 'Contact',
      },
    },
    ca: {
      headline: 'Ajudem a construir\nla mobilitat del demà',
      subtitle:
        "Enginyeria tecnològica d'alta especialització en el desenvolupament i la integració de solucions TIC",
      section: {
        eyebrow: 'Les nostres solucions',
        title: 'Ajudem a construir la mobilitat',
        subtitle:
          'Solucions tecnològiques intel·ligents per a la gestió de la mobilitat, la seguretat i els serveis crítics.',
      },
      cta: {
        title: 'Contacta amb nosaltres',
        subtitle:
          'Vols conèixer més a fons el que fem? Digues-nos alguna cosa i ens posarem en contacte amb tu.',
        buttonLabel: 'Contactar',
      },
    },
  } as const

  const homeData = (loc: 'es' | 'en' | 'ca', stats: { id?: string; value: string; label: string }[]) => {
    const t = homeText[loc]
    return {
      hero: { headline: t.headline, subtitle: t.subtitle, stats },
      solutionsSection: t.section,
      contactCta: { ...t.cta, link: '/contacto' },
    }
  }

  // es first → creates the stat rows.
  await payload.updateGlobal({
    slug: 'home',
    locale: 'es',
    data: homeData('es', homeStats.es.map(([value, label]) => ({ value, label }))) as any,
  })
  // Read back the shared row ids, then apply en/ca to those same rows.
  const esHome = (await payload.findGlobal({ slug: 'home', locale: 'es' })) as any
  const statIds: string[] = (esHome?.hero?.stats || []).map((s: any) => s.id)
  for (const loc of ['en', 'ca'] as const) {
    await payload.updateGlobal({
      slug: 'home',
      locale: loc,
      data: homeData(
        loc,
        homeStats[loc].map(([value, label], i) => ({ id: statIds[i], value, label })),
      ) as any,
    })
  }

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
