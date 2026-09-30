# API app

NestJS HTTP service for Collection Manager.

## Run

From the repository root:

```bash
pnpm --filter api dev
```

Default URL: http://localhost:3002

## Health check

```bash
curl http://localhost:3002/api/health
```

Example response:

```json
{ "status": "ok", "timestamp": "2026-01-01T00:00:00.000Z" }
```

## Environment

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `3002`  | HTTP listen port |

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Watch mode |
| `pnpm build` | Compile to `dist/` |
| `pnpm start` | Run compiled app |
| `pnpm test` | E2E smoke (health) |
| `pnpm lint` | ESLint |
| `pnpm check-types` | TypeScript |

Collection REST routes are not implemented yet; Storybook continues to mock `/api/collection/*` via MSW.
