# Altech — Official Website & CMS

Corporate website and CMS for **Altech Solutions and Consulting S.L.** (altech.es), a
Barcelona-based ICT engineering company serving transport & logistics, defense &
security, emergency management, and urban services.

- **Frontend** — Next.js 16 (App Router) marketing site, built from a Figma design.
- **CMS** — [Payload 3](https://payloadcms.com) embedded in the same Next app (admin at `/admin`, auto REST + GraphQL APIs).
- **Database** — Supabase Postgres.
- **Media** — Supabase Storage (S3-compatible).
- **Hosting** — Vercel (auto-deploys on push to `main`).

Live: https://altech-cms.vercel.app · Admin: https://altech-cms.vercel.app/admin

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js `16.2.7` (App Router, React 19) |
| CMS | Payload `3.85.1` (`@payloadcms/db-postgres`, `@payloadcms/next`, `@payloadcms/richtext-lexical`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Headings font | Poppins (next/font) — **placeholder** for the licensed *Codec Pro* |
| Database | Supabase Postgres |
| Media storage | Supabase Storage via `@payloadcms/storage-s3` |
| SEO | `@payloadcms/plugin-seo`, metadata API, robots/sitemap, JSON-LD |
| i18n | Payload localization: **es** (default), **en**, **ca** |
| Runtime | Node **24** (`nvm use 24`), npm |

---

## Getting started

> Requires Node 24. If you use nvm: `nvm use 24` (or `nvm install 24`).

```bash
npm install
cp .env.example .env      # then fill in the values (see below)
npm run generate:types    # generate src/payload-types.ts
npm run seed              # push schema + create admin & sample data (first run)
npm run dev               # http://localhost:3000  (admin at /admin)
```

Default seeded admin: `admin@altech.es` / `Altech2026!`

### Database options for local dev

- **Supabase (recommended)** — point `DATABASE_URI` at the Supabase **session pooler** (port `5432`).
  Migrations/seeding need session mode; the transaction pooler (6543) is for serverless runtime only.
- **Local Docker Postgres (offline dev)** — a [`docker-compose.yml`](./docker-compose.yml) is provided:

  ```bash
  docker compose up -d      # start local Postgres on localhost:5432 (volume-backed)
  ```
  then set `DATABASE_URI=postgres://postgres:postgres@localhost:5432/altech` in `.env` and run
  `npm run seed`. Stop with `docker compose down` (data persists in the `altech-pgdata` volume;
  add `-v` to wipe it). Local-only credentials (`postgres`/`postgres`) match `.env.example`.

### Environment variables

See [`.env.example`](./.env.example) for the full annotated list. Summary:

| Var | Purpose |
|-----|---------|
| `DATABASE_URI` | Postgres connection. Local/seed → session pooler `5432`. Production → transaction pooler `6543` + `?pgbouncer=true`. |
| `PAYLOAD_SECRET` | JWT signing secret (`openssl rand -hex 32`). |
| `NEXT_PUBLIC_SERVER_URL` | Canonical site URL for SEO/metadata. |
| `S3_BUCKET` / `S3_ENDPOINT` / `S3_REGION` / `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | Supabase Storage. Leave blank locally to fall back to disk. |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build. **Always run before relying on prod behavior** (see Gotchas). |
| `npm run start` | Serve the production build locally. |
| `npm run seed` | Push schema + seed admin and sample content (`src/seed.ts`). |
| `npm run generate:types` | Regenerate `src/payload-types.ts` from collections/globals. |
| `npm run generate:importmap` | Regenerate the admin import map. **Re-run after changing plugins/admin components.** |

---

## Project structure

```
src/
  app/
    (frontend)/            # public marketing site (own root layout, Tailwind, SEO)
      layout.tsx           # metadata, fonts, globals.css
      page.tsx             # homepage
      globals.css          # Tailwind v4 + design tokens (@theme)
    (payload)/             # Payload admin + REST/GraphQL routes (own root layout)
    robots.ts  sitemap.ts  # SEO routes
  collections/             # Payload collections: Users, Media, Solutions, Clients, News, Jobs
  globals/                 # Payload globals: Home, SiteSettings
  components/
    home/                  # homepage sections (Hero, Solutions, Band, News, ContactCta)
    layout/                # Header, Footer
    ui/                    # Container, Logo, icons
    seo/                   # JSON-LD
  content/                 # static site copy (home.ts, site.ts) — swap for CMS data later
  lib/                     # cn(), siteConfig (SEO base URL + org data)
  payload.config.ts        # Payload config (db, localization, plugins, storage)
  seed.ts                  # seed script
public/figma/              # design assets exported from Figma
```

### Content model

- **Collections:** `users` (auth), `media` (uploads), `solutions`, `clients`, `news`, `jobs`.
- **Globals:** `home`, `site-settings`.
- **Solution areas** (fixed select): `transport-logistics`, `defense-security`, `emergency-management`, `urban-services`.
- Localized fields are stored per-locale (es/en/ca).

---

## Deployment

Hosted on **Vercel**, project `altech-cms`, connected to this GitHub repo. **Pushing to `main`
auto-deploys to production.** Environment variables are set in the Vercel dashboard
(Project → Settings → Environment Variables) — production uses the **transaction pooler
(6543) + `?pgbouncer=true`** for `DATABASE_URI`.

The schema is currently created via Payload dev-push (run from local against Supabase);
no formal migrations are committed yet. If you change collections/fields, re-push from
local and consider introducing Payload migrations before scaling.

---

## Status & roadmap

- [x] Payload CMS skeleton (collections, globals, localization, SEO plugin)
- [x] Homepage frontend (static, Spanish) from Figma
- [x] Supabase Postgres + Supabase Storage
- [x] Vercel deployment with auto-deploy
- [x] SEO foundation (metadata, robots, sitemap, JSON-LD)
- [ ] Remaining pages (4 solution pages, news list/detail, about, contact, legal)
- [ ] Wire frontend to CMS data (currently static copy in `src/content`)
- [ ] i18n routing (`[locale]`) for en/ca on the frontend
- [ ] GSAP/Lenis animations
- [ ] Licensed **Codec Pro** font (replace Poppins placeholder)
- [ ] Custom domain (`altech.es`) + Google Search Console submission
