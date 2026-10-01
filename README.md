# Collection Manager

Turborepo monorepo for a collection-management app. The repository foundation and shared design system are in place; product features (CRUD, APIs, data models) are not started yet.

**Using this as a template?** See [TEMPLATE.md](TEMPLATE.md) for fork steps, optional Chromatic, and how reference Storybook pages relate to the core design system.

## Prerequisites

- Node.js 22+ (see [.nvmrc](.nvmrc))
- [pnpm](https://pnpm.io/) 9

## Quick start

```bash
pnpm install
pnpm dev
```

| App               | URL                                      |
| ----------------- | ---------------------------------------- |
| Web (Next.js)     | http://localhost:3000                    |
| Docs (Docusaurus) | http://localhost:3001                    |
| API (NestJS)      | http://localhost:3002 (`GET /api/health`; Swagger at `/api/docs` in non-prod) |
| Storybook         | http://localhost:6006                    |

## Common commands

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start all dev servers                      |
| `pnpm build`        | Production build for all apps and packages |
| `pnpm lint`         | Run ESLint across the monorepo             |
| `pnpm check-types`  | Run TypeScript checks                      |
| `pnpm test`         | Run tests                                  |
| `pnpm storybook`    | Start Storybook only                       |
| `pnpm format`       | Format files with Prettier                 |
| `pnpm format:check` | Check formatting without writing           |

Run a single app with filters:

```bash
pnpm --filter web dev
pnpm --filter docs dev
pnpm --filter api dev
pnpm --filter @repo/ui storybook
```

## Documentation

Full documentation lives in the Docusaurus site under [`apps/docs`](apps/docs). Run it locally with:

```bash
pnpm --filter docs dev
```

## Repository layout

```
apps/
  web/          Next.js application (consumes @repo/ui)
  api/          NestJS HTTP API (health check; collection routes later)
  docs/         Documentation site
packages/
  ui/           Shared React components + Storybook
  eslint-config/
  typescript-config/
```

### Core vs reference in `packages/ui`

| Layer | Paths | Purpose |
|-------|--------|---------|
| **Core** | `src/atoms`, `molecules`, `organisms`, `foundations`, `styles.css` | Design system you ship in apps |
| **Reference** | `src/pages`, `templates`, `src/api/collection`, MSW mocks | Storybook demos and copy-paste examples—not dependencies of `apps/web` |

See the docs site for architecture, design system, and development guides.
