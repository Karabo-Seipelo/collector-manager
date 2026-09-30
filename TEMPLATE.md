# Using this repository as a template

This monorepo is a **design-system + Turborepo starter**: shared UI in `packages/ui`, a Next.js app in `apps/web`, a NestJS API shell in `apps/api`, docs in `apps/docs`, and Storybook-driven development with tests and optional Chromatic.

## After you fork or “Use this template”

### 1. Rename the workspace

| What | Example |
|------|---------|
| Root `package.json` `"name"` | `my-product` |
| GitHub repository name | `my-product` |
| Scope `@repo/*` → `@yourorg/*` | Find/replace in all `package.json` files and any imports if you change scope names |

Packages to update:

- [package.json](package.json) (root)
- [apps/web/package.json](apps/web/package.json)
- [apps/api/package.json](apps/api/package.json)
- [apps/docs/package.json](apps/docs/package.json)
- [packages/ui/package.json](packages/ui/package.json)
- [packages/eslint-config/package.json](packages/eslint-config/package.json)
- [packages/typescript-config/package.json](packages/typescript-config/package.json)

### 2. Prerequisites

- **Node.js 22+** ([`.nvmrc`](.nvmrc))
- **pnpm 9** (`packageManager` in root `package.json`)

```bash
pnpm install
pnpm dev
```

| App | URL |
|-----|-----|
| Web (Next.js) | http://localhost:3000 |
| Docs (Docusaurus) | http://localhost:3001 |
| API (NestJS) | http://localhost:3002 |
| Storybook | http://localhost:6006 |

### 3. Chromatic (optional)

Visual regression runs in CI only when **`CHROMATIC_PROJECT_TOKEN`** is set in GitHub → Settings → Secrets and variables → Actions.

- **With token:** the `chromatic` job builds Storybook and publishes to Chromatic.
- **Without token:** the job exits successfully with a notice; other CI jobs are unchanged.

Local publish: copy [`packages/ui/.env.example`](packages/ui/.env.example) to `packages/ui/.env.local` and set the token. See [Storybook development](apps/docs/docs/development/storybook.md).

### 4. What to keep vs treat as reference

| Layer | Location | Role |
|-------|----------|------|
| **Core design system** | `packages/ui/src/atoms`, `molecules`, `organisms`, `foundations`, `styles.css` | Ship and extend in your product |
| **Reference screens** | `packages/ui/src/pages`, `templates`, `src/api/collection`, MSW handlers | Storybook demos and copy-paste starting points—not imported by `apps/web` by default |
| **Product shell** | `apps/web` | Wire your routes to `@repo/ui` exports |

You do not need to delete reference pages to start a new product; avoid importing them from the Next app until you intentionally adopt a screen.

### 5. Common commands

```bash
pnpm lint
pnpm check-types
pnpm test:unit
pnpm test:storybook   # requires Playwright Chromium in packages/ui
pnpm build
pnpm build-storybook
```

### 6. Enable GitHub template (maintainers)

Repository Settings → General → **Template repository** (checkbox). New repos can then use **Use this template**.
