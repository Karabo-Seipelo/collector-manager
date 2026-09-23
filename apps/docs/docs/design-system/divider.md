---
sidebar_position: 6.4
---

# Divider

A thin line used to separate or group related content, matching Practical UI Divider.

**Import:** `@repo/ui/atoms/divider`

**Storybook:** Atoms/Divider

## Usage

```tsx
import { Divider } from "@repo/ui/atoms/divider";

<Divider />
<Divider type="strong" />
```

## Props

Extends native `<hr>` attributes via `React.HTMLAttributes<HTMLHRElement>`.

| Prop   | Type                    | Default  | Description                          |
| ------ | ----------------------- | -------- | ------------------------------------ |
| `type` | `"weak"` \| `"strong"`  | `"weak"` | Stroke token: weak or strong         |

The rule is 1px tall and fills its container width.

## Visual states

- Weak: `bg-stroke-weak`
- Strong: `bg-stroke-strong`
- Browser default `hr` margin and border are reset

For decorative use, pass `aria-hidden`.

## Accessibility

- Native `<hr>` with implicit `separator` role
- Horizontal orientation is the default

## Related

- [Design tokens](./tokens)
