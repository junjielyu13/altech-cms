import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: { singular: 'Solución', plural: 'Soluciones' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'area', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
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
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
