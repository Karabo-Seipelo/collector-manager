---
sidebar_position: 6.3
---

# Toggle

Switch for two options that take effect immediately, matching Practical UI Toggle.

**Import:** `@repo/ui/atoms/toggle`

**Storybook:** Atoms/Toggle

## Usage

```tsx
import { Toggle } from "@repo/ui/atoms/toggle";

<Toggle label="Notifications" />
<Toggle label="Dark mode" defaultChecked />
```

When omitting the visible label, provide `aria-label` or `aria-labelledby`.

## Props

Extends native checkbox input attributes except `type` and the numeric input `size`.

| Prop       | Type                    | Default   | Description                       |
| ---------- | ----------------------- | --------- | --------------------------------- |
| `label`    | `ReactNode`             | —         | Optional visible, associated name |
| `size`     | `"small"` \| `"medium"` | `"small"` | 48×24px or 64×32px track          |
| `disabled` | `boolean`               | `false`   | Disable interaction               |

Use `checked` / `defaultChecked` and `onChange` like a native checkbox.

## Visual states

- Unselected: weak fill, strong stroke, sunken track, raised white thumb on the left
- Selected: primary fill, thumb on the right
- The thumb carries a 2px border that matches the track: stroke-strong when unselected, primary when selected, fill-disabled when disabled
- Hover and press overlays follow fill-hover and fill-press
- Disabled unselected: weak fill without a stroke; disabled selected uses fill-disabled
- Label gap is 8px (small) or 12px (medium)

## Accessibility

- Uses a native checkbox with `role="switch"` and an associated `<label>`
- Keyboard activation remains native (`Space`)
- When omitting `label`, provide `aria-label` or `aria-labelledby`

## Related

- [Checkbox](./checkbox)
- [Radio](./radio)
- [Design tokens](./tokens)
