# Altech 官网 CMS · 交接文档（HANDOFF）

> 这份文档自包含。接手的 Claude **不需要**原始对话，照着做即可完成 Payload + Supabase CMS 骨架。
> 生成时间：2026-06-09。项目目录：`/Users/jli/altech/altech-official-web`

---

## 0. 一句话目标

给西班牙 ICT/国防工程公司 **Altech**（altech.es）做新官网。**本阶段只做后端 CMS**，前端等设计师出稿后再做（设计方向已定为「B 沉浸式·深色动画驱动」，用 Next + GSAP + Lenis，但**现在先不碰前端**）。

## 1. 最终技术栈决策（已和用户 junjie 敲定，勿改）

| 项 | 决定 |
|---|---|
| 前端框架 | **Next.js**（App Router）—— 本阶段只搭骨架，页面留空 |
| CMS | **Payload 3**（装在同一个 Next 项目里，后台 `/admin`，自动出 REST + GraphQL API） |
| 数据库 | **Supabase（Postgres）**。**本地开发先用 Docker postgres 容器**，用户稍后提供 Supabase 连接池字符串再切 |
| 动画引擎 | GSAP + Lenis（前端阶段才用，现在忽略） |
| 多语言 | **西语 es（默认）+ 英语 en + 加泰罗尼亚语 ca**，用 Payload 内建 localization |
| SEO | `@payloadcms/plugin-seo`，给内容加 meta 字段，让 marketing 逐页管 |
| 部署 | Vercel（后续） |
| Node | **24**（用户用 nvm，已设为 default = v24.16.0） |
| 包管理器 | **npm**（pnpm 未配置，用 npm 即可） |

**为什么手写骨架而不用 `create-payload-app`**：该 CLI 的"选数据库"是必答交互项、无命令行 flag，在无 TTY 的 agent 环境必然卡死；degit 官方模板拉的是 HEAD（`workspace:*` 依赖、要 Node 24、mongodb），装不了。所以**手写骨架 + 锁定稳定版 `3.85.1`** 最可控。

## 2. 已完成的环境状态（接手时应已就绪，建议先核对）

1. **Node 24**：`nvm alias default 24` 已设，`node -v` → v24.16.0。每个新 shell 若不是 24，先 `source ~/.nvm/nvm.sh && nvm use 24`。
2. **本地 Postgres 容器**已跑：`docker ps --filter name=altech-pg`（应 Up，0.0.0.0:5432->5432）。
   若没了，重建：
   `docker run -d --name altech-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=altech -p 5432:5432 postgres:16`
   连接串：`postgres://postgres:postgres@localhost:5432/altech`
3. **目录结构**已建（`src/collections`、`src/globals`、`src/app/(payload)/...`、`src/app/(frontend)`）。
4. **尚未做**：写任何项目文件、`npm install`、跑后台、灌数据。全部在第 4 节。

## 3. 内容模型（marketing 在后台要管的东西）

**Collections**：`users`（管理员，自带 auth）、`media`（上传）、`solutions`（解决方案）、`clients`（客户）、`news`（新闻）、`jobs`（招聘）。
**Globals**：`home`（首页文案）、`site-settings`（导航/联系方式/社交/页脚）。
**四大解决方案领域**（select 固定值）：`transport-logistics` / `defense-security` / `emergency-management` / `urban-services`。
带 `localized: true` 的字段在三种语言下各存一份。

---

## 4. 待执行步骤（按顺序）

### 步骤 1：写下面所有文件

路径都相对 `/Users/jli/altech/altech-official-web`。带 `()` `[]` 的目录名是 Next 的 route group / catch-all，保持原样。

