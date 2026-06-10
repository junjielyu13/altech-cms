# CLAUDE.md

Guidance for AI agents working in this repo. Read this before making changes.

## What this is

Corporate website + CMS for **Altech** (altech.es). Single Next.js 16 app that embeds
**Payload 3.85.1** as the CMS. Frontend is a Spanish-first marketing site built from a
Figma design; backend is the Payload admin at `/admin` with auto REST + GraphQL APIs.
Database is **Supabase Postgres**; media is **Supabase Storage** (S3-compatible). Deployed
on **Vercel** (auto-deploy on push to `main`).

See `README.md` for the human-facing overview. This file focuses on conventions and traps.

## Non-negotiables

- **Node 24, npm.** Run `nvm use 24` first in every shell. Not pnpm.
- **Pinned Payload version `3.85.1`** across all `@payloadcms/*` packages. Keep them in lockstep; don't bump one in isolation.
- **Don't commit secrets.** `.env` is gitignored; real connection strings / S3 keys / `PAYLOAD_SECRET` live only in `.env` and Vercel env vars. `.env.example` documents them. This repo is public on GitHub.
- **Two route groups, two root layouts:** `src/app/(frontend)` (public site) and `src/app/(payload)` (admin + APIs). Each renders its own `<html>`. Frontend CSS (`globals.css`, Tailwind) is imported only in `(frontend)/layout.tsx` and must not leak into the admin.

## The gotchas that actually bit us (don't repeat)

1. **`generate:importmap` must run with the SAME plugin set that runs in production.**
   The admin import map (`src/app/(payload)/admin/importMap.js`) is a committed static file.
   If a plugin that adds admin components (e.g. `@payloadcms/storage-s3` → `S3ClientUploadHandler`)
   is inactive when you regenerate, its component is dropped, and **production renders a blank
   admin** (dev hides this — it resolves components dynamically). The S3 plugin is therefore
   **always registered** in `payload.config.ts` with `enabled: useS3` (NOT conditionally added),
   so the import map is env-independent. After any plugin/admin-component change: re-run
   `npm run generate:importmap` and commit the result.

2. **Always `npm run build && npm run start` before trusting production behavior.**
   `next dev` (Turbopack) is lenient and masks production-only failures (the blank-admin bug,
   route export errors). The Vercel build is the source of truth.

3. **Supabase pooler ports matter.** Session pooler `5432` for local dev / seeding / migrations
   (full features, dev-push works). Transaction pooler `6543` + `?pgbouncer=true` for the
   Vercel serverless runtime only. Don't use 6543 for migrations; don't use a direct connection
   for serverless.

4. **Payload route exports are version-specific.** `@payloadcms/next` 3.85.1 exports
   `GRAPHQL_POST` and `GRAPHQL_PLAYGROUND_GET` but **no `GRAPHQL_OPTIONS`** (REST has
   `REST_OPTIONS`). Don't import names that don't exist — verify against the installed package.

## Commands

```bash
nvm use 24
npm run dev                 # local dev (Turbopack)
npm run build && npm run start   # smoke-test production locally
npm run seed                # push schema + seed admin/sample data
npm run generate:types      # after changing collections/globals → src/payload-types.ts
npm run generate:importmap  # after changing plugins/admin components (commit the result)
```

## Conventions

- **Frontend copy is static** in `src/content/{home,site}.ts`, typed and structured so it can
  later be swapped for Payload data (globals.home + solutions/news/clients) without touching
  presentation components. When wiring CMS data, replace the import source, keep the shapes.
- **Styling:** Tailwind v4 with design tokens in `globals.css` `@theme` (`--color-brand #f11b1c`,
  `--color-ink #131313`, etc.). Use these tokens, not raw hex. Headings use `--font-heading`
  (Poppins placeholder for the licensed Codec Pro); body uses Helvetica Neue stack.
- **Components:** sections in `components/home`, chrome in `components/layout`, primitives in
  `components/ui`. Match existing patterns (server components by default; `cn()` from `src/lib/cn.ts` for class joins).
- **SEO:** base URL + org data in `src/lib/siteConfig.ts` (driven by `NEXT_PUBLIC_SERVER_URL`).
  Metadata in `(frontend)/layout.tsx`; `robots.ts` / `sitemap.ts` at `src/app/`; JSON-LD in
  `components/seo/JsonLd.tsx`. Add new public routes to `sitemapRoutes`.
- **Localization:** Payload locales es (default) / en / ca; localized fields stored per-locale.
  The frontend is currently Spanish-only — i18n routing is not built yet.

## Content model (Payload)

Collections: `users` (auth), `media` (uploads → Supabase Storage), `solutions`, `clients`,
`news`, `jobs`. Globals: `home`, `site-settings`. Solution `area` is a fixed select:
`transport-logistics` | `defense-security` | `emergency-management` | `urban-services`.

## Verifying changes

- Build must pass: `npm run build`.
- Admin must render in the production build: start it and load `/admin/login` (don't trust dev).
- API check: `curl 'http://localhost:3000/api/solutions?locale=es'` (and `?locale=en`).
- Don't claim something works without running it — `next dev` passing is not sufficient evidence for a production-affecting change.
