/**
 * Static content for the solution detail pages, transcribed from the Figma
 * "ALTECH - Diseño Web" board (node 4025:1599 = Transporte y logística).
 *
 * Kept as typed, structured data (like `home.ts` / `site.ts`) so it can later
 * be swapped for Payload data — e.g. an expanded `solutions` collection with a
 * blocks-based body — without touching the presentation components.
 *
 * Only `transporte-y-logistica` is designed so far; add the remaining areas
 * (emergencias, defensa-y-seguridad, servicios-urbanos) here as their Figma
 * frames are finalised. A slug without an entry returns a 404.
 */

import type { SolutionArea } from '@/content/home'

export interface SolutionFeatureSection {
  /** Section heading. */
  title: string
  /** Lead paragraph under the heading. */
  body: string
  /** Capability bullets (red check). */
  features: string[]
  /** Benefit bullets shown under the "Ventajas" eyebrow. */
  advantages: string[]
  /** Photo for the section. */
  image: string
  imageAlt: string
  /** Which side the photo sits on (sections alternate in the design). */
  imageSide: 'left' | 'right'
}

export interface SolutionDetail {
  slug: string
  area: SolutionArea
  /** Small uppercase label above the hero title. */
  eyebrow: string
  title: string
  subtitle: string
  /** Hero background photo (sits under the red gradient wash). */
  heroImage: string
  /** Optional downloadable datasheet; the hero "Descargar PDF" button. */
  pdfHref?: string
  sections: SolutionFeatureSection[]
}

export const solutionDetails: Record<string, SolutionDetail> = {
  'transporte-y-logistica': {
    slug: 'transporte-y-logistica',
    area: 'transport-logistics',
    eyebrow: 'Transporte y logística',
    title: 'Sistemas y soluciones para transporte, logística y movilidad',
    subtitle:
      'Altech diseña, fabrica e integra hardware y software a medida para los tres grandes verticales del sector: transporte público de viajeros, logística de mercancías e infraestructura viaria.',
    heroImage: '/figma/sol-hero-transporte.png',
    pdfHref: undefined,
    sections: [
      {
        title: 'Sistemas embarcados de localización y telemetría',
        body: 'Amplio abanico de equipos multifabricante que cubre cualquier flota — desde localización y sensorización básica hasta sistemas complejos de comunicaciones e informática embarcada que dotan al vehículo de capacidades diferenciales.',
        features: [
          'Posicionamiento y sensorización de alta precisión',
          'Multicomunicaciones GPRS, 3G/LTE, NB-IoT, Tetra, Tetrapol y satélite',
          'ECO-Drive, navegación asistida y análisis de estilos de conducción',
          'Gestión de vídeo embarcado y sistemas LPR',
        ],
        advantages: [
          'Mayor control de la actividad diaria',
          'Monitorización del mantenimiento de la flota',
          'Mayor seguridad en el transporte',
        ],
        image: '/figma/sol-transporte-1.png',
        imageAlt: 'Camión de transporte equipado con sistemas embarcados Altech',
        imageSide: 'left',
      },
      {
        title: 'Soluciones para la gestión y control de flotas',
        body: 'Plataforma tecnológica propia para implementar Centros de Control a medida. Arquitectura modular con análisis en tiempo real y diferido de toda la información operativa del sistema.',
        features: [
          'Geolocalización y monitorización de vehículos en tiempo real',
          'Gestión dinámica de rutas, servicios y estados operativos',
          'Gestión de fotografías y vídeo embarcado',
          'Cuadros de mando, gráficos dinámicos e informes a medida',
        ],
        advantages: [
          'Optimización de rutas y de recursos',
          'Información disponible en tiempo real',
          'Obtención de métricas e indicadores',
        ],
        image: '/figma/sol-transporte-2.png',
        imageAlt: 'Flota de vehículos gestionada desde el Centro de Control',
        imageSide: 'right',
      },
      {
        title: 'Soluciones altamente integrables',
        body: 'Gran capacidad de integración con equipos embarcados de múltiples tecnologías. APIs e interfaces que permiten coexistir con plataformas corporativas, organismos públicos y cualquier actor de la cadena de suministro.',
        features: [
          'Compatible con trackers, GPS, tacógrafos digitales, termógrafos y sensores',
          'APIs e interfaces hacia plataformas corporativas y organismos públicos',
          'Despliegues en la nube o sobre infraestructura propia',
          'Solución modular totalmente personalizable a cada entorno',
        ],
        advantages: [
          'Sistema embarcado adaptado a cada entorno',
          'Solución modular totalmente personalizable',
          'Soluciones flexibles y configurables',
        ],
        image: '/figma/sol-transporte-3.png',
        imageAlt: 'Buque de carga integrado en la cadena de suministro',
        imageSide: 'left',
      },
    ],
  },
}
