---
sidebar_position: 13
---

# IconContainer

`IconContainer` gives an icon more visual prominence while keeping its shape and spacing consistent. It renders a 24px icon inside a fixed 48px circular container.

## Import

```tsx
import { IconContainer } from "@repo/ui/atoms/icon-container";
import { FeatherIcon } from "@repo/ui/atoms/icon";
```

## Usage

```tsx
<IconContainer
  icon={<FeatherIcon name="star" />}
  tone="brand"
  variant="filled"
/>
```

## Props

| Prop      | Type                                                                                                        | Default     | Description                   |
| --------- | ----------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| `icon`    | `ReactNode`                                                                                                 | —           | Icon rendered at 24×24px      |
| `tone`    | `"neutral"` \| `"brand"` \| `"inverse"` \| `"destructive"` \| `"warning"` \| `"success"` \| `"information"` | `"neutral"` | Semantic colour treatment     |
| `variant` | `"filled"` \| `"stroked"`                                                                                   | `"filled"`  | Weak fill or weak 1px outline |

Standard `<span>` attributes and `className` are also supported.

## Visual specification

- Container: 48×48px circle
- Icon slot: 24×24px
- Filled: semantic weak fill with no border
- Stroked: transparent fill with a semantic weak 1px border
- Inverse: intended for dark surfaces

## Accessibility

`IconContainer` is display-only and hides its icon from assistive technology. Do not use colour or the icon alone to communicate required information; pair it with visible text.

## Related

- [Icon](./icon)
- [ButtonIcon](./button-icon)
- [Design tokens](./tokens)
