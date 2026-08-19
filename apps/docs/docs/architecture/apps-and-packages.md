---
sidebar_position: 2
---

# Apps and Packages

## Apps

### `apps/web`

The main **Next.js 16** application using the App Router. It consumes shared UI from `@repo/ui` and shared styles via `@repo/ui/styles.css`.

- **Dev port:** 3000
- **Stack:** Next.js, React 19, Tailwind CSS v4
- **Guide:** [Web app](../apps/web)

### `apps/docs`

The **Docusaurus 3** documentation site (this site).

- **Dev port:** 3001
- **Content:** Markdown files under `apps/docs/docs/`
- **Guide:** [Docs site](../apps/docs-site)

## Packages

### `@repo/ui`

Shared React component library with Storybook.

```
packages/ui/src/
├── atoms/       # Single-purpose building blocks
├── molecules/   # Composed components
├── lib/         # Utilities (e.g. cn)
└── styles.css   # Tailwind entry + design tokens
```

**Storybook** runs from this package on port 6006. See [Design system overview](../design-system/overview).

### `@repo/eslint-config`

Shared ESLint flat configs exported as:

- `@repo/eslint-config/base`
- `@repo/eslint-config/next-js`
- `@repo/eslint-config/react-internal`

See [ESLint config](../development/eslint-config).

### `@repo/typescript-config`

Shared `tsconfig.json` bases:

- `base.json`
- `nextjs.json`
- `react-library.json`

See [TypeScript config](../development/typescript-config).

## Workspace dependencies

Internal packages are linked with the `workspace:*` protocol in `package.json`:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

pnpm resolves these to local packages — no publishing required during development.

## Import conventions

`@repo/ui` uses explicit export paths in `packages/ui/package.json`:

| Import | Description |
| --- | --- |
| `@repo/ui/atoms/button` | Button component |
| `@repo/ui/atoms/icon` | FeatherIcon component |
| `@repo/ui/atoms/code` | Inline Code component |
| `@repo/ui/atoms/image-placeholder` | ImagePlaceholder component |
| `@repo/ui/molecules/card` | ItemCard component |
| `@repo/ui/molecules/button-group` | ButtonGroup compound component |
| `@repo/ui/styles.css` | Shared Tailwind stylesheet |
| `@repo/ui/lib/cn` | Class name merge helper |

Example:

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import "@repo/ui/styles.css";
```

When adding a new component, register its export path in `packages/ui/package.json`. See [Adding components](../development/adding-components).
