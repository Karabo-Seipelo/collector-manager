---
sidebar_position: 1
---

# Scripts Reference

All commands run from the **repository root** unless noted.

## Root scripts

| Command                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `pnpm dev`             | Start web, docs, and Storybook dev servers               |
| `pnpm build`           | Production build for all apps/packages                   |
| `pnpm storybook`       | Start Storybook on port 6006                             |
| `pnpm build-storybook` | Build static Storybook to `packages/ui/storybook-static` |
| `pnpm lint`            | Run ESLint in all packages                               |
| `pnpm check-types`     | Run TypeScript checks in all packages                    |
| `pnpm test`            | Run unit and Storybook browser tests                     |
| `pnpm test:unit`       | Run jsdom unit tests only                                |
| `pnpm test:storybook`  | Run Storybook browser tests only (Playwright)            |
| `pnpm format`          | Format files with Prettier                               |
| `pnpm format:check`    | Check formatting without writing                         |

## Filter by package

Use `--filter` to target a single app or package:

```bash
# Web app only
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint
pnpm --filter web check-types

# Docs site only
pnpm --filter docs dev
pnpm --filter docs build

# UI package / Storybook
pnpm --filter @repo/ui storybook
pnpm --filter @repo/ui build-storybook
pnpm --filter @repo/ui lint
pnpm --filter @repo/ui test
pnpm --filter @repo/ui test:unit
pnpm --filter @repo/ui test:storybook
pnpm --filter @repo/ui check-types
```

## Common workflows

### First-time setup

```bash
pnpm install
pnpm dev
```

### Before opening a PR

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

### Preview production docs locally

```bash
pnpm --filter docs build
pnpm --filter docs serve
```

### Preview static Storybook

```bash
pnpm build-storybook
pnpm --filter @repo/ui exec npx serve storybook-static
```

## Package-specific scripts

### `apps/web`

| Script        | Command                        |
| ------------- | ------------------------------ |
| `dev`         | `next dev --port 3000`         |
| `build`       | `next build`                   |
| `start`       | `next start`                   |
| `lint`        | `eslint --max-warnings 0`      |
| `check-types` | `next typegen && tsc --noEmit` |

### `apps/docs`

| Script        | Command                        |
| ------------- | ------------------------------ |
| `dev`         | `docusaurus start --port 3001` |
| `build`       | `docusaurus build`             |
| `serve`       | `docusaurus serve --port 3001` |
| `lint`        | `eslint . --max-warnings 0`    |
| `check-types` | `tsc --noEmit`                 |

### `@repo/ui`

| Script               | Command                          |
| -------------------- | -------------------------------- |
| `storybook`          | `storybook dev -p 6006`          |
| `build-storybook`    | `storybook build`                |
| `lint`               | `eslint . --max-warnings 0`      |
| `test`               | `vitest run`                     |
| `test:unit`          | `vitest run --project unit`      |
| `test:storybook`     | `vitest run --project storybook` |
| `test:watch`         | `vitest`                         |
| `check-types`        | `tsc --noEmit`                   |
| `generate:component` | `turbo gen react-component`      |

## Related

- [Storybook](./storybook)
- [Tailwind setup](./tailwind)
- [Testing](./testing)
- [Linting and types](./linting-and-types)
