import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Inicio',
  access: { read: () => true },
  fields: [
    { name: 'heroHeadline', type: 'text', localized: true },
    { name: 'heroSubtitle', type: 'textarea', localized: true },
    { name: 'heroMedia', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaLink', type: 'text' },
  ],
}
