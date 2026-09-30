---
sidebar_position: 3
---

# API App

The API app is a **NestJS 11** HTTP service. It currently exposes a health check only; collection REST routes will be added later.

- **Path:** `apps/api`
- **Dev URL:** http://localhost:3002
- **Package name:** `api`

## Stack

- NestJS 11 with Express
- TypeScript (shared `@repo/typescript-config/nest.json`)
- Jest + Supertest for e2e smoke tests

## Health check

```bash
curl http://localhost:3002/api/health
```

Example response:

```json
{ "status": "ok", "timestamp": "2026-01-01T00:00:00.000Z" }
```

Routes use the global prefix **`api`**, so the health controller is mounted at `/api/health`.

## Environment

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `3002`  | HTTP listen port |

## Commands

```bash
pnpm --filter api dev
pnpm --filter api build
pnpm --filter api test
pnpm --filter api lint
pnpm --filter api check-types
```

## Relationship to Storybook

Collection **Pages/** stories still load data through **MSW** against `/api/collection/*` in the browser. The Nest app does not implement those routes yet; Storybook and the API can run side by side during development without conflict.

## Relationship to the web app

The Next.js app does not proxy to this API yet. Wire `apps/web` to the API when you add product features that need live data.
