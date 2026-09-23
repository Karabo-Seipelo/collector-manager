---
sidebar_position: 6.3
---

# Text link

Inline anchor styled for navigation and secondary actions. Supports multiple tones, sizes, weights, underline behavior, and optional icons.

**Import:** `@repo/ui/atoms/text-link`

**Storybook:** Atoms/TextLink

## Usage

```tsx
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { TextLink } from "@repo/ui/atoms/text-link";

<TextLink href="/docs">Learn more</TextLink>

<TextLink
  href="/settings"
  size="small"
  weight="bold"
  iconRight={<FeatherIcon name="arrow-right" size={20} />}
>
  Open settings
</TextLink>
```

Use `tone="inverse-strong"` or `tone="inverse-weak"` on dark surfaces.

## Props

Extends native anchor attributes except `className` is merged via `cn`.

| Prop         | Type                                                                 | Default     | Description                                           |
| ------------ | -------------------------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `size`       | `"tiny"` \| `"small"`                                                | `"tiny"`    | 14px or 16px typography                               |
| `tone`       | `"brand"` \| `"neutral-strong"` \| `"neutral-weak"` \| `"destructive"` \| `"inverse-strong"` \| `"inverse-weak"` | `"brand"` | Text colour variant                    |
| `weight`     | `"regular"` \| `"bold"`                                              | `"regular"` | Normal or semibold label                              |
| `underline`  | `boolean`                                                            | `true`      | Underline at rest; removed on hover and press         |
| `iconLeft`   | `ReactNode`                                                          | —           | 20px leading icon slot                                |
| `iconRight`  | `ReactNode`                                                          | —           | 20px trailing icon slot                               |
| `disabled`   | `boolean`                                                            | `false`     | Disables interaction and applies disabled text colour |

## Visual states

- Default underlined links drop the underline on hover and active press
- Focus uses the shared focus ring (`ring-stroke-focus`)
- Disabled links keep underline when `underline` is true but use `text-text-disabled`
- Icon slots are spaced 8px from the label

## Accessibility

- Renders a native `<a>` element
- Provide meaningful link text or `aria-label` when the label alone is not descriptive
- Icons are decorative (`aria-hidden`)

## Related

- [Button](./button)
- [Breadcrumbs](./breadcrumbs)
- [Design tokens](./tokens)
