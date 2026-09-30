---
sidebar_position: 1
---

# Introduction

Welcome to the **Collection Manager** documentation.

This site documents the monorepo setup, shared packages, development workflows, and the UI design system used across the project.

## What's in the repo

| Path                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| [Web app](./apps/web)         | Next.js 16 application (port 3000)                      |
| [API app](./apps/api)         | NestJS HTTP service (port 3002, `GET /api/health`)      |
| [Docs site](./apps/docs-site) | This Docusaurus documentation site (port 3001)          |
| `packages/ui`                 | Shared React components, Tailwind styles, and Storybook |
| `packages/eslint-config`      | Shared ESLint configurations                            |
| `packages/typescript-config`  | Shared TypeScript configurations                        |

The repo is a [Turborepo](https://turborepo.dev/) monorepo managed with [pnpm](https://pnpm.io/) workspaces. Shared UI components follow **atoms / molecules / organisms** and are documented interactively in [Storybook](http://localhost:6006) (port 6006).

### Core design system vs reference screens

| Layer | Location | Role |
|-------|----------|------|
| **Core** | `packages/ui/src/atoms`, `molecules`, `organisms`, `foundations` | Import from `@repo/ui/...` in apps |
| **Reference** | `packages/ui/src/pages`, `templates`, collection API mocks (MSW) | Storybook-only demos; not wired into the Next.js app unless you choose to |

Forking this repo as a template? See **`TEMPLATE.md`** at the repository root (rename scope and product name after fork).

## Documentation sections

- **[Getting Started](./getting-started)** — install, run, and build the project
- **[Architecture](./architecture/monorepo)** — monorepo layout, apps, and packages
- **[Development](./development/scripts)** — scripts, Storybook, Tailwind, and adding components
- **[Design System](./design-system/overview)** — components, tokens, and usage
- **[Apps](./apps/web)** — web and docs app guides

## Product scope

The [web app](./apps/web) is a **design-system shell** (navigation and sample content from `@repo/ui`). There is no collection-manager product logic (CRUD, APIs, data models) yet. These docs focus on **how the repository works** and **how to use the design system**. Product feature docs will be added as the application grows.
