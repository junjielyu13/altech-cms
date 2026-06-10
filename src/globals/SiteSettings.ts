import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  access: { read: () => true },
  fields: [
    { name: 'companyName', type: 'text', defaultValue: 'Altech' },
    { name: 'email', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'social', type: 'array', fields: [{ name: 'platform', type: 'text' }, { name: 'url', type: 'text' }] },
    { name: 'nav', type: 'array', fields: [{ name: 'label', type: 'text', localized: true }, { name: 'href', type: 'text' }] },
  ],
}
