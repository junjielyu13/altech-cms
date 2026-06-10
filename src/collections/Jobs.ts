import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Empleo', plural: 'Empleos' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'location', 'active'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'location', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Jornada completa', value: 'full-time' },
        { label: 'Media jornada', value: 'part-time' },
        { label: 'Prácticas', value: 'internship' },
      ],
    },
    { name: 'description', type: 'richText', localized: true },
    { name: 'applyEmail', type: 'text' },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
