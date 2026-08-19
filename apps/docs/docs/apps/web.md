---
sidebar_position: 1
---

# Web App

The web app is a **Next.js 16** application using the App Router. It serves as the main Collection Manager UI (currently a starter shell).

- **Path:** `apps/web`
- **Dev URL:** http://localhost:3000
- **Package name:** `web`

## Stack

- Next.js 16 with App Router
- React 19
- Tailwind CSS v4 via `@repo/ui/styles.css`
- Shared components from `@repo/ui`

## Project structure

```
apps/web/
├── app/
│   ├── layout.tsx      # Root layout + fonts
│   ├── page.tsx        # Home page
│   └── globals.css     # Tailwind imports
├── public/             # Static assets
├── postcss.config.mjs  # Tailwind PostCSS plugin
└── package.json
```

## Styling

`app/globals.css` imports the shared design system stylesheet:

```css
@import "@repo/ui/styles.css";
@source "../app/**/*.{js,ts,jsx,tsx}";
```

See [Tailwind setup](../development/tailwind) for details.

## Using shared components

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { Code } from "@repo/ui/atoms/code";

<Button iconLeft={<FeatherIcon name="bell" />}>Notifications</Button>
```

## Scripts

```bash
pnpm --filter web dev          # http://localhost:3000
pnpm --filter web build
pnpm --filter web start        # production server
pnpm --filter web lint
pnpm --filter web check-types
```

## Tooling

| Tool | Config |
| --- | --- |
| ESLint | `@repo/eslint-config/next-js` |
| TypeScript | `@repo/typescript-config/nextjs.json` |

## Related

- [Apps and packages](../architecture/apps-and-packages)
- [Design system overview](../design-system/overview)