**package.json**
~~~json
{
  "name": "altech-official-web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev",
    "devsafe": "rm -rf .next && cross-env NODE_OPTIONS=--no-deprecation next dev",
    "build": "cross-env NODE_OPTIONS=--no-deprecation next build",
    "start": "cross-env NODE_OPTIONS=--no-deprecation next start",
    "generate:types": "cross-env NODE_OPTIONS=--no-deprecation payload generate:types",
    "generate:importmap": "cross-env NODE_OPTIONS=--no-deprecation payload generate:importmap",
    "payload": "cross-env NODE_OPTIONS=--no-deprecation payload",
    "seed": "cross-env NODE_OPTIONS=--no-deprecation tsx src/seed.ts"
  },
  "dependencies": {
    "@payloadcms/db-postgres": "3.85.1",
    "@payloadcms/next": "3.85.1",
    "@payloadcms/plugin-seo": "3.85.1",
    "@payloadcms/richtext-lexical": "3.85.1",
    "@payloadcms/ui": "3.85.1",
    "cross-env": "^10.1.0",
    "graphql": "^16.8.1",
    "next": "16.2.7",
    "payload": "3.85.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "sharp": "^0.34.2"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "dotenv": "^16.4.7",
    "tsx": "^4.22.4",
    "typescript": "^5.7.0"
  },
  "engines": { "node": ">=20.9.0" }
}
~~~
注意：`typescript` 用 ^5.7（HEAD 模板里的 6.x 是预发布，别用）。

**.env**（`PAYLOAD_SECRET` 用 `openssl rand -hex 32` 生成）
~~~
DATABASE_URI=postgres://postgres:postgres@localhost:5432/altech
PAYLOAD_SECRET=__在此放随机串__
~~~
用户稍后会给 Supabase 连接池字符串（Project Settings → Database → Connection pooling → Transaction，端口 6543）。届时把 `DATABASE_URI` 换成它并在尾部加 `?pgbouncer=true`（serverless 必须用 pooler）。

**.gitignore**
~~~
node_modules
.next
.env
/build
/dist
.DS_Store
~~~

**next.config.mjs**
~~~js
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withPayload(nextConfig)
~~~

**tsconfig.json**
~~~json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
~~~

