---
sidebar_position: 5
---

# Linting and Types

Each app and package runs its own lint and type-check scripts, orchestrated from the root via Turborepo.

## Root commands

```bash
pnpm lint
pnpm check-types
```

Turborepo runs these in parallel across packages, respecting dependency order (`^lint`, `^check-types`).

## Per-package scripts

| Package     | Lint                        | Type check                     |
| ----------- | --------------------------- | ------------------------------ |
| `apps/web`  | `eslint --max-warnings 0`   | `next typegen && tsc --noEmit` |
| `apps/docs` | `eslint . --max-warnings 0` | `tsc --noEmit`                 |
| `@repo/ui`  | `eslint . --max-warnings 0` | `tsc --noEmit`                 |

Run for a single package:

```bash
pnpm --filter web lint
pnpm --filter @repo/ui check-types
```

## Shared configs

- **ESLint:** [@repo/eslint-config](./eslint-config)
- **TypeScript:** [@repo/typescript-config](./typescript-config)

## Formatting

Prettier runs from the root:

```bash
pnpm format
```

Formats `*.{ts,tsx,md}` across the repo.

## Related

- [Scripts reference](./scripts)
- [ESLint config](./eslint-config)
- [TypeScript config](./typescript-config)
