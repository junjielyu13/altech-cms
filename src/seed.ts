import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const run = async () => {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@altech.es', password: 'Altech2026!' },
    })
    console.log('✅ 管理员已建: admin@altech.es / Altech2026!')
  }

  const sol = await payload.create({
    collection: 'solutions',
    locale: 'es',
    data: {
      title: 'Gestión de Emergencias',
      slug: 'gestion-emergencias',
      area: 'emergency-management',
      excerpt: 'Sistemas integrados para la gestión de emergencias.',
      order: 1,
    },
  })
  await payload.update({
    collection: 'solutions',
    id: sol.id,
    locale: 'en',
    data: { title: 'Emergency Management', excerpt: 'Integrated emergency management systems.' },
  })

  await payload.create({ collection: 'clients', data: { name: 'AENA', featured: true } })
  await payload.create({
    collection: 'news',
    locale: 'es',
    data: { title: 'Nuevo proyecto', slug: 'nuevo-proyecto', date: new Date().toISOString() },
  })

  console.log('✅ Seed 完成')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
