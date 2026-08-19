---
sidebar_position: 1
---

# Monorepo Overview

Collection Manager is a [Turborepo](https://turborepo.dev/) monorepo using [pnpm workspaces](https://pnpm.io/workspaces). All apps and packages live under `apps/` and `packages/`, declared in `pnpm-workspace.yaml` at the repo root.

## Workspace layout

```
collection-manager/
├── apps/
│   ├── web/          # Next.js application
│   └── docs/         # Docusaurus documentation
├── packages/
│   ├── ui/           # Shared React components + Storybook
│   ├── eslint-config/
│   └── typescript-config/
├── package.json      # Root scripts
├── turbo.json        # Turborepo task pipeline
└── pnpm-workspace.yaml
```

## Root scripts

Defined in the root `package.json`:

| Script | Description |
| --- | --- |
| `pnpm dev` | Run all dev servers (web, docs, Storybook) |
| `pnpm build` | Build all apps and packages |
| `pnpm storybook` | Run Storybook only |
| `pnpm build-storybook` | Build static Storybook site |
| `pnpm lint` | Lint all packages |
| `pnpm check-types` | Type-check all packages |
| `pnpm format` | Format files with Prettier |

See [Scripts reference](../development/scripts) for filter examples and per-package commands.

## Turborepo tasks

`turbo.json` defines the task pipeline:

| Task | Behavior |
| --- | --- |
| `build` | Depends on upstream `^build`; outputs `.next/` and `build/` |
| `lint` | Depends on upstream `^lint` |
| `check-types` | Depends on upstream `^check-types` |
| `dev` | Persistent, not cached |
| `storybook` | Persistent, not cached |
| `build-storybook` | Outputs `storybook-static/` |

Turborepo caches task outputs locally. Tasks run in parallel where dependencies allow.

## Package manager

The repo pins `pnpm@9.0.0` via the `packageManager` field. Use pnpm for installs and scripts to stay consistent with the lockfile.

## Related

- [Apps and packages](./apps-and-packages) — role of each app and package
- [Scripts reference](../development/scripts) — day-to-day commands
