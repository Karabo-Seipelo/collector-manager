---
sidebar_position: 5.8
---

# BadgeDot

Used to indicate notifications or online status.

**Import:** `@repo/ui/atoms/badge-dot`

**Storybook:** Atoms/BadgeDot

## Usage

```tsx
import { BadgeDot } from "@repo/ui/atoms/badge-dot";
import { ButtonIcon } from "@repo/ui/atoms/button-icon";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<BadgeDot />

<BadgeDot type="online" size="large" />

<ButtonIcon
  variant="tertiary"
  icon={<FeatherIcon name="bell" />}
  badge="dot"
  aria-label="Notifications"
/>
```

This is not the status [Badge](./badge) pill or [BadgeCount](./badge-count). [ButtonIcon](./button-icon) overlays a small notification dot.

## Props

| Prop        | Type                                                                      | Default          | Description     |
| ----------- | ------------------------------------------------------------------------- | ---------------- | --------------- |
| `type`      | `"online"` \| `"busy"` \| `"away"` \| `"offline"` \| `"notification"`     | `"notification"` | Presence or alert |
| `size`      | `"small"` \| `"medium"` \| `"large"`                                      | `"medium"`       | 8 / 12 / 16px   |
| `className` | `string`                                                                  | —                | Wrapper class   |

## Types

| Type           | Fill                  | Glyph        |
| -------------- | --------------------- | ------------ |
| `online`       | `fill-success-strong` | check        |
| `busy`         | `fill-error-strong`   | minus        |
| `away`         | `fill-warning-strong` | clock        |
| `offline`      | `fill-weak`           | x            |
| `notification` | `fill-error-strong`   | none         |

## Sizes

| Size     | Diameter | Glyph |
| -------- | -------- | ----- |
| `small`  | 8px      | none |
| `medium` | 12px     | yes when the type has one |
| `large`  | 16px     | yes when the type has one |

## Accessibility

- Decorative: `aria-hidden`
- Put the meaning on the parent (`aria-label` on ButtonIcon, visible text on Badge)

## Related

- [ButtonIcon](./button-icon)
- [Badge](./badge)
- [BadgeCount](./badge-count)
- [Design tokens](./tokens)
