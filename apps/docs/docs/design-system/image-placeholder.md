---
sidebar_position: 4
---

# ImagePlaceholder

Default decorative placeholder graphic shown when no image is available.

**Import:** `@repo/ui/atoms/image-placeholder`

**Storybook:** Atoms/ImagePlaceholder

## Usage

```tsx
import { ImagePlaceholder } from "@repo/ui/atoms/image-placeholder";

<div className="flex h-[190px] items-center justify-center rounded-card bg-fill-weak">
  <ImagePlaceholder />
</div>;
```

## Props

| Prop        | Type     | Default | Description                |
| ----------- | -------- | ------- | -------------------------- |
| `size`      | `number` | `30`    | Width and height in pixels |
| `className` | `string` | —       | Additional CSS classes     |

## Accessibility

- Renders with `aria-hidden="true"` — use only when the placeholder is decorative
- When the placeholder represents meaningful content, provide context via a parent label or adjacent text

## Related

- [Card](./card)
- [Design tokens](./tokens)
