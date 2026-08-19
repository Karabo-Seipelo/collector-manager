---
sidebar_position: 2
---

# Getting Started

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 9

## Install dependencies

From the repository root:

```bash
pnpm install
```

## Run everything

```bash
pnpm dev
```

This starts all persistent dev tasks via Turborepo:

| App | URL |
| --- | --- |
| Web (Next.js) | http://localhost:3000 |
| Docs (Docusaurus) | http://localhost:3001 |
| Storybook | http://localhost:6006 |

## Run individual apps

```bash
# Next.js web app
pnpm --filter web dev

# Docusaurus docs
pnpm --filter docs dev

# Storybook for shared UI components
pnpm storybook
```

See the full [Scripts reference](./development/scripts) for build, lint, and type-check commands.

## Build

```bash
pnpm build
```

To build only the docs site:

```bash
pnpm --filter docs build
```

Static output is written to `apps/docs/build`.

## Next steps

- [Monorepo overview](./architecture/monorepo) — understand the repo layout
- [Apps and packages](./architecture/apps-and-packages) — what each package does
- [Design system overview](./design-system/overview) — atoms, molecules, and Storybook
- [Adding components](./development/adding-components) — extend `@repo/ui`
