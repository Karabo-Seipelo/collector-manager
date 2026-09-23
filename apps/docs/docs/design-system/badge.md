---
sidebar_position: 5.6
---

# Badge

A display-only element used to indicate status.

**Import:** `@repo/ui/atoms/badge`

**Storybook:** Atoms/Badge

## Usage

```tsx
import { Badge } from "@repo/ui/atoms/badge";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<Badge tone="success" icon={<FeatherIcon name="check-circle" />}>
  In stock
</Badge>

<Badge tone="error" size="small">
  Sold
</Badge>

<Badge tone="success" dot>
  Live
</Badge>
```

Badge is not a button. Use [Tag](./tag) for selectable filters.

Notification counts are [BadgeCount](./badge-count). Presence and notification dots are [BadgeDot](./badge-dot).

## Props

| Prop        | Type                                                                                  | Default     | Description              |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ------------------------ |
| `children`  | `ReactNode`                                                                           | required    | Status label             |
| `tone`      | `"error"` \| `"warning"` \| `"success"` \| `"information"` \| `"neutral"` \| `"brand"` | `"neutral"` | Color intent             |
| `size`      | `"small"` \| `"medium"`                                                               | `"medium"`  | Height and type          |
| `icon`      | `ReactNode`                                                                           | —           | Optional leading icon    |
| `dot`       | `boolean`                                                                             | `false`     | 12px status dot          |
| `className` | `string`                                                                              | —           | Wrapper class            |

When `dot` is true, the leading icon is omitted.

## Tones

| Tone          | Use case                    |
| ------------- | --------------------------- |
| `error`       | Failure or destructive      |
| `warning`     | Caution                     |
| `success`     | Positive confirmation       |
| `information` | Informational               |
| `neutral`     | Default / uncategorized     |
| `brand`       | Brand-tinted status         |

## Sizes

| Size     | Height | Type        | Icon |
| -------- | ------ | ----------- | ---- |
| `small`  | 24px   | Tiny 14/20  | 16px |
| `medium` | 32px   | Small 16/24 | 20px |

Pill radius is 16px. Horizontal padding is 8px, with 4px around the label.

## Accessibility

- Wrapper is a non-interactive `<span>`
- Icons and dots are `aria-hidden`; the label is the visible text
- Not focusable; do not use `role="status"` (that is a live region)

## Related

- [Tag](./tag)
- [FeatherIcon](./icon)
- [ButtonIcon](./button-icon)
- [BadgeCount](./badge-count)
- [BadgeDot](./badge-dot)
- [Design tokens](./tokens)
