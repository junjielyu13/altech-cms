import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Inicio',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'headline',
          type: 'textarea',
          localized: true,
          admin: { description: 'Cada salto de línea es una línea del titular.' },
        },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'media', type: 'upload', relationTo: 'media', label: 'Imagen de fondo' },
        {
          name: 'stats',
          type: 'array',
          labels: { singular: 'Dato', plural: 'Datos' },
          fields: [
            { name: 'value', type: 'text', localized: true },
            { name: 'label', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'solutionsSection',
      type: 'group',
      label: 'Sección Soluciones',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'contactCta',
      type: 'group',
      label: 'CTA de Contacto',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'buttonLabel', type: 'text', localized: true },
        { name: 'link', type: 'text', defaultValue: '/contacto' },
      ],
    },
  ],
}
