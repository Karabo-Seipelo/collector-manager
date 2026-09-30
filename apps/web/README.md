# Web app

Next.js 16 (App Router) shell that consumes [`@repo/ui`](../../packages/ui) via subpath exports and [`styles.css`](../../packages/ui/src/styles.css).

## Run

From the repository root:

```bash
pnpm --filter web dev
```

Open http://localhost:3000.

## Layout

- [`app/layout.tsx`](app/layout.tsx) — root layout and metadata
- [`app/components/site-header.tsx`](app/components/site-header.tsx) — `NavigationHeader` from the design system
- [`app/page.tsx`](app/page.tsx) — sample home route using tokens and components

Storybook page demos live under `packages/ui/src/pages` (reference only). See [TEMPLATE.md](../../TEMPLATE.md) and the root [README.md](../../README.md).
