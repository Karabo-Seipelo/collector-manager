---
sidebar_position: 1
---

# Introduction

Welcome to the **Collection Manager** documentation.

This site documents the monorepo setup, shared packages, development workflows, and the UI design system used across the project.

## What's in the repo

| Path | Description |
| --- | --- |
| [Web app](./apps/web) | Next.js 16 application (port 3000) |
| [Docs site](./apps/docs-site) | This Docusaurus documentation site (port 3001) |
| `packages/ui` | Shared React components, Tailwind styles, and Storybook |
| `packages/eslint-config` | Shared ESLint configurations |
| `packages/typescript-config` | Shared TypeScript configurations |

The repo is a [Turborepo](https://turborepo.dev/) monorepo managed with [pnpm](https://pnpm.io/) workspaces. Shared UI components follow an **atoms / molecules** structure and are documented interactively in [Storybook](http://localhost:6006) (port 6006).

## Documentation sections

- **[Getting Started](./getting-started)** — install, run, and build the project
- **[Architecture](./architecture/monorepo)** — monorepo layout, apps, and packages
- **[Development](./development/scripts)** — scripts, Storybook, Tailwind, and adding components
- **[Design System](./design-system/overview)** — components, tokens, and usage
- **[Apps](./apps/web)** — web and docs app guides

## Product scope

The web app is still a starter shell — there is no collection-manager product logic (CRUD, APIs, data models) yet. These docs focus on **how the repository works** and **how to use the design system**. Product feature docs will be added as the application grows.
