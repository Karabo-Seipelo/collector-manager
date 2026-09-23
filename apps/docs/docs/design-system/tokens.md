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
  --shadow-sunken: inset 0 1px 4px 0 rgb(0 0 0 / 0.08);

  /* Semantic colours */
  --color-fill-weak: rgba(0, 21, 128, 0.04);
  --color-fill-weaker: rgba(0, 21, 128, 0.02);
  --color-fill-inverse-weak: rgba(255, 255, 255, 0.06);
  --color-fill-inverse-strong: #12131a;
  --color-fg-strong: rgba(0, 6, 38, 0.9);
  --color-fg-weak: rgba(0, 9, 51, 0.65);
  --color-icon-neutral: rgba(0, 13, 77, 0.45);
  --color-icon-brand: rgba(76, 100, 217, 0.8);
  --color-icon-inverse: rgba(255, 255, 255, 0.6);
  --color-icon-warning: rgba(143, 108, 26, 0.8);
  --color-icon-success: rgba(6, 122, 87, 0.8);
  --color-icon-information: rgba(26, 116, 168, 0.8);

  /* Text field */
  --color-fill-inverse: #ffffff;
  --color-fill-hover: rgba(0, 21, 128, 0.04);
  --color-fill-press: rgba(0, 17, 102, 0.1);
  --color-fill-error-weak: rgba(255, 74, 74, 0.05);
  --color-fill-warning-weak: rgba(255, 192, 46, 0.05);
  --color-fill-success-weak: rgba(10, 204, 146, 0.05);
  --color-fill-information-weak: rgba(38, 176, 255, 0.05);
  --color-fill-brand-weak: rgba(89, 117, 255, 0.05);
  --color-stroke-weak: rgba(0, 17, 102, 0.1);
  --color-stroke-strong: rgba(0, 13, 77, 0.45);
  --color-stroke-focus: #4c64d9;
  --color-stroke-disabled: rgba(0, 17, 102, 0.1);
  --color-stroke-error-strong: rgba(199, 58, 58, 0.8);
  --color-stroke-error-weak: rgba(199, 58, 58, 0.14);
  --color-stroke-warning-strong: rgba(143, 108, 26, 0.8);
  --color-stroke-warning-weak: rgba(143, 108, 26, 0.2);
  --color-stroke-success-strong: rgba(6, 122, 87, 0.8);
  --color-stroke-success-weak: rgba(6, 122, 87, 0.2);
  --color-stroke-information-strong: rgba(26, 116, 168, 0.8);
  --color-stroke-information-weak: rgba(26, 116, 168, 0.2);
  --color-stroke-brand-strong: rgba(76, 100, 217, 0.8);
  --color-stroke-brand-weak: rgba(76, 100, 217, 0.2);
  --color-stroke-inverse-strong: rgba(255, 255, 255, 0.6);
  --color-stroke-inverse-weak: rgba(255, 255, 255, 0.12);
  --color-text-inverse-strong: #ffffff;
  --color-text-inverse-weak: rgba(255, 255, 255, 0.78);
  --color-text-disabled: rgba(0, 17, 102, 0.1);
  --color-text-error: #c73a3a;
  --color-text-warning: #8f6c1a;
  --color-text-success: #067a57;
  --color-text-information: #1a74a8;
  --color-icon-error: rgba(199, 58, 58, 0.8);

  /* Typography */
  --font-body: Inter, ui-sans-serif, system-ui, sans-serif;
  --text-small: 16px;
  --text-small--line-height: 24px;
  --text-tiny: 14px;
  --text-tiny--line-height: 20px;
  --text-heading-3: 24px;
  --text-heading-3--line-height: 32px;
  --text-heading-4: 20px;
  --text-heading-4--line-height: 28px;

  /* Shape */
  --radius-card: 12px;
}
```

Components use these via Tailwind classes such as `bg-primary`, `text-fg-strong`, `bg-fill-weak`, `rounded-card`, `text-small`, `text-tiny`, `text-heading-3`, and `text-heading-4`.

### Semantic tokens

| Token  | Utility classes                                                                                                                                                                                                                                         | Used by                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Fill   | `bg-fill-weak`, `bg-fill-weaker`, `bg-fill-inverse-weak`, `bg-fill-inverse-strong`                                                                                                                                                                       | Card media; Slot placeholder; Tag unselected; Avatar; Toggle track; IconContainer; Alert; Alert global |
| Fill   | `bg-fill-inverse`, `bg-fill-hover`, `bg-fill-press`, `bg-fill-error-weak`, `bg-fill-error-strong`, `bg-fill-warning-weak`, `bg-fill-warning-strong`, `bg-fill-success-weak`, `bg-fill-success-strong`, `bg-fill-information-weak`, `bg-fill-brand-weak` | TextField and TextArea backgrounds; Checkbox, Radio, and Toggle states; Badge, IconContainer, Alert fills |
| Stroke | `border-stroke-weak`, `border-stroke-strong`, `border-stroke-focus`, `border-stroke-disabled`, `border-stroke-error-strong`                                                                                                                             | Tag outline; TextField, TextArea, Checkbox, Radio, and Toggle borders and focus; Divider fill         |
| Stroke | `border-stroke-error-weak`, `border-stroke-warning-weak`, `border-stroke-success-weak`, `border-stroke-information-weak`, `border-stroke-brand-weak`, `border-stroke-inverse-weak`                                                                      | Badge and IconContainer outlines; Alert borders                                                       |
| Stroke | `bg-stroke-warning-strong`, `bg-stroke-success-strong`, `bg-stroke-information-strong`, `bg-stroke-brand-strong`, `bg-stroke-inverse-strong`                                                                                                           | Alert leading bar                                                                                     |
| Text   | `text-fg-strong`, `text-fg-weak`, `text-text-inverse-strong`, `text-text-inverse-weak`                                                                                                                                                                 | Card heading/description; TextField and TextArea input; Breadcrumbs labels; Alert                     |
| Icon   | `text-icon-neutral`, `text-icon-brand`, `text-icon-inverse`, `text-icon-error`, `text-icon-warning`, `text-icon-success`, `text-icon-information`                                                                                                       | Breadcrumbs separators; IconContainer icons                                                           |
| Text   | `text-text-disabled`, `text-text-error`, `text-text-warning`, `text-text-success`, `text-text-information`                                                                                                                                              | TextField and TextArea error text; Badge labels                                                       |
| Icon   | `text-icon-error`                                                                                                                                                                                                                                       | TextField and TextArea error icon                                                                     |
| Shape  | `rounded-card`                                                                                                                                                                                                                                          | Alert and image placeholder surfaces                                                                  |
| Shadow | `shadow-raised`, `shadow-overlay`, `shadow-sunken`                                                                                                                                                                                                      | Card interaction states; Toggle thumb and unselected track                                            |
| Type   | `text-small`, `text-tiny`, `text-heading-3`, `text-heading-4`, `font-body`                                                                                                                                                                              | Card typography; Avatar initials                                                                      |

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
- [Button](./button)
- [Badge](./badge)
- [BadgeCount](./badge-count)
- [BadgeDot](./badge-dot)
- [Breadcrumbs](./breadcrumbs)
- [Tailwind setup](../development/tailwind)
- [Design system overview](./overview)
