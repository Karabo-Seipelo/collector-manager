---
sidebar_position: 5.9
---

# Breadcrumbs

A navigational element that displays the user's path within a website or application.

**Import:** `@repo/ui/atoms/breadcrumbs`

**Storybook:** Atoms/Breadcrumbs

## Usage

```tsx
import { Breadcrumbs } from "@repo/ui/atoms/breadcrumbs";

<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Vinyl" },
  ]}
/>

<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Vinyl" },
  ]}
  collapsed
  onExpand={() => setCollapsed(false)}
/>
```

Figma types are **Default** (`Label / Label / Label`) and **Collapsed** (`Label / ... / Label`). Collapsed shows the first and last crumbs when there are more than two items.

## Props

| Prop         | Type              | Default        | Description                                      |
| ------------ | ----------------- | -------------- | ------------------------------------------------ |
| `items`      | `BreadcrumbItem[]` | required      | Trail, last item is the current page             |
| `collapsed`  | `boolean`         | `false`        | Hide middle crumbs behind `...`                  |
| `onExpand`   | `() => void`      | —              | Fired when the ellipsis is activated             |
| `aria-label` | `string`          | `"Breadcrumb"` | Landmark name                                    |
| `className`  | `string`          | —              | Applied to the `nav`                             |

`BreadcrumbItem`: `{ label: string; href?: string }`. Ancestors should include `href`. The last item may omit `href` (rendered as text with `aria-current="page"`).

## Visual tokens

- Type Tiny/Regular (`text-tiny`), 20px line height
- Labels `text-fg-weak`; separators `/` use `text-icon-neutral`
- 8px gap between separator and label
- Dark-mode fills in Figma are not tokenized; stories show light tokens on a dark panel

## Accessibility

Follows the [WAI-ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/):

- `nav` landmark labelled “Breadcrumb”
- Ordered list of crumbs
- Current page uses `aria-current="page"`
- Slash separators are CSS `::before` so they are not announced
- Collapsed ellipsis is a button (`Show more breadcrumbs`); the parent decides how to expand

## Related

- [Button](./button)
- [Design tokens](./tokens)
