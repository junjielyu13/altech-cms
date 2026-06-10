import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: { singular: 'Solución', plural: 'Soluciones' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'area', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'Nombre corto del área (tarjeta de inicio + eyebrow de la página).' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'URL: /soluciones/<slug>. Ej: transporte-y-logistica' } },
    {
      name: 'area',
      type: 'select',
      required: true,
      options: [
        { label: 'Transporte y Logística', value: 'transport-logistics' },
        { label: 'Defensa y Seguridad', value: 'defense-security' },
        { label: 'Gestión de Emergencias', value: 'emergency-management' },
        { label: 'Servicios Urbanos', value: 'urban-services' },
      ],
    },
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Descripción breve para la tarjeta de la página de inicio.' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Orden de aparición (menor = primero).' } },

    // --- Página de detalle ----------------------------------------------------
    {
      type: 'collapsible',
      label: 'Hero (cabecera de la página)',
      fields: [
        { name: 'heroHeadline', type: 'text', localized: true, admin: { description: 'Titular grande del hero. Ej: «Sistemas y soluciones para transporte, logística y movilidad».' } },
        { name: 'heroSubtitle', type: 'textarea', localized: true, admin: { description: 'Texto introductorio bajo el titular.' } },
        { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Foto de fondo del hero (se aplica un degradado rojo encima).' } },
        { name: 'pdf', type: 'upload', relationTo: 'media', admin: { description: 'PDF descargable (botón «Descargar PDF»). Opcional.' } },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      localized: true,
      labels: { singular: 'Sección', plural: 'Secciones' },
      admin: {
        description: 'Bloques de contenido. Se alternan foto/texto automáticamente (izq./der.) según el orden.',
        initCollapsed: true,
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'features',
          type: 'array',
          labels: { singular: 'Punto', plural: 'Puntos' },
          admin: { description: 'Capacidades (lista con check rojo).' },
          fields: [{ name: 'text', type: 'text' }],
        },
        {
          name: 'advantages',
          type: 'array',
          labels: { singular: 'Ventaja', plural: 'Ventajas' },
          admin: { description: 'Lista bajo el rótulo «Ventajas».' },
          fields: [{ name: 'text', type: 'text' }],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },

    // Legacy / unused on the frontend — kept to avoid a destructive schema change.
    { name: 'body', type: 'richText', localized: true, admin: { hidden: true } },
    { name: 'gallery', type: 'array', admin: { hidden: true }, fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
  ],
}