**src/payload.config.ts**
~~~ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Solutions } from './collections/Solutions'
import { Clients } from './collections/Clients'
import { News } from './collections/News'
import { Jobs } from './collections/Jobs'
import { Home } from './globals/Home'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Solutions, Clients, News, Jobs],
  globals: [Home, SiteSettings],
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
      { label: 'Català', code: 'ca' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['solutions', 'news'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} — Altech` : 'Altech'),
      generateDescription: ({ doc }) => doc?.excerpt || '',
    }),
  ],
})
~~~

**src/collections/Users.ts**
~~~ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [],
}
~~~

**src/collections/Media.ts**
~~~ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: true,
  fields: [{ name: 'alt', type: 'text', localized: true }],
}
~~~

**src/collections/Solutions.ts**
~~~ts
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
~~~

**src/collections/Clients.ts**
~~~ts
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
~~~

**src/collections/News.ts**
~~~ts
import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Noticia', plural: 'Noticias' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'date'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'date', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
  ],
}
~~~

**src/collections/Jobs.ts**
~~~ts
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
~~~

**src/globals/Home.ts**
~~~ts
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
~~~

**src/globals/SiteSettings.ts**
~~~ts
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
~~~

**Payload app 胶水文件（照抄，3.x 通用样板）**

`src/app/(payload)/layout.tsx`
~~~tsx
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = { children: React.ReactNode }

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
~~~

`src/app/(payload)/custom.scss` → 内容：`/* custom admin overrides */`

`src/app/(payload)/admin/importMap.js` → 内容：`export const importMap = {}`
（之后 `npm run generate:importmap` 会自动填充）

`src/app/(payload)/admin/[[...segments]]/page.tsx`
~~~tsx
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
~~~

`src/app/(payload)/admin/[[...segments]]/not-found.tsx`
~~~tsx
import type { Metadata } from 'next'
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
~~~

`src/app/(payload)/api/[...slug]/route.ts`
~~~ts
import config from '@payload-config'
import '@payloadcms/next/css'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
~~~

`src/app/(payload)/api/graphql/route.ts`
~~~ts
import config from '@payload-config'
import { GRAPHQL_POST, GRAPHQL_OPTIONS } from '@payloadcms/next/routes'

export const POST = GRAPHQL_POST(config)
export const OPTIONS = GRAPHQL_OPTIONS(config)
~~~

`src/app/(payload)/api/graphql-playground/route.ts`
~~~ts
import config from '@payload-config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
~~~

**前端占位（设计稿到了再替换）**

`src/app/(frontend)/layout.tsx`
~~~tsx
import React from 'react'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
~~~

`src/app/(frontend)/page.tsx`
~~~tsx
export default function HomePage() {
  return (
    <main style={{ padding: 48, fontFamily: 'system-ui' }}>
      <h1>Altech</h1>
      <p>前端待设计稿。后台在 /admin。</p>
    </main>
  )
}
~~~

**验证用 seed 脚本 `src/seed.ts`**
~~~ts
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
~~~

### 步骤 2：安装依赖（确保 Node 24）
~~~bash
cd /Users/jli/altech/altech-official-web
source ~/.nvm/nvm.sh && nvm use 24
npm install
~~~

### 步骤 3：生成类型 + importMap
~~~bash
npm run generate:types
npm run generate:importmap
~~~

### 步骤 4：灌示例数据（首次会把 schema push 进 Postgres）
~~~bash
npm run seed
~~~
首次 Payload 初始化时 db-postgres 会自动建表（dev push）。若提示 schema 变更需确认，按提示接受。

### 步骤 5：起后台并验证
~~~bash
npm run dev
~~~
另开终端：
~~~bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin
curl -s "http://localhost:3000/api/solutions?locale=es" | head -c 400
curl -s "http://localhost:3000/api/solutions?locale=en" | head -c 400
~~~
浏览器打开 `http://localhost:3000/admin`，用 `admin@altech.es / Altech2026!` 登录，确认能切 es/en/ca、能改内容、SEO 字段出现在 solutions/news。

---

## 5. 验证通过判定（DoD）

- [ ] `/admin` 能登录
- [ ] 后台能切 es / en / ca 三语，字段分语言存储
- [ ] `solutions`/`clients`/`news`/`jobs` 四集合齐全，字段符合第 3 节
- [ ] `home`/`site-settings` 两 global 在
- [ ] `solutions`/`news` 有 SEO 插件的 meta 字段
- [ ] REST `?locale=en` 返回英文内容
- [ ] Postgres 容器里有对应表

## 6. 遗留 / 后续

1. **切 Supabase**：用户给连接池字符串后改 `.env` 的 `DATABASE_URI`（尾部加 `?pgbouncer=true`），重跑 dev。serverless 部署必须用 pooler（6543），勿直连（5432）。
2. **媒体存储**：本地用默认磁盘；上 Vercel 前接 `@payloadcms/storage-vercel-blob` 或 Supabase Storage（serverless 文件系统不持久）。
3. **前端**：等设计稿。方向 = 深色沉浸式（B）+ GSAP + Lenis，但调成"硬核科技感"适配国防客户。前端经 Payload REST/GraphQL 取数；多语言 SEO 用 `generateMetadata` + hreflang；`app/sitemap.ts` 从 Payload 生成站点地图；加 Organization/LocalBusiness JSON-LD。
4. **SEO 提醒**：Google 搜索右侧"知识面板/地图/评分"来自 **Google Business Profile**（独立产品，需公司去 business.google.com 认领维护），不是网站代码能生成的；网站只能用结构化数据呼应。
5. **常见坑**：① 每个新 shell 先 `nvm use 24`；② `typescript` 用 5.7 别用 6.x 预发布；③ `next` 必须 16.2.6+（payload 3.85.1 peer 要求），已锁 16.2.7。

## 7. 设计阶段产物（参考）

头脑风暴可视化草图（首页三方向、Hero 三方案）在 `/Users/jli/my-project/claude-notion/.superpowers/brainstorm/` 的 html 文件。本阶段不需要。
