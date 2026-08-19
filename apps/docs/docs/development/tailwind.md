---
sidebar_position: 3
---

# Tailwind Setup

The monorepo uses **Tailwind CSS v4** with a shared stylesheet in `@repo/ui` consumed by the web app and Storybook.

## Shared stylesheet

`packages/ui/src/styles.css` is the single Tailwind entry point:

```css
@import "tailwindcss";
@source "./**/*.{js,ts,jsx,tsx}";

@theme {
  --color-primary: #4c64d9;
  /* ... */
}
```

Exported as `@repo/ui/styles.css` in `packages/ui/package.json`.

## Web app

**PostCSS** — `apps/web/postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Global CSS** — `apps/web/app/globals.css`:

```css
@import "@repo/ui/styles.css";
@source "../app/**/*.{js,ts,jsx,tsx}";
```

The web app imports shared tokens/styles and scans its own `app/` directory for utility classes used in pages.

## Storybook

Storybook uses the `@tailwindcss/vite` plugin in `.storybook/main.ts` and imports `styles.css` in `.storybook/preview.ts`.

## Using Tailwind in components

Add utility classes directly in component JSX. For components with a `className` prop, merge classes with the [cn helper](../design-system/cn-helper):

```tsx
import { cn } from "../../lib/cn";

className={cn("rounded-lg px-4", className)}
```

## Design tokens

Custom colors and shadows are defined in `@theme`. See [Design tokens](../design-system/tokens).

## Related

- [Design system overview](../design-system/overview)
- [Adding components](./adding-components)
