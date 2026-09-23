---
sidebar_position: 5.7
---

# BadgeCount

Used to show the number of notifications.

**Import:** `@repo/ui/atoms/badge-count`

**Storybook:** Atoms/BadgeCount

## Usage

```tsx
import { BadgeCount } from "@repo/ui/atoms/badge-count";
import { ButtonIcon } from "@repo/ui/atoms/button-icon";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<BadgeCount>8</BadgeCount>

<BadgeCount emphasis="moderate">8</BadgeCount>

<ButtonIcon
  variant="tertiary"
  icon={<FeatherIcon name="shopping-cart" />}
  badge={8}
  aria-label="Cart, 8 items"
/>
```

This is not the status [Badge](./badge) pill. [ButtonIcon](./button-icon) overlays a strong BadgeCount with an inverse stroke.

## Props

| Prop        | Type                                     | Default    | Description        |
| ----------- | ---------------------------------------- | ---------- | ------------------ |
| `children`  | `ReactNode`                              | required   | Count to display   |
| `emphasis`  | `"strong"` \| `"moderate"` \| `"weak"` | `"strong"` | Fill strength      |
| `className` | `string`                                 | —          | Wrapper class      |

Height is 24px, radius 16px, horizontal padding 8px, type Tiny/Regular.

## Emphasis

| Emphasis   | Fill                         | Text          | Stroke            |
| ---------- | ---------------------------- | ------------- | ----------------- |
| `strong`   | `fill-error-strong`          | white         | none              |
| `moderate` | `fill-error-weak`            | `text-error`  | `stroke-error-weak` |
| `weak`     | `fill-weak`                  | `fg-weak`     | `stroke-weak`     |

## Accessibility

- Non-interactive `<span>`
- When overlaying a control, keep the count in that control’s `aria-label` and treat the visual count as decorative

## Related

- [ButtonIcon](./button-icon)
- [Badge](./badge)
- [BadgeDot](./badge-dot)
- [Design tokens](./tokens)
