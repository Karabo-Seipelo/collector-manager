---
sidebar_position: 2
---

# Design Tokens

Design tokens are defined in `packages/ui/src/styles.css` and shared across Storybook and the web app via `@repo/ui/styles.css`.

## Tailwind theme

The `@theme` block registers Tailwind utilities:

```css
@theme {
  --color-primary: #4c64d9;
  --color-primary-foreground: #ffffff;
  --shadow-raised:
    0 4px 8px -2px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.08);

  /* Semantic colours */
  --color-fill-weak: rgba(0, 21, 128, 0.04);
  --color-fg-strong: rgba(0, 6, 38, 0.9);
  --color-fg-weak: rgba(0, 9, 51, 0.65);
  --color-icon-neutral: rgba(0, 13, 77, 0.45);

  /* Text field */
  --color-fill-inverse: #ffffff;
  --color-fill-hover: rgba(0, 21, 128, 0.04);
  --color-fill-press: rgba(0, 17, 102, 0.1);
  --color-fill-error-weak: rgba(255, 74, 74, 0.05);
  --color-stroke-strong: rgba(0, 13, 77, 0.45);
  --color-stroke-focus: #4c64d9;
  --color-stroke-disabled: rgba(0, 17, 102, 0.1);
  --color-stroke-error-strong: rgba(199, 58, 58, 0.8);
  --color-text-disabled: rgba(0, 17, 102, 0.1);
  --color-text-error: #c73a3a;
  --color-icon-error: rgba(199, 58, 58, 0.8);

  /* Typography */
  --font-body: Inter, ui-sans-serif, system-ui, sans-serif;
  --text-small: 16px;
  --text-small--line-height: 24px;
  --text-tiny: 14px;
  --text-tiny--line-height: 20px;

  /* Shape */
  --radius-card: 12px;
}
```

Components use these via Tailwind classes such as `bg-primary`, `text-fg-strong`, `bg-fill-weak`, `rounded-card`, `text-small`, and `text-tiny`.

### Semantic tokens

| Token  | Utility classes                                                                                       | Used by                                      |
| ------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Fill   | `bg-fill-weak`                                                                                        | ItemCard image placeholder                   |
| Fill   | `bg-fill-inverse`, `bg-fill-hover`, `bg-fill-press`, `bg-fill-error-weak`                             | TextField backgrounds                        |
| Stroke | `border-stroke-strong`, `border-stroke-focus`, `border-stroke-disabled`, `border-stroke-error-strong` | TextField borders and focus                  |
| Text   | `text-fg-strong`, `text-fg-weak`                                                                      | ItemCard title, price, meta; TextField input |
| Text   | `text-text-disabled`, `text-text-error`                                                               | TextField disabled and error text            |
| Icon   | `text-icon-error`                                                                                     | TextField error icon                         |
| Shape  | `rounded-card`                                                                                        | ItemCard image area                          |
| Type   | `text-small`, `text-tiny`, `font-body`                                                                | ItemCard typography                          |

## Dark mode

Primary color shifts in dark mode via a base-layer override:

```css
@layer base {
  :root {
    --color-primary: #4c64d9;
  }
  .dark {
    --color-primary: #8495eb;
  }
}
```

The web app respects `prefers-color-scheme` through Tailwind's `dark:` variants and utility classes in `apps/web/app/globals.css`.

## How apps consume tokens

**Web app** (`apps/web/app/globals.css`):

```css
@import "@repo/ui/styles.css";
@source "../app/**/*.{js,ts,jsx,tsx}";
```

The web app imports the shared stylesheet and adds its own `@source` so Tailwind scans Next.js pages for utility classes.

**Storybook** imports the same `styles.css` in `.storybook/preview.ts` and uses the `@tailwindcss/vite` plugin.

## Adding new tokens

1. Add variables to `@theme` in `packages/ui/src/styles.css`
2. Use the generated utility classes in components
3. Document new tokens on this page

Keep token changes in `@repo/ui` so Storybook and apps stay in sync.

## Related

- [TextField](./text-field)
- [Tailwind setup](../development/tailwind)
- [Design system overview](./overview)
