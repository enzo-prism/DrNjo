# Dental Strategies (DrNjo)

Modern landing page + API starter for Dr. Michael Njo’s Dental Strategies practice.  
The repo is a small monorepo: Vite/React frontend in `client/`, Express server in `server/`, with shared TypeScript types in `shared/`.

---

## Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS + shadcn/ui + Wouter routing.
- **Lead Capture**: `/contact` page powered by react-hook-form + Zod with a Formspree backend endpoint.
- **Backend**: Express 4 with TypeScript, bundled by esbuild for production.
- **Data Layer**: Drizzle ORM + Zod schemas under `shared/`, currently backed by an in-memory storage adapter.
- **Tooling**: tsx for dev runtime, TanStack Query client, Cartographer & runtime error overlay in dev environments.

---

## Repository Layout

| Path | Purpose |
|------|---------|
| `client/` | Vite app (root index, pages, components, Tailwind styles, `/contact` form, and public assets). |
| `server/` | Express entry (`index.ts`), route registration, storage abstraction, and Vite middleware helpers. |
| `shared/` | Database schema (`schema.ts`) + shared types used by both client and server. |
| `attached_assets/` | Imported media (WebP photos, PDFs) aliased as `@assets`. |
| `drizzle.config.ts` | CLI config for migrations. Requires `DATABASE_URL`. |
| `create_og_image.py` | Helper script to regenerate the OpenGraph image in `client/public`. |

Path aliases (configured in `tsconfig.json` & `vite.config.ts`):

| Alias | Maps to |
|-------|---------|
| `@/` | `client/src/` |
| `@shared/` | `shared/` |
| `@assets/` | `attached_assets/` |

---

## Prerequisites

- Node.js 20+ (matches the shipped TypeScript/Node typings).
- npm 10 (bundled with Node 20).
- PostgreSQL instance (only needed once you graduate from the in-memory storage; required for Drizzle migrations).

Install dependencies once:

```bash
npm install
```

---

## Environment Variables

Create a `.env` (or export vars in your shell) with the following:

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No (defaults to `5000`) | Single exposed port for both API & client. Must match your hosting provider’s allowed port. |
| `NODE_ENV` | No | `development` (default) enables Vite middleware + better logs. `production` serves the prebuilt bundle from `dist/public`. |
| `DATABASE_URL` | **Yes for Drizzle CLI / future DB storage** | Postgres connection string used by `drizzle-kit push` and any real storage implementation. |

> ⚠️ `drizzle.config.ts` throws if `DATABASE_URL` is missing; set it before running any Drizzle commands (or temporarily stub it when running `npm run check` in CI).

---

## Development Workflow

```bash
npm run dev
```

- Spins up Express via `tsx server/index.ts`.
- In `NODE_ENV=development`, Express attaches Vite’s middleware HMR server so the React app hot-reloads at the same origin (`http://localhost:5000` by default).
- API routes should be added in `server/routes.ts` under the `/api` prefix and can leverage the shared schemas/types.

Useful helpers:

- **Type checking**: `npm run check`
- **Generate OG image** (optional): `python create_og_image.py`

---

## Production Build & Start

```bash
npm run build
npm run start
```

`npm run build` performs two steps:
1. `vite build` → emits static assets into `dist/public`
2. `esbuild server/index.ts` → bundles the Express server into `dist/index.js`

`npm run start` runs the bundled server with `NODE_ENV=production`, which:
- Serves everything from `dist/public`
- Falls back to `index.html` for client routes
- Exposes any `/api` routes you implemented

Deploy by uploading the `dist/` folder (plus `package.json` if your host rebuilds server code) and ensuring `DATABASE_URL`, `PORT`, and `NODE_ENV` are set.

---

## Database & Storage

- The shared schema lives in `shared/schema.ts`.
- `server/storage.ts` currently implements an in-memory `MemStorage` that satisfies the `IStorage` interface (`getUser`, `getUserByUsername`, `createUser`). Replace this with a Drizzle-backed adapter when you hook up PostgreSQL.
- Run migrations / push schema changes with:

```bash
DATABASE_URL="postgres://..." npm run db:push
```

This syncs the schema defined in `shared/schema.ts` with your Postgres instance and writes migrations to `./migrations`.

---

## Adding Backend Routes

1. Define route handlers in `server/routes.ts` (remember to prefix with `/api`).
2. Use the shared Zod schemas (`@shared/schema`) for validation.
3. Leverage `storage` or your own implementation to interact with data.
4. Client-side, use the utilities in `client/src/lib/queryClient.ts` (`apiRequest` for mutations, TanStack Query for fetching) so authentication and error handling stay consistent.

The logging middleware in `server/index.ts` automatically times every `/api` response and dumps the JSON payload (truncated to 80 chars) to the console to help with debugging.

---

## Styling & UI

- Tailwind classes live in `client/src/index.css`; custom CSS variables drive the “dental” palette and animation system.
- shadcn/ui components are colocated in `client/src/components/ui`.
- Theme logic lives in `client/src/components/theme-provider.tsx` + `theme-toggle.tsx`, giving you auto/light/dark/system modes with persistence.

---

## Troubleshooting

- **Nothing renders / blank page**: ensure `npm run dev` is using Node 20+ and that the console doesn’t report missing assets. Vite middleware injects logs into the terminal and browser console.
- **Express crashes on error**: inspect the server logs printed by the custom logger; Express rethrows in development so the stack trace is visible.
- **Drizzle CLI fails immediately**: double-check `DATABASE_URL` exists before running `npm run db:push`.
- **Static build missing**: run `npm run build` before `npm run start`; production mode expects `dist/public/index.html` to be present.

---

## Next Steps

- Implement the first real `/api` route (e.g., lead capture) using the shared schema.
- Swap `MemStorage` with a Drizzle-powered Postgres adapter once a database is provisioned.
- Add forms/pages that exercise the existing TanStack Query + react-hook-form setup so the installed dependencies provide value.
