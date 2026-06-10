import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Cliente', plural: 'Clientes' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'featured'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'caseStudy', type: 'richText', localized: true },
  ],
}
